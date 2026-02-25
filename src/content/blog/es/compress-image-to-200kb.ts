export const content = `
Muchos sitios web, aplicaciones y plataformas de correo electrónico tienen límites estrictos de tamaño de archivo. Una foto de perfil debe pesar menos de 100KB. Un archivo adjunto no puede superar los 200KB. Tu foto pesa 3MB y no sabes qué hacer.

Esta guía te muestra las formas más fáciles de comprimir una imagen a 200KB — sin instalar ningún software y sin enviar tu foto al servidor de un desconocido.

## ¿Por qué los archivos deben pesar menos de 200KB?

Los límites de tamaño existen por cuestiones de ancho de banda, almacenamiento y velocidad de carga. Estas son las situaciones más comunes donde te encontrarás con estos límites:

- **Formularios gubernamentales y de visa** — muchos requieren fotos de menos de 200KB o incluso 50KB
- **Portales de empleo** — la subida de fotos para el currículum suele tener límites muy ajustados
- **Correo electrónico** — algunos sistemas corporativos bloquean archivos adjuntos grandes
- **WhatsApp y apps de mensajería** — las imágenes se comprimen automáticamente, pero a veces necesitas un tamaño específico
- **Subidas a sitios web** — fotos de perfil, imágenes de productos, avatares

Lo frustrante es que las cámaras modernas de los teléfonos producen imágenes de 3MB a 10MB. Una sola foto de un iPhone puede pesar 8MB — eso es 40 veces más que el límite de 200KB.

## Método 1: Usa NanoImage (Gratis, sin necesidad de subir archivos)

La forma más rápida de comprimir una imagen a exactamente menos de 200KB es usar la [herramienta de compresión de NanoImage](/compress-image).

**¿Por qué NanoImage es diferente?** La mayoría de los compresores en línea suben tu imagen a sus servidores, la procesan y luego te la devuelven. Tu foto pasa por la computadora de una empresa que no conoces. NanoImage procesa todo directamente en tu navegador — tu imagen nunca sale de tu dispositivo.

**Pasos:**

1. Ve a [nanoimage.net/compress-image](/compress-image)
2. Haz clic en **Subir imagen** o arrastra y suelta tu foto
3. La herramienta encuentra automáticamente la mejor compresión para que quede por debajo de 200KB
4. Haz clic en **Descargar** para guardar tu imagen comprimida

Eso es todo. No necesitas cuenta, no se añade marca de agua, completamente gratis.

**¿Qué formatos de archivo son compatibles?** JPG, PNG, WebP y GIF.

## Método 2: Ajustar el tamaño manualmente

Si necesitas un tamaño objetivo diferente a 200KB, puedes ajustar manualmente el control de calidad en la mayoría de las herramientas de compresión.

Algunas cosas que debes saber:

- **La compresión JPEG** funciona reduciendo detalles en áreas donde el ojo humano es menos sensible. Al 80% de calidad, la mayoría de las personas no notan la diferencia con el original. Al 60%, podrías empezar a ver algo de borrosidad en zonas detalladas.
- **Los archivos PNG** son sin pérdida por defecto. Convertir un PNG a JPG antes de comprimir generalmente te dará un archivo mucho más pequeño.
- **La resolución también importa.** Una imagen de 4000×3000 píxeles siempre pesará más que una de 1200×900 a la misma calidad. Si solo necesitas la imagen para pantalla (no para impresión), reducir las dimensiones primero es muy efectivo.

## Método 3: Reduce las dimensiones primero, luego comprime

A veces, el enfoque más efectivo es redimensionar la imagen antes de comprimirla.

Para la mayoría de usos en pantalla, una imagen no necesita tener más de 1200 píxeles de ancho. Si tu original tiene 4000 píxeles de ancho, redimensionarlo a 1200 píxeles reducirá el tamaño del archivo aproximadamente un 90% antes de aplicar cualquier compresión.

Puedes hacerlo en dos pasos con NanoImage:

1. Primero usa la [herramienta de Redimensionar](/resize-image) para reducir las dimensiones
2. Luego usa la [herramienta de Comprimir](/compress-image) para alcanzar tu tamaño objetivo

## ¿Qué pasa con la calidad de imagen al comprimir?

Esta es la preocupación más común. La respuesta corta: **para uso cotidiano, no notarás la diferencia.**

Esto es lo que realmente cambia:

- Los detalles muy finos (como la textura de una tela o las hojas individuales de un árbol) se suavizan ligeramente
- Las áreas planas de color (como un cielo azul o un fondo blanco) apenas se ven afectadas
- En fotos de retrato, los tonos de piel y los rostros generalmente se ven bien incluso con niveles de compresión bastante altos

Una foto comprimida a 200KB desde 5MB se verá prácticamente idéntica en la pantalla de un teléfono o en una página web. Solo se notaría la diferencia si hicieras zoom muy de cerca o la imprimieras en gran formato.

## Consejos para obtener el menor tamaño de archivo

- **Usa JPG en vez de PNG** para fotografías. PNG es mejor para gráficos con texto o fondos transparentes. Para fotos, JPG es casi siempre más pequeño con calidad similar.
- **Elimina los metadatos (datos EXIF).** Tu cámara incorpora la ubicación GPS, información del dispositivo y ajustes de la cámara en cada foto. Eliminar estos datos puede ahorrarte entre 10 y 50KB en algunas imágenes.
- **Redimensiona antes de comprimir.** Si la imagen se va a mostrar a 400×400 píxeles en pantalla, no necesita ser de 3000×3000 píxeles.

## Preguntas frecuentes

**¿Comprimir a 200KB dañará mi foto original?**
No. NanoImage descarga una nueva copia comprimida. Tu archivo original en tu dispositivo queda intacto.

**¿Qué pasa si mi imagen sigue siendo demasiado grande después de la compresión máxima?**
Si la imagen sigue superando los 200KB a la calidad mínima, es que la imagen es demasiado grande en dimensiones. Usa la [herramienta de Redimensionar](/resize-image) para reducir las dimensiones en píxeles primero, y luego comprime de nuevo.

**¿Es seguro comprimir fotos sensibles en línea?**
Con NanoImage, sí — porque tu imagen nunca sale de tu navegador. Con otras herramientas que suben archivos a un servidor, estás confiando en esa empresa con tus datos. Siempre revisa la política de privacidad de una herramienta antes de subir archivos sensibles.

**¿Puedo comprimir varias imágenes a la vez?**
La compresión por lotes está en la hoja de ruta de NanoImage. Actualmente, las imágenes se procesan de una en una.

## Resumen

Comprimir una imagen a 200KB es sencillo cuando conoces la herramienta adecuada. Los puntos clave:

- Usa una herramienta basada en el navegador como NanoImage para mantener tus imágenes privadas
- Para fotos grandes, redimensiona las dimensiones antes de comprimir
- El formato JPG ofrece los tamaños de archivo más pequeños para fotografías
- La calidad a 200KB es más que suficiente para la web, correo electrónico y la mayoría de formularios
`;
