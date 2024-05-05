import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { User, currentUser } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs/server";
import { auth } from "@clerk/nextjs/server";
import type { NextApiRequest } from "next";

export class URLHandler {
  constructor(private req: NextApiRequest) {}

  async authenticate() {
    const { sessionId } = auth();
    const actualUser = await currentUser();
    const session = sessionId
      ? await clerkClient.sessions.getSession(sessionId)
      : null;
    const userId = session?.userId;

    return { actualUser, userId };
  }

  async getURL() {
    const { actualUser, userId } = await this.authenticate();

    // const { actualUser, userId } = authResult;
    const url = new URL(this.req.url!, "http://localhost:3000");
    const linkIdstr = url.pathname.split("/").pop();
    // console.log(url);
    console.log(linkIdstr);

    if (!userId || !actualUser?.emailAddresses?.[0]?.emailAddress)
      return new NextResponse("Unauthorized", { status: 401 });

    try {
      const singleUrl = await prisma.url.findFirst({
        where: {
          id: linkIdstr,
        },
      });
      // console.log(null, { status: 204 });
      return NextResponse.json(singleUrl?.url, { status: 200 });
    } catch (error: any) {
      if (error.code === "P2025")
        return new NextResponse("URL not found", { status: 404 });

      console.log("/api/get/url endpoint error:", error);
      return new NextResponse("/api/get/url endpoint error:" + error, {
        status: 500,
      });
    }
  }

  async getUrls() {
    const { actualUser } = await this.authenticate();
    try {
      if (!actualUser?.id || !actualUser?.primaryEmailAddressId)
        return new NextResponse("Unauthorized", { status: 401 });
      const externalId = actualUser.id;
      const urls = await prisma.url.findMany({
        where: {
          externalId,
        },
      });
      return NextResponse.json(urls);
    } catch (error) {
      console.log("Error message from /api/get/urls endpoint", error);
      return new NextResponse("Error message from /api/get/urls endpoint", {
        status: 500,
      });
    }
  }

  async deleteUrl() {
    const url = new URL(this.req.url!, "http://localhost:3000");
    const linkIdstr = url.pathname.split("/").pop();
    // console.log(url);
    console.log(linkIdstr);
    const {actualUser, userId} = await this.authenticate();

    try {
      if (!userId || !actualUser?.emailAddresses?.[0]?.emailAddress) return new NextResponse("Unauthorized", { status: 401 });

      await prisma.url.delete({
        where: {
          id: linkIdstr,
        },
      });
      // console.log(null, { status: 204 });
      return new NextResponse(null, { status: 204 });
    } catch (error: any) {
      if (error.code === "P2025")
        return new NextResponse("URL not found", { status: 404 });

      console.log("delete endpoint error:", error);
      return new NextResponse("delete endpoint error:" + error, {
        status: 500,
      });
    }
  }
}

interface AuthResult {
  actualUser?: any;
  userId?: string;
}
