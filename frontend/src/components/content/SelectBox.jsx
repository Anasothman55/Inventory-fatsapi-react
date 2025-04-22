





import React from 'react'
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
 } from '../ui/select';
const SelectBox = ({ order, options, onValueChange }) => {
  return (
    <div>
      <Select value={order} onValueChange={onValueChange}>
        <SelectTrigger className="w-[140px] bg-white border border-gray-300 ">
          <SelectValue placeholder="Select Sort" />
        </SelectTrigger>
        <SelectContent className="bg-white border border-gray-200 shadow-md">
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectBox
