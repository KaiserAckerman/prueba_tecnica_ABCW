# Registro de uso de IA

Registro honesto de qué pedí, qué propuso la IA y qué cambié yo. Alimenta la sección "Cómo usé IA" del README.

## Etapa 0 — Preparación (en Claude, fuera del repo)
- **Pedí:** leer el PDF de la prueba, proponer un plan por etapas con tiempos y una temática para la landing; luego buscar una API pública para tener contenido dinámico.
- **Propuso la IA:** una cafetería ficticia; inicialmente sugirió HTML vanilla o Astro (lo descarté: elegí Angular por mi experiencia); comparó APIs públicas y recomendó Sample APIs (Coffee).
- **Cambié yo:** elegí Angular + Tailwind, decidí que el menú venga de la API, y decidí construir el proyecto con Claude Code usando `CLAUDE.md`.

## Etapa 1 — Verificar la API (sin commit)
- **Pedí:** comprobar que `/coffee/hot` e `/coffee/iced` responden y traen CORS, y ver qué registros hay que filtrar.
- **Propuso la IA:** con `curl` y un script de Node: ambas dan 200 con `Access-Control-Allow-Origin: *`; `hot` tiene 23 registros y 19 válidos, `iced` 6 de 6. Detectó basura que el filtro básico no atrapa ("Black CoffeeTest") e imágenes de `iced` inestables (Cold Brew da 400, otras dan 429).
- **Cambié yo:** decidí usar solo `hot`, filtrar títulos que contengan "test", mostrar un skeleton mientras carga y un mensaje de error si falla, y añadir un JSON local de respaldo en `public/`.

## Etapa 2 — Limpieza de la plantilla (etapa 1 del CLAUDE.md)
- **Pedí:** limpiar la plantilla de Angular y definir los tokens de Tailwind para "Tostadero Brisa".
- **Propuso la IA:** paleta café (`crema #faf5ee`, `tostado #6f4e37`, `acento #d97706`), fuentes Fraunces (títulos) e Inter (texto) desde Google Fonts, tokens en `@theme` de `styles.css`, `lang="es"` y título en `index.html`, y quitar `RouterOutlet` y la señal `title` que ya no se usaban. Verificado con `npm run build` y `npm test -- --no-watch` (2 tests pasan).
- **Cambié yo:** aprobé la paleta y la tipografía. Dejé `app.routes.ts` y `app.config.ts` sin tocar, por ahora.
- **Correcciones / aprendizaje:**
  - Pensé que no existía un lugar único para cambiar el color principal; la IA me corrigió: es `@theme` en `styles.css`.
  - Al practicar, señalé la línea de `--color-crema` (el fondo) como si fuera el color principal; el principal es `--color-tostado`. Los nombres por color pueden confundir.
  - Aprendí que `chore:` es un tipo de Conventional Commits (mantenimiento) y que los estilos del `body` van en `styles.css` porque está fuera de `<app-root>` y los estilos de componente están encapsulados.
