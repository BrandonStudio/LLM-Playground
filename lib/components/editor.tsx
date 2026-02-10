import React from "react";
import { Textarea } from "@/lib/components/ui/textarea";

interface CodeMirrorEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export function CodeMirrorEditor({
  value,
  onChange,
  placeholder,
  className,
  disabled,
}: CodeMirrorEditorProps) {
  return (
    <Textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={className}
      disabled={disabled}
      rows={10}
    />
  );
}
