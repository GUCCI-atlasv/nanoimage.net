export const content = `
# Cómo rotar una foto girada y dejarla en la posición correcta

Tomas una foto con el teléfono en vertical, la subes a algún sitio — y aparece girada. O escaneas un documento y el PDF aparece rotado 90 grados. O recibes una imagen de un compañero y se abre boca abajo en todos los programas que pruebas.

Es uno de los problemas fotográficos más comunes y molestos. Aquí te explicamos por qué ocurre y cómo solucionarlo en segundos.

---

## Por qué las fotos aparecen giradas (El problema de la orientación EXIF)

La causa más común de las fotos giradas no es que los datos de la imagen estén realmente girados, sino que la foto se tomó en una orientación pero los **metadatos EXIF** dicen que debe rotarse.

Esto es lo que ocurre:

1. Sostienes el teléfono para tomar una foto en vertical
2. El sensor de la cámara capta la imagen en su orientación física
3. El teléfono registra una etiqueta EXIF que dice "rotar 90 grados en sentido horario al mostrar"
4. El software que lee los datos EXIF (iPhone, Chrome, la mayoría de apps modernas) lo muestra correctamente en vertical
5. El software que ignora los datos EXIF muestra la imagen sin procesar — girada

Por eso una foto se ve bien en tu teléfono pero aparece girada al subirla a un sitio web, enviarla por correo o abrirla en ciertos programas.

**La solución:** Rotar la imagen y guardarla con la rotación integrada en los datos de píxeles — no solo registrada en los metadatos.

---

## Otras razones por las que las fotos aparecen giradas

**Documentos escaneados:** Los escáneres planos no siempre detectan la orientación automáticamente. Colocar un documento en un ángulo, o introducirlo de lado, produce un escaneo rotado.

**Capturas de pantalla de interfaces rotadas:** Si tomas una captura de pantalla con el dispositivo en horizontal, la captura es horizontal. En contextos en vertical, esto aparece girado.

**Imágenes descargadas:** Algunas imágenes están inherentemente rotadas debido a cómo fueron exportadas desde el software o las cámaras.

**Cámaras réflex:** Muchas cámaras réflex y sin espejo no tienen acelerómetros. Las fotos tomadas con la cámara rotada pueden no tener metadatos de orientación en absoluto.

---

## Paso a paso: corregir una foto girada

### Paso 1: Abre NanoImage Rotar

Ve a [NanoImage Rotar Imagen](/rotate-image/). Funciona en cualquier navegador — sin cuenta, sin instalación, sin subida a un servidor.

### Paso 2: Sube tu foto

Arrastra o haz clic para subir. Se admiten JPEG, PNG y WebP.

### Paso 3: Elige la rotación

- **90° en sentido horario:** La parte superior del sujeto apunta hacia la izquierda
- **90° en sentido antihorario:** La parte superior del sujeto apunta hacia la derecha
- **180°:** La foto está boca abajo

Si no estás seguro, fíjate en qué lado está el cielo (o el techo) y rota en consecuencia.

### Paso 4: Descarga

Haz clic en **Rotar** y luego en **Descargar**. La rotación queda integrada en el archivo de imagen — el resultado se muestra correctamente en todos los programas, navegadores y plataformas.

---

## Cómo saber en qué dirección rotar

**Busca pistas que dependan de la gravedad:** El agua en un vaso está en la parte inferior. El cabello cae hacia abajo. Los horizontes son horizontales. El texto se lee de izquierda a derecha.

**Observa los rasgos faciales:** Las narices apuntan hacia adelante. Los ojos son horizontales.

**Comprueba el contexto:** ¿Qué debería estar en la parte superior de la imagen? Rota hasta que ese elemento esté arriba.

En caso de duda, prueba primero 90° en sentido horario — ese es el problema de orientación más común en fotos tomadas en vertical con dispositivos Android.

---

## Corregir la rotación de forma permanente (no solo los metadatos)

Esta es la parte crítica: algunas herramientas "rotan" una foto actualizando solo la etiqueta de orientación EXIF, sin cambiar realmente los datos de píxeles. La imagen parece rotada en pantalla, pero sigue almacenada girada.

Si subes esa imagen a una plataforma que ignora los datos EXIF, vuelve a aparecer girada.

NanoImage rota los datos de píxeles reales, no solo los metadatos. La rotación es permanente y se muestra correctamente en todas partes — independientemente de si el visor lee las etiquetas EXIF o no.

---

## Escenarios comunes y sus soluciones

**La foto en vertical aparece girada al subirla a sitios web:**
El problema más común. Rota 90° en la dirección correcta. La plataforma está ignorando los metadatos EXIF.

**La página escaneada del PDF está girada:**
NanoImage trabaja con archivos de imagen — si tu escaneo es un PDF, exporta la página como JPEG primero (la mayoría de los visores de PDF te permiten exportar páginas como imágenes) y luego rota.

**Las fotos de una cámara antigua están giradas:**
Las cámaras antiguas sin acelerómetros no registran la orientación. Rota manualmente y guarda — la rotación se conservará.

**La imagen se abre correctamente en una app pero girada en otra:**
Una app está leyendo la orientación EXIF; la otra no. Rotar y volver a guardar con NanoImage integra la rotación en los datos de píxeles, corrigiéndola en todas las apps.

**La imagen está ligeramente inclinada, no exactamente 90°:**
Usa la rotación de ángulo personalizado de NanoImage para corregir inclinaciones menores. Introduce un ángulo específico (por ejemplo, 2,5° o −3°) para enderezar una foto ligeramente torcida.

---

## Rotar vs. voltear: ¿cuál es la diferencia?

**Rotar:** Gira la imagen un número fijo de grados — 90°, 180°, 270° o cualquier ángulo personalizado. La imagen gira alrededor de su centro.

**Voltear (espejo):** Crea una imagen especular horizontalmente (de izquierda a derecha) o verticalmente (de arriba a abajo).

Si tu foto está girada, necesitas **rotar**, no voltear. Si tu foto es una imagen especular de lo que pretendías (habitual en selfies), usa la herramienta separada [Voltear Imagen](/flip-image/).

---

## Preguntas frecuentes

**¿Por qué mi foto se ve bien en mi teléfono pero aparece girada en todos los demás sitios?**
Tu teléfono lee los datos de orientación EXIF y los muestra correctamente. Muchos sitios web, formularios de subida y programas no lo hacen. Rotar y volver a guardar con NanoImage soluciona esto de forma permanente.

**¿Rotar reduce la calidad de la imagen?**
Rotar un JPEG exactamente 90°, 180° o 270° puede hacerse sin pérdida — sin recodificar los datos JPEG. NanoImage utiliza rotación sin pérdida siempre que es posible, preservando la calidad completa de la imagen.

**Roté mi imagen pero sigue viéndose girada después de descargarla. ¿Qué pasó?**
Intenta abrir el archivo descargado en un programa diferente, o súbelo a un sitio web para verificar cómo se muestra. Algunos visores de fotos anulan la visualización en función de su propia lectura de EXIF.

**¿Puedo rotar solo una parte de una imagen?**
No — la rotación se aplica a toda la imagen. Para una rotación selectiva, necesitarías un editor de fotos más avanzado.

---

## Resumen

Corregir una foto girada lleva unos 10 segundos:

1. Abre [NanoImage Rotar Imagen](/rotate-image/)
2. Sube tu foto
3. Selecciona 90° en sentido horario, 90° en sentido antihorario o 180°
4. Descarga — la rotación queda integrada de forma permanente en el archivo

**[Corrige tu foto girada — gratis, sin subida, sin cuenta →](/rotate-image/)**
`;
