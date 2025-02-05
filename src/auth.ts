import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { z } from "zod";
import type { Brother } from "@/app/lib/definitions";
import bcrypt from "bcrypt";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

async function getBrother(email: string): Promise<Brother | undefined> {
  try {
    const brother = await sql<Brother[]>`SELECT * FROM brothers WHERE personal_email=${email}`;
    return brother[0];
  } catch (error) {
    console.error("Failed to fetch brother:", error);
    throw new Error("Failed to fetch brother.");
  }
}

// Define NextAuth config
export const authOptions = {
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getBrother(email);
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) return user;
        }

        console.log("Invalid credentials");
        return null;
      },
    }),
  ],
};

// ✅ Correctly export auth from NextAuth v5+
export const { auth, signIn, signOut } = NextAuth(authOptions);