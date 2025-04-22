# Guía de Despliegue: H₂O Allegiant AI

## Variables de Entorno Requeridas

Para el correcto funcionamiento de la aplicación, configura las siguientes variables de entorno en tu panel de control de Hostinger:

- `NEXT_PUBLIC_API_URL`: URL pública de la API (accesible desde el navegador)
- `API_URL`: URL del servidor de la API (para peticiones de servidor)
- `NODE_ENV`: Debe ser "production" en ambiente de producción

## Pasos para el Despliegue

1. Clona el repositorio
2. Instala dependencias: `npm install`
3. Construye la aplicación: `npm run build`
4. Inicia la aplicación: `npm start`

Para más información sobre despliegue en Hostinger, consulta su documentación oficial.
