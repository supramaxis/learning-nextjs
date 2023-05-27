// components/UrlsTable.tsx
'use client';
import { useContext, useEffect, useMemo, useState } from 'react';
import { mutate } from 'swr';
import { DataItem, UrlsTableProps } from '@/types';
import { Button, PageButton } from '@/components/TableButton/Button';
import { Column } from 'react-table';
import Link from 'next/link';
import UrlsContext from '@/context/UrlsContext';
import {
  useTable,
  usePagination,
  useResizeColumns,
  TableInstance,
  Cell,
  Row,
  useBlockLayout
} from 'react-table';
import {
  ChevronDoubleLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleRightIcon
} from '@heroicons/react/24/solid';

type CustomTableInstance = TableInstance<DataItem> & {
  nextPage: () => void;
  previousPage: () => void;
  canPreviousPage: boolean;
  canNextPage: boolean;
  pageOptions: number[];
  state: {
    pageIndex: number;
    pageSize: number;
    pageCount: number;
  };
  page: Row<DataItem>[];
  gotoPage: (updater: number | ((pageIndex: number) => number)) => void;
  setPageSize: (size: number) => void;
};

const UrlsTable: React.FC<UrlsTableProps> = ({ data }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const { data: contextData, error } = useContext(UrlsContext);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getTimeAgoLabel = (dateString: string, currentTime: Date) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds ago`;
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} minutes ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} hours ago`;
    } else if (diffInSeconds < 2592000) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} days ago`;
    } else if (diffInSeconds < 31536000) {
      const months = Math.floor(diffInSeconds / 2592000);
      return `${months} months ago`;
    }
  };

  if (error) {
    console.log(error);
    return <h2>Something went Wrong</h2>;
  }

  if (!contextData) return <h2>loading...</h2>;

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
        accessor: 'id',
        width: 100
      },
      {
        Header: 'ShortUrl',
        accessor: 'shortUrl',
        width: 200,
        //clickable link
        Cell: ({ value }: { value: string }) => (
          <Link target='_blank' href={`/go/${value}`}>
            {value}
          </Link>
        )
      },
      {
        Header: 'Created At',
        accessor: 'createdAt',
        Cell: ({ value }: { value: string }) => (
          <div>{value ? `${getTimeAgoLabel(value, currentTime)} ` : null}</div>
        )
      },
      {
        Header: 'Actions',
        id: 'actions',
        accessor: (row: DataItem) => row.id
      }
    ],
    []
  );

  const tableData = useMemo(() => data, [data]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,

    state: { pageIndex, pageSize, pageCount }
  } = useTable(
    { columns, data: tableData },
    useResizeColumns,
    usePagination,
    useBlockLayout
  ) as unknown as CustomTableInstance;

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
                  {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map(column => (
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
                  {page.map((row: Row<DataItem>) => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map((cell: Cell<DataItem>) => {
                          return (
                            <td
                              {...cell.getCellProps()}
                              role='cell'
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

      <div className='py-3 flex items-center justify-between'>
        <div className='flex-1 flex justify-between sm:hidden'>
          <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
            Previous
          </Button>
          <Button onClick={() => nextPage()} disabled={!canNextPage}>
            Next
          </Button>
        </div>
        <div className='hidden sm:flex-1 sm:flex sm:items-center sm:justify-between'>
          <div className='flex gap-x-2 items-baseline'>
            <span className='text-sm text-zinc-200'>
              Pagina <span className='font-medium'>{pageIndex + 1}</span> de{' '}
              <span className='font-medium'>{pageOptions.length}</span>
            </span>
            <label>
              <span className='sr-only'>Items por Pagina</span>
              <select
                className='mt-1 w-full rounded-md border-gray-700 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                value={pageSize}
                onChange={e => {
                  setPageSize(Number(e.target.value));
                }}>
                {[5, 10, 20].map(pageSize => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <nav
            className='relative z-0 inline-flex rounded-md shadow-sm -space-x-px'
            aria-label='Pagination'>
            <PageButton
              className='rounded-l-md'
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}>
              <span className='sr-only'>First</span>
              <ChevronDoubleLeftIcon className='h-5 w-5' aria-hidden='true' />
            </PageButton>
            <PageButton
              onClick={() => previousPage()}
              disabled={!canPreviousPage}>
              <span className='sr-only'>Previous</span>
              <ChevronLeftIcon
                className='h-5 w-5 text-gray-400'
                aria-hidden='true'
              />
            </PageButton>
            <PageButton onClick={() => nextPage()} disabled={!canNextPage}>
              <span className='sr-only'>Next</span>
              <ChevronRightIcon
                className='h-5 w-5 text-gray-400'
                aria-hidden='true'
              />
            </PageButton>
            <PageButton
              className='rounded-r-md'
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}>
              <span className='sr-only'>Last</span>
              <ChevronDoubleRightIcon
                className='h-5 w-5 text-gray-400'
                aria-hidden='true'
              />
            </PageButton>
          </nav>
        </div>
      </div>
    </>
  );
};

export default UrlsTable;

