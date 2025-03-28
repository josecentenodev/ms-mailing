# MS-Mailing

Microservicio para enviar emails a través del servicio SMTP de Outlook.

## Descripción

Este microservicio proporciona una API REST para enviar correos electrónicos utilizando el servicio SMTP de Outlook. Está construido con Node.js y Express, y utiliza Nodemailer para la funcionalidad de envío de correos.

## Características

- Envío de correos electrónicos con texto plano y HTML
- Soporte para archivos adjuntos
- Plantillas de correo electrónico personalizables
- Registro detallado de actividades
- Manejo de errores robusto

## Requisitos

- Node.js (v14 o superior)
- npm o yarn
- Credenciales SMTP de Outlook

## Instalación

```bash
# Clonar el repositorio
git clone https://github.com/josecentenodev/ms-mailing.git

# Entrar al directorio
cd ms-mailing

# Instalar dependencias
npm install
```

## Configuración

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```
PORT=3000
NODE_ENV=development

# Configuración SMTP de Outlook
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_USER=your-outlook-email@outlook.com
SMTP_PASS=your-password
SMTP_FROM=your-outlook-email@outlook.com
```

## Uso

### Iniciar el servidor

```bash
# Modo desarrollo
npm run dev

# Modo producción
npm start
```

### Ejemplo de uso de la API

```bash
curl -X POST http://localhost:3000/api/email/send \
  -H "Content-Type: application/json" \
  -d '{
    "to": "destinatario@ejemplo.com",
    "subject": "Asunto del correo",
    "text": "Contenido en texto plano",
    "html": "<p>Contenido en <b>HTML</b></p>"
  }'
```

## Estructura del Proyecto

```
ms-mailing/
├── src/
│   ├── config/         # Configuración de la aplicación
│   ├── controllers/    # Controladores de la API
│   ├── middlewares/    # Middlewares personalizados
│   ├── models/         # Modelos de datos
│   ├── routes/         # Rutas de la API
│   ├── services/       # Servicios (incluyendo el servicio de email)
│   ├── utils/          # Utilidades y helpers
│   ├── app.js          # Configuración de Express
│   └── index.js        # Punto de entrada de la aplicación
├── tests/              # Tests unitarios e integración
├── .env                # Variables de entorno (no incluido en el repositorio)
├── .env.example        # Ejemplo de variables de entorno
├── .gitignore          # Archivos ignorados por Git
├── package.json        # Dependencias y scripts
└── README.md           # Este archivo
```

## Licencia

ISC
