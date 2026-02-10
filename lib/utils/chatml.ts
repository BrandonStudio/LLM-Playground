// Stub implementations for chatml utilities
// These are simplified versions for standalone use

export function normalizeInput(input: unknown): unknown {
  // In standalone mode, just pass through
  return input;
}

export function normalizeOutput(output: unknown): unknown {
  // In standalone mode, just pass through
  return output;
}

export function extractTools(observation: unknown): unknown[] {
  // In standalone mode, return empty array
  return [];
}

export function convertChatMlToPlayground(chatml: unknown): unknown {
  // In standalone mode, just pass through
  return chatml;
}
