/**
 * MS-Mailing - Middleware de registro de solicitudes
 */
const logger = require('../utils/logger');

/**
 * Middleware para registrar las solicitudes HTTP
 */
const logRequest = (req, res, next) => {
  const { method, originalUrl, ip } = req;
  const userAgent = req.get('user-agent') || '';
  
  logger.http(`${method} ${originalUrl} - ${ip} - ${userAgent}`);
  
  // Registrar tiempo de respuesta
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    const { statusCode } = res;
    
    const level = statusCode < 400 ? 'info' : 'error';
    logger[level](`${method} ${originalUrl} ${statusCode} - ${duration}ms`);
  });
  
  next();
};

module.exports = {
  logRequest,
}; 