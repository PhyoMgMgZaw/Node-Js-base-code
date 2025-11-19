// src/controllers/BaseController.ts
import { Request, Response, NextFunction } from "express";
import { BaseService } from "../services/baseService";
import { createError } from "../utils/error";
import { ErrorCode } from "../config/contants/erroCode";
import { MediaService, MediaInput } from "../services/mediaService";

interface MediaOptions {
  enabled: boolean;
  fieldName: string;
  relatedType: string;
}

interface ControllerOptions<S extends BaseService, IdParamKey extends string> {
  service: S;
  idParamKey: IdParamKey;
  resourceName: string;
  defaultOrderBy?: any;
  relatedModel?: any;
  mediaOptions?: MediaOptions;
}

export class BaseController<S extends BaseService, IdParamKey extends string> {
  protected service: S;
  protected idParamKey: IdParamKey;
  protected resourceName: string;
  protected defaultOrderBy?: any;
  protected relatedModel?: any;
  protected mediaOptions?: MediaOptions;

  constructor(options: ControllerOptions<S, IdParamKey>) {
    this.service = options.service;
    this.idParamKey = options.idParamKey;
    this.resourceName = options.resourceName;
    this.defaultOrderBy = options.defaultOrderBy;
    this.relatedModel = options.relatedModel;
    this.mediaOptions = options.mediaOptions;
  }

  // Extract & strip media from req.body
  private extractMedia(body: any): { cleanedBody: any; mediaItems: MediaInput[] } {
    if (!this.mediaOptions?.enabled) return { cleanedBody: body, mediaItems: [] };

    const field = this.mediaOptions.fieldName;
    const mediaItemsRaw = Array.isArray(body[field]) ? body[field] : [];

    const mediaItems: MediaInput[] = mediaItemsRaw.map((m: any) => ({
      url: m.url,
      type: m.type,
    }));

    const { [field]: _, ...rest } = body;

    return { cleanedBody: rest, mediaItems };
  }

  // CREATE
  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { cleanedBody, mediaItems } = this.extractMedia(req.body);

      const record = await this.service.create(cleanedBody, {
        include: this.relatedModel,
      });

      let finalMedia: any[] = [];

      if (this.mediaOptions?.enabled && mediaItems.length > 0) {
        const ownerId = (record as any)[this.idParamKey];
        await MediaService.attachMany(
          this.mediaOptions.relatedType,
          ownerId,
          mediaItems
        );

        finalMedia = await MediaService.getFor(
          this.mediaOptions.relatedType,
          ownerId
        );
      }

      const mediaFieldName = this.mediaOptions?.fieldName || "media";

      res.status(201).json({
        message: `${this.resourceName} created successfully.`,
        status: true,
        statusCode: 201,
        data:
          this.mediaOptions?.enabled
            ? {
              ...(record as any),
              [mediaFieldName]: finalMedia,
            }
            : record,
      });
    } catch (error) {
      next(error);
    }
  };

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const records = await this.service.findAll(this.defaultOrderBy, {
        include: this.relatedModel,
      });

      if (!this.mediaOptions?.enabled) {
        return res.status(200).json({
          message: `${this.resourceName}s retrieved successfully.`,
          status: true,
          statusCode: 200,
          data: records,
        });
      }

      const mediaFieldName = this.mediaOptions.fieldName || "media";

      const withMedia = await Promise.all(
        records.map(async (r: any) => {
          const ownerId = r[this.idParamKey];
          const media = await MediaService.getFor(
            this.mediaOptions!.relatedType,
            ownerId
          );
          return {
            ...r,
            [mediaFieldName]: media,
          };
        })
      );

      res.status(200).json({
        message: `${this.resourceName}s retrieved successfully.`,
        status: true,
        statusCode: 200,
        data: withMedia,
      });
    } catch (error) {
      next(error);
    }
  };

  // GET BY ID (+ optional media)
  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params[this.idParamKey];
      const record = await this.service.findById(
        { [this.idParamKey]: id } as any,
        { include: this.relatedModel }
      );

      if (!record) {
        return next(
          createError(
            `${this.resourceName} not found.`,
            404,
            ErrorCode.NOT_FOUND
          )
        );
      }

      let media: any[] = [];
      if (this.mediaOptions?.enabled) {
        media = await MediaService.getFor(this.mediaOptions.relatedType, id);
      }

      res.status(200).json({
        message: `${this.resourceName} retrieved successfully.`,
        status: true,
        statusCode: 200,
        data: {
          ...(record as any),
          ...(this.mediaOptions?.enabled ? { media } : {}),
        },
      });
    } catch (error) {
      next(error);
    }
  };

  // UPDATE (+ replace media if provided)
  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params[this.idParamKey];
      const { cleanedBody, mediaItems } = this.extractMedia(req.body);

      const updated = await this.service.update(
        { [this.idParamKey]: id } as any,
        cleanedBody,
        { include: this.relatedModel }
      );

      let finalMedia: any[] = [];
      const mediaFieldName = this.mediaOptions?.fieldName || "media";

      if (this.mediaOptions?.enabled) {
        if (mediaItems.length > 0) {
          // replace old media with new ones
          await MediaService.replaceMany(
            this.mediaOptions.relatedType,
            id,
            mediaItems
          );
        }

        finalMedia = await MediaService.getFor(
          this.mediaOptions.relatedType,
          id
        );
      }

      res.status(200).json({
        message: `${this.resourceName} updated successfully.`,
        status: true,
        statusCode: 200,
        data: this.mediaOptions?.enabled
          ? {
            ...(updated as any),
            [mediaFieldName]: finalMedia,
          }
          : updated,
      });
    } catch (error) {
      next(error);
    }
  };


  // DELETE (+ delete media)
  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params[this.idParamKey];

      let mediaBeforeDelete: any[] = [];
      const mediaFieldName = this.mediaOptions?.fieldName || "media";

      if (this.mediaOptions?.enabled) {
        mediaBeforeDelete = await MediaService.getFor(
          this.mediaOptions.relatedType,
          id
        );
      }

      const deleted = await this.service.delete(
        { [this.idParamKey]: id } as any,
        { include: this.relatedModel }
      );

      if (this.mediaOptions?.enabled) {
        await MediaService.deleteFor(this.mediaOptions.relatedType, id);
      }

      res.status(200).json({
        message: `${this.resourceName} deleted successfully.`,
        status: true,
        statusCode: 200,
        data: this.mediaOptions?.enabled
          ? {
            ...(deleted as any),
            [mediaFieldName]: mediaBeforeDelete,
          }
          : deleted,
      });
    } catch (error) {
      next(error);
    }
  };

}
