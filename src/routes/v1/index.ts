import express from "express";
const router = express.Router();
import AuthRoute from "./auth/AuthRoutes";
import ProjectRoute from "./project/ProjectRoutes";
import ReleaseRoute from "./release/ReleaseRoute";
import ChangeLogItemRoute from "./changeLogItem/ChangeLogItemRoutes";

router.use("/auth",AuthRoute);
router.use("/projects",ProjectRoute);
router.use("/releases",ReleaseRoute);
router.use("/changeLogItems",ChangeLogItemRoute);
export default router;
