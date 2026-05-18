import type { MovieVideo } from "@/entities/movie/model/media";

export function pickTrailer(videos: MovieVideo[]): MovieVideo | null {
  if (!videos.length) return null;

  return (
    videos.find((v) => v.site === "YouTube" && v.type === "Trailer" && v.official) ??
    videos.find((v) => v.site === "YouTube" && v.type === "Trailer") ??
    videos.find((v) => v.site === "YouTube") ??
    null
  );
}
