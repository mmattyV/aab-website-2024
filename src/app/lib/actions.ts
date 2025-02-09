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
import { maybeConvertHeicToJpg } from "./convertHeic"; //

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

// -------------- CREATE BROTHER ACCOUNT -----------------
export async function createBrotherAccount(prevState: State, formData: FormData) {
  // 1) Extract fields
  const rawFields = {
    personal_email: formData.get("personal_email")?.toString() || "",
    school_email: formData.get("school_email")?.toString() || "",
    password: formData.get("password")?.toString() || "",
    // ... other fields ...
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

  // 4) Convert .heic → .jpg if needed, then upload
  const imageFile = parsed.data.image;
  if (!imageFile) {
    return { message: "No image file was provided." };
  }

  try {
    const { buffer, contentType, fileName } = await maybeConvertHeicToJpg(imageFile);
    const finalFileName = `brother-profile-${randomUUID()}-${fileName}`;
    const { url } = await put(finalFileName, buffer, {
      access: "public",
      contentType,
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
        /* ...fields... */,
        image_url
      )
      VALUES (
        ${brotherId},
        ${parsed.data.personal_email},
        ${parsed.data.school_email},
        ${hashedPassword},
        ${parsed.data.first_name},
        ${parsed.data.last_name},
        /* ...fields... */,
        ${url}
      )
    `;
  } catch (error) {
    console.error("Database or Upload Error:", error);
    return { message: "Failed to create brother account." };
  }

  revalidatePath("/brothers");
  redirect("/brothers");
}

// -------------- CREATE RECRUIT ACCOUNT -----------------
export async function createRecruitAccount(prevState: State, formData: FormData) {
  const rawFields = {
    email: formData.get("email")?.toString() || "",
    // ...
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
    // Convert if .heic
    const { buffer, contentType, fileName } = await maybeConvertHeicToJpg(imageFile);
    const finalName = `recruit-profile-${randomUUID()}-${fileName}`;
    const { url } = await put(finalName, buffer, {
      access: "public",
      contentType,
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

// -------------- UPDATE BROTHER PROFILE -----------------
export async function updateBrotherProfile(prevState: State, formData: FormData) {
  // 1) Extract from form
  const rawFields = {
    brotherId: formData.get("brotherId")?.toString() || "",
    // ...
    image: formData.get("image") as File | null,
  };

  // 2) Validate with your EditBrotherSchema, which must allow optional `image`
  // e.g. z.any().optional()
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
      // Convert if .heic
      const { buffer, contentType, fileName } = await maybeConvertHeicToJpg(imageFile);
      const finalName = `brother-profile-${randomUUID()}-${fileName}`;
      const { url } = await put(finalName, buffer, {
        access: "public",
        contentType,
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
          /* ...fields... */,
          image_url = ${newImageUrl}
        WHERE id = ${parsed.data.brotherId}
      `;
    } else {
      await sql`
        UPDATE brothers
        SET
          first_name = ${parsed.data.first_name},
          last_name = ${parsed.data.last_name},
          /* ...fields... */
        WHERE id = ${parsed.data.brotherId}
      `;
    }
  } catch (error) {
    console.error("DB Error:", error);
    return { message: "Database Error: Failed to update profile." };
  }

  revalidatePath("/brothers");
  redirect("/brothers");
}