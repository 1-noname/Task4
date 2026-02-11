'use client'

import { CART_CARD_IMAGE_SIZE } from "@/shared/constants/cart";
import { formatPrice } from "@/shared/lib/currency";
import { Button } from "@/shared/ui/button";

import type { CartItem } from "../model/store";

import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";

interface CartCardProps {
  item: CartItem;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}

export const CartCard = ({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}: CartCardProps) => {
  return (
    <div className="flex gap-3 p-3 border rounded-lg bg-card shadow-sm w-full relative">
      <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden rounded-md border bg-white">
        <Image
          src={item.thumbnail}
          alt={item.title}
          fill
          className="object-contain p-2"
          sizes={CART_CARD_IMAGE_SIZE}
        />
      </div>

      <div className="flex flex-col flex-1 justify-between min-w-0">
        <div className="flex justify-between items-start gap-2">
          <div className="pr-6">
            <h3 className="font-semibold text-sm sm:text-base leading-tight line-clamp-2" title={item.title}>
              {item.title}
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              {formatPrice(item.price)}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center border rounded-md h-8 shadow-sm">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-r-none hover:bg-muted"
              onClick={onDecrease}
            >
              <Minus size={14} />
            </Button>
            <span className="w-8 text-center text-sm font-medium">
              {item.quantity}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-l-none hover:bg-muted"
              onClick={onIncrease}
            >
              <Plus size={14} />
            </Button>
          </div>

          <div className="font-bold text-base text-primary">
            {formatPrice(item.price * item.quantity)}
          </div>
        </div>
      </div>

      <button
        onClick={onRemove}
        className="absolute top-3 right-3 text-muted-foreground hover:text-destructive transition-colors p-1"
      >
        <Trash2 size={18} />
      </button>

    </div>
  );
};
