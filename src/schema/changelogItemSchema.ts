import { z } from "zod";

export const createChangelogItemSchema = z.object({
  releaseId: z.string({
    error: "Release ID is required",
  }).min(1, "Release ID is required"),

  category: z.string({
    error: "Category is required",
  }).min(1, "Category is required"),

  description: z.string({
    error: "Description is required",
  }).min(1, "Description is required"),
});

export const updateChangelogItemSchema = z.object({
  releaseId: z.string().min(1, "Release ID is required").optional(),
  category: z.string().min(1, "Category is required").optional(),
  description: z.string().min(1, "Description is required").optional(),
}).refine(data => 
  data.releaseId !== undefined ||
  data.category !== undefined ||
  data.description !== undefined,
{
  message: "At least one field must be provided for update",
});

export type CreateChangelogItemPayload = z.infer<typeof createChangelogItemSchema>;