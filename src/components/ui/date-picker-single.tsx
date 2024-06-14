"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SelectSingleEventHandler } from "react-day-picker";

interface DatePickerSingleProps {
  onSelect: (date: Date) => void;
  selectedDate?: Date;
  placeholder?: string;
  onBlur?: () => void;
}

export function DatePickerSingle({
  onSelect,
  selectedDate,
  placeholder,
  onBlur,
}: DatePickerSingleProps) {
  const triggerRef = React.useRef<HTMLButtonElement | null>(null);
  const onDateSelect: SelectSingleEventHandler = (date) => {
    onSelect && onSelect(date);
    triggerRef.current?.click();
  };
  return (
    <Popover onOpenChange={(value) => !value && onBlur()}>
      <PopoverTrigger asChild>
        <Button
          ref={triggerRef}
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !selectedDate && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selectedDate ? (
            format(selectedDate, "PPP")
          ) : (
            <span>{placeholder ?? "Pick a date"} </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={onDateSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
