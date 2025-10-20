import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://driveeasy.pythonanywhere.com/api/v1/car', {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // Ensures fresh data on each request
    });

    if (!response.ok) {
      throw new Error(`API returned status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching cars from backend:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch cars',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Optional: Add dynamic route segment config if needed
export const dynamic = 'force-dynamic';
export const revalidate = 0;