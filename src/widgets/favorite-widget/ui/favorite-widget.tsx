"use client";

import { ReactNode, useEffect, useState } from "react";

import { useFavoriteStore } from "@/entities/favorites/model/store";
import { MovieCard } from "@/entities/movie/ui/movie-card";
import { ToggleFavoriteButton } from "@/fetures/toggle-favorite/toggle-favorite";
import type { GenreMap } from "@/shared/lib/genres";

interface FavoritesWidgetProps {
  genreMap: GenreMap;
  emptySlot: ReactNode;
  skeleton: ReactNode;
}

export const FavoritesWidget = ({ genreMap, emptySlot, skeleton }: FavoritesWidgetProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const { getFavorites } = useFavoriteStore();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <>{skeleton}</>;
  }

  const favorites = getFavorites();

  if (favorites.length === 0) {
    return <>{emptySlot}</>;
  }

  return (
    <div className="container mx-auto mt-4 px-4 pb-10">
      <div className="mb-6 border-b border-white/8 pb-4">
        <h2 className="text-2xl font-bold gradient-text">My Favorites ({favorites.length})</h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {favorites.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            genreMap={genreMap}
            renderFavoriteButton={(m) => <ToggleFavoriteButton movie={m} />}
          />
        ))}
      </div>
    </div>
  );
};
