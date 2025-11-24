// src/services/baseService.ts
import { createError } from "../utils/error";
import { ErrorCode } from "../config/contants/erroCode";

type PrismaModelDelegate = {
  create: (args: any) => Promise<any>;
  findMany: (args?: any) => Promise<any[]>;
  findUnique: (args: any) => Promise<any | null>;
  update: (args: any) => Promise<any>;
  delete: (args: any) => Promise<any>;
  count: (args?: any) => Promise<number>;
};

export class BaseService<TModel = any> {
  protected model: PrismaModelDelegate;

  constructor(model: PrismaModelDelegate) {
    this.model = model;
  }

  async create<TData>(data: TData, options?: { include?: any; select?: any }): Promise<TModel> {
    try {
      return await this.model.create({
        data,
        ...options,
      });
    } catch (error: any) {
      throw createError(error?.message || "Failed to create record.", 500, ErrorCode.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(
  orderBy?: any,
  options?: { include?: any; select?: any; skip?: number; take?: number }
): Promise<TModel[]> {
  try {
    return await this.model.findMany({ orderBy, ...options });
  } catch (error: any) {
    throw createError(
      error?.message || "Failed to fetch records.",
      500,
      ErrorCode.INTERNAL_SERVER_ERROR
    );
  }
}


  async findById<TIdKey extends string>(
    where: Record<TIdKey, string>,
    options?: { include?: any; select?: any }
  ): Promise<TModel | null> {
    try {
      return await this.model.findUnique({ where, ...options });
    } catch (error: any) {
      throw createError(error?.message || "Failed to fetch record by ID.", 500, ErrorCode.INTERNAL_SERVER_ERROR);
    }
  }

  async update<TIdKey extends string, TData>(
    where: Record<TIdKey, string>,
    data: TData,
    options?: { include?: any; select?: any }
  ): Promise<TModel> {
    try {
      return await this.model.update({ where, data, ...options });
    } catch (error: any) {
      if (error.code === "P2025") {
        throw createError("Record not found or already deleted.", 404, ErrorCode.NOT_FOUND);
      }
      throw createError(error?.message || "Failed to update record.", 500, ErrorCode.INTERNAL_SERVER_ERROR);
    }
  }

  async delete<TIdKey extends string>(
    where: Record<TIdKey, string>,
    options?: { include?: any; select?: any }
  ): Promise<TModel> {
    try {
      return await this.model.delete({ where, ...options });
    } catch (error: any) {
      if (error.code === "P2025") {
        throw createError("Record not found or already deleted.", 404, ErrorCode.NOT_FOUND);
      }
      throw createError(error?.message || "Failed to delete record.", 500, ErrorCode.INTERNAL_SERVER_ERROR);
    }
  }

  async count(options?: { where?: any }): Promise<number> {
  try {
    return await this.model.count(options);
  } catch (error: any) {
    throw createError(
      error?.message || "Failed to count records.",
      500,
      ErrorCode.INTERNAL_SERVER_ERROR
    );
  }
}

}
