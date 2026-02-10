"use client";

import { useEffect, useState } from "react";

import { CartCard } from "@/entities/cart";
import { useCartStore } from "@/entities/cart/model/store";
import { formatPrice } from "@/shared/lib/currency";
import { Button } from "@/shared/ui/button";
import { Skeleton } from "@/shared/ui/skeleton";

import { ArrowRight, ShoppingBag } from "lucide-react";
import Link from "next/link";

interface CartWidgetProps {
  userId: number | null;
}

export const CartWidget = ({ userId }: CartWidgetProps) => {
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
    return <CartSkeleton />;
  }

  const currentItems = getItems();

  const subtotal = currentItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const TAX_RATE = 0.15;
  const taxAmount = subtotal * TAX_RATE;
  const grandTotal = subtotal + taxAmount;

  if (currentItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-4 animate-in fade-in zoom-in duration-300">
        <div className="bg-muted/30 p-8 rounded-full">
          <ShoppingBag size={64} className="text-muted-foreground/50" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight">Your cart is empty</h2>
        <p className="text-muted-foreground max-w-sm">
          Looks like you havent added anything to your cart yet
        </p>
        <Button asChild size="lg" className="mt-4">
          <Link href="/">Start Shopping</Link>
        </Button>
      </div>
    );
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

      <div className="lg:col-span-4 h-full">
        <div className="sticky top-24 rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden">
          <div className="bg-muted/40 p-4 border-b">
            <h3 className="font-semibold text-lg">Order Summary</h3>
          </div>

          <div className="p-6 space-y-6">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Tax ({(TAX_RATE * 100).toFixed(0)}%)
                </span>
                <span className="font-medium">{formatPrice(taxAmount)}</span>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-6">
                <span className="font-bold text-lg">Total</span>
                <span className="font-bold text-xl text-primary">
                  {formatPrice(grandTotal)}
                </span>
              </div>

              <Button className="w-full text-base group" size="lg">
                Checkout
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>

              <p className="text-xs text-muted-foreground text-center mt-4">
                Shipping & taxes calculated at checkout
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CartSkeleton = () => (
  <div className="container grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
    <div className="lg:col-span-8 space-y-4">
      <Skeleton className="h-10 w-48 mb-6" />
      <Skeleton className="h-32 w-full rounded-xl" />
      <Skeleton className="h-32 w-full rounded-xl" />
      <Skeleton className="h-32 w-full rounded-xl" />
    </div>
    <div className="lg:col-span-4">
      <Skeleton className="h-[300px] w-full rounded-xl" />
    </div>
  </div>
);
