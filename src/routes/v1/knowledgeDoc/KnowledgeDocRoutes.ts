import { createKnowledgeDocSchema, updateKnowledgeDocSchema } from './../../../schema/knowledgeDocSchema';
import express from "express";
import { validation } from "../../../middleware/validation";
import { authMiddleware } from "../../../middleware/authMiddleware"; 
import { KnowledgeDocController } from "../../../controllers/knowledgeDoc/KnowledgeDocController";

const router = express.Router();

router.use(authMiddleware);

router.post(
  "/",
  validation.validateBody(createKnowledgeDocSchema),
  KnowledgeDocController.create
);

router.get("/", KnowledgeDocController.getAll);

router.get("/:docId", KnowledgeDocController.getById);

router.put(
  "/:docId",
  validation.validateBody(updateKnowledgeDocSchema),
  KnowledgeDocController.update
);

router.delete("/:docId", KnowledgeDocController.delete);

export default router;
