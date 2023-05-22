'use client';

import {
  Button,
  Center,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure
} from '@chakra-ui/react';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import getSession from '@/app/actions/getSession';
import { useSession } from 'next-auth/react';

import { toast } from 'react-hot-toast';

export default function Shorten() {
  const [someUserUrls, setSomeUserUrls] = useState([]);
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession();
  const inputRef = useRef<HTMLInputElement>(null);
  const customCodeRef = useRef<HTMLInputElement>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
  };
  const handleClick = async () => {
    const url = inputRef.current?.value;
    const customCode = customCodeRef.current?.value || undefined;

    //fetch the api endpoint to create a short url using async await
    setLoading(true);
    const res = await fetch('/api/shorten', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url, customCode })
    });
    const data = await res.json();
    setShortUrl(data.shortUrl);
    setLoading(false);

    onClose();

    fetchSessionAndLinks();
  };

  useEffect(() => {
    if (!isOpen) {
      setShortUrl('');
      if (inputRef.current) inputRef.current.value = '';
      if (customCodeRef.current) customCodeRef.current.value = '';
    }
  }, [isOpen]);

  const fetchSessionAndLinks = async () => {
    // Solo ejecutar en el entorno del servidor
    if (session) {
      const res = await fetch('/api/urls', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await res.json();
      console.log('Your data', data);
      setSomeUserUrls(data);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessionAndLinks();
  }, [session]);

  return (
    <>
      <Center h='100px'>
        <Button onClick={onOpen}>Open Modal</Button>
      </Center>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        isCentered
        onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Acorta tus links</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl onSubmit={handleSubmit}>
              {/* {loading && <Center>Loading...</Center>} */}

              <FormLabel>Ingresa la URL a acortar</FormLabel>
              <Input type='url' ref={inputRef} required />
              <FormLabel>Código personalizado (opcional)</FormLabel>
              <Input type='text' ref={customCodeRef} />

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
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={handleClick}
              type='submit'
              colorScheme='blue'
              mr={3}>
              Acortar
            </Button>
            <Button onClick={onClose}>Cerrar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* {loading && <Center>Loading...</Center>} */}
      {someUserUrls.length === 0 ? (
        <Center h='100px'>No hay links para mostrar. Crea algunos</Center>
      ) : (
        <TableContainer>
          <Table variant='simple' size={'lg'}>
            <TableCaption>
              Hola {session?.user.name} Estos son tus enlaces
            </TableCaption>
            <Thead>
              <Tr>
                <Th isNumeric>Link number</Th>
                <Th>ShortUrl</Th>
                <Th>Created At</Th>
              </Tr>
            </Thead>
            <Tbody>
              {someUserUrls.map((urlObj: any) => (
                <Tr key={urlObj.id}>
                  <Td>{urlObj.id}</Td>
                  <Td>
                    <Link href={`/go/${urlObj.shortUrl}`} target='_blank'>
                      http://localhost:3000/go/{urlObj.shortUrl}
                    </Link>
                  </Td>
                  <Td>{urlObj.createdAt}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}

