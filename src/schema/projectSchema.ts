import { z } from "zod";

export const createProjectSchema = z.object({
  name: z
    .string({
      error: "Project Name is required", 
    })
    .min(1, "Project Name is required") 
    .min(3, "Project name must be at least 3 characters long."), 
    
  description: z.string().optional(),
  
  platforms: z.string().optional(), 
});

export const updateProjectSchema = z.object({
  name: z.string().min(3, "Project name must be at least 3 characters long.").optional(),
  description: z.string().optional(),
  platforms: z.string().optional(),
}).refine(data => data.name !== undefined || data.description !== undefined || data.platforms !== undefined, {
    message: "At least one field (name, description, or platforms) must be provided for update.",
});

export type CreateProjectPayload = z.infer<typeof createProjectSchema>;