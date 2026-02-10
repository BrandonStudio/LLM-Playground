// Additional types needed by playground components

// Prisma types stub for standalone mode
export namespace Prisma {
  export type JsonValue = string | number | boolean | null | JsonArray | JsonObject;
  export interface JsonArray extends Array<JsonValue> {}
  export interface JsonObject {
    [key: string]: JsonValue;
  }
}

export type Observation = {
  id: string;
  type: string;
  name?: string;
  input?: unknown;
  output?: unknown;
  metadata?: Record<string, unknown>;
  model?: string;
  modelParameters?: unknown;
};

export type Prompt = {
  id: string;
  name: string;
  version: number;
  type: "chat" | "text";
  prompt: unknown;
  config?: Record<string, unknown>;
};

export enum ObservationLevel {
  DEBUG = "DEBUG",
  DEFAULT = "DEFAULT",
  WARNING = "WARNING",
  ERROR = "ERROR",
}

export type ClientSideDomainTypes = {
  observations: Observation[];
  prompts: Prompt[];
};

// Metadata types
import { z } from "zod";

const jsonSchemaNullable = z.union([
  z.string(),
  z.number(),
  z.boolean(),
  z.null(),
  z.array(z.lazy(() => jsonSchemaNullable)),
  z.record(z.string(), z.lazy(() => jsonSchemaNullable)),
]);

export const MetadataDomain = z.record(
  z.string(),
  jsonSchemaNullable.or(z.undefined()),
);

export type MetadataDomain = z.infer<typeof MetadataDomain>;
export type MetadataDomainClient = Record<string, unknown>;
export type WithStringifiedMetadata<T> = T & { metadata: string };
