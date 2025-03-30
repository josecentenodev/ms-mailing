/**
 * MS-Mailing - Configuración de SendGrid
 */
const logger = require('../utils/logger');

// Verificar que existe la API key
const apiKey = process.env.SENDGRID_API_KEY;

if (!apiKey) {
  logger.error('SENDGRID_API_KEY no está configurada en las variables de entorno');
  logger.error('El servicio de email no funcionará correctamente');
}

module.exports = {
  apiKey,
  defaultSender: process.env.SENDGRID_FROM_EMAIL || process.env.SMTP_USER
}; 