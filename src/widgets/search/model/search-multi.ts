"use server";

import { searchMulti } from "@/shared/api/movie";

export async function searchMultiAction(query: string, page = 1) {
  try {
    return await searchMulti(query, page);
  } catch (error) {
    console.error("searchMultiAction:", error);
    return { page: 1, results: [], total_pages: 0, total_results: 0 };
  }
}
