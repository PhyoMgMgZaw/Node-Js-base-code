import { AuthController } from "../../../controllers/auth/AuthController";

import express, { Request, Response, NextFunction } from "express";
import { validation } from "../../../middleware/validation";
import { devSchema, loginSchema } from "../../../schema/authSchema";
const router = express?.Router();
router.post(
  "/login",
  validation.validateBody(loginSchema),
  AuthController.login
);
router.post(
  "/register",
  validation.validateBody(devSchema),
  AuthController.register
);

export default router;
