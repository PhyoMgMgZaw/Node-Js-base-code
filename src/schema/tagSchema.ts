import { z } from "zod";

export const createTagSchema = z.object({
  label: z.string({
    error: "Tag label is required",
  }).min(1, "Tag label must not be empty"),
});

export const updateTagSchema = z.object({
  label: z.string().min(1, "Tag label must not be empty").optional(),
}).refine(data => 
  data.label !== undefined,
{
  message: "At least one field (label) must be provided for update",
});

export type CreateTagPayload = z.infer<typeof createTagSchema>;