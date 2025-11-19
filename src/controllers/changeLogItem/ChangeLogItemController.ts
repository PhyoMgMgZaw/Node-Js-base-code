import { BaseController } from "../BaseController";
import { ChangelogItemService } from "../../services/changeLogItemService";
import { createChangelogItemSchema } from "../../schema/changelogItemSchema";
import { Request, Response, NextFunction } from "express";

class ChangelogItemControllerClass extends BaseController<typeof ChangelogItemService, "changeId"> {
    constructor() {
        super({
            service: ChangelogItemService,
            idParamKey: "changeId",
            resourceName: "Changelog Item",
            defaultOrderBy: { createdAt: "desc" },
            relatedModel: { release: true },
            schema: createChangelogItemSchema,
        });
    }

}

export const ChangelogItemController = new ChangelogItemControllerClass();