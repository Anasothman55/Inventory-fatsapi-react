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
  { value: 'use', label: 'Use' },
  { value: 'return', label: 'Return' },
]
const ActionSelector = ({value, setOnChange}) => {
  return (
    <Select value={value} onValueChange={setOnChange}>
      
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select an Actions" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Actions</SelectLabel>
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

export default ActionSelector
