"use server";

import { searchPerson, type PersonSearchResult } from "@/shared/api/movie";

export async function searchActorsAction(query: string): Promise<PersonSearchResult[]> {
  try {
    return await searchPerson(query);
  } catch (error) {
    console.error("searchActorsAction:", error);
    return [];
  }
}
