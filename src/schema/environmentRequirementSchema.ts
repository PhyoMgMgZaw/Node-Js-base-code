import { z } from "zod";

// Create EnvironmentRequirement Schema
export const createEnvironmentRequirementSchema = z.object({
  name: z.string({
    error: "Environment Requirement name is required",
  }).min(1, "Environment Requirement name is required"),

  notes: z.string({
    error: "Notes are required",
  }).min(1, "Notes are required"),
});

// Update EnvironmentRequirement Schema
export const updateEnvironmentRequirementSchema = z.object({
  name: z.string().min(1, "Environment Requirement name is required").optional(),
  notes: z.string().optional(),
}).refine(data =>
  data.name !== undefined || data.notes !== undefined,
{
  message: "At least one field must be provided for update",
});

// TypeScript type for create payload
export type CreateEnvironmentRequirementPayload = z.infer<typeof createEnvironmentRequirementSchema>;
export type UpdateEnvironmentRequirementPayload = z.infer<typeof updateEnvironmentRequirementSchema>;
