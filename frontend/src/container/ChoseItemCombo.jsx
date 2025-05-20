



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
import { useState } from "react"
import { useItemsBasicData } from "@/hook/itemsHook"


const ChoseItemCombo = ({ value, onChange }) => {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")

  const {data, isLoading, isError,error } = useItemsBasicData()
  
  if (isError) {
    return <div className='text-red-500 text-sm flex justify-center items-center'>{
      <ErrorComponents error={error} />
    }</div>
  }
  
  const filteredData = data?.filter(item =>
    item.item_name.includes(search)
  )

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
            ? data?.find((item) => item.uid === value)?.item_name
            : "Select item..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="max-w-[350px] p-0">
        <Command>
          <CommandInput onValueChange={setSearch} placeholder="Search Items..."  className="h-9" />
          
          <CommandList>
            <CommandEmpty>No Category found.</CommandEmpty>
            <CommandGroup>
              {filteredData?.map((item) => (
                <CommandItem
                key={item.uid}
                onSelect={() => {
                  onChange(item.uid === value ? "" : item.uid)
                  setOpen(false)
                }}
              >
                {item.item_name}
                <Check className={cn( "ml-auto",value === item.uid ? "opacity-100" : "opacity-0")}/>
              </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default ChoseItemCombo
