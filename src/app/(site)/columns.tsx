//@tanstack/react-table columns definitions
'use client';

import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal, ArrowUpDown, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { DataItem } from '@/types';
import Link from 'next/link';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { mutate } from 'swr';
import { useTimeAgoLabel } from '@/hooks/useTimeAgoLabel';

export const columns: ColumnDef<DataItem>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Link ID
          <ArrowUpDown className='h-4 w-4 ml-2' />
        </Button>
      );
    }
  },
  {
    accessorKey: 'shortUrl',
    header: 'Short URL',
    cell: ({ row }) => {
      const { shortUrl } = row.original;
      return (
        <Link target='_blank' href={`/go/${shortUrl}`}>
          {shortUrl} <ExternalLink className='h-4 w-4 inline-block' />
        </Link>
      );
    }
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ row }) => {
      const { createdAt } = row.original;
      const currentTime = new Date();
      const timeAgoLabel = createdAt
        ? useTimeAgoLabel(createdAt, currentTime)
        : null;
      return <div>{timeAgoLabel}</div>;
    }
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const { id } = row.original;
      const handleDelete = async () => {
        try {
          const res = await axios.delete(`/api/delete/${id}`);
          console.log(res.data);
          toast.success('La Url ha sido eliminada');
          mutate('/api/urls');
        } catch (error: any) {
          console.log(error.message);
          if (error.response) {
            toast.error(error.response.data);
          }
        }
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open Menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            {/* <DropdownMenuItem>Edit</DropdownMenuItem> */}
            <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
  }
];

