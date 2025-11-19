import { z } from "zod";

// Create KnowledgeDoc Schema
export const createKnowledgeDocSchema = z.object({
  title: z.string({
    error: "Title is required",
  }).min(1, "Title is required"),

  content: z.string({
    error: "Content is required",
  }).min(1, "Content is required"),

  category: z.string({
    error: "Category is required",
  }).min(1, "Category is required"),

  visibility: z.string({
    error: "Visibility is required",
  }).min(1, "Visibility is required"),

  developerId: z.string({
    error: "Developer ID is required",
  }).min(1, "Developer ID is required"),
});

// Update KnowledgeDoc Schema
export const updateKnowledgeDocSchema = z.object({
  title: z.string().min(1, "Title is required").optional(),
  content: z.string().min(1, "Content is required").optional(),
  category: z.string().optional(),
  visibility: z.string().optional(),
  developerId: z.string().optional(),
}).refine(data =>
  data.title !== undefined ||
  data.content !== undefined ||
  data.category !== undefined ||
  data.visibility !== undefined ||
  data.developerId !== undefined,
{
  message: "At least one field must be provided for update",
});

// TypeScript type for create payload
export type CreateKnowledgeDocPayload = z.infer<typeof createKnowledgeDocSchema>;
