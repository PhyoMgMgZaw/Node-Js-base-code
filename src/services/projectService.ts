import prisma from "../config/db/client";
import { createError } from "../utils/error";
import { ErrorCode } from "../config/contants/erroCode";
import { CreateProjectPayload } from "../schema/projectSchema"; 

type ProjectInput = CreateProjectPayload;

export const ProjectService = {
  createProject: async (data: ProjectInput) => {
    try {
      const newProject = await prisma.project.create({
        data,
      });
      return newProject;
    } catch (error: any) {
      throw createError(
        error?.message || "Failed to create project.",
        500,
        ErrorCode.INTERNAL_SERVER_ERROR
      );
    }
  },

  getAllProjects: async () => {
    try {
      const projects = await prisma.project.findMany({
        orderBy: { createdAt: "desc" },
      });
      return projects;
    } catch (error: any) {
      throw createError(
        error?.message || "Failed to fetch projects.",
        500,
        ErrorCode.INTERNAL_SERVER_ERROR
      );
    }
  },

  getProjectById: async (projectId: string) => {
    try {
      const project = await prisma.project.findUnique({
        where: { projectId },
      });
      return project;
    } catch (error: any) {
      throw createError(
        error?.message || "Failed to fetch project by ID.",
        500,
        ErrorCode.INTERNAL_SERVER_ERROR
      );
    }
  },

  updateProject: async (projectId: string, data: Partial<ProjectInput>) => {
    try {
      const updatedProject = await prisma.project.update({
        where: { projectId },
        data,
      });
      return updatedProject;
    } catch (error: any) {
      // P2025 is Prisma error code for 'Record not found'
      if (error.code === 'P2025') {
          throw createError("Project not found or already deleted.", 404, ErrorCode.NOT_FOUND);
      }
      throw createError(
        error?.message || "Failed to update project.",
        500,
        ErrorCode.INTERNAL_SERVER_ERROR
      );
    }
  },

  // DELETE
  deleteProject: async (projectId: string) => {
    try {
      await prisma.project.delete({
        where: { projectId },
      });
      return { message: `Project ${projectId} deleted successfully` };
    } catch (error: any) {
      if (error.code === 'P2025') {
          throw createError("Project not found or already deleted.", 404, ErrorCode.NOT_FOUND);
      }
      throw createError(
        error?.message || "Failed to delete project.",
        500,
        ErrorCode.INTERNAL_SERVER_ERROR
      );
    }
  },
};