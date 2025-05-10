import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select" 


const cList = [
  { value: 'USD', label: 'Dollar' },
  { value: 'dinar', label: 'Dinar' },
]

const CurruncySelector = ({value, setOnChange}) => {
  return (
    <Select value={value} onValueChange={setOnChange}>
      
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a Curruncy" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Curruncy</SelectLabel>
          {
            cList.map(item =>(
              <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
            ))
          }
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default CurruncySelector
