import prisma from "../config/db/client";
import { BaseService } from "./baseService";
import { CreateKnowledgeDocPayload } from "../schema/knowledgeDocSchema";

class KnowledgeDocServiceClass extends BaseService {
  constructor() {
    super(prisma.knowledgeDoc);
  }
}

export const KnowledgeDocService = new KnowledgeDocServiceClass();
export type CreateKnowledgeDoc = CreateKnowledgeDocPayload;