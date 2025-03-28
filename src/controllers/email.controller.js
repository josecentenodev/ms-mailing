/**
 * MS-Mailing - Controlador de Email
 */
const emailService = require('../services/email.service');
const logger = require('../utils/logger');

/**
 * Envía un correo electrónico
 * @param {Object} req - Objeto de solicitud Express
 * @param {Object} res - Objeto de respuesta Express
 * @param {Function} next - Función next de Express
 */
const sendEmail = async (req, res, next) => {
  try {
    const { to, subject, text, html, attachments, from, cc, bcc } = req.body;
    
    if (!to || !subject || (!text && !html)) {
      return res.status(400).json({
        status: 'error',
        message: 'Faltan campos requeridos: to, subject, y text o html',
      });
    }

    const result = await emailService.sendEmail({
      to,
      subject,
      text,
      html,
      attachments,
      from,
      cc,
      bcc,
    });

    return res.status(200).json({
      status: 'success',
      message: 'Correo enviado exitosamente',
      data: {
        messageId: result.messageId,
      },
    });
  } catch (error) {
    logger.error(`Error en sendEmail: ${error.message}`);
    next(error);
  }
};

/**
 * Envía un correo electrónico utilizando una plantilla
 * @param {Object} req - Objeto de solicitud Express
 * @param {Object} res - Objeto de respuesta Express
 * @param {Function} next - Función next de Express
 */
const sendTemplateEmail = async (req, res, next) => {
  try {
    const { 
      to, 
      subject, 
      templateName, 
      templateData, 
      attachments, 
      from, 
      cc, 
      bcc 
    } = req.body;
    
    if (!to || !subject || !templateName) {
      return res.status(400).json({
        status: 'error',
        message: 'Faltan campos requeridos: to, subject, templateName',
      });
    }

    const result = await emailService.sendTemplateEmail({
      to,
      subject,
      templateName,
      templateData: templateData || {},
      attachments,
      from,
      cc,
      bcc,
    });

    return res.status(200).json({
      status: 'success',
      message: 'Correo con plantilla enviado exitosamente',
      data: {
        messageId: result.messageId,
      },
    });
  } catch (error) {
    logger.error(`Error en sendTemplateEmail: ${error.message}`);
    next(error);
  }
};

module.exports = {
  sendEmail,
  sendTemplateEmail,
}; 