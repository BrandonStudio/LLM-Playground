import { type UIModelParams } from "@/lib/shared";

export function getFinalModelParams(
  modelParams: Partial<UIModelParams>
): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  
  if (modelParams.temperature?.enabled) {
    result.temperature = modelParams.temperature.value;
  }
  if (modelParams.max_tokens?.enabled) {
    result.max_tokens = modelParams.max_tokens.value;
  }
  if (modelParams.top_p?.enabled) {
    result.top_p = modelParams.top_p.value;
  }
  if (modelParams.maxReasoningTokens?.enabled) {
    result.maxReasoningTokens = modelParams.maxReasoningTokens.value;
  }
  
  return result;
}
