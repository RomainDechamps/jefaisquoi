"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Loader2 } from "lucide-react";
import { getCurrentPosition, geocode } from "@/lib/geolocation";

interface LocationInputProps {
  value: { lat: number; lng: number; city: string };
  onChange: (value: { lat: number; lng: number; city: string }) => void;
}

export function LocationInput({ value, onChange }: LocationInputProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState(value.city);

  const handleGeolocate = async () => {
    setIsLoading(true);
    try {
      const result = await getCurrentPosition();
      onChange(result);
      setInputValue(result.city);
    } catch (error) {
      console.error("Erreur de géolocalisation:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleManualInput = async (city: string) => {
    setInputValue(city);
    
    if (city.length < 3) return;

    // Geocode après un court délai
    const coords = await geocode(city);
    if (coords) {
      onChange({
        ...coords,
        city,
      });
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">
        Localisation
      </label>
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Ville..."
          value={inputValue}
          onChange={(e) => handleManualInput(e.target.value)}
          className="flex-1"
        />
        <Button
          variant="outline"
          size="icon"
          onClick={handleGeolocate}
          disabled={isLoading}
          title="Me géolocaliser"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <MapPin className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
}
