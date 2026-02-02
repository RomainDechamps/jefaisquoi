"use client";

import { useState } from "react";
import { SearchParams, Activity } from "@/lib/types";
import { SearchForm } from "@/components/search/SearchForm";
import { ActivityList } from "@/components/results/ActivityList";
import { LoadingState } from "@/components/results/LoadingState";
import { EmptyState } from "@/components/results/EmptyState";
import { Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const { toast } = useToast();

  const handleSearch = async (params: SearchParams) => {
    setIsLoading(true);
    setHasSearched(true);
    
    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la recherche");
      }

      const data = await response.json();
      
      // Le format de retour dépendra du workflow n8n
      // On s'attend à { activities: Activity[] }
      setActivities(data.activities || []);
      
      if (!data.activities || data.activities.length === 0) {
        toast({
          title: "Aucun résultat",
          description: "Aucune activité trouvée pour ces critères.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Erreur de recherche:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la recherche.",
        variant: "destructive",
      });
      setActivities([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8 space-y-4">
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="h-8 w-8 text-primary animate-pulse" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Jefaisquoi ?
            </h1>
            <Sparkles className="h-8 w-8 text-primary animate-pulse" />
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Trouve l'activité parfaite pour ton contexte grâce à l'IA
          </p>
        </div>

        {/* Search Form */}
        <div className="mb-8">
          <SearchForm onSearch={handleSearch} isLoading={isLoading} />
        </div>

        {/* Results */}
        <div>
          {isLoading ? (
            <LoadingState />
          ) : activities.length > 0 ? (
            <>
              <div className="mb-6">
                <h2 className="text-2xl font-semibold">
                  {activities.length} activité{activities.length > 1 ? "s" : ""} trouvée{activities.length > 1 ? "s" : ""}
                </h2>
              </div>
              <ActivityList activities={activities} />
            </>
          ) : (
            <EmptyState hasSearched={hasSearched} />
          )}
        </div>
      </main>
    </div>
  );
}
