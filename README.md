## WEB San Valentín (Next.js + TypeScript)

Landing page romántica, minimalista y moderna para una declaración de amor.

### Qué incluye

- **Next.js (App Router) + TypeScript**
- **React 19**
- **Una sola página**: `src/app/page.tsx`
- **UI centrada** (vertical y horizontal), con **fondo oscuro + grid animada**
- **Tarjeta principal** con CTA **"Sí"** y **"No"**
- **Interacciones en cliente**:
  - Al hacer click en **"Sí"** se muestra un mensaje de confirmación
  - El botón **"No"** **crece** en cada intento hasta “cubrir” la pantalla (y deja de ser clickeable)
  - **Rastro del cursor** (en móvil se mueve solo), en `src/app/components/CursorTrail.tsx`
- **Estilos** con Tailwind v4 (vía `@import "tailwindcss";`) + CSS propio en `src/app/styles/`

### Requisitos

- **Node.js 20+** (recomendado)
- npm

### Empezar (desarrollo)

```bash
npm install
npm run dev
```

Luego abre `http://localhost:3000`.

### Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

### Estructura rápida

- **Entrada**: `src/app/page.tsx`
- **Layout**: `src/app/layout.tsx`
- **Componentes**: `src/app/components/`
  - `EvasiveButton.tsx` (lógica del botón “No”)
  - `CursorTrail.tsx` (rastro del cursor)
- **Copy/textos**: `src/app/utils/romanceCopy.ts`
- **Estilos**: `src/app/styles/` (incluye `globals.css`)

### Personalización rápida

- **Textos** (título, labels, mensaje final): `src/app/utils/romanceCopy.ts`
- **Comportamiento del “No”** (velocidad/escala, límite): `src/app/components/EvasiveButton.tsx`
- **Animaciones/fondo**: `src/app/page.tsx` y `src/app/styles/*`

### Deploy

Puedes desplegarlo en **Vercel** (recomendado para Next.js) o en cualquier entorno que ejecute `next start`:

```bash
npm run build
npm run start
```

### Licencia

Este proyecto está bajo la licencia **Apache 2.0**. Ver `LICENSE`.
