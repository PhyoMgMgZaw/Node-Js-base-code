import { BaseController } from "../BaseController";
import { ProjectService } from "../../services/projectService";

class ProjectControllerClass extends BaseController<typeof ProjectService, "projectId"> {
  constructor() {
    super({
      service: ProjectService,
      idParamKey: "projectId",
      resourceName: "project",
      defaultOrderBy: { createdAt: "desc" },
      relatedModel: {}, // Add related models if needed
    });
  }

//custom methods go here

}
// Export instance
export const ProjectController = new ProjectControllerClass();
