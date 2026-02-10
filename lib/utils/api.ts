// Stub API utilities for standalone playground
// In standalone mode, we don't use tRPC - everything is local

export const api = {
  llmSchema: {
    all: {
      useQuery: () => ({ data: [] }),
    },
    create: {
      useMutation: () => ({
        mutateAsync: async () => {},
        isLoading: false,
      }),
    },
    update: {
      useMutation: () => ({
        mutateAsync: async () => {},
        isLoading: false,
      }),
    },
  },
  llmTool: {
    all: {
      useQuery: () => ({ data: [] }),
    },
    create: {
      useMutation: () => ({
        mutateAsync: async () => {},
        isLoading: false,
      }),
    },
    update: {
      useMutation: () => ({
        mutateAsync: async () => {},
        isLoading: false,
      }),
    },
  },
};
