"use server";

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { randomUUID } from "crypto";
import { put } from "@vercel/blob";
import { BrotherSchema, RecruitSchema, EditBrotherSchema } from "./zod-schemas";
import bcrypt from "bcrypt";

// ============= AUTH / SIGNIN / SIGNOUT =================
export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export async function serverSignOut() {
  await signOut({ redirectTo: "/" });
}

// ============= COMMENT SCHEMAS / ACTIONS ==============

const CommentSchema = z.object({
  recruitId: z.string().min(1, { message: "Recruit ID is required." }),
  brotherId: z.string().min(1, { message: "Brother ID is required." }),
  comment: z.string().optional(),
  redFlag: z.string().optional(),
});

export type State = {
  errors?: Record<string, string[]>;
  message?: string | null;
};

// ============= CREATE COMMENT =============
export async function createComment(prevState: State, formData: FormData) {
  const rawFields = {
    recruitId: formData.get("recruitId")?.toString() || "",
    brotherId: formData.get("brotherId")?.toString() || "",
    comment: formData.get("comment")?.toString() || "",
    redFlag: formData.get("redFlag")?.toString() || "",
  };

  const validatedFields = CommentSchema.safeParse(rawFields);
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Submit Comment.",
    };
  }

  const { recruitId, brotherId, comment, redFlag } = validatedFields.data;
  const commentId = randomUUID();

  const finalRedFlag = redFlag || "None";
  try {
    await sql`
      INSERT INTO recruit_comments (id, recruit_id, brother_id, comment, red_flag)
      VALUES (
        ${commentId},
        ${recruitId},
        ${brotherId},
        ${comment || null},
        ${finalRedFlag}
      )
    `;
  } catch (error) {
    console.error("Database Error:", error);
    return {
      message: "Database Error: Failed to Submit Comment.",
    };
  }

  revalidatePath(`/recruits/${recruitId}/details`);
  redirect(`/recruits/${recruitId}/details`);
}

// ============= GET COMMENT BY RECRUIT AND BROTHER =============
export async function getCommentByRecruitAndBrother(
  recruitId: string,
  brotherId: string
) {
  try {
    const result = await sql`
      SELECT id, comment, red_flag 
      FROM recruit_comments 
      WHERE recruit_id = ${recruitId} AND brother_id = ${brotherId} 
      LIMIT 1
    `;
    return result.rows[0] || null;
  } catch (error) {
    console.error("Error fetching comment:", error);
    return null;
  }
}

// ============= UPSERT COMMENT =============
export async function upsertComment(prevState: State, formData: FormData) {
  const rawFields = {
    recruitId: formData.get("recruitId")?.toString() || "",
    brotherId: formData.get("brotherId")?.toString() || "",
    comment: formData.get("comment")?.toString() || "",
    redFlag: formData.get("redFlag")?.toString() || "",
    commentId: formData.get("commentId")?.toString() || "",
  };

  const validatedFields = CommentSchema.safeParse(rawFields);
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Submit Comment.",
    };
  }

  const { recruitId, brotherId, comment, redFlag } = validatedFields.data;
  const commentId = rawFields.commentId || randomUUID();
  const finalRedFlag = redFlag || "None";

  try {
    if (rawFields.commentId) {
      await sql`
        UPDATE recruit_comments 
        SET
          comment = ${comment || null},
          red_flag = ${finalRedFlag}
        WHERE id = ${commentId}
      `;
    } else {
      await sql`
        INSERT INTO recruit_comments (id, recruit_id, brother_id, comment, red_flag)
        VALUES (
          ${commentId},
          ${recruitId},
          ${brotherId},
          ${comment || null},
          ${finalRedFlag}
        )
      `;
    }
  } catch (error) {
    console.error("Database Error:", error);
    return {
      message: "Database Error: Failed to Submit Comment.",
    };
  }

  revalidatePath(`/recruits/${recruitId}/details`);
  redirect(`/recruits/${recruitId}/details`);
}

// ============= CREATE BROTHER ACCOUNT =============
export async function createBrotherAccount(
  prevState: State,
  formData: FormData
) {
  // 1) Extract fields
  const rawFields = {
    personal_email: formData.get("personal_email")?.toString() || "",
    school_email: formData.get("school_email")?.toString() || "",
    password: formData.get("password")?.toString() || "",
    first_name: formData.get("first_name")?.toString() || "",
    last_name: formData.get("last_name")?.toString() || "",
    year: formData.get("year")?.toString() || "",
    phone: formData.get("phone")?.toString() || "",
    house: formData.get("house")?.toString() || "",
    brother_name: formData.get("brother_name")?.toString() || "",
    birthday: formData.get("birthday")?.toString() || "",
    location: formData.get("location")?.toString() || "",
    tagline: formData.get("tagline")?.toString() || "",
    position: formData.get("position")?.toString() || "",
    bio: formData.get("bio")?.toString() || "",
    instagram: formData.get("instagram")?.toString() || "",
    image: formData.get("image") as File | null,
    invite_code: formData.get("invite_code")?.toString() || "",
  };

  // 2) Validate with Zod
  const parsed = BrotherSchema.safeParse(rawFields);
  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors,
      message: "Validation failed. Please check your inputs.",
    };
  }

  // 2a) Check invitation code if needed
  const userCode = rawFields.invite_code;
  if (!userCode || userCode !== process.env.SIGNUP_SECRET_CODE) {
    return { message: "Invalid invitation code." };
  }

  // 3) Hash password
  const hashedPassword = await bcrypt.hash(parsed.data.password, 10);

  // 4) Upload image to Vercel Blob
  const imageFile = parsed.data.image;
  if (!imageFile) {
    return { message: "No image file was provided." };
  }

  try {
    const fileBuffer = Buffer.from(await imageFile.arrayBuffer());
    const fileName = `brother-profile-${randomUUID()}-${imageFile.name}`;
    const { url } = await put(fileName, fileBuffer, {
      access: "public",
      contentType: imageFile.type,
    });

    // 5) Insert into DB
    const brotherId = randomUUID();
    await sql`
      INSERT INTO brothers (
        id, 
        personal_email, 
        school_email,
        password,
        first_name,
        last_name,
        year,
        phone,
        house,
        brother_name,
        birthday,
        location,
        tagline,
        position,
        bio,
        instagram,
        image_url
      ) 
      VALUES (
        ${brotherId}, 
        ${parsed.data.personal_email}, 
        ${parsed.data.school_email}, 
        ${hashedPassword}, 
        ${parsed.data.first_name},
        ${parsed.data.last_name},
        ${parsed.data.year},
        ${parsed.data.phone},
        ${parsed.data.house},
        ${parsed.data.brother_name},
        ${parsed.data.birthday},
        ${parsed.data.location},
        ${parsed.data.tagline},
        ${parsed.data.position},
        ${parsed.data.bio},
        ${parsed.data.instagram},
        ${url}
      )
    `;
  } catch (error) {
    console.error("Database or Upload Error:", error);
    return { message: "Failed to create brother account." };
  }

  // 6) Revalidate & redirect
  revalidatePath("/brothers");
  redirect("/brothers");
}

// ============= CREATE RECRUIT ACCOUNT =============
export async function createRecruitAccount(
  prevState: State,
  formData: FormData
) {
  const rawFields = {
    email: formData.get("email")?.toString() || "",
    first_name: formData.get("first_name")?.toString() || "",
    last_name: formData.get("last_name")?.toString() || "",
    year: formData.get("year")?.toString() || "",
    phone: formData.get("phone")?.toString() || "",
    room: formData.get("room")?.toString() || "",
    image: formData.get("image") as File | null,
  };
  const parsed = RecruitSchema.safeParse(rawFields);
  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors,
      message: "Validation failed. Please check your inputs.",
    };
  }

  const imageFile = parsed.data.image;
  if (!imageFile) {
    return { message: "No image file provided." };
  }

  try {
    // Upload image directly without conversion
    const fileBuffer = Buffer.from(await imageFile.arrayBuffer());
    const fileName = `recruit-profile-${randomUUID()}-${imageFile.name}`;
    const { url } = await put(fileName, fileBuffer, {
      access: "public",
      contentType: imageFile.type,
    });

    // Insert recruit
    const recruitId = randomUUID();
    await sql`
      INSERT INTO recruits (
        id, 
        email,
        first_name,
        last_name,
        year,
        phone,
        room,
        image_url
      ) 
      VALUES (
        ${recruitId}, 
        ${parsed.data.email},
        ${parsed.data.first_name},
        ${parsed.data.last_name},
        ${parsed.data.year},
        ${parsed.data.phone},
        ${parsed.data.room},
        ${url}
      )
    `;
  } catch (error) {
    console.error("Recruit DB Error:", error);
    return { message: "Failed to create recruit account." };
  }

  revalidatePath("/");
  redirect("/");
}

// ============= EDIT BROTHER ACCOUNT =============
export async function updateBrotherProfile(
  prevState: State,
  formData: FormData
) {
  // 1) Extract from form
  const rawFields = {
    brotherId: formData.get("brotherId")?.toString() || "",
    first_name: formData.get("first_name")?.toString() || "",
    last_name: formData.get("last_name")?.toString() || "",
    personal_email: formData.get("personal_email")?.toString() || "",
    school_email: formData.get("school_email")?.toString() || "",
    year: formData.get("year")?.toString() || "",
    phone: formData.get("phone")?.toString() || "",
    house: formData.get("house")?.toString() || "",
    brother_name: formData.get("brother_name")?.toString() || "",
    birthday: formData.get("birthday")?.toString() || "",
    location: formData.get("location")?.toString() || "",
    tagline: formData.get("tagline")?.toString() || "",
    position: formData.get("position")?.toString() || "",
    bio: formData.get("bio")?.toString() || "",
    instagram: formData.get("instagram")?.toString() || "",
    image: formData.get("image") as File | null,
  };

  // 2) Validate with your EditBrotherSchema, which must allow optional `image`
  const parsed = EditBrotherSchema.safeParse(rawFields);
  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors,
      message: "Validation failed.",
    };
  }

  let newImageUrl: string | undefined;
  const imageFile = parsed.data.image;
  if (imageFile && imageFile.size > 0) {
    try {
      // Upload image directly without conversion
      const fileBuffer = Buffer.from(await imageFile.arrayBuffer());
      const fileName = `brother-profile-${randomUUID()}-${imageFile.name}`;
      const { url } = await put(fileName, fileBuffer, {
        access: "public",
        contentType: imageFile.type,
      });
      newImageUrl = url;
    } catch (error) {
      console.error("Image Upload Error:", error);
      return { message: "Failed to upload new photo." };
    }
  }

  // 3) Update DB
  try {
    if (newImageUrl) {
      await sql`
        UPDATE brothers
        SET
          first_name = ${parsed.data.first_name},
          last_name = ${parsed.data.last_name},
          personal_email = ${parsed.data.personal_email},
          school_email = ${parsed.data.school_email},
          year = ${parsed.data.year},
          phone = ${parsed.data.phone},
          house = ${parsed.data.house},
          brother_name = ${parsed.data.brother_name},
          birthday = ${parsed.data.birthday},
          location = ${parsed.data.location},
          tagline = ${parsed.data.tagline},
          position = ${parsed.data.position},
          bio = ${parsed.data.bio},
          instagram = ${parsed.data.instagram || null},
          image_url = ${newImageUrl}
        WHERE id = ${parsed.data.brotherId}
      `;
    } else {
      await sql`
        UPDATE brothers
        SET
          first_name = ${parsed.data.first_name},
          last_name = ${parsed.data.last_name},
          personal_email = ${parsed.data.personal_email},
          school_email = ${parsed.data.school_email},
          year = ${parsed.data.year},
          phone = ${parsed.data.phone},
          house = ${parsed.data.house},
          brother_name = ${parsed.data.brother_name},
          birthday = ${parsed.data.birthday},
          location = ${parsed.data.location},
          tagline = ${parsed.data.tagline},
          position = ${parsed.data.position},
          bio = ${parsed.data.bio},
          instagram = ${parsed.data.instagram || null}
        WHERE id = ${parsed.data.brotherId}
      `;
    }
  } catch (error) {
    console.error("DB Error:", error);
    return { message: "Database Error: Failed to update profile." };
  }

  // 4) Revalidate and redirect
  revalidatePath("/brothers");
  redirect("/brothers");
}