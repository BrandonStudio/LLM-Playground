import { type ChatMessageWithId, ChatMessageType, ChatMessageRole } from "@/lib/shared";
import { v4 as uuidv4 } from "uuid";

export function createEmptyMessage(
  type: ChatMessageType = ChatMessageType.User,
  role?: ChatMessageRole,
  content?: string
): ChatMessageWithId {
  const defaultRole = 
    type === ChatMessageType.System ? ChatMessageRole.System :
    type === ChatMessageType.User ? ChatMessageRole.User :
    type === ChatMessageType.AssistantText ? ChatMessageRole.Assistant :
    ChatMessageRole.User;

  return {
    id: uuidv4(),
    type,
    role: role || defaultRole,
    content: content || "",
  };
}
