import { NextFunction, Request } from "express";
import prisma from "../config/db/client";
import { createError } from "../utils/error";
import { ErrorCode } from "../config/contants/erroCode";

export const createDeveloper = async (request: Request, next: NextFunction) => {
  try {
    const developer: any = await prisma.developer.create({
      data: request.body,
    });
    const { password, ...safeDeveloper } = developer;

    return safeDeveloper;
  } catch (err: any) {
    return next(err);
  }
};
