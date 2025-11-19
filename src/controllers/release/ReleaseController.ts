import { BaseController } from "../BaseController";
import { ReleaseService } from "../../services/releaseService";

class ReleaseControllerClass extends BaseController<typeof ReleaseService, "releaseId"> {
    constructor() {
        super({
            service: ReleaseService,
            idParamKey: "releaseId",
            resourceName: "release",
            defaultOrderBy: { createdAt: "desc" },
            relatedModel: { project: true },
        });
    }

    getByProjectId = async (req: any, res: any, next: any) => {
        console.log(req.params);
        try {
            const { projectId } = req.params;
            const releases = await this.service.findByProjectId(projectId, {
                include: this.relatedModel,
            });
            res.status(200).json({
                message: `Releases for project ${projectId} retrieved successfully.`,
                status: true,
                statusCode: 200,
                data: releases,
            });
        } catch (error) {
            next(error);
        }
    };

}
// Export instance
export const ReleaseController = new ReleaseControllerClass();

