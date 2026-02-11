import { Button } from "@/shared/ui/button";

import { Eye } from "lucide-react";
import Link from "next/link";

interface ViewDetailsProps {
  id: number;
}

export const ViewDetails = ({ id }: ViewDetailsProps) => {
  return (
    <Button
      variant="secondary"
      size="icon"
      asChild
      className="shrink-0"
      title="View Details"
    >
      <Link href={`/product/${id}`}>
        <Eye className="h-4 w-4" />
      </Link>
    </Button>
  );
};
