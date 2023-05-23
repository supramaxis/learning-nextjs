'use client';
import { Box, Center, Container } from '@chakra-ui/react';

import { useContext, useEffect } from 'react';
import UrlsModal from '@/components/UrlsModal';
import UrlsTable from '@/components/UrlsTable';
import UrlsContext from '@/context/UrlsContext';
import SignOut from '@/components/SignOut';
import { useSession } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';

export default function Shorten() {
  const { data, error } = useContext(UrlsContext);
  const { data: session } = useSession();
  const router = useRouter();

  if (!session?.user.email) {
    router.push('/login');
  }

  let content;
  if (data === undefined) {
    content = <Center>loading...</Center>;
  } else if (data.length === 0) {
    content = <Center>No hay links para mostrar. Crea algunos</Center>;
  } else {
    content = <UrlsTable />;
  }

  return (
    <>
      <UrlsModal />
      {/* TODO: make the api endpoint /api/urls accessible from all components */}

      {content}

      <SignOut />
    </>
  );
}

