/**
 * MS-Mailing - Servicio de Email con SendGrid
 */
const sgMail = require('@sendgrid/mail');
const fs = require('fs').promises;
const path = require('path');
const logger = require('../utils/logger');

class EmailService {
  constructor() {
    // Inicializar SendGrid con la API key
    if (!process.env.SENDGRID_API_KEY) {
      logger.error('SENDGRID_API_KEY no configurada en las variables de entorno');
    } else {
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      logger.info('Servicio de SendGrid inicializado');
    }
    
    // Verificar email de remitente
    if (!process.env.SENDGRID_FROM_EMAIL) {
      logger.warn('SENDGRID_FROM_EMAIL no configurado, deberá especificarse en cada envío');
    }
  }
  
  /**
   * Envía un correo electrónico usando SendGrid
   */
  async sendEmail({
    to,
    subject,
    text,
    html,
    attachments = [],
    from = process.env.SENDGRID_FROM_EMAIL,
    cc,
    bcc,
  }) {
    // Validar API key
    if (!process.env.SENDGRID_API_KEY) {
      throw new Error('No se puede enviar email: SENDGRID_API_KEY no configurada');
    }
    
    // Validar campos requeridos
    if (!to) throw new Error('Campo "to" es requerido');
    if (!subject) throw new Error('Campo "subject" es requerido');
    if (!text && !html) throw new Error('Se requiere al menos uno de los campos "text" o "html"');
    if (!from) throw new Error('Campo "from" es requerido (o configura SENDGRID_FROM_EMAIL)');

    // Construir mensaje
    const msg = { to, from, subject };
    
    // Agregar contenido
    if (text) msg.text = text;
    if (html) msg.html = html;
    
    // Agregar campos opcionales
    if (cc) msg.cc = cc;
    if (bcc) msg.bcc = bcc;
    
    // Procesar adjuntos
    if (attachments && attachments.length > 0) {
      msg.attachments = await Promise.all(attachments.map(async attachment => {
        // Adjuntos ya en formato SendGrid
        if (attachment.content && attachment.filename) {
          return attachment;
        }
        
        // Convertir desde ruta de archivo
        if (attachment.path) {
          try {
            const content = await fs.readFile(attachment.path);
            return {
              content: content.toString('base64'),
              filename: attachment.filename || path.basename(attachment.path),
              type: attachment.type || attachment.contentType || 'application/octet-stream',
              disposition: 'attachment'
            };
          } catch (error) {
            logger.error(`Error al procesar adjunto ${attachment.path}: ${error.message}`);
            throw new Error(`Error al procesar adjunto: ${error.message}`);
          }
        }
        
        // Si no tiene ni content ni path, es un error
        throw new Error('Los adjuntos deben tener "content" o "path"');
      }));
    }

    logger.info(`Enviando email a: ${to}, asunto: ${subject}`);
    
    try {
      const [response] = await sgMail.send(msg);
      logger.info(`Email enviado. Status: ${response.statusCode}`);
      
      return {
        success: true,
        statusCode: response.statusCode,
        messageId: response.headers['x-message-id'] || null
      };
    } catch (error) {
      logger.error(`Error al enviar email: ${error.message}`);
      
      // Información más detallada de SendGrid
      if (error.response) {
        const { body } = error.response;
        logger.error(`Detalles: ${JSON.stringify(body)}`);
        
        // Errores específicos que podemos manejar
        if (body.errors) {
          const errorMessages = body.errors.map(err => err.message).join('; ');
          throw new Error(`SendGrid - ${errorMessages}`);
        }
      }
      
      throw error;
    }
  }

  /**
   * Envía un correo utilizando una plantilla
   */
  async sendTemplateEmail({
    templateName,
    templateData = {},
    ...emailOptions
  }) {
    if (!templateName) {
      throw new Error('Se requiere el nombre de la plantilla');
    }

    // Cargar la plantilla HTML
    const templatePath = path.join(__dirname, '../templates', `${templateName}.html`);
    let htmlContent;
    
    try {
      htmlContent = await fs.readFile(templatePath, 'utf8');
    } catch (error) {
      if (error.code === 'ENOENT') {
        throw new Error(`Plantilla "${templateName}" no encontrada`);
      }
      throw error;
    }

    // Reemplazar variables en la plantilla
    Object.keys(templateData).forEach(key => {
      const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
      htmlContent = htmlContent.replace(regex, 
        templateData[key] !== undefined ? templateData[key] : '');
    });

    // Enviar el correo con la plantilla procesada
    return this.sendEmail({
      ...emailOptions,
      html: htmlContent,
    });
  }
  
  /**
   * Verifica si el servicio está correctamente configurado
   */
  checkConfiguration() {
    const issues = [];
    
    if (!process.env.SENDGRID_API_KEY) {
      issues.push('SENDGRID_API_KEY no configurada');
    }
    
    if (!process.env.SENDGRID_FROM_EMAIL) {
      issues.push('SENDGRID_FROM_EMAIL no configurado (requerido en cada envío)');
    }
    
    return {
      configured: issues.length === 0,
      provider: 'SendGrid',
      issues
    };
  }
}

module.exports = new EmailService(); 