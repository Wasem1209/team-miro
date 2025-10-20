// app/api/signup/route.ts

import { NextResponse } from 'next/server';

const API_URL = 'https://driveeasy.pythonanywhere.com/api/v1/account/auth/users/';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json({ error: data }, { status: res.status });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Something went wrong during signup.' },
      { status: 500 }
    );
  }
}
