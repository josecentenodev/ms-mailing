/**
 * MS-Mailing - Controlador de Email
 */
const emailService = require('../services/email.service');
const logger = require('../utils/logger');

/**
 * Envía un correo electrónico
 * @route POST /api/email/send
 */
const sendEmail = async (req, res) => {
  try {
    const { to, subject, text, html, attachments, from, cc, bcc } = req.body;
    
    const result = await emailService.sendEmail({
      to, subject, text, html, attachments, from, cc, bcc
    });

    return res.status(200).json({
      success: true,
      message: 'Correo enviado exitosamente',
      data: result
    });
  } catch (error) {
    logger.error('Error en sendEmail:', error);
    
    // Distinguir entre errores de validación y otros errores
    const isValidationError = error.message.includes('es requerido') || 
                             error.message.includes('required');
    
    return res.status(isValidationError ? 400 : 500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Envía un correo utilizando una plantilla
 * @route POST /api/email/send-template
 */
const sendTemplateEmail = async (req, res) => {
  try {
    const { to, subject, templateName, templateData, from, cc, bcc, attachments } = req.body;
    
    const result = await emailService.sendTemplateEmail({
      to, subject, templateName, templateData, from, cc, bcc, attachments
    });

    return res.status(200).json({
      success: true,
      message: 'Correo con plantilla enviado exitosamente',
      data: result
    });
  } catch (error) {
    logger.error('Error en sendTemplateEmail:', error);
    
    // Distinguir entre errores de validación/plantilla y otros errores
    const isClientError = error.message.includes('es requerido') || 
                         error.message.includes('no encontrada') ||
                         error.message.includes('required');
    
    return res.status(isClientError ? 400 : 500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Verifica el estado del servicio de email
 * @route GET /api/email/status
 */
const getStatus = (req, res) => {
  const status = emailService.checkConfiguration();
  
  return res.status(status.configured ? 200 : 503).json({
    success: status.configured,
    status: status.configured ? 'operational' : 'misconfigured',
    provider: status.provider,
    issues: status.issues
  });
};

module.exports = {
  sendEmail,
  sendTemplateEmail,
  getStatus
}; 