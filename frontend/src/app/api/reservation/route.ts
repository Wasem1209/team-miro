import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    console.log('Sending reservation data:', body);
    
    const response = await fetch(
      'https://driveeasy.pythonanywhere.com/api/v1/reservation',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );

    const contentType = response.headers.get('content-type');
    console.log('Response status:', response.status);
    console.log('Response content-type:', contentType);

    // Check if response is JSON
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      
      if (!response.ok) {
        console.error('API error response:', data);
        return NextResponse.json(
          { 
            error: 'Failed to create reservation',
            details: data,
            status: response.status
          },
          { status: response.status }
        );
      }

      return NextResponse.json(data, { status: response.status });
    } else {
      // Response is not JSON (likely HTML error page)
      const text = await response.text();
      console.error('Non-JSON response:', text.substring(0, 500));
      
      return NextResponse.json(
        { 
          error: 'API returned invalid response',
          message: 'The reservation endpoint is not responding correctly. Please check the API endpoint.',
          status: response.status,
          responsePreview: text.substring(0, 200)
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error creating reservation:', error);
    return NextResponse.json(
      { 
        error: 'Failed to create reservation',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export const dynamic = 'force-dynamic';