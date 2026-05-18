interface ReleaseDateEntry {
  certification: string;
  type: number;
}

interface CountryReleaseDates {
  iso_3166_1: string;
  release_dates: ReleaseDateEntry[];
}

export interface ReleaseDatesPayload {
  results?: CountryReleaseDates[];
}

const PREFERRED_COUNTRIES = ["RU", "US", "GB"] as const;

/** TMDB stores age ratings in release_dates (e.g. PG-13, R, 16+). */
export function extractCertification(
  payload?: ReleaseDatesPayload | null
): string | null {
  const results = payload?.results;
  if (!results?.length) return null;

  for (const countryCode of PREFERRED_COUNTRIES) {
    const country = results.find((r) => r.iso_3166_1 === countryCode);
    if (!country?.release_dates?.length) continue;

    const theatrical = country.release_dates.find((d) => d.type === 3);
    const cert = (theatrical ?? country.release_dates[0])?.certification?.trim();
    if (cert) return cert;
  }

  for (const country of results) {
    const cert = country.release_dates?.find((d) => d.certification?.trim())
      ?.certification;
    if (cert?.trim()) return cert.trim();
  }

  return null;
}
