/**
 * A table component that uses @tanstack/react-table for sorting, filtering and pagination.
 *
 * @template TData The type of data in the table.
 * @template TValue The type of value in the table.
 *
 * @param {object} props The component props.
 * @param {ColumnDef<TData, TValue>[]} props.columns The column definitions for the table.
 * @param {TData[]} props.data The data to display in the table.
 *
 * @returns {JSX.Element} The rendered DataTable component.
 */
// DataTable.tsx

"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useEffect, useMemo, useState } from "react";
import { ModeToggle } from "@/components/ui/ToggleDarkMode";
import ErrorBoundary from "./ErrorBoundary";

/* The `DataTableProps` interface is defining the props that can be passed to the `DataTable`
component. It has two generic types `TData` and `TValue`. */
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<Tdata, TValue>({
  columns,
  data,
}: DataTableProps<Tdata, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [pageSize, setPageSize] = useState(6);

  const memoizedData = useMemo(() => data, [data]);

  const handlePageSizeChange = (value: string) => {
    const pageSizeNumber = Number(value);
    setPageSize(pageSizeNumber);
    table.setPageSize(pageSizeNumber);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  /* The `useReactTable` hook is being used to create a table instance with the specified configuration. */
  const table = useReactTable({
    columns,
    data: memoizedData,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      columnFilters,
    },
    initialState: {
      pagination: {
        pageSize: 6,
      },
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    table.getColumn("shortUrl")?.setFilterValue(e.target.value);
  };

  const filterInputValue =
    (table.getColumn("shortUrl")?.getFilterValue() as string) ?? "";
  function renderHeaderGroups() {
    try {
      return table.getHeaderGroups().map(
        (headerGroup) =>
          headerGroup &&
          headerGroup.headers && (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  header &&
                  header.column &&
                  header.column.columnDef && (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                );
              })}
            </TableRow>
          )
      );
    } catch (error) {
      console.error("An error occurred while rendering the table: ", error);
    }
  }

  return (
    <>
      <div className="flex items-center py-4 pointer-events-none">
        <Input
          placeholder="Filter URLS"
          value={filterInputValue}
          onChange={handleInputChange}
          className="max-w-sm pointer-events-auto"
        />
      </div>
      <div className="rounded-md border">
        <ErrorBoundary>
          <Table>
            <TableHeader>{renderHeaderGroups()}</TableHeader>
            <TableBody>
              {/* The `{table.getRowModel().rows?.length ? (` is a conditional statement that checks if
            the `rows` property of the `getRowModel()` function of the `table` object is not null or
            undefined. If it is not null or undefined, it means that there are rows in the table,
            and the code inside the conditional statement will be executed. */}
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </ErrorBoundary>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <Select
          value={String(table.getState().pagination.pageSize)}
          onValueChange={handlePageSizeChange}
        >
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Items</SelectLabel>
              {[6, 15, 20, 25].map((size) => (
                <SelectItem key={size} value={String(size)}>
                  {size} Links
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
        <ModeToggle />
      </div>
    </>
  );
}
