import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ErrorComponents } from "@/components/content"
import { useState, useMemo } from "react"
import { useEmployeesNameData } from "@/hook/employee"

const ChoseEmployeeCombo = ({ value, onChange }) => {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")

  const { data, isLoading, isError, error } = useEmployeesNameData()

  const filteredData = useMemo(() => {
    if (!data) return []
    return data.filter((emp) =>
      emp.name.toLowerCase().includes(search.toLowerCase())
    )
  }, [data, search])

  if (isError) {
    return (
      <div className="text-red-500 text-sm flex justify-center items-center">
        <ErrorComponents error={error} />
      </div>
    )
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          disabled={isLoading}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between"
        >
          {value
            ? data?.find((emp) => emp.uid === value)?.name
            : "Select employee..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="max-w-[350px] p-0">
        <Command>
          <CommandInput
            value={search}
            onValueChange={setSearch}
            placeholder="Search employee..."
            className="h-9"
          />
          <CommandList>
            <CommandEmpty>No employee found.</CommandEmpty>
            <CommandGroup>
              {filteredData.map((emp) => (
                <CommandItem
                  key={emp.uid}
                  onSelect={() => {
                    onChange(emp.uid === value ? "" : emp.uid)
                    setOpen(false)
                    setSearch("") // reset search after selection
                  }}
                >
                  {emp.name}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === emp.uid ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default ChoseEmployeeCombo
