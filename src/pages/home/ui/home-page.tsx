import { getProductsList } from "@/shared/api/products";
import { LIMIT } from "@/shared/constants/products";
import { ProductListWidget } from "@/widgets/product-list/ui/product-list";

export const HomePage = async () => {
  const { products } = await getProductsList({ page: 1, limit: LIMIT });

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <ProductListWidget initialProducts={products} />
    </main>
  );
};
