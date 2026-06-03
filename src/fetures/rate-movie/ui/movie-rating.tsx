"use client";

import { useState } from "react";

import { useFavoriteStore } from "@/entities/favorites/model/store";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";

import { useRatingStore } from "../model/store";

import { Star, Trash2 } from "lucide-react";

interface MovieRatingProps {
  movieId: number;
}

export const MovieRating = ({ movieId }: MovieRatingProps) => {
  const { activeUserId } = useFavoriteStore();
  const { setRating, removeRating, ratingsByUserId } = useRatingStore();

  const currentRating = ratingsByUserId[activeUserId]?.[movieId] || 0;
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  if (activeUserId === "guest") return null;

  return (
    <div className="flex flex-col gap-2 rounded-2xl p-5 border-white/10 glass-panel">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-violet-300/90">
          Your Rating
        </h2>

        {/* Кнопка сброса — рендерится только если фильм уже оценен */}
        {currentRating > 0 && (
          <Button
            type="button"
            variant="ghost"
            size="xs"
            onClick={() => removeRating(activeUserId, movieId)}
            className="h-7 text-xs text-muted-foreground hover:bg-red-500/10 hover:text-red-400 transition-colors"
          >
            <Trash2 className="mr-1 size-3.5" />
            Clear
          </Button>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-1.5 pt-1">
        {Array.from({ length: 10 }, (_, i) => i + 1).map((score) => (
          <button
            key={score}
            type="button"
            onMouseEnter={() => setHoverRating(score)}
            onMouseLeave={() => setHoverRating(null)}
            onClick={() => setRating(activeUserId, movieId, score)}
            className="group/star relative outline-none transition-transform active:scale-125"
            title={`Rate ${score}/10`}
          >
            <Star
              size={22}
              className={cn(
                "transition-colors duration-200",
                score <= (hoverRating ?? currentRating)
                  ? "text-amber-400 fill-amber-400"
                  : "text-muted-foreground/30 hover:text-amber-400/60"
              )}
            />
          </button>
        ))}

        {currentRating > 0 && (
          <span className="ml-3 text-base font-bold text-amber-400 tabular-nums animate-in fade-in duration-300">
            {currentRating} / 10
          </span>
        )}
      </div>
    </div>
  );
};
