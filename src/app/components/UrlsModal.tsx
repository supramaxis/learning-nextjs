'use client';
import React, { useRef, useState, useEffect, useContext } from 'react';
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
import { UrlsModalProps } from '@/types';

const UrlsModal: React.FC<UrlsModalProps> = ({ onUrlCreated }) => {
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [someUserUrls, setSomeUserUrls] = useState([]);
  const { data: session, status } = useSession();
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const { fetchUrls } = useContext(UrlsContext);

  const inputRef = useRef<HTMLInputElement>(null);
  const customCodeRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleClick = async () => {
    try {
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
      onUrlCreated(data);

      onClose();
    } catch (error) {
      console.log(error);
    }

    // fetchUrls();
  };

  return (
    <>
      <Center h='100px'>
        <Button onClick={onOpen}>Crear enlaces</Button>
      </Center>

      <Modal isOpen={isOpen} isCentered onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Acorta tus links</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl onSubmit={handleSubmit}>
              <FormLabel>Ingresa la URL a acortar</FormLabel>
              <Input type='url' ref={inputRef} required />
              <FormLabel>Código personalizado (opcional)</FormLabel>
              <Input type='text' ref={customCodeRef} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={handleClick}
              type='submit'
              colorScheme='green'
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

