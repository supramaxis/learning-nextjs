//@tanstack/react-table columns definitions
"use client";

import { ColumnDef, useReactTable } from "@tanstack/react-table";
import { LuMoreHorizontal, LuArrowDown, LuExternalLink } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataItem } from "@/types";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-hot-toast";
import { mutate } from "swr";
import { useUrlStore } from "@/store/urls-store";
import DataTableRowActions from "@/components/DataTableRowActions"



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

export const columns: ColumnDef<DataItem>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Link ID
          <LuArrowDown className="h-4 w-4 ml-2" />
        </Button>
      );
    },
  },
  {
    accessorKey: "shortUrl",
    header: "Short URL",
    cell: ({ row }) => {
      const { shortUrl } = row.original;
      return (
        <Link target="_blank" href={`/go/${shortUrl}`}>
          {shortUrl} <LuExternalLink className="h-4 w-4 inline-block" />
        </Link>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const { createdAt } = row.original;
      return (
        <span className="text-sm">
          {getTimeAgoLabel(createdAt, new Date())}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
