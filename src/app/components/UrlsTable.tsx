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
import { useSession } from 'next-auth/react';

export type UrlObj = {
  id: number;
  shortUrl: string;
  createdAt: string;
};

interface UrlsTableProps {
  someUserUrls: UrlObj[];
  setSomeUserUrls: React.Dispatch<React.SetStateAction<UrlObj[]>>;
}

const UrlsTable: React.FC<UrlsTableProps> = ({
  someUserUrls,
  setSomeUserUrls
}) => {
  // const [someUserUrls, setSomeUserUrls] = useState([]);
  const { data: session, status } = useSession();

  return <></>;
};

export default UrlsTable;

