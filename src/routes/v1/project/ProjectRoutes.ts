import express from "express";
import { validation } from "../../../middleware/validation";
import { authMiddleware } from "../../../middleware/authMiddleware"; 
import { createProjectSchema, updateProjectSchema } from "../../../schema/projectSchema"; 
import { ProjectController } from "../../../controllers/project/ProjectController";

const router = express.Router();

router.use(authMiddleware);

router.post(
  "/",
  validation.validateBody(createProjectSchema),
  ProjectController.create
);

router.get("/", ProjectController.getAll);

router.get("/:projectId", ProjectController.getById);

router.put(
  "/:projectId",
  validation.validateBody(updateProjectSchema),
  ProjectController.update
);

router.delete("/:projectId", ProjectController.delete);

export default router;
