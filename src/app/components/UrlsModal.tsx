'use client';
import { useRef, useState, useEffect, useContext } from 'react';
import {
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure
} from '@chakra-ui/react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import UrlsContext from '@/context/UrlsContext';

// interface ModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   // handleClick: () => Promise<void>;
//   shortUrl: String;
// }

const UrlsModal = () => {
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [someUserUrls, setSomeUserUrls] = useState([]);
  const { data: session, status } = useSession();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { fetchUrls } = useContext(UrlsContext);

  const inputRef = useRef<HTMLInputElement>(null);
  const customCodeRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleClick = async () => {
    setLoading(true);
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
    setLoading(false);

    onClose();

    fetchUrls();
  };

  return (
    <>
      <Center h='100px'>
        <Button onClick={onOpen}>Crear enlaces</Button>
      </Center>
      <Modal
        // initialFocusRef={initialRef}
        // finalFocusRef={finalRef}
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
                  {/* <FormHelperText>URL acortada con éxito</FormHelperText>
            <FormHelperText>
              <Link target='_blank' href={`/go/${shortUrl}`}>
                http://localhost:3000/go/{shortUrl}
              </Link>
            </FormHelperText> */}
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
    </>
  );
};

export default UrlsModal;

