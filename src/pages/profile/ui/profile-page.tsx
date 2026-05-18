import { UserCard } from "@/entities/user/ui/user-card";
import { getCurrentUser } from "@/shared/api/auth";

import { redirect } from "next/navigation";

export const ProfilePage = async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="container py-10">
      <h1 className="mb-8 text-center text-3xl font-bold gradient-text">Personal account</h1>
      <UserCard user={user} />
    </div>
  );
};
