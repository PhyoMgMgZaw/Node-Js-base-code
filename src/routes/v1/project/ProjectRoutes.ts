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
  ProjectController.createProject
);

router.get("/", ProjectController.getAllProjects);

router.get("/:projectId", ProjectController.getProjectById);

router.put(
  "/:projectId",
  validation.validateBody(updateProjectSchema),
  ProjectController.updateProject
);

router.delete("/:projectId", ProjectController.deleteProject);

export default router;