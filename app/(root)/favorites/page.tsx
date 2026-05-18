import { FavoritePage } from "@/pages/favorite";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MovieShop | Favorites",
  description: "Your saved movies",
};

export default function Page() {
  return <FavoritePage />;
}
