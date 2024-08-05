"use client";

import React, { useState, forwardRef, useImperativeHandle } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  RowSelectionState,
} from "@tanstack/react-table";
import {
  Table as BaseTable,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/utils/cn";
import Pagination from "../Pagination";
import { PaginationProps } from "../Pagination/Pagination";

interface TableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData, any>[];
  pagination: PaginationProps;
  handleRowClick?: (row: TData) => void;
  customHeader?: React.ReactNode;
  tableClassName?: string;
  loading?: boolean; // Add loading prop
}

const Table = forwardRef(
  <TData extends object>(
    {
      data = [],
      columns,
      handleRowClick,
      customHeader = "",
      tableClassName = "",
      loading = false, // Default to false
      pagination,
    }: TableProps<TData>,
    ref: React.Ref<{ table: ReturnType<typeof useReactTable<TData>> }>
  ) => {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState({});
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
    const { page, total, onPageChange } = pagination;

    const table = useReactTable<TData>({
      data,
      columns,
      onSortingChange: setSorting,
      onColumnFiltersChange: setColumnFilters,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      onColumnVisibilityChange: setColumnVisibility,
      onRowSelectionChange: setRowSelection,
      state: {
        sorting,
        columnFilters,
        columnVisibility,
        rowSelection,
      },
    });

    // Expose the table instance to the parent component
    useImperativeHandle(ref, () => ({
      table,
    }));

    // Ensure table and its methods are defined
    const rowModel = table?.getRowModel();

    return (
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
        {customHeader && <div className="mb-4">{customHeader}</div>}
        <div
          className={cn(
            "rounded-md border my-2 bg-white dark:bg-gray-800",
            tableClassName
          )}
        >
          {loading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <BaseTable>
              <TableHeader className="bg-gray-100 dark:bg-gray-900">
                {table?.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead
                        key={header.id}
                        className="bg-gray-100 dark:bg-gray-900"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {rowModel.rows.length ? (
                  rowModel.rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                      onClick={() =>
                        handleRowClick && handleRowClick(row.original)
                      }
                    >
                      {row.getAllCells().map((cell) => (
                        <TableCell key={cell.id} className="dark:text-white">
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
                      className="h-24 text-center dark:text-white"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </BaseTable>
          )}
          <div>
            <Pagination page={page} total={total} onPageChange={onPageChange} />
          </div>
        </div>
      </div>
    );
  }
);

Table.displayName = "Table";

export default Table;
