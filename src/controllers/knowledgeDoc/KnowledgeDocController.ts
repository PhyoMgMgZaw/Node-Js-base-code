import { BaseController } from "../BaseController";
import { KnowledgeDocService } from '../../services/knowledgeDocService';

class KnowledgeDocControllerCLass extends BaseController<typeof KnowledgeDocService, "docId"> {
  constructor() {
    super({
      service: KnowledgeDocService,
      idParamKey: "docId",
      resourceName: "Knowledge Doc",
      defaultOrderBy: { createdAt: "desc" },
      relatedModel: {
        developer : true
      }, 
    });
  }

//custom methods go here

}
// Export instance
export const KnowledgeDocController = new KnowledgeDocControllerCLass();