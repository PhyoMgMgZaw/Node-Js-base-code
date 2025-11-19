import { BaseController } from "../BaseController";
import { EcosystemReleaseService } from "../../services/ecosystemReleaseService";

class EcosystemReleaseControllerClass extends BaseController<typeof EcosystemReleaseService, "ecosystemId"> {
    constructor() {
        super({
            service: EcosystemReleaseService,
            idParamKey: "ecosystemId", 
            resourceName: "ecosystem release", 
            defaultOrderBy: { releaseDate: "desc" }, 
            relatedModel: { projectLinks: true }, 
        });
    }

}

export const EcosystemReleaseController = new EcosystemReleaseControllerClass();