// Stub for PostHog analytics - disabled in standalone mode
export function usePostHogClientCapture() {
  return {
    capture: (event: string, properties?: Record<string, any>) => {
      // No-op in standalone mode
      console.log("Analytics event:", event, properties);
    },
  };
}
