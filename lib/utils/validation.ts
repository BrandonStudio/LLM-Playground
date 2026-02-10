import { z } from "zod";

export const LLMSchemaNameSchema = z
  .string()
  .min(1, "Name is required")
  .max(100, "Name must be less than 100 characters")
  .regex(
    /^[a-zA-Z0-9_-]+$/,
    "Name can only contain letters, numbers, hyphens, and underscores"
  );

export const LLMToolNameSchema = z
  .string()
  .min(1, "Name is required")
  .max(100, "Name must be less than 100 characters")
  .regex(
    /^[a-zA-Z0-9_-]+$/,
    "Name can only contain letters, numbers, hyphens, and underscores"
  );
