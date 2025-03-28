/**
 * MS-Mailing - Configuración del servicio de email
 */
const nodemailer = require('nodemailer');
const logger = require('../utils/logger');

// Configuración del transporte SMTP
const createTransporter = () => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.office365.com',
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      secure: false, // true para 465, false para otros puertos
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        ciphers: 'SSLv3',
        rejectUnauthorized: false
      }
    });

    // Verificar conexión
    transporter.verify((error) => {
      if (error) {
        logger.error('Error al verificar el transporte SMTP:', error);
      } else {
        logger.info('Servidor SMTP listo para enviar correos');
      }
    });

    return transporter;
  } catch (error) {
    logger.error('Error al crear el transporte SMTP:', error);
    throw new Error('No se pudo configurar el servicio de correo electrónico');
  }
};

module.exports = {
  createTransporter,
  defaultSender: process.env.SMTP_FROM || process.env.SMTP_USER,
}; 