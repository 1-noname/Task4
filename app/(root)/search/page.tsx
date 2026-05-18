import type { SearchMediaType } from "@/entities/movie/model/media";
import { SearchPage } from "@/pages/search/ui/search-page";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MovieShop | Search",
};

interface PageProps {
  searchParams: Promise<{ q?: string; type?: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  const { q = "", type } = await searchParams;
  const mediaType: SearchMediaType =
    type === "movie" || type === "tv" || type === "person" ? type : "all";

  return <SearchPage query={q} mediaType={mediaType} />;
}
