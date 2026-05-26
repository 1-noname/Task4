"use client";

import { type ComponentType, type ReactNode, useCallback, useEffect, useState } from "react";

import type { Genre } from "@/entities/genre/model/types";
import {
  DEFAULT_MOVIE_FILTERS,
  type MovieFilters,
} from "@/entities/movie/model/filters";
import { searchActorsAction } from "@/fetures/movie-filters/model/search-actors";
import type { PersonSearchResult } from "@/shared/api/movie";
import { cn } from "@/shared/lib/utils";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Separator } from "@/shared/ui/separator";

import {
  Calendar,
  Clapperboard,
  RotateCcw,
  Search,
  SlidersHorizontal,
  Star,
  User,
  X,
} from "lucide-react";

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: CURRENT_YEAR - 1949 }, (_, i) => CURRENT_YEAR - i);

const RATING_PRESETS = [
  { label: "Any", value: undefined },
  { label: "6+", value: 6 },
  { label: "7+", value: 7 },
  { label: "8+", value: 8 },
  { label: "9+", value: 9 },
] as const;

interface MovieFiltersPanelProps {
  genres: Genre[];
  appliedFilters: MovieFilters;
  onApply: (filters: MovieFilters) => void;
  isApplying?: boolean;
}

function FilterSection({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: ComponentType<{ className?: string }>;
  children: ReactNode;
}) {
  return (
    <section className="space-y-3">
      <div className="flex items-center gap-2 text-sm font-semibold">
        <Icon className="size-4 text-primary" />
        {title}
      </div>
      {children}
    </section>
  );
}

export const MovieFiltersPanel = ({
  genres,
  appliedFilters,
  onApply,
  isApplying,
}: MovieFiltersPanelProps) => {
  const [draft, setDraft] = useState<MovieFilters>(appliedFilters);
  const [actorQuery, setActorQuery] = useState("");
  const [actorResults, setActorResults] = useState<PersonSearchResult[]>([]);
  const [isSearchingActors, setIsSearchingActors] = useState(false);

  useEffect(() => {
    setDraft(appliedFilters);
    if (!appliedFilters.castId) {
      setActorQuery("");
    } else if (appliedFilters.castName) {
      setActorQuery(appliedFilters.castName);
    }
  }, [appliedFilters]);

  useEffect(() => {
    if (!actorQuery.trim() || draft.castId) {
      setActorResults([]);
      return;
    }

    const timeout = setTimeout(async () => {
      setIsSearchingActors(true);
      const results = await searchActorsAction(actorQuery);
      setActorResults(results.slice(0, 6));
      setIsSearchingActors(false);
    }, 350);

    return () => clearTimeout(timeout);
  }, [actorQuery, draft.castId]);

  const toggleGenre = (genreId: number) => {
    setDraft((prev) => ({
      ...prev,
      genres: prev.genres.includes(genreId)
        ? prev.genres.filter((id) => id !== genreId)
        : [...prev.genres, genreId],
    }));
  };

  const selectActor = (person: PersonSearchResult) => {
    setDraft((prev) => ({
      ...prev,
      castId: person.id,
      castName: person.name,
    }));
    setActorQuery(person.name);
    setActorResults([]);
  };

  const clearActor = () => {
    setDraft((prev) => ({
      ...prev,
      castId: undefined,
      castName: undefined,
    }));
    setActorQuery("");
    setActorResults([]);
  };

  const handleReset = () => {
    setDraft(DEFAULT_MOVIE_FILTERS);
    setActorQuery("");
    setActorResults([]);
    onApply(DEFAULT_MOVIE_FILTERS);
  };

  const handleApply = useCallback(() => {
    onApply(draft);
  }, [draft, onApply]);

  const activeCount =
    draft.genres.length +
    (draft.yearFrom != null ? 1 : 0) +
    (draft.yearTo != null ? 1 : 0) +
    (draft.minRating != null ? 1 : 0) +
    (draft.castId != null ? 1 : 0);

  return (
    <aside className="flex w-full flex-col lg:w-[300px] lg:shrink-0">
      <div className="glass-panel sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto rounded-2xl p-4 lg:p-5">
        <div className="mb-4 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
              <SlidersHorizontal className="size-4 text-primary" />
            </div>
            <div>
              <h2 className="text-base font-bold leading-tight">Filters</h2>
              <p className="text-xs text-muted-foreground">Refine your catalog</p>
            </div>
          </div>
          {activeCount > 0 && (
            <Badge variant="secondary" className="tabular-nums">
              {activeCount}
            </Badge>
          )}
        </div>

        <div className="space-y-5">
          <FilterSection title="Genres" icon={Clapperboard}>
            <div className="flex flex-wrap gap-1.5">
              {genres.map((genre) => {
                const active = draft.genres.includes(genre.id);
                return (
                  <button
                    key={genre.id}
                    type="button"
                    onClick={() => toggleGenre(genre.id)}
                    className={cn(
                      "rounded-full border px-2.5 py-1 text-xs font-medium transition-all",
                      active
                        ? "border-primary bg-primary text-primary-foreground shadow-sm"
                        : "border-border/80 bg-background/60 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                    )}
                  >
                    {genre.name}
                  </button>
                );
              })}
            </div>
          </FilterSection>

          <Separator className="bg-border/60" />

          <FilterSection title="Release year" icon={Calendar}>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1.5">
                <Label htmlFor="year-from" className="text-xs text-muted-foreground">
                  From
                </Label>
                <select
                  id="year-from"
                  value={draft.yearFrom ?? ""}
                  onChange={(e) =>
                    setDraft((prev) => ({
                      ...prev,
                      yearFrom: e.target.value ? Number(e.target.value) : undefined,
                    }))
                  }
                  className="h-9 w-full rounded-md border border-input bg-background px-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="">Any</option>
                  {YEARS.map((year) => (
                    <option key={`from-${year}`} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="year-to" className="text-xs text-muted-foreground">
                  To
                </Label>
                <select
                  id="year-to"
                  value={draft.yearTo ?? ""}
                  onChange={(e) =>
                    setDraft((prev) => ({
                      ...prev,
                      yearTo: e.target.value ? Number(e.target.value) : undefined,
                    }))
                  }
                  className="h-9 w-full rounded-md border border-input bg-background px-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="">Any</option>
                  {YEARS.map((year) => (
                    <option key={`to-${year}`} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </FilterSection>

          <Separator className="bg-border/60" />

          <FilterSection title="Rating" icon={Star}>
            <div className="flex flex-wrap gap-1.5">
              {RATING_PRESETS.map((preset) => {
                const active = draft.minRating === preset.value;
                return (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() =>
                      setDraft((prev) => ({ ...prev, minRating: preset.value }))
                    }
                    className={cn(
                      "rounded-full border px-3 py-1 text-xs font-medium transition-all",
                      active
                        ? "border-amber-500/50 bg-amber-500/15 text-amber-700 dark:text-amber-400"
                        : "border-border/80 bg-background/60 text-muted-foreground hover:border-amber-500/30"
                    )}
                  >
                    {preset.label}
                  </button>
                );
              })}
            </div>
            <input
              type="range"
              min={0}
              max={10}
              step={0.5}
              value={draft.minRating ?? 0}
              onChange={(e) => {
                const value = Number(e.target.value);
                setDraft((prev) => ({
                  ...prev,
                  minRating: value > 0 ? value : undefined,
                }));
              }}
              className="mt-2 h-1.5 w-full cursor-pointer accent-primary"
            />
            <p className="text-center text-xs text-muted-foreground">
              Min. {draft.minRating != null && draft.minRating > 0 ? draft.minRating.toFixed(1) : "—"} / 10
            </p>
          </FilterSection>

          <Separator className="bg-border/60" />

          <FilterSection title="Actor" icon={User}>
            <div className="relative">
              <Search className="pointer-events-none absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
              <Input
                value={actorQuery}
                onChange={(e) => {
                  setActorQuery(e.target.value);
                  if (draft.castId) {
                    setDraft((prev) => ({
                      ...prev,
                      castId: undefined,
                      castName: undefined,
                    }));
                  }
                }}
                placeholder="Search actor..."
                className="pl-8"
              />
              {draft.castId && (
                <button
                  type="button"
                  onClick={clearActor}
                  className="absolute right-2 top-2 rounded-md p-0.5 text-muted-foreground hover:text-foreground"
                  aria-label="Clear actor"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>

            {(isSearchingActors || actorResults.length > 0) && !draft.castId && (
              <ul className="mt-1 max-h-40 overflow-y-auto rounded-lg border border-border/60 bg-popover p-1 shadow-md">
                {isSearchingActors && (
                  <li className="px-2 py-2 text-xs text-muted-foreground">Searching...</li>
                )}
                {!isSearchingActors &&
                  actorResults.map((person) => (
                    <li key={person.id}>
                      <button
                        type="button"
                        onClick={() => selectActor(person)}
                        className="w-full rounded-md px-2 py-1.5 text-left text-sm hover:bg-accent"
                      >
                        {person.name}
                        {person.known_for_department && (
                          <span className="ml-1 text-xs text-muted-foreground">
                            · {person.known_for_department}
                          </span>
                        )}
                      </button>
                    </li>
                  ))}
              </ul>
            )}
          </FilterSection>
        </div>

        <div className="mt-5 flex flex-col gap-2">
          <Button onClick={handleApply} disabled={isApplying} className="w-full">
            {isApplying ? "Applying..." : "Apply filters"}
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="w-full text-muted-foreground"
          >
            <RotateCcw className="mr-2 size-3.5" />
            Reset all
          </Button>
        </div>
      </div>
    </aside>
  );
};
