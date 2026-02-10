import React from "react";
import { Textarea } from "@/lib/components/ui/textarea";

interface CodeMirrorEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  mode?: string; // For future compatibility with CodeMirror
  minHeight?: number; // For future compatibility with CodeMirror
}

export function CodeMirrorEditor({
  value,
  onChange,
  placeholder,
  className,
  disabled,
  minHeight,
}: CodeMirrorEditorProps) {
  const style = minHeight ? { minHeight: `${minHeight}px` } : undefined;
  
  return (
    <Textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={className}
      disabled={disabled}
      rows={10}
      style={style}
    />
  );
}
