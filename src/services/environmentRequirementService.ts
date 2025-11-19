import prisma from "../config/db/client";
import { BaseService } from "./baseService";
import { CreateEnvironmentRequirementPayload } from "../schema/environmentRequirementSchema";

class EnvironmentRequirementServiceClass extends BaseService {
  constructor() {
    super(prisma.environmentRequirement);
  }
}

export const EnvironmentRequirementService = new EnvironmentRequirementServiceClass();
export type ChangelogItemInput = CreateEnvironmentRequirementPayload;