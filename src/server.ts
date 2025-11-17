import { NextFunction, Request, Response } from "express";
import app from "./app";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT;

const startServer = async () => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
