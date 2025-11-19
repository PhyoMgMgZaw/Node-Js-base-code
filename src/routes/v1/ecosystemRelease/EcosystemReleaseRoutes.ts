import express from "express";
import { validation } from "../../../middleware/validation";
import { authMiddleware } from "../../../middleware/authMiddleware"; 
import { createEcosystemReleaseSchema, updateEcosystemReleaseSchema } from "../../../schema/ecosystemReleaseSchema"; 
import { EcosystemReleaseController } from "../../../controllers/ecosystemRelease/EcosystemReleaseController"

const router = express.Router();

router.use(authMiddleware);

router.post(
  "/",
  validation.validateBody(createEcosystemReleaseSchema),
  EcosystemReleaseController.create
);

router.get("/", EcosystemReleaseController.getAll);

router.get("/:ecosystemId", EcosystemReleaseController.getById);


router.put(
  "/:ecosystemId",
  validation.validateBody(updateEcosystemReleaseSchema),
  EcosystemReleaseController.update
);

router.delete("/:ecosystemId", EcosystemReleaseController.delete);

export default router;