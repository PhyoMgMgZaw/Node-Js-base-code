import { NextFunction, Request, Response } from "express";
import { getUserByEmail, getUserById } from "../../services/baseService";
import { authUtils } from "../../utils/auth";
import { createError } from "../../utils/error";
import { ErrorCode } from "../../config/contants/erroCode";
import { createDeveloper } from "../../services/authService";
import { generateDevId } from "../../utils/helper";

export const AuthController = {
  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { devId, password } = req.body;
      const user: any = await getUserById(devId);

      authUtils.checkUserIdIfNotExit(user);
      const isSamePassword = await authUtils.comparePassword(
        password,
        user!.password
      );

      if (!isSamePassword) {
        return next(
          createError(
            "Password is not matched",
            401,
            ErrorCode.INVALID_CREDENTIALS
          )
        );
      }
      const payload = {
        id: user?.devId,
      };
      const refreshToken = authUtils.generateRefreshToken(payload);
      const accessToken = authUtils.generateToken(payload);
      res.status(200).json({
        messsage: "Successfully Logged In.",
        status: true,
        statusCode: 200,
        devId: user?.devId,
        token: {
          refreshToken,
          accessToken,
        },
      });
    } catch (error) {
      return next(error);
    }
  },

  register: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const user = await getUserByEmail(email);

      authUtils.checkEmailIfExit(user);
      const devId = generateDevId();
      req.body.devId = devId;
      req.body.password = await authUtils.hashPassword(password);

      const newDeveloper = await createDeveloper(req, next);

      if (!newDeveloper) {
        return next(
          createError(
            "Fail to create Developer",
            500,
            ErrorCode.INTERNAL_SERVER_ERROR
          )
        );
      }
      const payload = {
        id: newDeveloper?.devId,
      };
      const refreshToken = authUtils.generateRefreshToken(payload);
      const accessToken = authUtils.generateToken(payload);
   
      res.status(201).json({
        messsage: "Successfully Signed Up.",
        status: true,
        statusCode: 201,
        devId: newDeveloper?.devId,
        token: {
          refreshToken,
          accessToken,
        },
      });
    } catch (error: any) {
      return next(error);
    }
  },
};
