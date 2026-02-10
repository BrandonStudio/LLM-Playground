import { toast } from "sonner";

export function showSuccessToast(message: string) {
  if (typeof window !== "undefined") {
    toast.success(message);
  }
}

export function showErrorToast(message: string, description?: string) {
  if (typeof window !== "undefined" && process.env.NODE_ENV !== "test") {
    toast.error(message, { description });
  }
}
