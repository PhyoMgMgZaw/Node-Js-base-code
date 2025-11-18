import { NextFunction, Request, Response } from "express";
import { ProjectService } from "../../services/projectService";
import { createError } from "../../utils/error";
import { ErrorCode } from "../../config/contants/erroCode";

export const ProjectController = {
  createProject: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newProject = await ProjectService.createProject(req.body);

      res.status(201).json({
        message: "Project created successfully.",
        status: true,
        statusCode: 201,
        data: newProject,
      });
    } catch (error) {
      return next(error);
    }
  },

  getAllProjects: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const projects = await ProjectService.getAllProjects();
      
      res.status(200).json({
        message: "Projects retrieved successfully.",
        status: true,
        statusCode: 200,
        data: projects,
      });
    } catch (error) {
      return next(error);
    }
  },

  getProjectById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { projectId } = req.params;
      const project = await ProjectService.getProjectById(projectId);

      if (!project) {
        return next(
          createError("Project not found.", 404, ErrorCode.NOT_FOUND)
        );
      }

      res.status(200).json({
        message: "Project retrieved successfully.",
        status: true,
        statusCode: 200,
        data: project,
      });
    } catch (error) {
      return next(error);
    }
  },

  updateProject: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { projectId } = req.params;
      const updatedProject = await ProjectService.updateProject(projectId, req.body);

      res.status(200).json({
        message: "Project updated successfully.",
        status: true,
        statusCode: 200,
        data: updatedProject,
      });
    } catch (error) {
      return next(error);
    }
  },

  deleteProject: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { projectId } = req.params;
      const result = await ProjectService.deleteProject(projectId);

      res.status(200).json({
        message: "Project deleted successfully.",
        status: true,
        statusCode: 200,
        data: result,
      });
    } catch (error) {
      return next(error);
    }
  },
};