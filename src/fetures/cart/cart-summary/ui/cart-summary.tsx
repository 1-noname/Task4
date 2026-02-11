"use client";

import { CartItem } from "@/entities/cart/model/store";
import { formatPrice } from "@/shared/lib/currency";
import { Button } from "@/shared/ui/button";

import { ArrowRight } from "lucide-react";

interface CartSummaryProps {
  items: CartItem[];
}

export const CartSummary = ({ items }: CartSummaryProps) => {
  const TAX_RATE = 0.15;

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const taxAmount = subtotal * TAX_RATE;
  const grandTotal = subtotal + taxAmount;

  return (
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
  );
};
