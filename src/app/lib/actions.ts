"use server";

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { randomUUID } from "crypto"; // Import UUID generator

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

// Define Zod schema for validation
const CommentSchema = z.object({
  recruitId: z.string().min(1, { message: "Recruit ID is required." }),
  brotherId: z.string().min(1, { message: "Brother ID is required." }),
  comment: z.string().min(1, { message: "Comment cannot be empty." }),
  redFlag: z.string().optional(),
});

// Define state type
export type State = {
  errors?: {
    recruitId?: string[];
    brotherId?: string[];
    comment?: string[];
    redFlag?: string[];
  };
  message?: string | null;
};

// Function to create a new comment
export async function createComment(prevState: State, formData: FormData) {
  // Ensure all form fields return a string (convert null to empty string)
  const rawFields = {
    recruitId: formData.get("recruitId")?.toString() || "",
    brotherId: formData.get("brotherId")?.toString() || "",
    comment: formData.get("comment")?.toString() || "",
    redFlag: formData.get("redFlag")?.toString() || "", // Ensure empty strings instead of null
  };

  // Validate form data using Zod
  const validatedFields = CommentSchema.safeParse(rawFields);

  console.log(validatedFields);

  // If validation fails, return errors early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Submit Comment.",
    };
  }

  // Extract validated data
  const { recruitId, brotherId, comment, redFlag } = validatedFields.data;
  const commentId = randomUUID(); // Generate a unique UUID for the comment

  // Insert data into the database
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


  // Revalidate cache for the page where comments are displayed
  revalidatePath(`/recruits/${recruitId}/details`);
  redirect(`/recruits/${recruitId}/details`);
}

// ✅ Fetch existing comment by `recruitId` and `brotherId`
export async function getCommentByRecruitAndBrother(recruitId: string, brotherId: string) {
  try {
    const result = await sql`
      SELECT id, comment, red_flag FROM recruit_comments 
      WHERE recruit_id = ${recruitId} AND brother_id = ${brotherId} 
      LIMIT 1
    `;
    return result.rows[0] || null;
  } catch (error) {
    console.error("Error fetching comment:", error);
    return null;
  }
}

// ✅ Create or update comment
export async function upsertComment(prevState: State, formData: FormData) {
  const rawFields = {
    recruitId: formData.get("recruitId")?.toString() || "",
    brotherId: formData.get("brotherId")?.toString() || "",
    comment: formData.get("comment")?.toString() || "",
    redFlag: formData.get("redFlag")?.toString() || "",
    commentId: formData.get("commentId")?.toString() || "", // May be empty if creating
  };

  // Validate form data using Zod
  const validatedFields = CommentSchema.safeParse(rawFields);

  console.log(validatedFields);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Submit Comment.",
    };
  }

  const { recruitId, brotherId, comment, redFlag } = validatedFields.data;
  const commentId = rawFields.commentId || randomUUID(); // Use existing ID or create new

  try {
    if (rawFields.commentId) {
      // ✅ Update existing comment
      await sql`
        UPDATE recruit_comments 
        SET comment = ${comment}, red_flag = ${redFlag || null}
        WHERE id = ${commentId}
      `;
    } else {
      // ✅ Insert new comment
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

  // Revalidate cache for the page where comments are displayed
  revalidatePath(`/recruits/${recruitId}/details`);
  redirect(`/recruits/${recruitId}/details`);
}
