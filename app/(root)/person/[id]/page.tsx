import { getPersonDetails } from "@/shared/api/movie";
import { PersonDetailsWidget } from "@/widgets/person-details";

import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const person = await getPersonDetails(id);
  return {
    title: person ? `${person.name} | Profile` : "Actor Profile",
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const person = await getPersonDetails(id);

  if (!person) notFound();

  return <PersonDetailsWidget person={person} />;
}
