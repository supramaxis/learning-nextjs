// components/UrlsTable.tsx
'use client';
import {
  // Box,
  Center
  // Table,
  // TableCaption,
  // TableContainer,
  // Tbody,
  // Td,
  // Th,
  // Thead,
  // Tr
} from '@chakra-ui/react';
import Link from 'next/link';
import DropDown from './DropDown';
import UrlsContext from '@/context/UrlsContext';
import { useContext, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import { mutate } from 'swr';
import { DataItem, UrlsTableProps } from '@/types';
import { useTable } from 'react-table';
import { Column } from 'react-table';

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

  const columns = useMemo<Column<DataItem>[]>(
    () => [
      {
        Header: 'Link ID',
        accessor: 'id'
      },
      {
        Header: 'ShortUrl',
        accessor: 'shortUrl'
      },
      {
        Header: 'Created At',
        accessor: 'createdAt'
      }
    ],
    []
  );

  const tableData = useMemo(() => data, [data]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: tableData });

  return (
    <>
      <div className='mt-2 flex flex-col'>
        <div className='my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8'>
          <div
            className='py-2 align-middle inline-block min-w-full
            sm:px-6 lg:px-8
          '>
            <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
              <table
                {...getTableProps()}
                className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50'>
                  {headerGroups.map((headerGroup, hgIndex) => (
                    <tr {...headerGroup.getHeaderGroupProps({ key: hgIndex })}>
                      {headerGroup.headers.map((column, colIndex) => (
                        <th
                          {...column.getHeaderProps()}
                          scope='col'
                          className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                          {column.render('Header')}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody
                  {...getTableBodyProps()}
                  className='bg-white divide-y divide-gray-200'>
                  {rows.map((row, rowIndex) => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps({ key: rowIndex })}>
                        {row.cells.map((cell, cellIndex) => {
                          return (
                            <td
                              {...cell.getCellProps()}
                              className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                              {cell.render('Cell')}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UrlsTable;

