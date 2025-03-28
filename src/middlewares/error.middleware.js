/**
 * MS-Mailing - Middleware de manejo de errores
 */
const logger = require('../utils/logger');

/**
 * Middleware para el manejo centralizado de errores
 */
const errorMiddleware = (err, req, res, next) => {
  // Extraer información del error
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Error interno del servidor';
  const stack = process.env.NODE_ENV === 'development' ? err.stack : undefined;
  
  // Registrar el error
  logger.error(`[${statusCode}] ${message}`);
  if (stack) {
    logger.error(stack);
  }
  
  // Enviar respuesta de error
  res.status(statusCode).json({
    status: 'error',
    message,
    stack,
    path: req.originalUrl,
  });
};

module.exports = errorMiddleware; 