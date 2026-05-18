"use server";

import { getMoviesList } from "@/shared/api/movie";

export async function fetchMovies(page: number) {
  try {
    const data = await getMoviesList(page);

    console.log("yes")
    console.log(data.results)
    return data.results;
  } catch (error) {
    console.error("Error in fetchProducts:", error);
    return [];
  }
}
