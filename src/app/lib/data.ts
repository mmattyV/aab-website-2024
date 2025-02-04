import { BrotherOverviewField } from "./definitions";
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

export async function fetchBrotherById(id: string): Promise<BrotherProfileProps | null> {
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