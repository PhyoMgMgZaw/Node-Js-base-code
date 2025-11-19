import express from "express";
import { validation } from "../../../middleware/validation";
import { authMiddleware } from "../../../middleware/authMiddleware"; 
import { createReleaseSchema, updateReleaseSchema } from "../../../schema/releaseSchema"; 
import { ReleaseController } from "../../../controllers/release/ReleaseController"
const router = express.Router();
router.use(authMiddleware);
router.post(
  "/",
  validation.validateBody(createReleaseSchema),
  ReleaseController.create
);

router.get("/", ReleaseController.getAll);

router.get("/:releaseId", ReleaseController.getById);

router.put(
  "/:releaseId",
  validation.validateBody(updateReleaseSchema),
  ReleaseController.update
);

router.get("/project/:projectId", ReleaseController.getByProjectId);

router.delete("/:releaseId", ReleaseController.delete);

export default router;