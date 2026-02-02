"use client";

import { useState } from "react";
import { SearchParams, AudienceType, DateType, BudgetType } from "@/lib/types";
import { AudienceSelector } from "./AudienceSelector";
import { LocationInput } from "./LocationInput";
import { DatePicker } from "./DatePicker";
import { BudgetSlider } from "./BudgetSlider";
import { ActivityTypeFilter } from "./ActivityTypeFilter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Search, Loader2 } from "lucide-react";

interface SearchFormProps {
  onSearch: (params: SearchParams) => void;
  isLoading: boolean;
}

export function SearchForm({ onSearch, isLoading }: SearchFormProps) {
  const [audience, setAudience] = useState<AudienceType>("solo");
  const [childAge, setChildAge] = useState<number>();
  const [location, setLocation] = useState({
    lat: 48.8566,
    lng: 2.3522,
    city: "Paris",
  });
  const [dateType, setDateType] = useState<DateType>("weekend");
  const [specificDate, setSpecificDate] = useState<string>();
  const [budget, setBudget] = useState<BudgetType>("medium");
  const [activityTypes, setActivityTypes] = useState<string[]>([]);
  const [additionalContext, setAdditionalContext] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (activityTypes.length === 0) {
      alert("Veuillez sélectionner au moins un type d'activité");
      return;
    }

    const params: SearchParams = {
      audience,
      childAge: audience === "family" ? childAge : undefined,
      location,
      dateType,
      specificDate: dateType === "specific" ? specificDate : undefined,
      budget,
      activityTypes,
      additionalContext: additionalContext.trim() || undefined,
    };

    onSearch(params);
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <AudienceSelector value={audience} onChange={setAudience} />

        {audience === "family" && (
          <div className="space-y-2">
            <Label htmlFor="childAge">Âge de l'enfant (optionnel)</Label>
            <Input
              id="childAge"
              type="number"
              min="0"
              max="18"
              placeholder="Ex: 5"
              value={childAge || ""}
              onChange={(e) => setChildAge(Number(e.target.value))}
            />
          </div>
        )}

        <LocationInput value={location} onChange={setLocation} />

        <DatePicker
          dateType={dateType}
          specificDate={specificDate}
          onDateTypeChange={setDateType}
          onSpecificDateChange={setSpecificDate}
        />

        <BudgetSlider value={budget} onChange={setBudget} />

        <ActivityTypeFilter
          value={activityTypes}
          onChange={setActivityTypes}
        />

        <div className="space-y-2">
          <Label htmlFor="additionalContext">Précisions (optionnel)</Label>
          <Textarea
            id="additionalContext"
            placeholder="Ex: activité accessible PMR, proche du métro, avec parking, adapté aux débutants..."
            value={additionalContext}
            onChange={(e) => setAdditionalContext(e.target.value)}
            rows={3}
          />
        </div>

        <Button
          type="submit"
          className="w-full"
          size="lg"
          disabled={isLoading || activityTypes.length === 0}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Recherche en cours...
            </>
          ) : (
            <>
              <Search className="mr-2 h-4 w-4" />
              Trouver des activités
            </>
          )}
        </Button>
      </form>
    </Card>
  );
}
