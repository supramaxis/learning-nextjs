//api endpoint to get a short url from a long url using prisma posgresql database

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { clerkClient } from "@clerk/nextjs/server";
import { auth } from "@clerk/nextjs";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { url, customCode } = body;
  const { sessionId } = auth();
  const session = sessionId
    ? await clerkClient.sessions.getSession(sessionId)
    : null;
  console.log(`Session: ${JSON.stringify(session)}`);
  let shortUrl = customCode;
  const userId = session?.userId;

  if (!userId) {
    return (
      NextResponse.json({ error: "Unauthorized" }),
      {
        status: 401,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  if (!shortUrl) shortUrl = Math.random().toString(36).substring(2, 7);

  try {
    if (!userId) {
      return NextResponse.json(
        { error: "No user found" },
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    if (session) {
      const userId = session.userId;
      if (userId) {
        if (customCode) {
          const existingUrl = await prisma.url.findFirst({
            where: {shortUrl: customCode}
          })

          if (existingUrl) {
            return NextResponse.json({error: {
              message: "Custom code already exists"
            }}, {
              status: 409,
              headers: {"Content-Type": "application/json"}
            })
          }
        }


        const data = await prisma.url.create({
          data: {
            url,
            shortUrl,
            user: {
              connect: {
                externalId: session.userId,
              },
            },
          },
        });
        console.log(data);
        return NextResponse.json(data);
      } else {
        return NextResponse.json(
          { error: "userId null or undefined" },
          { status: 500, headers: { "Content-Type": "application/json" } }
        );
      }
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
