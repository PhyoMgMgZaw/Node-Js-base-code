import { Request, Response, NextFunction } from "express";

interface CustomError extends Error {
  status?: boolean;
  code?: string;
  statusCode?: number;
  errors: [];
}

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.status || false;
  const code = err.code || "INTERNAL_SERVER_ERROR";
  const message = err.message || "Something went wrong";
  const statusCode = err.statusCode || 500;
  const errors = err.errors || [];

  const response: any = {
    status,
    code,
    message,
    statusCode,
  };

  if (errors && errors?.length > 0) {
    response.errors = errors;
  }

  res.status(statusCode).json(response);
};
