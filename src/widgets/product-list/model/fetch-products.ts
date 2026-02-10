"use server";

import { getProductsList } from "@/shared/api/products";

export async function fetchProducts(page: number, limit: number) {
  try {
    const data = await getProductsList({ page, limit });

    return data.products;
  } catch (error) {
    console.error(error);
    return [];
  }
}
