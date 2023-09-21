import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { currentUser } from "@clerk/nextjs";
export async function DELETE({ params }: { params: { id: number } }) {
  try {
    const actualUser = await currentUser();

    if (!actualUser?.id || !actualUser?.emailAddresses?.[0]?.emailAddress) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const urlId = Number(params.id);
    const userId = String(actualUser.id);

    await prisma.url.delete({
      where: {
        userId_id: {
          userId,
          id: urlId,
        },
      },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error: any) {
    if (error.code === "P2025") {
      return new NextResponse("No url was found with that id", {
        status: 404,
      });
    }
    console.log("delete endpoint error", error);
    return new NextResponse("delete endpoint error", { status: 500 });
  }
}
