export const content = `
# JPG vs PNG vs WebP — ¿Qué Formato de Imagen Deberías Usar?

Si alguna vez te has preguntado por qué existen tantos formatos de imagen — y por qué importa cuál eliges — esta guía es para ti.

La versión corta: diferentes formatos hacen diferentes compromisos entre tamaño de archivo, calidad y características como la transparencia. Elegir el incorrecto puede significar archivos innecesariamente grandes, pérdida de calidad visible o problemas de compatibilidad.

Aquí está todo lo que necesitas saber, en términos simples.

---

## Los Tres Formatos de un Vistazo

| | JPG | PNG | WebP |
|---|---|---|---|
| **Compresión** | Con pérdida | Sin pérdida | Ambas (con y sin pérdida) |
| **Transparencia** | ❌ No | ✅ Sí | ✅ Sí |
| **Tamaño de archivo** | Pequeño | Mediano–Grande | El más pequeño |
| **Ideal para** | Fotos | Gráficos, logotipos, capturas de pantalla | Imágenes web (todos los tipos) |
| **Soporte en navegadores** | Universal | Universal | Navegadores modernos (95%+) |
| **Calidad al editar** | Se degrada con cada guardado | Sin pérdida de calidad | Pérdida mínima (modo sin pérdida) |

---

## JPG (JPEG) — El Estándar para Fotografías

JPG ha sido el formato dominante para fotografías desde la década de 1990. Funciona analizando la imagen y descartando información visual que el ojo humano tiene menos probabilidades de notar — un proceso llamado **compresión con pérdida**.

### Cómo funciona la compresión JPG
Al guardar un JPG, el codificador divide la imagen en bloques de 8×8 píxeles y aplica una transformación matemática (Transformada Discreta del Coseno) a cada bloque. Los detalles de alta frecuencia (bordes nítidos, texturas finas) se reducen más agresivamente que la información de baja frecuencia (gradientes suaves, grandes áreas de color similar).

Con configuraciones de alta calidad (85–100%), este proceso es casi invisible. Con configuraciones de baja calidad (por debajo del 60%), empiezas a ver "artefactos" característicos — parches con aspecto de bloques, especialmente alrededor de bordes y texto.

### Cuándo usar JPG
- ✅ Fotografías e imágenes del mundo real
- ✅ Fotos de productos para comercio electrónico
- ✅ Imágenes que necesitas compartir por correo electrónico (tamaño de archivo pequeño)
- ✅ Donde el tamaño del archivo importa más que la calidad perfecta al píxel

### Cuándo NO usar JPG
- ❌ Imágenes con texto (los artefactos de compresión hacen que el texto se vea borroso)
- ❌ Logotipos e íconos (los bordes nítidos se vuelven borrosos)
- ❌ Imágenes con fondos transparentes
- ❌ Archivos que editarás y volverás a guardar repetidamente (la calidad se degrada cada vez)

---

## PNG — El Campeón de la Calidad y la Transparencia

PNG usa **compresión sin pérdida** — nunca se descarta información visual. Lo que metes es exactamente lo que obtienes, píxel a píxel. Esto hace que PNG sea ideal para imágenes donde la precisión importa: logotipos, capturas de pantalla, gráficos y cualquier cosa con transparencia.

### La ventaja de la transparencia
PNG admite un **canal alfa** — una cuarta capa de datos que almacena información de transparencia para cada píxel. Esto significa que partes de la imagen pueden ser completamente transparentes, completamente opacas o cualquier valor entre medias. Esto es esencial para:
- Logotipos colocados sobre fondos de diferentes colores
- Elementos de interfaz de usuario (botones, íconos)
- Pegatinas y superposiciones

JPG simplemente no puede hacer esto. Si intentas guardar una imagen transparente como JPG, las áreas transparentes se rellenan con un color sólido (generalmente blanco).

### Tamaños de archivo PNG
El costo de la calidad sin pérdida es archivos más grandes. Una fotografía PNG puede ser 3–5 veces más grande que el JPG equivalente. Para uso web, esto es una desventaja significativa para las fotos — pero perfectamente aceptable para logotipos y gráficos donde los elementos visuales son más simples y se comprimen de forma más eficiente.

### Cuándo usar PNG
- ✅ Logotipos y activos de marca
- ✅ Capturas de pantalla (especialmente con elementos de interfaz y texto)
- ✅ Imágenes que requieren transparencia
- ✅ Gráficos con colores planos, líneas nítidas o texto
- ✅ Archivos fuente que editarás repetidamente

### Cuándo NO usar PNG
- ❌ Fotografías en páginas web (demasiado grandes, usa JPG o WebP)
- ❌ Cuando el tamaño del archivo es la prioridad principal

---

## WebP — El Formato Web Moderno

WebP fue desarrollado por Google y lanzado en 2010. Está diseñado para ser lo mejor de ambos mundos: archivos más pequeños que JPG y PNG, mientras admite transparencia y ofrece modos con y sin pérdida.

### La ventaja del tamaño
WebP típicamente produce:
- Archivos **25–35% más pequeños** que el JPG de calidad equivalente
- Archivos **26% más pequeños** que el PNG equivalente

Eso es un ahorro significativo de ancho de banda para los sitios web, donde la velocidad de carga de imágenes afecta directamente la experiencia del usuario y los rankings en motores de búsqueda.

### Compatibilidad
WebP ahora es compatible con todos los principales navegadores modernos: Chrome, Firefox, Safari (desde 2020), Edge y Opera. A partir de 2024, el soporte en navegadores supera el 95% a nivel global. Sin embargo, algunos software y plataformas más antiguas no lo admiten — en particular, clientes de correo electrónico antiguos y algunos editores de imágenes.

### Cuándo usar WebP
- ✅ Imágenes web donde el rendimiento importa
- ✅ Cuando quieres máxima compresión con mínima pérdida de calidad
- ✅ Imágenes con transparencia que necesitan cargarse rápido
- ✅ Cualquier escenario donde JPG o PNG funcionarían pero quieres un archivo más pequeño

### Cuándo NO usar WebP
- ❌ Cuando la plataforma de destino tiene soporte limitado de WebP (ej., clientes de correo electrónico antiguos)
- ❌ Cuando se requiere compatibilidad con software más antiguo
- ❌ Al editar en aplicaciones que no admiten WebP

---

## Comparación Real de Tamaños de Archivo

Aquí hay un ejemplo típico con una fotografía de 2000×1500 px:

| Formato | Configuración | Tamaño de Archivo |
|---|---|---|
| PNG (sin pérdida) | — | ~8.5 MB |
| JPG | 90% de calidad | ~1.8 MB |
| JPG | 80% de calidad | ~1.1 MB |
| WebP | 80% de calidad | ~780 KB |
| WebP | Sin pérdida | ~6.2 MB |

Para una foto, WebP al 80% de calidad ofrece el mejor equilibrio — calidad visual similar al JPG al 80% pero aproximadamente un 30% más pequeño.

---

## GIF y BMP — Una Nota Rápida

Ocasionalmente encontrarás otros dos formatos:

**GIF** — Admite animación (de ahí su popularidad para memes y reacciones). Limitado a 256 colores, lo que lo hace inadecuado para fotografías. Para imágenes estáticas, PNG siempre es mejor. Para animaciones, considera WebP (que admite animación) o formatos de video.

**BMP** — Un formato de Windows sin comprimir. Los archivos son enormes (un BMP de 1920×1080 típicamente pesa más de 6 MB). Casi no hay razón para usar BMP para nada más que aplicaciones heredadas de Windows.

---

## Guía Rápida de Decisión

**¿Es una fotografía?** → Usa **JPG** (o WebP si la plataforma lo admite)

**¿Necesita un fondo transparente?** → Usa **PNG** (o WebP)

**¿Es un logotipo, ícono o captura de pantalla?** → Usa **PNG**

**¿Va en un sitio web y quieres el archivo más pequeño posible?** → Usa **WebP**

**¿Lo editarás nuevamente después?** → Usa **PNG** (para evitar pérdida de calidad al volver a guardar)

**¿Necesita funcionar en todos los clientes de correo electrónico y software antiguo?** → Usa **JPG** o **PNG**

---

## Conversión Entre Formatos

¿Necesitas cambiar una imagen de un formato a otro? [La herramienta de Conversión a JPG de NanoImage](https://nanoimage.net/convert-to-jpg) maneja conversiones de PNG, WebP, GIF y BMP → JPG instantáneamente en tu navegador.

---

## Herramientas Relacionadas

- **[Comprimir Imagen](https://nanoimage.net/compress-image)** — Reduce el tamaño del archivo JPG o PNG sin cambiar de formato
- **[Convertir a JPG](https://nanoimage.net/convert-to-jpg)** — Convierte PNG, WebP, GIF, BMP a JPG
- **[Redimensionar Imagen](https://nanoimage.net/resize-image)** — Cambia las dimensiones de la imagen
`;
