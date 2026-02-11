// Stub API utilities for standalone playground
// In standalone mode, we don't use tRPC - everything is local

import type { LlmSchema, LlmTool } from '@/lib/shared/types/llm';
import type { Prompt } from '@/lib/shared/types/additional';

interface CreateSchemaArgs {
  projectId: string;
  name: string;
  description: string;
  schema: any;
  id?: string; // For updates
}

interface CreateToolArgs {
  projectId: string;
  name: string;
  description: string;
  parameters: any;
  id?: string; // For updates
}

const createSchemaStub = (args: CreateSchemaArgs): LlmSchema => ({
  id: `schema_${Date.now()}_${Math.random()}`,
  createdAt: new Date(),
  updatedAt: new Date(),
  projectId: args.projectId || "standalone",
  name: args.name,
  description: args.description,
  schema: args.schema,
});

const createToolStub = (args: CreateToolArgs): LlmTool => ({
  id: `tool_${Date.now()}_${Math.random()}`,
  createdAt: new Date(),
  updatedAt: new Date(),
  projectId: args.projectId || "standalone",
  name: args.name,
  description: args.description,
  parameters: args.parameters,
});

const noOpMutation = {
  mutateAsync: async (_args?: unknown) => {},
  isLoading: false,
  mutate: (_args?: unknown) => {},
};

interface QueryOptions {
  enabled?: boolean;
  staleTime?: number;
}

export const api = {
  useUtils: () => ({
    llmSchema: { 
      invalidate: async (_args?: unknown) => {},
      getAll: { invalidate: async (_args?: unknown) => {} },
    },
    llmSchemas: { 
      invalidate: async (_args?: unknown) => {},
      getAll: { invalidate: async (_args?: unknown) => {} },
    },
    llmTool: { 
      invalidate: async (_args?: unknown) => {},
      getAll: { invalidate: async (_args?: unknown) => {} },
    },
    llmTools: { 
      invalidate: async (_args?: unknown) => {},
      getAll: { invalidate: async (_args?: unknown) => {} },
    },
  }),
  llmApiKey: {
    all: {
      useQuery: (_args?: unknown, _options?: QueryOptions) => ({ data: { data: [] as any[] } }),
    },
  },
  llmSchema: {
    all: {
      useQuery: () => ({ data: [] as LlmSchema[] }),
    },
    create: {
      useMutation: () => ({
        mutateAsync: async (args: CreateSchemaArgs) => createSchemaStub(args),
        isLoading: false,
        mutate: (_args?: CreateSchemaArgs) => {},
      }),
    },
    update: {
      useMutation: () => ({
        mutateAsync: async (args: CreateSchemaArgs) => createSchemaStub(args),
        isLoading: false,
        mutate: (_args?: CreateSchemaArgs) => {},
      }),
    },
    delete: {
      useMutation: () => noOpMutation,
    },
  },
  llmSchemas: {
    all: {
      useQuery: () => ({ data: [] as LlmSchema[] }),
    },
    getAll: {
      useQuery: (_args?: unknown, _options?: QueryOptions) => ({ data: [] as LlmSchema[] }),
    },
    create: {
      useMutation: () => ({
        mutateAsync: async (args: CreateSchemaArgs) => createSchemaStub(args),
        isLoading: false,
        mutate: (_args?: CreateSchemaArgs) => {},
      }),
    },
    update: {
      useMutation: () => ({
        mutateAsync: async (args: CreateSchemaArgs) => createSchemaStub(args),
        isLoading: false,
        mutate: (_args?: CreateSchemaArgs) => {},
      }),
    },
    delete: {
      useMutation: () => noOpMutation,
    },
  },
  llmTool: {
    all: {
      useQuery: () => ({ data: [] as LlmTool[] }),
    },
    create: {
      useMutation: () => ({
        mutateAsync: async (args: CreateToolArgs) => createToolStub(args),
        isLoading: false,
        mutate: (_args?: CreateToolArgs) => {},
      }),
    },
    update: {
      useMutation: () => ({
        mutateAsync: async (args: CreateToolArgs) => createToolStub(args),
        isLoading: false,
        mutate: (_args?: CreateToolArgs) => {},
      }),
    },
    delete: {
      useMutation: () => noOpMutation,
    },
  },
  llmTools: {
    all: {
      useQuery: () => ({ data: [] as LlmTool[] }),
    },
    getAll: {
      useQuery: (_args?: unknown, _options?: QueryOptions) => ({ data: [] as LlmTool[] }),
    },
    create: {
      useMutation: () => ({
        mutateAsync: async (args: CreateToolArgs) => createToolStub(args),
        isLoading: false,
        mutate: (_args?: CreateToolArgs) => {},
      }),
    },
    update: {
      useMutation: () => ({
        mutateAsync: async (args: CreateToolArgs) => createToolStub(args),
        isLoading: false,
        mutate: (_args?: CreateToolArgs) => {},
      }),
    },
    delete: {
      useMutation: () => noOpMutation,
    },
  },
  prompts: {
    allNames: {
      useQuery: (_args?: unknown, _options?: QueryOptions) => ({ 
        data: [] as Pick<Prompt, 'id' | 'name'>[] 
      }),
    },
  },
};
