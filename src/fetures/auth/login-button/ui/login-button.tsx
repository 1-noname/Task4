import { Button } from "@/shared/ui/button";

import Link from "next/link";

export const LoginButton = () => {
  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="sm" asChild>
        <Link href="/login">Sing in</Link>
      </Button>
    </div>
  );
};
