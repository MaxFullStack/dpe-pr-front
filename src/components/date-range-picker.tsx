import React, { useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { addDays, format } from "date-fns"
import type { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button, type ButtonProps } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { Icons } from "./icons"

interface DateRangePickerProps
  extends React.ComponentPropsWithoutRef<typeof PopoverContent> {
  dateRange?: DateRange
  setDateRange: (dateRange: DateRange | undefined) => void
  dayCount?: number
  placeholder?: string
  triggerVariant?: Exclude<ButtonProps["variant"], "destructive" | "link">
  triggerSize?: Exclude<ButtonProps["size"], "icon">
  triggerClassName?: string
}

export function DateRangePicker({
  dateRange,
  setDateRange,
  dayCount,
  placeholder = "Escolha uma data",
  triggerVariant = "outline",
  triggerSize = "default",
  triggerClassName,
  className,
  ...props
}: DateRangePickerProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [date, setDate] = useState<DateRange | undefined>(() => {
    const fromParam = searchParams.get("from")
    const toParam = searchParams.get("to")

    let fromDay: Date | undefined
    let toDay: Date | undefined

    if (dateRange) {
      fromDay = dateRange.from
      toDay = dateRange.to
    } else if (dayCount) {
      toDay = new Date()
      fromDay = addDays(toDay, -dayCount)
    }

    return {
      from: fromParam ? new Date(fromParam) : fromDay,
      to: toParam ? new Date(toParam) : toDay,
    }
  })

  // Update query string
  useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParams)
    if (date?.from) {
      newSearchParams.set("from", format(date.from, "yyyy-MM-dd"))
    } else {
      newSearchParams.delete("from")
    }

    if (date?.to) {
      newSearchParams.set("to", format(date.to, "yyyy-MM-dd"))
    } else {
      newSearchParams.delete("to")
    }

    router.replace(`${pathname}?${newSearchParams.toString()}`, {
      scroll: false,
    })

    setDateRange(date) // Update the setDateRange function

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date?.from, date?.to])

  return (
    <div className="grid gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={triggerVariant}
            size={triggerSize}
            className={cn(
              "w-full justify-start truncate text-left font-normal",
              !date && "text-muted-foreground",
              triggerClassName
            )}
          >
            <Icons.calendar className="mr-2 size-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className={cn("w-auto p-0", className)} {...props}>
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
