import express from "express";
import { validation } from "../../../middleware/validation";
import { authMiddleware } from "../../../middleware/authMiddleware"; 
import { createChangelogItemSchema, updateChangelogItemSchema } from "../../../schema/changelogItemSchema"; 
import { ChangelogItemController } from "../../../controllers/changeLogItem/ChangeLogItemController";

const router = express.Router();
router.use(authMiddleware);

router.post(
  "/",
  validation.validateBody(createChangelogItemSchema),
  ChangelogItemController.create
);

router.get("/", ChangelogItemController.getAll);


router.get("/:changeId", ChangelogItemController.getById);

router.put(
  "/:changeId",
  validation.validateBody(updateChangelogItemSchema),
  ChangelogItemController.update
);

router.delete("/:changeId", ChangelogItemController.delete);

export default router;