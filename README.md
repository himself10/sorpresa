## WEB San Valentín (Next.js + TypeScript)

Landing page romántica, minimalista y moderna para una declaración de amor.

### Qué incluye

- **Next.js (App Router) + TypeScript**
- **Una sola página**: `web-san-valentin/src/app/page.tsx`
- **Diseño centrado** (vertical y horizontal)
- **Fondo degradado suave** (rosado / morado)
- **Tarjeta central** con título + texto + botones **"Sí 💖"** y **"No 🙈"**
- **Interacciones en cliente**:
  - Al hacer click en **"Sí 💖"** muestra un mensaje feliz con transición suave
  - El botón **"No 🙈"** se mueve de posición al intentar tocarlo (divertido)

> Nota: El proyecto Next.js está dentro de la carpeta `web-san-valentin/` (se creó así por restricciones del nombre del paquete en npm).

## Getting Started

Primero instala dependencias y levanta el servidor de desarrollo.

```bash
cd web-san-valentin
npm install
npm run dev
```

Abre `http://localhost:3000` en tu navegador.

### Estructura rápida

- **Página principal**: `web-san-valentin/src/app/page.tsx`
- **Layout**: `web-san-valentin/src/app/layout.tsx`
- **Estilos globales**: `web-san-valentin/src/app/globals.css`

### Build (producción)

```bash
cd web-san-valentin
npm run build
npm run start
```

### Personalización rápida

En `web-san-valentin/src/app/page.tsx` puedes cambiar:

- **Título y texto** de la declaración
- **Mensaje** al aceptar
- **Comportamiento** del botón “No 🙈” (qué tan rápido / cuánto se mueve)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
