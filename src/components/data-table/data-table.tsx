import React, { useMemo, useState } from "react"
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
} from "@tanstack/react-table"
import { DateRange } from "react-day-picker"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { DataTablePagination } from "./data-table-pagination"
import { DataTableToolbar } from "./data-table-toolbar"

interface DataTableProps<TData> {
  data: TData[]
  columns: ColumnDef<TData, any>[]
  searchPlaceholder: string
  searchColumnKey: keyof TData
  filterOptions: {
    columnKey: keyof TData
    title: string
    options: { label: string; value: string }[]
  }[]
  columnTranslations: { [key: string]: string }
  floatingBar?: React.ReactNode | null
  initialVisibility?: VisibilityState
}

export function DataTable<TData>({
  data,
  columns,
  searchPlaceholder,
  searchColumnKey,
  filterOptions,
  columnTranslations,
  floatingBar = null,
  initialVisibility = {},
}: DataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] =
    useState<VisibilityState>(initialVisibility)
  const [rowSelection, setRowSelection] = useState({})
  const [dateRange, setDateRange] = useState<DateRange | undefined>()

  const filteredData = useMemo(() => {
    if (!dateRange?.from || !dateRange?.to) return data

    return data.filter((row: any) => {
      const rowDate = new Date(row.creationDate)
      return (
        dateRange.from &&
        dateRange.to &&
        rowDate >= dateRange.from &&
        rowDate <= dateRange.to
      )
    })
  }, [data, dateRange])

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  return (
    <div className="space-y-4">
      <DataTableToolbar
        table={table}
        searchPlaceholder={searchPlaceholder}
        searchColumnKey={searchColumnKey}
        filterOptions={filterOptions}
        columnTranslations={columnTranslations}
        dateRange={dateRange}
        setDateRange={setDateRange}
      />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
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
                  Sem resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-col gap-2.5">
        <DataTablePagination table={table} />
        {table.getFilteredSelectedRowModel().rows.length > 0 && floatingBar}
      </div>
    </div>
  )
}
