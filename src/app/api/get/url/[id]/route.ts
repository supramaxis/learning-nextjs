import prisma from "@/lib/prismadb";
import { NextResponse, NextRequest } from "next/server";
import { currentUser } from "@clerk/nextjs";
import { clerkClient } from "@clerk/nextjs/server";
import { auth } from "@clerk/nextjs";
import type { NextApiRequest } from "next";

export async function GET(req: NextApiRequest) {
  const url = new URL(req.url!, "http://localhost:3000");
  const linkIdstr = url.pathname.split("/").pop();
  // console.log(url);
  console.log(linkIdstr);
  const { sessionId } = auth();
  const actualUser = await currentUser();

  const session = sessionId
    ? await clerkClient.sessions.getSession(sessionId)
    : null;
  const userId = session?.userId;

  try {
    if (!userId || !actualUser?.emailAddresses?.[0]?.emailAddress) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const singleUrl = await prisma.url.findFirst({
      where: {
        id: linkIdstr,
      },
    });
    // console.log(null, { status: 204 });
    return NextResponse.json(singleUrl?.url, {status: 200});
  } catch (error: any) {
    if (error.code === "P2025") {
      return new NextResponse("URL not found", {
        status: 404,
      });
    }
    console.log("delete endpoint error:", error);
    return new NextResponse("delete endpoint error:" + error, { status: 500 });
  }
}
