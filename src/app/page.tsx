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
import { useState, useRef } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
  };
  const handleClick = async () => {
    const url = inputRef.current?.value;

    //fetch the api endpoint to create a short url using async await
    const res = await fetch('/api/shorten', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url })
    });
    const data = await res.json();
    setShortUrl(data.shortUrl);
  };
  return (
    <>
      <Center h='100vh' w='100vw'>
        <Container>
          <FormControl onSubmit={handleSubmit}>
            <FormLabel>Ingresa la URL a acortar</FormLabel>
            <Input type='url' ref={inputRef} />
            <Button onClick={handleClick} type='submit' mt={4}>
              Acortar
            </Button>
            {shortUrl && (
              <>
                <FormHelperText>URL acortada con éxito</FormHelperText>
                <FormHelperText>
                  <Link target='_blank' href={`/${shortUrl}`}>
                    http://localhost:3000/{shortUrl}
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

