'use client';
import { Box, Center, Container } from '@chakra-ui/react';

import { useContext, useState, useEffect } from 'react';
import UrlsModal from '@/components/UrlsModal';
import UrlsTable from '@/components/UrlsTable';
import UrlsContext from '@/context/UrlsContext';
import SignOut from '@/components/SignOut';
import { useSession } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';
import { DataItem } from '@/types';

export default function Shorten() {
  const [urls, setUrls] = useState<DataItem[]>([]);
  const { data, error } = useContext(UrlsContext);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (data) setUrls(data);
  }, [data]);

  const handleUrlCreated = (url: DataItem) => {
    setUrls([...urls, url]);
  };

  useEffect(() => {
    if (!session?.user.email) router.push('/login');
  }, [session]);

  let content;
  if (data === undefined) {
    content = (
      <Center>
        <h3>Loading...</h3>
      </Center>
    );
  } else if (data.length === 0) {
    content = <Center>No hay links para mostrar. Crea algunos</Center>;
  } else {
    content = <UrlsTable data={urls} />;
  }

  return (
    <>
      {content}

      <UrlsModal onUrlCreated={handleUrlCreated} />
      <SignOut />
    </>
  );
}

