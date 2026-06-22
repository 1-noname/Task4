import { LoginButton } from "@/fetures/auth/login-button";
import { UserMenu } from "@/fetures/auth/user-menu";
import { HeaderSearch } from "@/fetures/header-search/ui/header-search";
import { getCurrentUser } from "@/shared/api/auth";
import { APP_CONTAINER } from "@/shared/constants/layout";
import { cn } from "@/shared/lib/utils";

import { Clapperboard, Gamepad2, Heart, Search, User } from "lucide-react";
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

        <Link href="/roulette">Roulette</Link>
        <Link href="/quiz">Quiz Game</Link>

        <div className="ml-auto flex shrink-0 items-center gap-3">
          {user ? <UserMenu user={user} /> : <LoginButton />}
        </div>
      </div>
    </header>
  );
};

