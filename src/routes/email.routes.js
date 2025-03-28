/**
 * MS-Mailing - Rutas de Email
 */
const express = require("express");
const emailController = require("../controllers/email.controller");

const router = express.Router();

/**
 * @route POST /api/email/send
 * @desc Enviar un correo electrónico
 * @access Public
 */
router.post("/send", emailController.sendEmail);

/**
 * @route POST /api/email/send-template
 * @desc Enviar un correo electrónico utilizando una plantilla
 * @access Public
 */
router.post("/send-template", emailController.sendTemplateEmail);

module.exports = router;
