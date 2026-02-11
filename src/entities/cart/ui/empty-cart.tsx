import { Button } from "@/shared/ui/button";

import { ShoppingBag } from "lucide-react";
import Link from "next/link";

export const EmptyCart = () => (
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
