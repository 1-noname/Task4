"use client";

import { useFavoriteStore } from "@/entities/favorites/model/store";
import type { Movie } from "@/entities/movie/model/types";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";

import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";

interface ToggleFavoriteButtonProps {
  movie: Movie;
  className?: string;
}

export const ToggleFavoriteButton = ({ movie, className }: ToggleFavoriteButtonProps) => {
  const router = useRouter();
  const { toggleFavorite, isFavorite, activeUserId } = useFavoriteStore();

  const active = isFavorite(movie.id);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Если гость — отправляем логиниться, как и было в корзине
    if (activeUserId === "guest") {
      router.push("/login");
      return;
    }

    toggleFavorite(movie);
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={handleToggle}
      className={cn(
        "rounded-full bg-black/20 backdrop-blur-sm hover:bg-black/40 transition-all",
        active ? "text-red-500" : "text-white",
        className
      )}
    >
      <Heart
        size={20}
        fill={active ? "currentColor" : "none"}
        className="transition-transform active:scale-125"
      />
    </Button>
  );
};
