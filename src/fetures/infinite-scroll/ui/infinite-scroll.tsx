"use client";

import { useEffect, useRef, useState, useTransition } from "react";

import type { Product } from "@/entities/product/model/types";
import { ProductCard } from "@/entities/product/ui/product-card";
import { AddToCartButton } from "@/fetures/cart/add-to-cart";
import { LIMIT } from "@/shared/constants/products";
import { fetchProducts } from "@/widgets/product-list/model/fetch-products";

export const InfiniteScroll = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(2);
  const [hasMore, setHasMore] = useState(true);
  const [isPending, startTransition] = useTransition();
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isPending) {
          startTransition(async () => {
            const newProducts = await fetchProducts(page, LIMIT);
            if (newProducts.length < LIMIT) setHasMore(false);

            setProducts((prev) => [...prev, ...newProducts]);
            setPage((prev) => prev + 1);
          });
        }
      },
      { rootMargin: "200px", threshold: 0.1 }
    );

    if (triggerRef.current) observer.observe(triggerRef.current);
    return () => observer.disconnect();
  }, [page, hasMore, isPending]);

  return (
    <>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          actionButton={<AddToCartButton product={product} />}
        />
      ))}

      <div ref={triggerRef} className="col-span-full h-20 flex items-center justify-center">
        {isPending && <span className="text-blue-500 animate-pulse">Loading...</span>}
        {!hasMore && <span className="text-muted-foreground">Thats all for today.</span>}
      </div>
    </>
  );
};
