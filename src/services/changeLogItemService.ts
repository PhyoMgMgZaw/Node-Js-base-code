import prisma from "../config/db/client";
import { BaseService } from "./baseService";
import { CreateChangelogItemPayload } from "../schema/changelogItemSchema";

class ChangelogItemServiceClass extends BaseService {
  constructor() {
    super(prisma.changelogItem);
  }
}

export const ChangelogItemService = new ChangelogItemServiceClass();
export type ChangelogItemInput = CreateChangelogItemPayload;