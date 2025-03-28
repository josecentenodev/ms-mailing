# Instrucciones para Docker

Este documento proporciona información detallada sobre cómo utilizar Docker con el microservicio MS-Mailing.

## Construcción de la imagen

```bash
# Construcción básica
docker build -t ms-mailing .

# Construcción con etiqueta específica
docker build -t ms-mailing:1.0.0 .

# Construcción sin caché
docker build --no-cache -t ms-mailing .
```

## Ejecución con Docker

### Ejecución básica

```bash
docker run -d -p 3000:3000 --name ms-mailing ms-mailing
```

### Ejecución con variables de entorno

```bash
docker run -d -p 3000:3000 --name ms-mailing \
  -e NODE_ENV=production \
  -e PORT=3000 \
  -e SMTP_HOST=smtp.office365.com \
  -e SMTP_PORT=587 \
  -e SMTP_USER=your-email@outlook.com \
  -e SMTP_PASS=your-password \
  -e SMTP_FROM=your-email@outlook.com \
  ms-mailing
```

### Ejecución con archivo .env

```bash
docker run -d -p 3000:3000 --name ms-mailing --env-file .env ms-mailing
```

## Volúmenes y persistencia

Para mantener los logs y otros datos persistentes, puedes montar volúmenes:

```bash
# Montar el directorio de logs
docker run -d -p 3000:3000 --name ms-mailing \
  -v $(pwd)/logs:/app/logs \
  ms-mailing
```

Para una persistencia más completa:

```bash
docker run -d -p 3000:3000 --name ms-mailing \
  -v $(pwd)/logs:/app/logs \
  -v $(pwd)/src/templates:/app/src/templates \
  ms-mailing
```

## Docker Compose

El archivo `docker-compose.yml` en la raíz del proyecto proporciona una forma sencilla de ejecutar el servicio:

```bash
# Iniciar el servicio
docker-compose up -d

# Ver logs
docker-compose logs -f

# Detener el servicio
docker-compose down
```

### Escalamiento con Docker Compose

```bash
# Escalar a múltiples instancias (requiere configuración adicional para balanceo de carga)
docker-compose up -d --scale ms-mailing=3
```

## Solución de problemas

### Verificar el estado del contenedor

```bash
docker ps -a | grep ms-mailing
```

### Ver logs del contenedor

```bash
docker logs ms-mailing
```

### Acceder al shell del contenedor

```bash
docker exec -it ms-mailing sh
```

### Reiniciar el contenedor

```bash
docker restart ms-mailing
```

## Consejos para producción

1. **Seguridad**: Nunca almacenes credenciales en la imagen Docker. Usa variables de entorno o servicios de gestión de secretos.

2. **Supervisor**: En entornos de producción, considera utilizar Kubernetes, Docker Swarm o alguna otra herramienta de orquestación.

3. **Monitoreo**: Implementa herramientas de monitoreo como Prometheus y Grafana.

4. **Logs**: Considera enviar logs a un servicio centralizado como ELK Stack o DataDog.

5. **CI/CD**: Integra este Dockerfile en tu pipeline de CI/CD para automatizar el despliegue. 