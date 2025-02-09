"use server";

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { randomUUID } from "crypto"; 
// ✅ Using the top-level `put(...)` function from "@vercel/blob"
import { put } from "@vercel/blob";
import { BrotherSchema, RecruitSchema } from "./zod-schemas";

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

// ============= COMMENT SCHEMAS / ACTIONS =============

// Define Zod schema for comment validation
const CommentSchema = z.object({
  recruitId: z.string().min(1, { message: "Recruit ID is required." }),
  brotherId: z.string().min(1, { message: "Brother ID is required." }),
  comment: z.string().min(1, { message: "Comment cannot be empty." }),
  redFlag: z.string().optional(),
});

// Define state type for comments
export type State = {
  errors?: Record<string, string[]>;
  message?: string | null;
};

// Create a new comment
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

  try {
    await sql`
      INSERT INTO recruit_comments (id, recruit_id, brother_id, comment, red_flag)
      VALUES (${commentId}, ${recruitId}, ${brotherId}, ${comment}, ${redFlag || null})
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

// Fetch existing comment by `recruitId` and `brotherId`
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

// Create or update comment
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

  try {
    if (rawFields.commentId) {
      // Update existing comment
      await sql`
        UPDATE recruit_comments 
        SET comment = ${comment}, red_flag = ${redFlag || null}
        WHERE id = ${commentId}
      `;
    } else {
      // Insert new comment
      await sql`
        INSERT INTO recruit_comments (id, recruit_id, brother_id, comment, red_flag)
        VALUES (${commentId}, ${recruitId}, ${brotherId}, ${comment}, ${redFlag || null})
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
export async function createBrotherAccount(prevState: State, formData: FormData) {
  // 1) Extract all fields, including "image"
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
  };

  // 2) Validate with Zod
  const parsed = BrotherSchema.safeParse(rawFields);
  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors,
      message: "Validation failed. Please check your inputs.",
    };
  }

  // 3) Hash the password with bcrypt (saltRounds = 10)
  const hashedPassword = await bcrypt.hash(parsed.data.password, 10);

  // 4) Handle file upload to Vercel Blob
  const imageFile = parsed.data.image;
  if (!imageFile) {
    return {
      message: "No image file was provided.",
    };
  }

  try {
    const fileBuffer = Buffer.from(await imageFile.arrayBuffer());
    const fileName = `brother-profile-${randomUUID()}-${imageFile.name}`;

    // Use `put(...)` from "@vercel/blob"
    const { url } = await put(fileName, fileBuffer, {
      access: "public",
      contentType: imageFile.type, // <-- No 'httpMetadata'
    });

    // 5) Insert validated data + hashed password + image URL into DB
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
        ${hashedPassword},  -- storing hashed password
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
    return {
      message: "Failed to create brother account.",
    };
  }

  // 6) Revalidate and Redirect
  revalidatePath("/brothers");
  redirect("/brothers");
}

// ============= CREATE RECRUIT ACCOUNT =============
export async function createRecruitAccount(prevState: State, formData: FormData) {
  // 1) Extract fields, including "image"
  const rawFields = {
    email: formData.get("email")?.toString() || "",
    first_name: formData.get("first_name")?.toString() || "",
    last_name: formData.get("last_name")?.toString() || "",
    year: formData.get("year")?.toString() || "",
    phone: formData.get("phone")?.toString() || "",
    room: formData.get("room")?.toString() || "",
    image: formData.get("image") as File | null,
  };

  // 2) Validate with Zod
  const parsed = RecruitSchema.safeParse(rawFields);
  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors,
      message: "Validation failed. Please check your inputs.",
    };
  }

  // 3) Handle file upload to Vercel Blob
  const imageFile = parsed.data.image;
  if (!imageFile) {
    return {
      message: "No image file was provided.",
    };
  }

  try {
    const fileBuffer = Buffer.from(await imageFile.arrayBuffer());
    const fileName = `recruit-profile-${randomUUID()}-${imageFile.name}`;

    // Use `put(...)` from "@vercel/blob"
    const { url } = await put(fileName, fileBuffer, {
      access: "public",
      contentType: imageFile.type,
    });

    // 4) Insert validated data + image URL into DB
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
    console.error("Database or Upload Error:", error);
    return {
      message: "Failed to create recruit account.",
    };
  }

  // 5) Revalidate & redirect
  revalidatePath("/");
  redirect("/");
}