"use client";

import { ReactNode, useEffect, useState } from "react";

import { CartCard } from "@/entities/cart";
import { useCartStore } from "@/entities/cart/model/store";
import { CartSummary } from "@/fetures/cart/cart-summary";

interface CartWidgetProps {
  userId: number | null;
  emptySlot: ReactNode;
  skeleton: ReactNode;
}

export const CartWidget = ({ userId, emptySlot, skeleton }: CartWidgetProps) => {
  const [isMounted, setIsMounted] = useState(false);

  const {
    items: getItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    setActiveUserId,
    activeUserId,
  } = useCartStore();

  useEffect(() => {
    setActiveUserId(userId);
  }, [userId, setActiveUserId]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const targetId = userId ? String(userId) : "guest";
  const isSyncing = activeUserId !== targetId;

  if (!isMounted || isSyncing) {
    return <>{skeleton}</>;
  }

  const currentItems = getItems();

  if (currentItems.length === 0) {
    return <>{emptySlot}</>;
  }

  return (
    <div className="container grid grid-cols-1 lg:grid-cols-12 gap-8 pb-10 px-4 mt-4">
      <div className="lg:col-span-8 space-y-6">
        <div className="border-b pb-4">
          <h2 className="text-xl font-semibold">Shopping Cart ({currentItems.length})</h2>
        </div>

        <div className="space-y-4">
          {currentItems.map((item) => (
            <div key={item.id}>
              <CartCard
                item={item}
                onIncrease={() => increaseQuantity(item.id)}
                onDecrease={() => decreaseQuantity(item.id)}
                onRemove={() => removeFromCart(item.id)}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="lg:col-span-4">
        <CartSummary items={currentItems} />
      </div>
    </div>
  );
};
