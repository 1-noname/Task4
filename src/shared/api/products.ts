import { Product } from "@/entities/product/model/types";

interface FetchProductsParams {
  limit?: number;
  page?: number;
}

interface ProductResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export const getProductsList = async ({
  page = 1,
  limit = 8,
}: FetchProductsParams): Promise<ProductResponse> => {
  const skip = (page - 1) * limit;

  const res = await fetch(
    `https://dummyjson.com/products?limit=${limit}&skip=${skip}`,
  );

  if (!res.ok) throw new Error("Failed to fetch products");

  return res.json();
};
