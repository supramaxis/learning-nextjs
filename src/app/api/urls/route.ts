import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { currentUser } from "@clerk/nextjs";

export async function GET() {
  try {
    const actualUser = await currentUser();
    if (!actualUser?.id || !actualUser?.primaryEmailAddressId) {
      console.log("No autorizado");
      return new NextResponse("No autorizado", { status: 401 });
    } else {
      const userId = actualUser.id;
      const urls = await prisma.url.findMany({
        where: {
          userId,
        },
      });
      return NextResponse.json(urls);
    }
  } catch (error) {
    console.log("ERROR_MESSAGE FROM API/URLS", error);
    return new NextResponse("ERROR_MESSAGE FROM API/URLS", { status: 500 });
  }
}
