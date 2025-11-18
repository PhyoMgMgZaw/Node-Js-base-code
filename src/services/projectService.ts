// src/services/projectService.ts
import prisma from "../config/db/client";
import { BaseService } from "./baseService";
import { CreateProjectPayload } from "../schema/projectSchema";

class ProjectServiceClass extends BaseService {
  constructor() {
    super(prisma.project);
  }

  // custom project methods can go here
}

export const ProjectService = new ProjectServiceClass();
export type ProjectInput = CreateProjectPayload;
