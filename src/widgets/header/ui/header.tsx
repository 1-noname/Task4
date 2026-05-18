import type { ComponentType, ReactNode } from "react";

import { HeaderSearch } from "@/fetures/header-search/ui/header-search";
import { LoginButton } from "@/fetures/auth/login-button";
import { UserMenu } from "@/fetures/auth/user-menu";
import { getCurrentUser } from "@/shared/api/auth";
import { APP_CONTAINER } from "@/shared/constants/layout";
import { cn } from "@/shared/lib/utils";

import { Clapperboard, Heart, Search, User } from "lucide-react";
import Link from "next/link";

export const Header = async () => {
  const user = await getCurrentUser();

  return (
    <header className="sticky top-0 z-50 border-b border-white/8 bg-background/75 backdrop-blur-xl">
      <div className={cn(APP_CONTAINER, "flex h-16 items-center gap-4")}>
        <Link href="/" className="flex shrink-0 items-center gap-2.5 transition-opacity hover:opacity-90">
          <div className="flex size-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500/30 to-fuchsia-500/20 ring-1 ring-violet-400/30">
            <Clapperboard className="size-4 text-violet-300" />
          </div>
          <span className="hidden text-lg font-bold tracking-tight gradient-text sm:inline">
            MovieShop
          </span>
        </Link>

        <HeaderSearch />

        <nav className="hidden items-center gap-1 lg:flex">
          <NavLink href="/" icon={Clapperboard}>
            Catalog
          </NavLink>
          <NavLink href="/search" icon={Search}>
            Search
          </NavLink>
          {user && (
            <>
              <NavLink href="/favorites" icon={Heart}>
                Favorites
              </NavLink>
              <NavLink href="/profile" icon={User}>
                Profile
              </NavLink>
            </>
          )}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-3">
          {user ? <UserMenu user={user} /> : <LoginButton />}
        </div>
      </div>
    </header>
  );
};

function NavLink({
  href,
  icon: Icon,
  children,
}: {
  href: string;
  icon: ComponentType<{ className?: string }>;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground",
        "transition-colors hover:bg-white/5 hover:text-foreground"
      )}
    >
      <Icon className="size-4 text-primary/80" />
      {children}
    </Link>
  );
}
