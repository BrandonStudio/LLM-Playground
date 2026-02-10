// Stub implementations for chatml utilities
// These are simplified versions for standalone use

type NormalizeResult<T> = {
  success: boolean;
  data: T;
};

export function normalizeInput(input: unknown, _ctx?: unknown): NormalizeResult<any[]> {
  // In standalone mode, assume input is already in correct format
  if (Array.isArray(input)) {
    return { success: true, data: input };
  }
  return { success: false, data: [] };
}

export function normalizeOutput(output: unknown, _ctx?: unknown): NormalizeResult<any> {
  // In standalone mode, just pass through
  return { success: true, data: output };
}

export function extractTools(_observation: unknown, _metadata?: unknown): any[] {
  // In standalone mode, return empty array
  return [];
}

export function convertChatMlToPlayground(chatml: unknown): unknown {
  // In standalone mode, just pass through
  return chatml;
}
