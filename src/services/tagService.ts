import prisma from "../config/db/client";
import { BaseService } from "./baseService";
import { CreateTagPayload } from "../schema/tagSchema";

class TagServiceClass extends BaseService {
  constructor() {
    super(prisma.tag);
  }
}

export const TagService = new TagServiceClass();
export type TagInput = CreateTagPayload;