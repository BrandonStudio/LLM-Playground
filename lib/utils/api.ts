// Stub API utilities for standalone playground
// In standalone mode, we don't use tRPC - everything is local

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
  llmSchema: {
    all: {
      useQuery: () => ({ data: [] }),
    },
    create: {
      useMutation: () => noOpMutation,
    },
    update: {
      useMutation: () => noOpMutation,
    },
    delete: {
      useMutation: () => noOpMutation,
    },
  },
  llmSchemas: {
    all: {
      useQuery: () => ({ data: [] }),
    },
    create: {
      useMutation: () => noOpMutation,
    },
    update: {
      useMutation: () => noOpMutation,
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
      useMutation: () => noOpMutation,
    },
    update: {
      useMutation: () => noOpMutation,
    },
    delete: {
      useMutation: () => noOpMutation,
    },
  },
  llmTools: {
    all: {
      useQuery: () => ({ data: [] }),
    },
    create: {
      useMutation: () => noOpMutation,
    },
    update: {
      useMutation: () => noOpMutation,
    },
    delete: {
      useMutation: () => noOpMutation,
    },
  },
};
