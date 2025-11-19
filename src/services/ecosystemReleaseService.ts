import prisma from "../config/db/client";
import { BaseService } from "./baseService";
import { CreateEcosystemReleasePayload } from "../schema/ecosystemReleaseSchema";

class EcosystemReleaseServiceClass extends BaseService {
  constructor() {
    super(prisma.ecosystemRelease);
  }
  
}

export const EcosystemReleaseService = new EcosystemReleaseServiceClass();
export type EcosystemReleaseInput = CreateEcosystemReleasePayload;