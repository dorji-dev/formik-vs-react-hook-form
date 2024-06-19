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
import { FloatingLabel } from "./floating-input";

interface DatePickerSingleProps {
  onSelect: (date: Date) => void;
  selectedDate?: Date;
  placeholder?: string;
  onBlur?: () => void;
  floatingLabel?: string;
}

export function DatePickerSingle({
  onSelect,
  selectedDate,
  placeholder,
  onBlur,
  floatingLabel,
}: DatePickerSingleProps) {
  const triggerRef = React.useRef<HTMLButtonElement | null>(null);
  const onDateSelect: SelectSingleEventHandler = (date) => {
    onSelect && onSelect(date);
    triggerRef.current?.click();
  };
  return (
    <Popover onOpenChange={(value) => !value && onBlur && onBlur()}>
      <PopoverTrigger asChild>
        <Button
          ref={triggerRef}
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal relative hover:bg-transparent hover:border-primary",
            !selectedDate && "text-muted-foreground"
          )}
        >
          {selectedDate ? (
            format(selectedDate, "PPP")
          ) : (
            <span>{placeholder ?? "Pick a date"} </span>
          )}
          <CalendarIcon className="h-[14px] w-[14px] ml-auto" />
          {floatingLabel && <FloatingLabel>{floatingLabel}</FloatingLabel>}
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
