"use client";

import type { ComponentType } from "react";

import type { SearchMediaType } from "@/entities/movie/model/media";
import { cn } from "@/shared/lib/utils";

import { Clapperboard, LayoutGrid, Tv, User } from "lucide-react";

const OPTIONS: {
  value: SearchMediaType;
  label: string;
  icon: ComponentType<{ className?: string }>;
}[] = [
  { value: "all", label: "All", icon: LayoutGrid },
  { value: "movie", label: "Movies", icon: Clapperboard },
  { value: "tv", label: "TV", icon: Tv },
  { value: "person", label: "People", icon: User },
];

interface MediaTypeFilterProps {
  value: SearchMediaType;
  onChange: (value: SearchMediaType) => void;
}

export const MediaTypeFilter = ({ value, onChange }: MediaTypeFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {OPTIONS.map(({ value: optionValue, label, icon: Icon }) => {
        const active = value === optionValue;
        return (
          <button
            key={optionValue}
            type="button"
            onClick={() => onChange(optionValue)}
            className={cn(
              "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium transition-all",
              active
                ? "border-primary bg-primary text-primary-foreground shadow-sm shadow-primary/20"
                : "border-white/10 bg-card/50 text-muted-foreground hover:border-primary/40 hover:text-foreground"
            )}
          >
            <Icon className="size-4" />
            {label}
          </button>
        );
      })}
    </div>
  );
};
