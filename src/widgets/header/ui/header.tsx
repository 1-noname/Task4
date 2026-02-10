import { LoginButton } from "@/fetures/auth/login-button";
import { UserMenu } from "@/fetures/auth/user-menu";
import { getCurrentUser } from "@/shared/api/auth";
import { Button } from "@/shared/ui/button";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export const Header = async () => {
  const user = await getCurrentUser();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur px-4">
      <div className="container mx-auto flex h-16 items-center justify-between">

        <div className="flex items-center gap-2">
          <Link href="/" className="font-bold text-xl tracking-tight">
            <span className="text-secondary">MyShop</span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/cart">
              <ShoppingCart size={22} />
              <span className="sr-only">Cart</span>
            </Link>
          </Button>

          {user ? (
            <UserMenu user={user} />
          ) : (
            <LoginButton />
          )}
        </div>
      </div>
    </header>
  );
};
