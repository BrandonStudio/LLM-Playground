// Stub API utilities for standalone playground
// In standalone mode, we don't use tRPC - everything is local

import type { LlmSchema, LlmTool } from '@/lib/shared/types/llm';

const createSchemaStub = (args: any): LlmSchema => ({
  id: `schema_${Date.now()}_${Math.random()}`,
  createdAt: new Date(),
  updatedAt: new Date(),
  projectId: args.projectId || "standalone",
  name: args.name,
  description: args.description,
  schema: args.schema,
});

const createToolStub = (args: any): LlmTool => ({
  id: `tool_${Date.now()}_${Math.random()}`,
  createdAt: new Date(),
  updatedAt: new Date(),
  projectId: args.projectId || "standalone",
  name: args.name,
  description: args.description,
  parameters: args.parameters,
});

const noOpMutation = {
  mutateAsync: async (_args?: any) => {},
  isLoading: false,
  mutate: (_args?: any) => {},
};

export const api = {
  useUtils: () => ({
    llmSchema: { 
      invalidate: async (_args?: any) => {},
      getAll: { invalidate: async (_args?: any) => {} },
    },
    llmSchemas: { 
      invalidate: async (_args?: any) => {},
      getAll: { invalidate: async (_args?: any) => {} },
    },
    llmTool: { 
      invalidate: async (_args?: any) => {},
      getAll: { invalidate: async (_args?: any) => {} },
    },
    llmTools: { 
      invalidate: async (_args?: any) => {},
      getAll: { invalidate: async (_args?: any) => {} },
    },
  }),
  llmApiKey: {
    all: {
      useQuery: (_args?: any, _options?: any) => ({ data: { data: [] } }),
    },
  },
  llmSchema: {
    all: {
      useQuery: () => ({ data: [] }),
    },
    create: {
      useMutation: () => ({
        mutateAsync: async (args: any) => createSchemaStub(args),
        isLoading: false,
        mutate: (_args?: any) => {},
      }),
    },
    update: {
      useMutation: () => ({
        mutateAsync: async (args: any) => createSchemaStub(args),
        isLoading: false,
        mutate: (_args?: any) => {},
      }),
    },
    delete: {
      useMutation: () => noOpMutation,
    },
  },
  llmSchemas: {
    all: {
      useQuery: () => ({ data: [] }),
    },
    getAll: {
      useQuery: (_args?: any, _options?: any) => ({ data: [] }),
    },
    create: {
      useMutation: () => ({
        mutateAsync: async (args: any) => createSchemaStub(args),
        isLoading: false,
        mutate: (_args?: any) => {},
      }),
    },
    update: {
      useMutation: () => ({
        mutateAsync: async (args: any) => createSchemaStub(args),
        isLoading: false,
        mutate: (_args?: any) => {},
      }),
    },
    delete: {
      useMutation: () => noOpMutation,
    },
  },
  llmTool: {
    all: {
      useQuery: () => ({ data: [] }),
    },
    create: {
      useMutation: () => ({
        mutateAsync: async (args: any) => createToolStub(args),
        isLoading: false,
        mutate: (_args?: any) => {},
      }),
    },
    update: {
      useMutation: () => ({
        mutateAsync: async (args: any) => createToolStub(args),
        isLoading: false,
        mutate: (_args?: any) => {},
      }),
    },
    delete: {
      useMutation: () => noOpMutation,
    },
  },
  llmTools: {
    all: {
      useQuery: () => ({ data: [] }),
    },
    getAll: {
      useQuery: (_args?: any, _options?: any) => ({ data: [] }),
    },
    create: {
      useMutation: () => ({
        mutateAsync: async (args: any) => createToolStub(args),
        isLoading: false,
        mutate: (_args?: any) => {},
      }),
    },
    update: {
      useMutation: () => ({
        mutateAsync: async (args: any) => createToolStub(args),
        isLoading: false,
        mutate: (_args?: any) => {},
      }),
    },
    delete: {
      useMutation: () => noOpMutation,
    },
  },
};
