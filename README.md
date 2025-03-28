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
- Containerización con Docker para fácil despliegue

## Requisitos

- Node.js (v14 o superior)
- npm o yarn
- Credenciales SMTP de Outlook
- Docker y Docker Compose (opcional, para despliegue con contenedores)

## Instalación

### Instalación local

```bash
# Clonar el repositorio
git clone https://github.com/josecentenodev/ms-mailing.git

# Entrar al directorio
cd ms-mailing

# Instalar dependencias
npm install
```

### Instalación con Docker

```bash
# Clonar el repositorio
git clone https://github.com/josecentenodev/ms-mailing.git

# Entrar al directorio
cd ms-mailing

# Construir y ejecutar el contenedor con Docker Compose
docker-compose up -d
```

## Configuración

### Configuración local

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

### Configuración con Docker

Puedes configurar las variables de entorno de dos maneras:

1. **Mediante un archivo .env:**
   Crea un archivo `.env` en la raíz del proyecto y Docker Compose lo usará automáticamente.

2. **Configuración en docker-compose.yml:**
   Edita la sección `environment` en el archivo `docker-compose.yml`.

## Uso

### Iniciar el servidor localmente

```bash
# Modo desarrollo
npm run dev

# Modo producción
npm start
```

### Iniciar el servidor con Docker

```bash
# Iniciar el servicio
docker-compose up -d

# Ver logs
docker-compose logs -f

# Detener el servicio
docker-compose down
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
│   ├── templates/      # Plantillas HTML para correos
│   ├── utils/          # Utilidades y helpers
│   ├── app.js          # Configuración de Express
│   └── index.js        # Punto de entrada de la aplicación
├── tests/              # Tests unitarios e integración
├── examples/           # Ejemplos de uso
├── .dockerignore       # Archivos ignorados en la construcción de Docker
├── .env                # Variables de entorno (no incluido en el repositorio)
├── .env.example        # Ejemplo de variables de entorno
├── .gitignore          # Archivos ignorados por Git
├── docker-compose.yml  # Configuración de Docker Compose
├── Dockerfile          # Configuración para construir la imagen Docker
├── package.json        # Dependencias y scripts
└── README.md           # Este archivo
```

## Despliegue en producción

Para desplegar este microservicio en un entorno de producción con Docker:

1. Asegúrate de tener configuradas correctamente las variables de entorno (especialmente las credenciales SMTP)
2. Construye la imagen Docker:
   ```bash
   docker build -t ms-mailing .
   ```
3. Ejecuta el contenedor:
   ```bash
   docker run -d -p 3000:3000 --name ms-mailing --env-file .env ms-mailing
   ```

## Licencia

ISC
