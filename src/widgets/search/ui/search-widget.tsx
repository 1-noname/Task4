"use client";

import { useCallback, useEffect, useState } from "react";

import type { SearchMediaType, SearchMultiItem } from "@/entities/movie/model/media";
import { MediaTypeFilter } from "@/fetures/search/ui/media-type-filter";
import { SearchResultRow } from "@/fetures/search/ui/search-result-row";
import { APP_CONTAINER } from "@/shared/constants/layout";
import { cn } from "@/shared/lib/utils";
import { searchMultiAction } from "@/widgets/search/model/search-multi";

import { Loader2, Search } from "lucide-react";

interface SearchWidgetProps {
  initialQuery: string;
  initialType: SearchMediaType;
}

function filterByType(items: SearchMultiItem[], type: SearchMediaType) {
  if (type === "all") return items;
  return items.filter((item) => item.media_type === type);
}

export const SearchWidget = ({ initialQuery, initialType }: SearchWidgetProps) => {
  const [query, setQuery] = useState(initialQuery);
  const [mediaType, setMediaType] = useState<SearchMediaType>(initialType);
  const [results, setResults] = useState<SearchMultiItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(Boolean(initialQuery.trim()));

  const runSearch = useCallback(async (q: string) => {
    if (!q.trim()) {
      setResults([]);
      setHasSearched(false);
      return;
    }

    setIsLoading(true);
    setHasSearched(true);

    try {
      const data = await searchMultiAction(q, 1);
      setResults(data.results);
    } catch {
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (initialQuery.trim()) {
      runSearch(initialQuery);
    }
  }, [initialQuery, runSearch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (mediaType !== "all") params.set("type", mediaType);
    window.history.replaceState(null, "", `/search?${params.toString()}`);
    runSearch(query);
  };

  const filtered = filterByType(results, mediaType);

  return (
    <section className={cn(APP_CONTAINER, "space-y-6 py-8")}>
      <div>
        <h1 className="text-3xl font-bold gradient-text">Search</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Movies, TV shows, and people — powered by TMDB multi search
        </p>
      </motionlessDiv>

      <form onSubmit={handleSubmit} className="glass-panel space-y-4 rounded-2xl p-4">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search movies, series, actors..."
            className="h-11 w-full rounded-xl border border-white/10 bg-background/60 pl-10 pr-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </motionlessDiv>
        <MediaTypeFilter value={mediaType} onChange={setMediaType} />
        <button
          type="submit"
          className="h-10 w-full rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-sm font-medium text-white transition hover:from-violet-500 hover:to-fuchsia-500"
        >
          Search
        </button>
      </form>

      {isLoading && (
        <div className="flex justify-center py-16">
          <Loader2 className="size-8 animate-spin text-primary" />
        </motionlessDiv>
      )}

      {!isLoading && hasSearched && filtered.length === 0 && (
        <div className="glass-panel rounded-2xl py-16 text-center text-muted-foreground">
          No results for this query
        </motionlessDiv>
      )}

      {!isLoading && filtered.length > 0 && (
        <ul className="flex flex-col gap-3">
          {filtered.map((item) => (
            <li key={`${item.media_type}-${item.id}`}>
              <SearchResultRow item={item} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
