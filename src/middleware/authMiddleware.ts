import { NextFunction, Request, Response } from "express";
import { authUtils } from "../utils/auth";
import { createError } from "../utils/error";
import { ErrorCode } from "../config/contants/erroCode";
import jwt, { JwtPayload } from "jsonwebtoken";

declare module 'express-serve-static-core' {
  interface Request {
    devId?: string;
  }
}
interface AuthenticatedRequest extends Request {
    devId?: string;
}

export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return next(
      createError("Access Denied. No token provided.", 401, ErrorCode.UNAUTHORIZED)
    );
  }

  const token = authHeader.split(" ")[1];

  try {
    const verified = authUtils.verifyToken(token) as JwtPayload;
    req.devId = verified.id; 
    console.log(req.devId);
    
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
        return next(
            createError("Access Token expired.", 401, ErrorCode.TOKEN_EXPIRED)
        );
    }
    return next(
      createError("Invalid Token.", 401, ErrorCode.UNAUTHORIZED)
    );
  }
};