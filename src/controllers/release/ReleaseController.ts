
import { BaseController } from "../BaseController";
import { ReleaseService } from "../../services/releaseService";
import { createReleaseSchema } from "../../schema/releaseSchema";

export const ReleaseController = new BaseController({
  service: ReleaseService,
  idParamKey: "releaseId",
  resourceName: "release",
  defaultOrderBy: { createdAt: "desc" },
  defaultInclude: {
    project: true, // related models can be included here
  },
   schema: createReleaseSchema, 
});
