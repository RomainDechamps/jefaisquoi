"use client";

import { DateType, DATE_TYPE_LABELS } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, CalendarDays } from "lucide-react";

interface DatePickerProps {
  dateType: DateType;
  specificDate?: string;
  onDateTypeChange: (value: DateType) => void;
  onSpecificDateChange: (value: string) => void;
}

const DATE_TYPE_ICONS = {
  weekend: CalendarDays,
  weekday: Clock,
  specific: Calendar,
};

export function DatePicker({
  dateType,
  specificDate,
  onDateTypeChange,
  onSpecificDateChange,
}: DatePickerProps) {
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-gray-700">
        Quand ?
      </label>
      <div className="grid grid-cols-3 gap-2">
        {(Object.keys(DATE_TYPE_LABELS) as DateType[]).map((type) => {
          const Icon = DATE_TYPE_ICONS[type];
          const isSelected = dateType === type;
          
          return (
            <Button
              key={type}
              variant={isSelected ? "default" : "outline"}
              className="flex flex-col items-center gap-2 h-auto py-3"
              onClick={() => onDateTypeChange(type)}
            >
              <Icon className="h-4 w-4" />
              <span className="text-xs">{DATE_TYPE_LABELS[type]}</span>
            </Button>
          );
        })}
      </div>
      
      {dateType === "specific" && (
        <Input
          type="date"
          value={specificDate || ""}
          onChange={(e) => onSpecificDateChange(e.target.value)}
          min={new Date().toISOString().split("T")[0]}
        />
      )}
    </div>
  );
}
