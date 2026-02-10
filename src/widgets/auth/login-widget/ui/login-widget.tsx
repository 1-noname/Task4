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
      <Card className="w-full shadow-lg">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-bold">Welcome</CardTitle>
          <CardDescription>Enter here your login and username</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
};
