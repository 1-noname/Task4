import type { SearchMediaType } from "@/entities/movie/model/media";
import { SearchWidget } from "@/widgets/search";

interface SearchPageProps {
  query: string;
  mediaType: SearchMediaType;
}

export const SearchPage = ({ query, mediaType }: SearchPageProps) => {
  return <SearchWidget initialQuery={query} initialType={mediaType} />;
};
