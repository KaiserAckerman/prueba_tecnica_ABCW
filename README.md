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

_(pendiente)_

## Reto enfrentado

_(pendiente)_

## Cómo usé IA

_(pendiente)_

## Créditos

- Datos del menú: [Sample APIs — Coffee](https://api.sampleapis.com/coffee/hot).
- Fotos: [Unsplash](https://unsplash.com). _(pendiente: nombre del fotógrafo de la foto del hero)_
- Tipografías: Fraunces e Inter, de Google Fonts.
