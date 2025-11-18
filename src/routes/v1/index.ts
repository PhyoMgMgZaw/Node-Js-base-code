import express from "express";
const router = express.Router();
import AuthRoute from "./auth/AuthRoutes";
import ProjectRoute from "./project/ProjectRoutes";

router.use("/auth",AuthRoute);
router.use("/projects",ProjectRoute);

export default router;
