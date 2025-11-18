// src/controllers/base/BaseController.ts
import { Request, Response, NextFunction } from "express";
import { BaseService } from "../services/baseService";
import { ErrorCode } from "../config/contants/erroCode";
import { createError } from "../utils/error";

export class BaseController<
  S extends BaseService,
  IdParamKey extends string
> {
  protected service: S;
  protected idParamKey: IdParamKey;
  protected resourceName: string;
  protected defaultOrderBy?: any;

  constructor(options: {
    service: S;
    idParamKey: IdParamKey;
    resourceName: string;
    defaultOrderBy?: any;
  }) {
    this.service = options.service;
    this.idParamKey = options.idParamKey;
    this.resourceName = options.resourceName;
    this.defaultOrderBy = options.defaultOrderBy;
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newRecord = await this.service.create(req.body);
      res.status(201).json({
        message: `${this.resourceName} created successfully.`,
        status: true,
        statusCode: 201,
        data: newRecord,
      });
    } catch (error) {
      return next(error);
    }
  };

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const records = await this.service.findAll(this.defaultOrderBy);
      res.status(200).json({
        message: `${this.resourceName}s retrieved successfully.`,
        status: true,
        statusCode: 200,
        data: records,
      });
    } catch (error) {
      return next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params[this.idParamKey];
      const record = await this.service.findById({ [this.idParamKey]: id } as any);

      if (!record) {
        return next(
          createError(
            `${this.resourceName} not found.`,
            404,
            ErrorCode.NOT_FOUND
          )
        );
      }

      res.status(200).json({
        message: `${this.resourceName} retrieved successfully.`,
        status: true,
        statusCode: 200,
        data: record,
      });
    } catch (error) {
      return next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params[this.idParamKey];
      const updated = await this.service.update(
        { [this.idParamKey]: id } as any,
        req.body
      );

      res.status(200).json({
        message: `${this.resourceName} updated successfully.`,
        status: true,
        statusCode: 200,
        data: updated,
      });
    } catch (error) {
      return next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params[this.idParamKey];
      const result = await this.service.delete(
        { [this.idParamKey]: id } as any
      );

      res.status(200).json({
        message: `${this.resourceName} deleted successfully.`,
        status: true,
        statusCode: 200,
        data: result,
      });
    } catch (error) {
      return next(error);
    }
  };
}
