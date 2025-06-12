# TecniRacer Cotizador

Aplicación web para cotizar y agendar servicios de taller automotriz.

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
2. Crea un archivo `.env` y define la variable `DATABASE_URL` con la cadena de conexión de tu base de datos.
3. Ejecuta las migraciones de Prisma con `npx prisma migrate dev`.
4. Inicia el servidor de desarrollo usando `npm run dev`.

## Despliegue en Railway

1. Abre [Railway](https://railway.app) y crea un proyecto enlazándolo a este repositorio.
2. En la configuración del proyecto añade la variable `DATABASE_URL` en el apartado de Environment Variables.
3. Cada commit en la rama principal desplegará automáticamente la aplicación.
