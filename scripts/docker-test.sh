#!/bin/bash
# Script para probar la imagen Docker de MS-Mailing

echo "Construyendo imagen Docker de MS-Mailing..."
docker build -t ms-mailing-test .

echo "Ejecutando contenedor de prueba..."
docker run --name ms-mailing-test -p 3001:3000 -d \
  -e NODE_ENV=development \
  -e PORT=3000 \
  -e SMTP_HOST=smtp.office365.com \
  -e SMTP_PORT=587 \
  -e SMTP_USER=test@example.com \
  -e SMTP_PASS=password \
  -e SMTP_FROM=test@example.com \
  ms-mailing-test

echo "Esperando 5 segundos para que el servicio inicie..."
sleep 5

echo "Verificando estado del contenedor..."
docker ps | grep ms-mailing-test

echo "Verificando logs del contenedor..."
docker logs ms-mailing-test

echo "Realizando petición de prueba al endpoint de health..."
curl -s http://localhost:3001/health | json_pp || echo "Error: No se pudo acceder al endpoint de health"

echo "Limpiando..."
docker stop ms-mailing-test
docker rm ms-mailing-test

echo "Prueba completada." 