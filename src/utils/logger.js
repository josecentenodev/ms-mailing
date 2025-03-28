/**
 * MS-Mailing - Logger
 */
const winston = require('winston');

// Niveles de log
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// Determinar el nivel según el entorno
const level = () => {
  const env = process.env.NODE_ENV || 'development';
  const isDevelopment = env === 'development';
  return isDevelopment ? 'debug' : 'info';
};

// Colores para los niveles
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
};

winston.addColors(colors);

// Formato del log
const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`,
  ),
);

// Transportes
const transports = [
  // Consola
  new winston.transports.Console(),
  
  // Archivo para errores
  new winston.transports.File({
    filename: 'logs/error.log',
    level: 'error',
  }),
  
  // Archivo para todos los logs
  new winston.transports.File({ filename: 'logs/all.log' }),
];

// Crear el logger
const logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports,
});

module.exports = logger; 