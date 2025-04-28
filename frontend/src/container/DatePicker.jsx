import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const DatePicker = ({ new_date, setDate }) => {
  // Calculate the current year
  const currentYear = new Date().getFullYear()
  
  // Generate an array of years from 1900 to current year
  const years = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => currentYear - i)
  
  // State to keep track of the currently viewed year/month
  const [calendarDate, setCalendarDate] = useState(new_date ? new Date(new_date) : new Date())
  
  // Function to handle year change from dropdown
  const handleYearChange = (year) => {
    const newDate = new Date(calendarDate)
    newDate.setFullYear(parseInt(year))
    setCalendarDate(newDate)
  }

  return (
    <div className="flex flex-col space-y-1.5">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn("w-full pl-3 text-left font-normal", !new_date && "text-muted-foreground")}
          >
            {new_date ? (
              format(new Date(new_date), "PPP")
            ) : (
              <span>Pick a date</span>
            )}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="p-2 border-b">
            <Select
              value={calendarDate.getFullYear().toString()}
              onValueChange={handleYearChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Year" />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Calendar
            mode="single"
            selected={new_date ? new Date(new_date) : undefined}
            onSelect={(date) => {
              if (date) {
                const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
                setDate(utcDate.toISOString().split('T')[0]) // store as 'YYYY-MM-DD'
              }
            }}
            disabled={(date) =>
              date > new Date() || date < new Date("1900-01-01")
            }
            initialFocus
            month={calendarDate}
            onMonthChange={setCalendarDate}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default DatePicker