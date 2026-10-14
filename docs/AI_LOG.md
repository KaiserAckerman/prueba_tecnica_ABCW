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

## Etapa 3 — Estructura, header con menú móvil y footer (etapa 2 del CLAUDE.md)
- **Pedí:** crear la estructura de componentes, el header con menú móvil y el footer.
- **Propuso la IA:** componentes standalone `Header` y `Footer`; menú móvil con `signal(false)` + `@if`, `aria-expanded`/`aria-label` en el botón, cierre del menú al pulsar un enlace y header `sticky`; enlaces en un arreglo recorrido con `@for ... track`; un test del menú móvil. Verificado con `npm run build` y `npm test -- --no-watch` (3 tests pasan). No se revisó visualmente en navegador al momento de escribir esto.
- **Cambié yo:** elegí la opción del `signal`, que el menú se cierre al pulsar un enlace y el header `sticky`.
- **Correcciones / aprendizaje:**
  - Creí que `signal` "avisa" cuando un elemento cambia y que para empezar abierto había que usar `update`. En realidad `signal` es un contenedor de un valor; el valor inicial se pone en `signal(false)` (basta con `signal(true)`) y `update` solo cambia el valor después.
  - Entendí `@for` como "extrae los enlaces de la landing"; en realidad recorre el arreglo `enlaces` del `.ts`, y añadir un enlace es añadir un objeto a ese arreglo.

## Etapa 4 — Hero con CTA (etapa 3 del CLAUDE.md)
- **Pedí:** un hero con CTA; primero probar sin imagen y, si no me convencía, añadir una foto del menú de la API.
- **Propuso la IA:** componente `Hero` con título, subtítulo y dos botones (`#menu` y `#contacto`); luego versión dividida (texto + foto) con una foto de Unsplash tomada de la API (latte), guardada en `public/images/`, con `alt`, `width`/`height` y recorte con `object-cover`. Comparó tres fotos candidatas y eligió la del latte por la paleta. Verificado con `npm run build` y `npm test -- --no-watch` (3 tests pasan).
- **Cambié yo:** decidí probar primero sin imagen, vi que quedaba muy simple y pedí añadir una foto del menú. Aprobé el resultado.
- **Correcciones / aprendizaje:**
  - Creí que `sm:` es "para pantallas pequeñas"; en realidad es "desde 640 px hacia arriba" (Tailwind es mobile-first: la clase sin prefijo vale para todo).
  - Justifiqué el único `h1` con "el SEO solo lee uno"; es impreciso: HTML5 permite varios, la razón real es la jerarquía (accesibilidad y claridad).
  - No supe responder cómo se recorta una imagen sin deformarla (`object-cover`) ni cómo se invierte el orden de columnas (`order-*` con prefijo `md:`).
- **Pendiente:** dar crédito al fotógrafo en el README (hay que verificar el nombre en la página de la foto en Unsplash).
