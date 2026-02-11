// Model parameters types and context
import { type UIModelParams } from "@/lib/shared";

export interface ModelParamsContext {
  modelParams: Partial<UIModelParams>;
  updateModelParams: (params: Partial<UIModelParams>) => void;
}
