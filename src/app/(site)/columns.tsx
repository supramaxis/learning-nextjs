//@tanstack/react-table columns definitions
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { LuArrowDown, LuExternalLink } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { DataItem } from "@/types";
import Link from "next/link";
import DataTableRowActions from "@/components/DataTableRowActions";

const getTimeAgoLabel = (dateString: string) => {
  const now = new Date();
  const date = new Date(dateString);
  let diffInMilliseconds = now.getTime() - date.getTime();

  const intervals = [
    { unit: "second", milliseconds: 1000 },
    { unit: "minute", milliseconds: 60000 },
    { unit: "hour", milliseconds: 3600000 },
    { unit: "day", milliseconds: 86400000 },
    { unit: "month", milliseconds: 2592000000 }, // Assuming 30 days for a month average
  ];

  for (let i = intervals.length - 1; i >= 0; i--) {
    const interval = intervals[i];
    const elapsed = Math.floor(diffInMilliseconds / interval.milliseconds);
    if (elapsed > 0) {
      return `${elapsed} ${interval.unit}${elapsed > 1 ? "s" : ""} ago`;
    }
    diffInMilliseconds %= interval.milliseconds;
  }

  // If no interval matches, an appropriate message is returned
  return "Just Now";
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
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created
          <LuArrowDown className="h-4 w-4 ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const { createdAt } = row.original;
      return <span className="text-sm">{getTimeAgoLabel(createdAt)}</span>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
