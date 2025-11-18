
import { BaseController } from "../BaseController";
import { ReleaseService } from "../../services/releaseService";

export const ReleaseController = new BaseController({
  service: ReleaseService,
  idParamKey: "releaseId",
  resourceName: "release",
  defaultOrderBy: { createdAt: "desc" },
});
