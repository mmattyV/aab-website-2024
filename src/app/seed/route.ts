import bcrypt from "bcrypt";
import { db } from "@vercel/postgres";
import { brothers, recruits, recruitComments } from "../lib/placeholder-data";

const client = await db.connect();

async function createTables() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  console.log("🔨 Creating tables...");

  // ✅ Create Brothers Table with `image_url`
  await client.sql`
    CREATE TABLE IF NOT EXISTS brothers (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      first_name VARCHAR(255) NOT NULL,
      last_name VARCHAR(255) NOT NULL,
      personal_email TEXT NOT NULL UNIQUE,
      school_email TEXT NOT NULL UNIQUE,
      brother_name VARCHAR(255),
      house VARCHAR(255) NOT NULL,
      year INT NOT NULL,
      birthday DATE NOT NULL,
      location TEXT NOT NULL,
      phone VARCHAR(20) NOT NULL,
      tagline TEXT,
      position VARCHAR(255),
      bio TEXT,
      instagram VARCHAR(255),
      password TEXT NOT NULL,
      image_url TEXT NOT NULL
    );
  `;

  // ✅ Create Recruits Table with `image_url`
  await client.sql`
    CREATE TABLE IF NOT EXISTS recruits (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      first_name VARCHAR(255) NOT NULL,
      last_name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      phone VARCHAR(20) NOT NULL,
      year INT NOT NULL,
      room VARCHAR(255) NOT NULL,
      image_url TEXT NOT NULL
    );
  `;

  // ✅ Create Recruit Comments Table
  await client.sql`
    CREATE TABLE IF NOT EXISTS recruit_comments (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      recruit_id UUID NOT NULL REFERENCES recruits(id) ON DELETE CASCADE,
      brother_id UUID NOT NULL REFERENCES brothers(id) ON DELETE CASCADE,
      comment TEXT NOT NULL,
      red_flag TEXT
    );
  `;

  console.log("✅ Tables created successfully.");
}

async function seedBrothers() {
  console.log("🌱 Seeding brothers...");

  const insertedBrothers = await Promise.all(
    brothers.map(async (brother) => {
      const hashedPassword = await bcrypt.hash("defaultpassword", 10);

      return client.sql`
        INSERT INTO brothers (
          id, first_name, last_name, personal_email, school_email, brother_name, house, year, 
          birthday, location, phone, tagline, position, bio, instagram, password, image_url
        )
        VALUES (
          ${brother.id}, ${brother.first_name}, ${brother.last_name}, ${brother.personal_email}, 
          ${brother.school_email}, ${brother.brother_name}, ${brother.house}, ${brother.year}, 
          ${brother.birthday}, ${brother.location}, ${brother.phone}, ${brother.tagline}, 
          ${brother.position}, ${brother.bio}, ${brother.instagram}, ${hashedPassword}, ${brother.image_url}
        )
        ON CONFLICT (id) DO NOTHING;
      `;
    })
  );

  return insertedBrothers;
}

async function seedRecruits() {
  console.log("🌱 Seeding recruits...");

  const insertedRecruits = await Promise.all(
    recruits.map(
      (recruit) =>
        client.sql`
        INSERT INTO recruits (id, first_name, last_name, email, phone, year, room, image_url)
        VALUES (${recruit.id}, ${recruit.first_name}, ${recruit.last_name}, ${recruit.email}, 
                ${recruit.phone}, ${recruit.year}, ${recruit.room}, ${recruit.image_url})
        ON CONFLICT (id) DO NOTHING;
      `
    )
  );

  return insertedRecruits;
}

async function seedRecruitComments() {
  console.log("🌱 Seeding recruit comments...");

  const insertedComments = await Promise.all(
    recruitComments.map(
      (comment) =>
        client.sql`
        INSERT INTO recruit_comments (id, recruit_id, brother_id, comment, red_flag)
        VALUES (${comment.id}, ${comment.recruit_id}, ${comment.brother_id}, 
                ${comment.comment}, ${comment.red_flag})
        ON CONFLICT (id) DO NOTHING;
      `
    )
  );

  return insertedComments;
}

export async function GET() {
  try {
    await client.sql`BEGIN`;
    await createTables();
    await seedBrothers();
    await seedRecruits();
    await seedRecruitComments();
    await client.sql`COMMIT`;

    console.log("✅ Database seeded successfully.");
    return Response.json({ message: "Database seeded successfully" });
  } catch (error) {
    await client.sql`ROLLBACK`;
    console.error("❌ Seeding error:", error);
    return Response.json({ error }, { status: 500 });
  }
}
