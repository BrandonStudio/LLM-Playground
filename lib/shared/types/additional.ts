// Additional types needed by playground components

export type Observation = {
  id: string;
  type: string;
  name?: string;
  input?: unknown;
  output?: unknown;
  metadata?: Record<string, unknown>;
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
