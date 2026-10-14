# Respuestas — Preguntas conceptuales

Respuestas breves (2–5 líneas por pregunta). Partieron de un borrador de la IA, revisado y ajustado por mí (ver `docs/AI_LOG.md`).

## 1. CSR, SSR y SSG

**Pregunta:** Explica con un ejemplo la diferencia entre renderizado en el cliente (CSR), del lado del servidor (SSR) y sitios estáticos (SSG). ¿Para un sitio corporativo informativo cuál elegirías y por qué?

**Respuesta:**

En CSR el servidor manda un HTML casi vacío y JavaScript, y el navegador arma el menú (mi landing en Angular funciona así). En SSR el servidor arma el HTML completo en cada visita, útil cuando el contenido cambia seguido o depende del usuario. En SSG el HTML se genera una sola vez en el build y se sirve como archivos ya hechos. Para un sitio corporativo informativo elegiría SSG: el contenido casi no cambia, carga más rápido, es barato de hospedar y favorece el SEO.

## 2. Astro, Next.js y Svelte

**Pregunta:** Astro, Next.js y Svelte: elige uno con el que te sientas más cómodo y di en qué proyecto real lo usarías frente a los otros dos.

**Respuesta:**

Elegiría Astro. Está pensado para sitios de contenido: genera HTML estático, envía muy poco JavaScript y permite usar componentes de otros frameworks. Lo usaría en un sitio corporativo, un blog o una landing. Next.js lo reservaría para aplicaciones complejas con login o datos que cambian mucho, y Svelte para interfaces interactivas y ligeras. Aún no lo he usado a fondo, así que lo elijo por su enfoque y no por experiencia.

## 3. CMS (WordPress) o sitio a medida

**Pregunta:** ¿Cuándo recomendarías un CMS como WordPress y cuándo un sitio hecho a medida? Menciona una ventaja y una desventaja de cada camino.

**Respuesta:**

Decidiría según el tiempo disponible, el presupuesto y si el cliente quiere editar el contenido por su cuenta. WordPress: ventaja, el cliente edita solo y se lanza rápido; desventaja, hay que mantener plugins y actualizaciones, que pueden afectar la seguridad y el rendimiento. A medida: ventaja, control total y mejor rendimiento; desventaja, cuesta más tiempo y dinero, y el cliente depende del desarrollador para cada cambio.

## 4. Shopify o Magento

**Pregunta:** Para una tienda en línea, ¿qué preguntas le harías al cliente antes de decidir entre Shopify y Magento?

**Respuesta:**

Shopify es un servicio alojado, rápido de lanzar y con suscripción mensual; Magento se instala y hospeda uno mismo, es muy personalizable y se usa en catálogos grandes o complejos, pero exige más equipo técnico y presupuesto. Le preguntaría al cliente: cuántos productos tiene y cuánto crecerá, qué presupuesto tiene (inicial y mensual), si cuenta con equipo técnico para mantener la tienda, si necesita funciones muy específicas (varias tiendas, idiomas, precios por cliente), qué pasarelas de pago e integraciones requiere y en cuánto tiempo quiere lanzar.

## 5. De mi computadora a producción con Git y GitHub

**Pregunta:** Describe, paso a paso y con tus palabras, cómo llevarías un cambio de código desde tu computadora hasta producción usando Git y GitHub. Menciona ramas (branches) y Pull Requests.

**Respuesta:**

Primero actualizo main y creo una rama para el cambio (git switch -c feat/menu) para no tocar lo estable. Hago commits pequeños con mensajes claros y subo la rama a GitHub (git push). Ahí abro un Pull Request hacia main, que es la propuesta para unir mi rama y donde se revisa el código (Vercel o Cloudflare pueden generar una vista previa). Con la revisión aprobada hago el merge a main, lo que dispara el despliegue a producción. Al final borro la rama y actualizo mi main local.

## 6. Qué es un "build"

**Pregunta:** ¿Qué es un "build" y qué crees que pasa cuando conectas un repositorio de GitHub a un servicio como Vercel o Cloudflare Pages?

**Respuesta:**

El build es el proceso que convierte mi código fuente (TypeScript, plantillas, Tailwind) en archivos optimizados y listos para el navegador: junta solo el código que se usa y lo minifica, dejando el resultado en una carpeta (en Angular, dist/). Al conectar un repositorio a Vercel o Cloudflare Pages, creo que cada push hace que el servicio clone el repo, instale las dependencias, ejecute el build y publique esa carpeta con una URL pública; con cada nuevo push se repite.

## 7. Landing rápida y bien posicionada

**Pregunta:** Menciona 3 cosas que cuidarías para que una landing page cargue rápido y posicione bien (SEO/rendimiento).

**Respuesta:**

1) Imágenes optimizadas: tamaño adecuado, width y height definidos y loading="lazy" (menos la del hero). 2) HTML semántico y metadatos: un solo h1, title y description, alt en las imágenes y lang="es". 3) Poco JavaScript y CSS: sin librerías pesadas y con el build minificando. Mediría el resultado con Lighthouse.

## 8. Una tecnología que aún no domino

**Pregunta:** Cuéntanos de una tecnología que aún no dominas. ¿Cómo aprenderías a usarla si empezaras la próxima semana?

**Respuesta:**

Magento (Adobe Commerce): solo he trabajado con Shopify, así que no conozco a fondo en qué se diferencian. Si empezara la próxima semana, leería la documentación oficial y levantaría una instalación local de prueba; haría un tutorial para crear productos y un tema sencillo; y luego un mini proyecto comparándolo con mi experiencia en Shopify. Como Magento usa PHP, también repasaría lo básico de PHP, practicando un poco cada día.
