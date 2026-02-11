import { ProfilePage } from "@/pages/profile/ui/profile-page";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Profile",
};

export default function Page() {
  return <ProfilePage />;
}
