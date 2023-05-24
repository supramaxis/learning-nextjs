import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/libs/prismadb';
import getCurrentUser from '@/actions/getCurrentUser';

export async function DELETE(
  request: Request,
  { params }: { params: { id: number } }
) {
  // const session = await getSession();

  try {
    const currentUser = await getCurrentUser();
    console.log(currentUser);

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('No autorizado', { status: 401 });
    }
    const urlId = Number(params.id);
    const userId = String(currentUser.id);

    await prisma.url.delete({
      where: {
        userId_id: {
          userId,
          id: urlId
        }
      }
    });

    return new NextResponse(null, { status: 204 });
  } catch (error: any) {
    if (error.code === 'P2025') {
      return new NextResponse('No se encontro a un usuario con ese id', {
        status: 404
      });
    }
    console.log('ERROR_MESSAGE FROM API/URLS', error);
    return new NextResponse('ERROR_MESSAGE FROM API/URLS', { status: 500 });
  }
}

