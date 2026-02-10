import React from "react";
import { Input } from "@/lib/components/ui/input";
import { Label } from "@/lib/components/ui/label";
import { type UIModelParams } from "@/lib/shared";

interface ModelParametersProps {
  modelParams: Partial<UIModelParams>;
  onChange: (params: Partial<UIModelParams>) => void;
}

export function ModelParameters({ modelParams, onChange }: ModelParametersProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label>Temperature</Label>
        <Input
          type="number"
          step="0.1"
          min="0"
          max="2"
          value={modelParams.temperature?.value || 0.7}
          onChange={(e) =>
            onChange({
              ...modelParams,
              temperature: { value: parseFloat(e.target.value), enabled: true },
            })
          }
        />
      </div>
      <div>
        <Label>Max Tokens</Label>
        <Input
          type="number"
          value={modelParams.max_tokens?.value || 2048}
          onChange={(e) =>
            onChange({
              ...modelParams,
              max_tokens: { value: parseInt(e.target.value), enabled: true },
            })
          }
        />
      </div>
    </div>
  );
}
