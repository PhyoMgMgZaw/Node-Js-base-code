import { z } from "zod";

export const createEcosystemReleaseSchema = z.object({
  name: z.string({
    error: "Ecosystem name is required",
  }).min(1, "Ecosystem name must not be empty"),

  description: z.string({
    error: "Ecosystem description is required",
  }).optional(),
  
  releaseDate: z.string({
    error: "Release Date is required",
  }).optional(), 
});

export const updateEcosystemReleaseSchema = z.object({
  name: z.string().min(1, "Ecosystem name must not be empty").optional(),
  description: z.string().optional(),
  releaseDate: z.string().optional(),
}).refine(data => 
  data.name !== undefined ||
  data.description !== undefined ||
  data.releaseDate !== undefined,
{
  message: "At least one field (name, description, or releaseDate) must be provided for update",
});

export type CreateEcosystemReleasePayload = z.infer<typeof createEcosystemReleaseSchema>;