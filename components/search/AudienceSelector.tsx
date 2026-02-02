"use client";

import { AudienceType, AUDIENCE_LABELS } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Users, User, UserPlus } from "lucide-react";

interface AudienceSelectorProps {
  value: AudienceType;
  onChange: (value: AudienceType) => void;
}

const AUDIENCE_ICONS = {
  solo: User,
  friends: UserPlus,
  family: Users,
};

export function AudienceSelector({ value, onChange }: AudienceSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">
        Type de sortie
      </label>
      <div className="grid grid-cols-3 gap-2">
        {(Object.keys(AUDIENCE_LABELS) as AudienceType[]).map((audience) => {
          const Icon = AUDIENCE_ICONS[audience];
          const isSelected = value === audience;
          
          return (
            <Button
              key={audience}
              variant={isSelected ? "default" : "outline"}
              className="flex flex-col items-center gap-2 h-auto py-4"
              onClick={() => onChange(audience)}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs">{AUDIENCE_LABELS[audience]}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
