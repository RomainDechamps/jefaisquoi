"use client";

import { Card } from "@/components/ui/card";
import { SearchX } from "lucide-react";

interface EmptyStateProps {
  hasSearched: boolean;
}

export function EmptyState({ hasSearched }: EmptyStateProps) {
  if (!hasSearched) {
    return (
      <Card className="p-12 text-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="rounded-full bg-primary/10 p-6">
            <SearchX className="h-12 w-12 text-primary" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">
              Prêt à découvrir de nouvelles activités ?
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Remplissez le formulaire ci-dessus pour que notre IA vous trouve
              les meilleures activités adaptées à votre contexte.
            </p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-12 text-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="rounded-full bg-orange-100 p-6">
          <SearchX className="h-12 w-12 text-orange-600" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">
            Aucune activité trouvée
          </h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            Essayez d'élargir vos critères de recherche ou de modifier votre
            localisation pour trouver plus d'activités.
          </p>
        </div>
      </div>
    </Card>
  );
}
