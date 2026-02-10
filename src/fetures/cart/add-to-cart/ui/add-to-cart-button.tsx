"use client";

import { useEffect, useState } from "react";

import { useCartStore } from "@/entities/cart/model/store";
import { Product } from "@/entities/product/model/types";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";

import { Check, ShoppingCart } from "lucide-react";

interface AddToCartButtonProps {
  product: Product;
}

export const AddToCartButton = ({ product }: AddToCartButtonProps) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isSuccess) {
      timeout = setTimeout(() => {
        setIsSuccess(false);
      }, 2000);
    }

    return () => clearTimeout(timeout);
  }, [isSuccess]);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    setIsSuccess(true);
  };

  return (
    <Button
      onClick={handleClick}
      size="default"
      className={cn(
        "transition-all duration-300 w-full",
        isSuccess
          ? "bg-green-600 hover:bg-green-700 text-white"
          : "",
      )}
    >
      <div className="flex items-center gap-2">
        {isSuccess ? (
          <>
            <Check className="h-4 w-4 animate-in zoom-in spin-in-90 duration-300" />
            <span>Added</span>
          </>
        ) : (
          <>
            <ShoppingCart className="h-4 w-4" />
            <span>Add to cart</span>
          </>
        )}
      </div>
    </Button>
  );
};
