/**
 * MS-Mailing - Rutas de Email
 */
const express = require("express");
const emailController = require("../controllers/email.controller");

const router = express.Router();

// Función auxiliar para validar formato de email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Middleware de validación
function validateEmailRequest(req, res, next) {
  const { to, from } = req.body;
  
  // Validar destinatario
  if (to) {
    if (Array.isArray(to)) {
      if (to.some(email => !isValidEmail(email))) {
        return res.status(400).json({
          success: false,
          message: 'Uno o más destinatarios tienen formato de email inválido'
        });
      }
    } else if (!isValidEmail(to)) {
      return res.status(400).json({
        success: false,
        message: 'El destinatario tiene formato de email inválido'
      });
    }
  }
  
  // Validar remitente si se proporciona
  if (from && !isValidEmail(from)) {
    return res.status(400).json({
      success: false,
      message: 'El remitente tiene formato de email inválido'
    });
  }
  
  next();
}

/**
 * @route GET /api/email/status
 * @desc Verifica el estado del servicio de email
 * @access Public
 */
router.get('/status', emailController.getStatus);

/**
 * @route POST /api/email/send
 * @desc Enviar un correo electrónico
 * @access Public
 */
router.post("/send", validateEmailRequest, emailController.sendEmail);

/**
 * @route POST /api/email/send-template
 * @desc Enviar un correo electrónico utilizando una plantilla
 * @access Public
 */
router.post("/send-template", validateEmailRequest, emailController.sendTemplateEmail);

module.exports = router;
