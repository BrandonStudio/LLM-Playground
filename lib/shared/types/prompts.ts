import { z } from "zod";
import { ChatMessageSchema } from "./llm";

export enum PromptType {
  Chat = "chat",
  Text = "text",
}

export const PromptChatMessageSchema = z.union([
  z.object({
    role: z.string(),
    content: z.string(),
  }),
  z.object({
    type: z.literal("placeholder"),
    name: z
      .string()
      .regex(
        /^[a-zA-Z][a-zA-Z0-9_]*$/,
        "Placeholder name must start with a letter and contain only alphanumeric characters and underscores",
      ),
  }),
]);

export type PromptVariable = { 
  name: string; 
  value: string; 
  isUsed: boolean 
};
