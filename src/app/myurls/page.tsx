'use client';

import { useState, useEffect } from 'react';
// import getSession from '@/app/actions/getSession';
import { useSession } from 'next-auth/react';
import { Container } from '@chakra-ui/react';
import Link from 'next/link';

const MyUrls = () => {
  const [urls, setUrls] = useState([]);

  const { data: session, status } = useSession();
  useEffect(() => {
    const fetchSessionAndLinks = async () => {
      // Solo ejecutar en el entorno del servidor
      if (session) {
        const res = await fetch('/api/urls');
        const data = await res.json();
        console.log(data);
        setUrls(data);
      }
    };

    fetchSessionAndLinks();
  }, [session]);

  return (
    <>
      <Container>
        <h2>Your URLs</h2>
        {urls.length === 0 ? (
          <p>
            No hay links para mostrar. Crea enlaces aca
            <Link href='/shorten'></Link>
          </p>
        ) : (
          <ul>
            {urls.map((urlObj: any) => (
              <li key={urlObj.id}>
                <Link href={`/go/${urlObj.shortUrl}`} target='_blank'>
                  http://localhost:3000/go/{urlObj.shortUrl}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </>
  );
};

export default MyUrls;

