export const content = `
# WebP vs JPG vs PNG vs GIF: ¿Qué formato de imagen deberías usar?

¿Alguna vez te has preguntado por qué existen tantos formatos de imagen y cuál deberías usar realmente? Esta guía cubre todo lo que necesitas saber. Compararemos los cuatro formatos principales, explicaremos sus ventajas e inconvenientes, y te daremos un marco de decisión sencillo.

---

## Los cuatro formatos de un vistazo

| | JPG | PNG | WebP | GIF |
|---|---|---|---|---|
| **Compresión** | Con pérdida | Sin pérdida | Ambas | Sin pérdida (limitada) |
| **Transparencia** | ❌ No | ✅ Sí | ✅ Sí | ✅ Solo 1 bit |
| **Animación** | ❌ | ❌ | ✅ | ✅ |
| **Tamaño de archivo** | Pequeño | Mediano–Grande | El más pequeño | Grande |
| **Ideal para** | Fotos | Logos, capturas | Imágenes web (todos los tipos) | Animaciones simples |
| **Soporte en navegadores** | Universal | Universal | 95%+ | Universal |

---

## JPG — El estándar para fotografías

JPG ha sido el formato dominante para fotografías desde los años 90. Utiliza **compresión con pérdida**: descarta datos visuales que el ojo humano tiene menos probabilidades de notar.

**Cómo funciona:** JPG divide la imagen en bloques de 8×8 píxeles y aplica compresión matemática. Los detalles de alta frecuencia (bordes nítidos, texturas finas) se reducen con más agresividad que las áreas suaves. Con configuraciones de alta calidad (85–100%), la compresión es prácticamente invisible. Por debajo del 60%, aparecen los característicos "artefactos" en forma de bloques.

**Usa JPG cuando:**
- ✅ Fotografías e imágenes del mundo real
- ✅ Fotos de productos para e-commerce
- ✅ El tamaño del archivo importa y no necesitas transparencia
- ✅ Archivos adjuntos de correo electrónico (archivo ligero)

**Evita JPG cuando:**
- ❌ Imágenes con texto (los artefactos difuminan el texto)
- ❌ Logos e iconos (los bordes nítidos se pixelan)
- ❌ Imágenes con fondos transparentes
- ❌ Archivos que editarás y guardarás repetidamente (la calidad se degrada en cada guardado)

---

## PNG — Calidad y transparencia

PNG utiliza **compresión sin pérdida**: no se descarta ninguna información visual. Lo que entra, sale con píxeles perfectos.

**La ventaja de la transparencia:** PNG admite canal alfa: cada píxel puede ser completamente transparente, completamente opaco o cualquier valor intermedio. Esto es esencial para logos sobre diferentes fondos, elementos de interfaz y stickers. JPG simplemente no puede almacenar transparencia; las áreas transparentes se convierten en blanco sólido.

**El compromiso en tamaño:** Una fotografía en PNG suele ser entre 3 y 5 veces más grande que su equivalente en JPG. Para fotos web, es una desventaja. Para logos y gráficos con colores planos, PNG comprime eficientemente y sigue siendo la opción correcta.

**Usa PNG cuando:**
- ✅ Logos y activos de marca
- ✅ Capturas de pantalla con texto o elementos de interfaz
- ✅ Cualquier imagen que requiera transparencia
- ✅ Gráficos con colores planos o líneas nítidas
- ✅ Archivos fuente que editarás repetidamente

**Evita PNG cuando:**
- ❌ Fotografías mostradas en páginas web (tamaño de archivo demasiado grande)
- ❌ El tamaño del archivo es la prioridad máxima

---

## WebP — El formato moderno para la web

WebP fue desarrollado por Google (lanzado en 2010) para ser lo mejor de ambos mundos: más pequeño que JPG y PNG, con soporte para transparencia, modos con y sin pérdida, e incluso animación.

**La ventaja en tamaño:**
- **25–35% más pequeño** que un JPG de calidad equivalente
- **26% más pequeño** que un PNG equivalente

Este ahorro de ancho de banda tiene un impacto directo en la velocidad de carga y el SEO.

**Comparación real de tamaños de archivo** (fotografía de 2000×1500px):

| Formato | Configuración | Tamaño |
|---|---|---|
| PNG (sin pérdida) | — | ~8,5 MB |
| JPG | Calidad 90% | ~1,8 MB |
| JPG | Calidad 80% | ~1,1 MB |
| WebP | Calidad 80% (con pérdida) | ~780 KB |
| WebP | Sin pérdida | ~6,2 MB |

**Soporte en navegadores:** Chrome, Firefox, Safari (desde 2020), Edge, Opera — más del 95% a nivel global en 2026. Las principales brechas son los clientes de correo heredados y software muy antiguo.

**Usa WebP cuando:**
- ✅ Cualquier imagen en un sitio web o app web
- ✅ Máxima compresión con mínima pérdida de calidad visible
- ✅ Imágenes transparentes que necesiten cargar rápido
- ✅ Cualquier escenario donde JPG o PNG funcionarían pero quieres un archivo más pequeño

**Evita WebP cuando:**
- ❌ Campañas de email (la mayoría de clientes no lo soportan — usa JPG/PNG)
- ❌ Compartir con usuarios en software antiguo
- ❌ Enviar a servicios de impresión (usa TIFF o JPG/PNG de alta calidad)

---

## GIF — Animaciones y sus limitaciones

GIF ha sido el formato de animación de internet desde 1987, y su papel cultural en memes y reacciones lo mantiene vivo. Pero sus limitaciones técnicas son importantes:

**Los problemas del GIF:**
- **Límite de 256 colores** — las fotos quedan horribles; aparecen bandas y tramado
- **Tamaños de archivo enormes** — un GIF de 5 segundos a 480p puede pesar entre 5 y 20 MB; el mismo clip en MP4 podría ser de 500 KB
- **Sin audio**
- **Compresión primitiva** — el algoritmo LZW de GIF es mucho menos eficiente que los códecs modernos

**Por qué persiste el GIF:** Compatibilidad universal, reproducción automática sin interacción del usuario, y su arraigo cultural en el contenido de memes y reacciones.

**Para imágenes estáticas, PNG siempre es mejor que GIF.** Para animaciones, considera:
- **WebP animado** — entre un 64 y un 70% más pequeño que GIF, con los 16,7M colores completos y transparencia total. Úsalo cuando controles el entorno de visualización y puedas confirmar el soporte de animación WebP.
- **Video MP4** — más del 90% más pequeño que GIF, calidad completa, admite audio. Ideal para web (`<video autoplay muted loop>`), redes sociales y cualquier contenido de más de 3–4 segundos.

**Usa GIF cuando:**
- ✅ Se requiere máxima compatibilidad (clientes de correo antiguos, plataformas heredadas)
- ✅ La animación es muy simple (2–4 colores, movimiento básico)
- ✅ La plataforma requiere específicamente formato GIF
- ✅ Crear contenido de memes o reacciones para compartir en redes sociales

---

## Marco de decisión de formato

**¿Es una fotografía para la web?** → **WebP** (o JPG si WebP no está soportado)

**¿Necesita transparencia?** → **PNG** (o WebP para archivos más pequeños en plataformas modernas)

**¿Es un logo, icono o captura de pantalla?** → **PNG**

**¿Va en un email?** → **JPG** o **PNG** (no WebP, no GIF animado para imágenes complejas)

**¿Necesitas animación?** → **Video MP4** (mejor calidad/tamaño), **WebP animado** (navegadores modernos) o **GIF** (máxima compatibilidad)

**¿Lo editarás de nuevo más adelante?** → **PNG** (sin pérdida, sin degradación de calidad al volver a guardar)

**¿Necesita funcionar en software antiguo?** → **JPG** o **PNG**

---

## Conversión entre formatos

¿Necesitas cambiar una imagen de un formato a otro? La [herramienta Convert to JPG de NanoImage](/convert-to-jpg/) convierte instantáneamente PNG, WebP, GIF y BMP a JPG en tu navegador, sin necesidad de subir archivos.

---

## Preguntas frecuentes

**¿Tiene WebP mejor calidad que JPG?**
Con el mismo tamaño de archivo, sí: WebP conserva más detalle. Con la misma configuración de calidad, WebP produce un archivo más pequeño. El techo de calidad visual de ambos formatos es similar.

**¿Reemplazará WebP a JPG y PNG?**
WebP está ganando terreno, pero JPG y PNG siguen siendo dominantes por su compatibilidad universal. Un formato más reciente, AVIF, ofrece una compresión aún mejor que WebP y está creciendo en adopción.

**¿Por qué las imágenes de los sitios web se guardan como WebP?**
Los sitios web sirven WebP a los navegadores modernos por rendimiento. Cuando guardas una imagen de una página web, se guarda en el formato que el sitio sirvió, que cada vez más es WebP. Puedes convertirla a JPG usando [NanoImage](/convert-to-jpg/) si lo necesitas.

**¿Desaparecerá el GIF algún día?**
Probablemente no del todo. Su papel cultural en memes y reacciones está demasiado arraigado. Pero para casos de uso técnicos (rendimiento web, animación profesional), ya está siendo reemplazado por video y formatos modernos.

---

## Herramientas relacionadas

- **[Comprimir imagen](/compress-image/)** — Reduce el tamaño de archivos JPG o PNG sin cambiar de formato
- **[Convertir a JPG](/convert-to-jpg/)** — Convierte PNG, WebP, GIF, BMP a JPG al instante
- **[Redimensionar imagen](/resize-image/)** — Cambia las dimensiones de la imagen para cualquier plataforma
`;
