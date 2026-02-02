"use client";

import { Activity, ACTIVITY_TYPE_LABELS } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Euro, Calendar, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ActivityCardProps {
  activity: Activity;
}

export function ActivityCard({ activity }: ActivityCardProps) {
  const priceDisplay = activity.price
    ? activity.price.min === activity.price.max
      ? `${activity.price.min}${activity.price.currency}`
      : `${activity.price.min}-${activity.price.max}${activity.price.currency}`
    : "Gratuit";

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      {activity.image && (
        <div className="relative h-48 w-full overflow-hidden bg-gray-100">
          <img
            src={activity.image}
            alt={activity.title}
            className="h-full w-full object-cover"
          />
        </div>
      )}
      
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-lg leading-tight">
            {activity.title}
          </h3>
          <Badge variant="secondary">
            {ACTIVITY_TYPE_LABELS[activity.type]}
          </Badge>
        </div>

        <p className="text-sm text-gray-600 line-clamp-3">
          {activity.description}
        </p>

        <div className="space-y-2 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 flex-shrink-0" />
            <span className="truncate">{activity.location.name}</span>
          </div>

          {activity.date && (
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 flex-shrink-0" />
              <span>{new Date(activity.date).toLocaleDateString("fr-FR")}</span>
            </div>
          )}

          <div className="flex items-center gap-2">
            <Euro className="h-4 w-4 flex-shrink-0" />
            <span>{priceDisplay}</span>
          </div>
        </div>

        {activity.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {activity.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {activity.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{activity.tags.length - 3}
              </Badge>
            )}
          </div>
        )}

        <Button
          variant="outline"
          className="w-full"
          asChild
        >
          <a
            href={activity.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Voir plus
          </a>
        </Button>
      </div>
    </Card>
  );
}
