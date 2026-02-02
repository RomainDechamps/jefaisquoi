"use client";

import { ActivityType, ACTIVITY_TYPE_LABELS } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Palette, Dumbbell, Trees, UtensilsCrossed, PartyPopper, Sparkles } from "lucide-react";

interface ActivityTypeFilterProps {
  value: string[];
  onChange: (value: string[]) => void;
}

const ACTIVITY_TYPE_ICONS = {
  culture: Palette,
  sport: Dumbbell,
  nature: Trees,
  food: UtensilsCrossed,
  event: PartyPopper,
  other: Sparkles,
};

export function ActivityTypeFilter({ value, onChange }: ActivityTypeFilterProps) {
  const toggleType = (type: string) => {
    if (value.includes(type)) {
      onChange(value.filter((t) => t !== type));
    } else {
      onChange([...value, type]);
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">
        Types d'activité
      </label>
      <div className="flex flex-wrap gap-2">
        {(Object.keys(ACTIVITY_TYPE_LABELS) as ActivityType[]).map((type) => {
          const Icon = ACTIVITY_TYPE_ICONS[type];
          const isSelected = value.includes(type);
          
          return (
            <Badge
              key={type}
              variant={isSelected ? "default" : "outline"}
              className="cursor-pointer hover:bg-primary/80 transition-colors px-3 py-2"
              onClick={() => toggleType(type)}
            >
              <Icon className="h-3 w-3 mr-1" />
              {ACTIVITY_TYPE_LABELS[type]}
            </Badge>
          );
        })}
      </div>
      {value.length === 0 && (
        <p className="text-xs text-muted-foreground">
          Sélectionner au moins un type d'activité
        </p>
      )}
    </div>
  );
}
