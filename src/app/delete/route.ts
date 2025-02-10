// app/api/delete-brother/route.ts

import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET(request: Request) {
  // Define the specific brother ID to delete
  const TARGET_BROTHER_ID = '6a4b3e72-b54c-456a-904b-f06b7030afc1';

  try {
    // 1. Connect to the database
    // The `sql` object is already configured with the DATABASE_URL from environment variables

    // 2. Check if the brother exists
    const checkResult = await sql`
      SELECT id FROM brothers WHERE id = ${TARGET_BROTHER_ID} LIMIT 1
    `;

    if (checkResult.rows.length === 0) {
      // Brother not found
      return NextResponse.json(
        { error: 'Brother not found.' },
        { status: 404 }
      );
    }

    // 3. Delete the brother record
    await sql`
      DELETE FROM brothers
      WHERE id = ${TARGET_BROTHER_ID}
    `;

    // 4. Return a success response
    return NextResponse.json(
      { message: 'Brother deleted successfully.' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error deleting brother:', error);

    // Return a generic server error
    return NextResponse.json(
      { error: 'Internal Server Error.' },
      { status: 500 }
    );
  }
}