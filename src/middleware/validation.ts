 
import { NextFunction, Request, Response } from "express";
import { ZodError, ZodIssue, ZodSchema } from "zod";
import { createError } from "../utils/error";
import { ErrorCode } from "../config/contants/erroCode";

export const validation = {
  validateBody: (schema: ZodSchema<any>) => {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        req.body = schema.parse(req.body || {});
        next();
      } catch (error: unknown) {
        if (error instanceof ZodError) {
          const erorrs = error.issues.map((iss: ZodIssue) => ({
            path: iss.path.join("."),
            message: iss.message,
          }));

          return next(
            createError("Validation Failed", 500, ErrorCode.BAD_REQUEST, erorrs)
          );
        }
        return next(
          createError("Validation Failed", 500, ErrorCode.BAD_REQUEST)
        );
      }
    };
  },
};
