import * as React from "react"
import { Table } from "@tanstack/react-table"
import { DateRange } from "react-day-picker"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { DateRangePicker } from "../date-range-picker"
import { Icons } from "../icons"
import { DataTableFacetedFilter } from "./data-table-faceted-filter"
import { DataTableViewOptions } from "./data-table-view-options"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  searchPlaceholder: string
  searchColumnKey?: keyof TData
  filterOptions?: {
    columnKey: keyof TData
    title: string
    options: { label: string; value: string }[]
  }[]
  columnTranslations: { [key: string]: string }
  dateRange?: DateRange
  setDateRange?: (dateRange: DateRange | undefined) => void
}

export function DataTableToolbar<TData>({
  table,
  searchPlaceholder,
  searchColumnKey,
  filterOptions,
  columnTranslations,
  dateRange,
  setDateRange,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <>
      {setDateRange && (
        <DateRangePicker
          dateRange={dateRange}
          setDateRange={setDateRange}
          triggerSize="sm"
          triggerClassName="ml-auto w-56 sm:w-60"
          align="end"
        />
      )}
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center space-x-4">
          <Input
            placeholder={searchPlaceholder}
            value={
              (table
                .getColumn(searchColumnKey as string)
                ?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table
                .getColumn(searchColumnKey as string)
                ?.setFilterValue(event.target.value)
            }
            className="h-8 w-[150px] lg:w-[250px]"
          />
          {filterOptions?.map((filterOption) => (
            <DataTableFacetedFilter
              key={filterOption.columnKey as string}
              column={table.getColumn(filterOption.columnKey as string)}
              title={filterOption.title}
              options={filterOption.options}
            />
          ))}
          {isFiltered && (
            <Button
              variant="ghost"
              onClick={() => table.resetColumnFilters()}
              className="h-8 px-2 lg:px-3"
            >
              Limpar
              <Icons.x className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
        <DataTableViewOptions
          table={table}
          columnTranslations={columnTranslations}
        />
      </div>
    </>
  )
}
