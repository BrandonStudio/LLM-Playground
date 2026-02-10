// Chat message types for the playground
import { type ChatMessageWithId } from "@/lib/shared";

export interface MessagesContext {
  messages: ChatMessageWithId[];
  addMessage: (message: ChatMessageWithId) => void;
  updateMessage: (id: string, content: string) => void;
  deleteMessage: (id: string) => void;
  setMessages: (messages: ChatMessageWithId[]) => void;
}
