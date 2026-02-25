export const content = `
Cada plataforma tiene diferentes requisitos para las imágenes. WhatsApp comprime las fotos automáticamente, pero a menudo las deja borrosas. Los archivos adjuntos de correo electrónico se bloquean si son demasiado grandes. Instagram recorta tu foto si las dimensiones no son correctas.

Esta guía te da los tamaños exactos que necesitas para cada plataforma — y cómo redimensionar tus imágenes rápidamente sin instalar ningún software.

## ¿Por qué importa redimensionar?

La cámara de tu teléfono toma fotos a 12 megapíxeles o más. Eso produce un archivo de 3,000 × 4,000 píxeles o más — mucho más de lo que cualquier pantalla de teléfono o plataforma de redes sociales realmente muestra.

Enviar imágenes demasiado grandes causa varios problemas:
- **WhatsApp** las recomprime y las deja borrosas
- **El correo electrónico** puede bloquear archivos adjuntos que superen cierto tamaño
- **Instagram** puede recortarlas si la proporción no es la correcta
- **Los sitios web** cargan lento si las imágenes son demasiado grandes

Redimensionar antes de enviar te da control sobre exactamente lo que el destinatario ve.

## Tamaños de imagen recomendados por plataforma

### WhatsApp

| Uso | Tamaño recomendado |
|-----|-------------------|
| Foto de perfil | 500 × 500 px |
| Foto compartida (mejor calidad) | 1600 × 1200 px máx. |
| Imagen como documento | Menos de 5MB |

**El problema con WhatsApp:** Cuando envías una foto normalmente, WhatsApp la comprime automáticamente para ahorrar ancho de banda — a veces reduciendo la calidad significativamente. Para enviar una foto a calidad completa, usa la opción "Documento" en vez de compartir como foto estándar. Pero aún así, mantener las imágenes por debajo de 2MB es buena práctica.

**Mejor enfoque:** Redimensiona a 1600px en el lado más largo antes de enviar. Esto preserva la calidad visible y evita una recompresión agresiva.

### Correo electrónico

| Uso | Tamaño recomendado |
|-----|-------------------|
| Imagen en el cuerpo del correo | 600–800px de ancho |
| Archivo adjunto (general) | Menos de 1MB por imagen |
| Perfil / avatar | 400 × 400 px |

**El problema con el correo electrónico:** Los servidores corporativos suelen tener límites de 10–25MB en total para archivos adjuntos. Si envías varias fotos de 5MB cada una, alcanzarás el límite rápido. Redimensionar las imágenes a menos de 500KB cada una te permite enviar más de 20 fotos en un solo correo.

**Mejor enfoque:** Redimensiona a un máximo de 1200px de ancho y luego comprime. Para una sola foto que necesite verse bien, 1200px de ancho con compresión moderada suele quedar por debajo de 300KB.

### Instagram

| Formato | Tamaño recomendado | Proporción |
|---------|-------------------|------------|
| Publicación cuadrada | 1080 × 1080 px | 1:1 |
| Publicación vertical | 1080 × 1350 px | 4:5 |
| Publicación horizontal | 1080 × 566 px | 1.91:1 |
| Historia / Reel | 1080 × 1920 px | 9:16 |

**El problema con Instagram:** Si tu imagen no coincide con una de las proporciones compatibles, Instagram agregará bordes blancos o la recortará automáticamente. Ninguna de las dos opciones se ve bien.

**Mejor enfoque:** Redimensiona a exactamente 1080px de ancho con la altura correcta para tu formato. Usa la [herramienta de Redimensionar de NanoImage](/resize-image) para establecer dimensiones exactas en píxeles.

### Otras plataformas comunes

| Plataforma | Foto de perfil | Imagen compartida |
|------------|---------------|------------------|
| Facebook | 170 × 170 px | 1200 × 630 px (vista previa de enlace) |
| Twitter/X | 400 × 400 px | 1200 × 675 px |
| LinkedIn | 400 × 400 px | 1200 × 627 px |
| Miniatura de YouTube | 1280 × 720 px | — |

## Cómo redimensionar una imagen en 3 pasos (sin software)

1. **Ve a la [herramienta de Redimensionar de NanoImage](/resize-image)**
2. **Sube tu imagen** — arrastra y suelta o haz clic para seleccionar
3. **Ingresa las dimensiones deseadas** — establece ancho, alto o ambos. Activa "Bloquear proporción" para evitar que la imagen se deforme.
4. **Descarga** tu imagen redimensionada

Tu imagen se procesa completamente en tu navegador. Nada se sube a ningún servidor.

## Redimensionar vs. Comprimir — ¿Cuál es la diferencia?

Estas dos cosas se confunden a menudo:

**Redimensionar** cambia las dimensiones en píxeles de una imagen. Una imagen de 4000×3000 redimensionada a 1200×900 tendrá menos píxeles — es una imagen físicamente más pequeña.

**Comprimir** reduce el tamaño del archivo sin necesariamente cambiar sus dimensiones en píxeles. Una imagen de 1200×900 puede comprimirse de 800KB a 200KB reduciendo la calidad JPEG.

Para la mayoría de los usos prácticos, conviene hacer **ambas cosas**: primero redimensionar a las dimensiones apropiadas y luego comprimir al tamaño de archivo adecuado.

NanoImage tiene herramientas separadas para cada una:
- [Redimensionar imagen](/resize-image) — cambiar dimensiones en píxeles
- [Comprimir imagen](/compress-image) — reducir tamaño del archivo

## Errores comunes que debes evitar

**Ampliar imágenes pequeñas.** Si tienes una imagen de 400×400 y la redimensionas a 2000×2000, no se verá más nítida — solo se verá borrosa y pixelada. Redimensionar solo funciona bien cuando haces las imágenes más pequeñas.

**Ignorar la proporción.** Forzar una foto vertical en dimensiones cuadradas la estirará o aplastará. Siempre mantén las proporciones originales a menos que intencionalmente quieras recortar.

**Redimensionar después de comprimir.** Siempre redimensiona primero, luego comprime. Si comprimes primero y luego amplías, amplificarás los artefactos de compresión.

**No guardar el original.** Siempre conserva una copia de tu imagen original en alta resolución. Una vez que redimensionas y comprimes, no puedes recuperar el detalle perdido. NanoImage nunca modifica tu original — siempre crea una nueva descarga.

## Referencia rápida: ¿Qué tamaño debo usar?

| Envías a... | Redimensiona a... |
|-------------|------------------|
| Chat de WhatsApp | 1600px de ancho |
| Correo (en el cuerpo) | 800px de ancho |
| Correo (adjunto) | 1200px de ancho + comprimir a <500KB |
| Instagram cuadrado | 1080 × 1080px |
| Historia de Instagram | 1080 × 1920px |
| Publicación en Twitter/X | 1200 × 675px |
| Publicación en LinkedIn | 1200 × 627px |
| Foto de perfil (cualquier plataforma) | 400 × 400px o 500 × 500px |

## Resumen

Redimensionar imágenes antes de compartirlas es una de las formas más simples de mejorar la calidad y evitar problemas en todas las plataformas. Los puntos clave:

- Cada plataforma tiene dimensiones ideales — usa la tabla de arriba como referencia
- Siempre redimensiona antes de comprimir, no después
- Para WhatsApp, apunta a 1600px de ancho para evitar que la recompresión automática degrade la calidad
- Para Instagram, ajusta la proporción exacta para evitar recortes
- Usa una herramienta basada en el navegador para mantener tus imágenes privadas
`;
