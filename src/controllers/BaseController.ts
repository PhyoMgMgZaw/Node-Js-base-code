// src/controllers/BaseController.ts
import { Request, Response, NextFunction } from "express";
import { BaseService } from "../services/baseService";
import { createError } from "../utils/error";
import { ErrorCode } from "../config/contants/erroCode";
import { ZodSchema } from "zod";

interface ControllerOptions<S extends BaseService, IdParamKey extends string, TData> {
  service: S;
  idParamKey: IdParamKey;
  resourceName: string;
  defaultOrderBy?: any;
  relatedModel?: any;
  schema?: ZodSchema<TData>; // Optional runtime validation
}

export class BaseController<S extends BaseService, IdParamKey extends string, TData = any> {
  protected service: S;
  protected idParamKey: IdParamKey;
  protected resourceName: string;
  protected defaultOrderBy?: any;
  protected relatedModel?: any;
  protected schema?: ZodSchema<TData>;

  constructor(options: ControllerOptions<S, IdParamKey, TData>) {
    this.service = options.service;
    this.idParamKey = options.idParamKey;
    this.resourceName = options.resourceName;
    this.defaultOrderBy = options.defaultOrderBy;
    this.relatedModel = options.relatedModel;
    this.schema = options.schema;
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (this.schema) req.body = this.schema.parse(req.body); // runtime type validation
      const record = await this.service.create(req.body, { include: this.relatedModel });
      res.status(201).json({
        message: `${this.resourceName} created successfully.`,
        status: true,
        statusCode: 201,
        data: record,
      });
    } catch (error) {
      next(error);
    }
  };

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const records = await this.service.findAll(this.defaultOrderBy, { include: this.relatedModel });
      res.status(200).json({
        message: `${this.resourceName}s retrieved successfully.`,
        status: true,
        statusCode: 200,
        data: records,
      });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params[this.idParamKey];
      const record = await this.service.findById({ [this.idParamKey]: id } as any, { include: this.relatedModel });
      if (!record) return next(createError(`${this.resourceName} not found.`, 404, ErrorCode.NOT_FOUND));

      res.status(200).json({
        message: `${this.resourceName} retrieved successfully.`,
        status: true,
        statusCode: 200,
        data: record,
      });
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params[this.idParamKey];
      if (this.schema) req.body = this.schema.parse(req.body); // validate update data
      const updated = await this.service.update({ [this.idParamKey]: id } as any, req.body, { include: this.relatedModel });
      res.status(200).json({
        message: `${this.resourceName} updated successfully.`,
        status: true,
        statusCode: 200,
        data: updated,
      });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params[this.idParamKey];
      const deleted = await this.service.delete({ [this.idParamKey]: id } as any, { include: this.relatedModel });
      res.status(200).json({
        message: `${this.resourceName} deleted successfully.`,
        status: true,
        statusCode: 200,
        data: deleted,
      });
    } catch (error) {
      next(error);
    }
  };
}
