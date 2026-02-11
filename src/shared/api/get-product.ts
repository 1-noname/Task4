import type { Product } from "@/entities/product/model/types";

export async function getProduct(id: string): Promise<Product | null> {
  const res = await fetch(`https://dummyjson.com/products/${id}`, {
    next: { revalidate: 3600 }
  });

  if (!res.ok) return null;

  return res.json();
}
