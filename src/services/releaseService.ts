
import prisma from "../config/db/client";
import { BaseService } from "./baseService";
import { CreateReleasePayload } from "../schema/releaseSchema";

class ReleaseServiceClass extends BaseService {
  constructor() {
    super(prisma.release);
  }

  // custom Release methods can go here
}

export const ReleaseService = new ReleaseServiceClass();
export type ReleaseInput = CreateReleasePayload;
