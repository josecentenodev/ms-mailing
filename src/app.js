/**
 * MS-Mailing - Configuración de Express
 */
const cors = require("cors");
const errorMiddleware = require("./middlewares/error.middleware");
const express = require("express");
const helmet = require("helmet");
const logger = require("./utils/logger");
const routes = require("./routes");
const { logRequest } = require("./middlewares/logger.middleware");

// Crear la aplicación Express
const app = express();

// Middlewares de seguridad y utilidad
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(logRequest);

// Ruta de estado de salud
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "ms-mailing",
    version: process.env.npm_package_version || "1.0.0",
    timestamp: new Date().toISOString(),
  });
});

// Rutas de la API
app.use("/api", routes);

// Manejo de rutas no encontradas
app.use("*", (req, res) => {
  res.status(404).json({
    status: "error",
    message: `Ruta no encontrada: ${req.originalUrl}`,
  });
});

// Middleware de manejo de errores
app.use(errorMiddleware);

// Manejo de errores de Express
app.on("error", (error) => {
  logger.error("Error en el servidor Express:", error);
});

module.exports = app;
