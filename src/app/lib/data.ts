import { BrotherOverviewField } from "./definitions";
import { sql } from "@vercel/postgres";

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
        throw new Error('Failed to fetch all brothers.');
    }
}
