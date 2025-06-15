# TecniRacer Cotizador

Aplicación web para cotizar y agendar servicios de taller automotriz.

## Features

- Generación de cotizaciones con precios base
- Agenda de citas para servicios
- Carrito de servicios para calcular el total

## Estructura

- **Next.js** con TypeScript
- **Tailwind CSS** para estilos
- **Prisma** y SQLite (en desarrollo) / PostgreSQL (en producción)

## Carpetas principales

- `pages/` - rutas de la aplicación y API
- `components/` - componentes reutilizables
- `data/` - catálogo estático de servicios
- `prisma/` - esquema de base de datos
- `lib/` - utilidades compartidas

## Puesta en marcha local

1. Instala las dependencias con `npm install`.
2. Copia el archivo `.env.example` a `.env` y actualiza `DATABASE_URL` con tu cadena de conexión.
3. Ejecuta las migraciones de Prisma con `npx prisma migrate dev`.
4. Ejecuta `npx prisma db seed` para poblar la tabla de servicios y crear un cliente de ejemplo.
5. Genera el cliente de Prisma con `npx prisma generate`.
6. Inicia el servidor de desarrollo usando `npm run dev`.

## Variables de entorno

La aplicación requiere definir `DATABASE_URL` para que Prisma pueda conectarse a la base de datos. Un ejemplo para SQLite es:

```
DATABASE_URL="file:./dev.db"
```

## Despliegue en Railway

1. Abre [Railway](https://railway.app) y crea un proyecto enlazándolo a este repositorio.
2. En la configuración del proyecto añade la variable `DATABASE_URL` en el apartado de Environment Variables.
3. Cada commit en la rama principal desplegará automáticamente la aplicación.

## Uso con Docker

1. Construye la imagen con `docker build -t tecniracer .`.
2. Ejecuta el contenedor:

```
docker run -p 3000:3000 -e DATABASE_URL="file:./dev.db" tecniracer
```
