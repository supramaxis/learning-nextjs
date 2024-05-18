//@tanstack/react-table columns definitions
"use client";

import { ColumnDef } from "@tanstack/react-table";
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
    cell: ({ row }) => {
      const { id } = row.original;

      const handleCreateQR = async () => {
        try {
          const res = await axios.get(`/api/get/url/${id}`);
          const ogUrl = res.data;
          console.log(res.data)
          const url = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${ogUrl}`;
          // useUrlStore.getState().setQRCodeLink(url);
          // const qrCodeLink = useUrlStore.getState().qrCodeLink
          console.log("")
        } catch (error) {
          console.log(error);
        }
        
      }


      const handleDelete = async () => {
        try {
          const res = await axios.delete(`/api/delete/${id}`);
          console.log(res.data);
          toast.success("Url has been deleted");
          mutate("/api/get/urls");
        } catch (error: any) {
          console.log(error);
          if (error.response) toast.error(error.response.data);
          
        }
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open Menu</span>
              <LuMoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem className="cursor-pointer" onClick={handleDelete}>
              Delete
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" onClick={handleCreateQR}>Create QR Code</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
