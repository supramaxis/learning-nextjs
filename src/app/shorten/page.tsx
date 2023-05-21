'use client';

import {
  Button,
  Center,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Input
} from '@chakra-ui/react';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import getSession from '@/app/actions/getSession';
import { Session } from 'next-auth';

export default function Shorten() {
  const [userUrls, setUserUrls] = useState([]);
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const customCodeRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
  };
  const handleClick = async () => {
    const url = inputRef.current?.value;
    const customCode = customCodeRef.current?.value || undefined;

    //fetch the api endpoint to create a short url using async await
    const res = await fetch('/api/shorten', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url, customCode })
    });
    const data = await res.json();
    setShortUrl(data.shortUrl);

    if (loading) return <p>Loading...</p>;
  };
  return (
    <>
      <Center h='100vh' w='100vw'>
        <Container>
          <FormControl onSubmit={handleSubmit}>
            <FormLabel>Ingresa la URL a acortar</FormLabel>
            <Input type='url' ref={inputRef} required />
            <FormLabel>Código personalizado (opcional)</FormLabel>
            <Input type='text' ref={customCodeRef} />
            <Button onClick={handleClick} type='submit' mt={4}>
              Acortar
            </Button>
            {shortUrl && (
              <>
                <FormHelperText>URL acortada con éxito</FormHelperText>
                <FormHelperText>
                  <Link target='_blank' href={`/go/${shortUrl}`}>
                    http://localhost:3000/go/{shortUrl}
                  </Link>
                </FormHelperText>
              </>
            )}
          </FormControl>
        </Container>
      </Center>
    </>
  );
}

