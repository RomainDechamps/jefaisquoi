// Types pour les activités
export interface Activity {
  id: string;
  title: string;
  description: string;
  type: "culture" | "sport" | "nature" | "food" | "event" | "other";
  location: {
    name: string;
    address: string;
    lat: number;
    lng: number;
  };
  date?: string;
  price?: {
    min: number;
    max: number;
    currency: string;
  };
  audience: "solo" | "friends" | "family";
  childAge?: { min: number; max: number };
  source: string;
  sourceUrl: string;
  image?: string;
  tags: string[];
}

// Paramètres de recherche
export interface SearchParams {
  audience: "solo" | "friends" | "family";
  childAge?: number;
  location: { 
    lat: number; 
    lng: number; 
    city: string;
  };
  dateType: "weekend" | "weekday" | "specific";
  specificDate?: string;
  budget?: "free" | "low" | "medium" | "high";
  activityTypes: string[];
}

// Types pour les filtres
export type AudienceType = "solo" | "friends" | "family";
export type DateType = "weekend" | "weekday" | "specific";
export type BudgetType = "free" | "low" | "medium" | "high";
export type ActivityType = "culture" | "sport" | "nature" | "food" | "event" | "other";

// Labels pour l'UI
export const AUDIENCE_LABELS: Record<AudienceType, string> = {
  solo: "Solo",
  friends: "Entre amis",
  family: "En famille",
};

export const DATE_TYPE_LABELS: Record<DateType, string> = {
  weekend: "Ce week-end",
  weekday: "En semaine",
  specific: "Date précise",
};

export const BUDGET_LABELS: Record<BudgetType, string> = {
  free: "Gratuit",
  low: "Petit budget",
  medium: "Budget moyen",
  high: "Budget élevé",
};

export const ACTIVITY_TYPE_LABELS: Record<ActivityType, string> = {
  culture: "Culture",
  sport: "Sport",
  nature: "Nature",
  food: "Gastronomie",
  event: "Événement",
  other: "Autre",
};
