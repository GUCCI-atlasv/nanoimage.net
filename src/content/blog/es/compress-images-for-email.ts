export const content = `
# Cómo comprimir imágenes para adjuntos de correo electrónico

Has hecho una foto y quieres enviarla por correo —pero el adjunto pesa 8 MB, tu cliente de correo muestra un error, sabes que la bandeja del destinatario la mandará a spam o tardará una eternidad en cargarse en su móvil.

El correo electrónico y las imágenes pesadas no se llevan bien. Aquí explicamos por qué y cómo solucionarlo en menos de un minuto.

---

## Por qué el correo y las imágenes grandes no conviven

**Límites de tamaño de adjuntos:** La mayoría de los proveedores de correo limitan los adjuntos a 10–25 MB por mensaje. Gmail admite hasta 25 MB; Outlook hasta 20 MB; Yahoo hasta 25 MB. Los servidores de correo corporativo suelen ser más estrictos —límites de 10 MB o incluso 5 MB son habituales.

**Límites de la bandeja del destinatario:** Aunque tu servidor de salida permita un adjunto de 20 MB, el del destinatario puede rechazarlo. Una configuración frecuente en empresas limita los adjuntos entrantes a 10 MB.

**Datos móviles:** Abrir un adjunto de 5 MB con datos móviles consume datos y tiempo de verdad. Quienes tienen planes limitados pueden posponer abrir tu correo o no abrirlo.

**Filtros antispam:** Algunos filtros marcan correos con adjuntos grandes, lo que reduce la probabilidad de que lleguen a la bandeja de entrada.

**Almacenamiento:** Tanto el remitente como el destinatario usan cuota por los adjuntos. Una foto de 5 MB guardada en ambas bandejas consume 10 MB de almacenamiento combinado.

---

## Qué tamaño deben tener las imágenes para el correo

Depende del uso:

| Uso | Tamaño de archivo recomendado | Dimensiones recomendadas |
|---------|----------------------|----------------------|
| Compartir fotos en general | 500 KB – 1 MB | 1200–1600 px de ancho |
| Foto de perfil / retrato | Menos de 500 KB | 800×800 px |
| Escaneo de documento | Menos de 1 MB | 1200 px de ancho a 150 dpi |
| Imagen para newsletter | Menos de 200 KB | 600 px de ancho |
| Prueba / vista previa para un cliente | 200 KB – 500 KB | 1000–1200 px de ancho |
| Entrega en calidad de impresión | 3–8 MB | Resolución completa |

Para la mayoría de los correos personales y profesionales, **menos de 1 MB por imagen** es un buen objetivo. Menos de 500 KB es mejor si envías a gente que usa mucho el móvil.

---

## Paso a paso: comprimir una imagen para el correo

### Paso 1: Abrir NanoImage Comprimir

Ve a [NanoImage Comprimir imagen](/compress/). Sin cuenta, sin instalación. Tu foto se procesa en el navegador —no llega a ningún servidor.

### Paso 2: Subir tu foto

Arrastra o haz clic para subir. Compatible con JPEG, PNG y WebP.

### Paso 3: Definir el tamaño de archivo objetivo

En el campo de tamaño objetivo, introduce el tamaño de salida deseado:
- **Correo general:** 500–800 KB
- **Límites de adjunto ajustados:** 200–300 KB
- **Muchas fotos (5+ imágenes):** 200–400 KB cada una (el total del adjunto suele quedar bajo la mayoría de límites)

Pulsa **Comprimir**. NanoImage busca el nivel de calidad óptimo para acercarse a tu objetivo.

### Paso 4: Vista previa y descarga

Revisa la vista previa —especialmente rostros, texto y detalle fino. A 500 KB–1 MB, una foto típica debería verse igual que el original en el tamaño en que se ve en el correo. Descarga y adjunta al mensaje.

---

## ¿Conviene redimensionar antes de comprimir?

A menudo, sí. Una foto de 4000×3000 px comprimida a 500 KB se verá peor que una de 1600×1200 px comprimida a 500 KB —la imagen más pequeña puede guardarse con mayor calidad JPEG porque hay menos píxeles que codificar.

**Flujo recomendado para fotos grandes:**

1. Abre [NanoImage Redimensionar](/resize/) y reduce a **1200–1600 px de ancho** (lado largo)
2. Descarga la foto redimensionada
3. Abre [NanoImage Comprimir](/compress/) y fija el objetivo en 500 KB–1 MB
4. Descarga y adjunta

Este enfoque en dos pasos ofrece la mejor calidad con el menor tamaño de archivo.

---

## Enviar varias fotos

Si envías varias fotos en un solo correo, importa más el tamaño total del adjunto que el de cada imagen.

**Cálculo rápido:**
- 5 fotos de 1 MB cada una = 5 MB en total ✅ (vale para la mayoría de servicios)
- 10 fotos de 2 MB cada una = 20 MB en total ⚠️ (cerca de los límites)
- 20 fotos de 3 MB cada una = 60 MB en total ❌ (fallará)

Para lotes grandes, comprime cada foto a 200–400 KB. 20 fotos de 300 KB cada una = 6 MB en total —muy por debajo del límite de los principales proveedores de correo.

NanoImage admite compresión por lotes —sube varias fotos a la vez y aplica el mismo tamaño objetivo a todas simultáneamente.

---

## Alternativas al correo para fotos grandes

Si de verdad necesitas compartir fotos a resolución completa (impresión, uso profesional o archivo), el correo no es la herramienta adecuada aunque comprimas:

- **Google Drive / Dropbox / OneDrive:** Comparte un enlace en lugar de adjuntar. Sin límite práctico de tamaño. El destinatario descarga solo lo que quiera.
- **WeTransfer:** Envío gratuito de archivos hasta 2 GB. Útil para envíos puntuales grandes.
- **Álbumes compartidos de iCloud Fotos / Google Fotos:** Lo mejor para álbumes familiares.

Comprime para el correo cuando el destinatario solo necesite ver la foto. Usa servicios de archivos cuando necesite el archivo a resolución plena.

---

## Formato para el correo: JPEG, PNG o WebP

Para adjuntos de fotos por correo, **JPEG es la mejor opción**:
- Compatible con todos los clientes de correo y sistemas operativos
- El formato más eficiente para imágenes fotográficas
- La mayoría de los clientes muestran JPEG en línea (sin descargar aparte)

Evita enviar WebP como adjunto —los clientes antiguos (sobre todo Outlook) pueden no mostrar WebP en línea y lo verán como un icono genérico de adjunto.

Si tu imagen es PNG (captura, gráfico, logotipo), puedes mantener PNG cuando haya texto o transparencia. Para fotografías en PNG, conviértelas a JPEG antes de enviar —la reducción de tamaño es enorme sin cambio visible de calidad.

---

## Preguntas frecuentes

**Mi correo dice «adjunto demasiado grande» —¿qué hago?**
Comprime a menos de la mitad del límite indicado para tener margen. Si tu servidor dice 10 MB, apunta a 4–5 MB en total.

**¿Se notará que la imagen está comprimida?**
A 500 KB–1 MB para una foto normal, no. Los clientes de correo muestran imágenes a resolución de pantalla (típicamente 72–96 dpi), no a calidad de impresión. La compresión no se notará.

**¿Puedo comprimir un PDF para el correo?**
NanoImage trabaja con archivos de imagen (JPEG, PNG, WebP). Para comprimir PDF hace falta una herramienta específica para PDF.

**¿Debo comprimir las imágenes en ZIP antes de enviar?**
Para JPEG, ZIP casi no ahorra —los JPEG ya van comprimidos. ZIP sirve para enviar muchos archivos organizados en una carpeta, no para reducir el tamaño de JPEG.

**¿Y si necesito enviar un archivo de muy alta resolución?**
Usa un servicio de almacenamiento (Google Drive, Dropbox, WeTransfer) y envía el enlace por correo. No comprimas una foto para impresión de forma tan agresiva que pierda resolución útil —el destinatario debe recibir el archivo completo.

---

## Resumen

Comprimir fotos para el correo:

1. **Redimensiona primero** si la foto supera 1600 px de ancho —usa [NanoImage Redimensionar](/resize/)
2. **Comprime con objetivo** —500 KB–1 MB para una sola imagen, 200–400 KB por imagen en lotes
3. **Usa formato JPEG** —máxima compatibilidad con todos los clientes
4. **Comprueba el tamaño total del adjunto** antes de enviar —mantente holgadamente por debajo del límite de tu proveedor

**[Comprime tu foto para el correo — gratis, sin subida, al instante →](/compress/)**
`;
