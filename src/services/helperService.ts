// import prisma from "@/src/config/db/client";

import { ErrorCode } from "../config/contants/erroCode";
import prisma from "../config/db/client";
import { createError } from "../utils/error";

// import prisma from "../config/db/client";

export const getUserById = async (devId: string) => {
  try {
    const developer = await prisma.developer.findUnique({
      where: { devId },
    });

    return developer;
  } catch (error: any) {
    throw createError(
      error?.message || "Unknown error occurred while fetching developer.",
      500,
      ErrorCode.INTERNAL_SERVER_ERROR
    );
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    const developer = await prisma.developer.findUnique({
      where: { email },
    });

    return developer;
  } catch (error: any) {
    throw createError(
      error?.message || "Unknown error occurred while fetching developer.",
      500,
      ErrorCode.INTERNAL_SERVER_ERROR
    );
  }
};
