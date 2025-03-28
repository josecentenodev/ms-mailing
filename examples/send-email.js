/**
 * MS-Mailing - Ejemplo de envío de correo
 * 
 * Este script muestra cómo enviar un correo directamente utilizando el servicio.
 * Para ejecutarlo: node examples/send-email.js
 */
require('dotenv').config();
const emailService = require('../src/services/email.service');

// Configurar datos del correo
const emailData = {
  to: 'destinatario@ejemplo.com', // Cambiar a un correo real para pruebas
  subject: 'Prueba de MS-Mailing',
  text: 'Este es un correo de prueba enviado desde el microservicio MS-Mailing.',
  html: '<p>Este es un correo de prueba enviado desde el <b>microservicio MS-Mailing</b>.</p>',
};

// Función para enviar el correo
async function sendTestEmail() {
  try {
    console.log('Enviando correo de prueba...');
    const result = await emailService.sendEmail(emailData);
    console.log('Correo enviado exitosamente!');
    console.log('Message ID:', result.messageId);
  } catch (error) {
    console.error('Error al enviar el correo:', error.message);
  }
}

// Ejecutar la función
sendTestEmail(); 