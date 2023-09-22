import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { currentUser } from "@clerk/nextjs";

export async function GET() {
  try {
    const actualUser = await currentUser();
    if (!actualUser?.id || !actualUser?.primaryEmailAddressId) {
      console.log("Unauthorized");
      return new NextResponse("Unauthorized", { status: 401 });
    } else {
      const externalId = actualUser.id;
      const urls = await prisma.url.findMany({
        where: {
          externalId,
        },
      });
      return NextResponse.json(urls);
    }
  } catch (error) {
    console.log("ERROR_MESSAGE FROM API/URLS", error);
    return new NextResponse("ERROR_MESSAGE FROM API/URLS", { status: 500 });
  }
}
