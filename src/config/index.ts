import "dotenv/config";
export const config = {
  env: {
    PORT: process.env.PORT || 3000,
    NODE_ENV: process.env.NODE_ENV || "development",
    JWT_SECRET: process.env.JWT_SECRET || "your_jwt_secret_here",
    JWT_REFRESH_SECRET:
      process.env.JWT_REFRESH_SECRET || "your_refresh_secret_here",
    JWT_EXPIRE_IN: process.env.JWT_EXPIRE_IN || "30d",
  },
};
