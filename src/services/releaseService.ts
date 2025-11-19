import prisma from "../config/db/client";
import { BaseService } from "./baseService";
import { CreateReleasePayload } from "../schema/releaseSchema";

class ReleaseServiceClass extends BaseService {
  constructor() {
    super(prisma.release);
  }

  findByProjectId = async (projectId: string, options = {}) => {
    return this.model.findMany({
      where: { projectId },
      ...options,
    });
  };
}

export const ReleaseService = new ReleaseServiceClass();
export type ReleaseInput = CreateReleasePayload;
