//api endpoint to get a short url from a long url using prisma mongodb

import { NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { url, customCode } = body;
  let shortUrl = customCode;

  if (!shortUrl) {
    shortUrl = Math.random().toString(36).substring(2, 7);
  }

  try {
    const data = await prisma.url.create({
      data: {
        url,
        shortUrl
      }
    });

    prisma.$disconnect();

    console.log(data);
    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

