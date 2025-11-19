import { z } from "zod";

// Create Release Schema
export const createReleaseSchema = z.object({
  projectId: z.string({
    error: "Project ID is required",
  }).min(1, "Project ID is required"),

  versionNumber: z.string({
    error: "Version number is required",
  }).min(1, "Version number is required"),

  releaseType: z.string({
    error: "Release type is required",
  }).min(1, "Release type is required"),

  environmentId: z.string({
    error: "Environment ID is required",
  }).min(1, "Environment ID is required"),

  status: z.string({
    error: "Status is required",
  }).min(1, "Status is required"),

  releaseDate: z.string().optional(), // ISO date string optional
  reviewedBy: z.string().optional(),
  fileChangeLog: z.string().optional(),
});

// Update Release Schema
export const updateReleaseSchema = z.object({
  projectId: z.string().min(1, "Project ID is required").optional(),
  versionNumber: z.string().min(1, "Version number is required").optional(),
  releaseType: z.string().min(1, "Release type is required").optional(),
  environmentId: z.string().min(1, "Environment ID is required").optional(),
  status: z.string().min(1, "Status is required").optional(),
  releaseDate: z.string().optional(),
  reviewedBy: z.string().optional(),
  fileChangeLog: z.string().optional(),
}).refine(data => 
  data.projectId !== undefined ||
  data.versionNumber !== undefined ||
  data.releaseType !== undefined ||
  data.environmentId !== undefined ||
  data.status !== undefined ||
  data.releaseDate !== undefined ||
  data.reviewedBy !== undefined ||
  data.fileChangeLog !== undefined,
{
  message: "At least one field must be provided for update",
});

// TypeScript type for create payload
export type CreateReleasePayload = z.infer<typeof createReleaseSchema>;
