// app/api/delete-recruit/route.ts
import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres'; // Update with your SQL client

export async function GET() {
  // !!! WARNING: INSECURE PRACTICE !!!
  // This is for demonstration only - never hardcode IDs in production
  const HARDCODED_ID = '752fb653-ae27-448d-abe3-255846fd19b1';

  try {
    // Validate the hardcoded ID
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(HARDCODED_ID)) {
      throw new Error('Invalid hardcoded ID format');
    }

    // Execute deletion
    const result = await sql`
      DELETE FROM recruits
      WHERE id = ${HARDCODED_ID}
      RETURNING id
    `;

    // Check if deletion occurred
    if (result.rowCount === 0) {
      return NextResponse.json(
        { error: 'No recruit found with hardcoded ID' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { 
        message: 'Recruit deleted',
        deletedId: HARDCODED_ID
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Deletion Error:', error);
    return NextResponse.json(
      { 
        error: 'Hardcoded deletion failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}