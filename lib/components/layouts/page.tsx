import React from "react";

interface PageProps {
  children: React.ReactNode;
}

export default function Page({ children }: PageProps) {
  return <div className="container mx-auto p-4">{children}</div>;
}
