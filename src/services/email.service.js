/**
 * MS-Mailing - Servicio de Email
 */
const fs = require('fs').promises;
const path = require('path');
const emailConfig = require('../config/email.config');
const logger = require('../utils/logger');

class EmailService {
  constructor() {
    this.transporter = emailConfig.createTransporter();
    this.defaultSender = emailConfig.defaultSender;
  }

  /**
   * Envía un correo electrónico
   * @param {Object} options - Opciones del correo
   * @param {string|string[]} options.to - Destinatario(s)
   * @param {string} options.subject - Asunto del correo
   * @param {string} [options.text] - Contenido en texto plano
   * @param {string} [options.html] - Contenido en HTML
   * @param {Array<Object>} [options.attachments] - Archivos adjuntos
   * @param {string} [options.from] - Remitente (opcional, usa el valor por defecto si no se proporciona)
   * @param {string|string[]} [options.cc] - Copia a
   * @param {string|string[]} [options.bcc] - Copia oculta a
   * @returns {Promise<Object>} - Información del envío
   */
  async sendEmail({
    to,
    subject,
    text,
    html,
    attachments = [],
    from = this.defaultSender,
    cc,
    bcc,
  }) {
    try {
      if (!to || !subject || (!text && !html)) {
        throw new Error('Faltan campos requeridos: to, subject, y text o html');
      }

      const mailOptions = {
        from,
        to,
        cc,
        bcc,
        subject,
        text,
        html,
        attachments,
      };

      logger.info(`Enviando correo a: ${to}`);
      const info = await this.transporter.sendMail(mailOptions);
      
      logger.info(`Correo enviado: ${info.messageId}`);
      return {
        success: true,
        messageId: info.messageId,
        info,
      };
    } catch (error) {
      logger.error(`Error al enviar correo: ${error.message}`, error);
      throw new Error(`Error al enviar correo: ${error.message}`);
    }
  }

  /**
   * Envía un correo utilizando una plantilla HTML
   * @param {Object} options - Opciones del correo
   * @param {string} options.templateName - Nombre de la plantilla (sin extensión)
   * @param {Object} options.templateData - Datos para la plantilla
   * @param {Object} emailOptions - Resto de opciones para el correo (ver sendEmail)
   * @returns {Promise<Object>} - Información del envío
   */
  async sendTemplateEmail({
    templateName,
    templateData = {},
    ...emailOptions
  }) {
    try {
      if (!templateName) {
        throw new Error('Se requiere el nombre de la plantilla');
      }

      // Cargar la plantilla HTML
      const templatePath = path.join(__dirname, '../templates', `${templateName}.html`);
      let htmlContent = await fs.readFile(templatePath, 'utf8');

      // Reemplazar variables en la plantilla
      Object.keys(templateData).forEach(key => {
        const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
        htmlContent = htmlContent.replace(regex, templateData[key]);
      });

      // Enviar el correo con la plantilla procesada
      return this.sendEmail({
        ...emailOptions,
        html: htmlContent,
      });
    } catch (error) {
      logger.error(`Error al enviar correo con plantilla: ${error.message}`, error);
      throw new Error(`Error al enviar correo con plantilla: ${error.message}`);
    }
  }
}

module.exports = new EmailService(); 