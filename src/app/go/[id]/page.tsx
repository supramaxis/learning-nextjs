import prisma from '@/lib/prismadb'
import { redirect } from "next/navigation";

interface Params {
  id: string;
}

export default async function ShortIdPage({ params }: { params: Params }) {
  const { id } = params;

  //make the redirection to the long url

  const data = await prisma.url.findUnique({
    where: { shortUrl: id },
  });

  prisma.$disconnect();

  if (!data) {
    redirect("/");
  } else {
    redirect(data.url);
  }
}
