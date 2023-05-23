//api endpoint to get a short url from a long url using prisma mongodb

import { NextRequest } from 'next/server';
import prisma from '@/libs/prismadb';
import getSession from '@/actions/getSession';

export async function POST(req: NextRequest) {
  const session = await getSession();
  const body = await req.json();
  const { url, customCode } = body;
  let shortUrl = customCode;

  if (!session?.user?.email) {
    return new Response(JSON.stringify({ error: 'No autorizado' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  if (!shortUrl) {
    shortUrl = Math.random().toString(36).substring(2, 7);
  }

  try {
    if (session) {
      const userId = session.user.id;

      const data = await prisma.url.create({
        data: {
          url,
          shortUrl,
          userId
        }
      });
      console.log(data);
      return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' }
      });
    }
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

