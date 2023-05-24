// components/UrlsTable.tsx
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
import { mutate } from 'swr';
import DropDown from './DropDown';
import { DataItem, UrlsTableProps } from '@/types';

const UrlsTable: React.FC<UrlsTableProps> = ({ data }) => {
  const { data: contextData, error } = useContext(UrlsContext);
  const { data: session } = useSession();

  if (error) return <Center>loading ...</Center>;
  if (!contextData) return <Center>loading...</Center>;

  const handleUrlDeleted = (deletedId: number) => {
    const updatedData = contextData.filter(
      (urlObj: DataItem) => urlObj.id !== deletedId
    );
    mutate(updatedData);
  };

  return (
    <div className='flex items-center justify-center h-full '>
      <TableContainer className='mx-auto'>
        <Table variant='simple' size={'md'} className='w-full'>
          <TableCaption>
            Hola {session?.user.name} estos son tus links
          </TableCaption>

          <Thead className='block gap-10'>
            <Tr className='gap-10'>
              <Th isNumeric>Link ID</Th>
              <Th>ShortUrl</Th>
              <Th>Created At</Th>
            </Tr>
          </Thead>
          <Tbody className='block h-52 overflow-y-auto w-full'>
            {data.map((urlObj: DataItem) => (
              <Tr key={urlObj.id}>
                <Td>{urlObj.id}</Td>
                <Td>
                  <Link href={`/go/${urlObj.shortUrl}`} target='_blank'>
                    http://localhost:3000/go/{urlObj.shortUrl}
                  </Link>
                </Td>
                <Td>{urlObj.createdAt}</Td>
                <Td>
                  <DropDown
                    id={urlObj.id}
                    onUrlDeleted={() => handleUrlDeleted(urlObj.id)}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UrlsTable;

