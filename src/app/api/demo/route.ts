//api endpoint to get a short url from a long url using prisma posgresql database

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { url } = body;
  const slug = Math.random().toString(36).substring(2, 7);

  try {
    const data = {
      url,
      slug,
    };

    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
