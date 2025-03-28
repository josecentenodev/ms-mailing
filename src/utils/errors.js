/**
 * MS-Mailing - Clases de errores personalizados
 */

/**
 * Error de la API
 */
class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Error 400 - Bad Request
 */
class BadRequestError extends ApiError {
  constructor(message = 'Solicitud incorrecta') {
    super(400, message);
  }
}

/**
 * Error 401 - Unauthorized
 */
class UnauthorizedError extends ApiError {
  constructor(message = 'No autorizado') {
    super(401, message);
  }
}

/**
 * Error 403 - Forbidden
 */
class ForbiddenError extends ApiError {
  constructor(message = 'Acceso prohibido') {
    super(403, message);
  }
}

/**
 * Error 404 - Not Found
 */
class NotFoundError extends ApiError {
  constructor(message = 'Recurso no encontrado') {
    super(404, message);
  }
}

/**
 * Error 500 - Internal Server Error
 */
class InternalServerError extends ApiError {
  constructor(message = 'Error interno del servidor') {
    super(500, message);
  }
}

/**
 * Error específico del servicio de email
 */
class EmailError extends ApiError {
  constructor(message = 'Error en el servicio de email') {
    super(500, message);
  }
}

module.exports = {
  ApiError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  InternalServerError,
  EmailError,
}; 