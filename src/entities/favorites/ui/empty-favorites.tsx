import { Button } from "@/shared/ui/button";

import { Heart } from "lucide-react";
import Link from "next/link";

export const EmptyFavorites = () => (
  <div className="flex min-h-[400px] flex-col items-center justify-center space-y-4 text-center animate-in fade-in zoom-in duration-300">
    <div className="rounded-full bg-violet-500/10 p-8 ring-1 ring-violet-500/20">
      <Heart size={64} className="text-violet-400/60" strokeWidth={1.25} />
    </div>

    <h2 className="text-2xl font-bold tracking-tight gradient-text">No favorites yet</h2>
    <p className="max-w-sm text-muted-foreground">
      Save movies you like with the heart button — they will show up here.
    </p>

    <Button asChild size="lg" className="mt-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500">
      <Link href="/">Browse movies</Link>
    </Button>
  </div>
);
