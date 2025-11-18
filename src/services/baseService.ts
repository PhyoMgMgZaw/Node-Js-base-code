// src/services/baseService.ts
import { Prisma } from "@prisma/client";
import prisma from "../config/db/client";
import { createError } from "../utils/error";
import { ErrorCode } from "../config/contants/erroCode";

// A loose type for any Prisma model delegate
// (project, release, developer, etc.)
type PrismaModelDelegate = {
  create: (args: any) => Promise<any>;
  findMany: (args?: any) => Promise<any[]>;
  findUnique: (args: any) => Promise<any | null>;
  update: (args: any) => Promise<any>;
  delete: (args: any) => Promise<any>;
};

export class BaseService {
  protected model: PrismaModelDelegate;

  constructor(model: PrismaModelDelegate) {
    this.model = model;
  }

  async create<TData>(data: TData) {
    try {
      return await this.model.create({ data });
    } catch (error: any) {
      throw createError(
        error?.message || "Failed to create record.",
        500,
        ErrorCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  async findAll(orderBy?: any) {
    try {
      return await this.model.findMany({ orderBy });
    } catch (error: any) {
      throw createError(
        error?.message || "Failed to fetch records.",
        500,
        ErrorCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  async findById<TIdKey extends string>(where: Record<TIdKey, string>) {
    try {
      return await this.model.findUnique({ where });
    } catch (error: any) {
      throw createError(
        error?.message || "Failed to fetch record by ID.",
        500,
        ErrorCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  async update<TIdKey extends string, TData>(
    where: Record<TIdKey, string>,
    data: TData
  ) {
    try {
      return await this.model.update({ where, data });
    } catch (error: any) {
      if (error.code === "P2025") {
        throw createError(
          "Record not found or already deleted.",
          404,
          ErrorCode.NOT_FOUND
        );
      }
      throw createError(
        error?.message || "Failed to update record.",
        500,
        ErrorCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  async delete<TIdKey extends string>(where: Record<TIdKey, string>) {
    try {
      await this.model.delete({ where });
      return { message: "Record deleted successfully" };
    } catch (error: any) {
      if (error.code === "P2025") {
        throw createError(
          "Record not found or already deleted.",
          404,
          ErrorCode.NOT_FOUND
        );
      }
      throw createError(
        error?.message || "Failed to delete record.",
        500,
        ErrorCode.INTERNAL_SERVER_ERROR
      );
    }
  }
}
