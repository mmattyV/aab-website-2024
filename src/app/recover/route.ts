import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt';

export async function GET() {
  // !!! WARNING: INSECURE PRACTICE !!!
  // This is for demonstration only - NEVER hardcode credentials in production
  const HARDCODED_USER_ID = '80150146-6e1d-47d1-ae0e-57623042e398';
  const HARDCODED_NEW_PASSWORD = 'iamabozo123';

  try {
    // Validate the hardcoded user ID format
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(HARDCODED_USER_ID)) {
      throw new Error('Invalid hardcoded user ID format');
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(HARDCODED_NEW_PASSWORD, 10);

    // Update the password in the database
    const result = await sql`
      UPDATE brothers
      SET password = ${hashedPassword}
      WHERE id = ${HARDCODED_USER_ID}
      RETURNING id
    `;

    // Check if the update was successful
    if (result.rowCount === 0) {
      return NextResponse.json(
        { error: 'No user found with the hardcoded ID' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { 
        message: 'Password updated successfully.',
        updatedUserId: HARDCODED_USER_ID
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Password Update Error:', error);
    return NextResponse.json(
      { 
        error: 'Hardcoded password update failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}