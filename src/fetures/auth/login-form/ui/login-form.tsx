"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { type FormState, loginAction } from "../model/login-action";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Alert, AlertDescription } from "@/shared/ui/alert";
import { Loader2 } from "lucide-react";

const initialState: FormState = {
  error: null,
  success: false,
};

export const LoginForm = () => {
  const router = useRouter();

  const [state, formAction, isPending] = useActionState(
    loginAction,
    initialState,
  );

  useEffect(() => {
    if (state.success) {
      router.push("/");
      router.refresh();
    } else {
    }
  }, [state.success, router]);

  return (
    <form action={formAction} className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="username">Login</Label>
        <Input
          id="username"
          name="username"
          placeholder="emilys"
          disabled={isPending}
          required
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="••••••"
          disabled={isPending}
          required
        />
      </div>

      {state.error && (
        <Alert variant="destructive">
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      )}

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Loading...
          </>
        ) : (
          "Join"
        )}
      </Button>
    </form>
  );
};
