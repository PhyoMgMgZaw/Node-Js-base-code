import express from "express";
const router = express.Router();
import AuthRoute from "./auth/AuthRoutes";

router.use("/auth",AuthRoute);

export default router;
