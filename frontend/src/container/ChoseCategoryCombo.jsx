

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
import { useCategoryData } from "@/hook/categoryHook"
import { ErrorComponents } from "@/components/content"
import { useState } from "react"



const ChoseCategoryCombo = ({ value, onChange }) => {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")


  const {data, isLoading, isError,error } = useCategoryData()
  
  if (isError) {
    return <div className='text-red-500 text-sm flex justify-center items-center'>{
      <ErrorComponents error={error} />
    }</div>
  }
  
  const filteredData = data?.filter(category =>
    category.name.includes(search)
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          disabled={isLoading}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? data?.find((category) => category.uid === value)?.name
            : "Select category..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput onValueChange={setSearch} placeholder="Search Categories..."  className="h-9" />
          
          <CommandList>
            <CommandEmpty>No Category found.</CommandEmpty>
            <CommandGroup>
              {filteredData?.map((category) => (
                <CommandItem
                key={category.uid}
                onSelect={() => {
                  onChange(category.uid === value ? "" : category.uid)
                  setOpen(false)
                }}
              >
                {category.name}
                <Check className={cn( "ml-auto",value === category.uid ? "opacity-100" : "opacity-0")}/>
              </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default ChoseCategoryCombo


