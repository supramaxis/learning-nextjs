import { PrismaClient } from '@prisma/client';
import { redirect } from 'next/navigation';

export default async function ShortIdPage({ params }) {
  const prisma = new PrismaClient();
  const { id } = params;

  //make the redirection to the long url

  const data = await prisma.url.findUnique({
    where: { shortUrl: id }
  });

  prisma.$disconnect();

  console.log(data);

  const obj = {};

  if (!data) {
    redirect('/');
  } else {
    redirect(data.url);
  }
}

