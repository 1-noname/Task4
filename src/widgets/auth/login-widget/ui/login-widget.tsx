import { LoginForm } from "@/fetures/auth/login-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";

export const LoginWidget = () => {
  return (
    <div className="w-full max-w-sm shrink-0 px-4 md:px-0">
      <Card className="glass-panel w-full border-white/10 shadow-2xl shadow-violet-950/40">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl font-bold gradient-text">Welcome back</CardTitle>
          <CardDescription>Sign in to save favorites and open your profile</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
};
