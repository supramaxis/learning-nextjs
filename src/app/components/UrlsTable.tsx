// components/TableContainer.tsx
'use client';
import {
  Box,
  Center,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react';
import Link from 'next/link';
import UrlsContext from '@/context/UrlsContext';
import { useContext } from 'react';
import { useSession } from 'next-auth/react';
import useSWR from 'swr';

interface DataItem {
  id: number;
  url: string;
  shortUrl: string;
  customCode: string | null;
  createdAt: string;
  userId: string;
}

const UrlsTable: React.FC = () => {
  const { data, error } = useContext(UrlsContext);
  // const { data, error } = useSWR<DataItem[]>('/api/urls', fetcher);
  const { data: session } = useSession();

  if (error) return <Center>loading ...</Center>;
  if (!data) return <Center>loading...</Center>;

  return (
    <TableContainer>
      <Table variant='simple' size={'md'}>
        <TableCaption>
          Hola {session?.user.name} estos son tus links
        </TableCaption>

        <Thead>
          <Tr>
            <Th isNumeric>Link number</Th>
            <Th>ShortUrl</Th>
            <Th>Created At</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((urlObj: DataItem) => (
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
  );
};

export default UrlsTable;

