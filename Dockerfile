# Imagen base
FROM node:18-alpine

# Instalar pnpm
RUN npm install -g pnpm

# Crear directorio de trabajo
WORKDIR /app

# Configurar variables de entorno para producción
ENV NODE_ENV=production

# Copiar archivos de configuración de paquetes
COPY package*.json ./

# Instalar dependencias con pnpm
RUN pnpm install --prod

# Crear directorio para logs
RUN mkdir -p logs

# Copiar el código de la aplicación
COPY . .

# Exponer el puerto donde se ejecuta el servicio
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["node", "src/index.js"] 