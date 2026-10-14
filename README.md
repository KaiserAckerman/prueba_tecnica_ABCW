# Tostadero Brisa

Landing de una cafetería de especialidad ficticia, hecha como prueba técnica para Desarrollador Front-End Jr.

- **Sitio desplegado:** https://prueba-tecnica-abcw.vercel.app/
- **Repositorio:** https://github.com/KaiserAckerman/prueba_tecnica_ABCW

Todo el contenido (nombre, testimonios, textos) es ficticio.

## Qué incluye

- Header con menú móvil, hero con llamada a la acción, características, menú de bebidas, testimonios, preguntas frecuentes en acordeón, formulario de contacto y footer.
- El menú se carga desde una API pública (Sample APIs — Coffee), filtra registros inválidos y muestra estados de carga, error y vacío. Si la API falla, usa un JSON local de respaldo.
- Formulario con Reactive Forms: campos obligatorios, correo con formato válido y mensajes de error accesibles. El envío es simulado, sin backend.

## Tecnologías

- Angular 21 (componentes standalone, señales, Reactive Forms, `HttpClient`)
- Tailwind CSS 4 (colores y fuentes como tokens en `src/styles.css`)
- Vitest (tests con `ng test`)
- Despliegue en Vercel

## Cómo correrlo

Requisitos: Node.js 20 o superior y npm.

```bash
git clone https://github.com/KaiserAckerman/prueba_tecnica_ABCW.git
cd prueba_tecnica_ABCW
npm install
npm start
```

Abre `http://localhost:4200/`. La página se recarga sola al guardar cambios.

Otros comandos:

```bash
npm test -- --no-watch   # corre los tests una vez
npm run build            # build de producción en dist/prueba_tecnica_ABCW/browser
```

## Estructura

```
src/app/
  header/        logo, navegación y menú móvil
  hero/          título y botones de acción
  features/      características
  menu/          bebidas desde la API (servicio + componente)
  testimonials/  testimonios
  faq/           acordeón
  contact-form/  formulario con validación
  footer/
public/
  images/        foto del hero e imagen de reemplazo
  menu-respaldo.json   menú local si la API falla
docs/
  AI_LOG.md      registro del uso de IA durante el desarrollo
```

## Decisiones técnicas

- **Angular 21 con componentes standalone y señales.** Es el framework con el que me siento más seguro. Cada sección es un componente en su carpeta, y la interactividad (menú móvil, acordeón del FAQ) se maneja con señales y `@if`/`@for`, sin librerías extra.
- **Sin SSR ni manejo de estado.** La landing es pequeña y no lo necesita; la contrapartida es que se renderiza en el cliente (CSR). Para un sitio puramente informativo, Astro o SSG sería una mejor opción.
- **Tailwind 4 con tokens.** Colores y fuentes están definidos una sola vez en `src/styles.css` (`@theme`) y el resto son clases en el HTML. Elegí una paleta de café (crema, tostado, acento naranja, tinta) y las fuentes Fraunces (títulos) e Inter (texto).
- **Menú desde una API pública.** La API es editable por cualquiera y trae registros inválidos, así que el servicio los filtra (título y descripción de texto, ingredientes como lista, imagen no vacía, sin "test"), limita a 8 bebidas y pide las fotos a 600 px. La página no se rompe: hay esqueleto de carga, mensaje de error con "Reintentar", mensaje de lista vacía y un JSON local de respaldo que solo se usa si la API falla.
- **Formulario con Reactive Forms.** Campos obligatorios, correo con punto en el dominio y errores que aparecen al salir del campo o al enviar. Son accesibles (`aria-invalid`, `aria-describedby`, `role="status"` en el éxito). El envío es simulado. La newsletter del footer usa la validación nativa del navegador para no duplicar lógica.
- **Accesibilidad y rendimiento.** Revisé el contraste con cálculo (WCAG AA); como mantuve el naranja de la marca, el texto de los botones es marrón oscuro en vez de blanco. El texto en inglés de la API lleva `lang="en"` y el scroll suave respeta "reducir movimiento". Reduje el peso de las imágenes y mido con Lighthouse sobre el sitio desplegado, no sobre `ng serve`.
- **Despliegue en Vercel.** Cada push a `main` publica una nueva versión; la carpeta de salida es `dist/prueba_tecnica_ABCW/browser`.

## Reto enfrentado

El mayor reto fue que la API del menú es pública y editable: tenía registros con datos basura (títulos como "test" o "string", ingredientes como texto en vez de lista, imágenes vacías). Si los mostraba tal cual, la landing se veía rota. Lo resolví filtrando en el servicio y cubriendo los casos con tests; también tuve que contemplar qué pasa si la API falla o devuelve una lista vacía, y distinguir ambas situaciones.

Un segundo reto fue Lighthouse: el rendimiento marcó 52 al medirlo sobre `ng serve` (una build de desarrollo, no representativa). Al medir sobre producción apareció un desplazamiento de diseño (CLS) en la imagen del hero, causado por la proporción que se reserva antes de que cargue el CSS, y un `robots.txt` ausente. Corregí ambos; falta remedir en una ventana limpia para confirmar la mejora.

## Cómo usé IA

Trabajé con Claude Code dentro del repositorio, por etapas pequeñas (limpieza, header, hero, características, menú, testimonios, FAQ, formulario, accesibilidad, despliegue). Antes de cada etapa la IA explicaba el enfoque y yo decidía; después hacíamos un commit con mensaje claro, y ella anotaba lo ocurrido en [`docs/AI_LOG.md`](docs/AI_LOG.md): qué pedí, qué propuso y qué cambié yo, incluidas las correcciones.

- **Qué le dejé hacer:** proponer la estructura, escribir el código base y los tests, calcular el contraste de colores y revisar los informes de Lighthouse.
- **Qué decidí yo:** el tema, la paleta y las fuentes, los datos a mostrar del menú, no cambiar el color de acento y el contenido ficticio.
- **Dónde hubo errores:** el registro incluye los míos (por ejemplo, creer que `lang="en"` traduce solo) y uno de la IA: afirmó primero que los atributos de la imagen del hero estaban mal, y al revisar el archivo resultó que la causa era otra.
- **Cómo lo verifiqué:** con `npm run build`, `npm test` y revisando el sitio desplegado, no por lo que la IA afirmara.

Los borradores de "Decisiones técnicas", "Reto enfrentado" y esta sección los redactó la IA a partir de lo que hicimos y del AI_LOG. Las respuestas de `RESPUESTAS.md` también partieron de un borrador de la IA, que luego revisé y ajusté (ver el AI_LOG).

## Créditos

- Datos del menú: [Sample APIs — Coffee](https://api.sampleapis.com/coffee/hot).
- Fotos: [Unsplash](https://unsplash.com).
- Tipografías: Fraunces e Inter, de Google Fonts.
