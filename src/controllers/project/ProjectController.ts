// src/controllers/project/ProjectController.ts
import { BaseController } from "../BaseController";
import { ProjectService } from "../../services/projectService";
import { createProjectSchema } from "../../schema/projectSchema";

export const ProjectController = new BaseController({
  service: ProjectService,
  idParamKey: "projectId",
  resourceName: "Project",
  defaultOrderBy: { createdAt: "desc" },
  relatedModel: {},
  schema: createProjectSchema,
});
