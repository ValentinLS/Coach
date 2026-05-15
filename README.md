# Plan Entrenamiento 2026 - PWA para iPhone

Esta carpeta contiene la PWA completa del calendario de entrenamiento.

## Archivos principales

- `index.html`: aplicación del calendario.
- `manifest.webmanifest`: manifest PWA.
- `service-worker.js`: cache offline.
- `icons/`: iconos para iOS/PWA.
- `splash/`: pantallas de arranque para iPhone/iPad.

## Instalación en iPhone

1. Sube esta carpeta a un hosting con HTTPS, por ejemplo GitHub Pages, Netlify, Vercel o Cloudflare Pages.
2. Abre la URL publicada desde Safari en el iPhone.
3. Pulsa Compartir.
4. Pulsa Añadir a pantalla de inicio.
5. Abre la app desde el icono `Plan 2026`.
6. Tras la primera carga completa, el calendario queda cacheado para uso offline.

## Nota importante

El modo offline mediante service worker necesita un contexto seguro. En producción usa `https://`. Abrir `index.html` directamente como archivo local permite ver el calendario, pero no instala la PWA offline completa.

Versión de cache: `cfe62c4a6ea2`.
