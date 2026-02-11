import { useEffect, useMemo, useCallback, useState } from "react";

import useProjectIdFromURL from "@/lib/hooks/useProjectIdFromURL";
import { api } from "@/lib/utils/api";
import useLocalStorage from "@/lib/hooks/useLocalStorage";
import {
  LLMAdapter,
  supportedModels,
  type UIModelParams,
} from "@/lib/shared";
import { type ModelParamsContext } from "@/lib/components/ModelParameters/types";
import { getModelNameKey, getModelProviderKey } from "../storage/keys";

/**
 * Hook for managing model parameters with window isolation support
 * Supports both single-window and multi-window scenarios through window-specific localStorage keys
 *
 * @param windowId - Optional window identifier for state isolation. Defaults to "default" for backward compatibility
 * @returns Object with model parameters state and management functions
 */
export const useModelParams = (windowId?: string) => {
  const [modelParams, setModelParams] = useState<UIModelParams>({
    ...getDefaultAdapterParams(LLMAdapter.OpenAI),
    provider: { value: "", enabled: true },
    model: { value: "", enabled: true },
  });

  // Set initial model params
  const projectId = useProjectIdFromURL();
  const availableLLMApiKeys = api.llmApiKey.all.useQuery(
    {
      projectId: projectId as string,
    },
    { enabled: Boolean(projectId) },
  );

  // Generate window-specific localStorage keys
  const modelNameKey = getModelNameKey(windowId ?? "");
  const modelProviderKey = getModelProviderKey(windowId ?? "");

  const [persistedModelName, setPersistedModelName] = useLocalStorage<
    string | null
  >(modelNameKey, null);

  const [persistedModelProvider, setPersistedModelProvider] = useLocalStorage<
    string | null
  >(modelProviderKey, null);

  const availableProviders = useMemo(() => {
    const adapter = availableLLMApiKeys.data?.data ?? [];

    return adapter.map((key) => key.provider) ?? [];
  }, [availableLLMApiKeys.data?.data]);

  const selectedProviderApiKey = availableLLMApiKeys.data?.data.find(
    (key) => key.provider === modelParams.provider.value,
  );

  const providerModelCombinations =
    availableLLMApiKeys.data?.data.reduce((acc, v: any) => {
      if (v.withDefaultModels) {
        acc.push(
          ...supportedModels[v.adapter as LLMAdapter].map((m) => `${v.provider}: ${m}`),
        );
      }
      acc.push(...v.customModels.map((m: string) => `${v.provider}: ${m}`));

      return acc;
    }, [] as string[]) ?? [];

  const availableModels = useMemo(
    () =>
      !selectedProviderApiKey
        ? []
        : selectedProviderApiKey.withDefaultModels
          ? [
              ...selectedProviderApiKey.customModels,
              ...supportedModels[selectedProviderApiKey.adapter as LLMAdapter],
            ]
          : selectedProviderApiKey.customModels,
    [selectedProviderApiKey],
  );

  const updateModelParamValue = useCallback(
    (key: string, value: any) => {
      setModelParams((prev) => ({
        ...prev,
        [key]: { ...(prev as any)[key], value },
      }));

      if (value && key === "model") {
        setPersistedModelName(String(value));
      }
      if (value && key === "provider") {
        setPersistedModelProvider(String(value));
      }
    },
    [setPersistedModelName, setPersistedModelProvider, setModelParams],
  );

  const setModelParamEnabled = (
    key: string,
    enabled: boolean,
  ) => {
    setModelParams((prev: any) => ({
      ...prev,
      [key]: { ...prev[key], enabled },
    }));
  };

  // Set default provider and model
  useEffect(() => {
    if (
      availableProviders.length > 0 &&
      (!modelParams.provider.value ||
        !availableProviders.includes(modelParams.provider.value))
    ) {
      // fall back to a valid provider whenever the cached value is missing or no longer available (e.g. after switching projects)
      if (
        persistedModelProvider &&
        availableProviders.includes(persistedModelProvider)
      ) {
        updateModelParamValue("provider", persistedModelProvider);
      } else {
        updateModelParamValue("provider", availableProviders[0]);
      }
    }
  }, [
    availableProviders,
    modelParams.provider.value,
    updateModelParamValue,
    persistedModelProvider,
  ]);

  useEffect(() => {
    if (
      (availableModels.length > 0 && !modelParams.model.value) ||
      !availableModels.includes(modelParams.model.value)
    ) {
      if (persistedModelName && availableModels.includes(persistedModelName)) {
        updateModelParamValue("model", persistedModelName);
      } else {
        updateModelParamValue("model", availableModels[0]);
      }
    }
  }, [
    availableModels,
    modelParams.model.value,
    updateModelParamValue,
    persistedModelName,
  ]);

  // Update adapter, max temperature, temperature, max_tokens, top_p when provider changes
  useEffect(() => {
    if (selectedProviderApiKey?.adapter) {
      setModelParams((prev) => ({
        ...prev,
        adapter: {
          value: selectedProviderApiKey.adapter,
          enabled: true,
        },
        maxTemperature: {
          value: getDefaultAdapterParams(selectedProviderApiKey.adapter)
            .maxTemperature.value,
          enabled: getDefaultAdapterParams(selectedProviderApiKey.adapter)
            .maxTemperature.enabled,
        },
        temperature: {
          value: Math.min(
            prev.temperature.value,
            getDefaultAdapterParams(selectedProviderApiKey.adapter)
              .maxTemperature.value,
          ),
          enabled: getDefaultAdapterParams(selectedProviderApiKey.adapter)
            .temperature.enabled,
        },
        max_tokens: {
          value: getDefaultAdapterParams(selectedProviderApiKey.adapter)
            .max_tokens.value,
          enabled: getDefaultAdapterParams(selectedProviderApiKey.adapter)
            .max_tokens.enabled,
        },
        top_p: {
          value: getDefaultAdapterParams(selectedProviderApiKey.adapter).top_p
            .value,
          enabled: getDefaultAdapterParams(selectedProviderApiKey.adapter).top_p
            .enabled,
        },
      }));
    }
  }, [selectedProviderApiKey?.adapter]);

  return {
    modelParams,
    setModelParams,
    availableProviders,
    availableModels,
    updateModelParamValue,
    setModelParamEnabled,
    providerModelCombinations,
  };
};

function getDefaultAdapterParams(
  adapter: LLMAdapter,
): Omit<UIModelParams, "provider" | "model"> {
  switch (adapter) {
    // Docs: https://platform.openai.com/docs/api-reference/chat/create
    case LLMAdapter.OpenAI:
      return {
        adapter: {
          value: adapter,
          enabled: true,
        },
        temperature: { value: 0, enabled: false },
        maxTemperature: { value: 2, enabled: false },
        max_tokens: { value: 4096, enabled: false },
        top_p: { value: 1, enabled: false },
        maxReasoningTokens: { value: 0, enabled: false },
        providerOptions: { value: {}, enabled: false },
      };

    case LLMAdapter.Azure:
      return {
        adapter: {
          value: adapter,
          enabled: true,
        },
        temperature: { value: 0, enabled: false },
        maxTemperature: { value: 2, enabled: false },
        max_tokens: { value: 4096, enabled: false },
        top_p: { value: 1, enabled: false },
        maxReasoningTokens: { value: 0, enabled: false },
        providerOptions: { value: {}, enabled: false },
      };

    // Docs: https://docs.anthropic.com/claude/reference/messages_post
    case LLMAdapter.Anthropic:
      return {
        adapter: {
          value: adapter,
          enabled: true,
        },
        temperature: { value: 0, enabled: false },
        maxTemperature: { value: 1, enabled: false },
        max_tokens: { value: 4096, enabled: false },
        top_p: { value: 1, enabled: false },
        maxReasoningTokens: { value: 0, enabled: false },
        providerOptions: { value: {}, enabled: false },
      };

    case LLMAdapter.Bedrock:
      return {
        adapter: {
          value: adapter,
          enabled: true,
        },
        temperature: { value: 0, enabled: false },
        maxTemperature: { value: 1, enabled: false },
        max_tokens: { value: 4096, enabled: false },
        top_p: { value: 1, enabled: false },
        maxReasoningTokens: { value: 0, enabled: false },
        providerOptions: { value: {}, enabled: false },
      };

    case LLMAdapter.VertexAI:
      return {
        adapter: {
          value: adapter,
          enabled: true,
        },
        temperature: { value: 1, enabled: false },
        maxTemperature: { value: 2, enabled: false },
        max_tokens: { value: 4096, enabled: false },
        top_p: { value: 1, enabled: false },
        maxReasoningTokens: { value: 0, enabled: false },
        providerOptions: { value: {}, enabled: false },
      };

    case LLMAdapter.GoogleAIStudio:
      return {
        adapter: {
          value: adapter,
          enabled: true,
        },
        temperature: { value: 1, enabled: false },
        maxTemperature: { value: 2, enabled: false },
        max_tokens: { value: 4096, enabled: false },
        top_p: { value: 1, enabled: false },
        maxReasoningTokens: { value: 0, enabled: false },
        providerOptions: { value: {}, enabled: false },
      };
  }
}
