import { NextResponse } from "next/server";
import { db } from "@vercel/postgres";

export async function GET() {
  const client = await db.connect();

  async function dropTables() {
    try {
      console.log("🚨 Dropping all tables...");
      await client.sql`BEGIN`;

      await client.sql`DROP TABLE IF EXISTS recruit_comments;`;
      await client.sql`DROP TABLE IF EXISTS recruits;`;
      await client.sql`DROP TABLE IF EXISTS brothers;`;

      await client.sql`COMMIT`;
      console.log("✅ All tables dropped successfully.");
    } catch (error) {
      await client.sql`ROLLBACK`;
      console.error("❌ Error dropping tables:", error);
      throw error;
    }
  }

  try {
    await client.sql`BEGIN`;
    await dropTables();
    await client.sql`COMMIT`;

    console.log("✅ Database dropped successfully.");
    return NextResponse.json({ message: "Database dropped successfully." });
  } catch (error) {
    await client.sql`ROLLBACK`;
    console.error("❌ Dropping error:", error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  } finally {
    client.release(); // ✅ Always release the client connection
  }
}
