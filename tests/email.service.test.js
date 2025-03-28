/**
 * MS-Mailing - Tests para el servicio de email
 */
const emailService = require('../src/services/email.service');

// Mock de nodemailer
jest.mock('nodemailer', () => ({
  createTransport: jest.fn().mockReturnValue({
    sendMail: jest.fn().mockImplementation((mailOptions) => 
      Promise.resolve({
        messageId: 'mock-message-id',
        envelope: {
          from: mailOptions.from,
          to: [mailOptions.to],
        },
      })
    ),
    verify: jest.fn().mockImplementation((callback) => callback(null, true)),
  }),
}));

// Mock del logger
jest.mock('../src/utils/logger', () => ({
  info: jest.fn(),
  error: jest.fn(),
}));

describe('Email Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('sendEmail', () => {
    it('debería enviar un correo correctamente', async () => {
      const emailOptions = {
        to: 'test@example.com',
        subject: 'Test Subject',
        text: 'Test message',
      };

      const result = await emailService.sendEmail(emailOptions);

      expect(result).toHaveProperty('success', true);
      expect(result).toHaveProperty('messageId', 'mock-message-id');
    });

    it('debería lanzar un error si faltan campos requeridos', async () => {
      const emailOptions = {
        to: 'test@example.com',
        // Falta el subject
      };

      await expect(emailService.sendEmail(emailOptions)).rejects.toThrow(
        'Faltan campos requeridos'
      );
    });
  });

  // Este test no se puede ejecutar sin una plantilla real
  // Se puede descomentar al tener una plantilla de prueba
  /*
  describe('sendTemplateEmail', () => {
    it('debería enviar un correo con plantilla correctamente', async () => {
      const templateOptions = {
        to: 'test@example.com',
        subject: 'Template Test',
        templateName: 'test-template',
        templateData: {
          name: 'Test User',
          message: 'Test template message',
        },
      };

      // Mockear fs.promises.readFile
      jest.mock('fs', () => ({
        promises: {
          readFile: jest.fn().mockResolvedValue(
            'Hello {{name}}, {{message}}'
          ),
        },
      }));

      const result = await emailService.sendTemplateEmail(templateOptions);

      expect(result).toHaveProperty('success', true);
      expect(result).toHaveProperty('messageId', 'mock-message-id');
    });
  });
  */
}); 