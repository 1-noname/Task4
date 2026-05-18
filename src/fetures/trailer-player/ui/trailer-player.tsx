"use client";

import type { MovieVideo } from "@/entities/movie/model/media";
import { pickTrailer } from "@/shared/lib/trailer";
import { cn } from "@/shared/lib/utils";

import { Play } from "lucide-react";

interface TrailerPlayerProps {
  videos: MovieVideo[];
  title: string;
  className?: string;
}

export const TrailerPlayer = ({ videos, title, className }: TrailerPlayerProps) => {
  const trailer = pickTrailer(videos);

  if (!trailer) {
    return (
      <div
        className={cn(
          "flex aspect-video w-full items-center justify-center rounded-2xl glass-panel",
          className
        )}
      >
        <div className="text-center text-muted-foreground">
          <Play className="mx-auto mb-2 size-10 opacity-40" />
          <p className="text-sm">No trailer available for this title</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("overflow-hidden rounded-2xl glass-panel ring-1 ring-violet-500/20", className)}>
      <div className="relative aspect-video w-full bg-black">
        <iframe
          title={`${title} trailer`}
          src={`https://www.youtube.com/embed/${trailer.key}?rel=0&modestbranding=1`}
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <p className="border-t border-white/8 px-4 py-2 text-xs text-muted-foreground">
        {trailer.name}
      </p>
    </div>
  );
};
