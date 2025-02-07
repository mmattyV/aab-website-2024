import {
  BrotherOverviewField,
  RecruitOverviewField,
  RecruitCommentProps,
  RecruitProfileProps,
} from "./definitions";
import { sql } from "@vercel/postgres";
import { BrotherProfileProps } from "@/app/lib/definitions";

export async function fetchAllBrothers() {
  try {
    const brothers = await sql<BrotherOverviewField>`
            SELECT id, first_name, last_name, house, position, year, image_url 
            FROM brothers
            ORDER BY year ASC, last_name ASC
        `;

    return brothers.rows;
  } catch (error) {
    console.error("Error fetching brothers", error);
    throw new Error("Failed to fetch all brothers.");
  }
}

export async function fetchBrotherById(
  id: string
): Promise<BrotherProfileProps | null> {
  if (!id) {
    console.error("Error: Missing ID for fetchBrotherById");
    throw new Error("Brother ID is required.");
  }

  try {
    const brother = await sql<BrotherProfileProps>`
      SELECT first_name,
             last_name,
             personal_email,
             school_email,
             brother_name,
             house,
             year,
             birthday,
             location,
             phone,
             tagline,
             position,
             bio,
             instagram,
             image_url
      FROM brothers
      WHERE id = ${id}
      LIMIT 1;
    `;

    if (brother.rows.length === 0) {
      console.warn(`Warning: No brother found with ID ${id}`);
      return null; // ✅ Return `null` instead of throwing an error if no match is found
    }

    return brother.rows[0]; // ✅ Return the first row
  } catch (error) {
    console.error("❌ Error fetching brother by id:", error);
    throw new Error("Failed to fetch brother by id.");
  }
}

export async function fetchAllRecruits() {
  try {
    const recruits = await sql<RecruitOverviewField>`
            SELECT id, first_name, last_name, room, year, image_url 
            FROM recruits
            ORDER BY year ASC, last_name ASC
        `;

    return recruits.rows;
  } catch (error) {
    console.error("Error fetching recruits", error);
    throw new Error("Failed to fetch all recruits.");
  }
}

export async function fetchRecruitById(
  id: string
): Promise<RecruitProfileProps | null> {
  if (!id) {
    console.error("Error: Missing ID for fetchRecruitById");
    throw new Error("Recruit ID is required.");
  }

  try {
    const recruit = await sql<RecruitProfileProps>`
      SELECT first_name,
             last_name,
             email,
             phone,
             year,
             room,
             image_url
      FROM recruits
      WHERE id = ${id}
      LIMIT 1;
    `;

    if (recruit.rows.length === 0) {
      console.warn(`Warning: No recruit found with ID ${id}`);
      return null; // ✅ Return `null` instead of throwing an error if no match is found
    }

    return recruit.rows[0]; // ✅ Return the first row
  } catch (error) {
    console.error("❌ Error fetching recruit by id:", error);
    throw new Error("Failed to fetch recruit by id.");
  }
}

export async function fetchAllComments() {
  try {
    const comments = await sql<RecruitCommentProps>`
            SELECT recruit_id, brother_id, comment, red_flag 
            FROM recruit_comments
            ORDER BY brother_id ASC
        `;

    return comments.rows;
  } catch (error) {
    console.error("Error fetching recruit comments", error);
    throw new Error("Failed to fetch all recruit comments.");
  }
}