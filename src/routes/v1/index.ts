import { EnvironmentRequirement } from './../../generated/prisma/index.d';
import express from "express";
const router = express.Router();
import AuthRoute from "./auth/AuthRoutes";
import ProjectRoute from "./project/ProjectRoutes";
import ReleaseRoute from "./release/ReleaseRoute";
import ChangeLogItemRoute from "./changeLogItem/ChangeLogItemRoutes";
import EnvironmentRequirementRoute from "./environmentRequirement/EnvironmentRequirementRoute";
import KnowledgeDocRoute from "./knowledgeDoc/KnowledgeDocRoutes";

router.use("/auth",AuthRoute);
router.use("/projects",ProjectRoute);
router.use("/releases",ReleaseRoute);
router.use("/changeLogItems",ChangeLogItemRoute);
router.use("/environmentRequirements",EnvironmentRequirementRoute);
router.use("/knowledgeDocs",KnowledgeDocRoute);
export default router;
