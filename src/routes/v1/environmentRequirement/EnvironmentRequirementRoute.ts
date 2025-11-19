import { createEnvironmentRequirementSchema, updateEnvironmentRequirementSchema } from './../../../schema/environmentRequirementSchema';
import express from "express";
import { validation } from "../../../middleware/validation";
import { authMiddleware } from "../../../middleware/authMiddleware"; 
import { EnvironmentRequirementController } from "../../../controllers/environmentRequirement/EnvironmentRequirementController";

const router = express.Router();

router.use(authMiddleware);

router.post(
  "/",
  validation.validateBody(createEnvironmentRequirementSchema),
  EnvironmentRequirementController.create
);

router.get("/", EnvironmentRequirementController.getAll);

router.get("/:envId", EnvironmentRequirementController.getById);

router.put(
  "/:envId",
  validation.validateBody(updateEnvironmentRequirementSchema),
  EnvironmentRequirementController.update
);

router.delete("/:envId", EnvironmentRequirementController.delete);

export default router;
