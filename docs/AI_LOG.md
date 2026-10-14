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

## Etapa 5 — Características (etapa 4 del CLAUDE.md)
- **Pedí:** la sección de características; prefería iconos SVG pero acepté emojis porque no usamos librerías de iconos.
- **Propuso la IA:** componente `Features` con un arreglo `caracteristicas` (icono, título, descripción) recorrido con `@for`, cuadrícula de 1/2/4 columnas (`sm:` y `lg:`), emojis con `aria-hidden`, `id="caracteristicas"` con `scroll-mt-20` y un test que comprueba una tarjeta por elemento. Verificado con `npm run build` y `npm test -- --no-watch` (4 tests pasan).
- **Cambié yo:** elegí emojis frente a SVG inline y aprobé el contenido de las cuatro tarjetas.
- **Correcciones / aprendizaje:**
  - Expliqué bien que `@for` recorre el arreglo del `.ts` y que una quinta característica se añade ahí.
  - Usé 700 px y 1100 px como puntos de corte; los reales de Tailwind son `sm` = 640 px y `lg` = 1024 px (el resultado en esas pantallas sí era correcto: 2 y 4 columnas).

## Etapa 6 — Menú desde la API (etapa 5 del CLAUDE.md)
- **Pedí:** el menú de bebidas desde la API, con las decisiones: estado con señales, respaldo local solo si la API falla (no si no hay bebidas válidas), mostrar las primeras 8, sin precios y sin repetir la foto del hero.
- **Propuso la IA:** `MenuService` con `HttpClient` y una función que filtra los registros basura (título/descripción/imagen con texto, ingredientes como arreglo, sin "test", sin la foto del hero) y limita a 8; componente `Menu` con señales `bebidas`, `estado` y `usandoRespaldo`; skeleton de carga, mensaje de error con "Reintentar", mensaje de vacío, aviso cuando se usa el respaldo, `loading="lazy"` e imagen local de reemplazo si una foto falla; `public/menu-respaldo.json` con 8 bebidas reales; `provideHttpClient()` en `app.config.ts`; 7 tests nuevos. Verificado con `npm run build` y `npm test -- --no-watch` (10 tests pasan). No se revisó visualmente en navegador al momento de escribir esto.
- **Cambié yo:** decidí usar solo señales, que el respaldo se use únicamente si la API falla, mostrar 8 bebidas, no mostrar precios y evitar repetir la foto del hero.
- **Correcciones / aprendizaje:**
  - Creí que con cero bebidas válidas el usuario seguía viendo bebidas, y que el `any` tenía que ver. Es incorrecto: se muestra el mensaje de "no hay bebidas" (estado vacío), porque el respaldo solo entra cuando la petición falla. El `any` solo le dice a TypeScript que no verifique la forma de ese dato en tiempo de compilación; el filtrado real lo hacen las comprobaciones en tiempo de ejecución.
  - Respondí bien que para mostrar 6 bebidas basta cambiar `MAX_BEBIDAS` (línea 15 de `menu.service.ts`). Matiz: el skeleton del arreglo `esqueleto` en `menu.ts` sigue teniendo 8 elementos.

## Etapa 7 — Testimonios (etapa 6 del CLAUDE.md)
- **Pedí:** la sección de testimonios, sin foto de perfil y con contenido ficticio.
- **Propuso la IA:** componente `Testimonials` con un arreglo `testimonios` recorrido con `@for`, cada uno en `<figure>` + `<blockquote>` + `<figcaption>`, círculo con la inicial (`nombre.charAt(0)`) en vez de foto, cuadrícula de 1/3 columnas y un test. Verificado con `npm run build` y `npm test -- --no-watch` (11 tests pasan). No se revisó visualmente en navegador al momento de escribir esto.
- **Cambié yo:** elegí avatares con inicial en lugar de fotos y aprobé los tres testimonios ficticios.
- **Correcciones / aprendizaje:** respondí bien las dos preguntas (añadir un testimonio solo requiere tocar el arreglo del `.ts`; `blockquote`/`figure` aportan semántica que usan los lectores de pantalla y los buscadores). Sin correcciones en esta etapa.
- **Consulta aparte:** pregunté si el texto en inglés del menú (que viene de la API) se podía pasar a español.

## Etapa 8 — FAQ en acordeón (etapa 7 del CLAUDE.md) y `lang="en"` en el menú
- **Pedí:** un FAQ en acordeón (una pregunta abierta a la vez, cuatro preguntas propuestas por la IA); además, saber si el menú se podía mostrar en español.
- **Propuso la IA:** componente `Faq` con un arreglo `preguntas` y una señal `abierta` (posición abierta o `null`) con `alternar()`; botones dentro de `<h3>` con `aria-expanded` y `aria-controls`; test que comprueba abrir, cambiar y cerrar. Sobre el idioma: la API solo ofrece inglés, así que propuso dejarlo y marcarlo con `lang="en"` en título, descripción e ingredientes. Verificado con `npm run build` y `npm test -- --no-watch` (12 tests pasan). No se revisó visualmente en navegador al momento de escribir esto.
- **Cambié yo:** elegí una pregunta abierta a la vez, dejé el contenido de las cuatro preguntas tal cual y decidí no traducir el menú, solo marcar el idioma.
- **Correcciones / aprendizaje:**
  - Pensé que `lang="en"` hace que el navegador traduzca solo; en realidad declara el idioma del texto (lectores de pantalla y traductor saben el idioma de origen), pero el usuario sigue pidiendo la traducción.
  - Expliqué bien la señal `abierta` y para qué sirve `aria-expanded` (tecnologías de asistencia).

## Etapa 9 — Formulario de contacto (etapa 8 del CLAUDE.md)
- **Pedí:** un formulario con Reactive Forms (campos nombre, correo y mensaje), errores accesibles y mensaje de éxito simulado; los errores deben mostrarse cuando el usuario sale de un campo o cambia de campo.
- **Propuso la IA:** `FormGroup` con validadores (`required`, `minLength`, `email` + `pattern` para exigir un punto en el dominio), `mensajeError()` que solo devuelve error si el campo está `touched`, `aria-invalid` y `aria-describedby`, `role="status"` para el éxito, `novalidate` y `reset()` tras el envío; 4 tests. Aclaró que "cuando deja de escribir" (debounce) no se implementa y que `touched` cubre "al salir del campo". Verificado con `npm run build` y `npm test -- --no-watch` (16 tests pasan). No se revisó visualmente en navegador al momento de escribir esto.
- **Cambié yo:** elegí los campos básicos, errores al tocar o enviar, y la solución de accesibilidad propuesta.
- **Correcciones / aprendizaje:**
  - Para añadir un campo "teléfono" mencioné el `FormControl` y el bloque HTML, pero olvidé: el tipo `Campo` (sin él no compila), la rama de `mensajeError` (si no, un error del teléfono mostraría el mensaje del correo) y que el test "tres errores al enviar vacío" pasaría a fallar al haber 4 campos obligatorios.
  - Cambiar el mínimo del mensaje de 10 a 20 solo requiere cambiar el número; el texto del error se actualiza solo.

## Etapa 10 — Contraste y rendimiento de imágenes (parte de la etapa 9 del CLAUDE.md)
- **Pedí:** revisar responsive y accesibilidad y pasar Lighthouse. Decidí no cambiar el color `acento`.
- **Propuso la IA:** calcular el contraste de la paleta (varias combinaciones no llegaban a 4.5:1). Como no cambié `acento`, se cambió el texto de los botones naranjas a un marrón oscuro (`--color-tinta`, 5.12:1), la etiqueta del hero a `amber-300`, los hover de enlaces a subrayado y las opacidades `/70` y `/80` a `/90`. También `fetchpriority="high"` en la foto del hero, reducir las imágenes del menú a 600 px (con test) y la foto del hero a 800 px (de 148 KB a 81 KB). Verificado con `npm run build` y `npm test -- --no-watch` (17 tests pasan).
- **Cambié yo:** decidí mantener el color naranja y aprobé reducir el tamaño de las imágenes. Corrí Lighthouse en DevTools (móvil) y pasé el informe: accesibilidad 100, recomendaciones 100, SEO 100; rendimiento 52, pero medido sobre `ng serve`, no sobre el sitio real.
- **Correcciones / aprendizaje:**
  - Entendí que cambió el color del texto de los botones (no del fondo) por el contraste; si lo vuelven a blanco falla la auditoría (3.19:1 frente a 4.5:1 mínimo).
  - Expliqué bien por qué el rendimiento en `ng serve` no es representativo (build de desarrollo) y que para cambiar la resolución de la foto se toca el archivo (y, si cambia la proporción, los atributos `width`/`height`).
- **Pendiente:** remedir rendimiento y CLS (0.103, atribuido a la carga de la fuente) con el sitio desplegado, en ventana de incógnito.
