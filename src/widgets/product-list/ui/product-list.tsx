"use client";

import { useEffect, useRef, useState, useTransition } from "react";

import type { Product } from "@/entities/product/model/types";
import { ProductCard } from "@/entities/product/ui/product-card";
import { AddToCartButton } from "@/fetures/cart/add-to-cart";
import { LIMIT } from "@/shared/constants/products";

import { fetchProducts } from "../model/fetch-products";

interface ProductListWidgetProps {
  initialProducts: Product[];
}

export const ProductListWidget = ({
  initialProducts,
}: ProductListWidgetProps) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [page, setPage] = useState(2);
  const [hasMore, setHasMore] = useState(true);
  const [isPending, startTransition] = useTransition();
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      async (entries) => {
        if (entries[0].isIntersecting && hasMore && !isPending) {
          startTransition(async () => {
            const newProducts = await fetchProducts(page, LIMIT);

            if (newProducts.length < LIMIT) {
              setHasMore(false);
            }

            setProducts((prev) => [...prev, ...newProducts]);
            setPage((prev) => prev + 1);
          });
        }
      },
      {
        rootMargin: "100px",
        threshold: 0.3,
      },
    );

    const trigger = triggerRef.current;

    if (trigger) {
      observer.observe(trigger);
    }

    return () => {
      if (trigger) observer.unobserve(trigger);
    };
  }, [page, hasMore, isPending]);

  return (
    <section className="container p-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Products catalog</h2>
        <span className="text-muted-foreground">Select products</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} actionButton={<AddToCartButton product={product} />} />
        ))}
      </div>

      <div ref={triggerRef} className="h-10 mt-8 flex justify-center w-full">
        {isPending && (
          <span className="text-blue-500 animate-pulse">
            Loading new products...
          </span>
        )}
        {!hasMore && (
          <span className="text-gray-400">That all what we have =.=</span>
        )}
      </div>
    </section>
  );
};
