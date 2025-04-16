import { Button } from '@/components/ui/button';
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Link } from 'react-router';
import { Skeleton } from '@/components/ui/skeleton';

interface DataTableProps<T> {
  data: T[];
  filter: string;
  columns: ColumnDef<T>[];
  linkCreate?: string;
  filterComponent?: React.ReactNode;
  isLoading?: boolean;
}

export const DataTable = <T,>({
  data,
  filter,
  columns,
  linkCreate,
  filterComponent,
  isLoading = false,
}: DataTableProps<T>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
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

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder={`Pencarian ${filter}`}
          value={(table.getColumn(filter)?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn(filter)?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
        {linkCreate && (
          <Button className="ml-auto">
            <Link to={linkCreate}>Tambah</Link>
          </Button>
        )}
        {filterComponent && <div className="ml-auto">{filterComponent}</div>}
      </div>
      <div className="rounded-md border overflow-x-auto">
        <Table className="w-full">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} style={{ width: header.getSize() }}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, rowIndex) => (
                <TableRow key={rowIndex} className="border-t">
                  {Array.from({ length: columns.length }).map((_, colIndex) => (
                    <TableCell key={colIndex} style={{ width: columns[colIndex].size }}>
                      <Skeleton className="h-6 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : data.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} style={{ width: cell.column.getSize() }}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          <Select
            onValueChange={(value) => table.setPageSize(Number(value))}
            defaultValue={String(table.getState().pagination.pageSize)}
          >
            <SelectTrigger className="!w-fit">
              <SelectValue placeholder={`Show ${table.getState().pagination.pageSize}`} />
            </SelectTrigger>
            <SelectContent>
              {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={String(pageSize)}>
                  Show {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <Button onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()} size="icon" variant="outline">
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} size="icon" variant="outline">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="flex items-center gap-2">
            <span>Page</span>
            <Input
              value={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
              className="w-12 text-center"
            />
            <span>of {table.getPageCount()}</span>
          </span>
          <Button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} size="icon" variant="outline">
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()} size="icon" variant="outline">
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
