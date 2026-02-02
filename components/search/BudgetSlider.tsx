"use client";

import { BudgetType, BUDGET_LABELS } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Euro } from "lucide-react";

interface BudgetSliderProps {
  value: BudgetType;
  onChange: (value: BudgetType) => void;
}

export function BudgetSlider({ value, onChange }: BudgetSliderProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
        <Euro className="h-4 w-4" />
        Budget
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {(Object.keys(BUDGET_LABELS) as BudgetType[]).map((budget) => {
          const isSelected = value === budget;
          
          return (
            <Button
              key={budget}
              variant={isSelected ? "default" : "outline"}
              className="text-xs"
              onClick={() => onChange(budget)}
            >
              {BUDGET_LABELS[budget]}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
