import type { SearchMultiItem } from "@/entities/movie/model/media";
import { cn } from "@/shared/lib/utils";
import { Badge } from "@/shared/ui/badge";

import { ChevronRight, Clapperboard, Film, Tv, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const POSTER_BASE = "https://image.tmdb.org/t/p/w185";
const PROFILE_BASE = "https://image.tmdb.org/t/p/w185";

function getTitle(item: SearchMultiItem): string {
  return item.title ?? item.name ?? "Untitled";
}

function getHref(item: SearchMultiItem): string {
  if (item.media_type === "movie") return `/movie/${item.id}`;
  if (item.media_type === "tv") return `/tv/${item.id}`;
  return `/?cast=${item.id}&castName=${encodeURIComponent(getTitle(item))}`;
}

function getImage(item: SearchMultiItem): string | null {
  if (item.media_type === "person") {
    return item.profile_path ? `${PROFILE_BASE}${item.profile_path}` : null;
  }
  return item.poster_path ? `${POSTER_BASE}${item.poster_path}` : null;
}

const TYPE_LABELS = {
  movie: "Movie",
  tv: "TV Series",
  person: "Person",
} as const;

interface SearchResultRowProps {
  item: SearchMultiItem;
}

export const SearchResultRow = ({ item }: SearchResultRowProps) => {
  const title = getTitle(item);
  const image = getImage(item);
  const href = getHref(item);
  const year =
    item.release_date?.split("-")[0] ?? item.first_air_date?.split("-")[0];

  return (
    <Link
      href={href}
      className={cn(
        "catalog-row group flex gap-4",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      )}
    >
      <div className="relative size-[88px] shrink-0 overflow-hidden rounded-lg bg-muted ring-1 ring-white/10">
        {image ? (
          <Image src={image} alt={title} fill className="object-cover" sizes="88px" />
        ) : (
          <div className="flex h-full items-center justify-center">
            {item.media_type === "person" ? (
              <User className="size-8 text-muted-foreground/40" />
            ) : item.media_type === "tv" ? (
              <Tv className="size-8 text-muted-foreground/40" />
            ) : (
              <Film className="size-8 text-muted-foreground/40" />
            )}
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1 space-y-1.5 py-0.5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge
            variant="outline"
            className="border-violet-500/30 bg-violet-500/10 text-[10px] text-violet-300"
          >
            {item.media_type === "movie" && <Clapperboard className="mr-1 size-3" />}
            {item.media_type === "tv" && <Tv className="mr-1 size-3" />}
            {item.media_type === "person" && <User className="mr-1 size-3" />}
            {TYPE_LABELS[item.media_type]}
          </Badge>
          {year && <span className="text-xs text-muted-foreground">{year}</span>}
          {item.vote_average != null && item.vote_average > 0 && (
            <span className="text-xs text-amber-400">★ {item.vote_average.toFixed(1)}</span>
          )}
        </div>
        <h3 className="font-semibold leading-snug line-clamp-1 group-hover:text-violet-300">
          {title}
        </h3>
        {item.overview && (
          <p className="text-sm text-muted-foreground line-clamp-2">{item.overview}</p>
        )}
        {item.media_type === "person" && item.known_for_department && (
          <p className="text-xs text-muted-foreground">{item.known_for_department}</p>
        )}
        <span className="inline-flex items-center gap-1 text-xs text-violet-300/80 opacity-0 transition-opacity group-hover:opacity-100">
          Open
          <ChevronRight size={14} />
        </span>
      </div>
    </Link>
  );
};
