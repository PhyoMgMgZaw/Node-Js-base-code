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

  environment: z.string({
    error: "Environment is required",
  }).min(1, "Environment is required"),

  status: z.string({
    error: "Status is required",
  }).min(1, "Status is required"),

  releaseDate: z.string().optional(), // ISO date string optional
  releaseNotesUrl: z.string().url("Invalid URL format").optional(),
  reviewedBy: z.string().optional(),
});

// Update Release Schema
export const updateReleaseSchema = z.object({
  projectId: z.string().min(1, "Project ID is required").optional(),
  versionNumber: z.string().min(1, "Version number is required").optional(),
  releaseType: z.string().min(1, "Release type is required").optional(),
  environment: z.string().min(1, "Environment is required").optional(),
  status: z.string().min(1, "Status is required").optional(),
  releaseDate: z.string().optional(),
  releaseNotesUrl: z.string().url("Invalid URL format").optional(),
  reviewedBy: z.string().optional(),
}).refine(data => 
  data.projectId !== undefined ||
  data.versionNumber !== undefined ||
  data.releaseType !== undefined ||
  data.environment !== undefined ||
  data.status !== undefined ||
  data.releaseDate !== undefined ||
  data.releaseNotesUrl !== undefined ||
  data.reviewedBy !== undefined,
{
  message: "At least one field must be provided for update",
});
console.log("ok");

// TypeScript type for create payload
export type CreateReleasePayload = z.infer<typeof createReleaseSchema>;
