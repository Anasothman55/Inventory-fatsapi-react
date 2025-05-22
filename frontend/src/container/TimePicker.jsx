import { useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

const TimePicker = ({ time, setTime }) => {
  const [open, setOpen] = useState(false);

  const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, "0"));
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, "0"));

  const selectedHour = time?.getHours().toString().padStart(2, "0") ?? "00";
  const selectedMinute = time?.getMinutes().toString().padStart(2, "0") ?? "00";

  const updateTime = (newHour, newMinute) => {
    const updated = new Date(time ?? new Date());
    updated.setHours(parseInt(newHour));
    updated.setMinutes(parseInt(newMinute));
    updated.setSeconds(0);
    setTime(updated);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !time && "text-muted-foreground")}>
          {time ? format(time, "HH:mm") : <span>Pick a time</span>}
          <Clock className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] flex gap-2">
        <Select value={selectedHour} onValueChange={(val) => updateTime(val, selectedMinute)}>
          <SelectTrigger>
            <SelectValue placeholder="HH" />
          </SelectTrigger>
          <SelectContent>
            {hours.map((hour) => (
              <SelectItem key={hour} value={hour}>
                {hour}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedMinute} onValueChange={(val) => updateTime(selectedHour, val)}>
          <SelectTrigger>
            <SelectValue placeholder="MM" />
          </SelectTrigger>
          <SelectContent>
            {minutes.map((minute) => (
              <SelectItem key={minute} value={minute}>
                {minute}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </PopoverContent>
    </Popover>
  );
};

export default TimePicker;
