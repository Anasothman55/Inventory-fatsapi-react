import { CalendarIcon } from "lucide-react";
import { parse, isAfter, isBefore, format } from "date-fns";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";





const DateRange = ({ new_date_range, setDateRange }) => {
  const today = new Date();

  // Parse new_date_range.from/to as local dates
  const parseLocal = (dateStr) => (dateStr ? parse(dateStr, "yyyy-MM-dd", new Date()) : undefined);

  const [date, setDate] = useState({
    from: parseLocal(new_date_range?.from),
    to: parseLocal(new_date_range?.to),
  });

  useEffect(() => {
    setDate({
      from: parseLocal(new_date_range?.from),
      to: parseLocal(new_date_range?.to),
    });
  }, [new_date_range]);

  const handleSelect = (range) => {
    if (!range?.from) return;

    // If to exists and is before from → invalid, ignore selection
    if (range.to && isBefore(range.to, range.from)) return;

    // If selected dates in future → ignore selection
    if (isAfter(range.from, today) || (range.to && isAfter(range.to, today))) {
      return;
    }

    setDate(range);

    if (range.from && range.to) {
      const formatted = {
        from: format(range.from, "yyyy-MM-dd"),
        to: format(range.to, "yyyy-MM-dd"),
      };
      setDateRange(formatted);
    }
  };

  return (
    <div className="flex flex-col space-y-1.5">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            type="button"
            id="date"
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal h-full",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
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
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleSelect}
            disabled={(date) =>
              date > today || date < new Date("1900-01-01")
            }
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
};

export default DateRange;
