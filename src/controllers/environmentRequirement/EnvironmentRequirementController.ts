import { BaseController } from "../BaseController";
import { EnvironmentRequirementService } from '../../services/environmentRequirementService';

class EnvironmentRequirementControllerCLass extends BaseController<typeof EnvironmentRequirementService, "envId"> {
  constructor() {
    super({
      service: EnvironmentRequirementService,
      idParamKey: "envId",
      resourceName: "Environment Requirement",
      defaultOrderBy: { createdAt: "desc" },
      relatedModel: {}, 
    });
  }

//custom methods go here

}
// Export instance
export const EnvironmentRequirementController = new EnvironmentRequirementControllerCLass();