import { NextResponse } from 'next/server';
import prisma from '@/lib/prismadb';
import getCurrentUser from '@/actions/getCurrentUser';

export async function GET() {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('No autorizado', { status: 401 });
    }
    const userId = currentUser.id;
    const urls = await prisma.url.findMany({
      where: {
        userId
      }
    });

    return NextResponse.json(urls);
  } catch (error) {
    console.log('ERROR_MESSAGE FROM API/URLS', error);
    return new NextResponse('ERROR_MESSAGE FROM API/URLS', { status: 500 });
  }
}

