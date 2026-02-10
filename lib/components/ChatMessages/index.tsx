import React from "react";
import { type ChatMessageWithId } from "@/lib/shared";
import { ScrollArea } from "@/lib/components/ui/scroll-area";

interface ChatMessagesProps {
  messages: ChatMessageWithId[];
  onUpdateMessage?: (id: string, content: string) => void;
  onDeleteMessage?: (id: string) => void;
}

export function ChatMessages({
  messages,
  onUpdateMessage,
  onDeleteMessage,
}: ChatMessagesProps) {
  return (
    <ScrollArea className="h-full">
      <div className="space-y-4 p-4">
        {messages.map((message) => (
          <div key={message.id} className="border rounded p-3">
            <div className="font-semibold mb-1">{message.role}</div>
            <div className="text-sm">{String(message.content)}</div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
