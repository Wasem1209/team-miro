import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> } // updated type for Next.js 15
) {
  try {
    const { id } = await context.params; // await params since it's now a Promise

    const response = await fetch(
      `https://driveeasy.pythonanywhere.com/api/v1/car/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(`API returned status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching car details:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch car details",
        message:
          error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 }
    );
  }
}

export const dynamic = "force-dynamic";
export const revalidate = 0;