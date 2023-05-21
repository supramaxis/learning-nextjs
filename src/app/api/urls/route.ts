import { NextRequest } from 'next/server';
import prisma from '@/app/libs/prismadb';
// import getSession from '@/app/actions/getSession';
import { getSession } from 'next-auth/react';
// import { useSession } from 'next-auth/react';

export async function GET(req: NextRequest) {
  const compatibleReq = {
    headers: Object.fromEntries(req.headers.entries())
  };
  const session = await getSession({ req: compatibleReq });
  // const { data: session, status } = useSession();

  if (!session?.user.id) {
    return new Response(JSON.stringify({ error: 'No autorizado' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  console.log(session);

  const userId = session?.user.id;
  const urls = await prisma.url.findMany({
    where: {
      userId
    }
  });

  return new Response(JSON.stringify(urls), {
    headers: { 'Content-Type': 'application/json' }
  });
}

