import type { User } from "@/shared/api/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Badge } from "@/shared/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

interface UserCardProps {
  user: User;
}

export const UserCard = ({ user }: UserCardProps) => {
  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardHeader className="flex flex-col items-center gap-4">
        <Avatar className="w-24 h-24 border-4 border-primary/10">
          <AvatarImage src={user.image} alt={user.username} />
          <AvatarFallback className="text-2xl">
            {user.firstName[0]}{user.lastName[0]}
          </AvatarFallback>
        </Avatar>
        <div className="text-center space-y-1">
          <CardTitle className="text-2xl">
            {user.firstName} {user.lastName}
          </CardTitle>
          <p className="text-muted-foreground">@{user.username}</p>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid gap-2 text-sm">
          <div className="flex justify-between py-2 border-b">
            <span className="text-muted-foreground">Email</span>
            <span className="font-medium">{user.email}</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="text-muted-foreground">Gender</span>
            <span className="capitalize">{user.gender}</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="text-muted-foreground">ID</span>
            <Badge variant="outline">#{user.id}</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
