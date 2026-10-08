import type { CategoryHubPagesPartial } from './types'

export const esCategoryHubPages: CategoryHubPagesPartial = {
  'optimize-images': {
    seo: {
      title: 'Optimizar imágenes online – Comprimir, redimensionar y ampliar',
      description:
        'Optimiza imágenes online gratis. Comprime, redimensiona, comprime por lotes y amplía JPG, PNG, WebP y GIF directamente en tu navegador, sin registro ni subida.',
      h1: 'Optimizar imágenes online',
      hero:
        'Haz tus imágenes más pequeñas, nítidas y fáciles de compartir. Herramientas gratuitas en el navegador para comprimir, redimensionar, optimizar por lotes o ampliar sin subir tus archivos.',
    },
    introMarkdown: `## Optimiza imágenes online para sitios más rápidos, compartir más fácil y mejor calidad

La optimización de imágenes es una de las formas más sencillas de hacer el trabajo digital más rápido y fácil. Los archivos grandes ralentizan sitios web, tardan más en subirse, llenan adjuntos de correo y a menudo fallan cuando un formulario tiene un límite estricto. NanoImage ofrece un conjunto enfocado de [herramientas de optimización de imágenes](/tools/optimize-images) online gratuitas para reducir tamaño, cambiar dimensiones, comprimir varios archivos o ampliar una imagen de baja resolución directamente en tu navegador.

La categoría Optimizar imágenes está pensada para tareas cotidianas: comprimir un JPG antes de enviarlo por correo, redimensionar un PNG para un banner web, reducir un WebP para carga más rápida o ampliar una imagen pequeña para que se vea más clara en una presentación. Cada herramienta es lo bastante simple para ediciones puntuales, con controles útiles como formato de salida, calidad, dimensiones y tamaño objetivo.

Usa [Comprimir imagen online](/compress-image) cuando tu objetivo principal sea reducir el archivo. La compresión es útil para imágenes de blog, fotos de producto, formularios, subidas de documentos y recursos para redes sociales. Si necesitas cumplir un límite concreto, usa compresores de tamaño objetivo como [100 KB](/compress-image-to-100kb), [200 KB](/compress-image-to-200kb), [500 KB](/compress-image-to-500kb) o [1 MB](/compress-image-to-1mb).

Usa [Redimensionar imagen online](/resize-image) cuando las dimensiones sean el problema. Una foto del móvil puede tener 4000 píxeles de ancho, pero una miniatura web puede necesitar 1200 o menos. Redimensionar reduce mucho el tamaño manteniendo la imagen clara para su uso.

Usa [Comprimir por lotes](/batch-compress) cuando tengas varias imágenes que preparar a la vez. En lugar de subir y descargar una por una, procesa un grupo junto. Útil para vendedores de ecommerce, blogueros, diseñadores, estudiantes y quien prepare muchas fotos para publicar o compartir.

Usa [Ampliar imagen online](/upscale-image) cuando la imagen sea demasiado pequeña y deba verse más limpia a mayor tamaño. Ampliar ayuda con capturas antiguas, fotos pequeñas de producto, imágenes sociales o imágenes que deban encajar en un diseño más grande.

NanoImage se diferencia porque la optimización ocurre en tu navegador cuando es posible. Tus imágenes se procesan localmente en tu dispositivo en lugar de subirse a un servidor. Eso acelera el flujo para muchos archivos y protege fotos privadas, documentos personales, borradores de producto y trabajo de clientes.

Para el mejor resultado, elige la herramienta según el problema. Si el archivo es muy grande, comprímelo. Si el ancho o alto no encaja, redimensiona. Si hay muchos archivos, comprime por lotes. Si la imagen es muy pequeña, amplíala. También puedes combinar: redimensionar y luego comprimir; convertir a WebP y comprimir; o eliminar EXIF antes de publicar.`,
    scenarios: [
      { question: '¿Necesitas un archivo más pequeño?', toolSlug: 'compress-image' },
      { question: '¿Necesitas un límite exacto (100 KB)?', toolSlug: 'compress-image-to-100kb' },
      { question: '¿Necesitas un límite exacto (200 KB)?', toolSlug: 'compress-image-to-200kb' },
      { question: '¿Necesitas nuevas dimensiones?', toolSlug: 'resize-image' },
      { question: '¿Necesitas muchos archivos a la vez?', toolSlug: 'batch-compress' },
      { question: '¿Necesitas una imagen más grande?', toolSlug: 'upscale-image' },
    ],
    faqs: [
      { q: '¿Son gratis las herramientas de optimización de NanoImage?', a: 'Sí. Comprimir, redimensionar, comprimir por lotes y ampliar son gratis, sin registro para los flujos principales.' },
      { q: '¿Comprimir o redimensionar primero?', a: 'Redimensiona primero si las dimensiones no encajan en la plataforma. Comprime si el archivo es demasiado grande. Muchos flujos combinan ambos pasos.' },
      { q: '¿La compresión reduce la calidad visible?', a: 'Con ajustes razonables (a menudo 80–92 en JPG/WebP), las fotos suelen verse casi idénticas mientras el tamaño baja mucho.' },
      { q: '¿Se suben mis archivos a vuestro servidor?', a: 'NanoImage procesa imágenes en tu navegador cuando está soportado. Tus archivos permanecen en tu dispositivo durante la optimización.' },
      { q: '¿Qué formato es mejor para sitios web?', a: 'WebP suele dar archivos más pequeños que JPG para fotos. PNG es mejor para transparencia y gráficos nítidos. Convierte a WebP y comprime si hace falta.' },
    ],
    howItWorks: [
      'Sube o suelta tu imagen en el navegador — sin cuenta.',
      'Elige compresión, redimensionar, lote o ampliar y previsualiza el resultado.',
      'Descarga al instante. Combina con convertir o quitar EXIF si tu flujo lo necesita.',
    ],
  },
  'edit-images': {
    seo: {
      title: 'Editar imágenes online – Recortar, rotar, voltear y mejorar',
      description:
        'Edita imágenes online gratis. Recorta, rota, voltea, añade texto, cambia fondo, mejora fotos y ajusta colores en privado en tu navegador. Sin registro ni marca de agua.',
      h1: 'Editar imágenes online',
      hero:
        'Ediciones rápidas sin instalar software. Recorta, rota, voltea, añade texto, cambia fondos, mejora fotos y ajusta colores con herramientas gratuitas en el navegador.',
    },
    introMarkdown: `## Edita imágenes online sin instalar software

No siempre necesitas un editor de fotos complejo para un cambio útil. La mayoría de tareas son simples: recortar espacio extra, rotar una foto lateral, voltear, añadir texto, cambiar color de fondo, mejorar una foto oscura o preparar una foto de identidad. NanoImage reúne estas [herramientas para editar imágenes online](/tools/edit-images) en un espacio rápido, gratuito y basado en el navegador.

Usa [Recortar imagen online](/crop-image) para quitar zonas no deseadas, centrar el sujeto o ajustar una relación de aspecto. El recorte sirve para fotos de perfil, miniaturas, imágenes de ecommerce, portadas de blog, documentos y publicaciones sociales.

Usa [Rotar imagen online](/rotate-image) cuando una foto aparezca de lado o al revés — común al mover imágenes entre móviles, cámaras, apps y sitios web.

Usa [Voltear imagen online](/flip-image) para un efecto espejo horizontal o vertical. Útil para selfies, diseños, material escaneado, orientación de producto y efectos creativos.

Usa [Añadir texto a imagen](/add-text) para leyendas, etiquetas, instrucciones, memes, miniaturas o gráficos promocionales simples.

Usa [Cambiar fondo](/change-background) cuando el color de fondo no encaje con el uso final. Útil para imágenes de producto, fotos tipo identidad, gráficos simples y listados de ecommerce.

Usa [Mejorar imagen](/enhance-image) para ajustes rápidos — brillo, contraste, saturación, nitidez y claridad.

Usa [Cambiar color](/change-color) para reemplazar, ajustar o teñir colores.

Usa [Creador de foto de pasaporte](/passport-photo) para un formato oficial con control de tamaño, fondo y peso del archivo.

Un buen flujo de edición combina varias herramientas: recortar, [redimensionar online](/resize-image), [comprimir online](/compress-image) y luego [eliminar datos EXIF](/remove-exif) antes de publicar. La mayor ventaja de NanoImage es simplicidad y privacidad — edición rápida en el navegador, sin registro ni marca de agua en las descargas.`,
    scenarios: [
      { question: '¿Necesitas reencuadrar o cambiar la relación de aspecto?', toolSlug: 'crop-image' },
      { question: '¿Foto de lado o al revés?', toolSlug: 'rotate-image' },
      { question: '¿Necesitas efecto espejo?', toolSlug: 'flip-image' },
      { question: '¿Necesitas leyendas o etiquetas?', toolSlug: 'add-text' },
      { question: '¿Necesitas un fondo limpio?', toolSlug: 'change-background' },
      { question: '¿Necesitas correcciones rápidas de calidad?', toolSlug: 'enhance-image' },
      { question: '¿Necesitas foto de pasaporte o visa?', toolSlug: 'passport-photo' },
    ],
    faqs: [
      { q: '¿Debo instalar software?', a: 'No. Todas las herramientas de edición funcionan en tu navegador en escritorio y móvil.' },
      { q: '¿Diferencia entre recortar y redimensionar?', a: 'Recortar elimina partes para cambiar el encuadre. Redimensionar cambia las dimensiones en píxeles de toda la imagen.' },
      { q: '¿Puedo rotar y voltear en un mismo flujo?', a: 'Sí. Corrige la orientación con Rotar imagen y luego voltea si hace falta.' },
      { q: '¿Las ediciones añaden marca de agua?', a: 'No. Las descargas de NanoImage están limpias, sin marca de agua de la herramienta.' },
      { q: '¿Se suben mis fotos?', a: 'El procesamiento ocurre en tu navegador cuando está soportado. Los archivos permanecen en tu dispositivo.' },
    ],
    howItWorks: [
      'Abre la herramienta de edición — recortar, rotar, voltear, texto y más.',
      'Sube tu imagen y ajusta la configuración en el navegador.',
      'Descarga el archivo editado. Redimensiona o comprime si la plataforma tiene límites de tamaño.',
    ],
  },
  'convert-formats': {
    seo: {
      title: 'Convertir formatos de imagen online – JPG, PNG, WebP, PDF',
      description:
        'Convierte formatos de imagen online gratis. Cambia JPG, PNG, WebP, GIF y otros archivos en tu navegador, sin registro y con descarga instantánea.',
      h1: 'Convertir formatos de imagen online',
      hero:
        'Convierte imágenes al formato que necesites. Pasa JPG, PNG, WebP, GIF y otros archivos a formatos listos para web o documentos directamente en tu navegador.',
    },
    introMarkdown: `## Convierte formatos de imagen online para sitios web, documentos y compartir

Cada formato de imagen sirve para algo distinto. JPG es común en fotos, PNG útil para transparencia y capturas, WebP ideal para archivos web pequeños, GIF soporta animación y PDF suele exigirse para documentos o envíos. La categoría [convertir formatos de imagen online](/tools/convert-formats) de NanoImage te ayuda a cambiar archivos sin instalar software.

Usa [Convertir imagen online](/convert-image) para un convertidor general de JPG, PNG, WebP, GIF, BMP y más. Usa [Convertir JPG/PNG a WebP](/convert-to-webp) al preparar imágenes para sitios web o páginas orientadas al rendimiento — WebP suele crear archivos más pequeños con buena calidad visual.

Usa [Convertidor de imagen a PDF](/image-to-pdf) para convertir una o más imágenes en documento: recibos, formularios escaneados, tareas, documentos de identidad o archivos imprimibles.

Elegir el formato depende del uso final. JPG para fotos normales sin transparencia. PNG para capturas, gráficos y logos. WebP para web cuando importa el tamaño. PDF cuando la imagen debe enviarse, imprimirse o compartirse como documento.

La conversión de formato suele formar parte de un flujo mayor: redimensionar un PNG grande, convertir a WebP y luego [comprimir online](/compress-image). O convertir una foto del móvil a JPG para un formulario y comprimir para cumplir un límite. NanoImage mantiene el flujo simple — subir, elegir formato de salida, descargar.

Muchos buscan porque un requisito de subida los bloquea: «solo JPG», «debe ser WebP» o «enviar como PDF». Este hub ayuda a entender qué herramienta resuelve el problema y te lleva directamente a ella. El procesamiento en el navegador, centrado en la privacidad, importa porque los usuarios suelen convertir identificaciones sensibles, recibos, gráficos de negocio y activos de clientes.`,
    scenarios: [
      { question: '¿No sabes qué convertidor usar?', toolSlug: 'convert-image' },
      { question: '¿Necesitas archivos web más pequeños?', toolSlug: 'convert-to-webp' },
      { question: '¿Necesitas un documento a partir de imágenes?', toolSlug: 'image-to-pdf' },
      { question: '¿El archivo sigue siendo grande tras convertir?', toolSlug: 'compress-image' },
    ],
    faqs: [
      { q: 'JPG vs PNG vs WebP — ¿cuál usar?', a: 'JPG para fotos, PNG para transparencia y gráficos nítidos, WebP para archivos web más pequeños con buena calidad.' },
      { q: '¿Puedo convertir varias imágenes a la vez?', a: 'Convertir imagen soporta conversión por lotes en muchos flujos habituales.' },
      { q: '¿Qué pasa con la transparencia al convertir a JPG?', a: 'JPG no tiene canal alpha. Las zonas transparentes pasan a un color de fondo sólido que puedes elegir.' },
      { q: '¿Puedo convertir imágenes a PDF?', a: 'Sí. Imagen a PDF fusiona hasta 20 imágenes en un PDF con control de tamaño de página y márgenes.' },
      { q: '¿Las conversiones se procesan localmente?', a: 'Sí, cuando está soportado — los archivos se procesan en tu navegador en lugar de subirse para convertir.' },
    ],
    howItWorks: [
      'Elige Convertir imagen, WebP o PDF según tu necesidad de salida.',
      'Sube archivos y selecciona formato objetivo y opciones de calidad.',
      'Descarga los archivos convertidos. Comprime o redimensiona si la plataforma tiene límites.',
    ],
  },
  'create-more': {
    seo: {
      title: 'Crear imágenes online – GIF, memes, collages y grids',
      description:
        'Crea imágenes online gratis. Haz GIF, memes, collages de fotos, grids de fotos y grids de dibujo en tu navegador, sin registro ni marca de agua.',
      h1: 'Crear imágenes online',
      hero:
        'Convierte tus fotos en visuales compartibles. Crea GIF, memes, collages, grids de fotos y grids de dibujo con herramientas simples y gratuitas en el navegador.',
    },
    introMarkdown: `## Crea imágenes, GIF, memes, collages y grids compartibles

Las imágenes no solo se editan — también se crean. La categoría [crear imágenes online](/tools/create-more) de NanoImage reúne herramientas para hacer contenido visual a partir de fotos existentes o diseños en blanco.

Usa [Creador de GIF](/gif-maker) para convertir varias imágenes en un GIF animado — útil para reacciones, vistas previas de producto, secuencias antes/después y explicaciones visuales ligeras.

Usa [Generador de memes](/meme-generator) para añadir texto en negrita arriba y abajo rápidamente. Para más control de fuentes y capas, prueba [Añadir texto a imagen](/add-text).

Usa [Creador de collage](/image-collage) para combinar varias fotos en un diseño — publicaciones de Instagram, mood boards, resúmenes de eventos y escaparates de producto.

Usa [Grid de fotos](/photo-grid) para diseños estructurados 2×2, 3×3 y 4×4 — portfolios, comparaciones y publicaciones sociales que necesitan alineación y coherencia.

Usa [Creador de grid](/grid-maker) para añadir una cuadrícula de dibujo a una foto de referencia o crear grids imprimibles en blanco para artistas, estudiantes y profesores.

Los flujos creativos suelen usar varias herramientas: [recortar online](/crop-image) antes de un collage, [redimensionar online](/resize-image) antes de un grid, [comprimir online](/compress-image) antes de subir, o [añadir marca de agua](/add-watermark) al gráfico final. NanoImage mantiene la creación ligera — rápida, gratuita, privada y sin registro.`,
    scenarios: [
      { question: '¿Necesitas un GIF animado?', toolSlug: 'gif-maker' },
      { question: '¿Necesitas texto estilo meme?', toolSlug: 'meme-generator' },
      { question: '¿Combinar varias fotos?', toolSlug: 'image-collage' },
      { question: '¿Necesitas un grid alineado?', toolSlug: 'photo-grid' },
      { question: '¿Necesitas grid de referencia para dibujar?', toolSlug: 'grid-maker' },
    ],
    faqs: [
      { q: 'GIF vs vídeo — ¿cuándo usar el creador de GIF?', a: 'Los GIF funcionan mejor para bucles cortos, reacciones y animaciones simples sin reproductor de vídeo.' },
      { q: '¿Collage vs grid de fotos?', a: 'Los collages son diseños creativos libres. Los grids de fotos enfatizan celdas iguales y alineación limpia.' },
      { q: '¿Las descargas llevan marca de agua?', a: 'No. NanoImage no añade marcas de agua a imágenes o GIF creados.' },
      { q: '¿Puedo añadir texto tras hacer un meme?', a: 'Sí. El generador de memes es lo más rápido para diseños clásicos; Añadir texto ofrece más control tipográfico.' },
      { q: '¿Necesito una cuenta?', a: 'No se requiere cuenta para las herramientas de creación principales.' },
    ],
    howItWorks: [
      'Elige GIF, meme, collage, grid o grid de dibujo según tu salida.',
      'Sube imágenes o configura el diseño en el navegador.',
      'Descarga tu creación. Redimensiona o comprime antes de publicar en redes.',
    ],
  },
  'privacy-protection': {
    seo: {
      title: 'Herramientas de privacidad de imagen – EXIF, desenfoque, pixelado y marca de agua',
      description:
        'Protege la privacidad de imágenes online. Elimina EXIF, desenfoca caras, pixela zonas sensibles y añade marcas de agua en tu navegador, sin registro ni subida.',
      h1: 'Herramientas de privacidad y protección de imágenes',
      hero:
        'Protege datos sensibles antes de compartir. Elimina metadatos, desenfoca zonas privadas, pixela caras o matrículas y añade marcas de agua directamente en tu navegador.',
    },
    introMarkdown: `## Protege tus imágenes antes de compartirlas online

Cada imagen puede contener más información de la esperada — metadatos de ubicación, detalles de cámara, marcas de tiempo, caras, matrículas, direcciones y detalles privados del fondo. Las [herramientas de privacidad de imagen](/tools/privacy-protection) de NanoImage te ayudan a preparar imágenes para un compartir más seguro.

Usa [Eliminar datos EXIF](/remove-exif) para quitar metadatos ocultos de fotos. EXIF puede incluir modelo de cámara, fecha, hora y a veces ubicación GPS. Eliminar metadatos es útil antes de compartir fotos de viaje, imágenes personales, trabajo de clientes, capturas o documentos online.

Usa [Desenfocar imagen online](/blur-image) para ocultar información manteniendo la imagen natural — caras, direcciones, matrículas, números de cuenta y detalles de fondo.

Usa [Pixelar imagen online](/pixelate-image) para privacidad visual más fuerte. El pixelado es común para censurar caras, identificaciones, matrículas y zonas sensibles en capturas.

Usa [Añadir marca de agua a imagen](/add-watermark) para proteger la propiedad o disuadir el uso no autorizado con texto o logo.

La privacidad de imágenes tiene dos capas: detalles visibles y metadatos ocultos. Un flujo completo puede requerir ambos — [eliminar datos EXIF](/remove-exif) y desenfocar o pixelar zonas sensibles. NanoImage enfatiza el procesamiento en el navegador para que usuarios centrados en la privacidad no tengan que subir imágenes sensibles a servidores desconocidos.

Casos habituales: ocultar caras en fotos de clase, quitar GPS de fotos del móvil, desenfocar matrículas antes de publicar un coche, pixelar nombres de usuario en capturas y añadir marcas de agua a fotografía de producto antes de compartir públicamente.`,
    scenarios: [
      { question: '¿Necesitas quitar metadatos ocultos?', toolSlug: 'remove-exif' },
      { question: '¿Necesitas ocultar caras o matrículas?', toolSlug: 'blur-image' },
      { question: '¿Necesitas censura evidente?', toolSlug: 'pixelate-image' },
      { question: '¿Necesitas proteger la propiedad?', toolSlug: 'add-watermark' },
    ],
    faqs: [
      { q: '¿Qué son los datos EXIF?', a: 'EXIF es metadatos incrustado en muchas fotos — ajustes de cámara, fecha, hora y a veces coordenadas GPS.' },
      { q: '¿Desenfoque vs pixelado — cuál es mejor?', a: 'El desenfoque parece natural en caras; el pixelado es más difícil de revertir y señala censura intencional. Desenfoque o pixelado fuerte para texto y números.' },
      { q: '¿El desenfoque elimina EXIF?', a: 'No. Elimina metadatos por separado con Eliminar EXIF tras la censura visual.' },
      { q: '¿Son gratis las herramientas de privacidad?', a: 'Sí. Las herramientas principales son gratis, sin registro.' },
      { q: '¿Se suben mis archivos sensibles?', a: 'NanoImage procesa archivos en tu navegador cuando está soportado — verifica en DevTools → Network durante el procesamiento.' },
    ],
    howItWorks: [
      'Sube la imagen que planeas compartir públicamente.',
      'Elimina EXIF, desenfoca, pixela o añade marca de agua según necesites — a menudo en combinación.',
      'Descarga y revisa la imagen final antes de publicar.',
    ],
  },
  'ai-tools': {
    seo: {
      title: 'Herramientas de imagen con IA gratis online — en el dispositivo, sin subida',
      description:
        'Eliminación de fondo con IA, borrado de objetos, restauración de fotos y recorte inteligente, todo ejecutándose en tu navegador. Tus imágenes nunca salen del dispositivo. Gratis, sin registro, sin marca de agua.',
      h1: 'Herramientas de imagen con IA — en el dispositivo, sin subida',
      hero:
        'Herramientas de imagen con IA que siguen sin subir tus fotos. Los modelos se descargan una vez al navegador y toda la inferencia se ejecuta localmente.',
    },
  },
  'video-tools': {
    seo: {
      title: 'Herramientas de vídeo online gratis – Convertir vídeo a GIF o MP3',
      description:
        'Usa herramientas de vídeo online gratis para convertir clips a GIF o extraer audio MP3. Herramientas rápidas en el navegador, sin registro y descargas simples.',
      h1: 'Herramientas de vídeo online gratis',
      hero:
        'Convierte clips cortos en GIF compartibles o extrae audio como MP3. Herramientas de vídeo simples y gratuitas para flujos rápidos en el navegador.',
    },
    introMarkdown: `## Herramientas de vídeo online simples para GIF, audio y conversiones rápidas

Los archivos de vídeo son útiles, pero no siempre el formato más fácil de compartir. Un clip corto puede funcionar mejor como GIF animado, mientras una grabación puede ser más útil como MP3. Las [herramientas de vídeo online gratis](/tools/video-tools) de NanoImage ofrecen conversiones simples y enfocadas sin software de edición complejo.

Usa [Convertidor de vídeo a GIF](/video-to-gif) para reacciones, tutoriales, vistas previas de producto, publicaciones sociales y explicaciones visuales rápidas. Los GIF se repiten automáticamente y suelen ser más fáciles de incrustar que los vídeos.

Usa [Convertidor de vídeo a MP3](/video-to-mp3) para extraer audio de notas de voz, clases, entrevistas, grabaciones de pantalla y clips de referencia.

Esta categoría es un utilitario ligero — sube o selecciona un vídeo, elige la salida, procesa y descarga. Las herramientas de vídeo se conectan con el resto de NanoImage: convertir a GIF y luego [comprimir](/compress-image) o [recortar](/crop-image); extraer MP3 para podcasts o notas.

Los GIF funcionan mejor con clips cortos y movimiento simple. La extracción MP3 es ideal cuando solo necesitas el sonido. Si el procesamiento es en el navegador para archivos soportados, los archivos permanecen en tu dispositivo — consulta el aviso de privacidad de cada herramienta.`,
    scenarios: [
      { question: '¿Necesitas un clip en bucle para chat o redes?', toolSlug: 'video-to-gif' },
      { question: '¿Solo necesitas el audio del vídeo?', toolSlug: 'video-to-mp3' },
      { question: '¿El GIF es demasiado grande tras convertir?', toolSlug: 'compress-image' },
      { question: '¿Necesitas texto meme en un fotograma?', toolSlug: 'meme-generator' },
    ],
    faqs: [
      { q: '¿Qué duración debe tener un vídeo para GIF?', a: 'Los clips cortos (unos segundos a ~15 s) funcionan mejor. Clips más largos producen GIF muy grandes.' },
      { q: 'Vídeo a MP3 — ¿conserva el vídeo?', a: 'No. La exportación MP3 es solo audio. Guarda el vídeo original si necesitas ambos.' },
      { q: '¿Son gratis las herramientas de vídeo?', a: 'Sí. Las herramientas principales de conversión son gratis, sin registro.' },
      { q: '¿Qué formatos se soportan?', a: 'Formatos habituales soportados por el navegador como MP4 y WebM. Consulta cada página de herramienta.' },
      { q: '¿Puedo editar el GIF tras convertir?', a: 'Sí. Usa herramientas de imagen como recortar, redimensionar, comprimir o añadir texto en fotogramas exportados o flujos relacionados.' },
    ],
    howItWorks: [
      'Abre Vídeo a GIF o Vídeo a MP3 y sube tu clip.',
      'Ajusta calidad, tiempo o audio según necesites.',
      'Descarga el GIF o MP3. Usa herramientas de imagen para optimizar más.',
    ],
  },
}
