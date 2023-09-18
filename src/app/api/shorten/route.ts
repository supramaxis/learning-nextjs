//api endpoint to get a short url from a long url using prisma posgresql database

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import getSession from "@/actions/getSession";
import { getAuth, clerkClient } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  // const session = await getSession();
  const body = await req.json();
  const { url, customCode } = body;
  const { userId, sessionId } = getAuth(req);
  const session = sessionId ? await clerkClient.sessions.getSession(sessionId) : null;


  let shortUrl = customCode;

  if (!userId) {
    return (
      NextResponse.json({ error: "No autorizado" }),
      {
        status: 401,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  if (!shortUrl) {
    shortUrl = Math.random().toString(36).substring(2, 7);
  }

  try {
    if (session) {
      const userId = session.userId;

      const data = await prisma.url.create({
        data: {
          url,
          shortUrl,
          userId,
        },
      });
      console.log(data);
      return NextResponse.json(data);
    } else {
      return NextResponse.json(
        { error: "No session found" },
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
