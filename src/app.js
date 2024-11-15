import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import router from "./routes/index.js";
import envs from "./config/envs.config.js";
import { errorHandle } from "./errors/errHandle.js";
import { logger } from "./utils/logger.js";
import swaggerUiExpress from "swagger-ui-express";
import { specs } from "./config/swagger.config.js";
import { connectMongoDB } from "./config/mongoDB.config.js";

const app = express();
const PORT = envs.PORT || 8080;

connectMongoDB();

app.use(express.json());
app.use(cookieParser());
app.use("/api-docs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs))

app.use("/api", router);

console.log(`Server running on port ${PORT}`);
console.log(`http://localhost:${PORT}/`);

// Middleware de manejo de errores
app.use(errorHandle);

app.listen(PORT, () => logger.info(`Listening on ${PORT}`));

