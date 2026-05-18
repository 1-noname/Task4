export function formatReleaseDate(date?: string | null): string | null {
  if (!date) return null;

  try {
    return new Intl.DateTimeFormat("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(date));
  } catch {
    return date;
  }
}

export function formatRuntime(minutes?: number | null): string | null {
  if (!minutes || minutes <= 0) return null;

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours === 0) return `${mins} min`;
  if (mins === 0) return `${hours} h`;
  return `${hours} h ${mins} min`;
}

export function formatCertification(cert?: string | null): string | null {
  if (!cert) return null;
  const trimmed = cert.trim();
  return trimmed.length > 0 ? trimmed : null;
}
