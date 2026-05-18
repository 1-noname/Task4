"use client";

import type { SearchMediaType } from "@/entities/movie/model/media";
import { cn } from "@/shared/lib/utils";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export const HeaderSearch = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    router.push(`/search?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="hidden flex-1 max-w-md md:block">
      <div className="relative">
        <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
          className={cn(
            "h-9 w-full rounded-lg border border-white/10 bg-card/50 pl-9 pr-3 text-sm",
            "outline-none transition focus-visible:border-primary/50 focus-visible:ring-2 focus-visible:ring-ring/50"
          )}
        />
      </div>
    </form>
  );
};
