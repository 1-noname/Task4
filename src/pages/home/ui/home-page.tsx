import { getProductsList } from "@/shared/api/products";
import { LIMIT } from "@/shared/constants/products";
import { ProductListWidget } from "@/widgets/product-list/ui/product-list";

export const HomePage = async () => {
  const { products } = await getProductsList({ page: 1, limit: LIMIT });

  return <ProductListWidget initialProducts={products} />
};
