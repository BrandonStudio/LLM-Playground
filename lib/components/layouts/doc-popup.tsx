import React from "react";
import { Button } from "@/lib/components/ui/button";
import { ExternalLink } from "lucide-react";

interface DocPopupProps {
  description: string;
  href: string;
}

export default function DocPopup({ description, href }: DocPopupProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => window.open(href, "_blank")}
      className="h-auto p-1"
    >
      <ExternalLink className="h-4 w-4" />
    </Button>
  );
}
