import React from "react";
import { Button } from "@/lib/components/ui/button";

interface ToolCallCardProps {
  toolCall: {
    id: string;
    name: string;
    args: Record<string, unknown>;
  };
  onCopy?: () => void;
}

export function ToolCallCard({ toolCall, onCopy }: ToolCallCardProps) {
  return (
    <div className="border rounded p-3 bg-gray-50">
      <div className="flex justify-between items-start mb-2">
        <span className="font-semibold">{toolCall.name}</span>
        {onCopy && (
          <Button size="sm" variant="ghost" onClick={onCopy}>
            Copy
          </Button>
        )}
      </div>
      <pre className="text-xs overflow-auto">
        {JSON.stringify(toolCall.args, null, 2)}
      </pre>
    </div>
  );
}
