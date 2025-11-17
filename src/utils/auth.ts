// import { ErrorCode } from "@/src/config/contants/erroCode";
import { config } from "../config";
import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { ErrorCode } from "../config/contants/erroCode";

type Payload = { id: string; [key: string]: any };

export  const authUtils = {
  verifyToken: (token: string): JwtPayload | string => {
    return jwt.verify(token, config.env.JWT_SECRET);
  },

  generateToken: (payload: Payload, expiresIn?: string): string => {
    return jwt.sign(payload, config.env.JWT_SECRET as jwt.Secret, {
      expiresIn: "30d",
    });
  },

  generateAccessToken: (payload: Payload): string => {
    return jwt.sign(payload, config.env.JWT_SECRET, { expiresIn: "1d" });
  },

  generateRefreshToken: (payload: Payload): string => {
    return jwt.sign(payload, config.env.JWT_REFRESH_SECRET, {
      expiresIn: "30d",
    });
  },

  hashPassword: async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  },

  comparePassword: async (
    password: string,
    hashedPassword: string
  ): Promise<boolean> => {
    return await bcrypt.compare(password, hashedPassword);
  },

  checkUserIdIfNotExit: (user: any) => {
   
    if (!user) {
      const err: any = new Error("Developer not found with this Id");
      err.status = false;
      err.statusCode = 404;
      err.code = ErrorCode.UNAUTHORIZED;
      throw err;
    }
  },

  checkEmailIfExit: (user: any) => {
    if (user) {
      const err: any = new Error("This email address is already used !");
      err.status = false;
      err.statusCode = 409;
      err.code = ErrorCode.EMAIL_ALREADY_EXISTS;
      throw err;
    }
  },
};
