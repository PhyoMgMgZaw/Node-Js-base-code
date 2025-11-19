import { BaseController } from "../BaseController";
import { ChangelogItemService } from "../../services/changeLogItemService";

class ChangelogItemControllerClass extends BaseController<typeof ChangelogItemService, "changeId"> {
    constructor() {
        super({
            service: ChangelogItemService,
            idParamKey: "changeId",
            resourceName: "Changelog Item",
            defaultOrderBy: { createdAt: "desc" },
            relatedModel: { release: true },
        });
    }

}

export const ChangelogItemController = new ChangelogItemControllerClass();