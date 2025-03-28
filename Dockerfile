# Imagen base
FROM node:18-alpine

# Crear directorio de trabajo
WORKDIR /app

# Configurar variables de entorno para producción
ENV NODE_ENV=production

# Copiar archivos de configuración de paquetes
COPY package*.json ./

# Instalar dependencias
RUN npm ci --only=production

# Crear directorio para logs
RUN mkdir -p logs

# Copiar el código de la aplicación
COPY . .

# Exponer el puerto donde se ejecuta el servicio
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["node", "src/index.js"] 