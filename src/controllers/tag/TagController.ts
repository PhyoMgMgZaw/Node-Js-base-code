import { BaseController } from "../BaseController";
import { TagService } from "../../services/tagService";

class TagControllerClass extends BaseController<typeof TagService, "tagId"> {
    constructor() {
        super({
            service: TagService,
            idParamKey: "tagId", 
            resourceName: "tag", 
            defaultOrderBy: { label: "desc" }, 
            relatedModel: { tagProjectLinks: true }, 
        });
    }
}

export const TagController = new TagControllerClass();