// app/api/v1/account/auth/activation/route.ts
import { NextResponse } from 'next/server';

const ACTIVATE_URL = 'https://driveeasy.pythonanywhere.com/api/v1/account/auth/users/activation/';

// Handle GET requests (when user clicks email link)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const uid = searchParams.get('uid');
    const token = searchParams.get('token');

    if (!uid || !token) {
      // Redirect to login with error
      return NextResponse.redirect(
        new URL('/login?error=invalid_activation_link', request.url)
      );
    }

    // Call backend to activate
    const res = await fetch(ACTIVATE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ uid, token }),
    });

    // Handle non-JSON responses
    const contentType = res.headers.get('content-type');
    let data;
    
    if (contentType && contentType.includes('application/json')) {
      data = await res.json();
    } else {
      const text = await res.text();
      data = { message: text };
    }

    if (!res.ok) {
      console.error('Activation failed:', data);
      // Redirect to login with error message
      return NextResponse.redirect(
        new URL('/auth/Signin?error=activation_failed', request.url)
      );
    }

    // Success! Redirect to login with success message
    return NextResponse.redirect(
      new URL('/auth/Signin?success=account_activated', request.url)
    );
    
  } catch (error) {
    console.error('Activation error:', error);
    return NextResponse.redirect(
      new URL('/auth/Signin?error=activation_error', request.url)
    );
  }
}