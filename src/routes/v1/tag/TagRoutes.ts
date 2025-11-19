import express from "express";
import { validation } from "../../../middleware/validation";
import { authMiddleware } from "../../../middleware/authMiddleware"; 
import { createTagSchema, updateTagSchema } from "../../../schema/tagSchema"; 
import { TagController } from "../../../controllers/tag/TagController"

const router = express.Router();

router.use(authMiddleware);

router.post(
  "/",
  validation.validateBody(createTagSchema),
  TagController.create
);

router.get("/", TagController.getAll);

router.get("/:tagId", TagController.getById);

router.put(
  "/:tagId",
  validation.validateBody(updateTagSchema),
  TagController.update
);


router.delete("/:tagId", TagController.delete);

export default router;