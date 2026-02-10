import { z } from "zod";

// Enums
export enum ChatMessageRole {
  System = "system",
  Developer = "developer",
  User = "user",
  Assistant = "assistant",
  Tool = "tool",
  Model = "model",
}

export enum ChatMessageType {
  System = "system",
  Developer = "developer",
  User = "user",
  AssistantText = "assistant-text",
  AssistantToolCall = "assistant-tool-call",
  ToolResult = "tool-result",
  ModelText = "model-text",
  PublicAPICreated = "public-api-created",
  Placeholder = "placeholder",
}

export enum LLMAdapter {
  Anthropic = "anthropic",
  OpenAI = "openai",
  Azure = "azure",
  Bedrock = "bedrock",
  VertexAI = "google-vertex-ai",
  GoogleAIStudio = "google-ai-studio",
}

// JSON Schema types
export const LLMJSONSchema = z.record(z.string(), z.any());
export type LLMJSONSchema = z.infer<typeof LLMJSONSchema>;

export const JSONSchemaFormSchema = z
  .string()
  .transform((value, ctx) => {
    try {
      const parsed = JSON.parse(value);
      return parsed;
    } catch {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Parameters must be valid JSON",
      });
      return z.NEVER;
    }
  })
  .pipe(
    z
      .object({
        type: z.literal("object"),
        properties: z.record(z.string(), z.any()),
        required: z.array(z.string()).optional(),
        additionalProperties: z.boolean().optional(),
      })
      .passthrough()
      .transform((data) => JSON.stringify(data, null, 2)),
  );

// Tool definitions
export const LLMToolDefinitionSchema = z.object({
  name: z.string(),
  description: z.string(),
  parameters: LLMJSONSchema,
});
export type LLMToolDefinition = z.infer<typeof LLMToolDefinitionSchema>;

export const LLMToolCallSchema = z.object({
  name: z.string(),
  id: z.string(),
  args: z
    .record(z.string(), z.unknown())
    .nullable()
    .transform((val) => val ?? {}),
});
export type LLMToolCall = z.infer<typeof LLMToolCallSchema>;

// Tool call response schema
const AnthropicMessageContentWithToolUse = z.union([
  z.object({
    type: z.literal("text"),
    text: z.string(),
  }),
  z.object({
    type: z.literal("tool_use"),
    id: z.string(),
    name: z.string(),
    input: z.unknown(),
  }),
]);

const GoogleAIStudioMessageContentWithToolUse = z.object({
  functionCall: z.object({
    name: z.string(),
    args: z.unknown(),
  }),
});

export const ToolCallResponseSchema = z.object({
  content: z.union([
    z.string(),
    z.array(AnthropicMessageContentWithToolUse),
    z.array(GoogleAIStudioMessageContentWithToolUse),
  ]),
  tool_calls: z.array(LLMToolCallSchema),
});
export type ToolCallResponse = z.infer<typeof ToolCallResponseSchema>;

// Message schemas
export const SystemMessageSchema = z.object({
  type: z.literal(ChatMessageType.System),
  role: z.literal(ChatMessageRole.System),
  content: z.string(),
});
export type SystemMessage = z.infer<typeof SystemMessageSchema>;

export const DeveloperMessageSchema = z.object({
  type: z.literal(ChatMessageType.Developer),
  role: z.literal(ChatMessageRole.Developer),
  content: z.string(),
});
export type DeveloperMessage = z.infer<typeof DeveloperMessageSchema>;

export const UserMessageSchema = z.object({
  type: z.literal(ChatMessageType.User),
  role: z.literal(ChatMessageRole.User),
  content: z.string(),
});
export type UserMessage = z.infer<typeof UserMessageSchema>;

export const AssistantTextMessageSchema = z.object({
  type: z.literal(ChatMessageType.AssistantText),
  role: z.literal(ChatMessageRole.Assistant),
  content: z.string(),
});
export type AssistantTextMessage = z.infer<typeof AssistantTextMessageSchema>;

export const ModelMessageSchema = z.object({
  type: z.literal(ChatMessageType.ModelText),
  role: z.literal(ChatMessageRole.Model),
  content: z.string(),
});
export type ModelMessage = z.infer<typeof ModelMessageSchema>;

export const AssistantToolCallMessageSchema = z.object({
  type: z.literal(ChatMessageType.AssistantToolCall),
  role: z.literal(ChatMessageRole.Assistant),
  content: z.string(),
  toolCalls: z.array(LLMToolCallSchema),
});
export type AssistantToolCallMessage = z.infer<
  typeof AssistantToolCallMessageSchema
>;

export const ToolResultMessageSchema = z.object({
  type: z.literal(ChatMessageType.ToolResult),
  role: z.literal(ChatMessageRole.Tool),
  content: z.string(),
  toolCallId: z.string(),
});
export type ToolResultMessage = z.infer<typeof ToolResultMessageSchema>;

export const PlaceholderMessageSchema = z.object({
  type: z.literal(ChatMessageType.Placeholder),
  name: z
    .string()
    .regex(
      /^[a-zA-Z][a-zA-Z0-9_]*$/,
      "Placeholder name must start with a letter and contain only alphanumeric characters and underscores",
    ),
});
export type PlaceholderMessage = z.infer<typeof PlaceholderMessageSchema>;

export const ChatMessageDefaultRoleSchema = z.nativeEnum(ChatMessageRole);
export const ChatMessageSchema = z.union([
  SystemMessageSchema,
  DeveloperMessageSchema,
  UserMessageSchema,
  AssistantTextMessageSchema,
  AssistantToolCallMessageSchema,
  ToolResultMessageSchema,
  ModelMessageSchema,
  z
    .object({
      role: z.union([ChatMessageDefaultRoleSchema, z.string()]),
      content: z.union([z.string(), z.array(z.any()), z.any()]),
    })
    .transform((msg) => {
      return {
        ...msg,
        type: ChatMessageType.PublicAPICreated as const,
      };
    }),
]);

export type ChatMessage = z.infer<typeof ChatMessageSchema>;
export type ChatMessageWithId =
  | (ChatMessage & { id: string })
  | (PlaceholderMessage & { id: string });
export type ChatMessageWithIdNoPlaceholders = ChatMessage & { id: string };

// Model configuration
export const JSONObjectSchema = z.record(z.string(), z.any());

export const ZodModelConfig = z.object({
  max_tokens: z.coerce.number().optional(),
  temperature: z.coerce.number().optional(),
  top_p: z.coerce.number().optional(),
  maxReasoningTokens: z.coerce.number().optional(),
  providerOptions: JSONObjectSchema.optional(),
});

export type ModelConfig = z.infer<typeof ZodModelConfig>;

export type ModelParams = {
  provider: string;
  adapter: LLMAdapter;
  model: string;
} & ModelConfig;

type RecordWithEnabledFlag<T> = {
  [K in keyof T]: { value: T[K]; enabled: boolean };
};

export type UIModelParams = RecordWithEnabledFlag<
  Required<ModelParams> & {
    maxTemperature: number;
  }
>;

// Supported models
export const openAIModels = [
  "gpt-4o",
  "gpt-4o-mini",
  "gpt-4-turbo",
  "gpt-4",
  "gpt-3.5-turbo",
  "o1-preview",
  "o1-mini",
] as const;

export const anthropicModels = [
  "claude-3-5-sonnet-20241022",
  "claude-3-5-haiku-20241022",
  "claude-3-opus-20240229",
  "claude-3-sonnet-20240229",
  "claude-3-haiku-20240307",
] as const;

export const vertexAIModels = [
  "gemini-2.0-flash",
  "gemini-1.5-pro",
  "gemini-1.5-flash",
  "gemini-1.0-pro",
] as const;

export const googleAIStudioModels = [
  "gemini-2.0-flash",
  "gemini-1.5-pro",
  "gemini-1.5-flash",
  "gemini-1.5-flash-8b",
] as const;

export type OpenAIModel = (typeof openAIModels)[number];
export type AnthropicModel = (typeof anthropicModels)[number];
export type VertexAIModel = (typeof vertexAIModels)[number];

export const supportedModels = {
  [LLMAdapter.Anthropic]: anthropicModels,
  [LLMAdapter.OpenAI]: openAIModels,
  [LLMAdapter.VertexAI]: vertexAIModels,
  [LLMAdapter.GoogleAIStudio]: googleAIStudioModels,
  [LLMAdapter.Azure]: [],
  [LLMAdapter.Bedrock]: [],
} as const;

// Database types (simplified for localStorage)
export type LlmSchema = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  projectId: string;
  name: string;
  description: string;
  schema: LLMJSONSchema;
};

export type LlmTool = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  projectId: string;
  name: string;
  description: string;
  parameters: LLMJSONSchema;
};
