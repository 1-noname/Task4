import type { CastMember } from "@/entities/movie/model/media";
import { cn } from "@/shared/lib/utils";

import { User } from "lucide-react";
import Image from "next/image";

const PROFILE_BASE = "https://image.tmdb.org/t/p/w185";

interface CastCarouselProps {
  cast: CastMember[];
  className?: string;
}

export const CastCarousel = ({ cast, className }: CastCarouselProps) => {
  const topCast = cast.filter((m) => m.name).slice(0, 16);

  if (!topCast.length) return null;

  return (
    <section className={cn("space-y-4", className)}>
      <h2 className="text-lg font-semibold gradient-text">Cast</h2>
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
        {topCast.map((member) => (
          <article
            key={member.id}
            className="w-[108px] shrink-0 rounded-xl glass-panel p-2 text-center"
          >
            <div className="relative mx-auto mb-2 size-20 overflow-hidden rounded-full bg-muted ring-1 ring-white/10">
              {member.profile_path ? (
                <Image
                  src={`${PROFILE_BASE}${member.profile_path}`}
                  alt={member.name}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <User className="size-8 text-muted-foreground/40" />
                </div>
              )}
            </div>
            <p className="text-xs font-medium leading-tight line-clamp-2">{member.name}</p>
            <p className="mt-0.5 text-[10px] text-muted-foreground line-clamp-2">
              {member.character}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};
