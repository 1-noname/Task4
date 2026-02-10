import { ProfilePage } from "@/pages/profile/ui/profile-page";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Мой профиль",
};

export default function Page() {
  return <ProfilePage />;
}
