// Stub for PostHog analytics - disabled in standalone mode
export function usePostHogClientCapture(): {
  capture: (event: string, properties?: Record<string, any>) => void;
} {
  return {
    capture: (event: string, properties?: Record<string, any>) => {
      // No-op in standalone mode
      // Only log in development
      if (process.env.NODE_ENV === "development") {
        console.debug("Analytics event:", event, properties);
      }
    },
  };
}
