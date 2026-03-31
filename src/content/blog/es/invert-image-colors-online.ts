export const content = `
# Cómo invertir los colores de una imagen en línea (gratis, efecto negativo fotográfico)

Invertir los colores de una imagen crea un efecto negativo —los negros pasan a blanco, los blancos a negro y cada color se sustituye por su opuesto en la rueda cromática. Se hace con un clic y tiene más usos prácticos de los que parece.

---

## Qué hace realmente invertir colores

Al invertir una imagen, el valor de cada píxel se sustituye por su opuesto matemático. En una imagen de 8 bits:

- Un píxel con valor **0** (negro) pasa a **255** (blanco)
- Un píxel con valor **255** (blanco) pasa a **0** (negro)
- Un píxel con valor **100** (gris oscuro) pasa a **155** (gris claro)
- Un píxel rojo (255, 0, 0) pasa a cian (0, 255, 255)
- Un píxel amarillo (255, 255, 0) pasa a azul (0, 0, 255)

El resultado es el negativo cromático exacto de la imagen original —el mismo efecto que ver un negativo de película tradicional.

---

## Usos prácticos de la inversión de color

**Crear efectos de foto negativa.** El uso clásico —invertir una foto da un aspecto irreal y surrealista. Retratos, arquitectura y abstracciones suelen verse muy llamativos invertidos.

**Diseño de interfaz en modo oscuro.** Los diseñadores usan la inversión para prever cómo se ven elementos de interfaz sobre fondos oscuros o para generar rápidamente versiones modo oscuro de iconos e ilustraciones.

**Accesibilidad y legibilidad.** Algunas personas con discapacidad visual o sensibilidad a la luz leen mejor con colores invertidos. Invertir un documento o una captura puede mejorar la lectura en ciertos casos.

**Comprobar el equilibrio de color.** Fotógrafos y diseñadores a veces invierten una imagen para detectar dominantes e desequilibrios —una dominante azul se convierte en naranja evidente, más fácil de ver.

**Crear variaciones artísticas.** Las imágenes invertidas funcionan como arte digital, efectos de póster o capas en composiciones de múltiple exposición.

**Leer negativos escaneados de película.** Si has escaneado negativos de película directamente (sin escáner específico de película), invertir la imagen resultante recupera la imagen positiva.

**Procesado de radiografías e imágenes térmicas.** En medicina y ciencia a veces se invierten imágenes para el análisis —huesos en negro sobre blanco frente a blanco sobre negro, o invertir gradientes de color térmico.

---

## Paso a paso: invertir una imagen en el navegador

### Paso 1: Abrir NanoImage Invertir colores

Ve a [NanoImage Invertir colores](/invert/). Sin cuenta, sin instalación. Tu imagen permanece en tu dispositivo —no se sube a ningún sitio.

### Paso 2: Subir tu imagen

Arrastra o haz clic para subir. Compatible con JPEG, PNG y WebP.

### Paso 3: Vista previa de la inversión

La imagen invertida aparece al instante. Comprueba cómo han cambiado los colores —el resultado es la inversión matemática exacta de cada píxel.

### Paso 4: Descarga

Pulsa **Descarga** para guardar la imagen invertida. Lista para usar de inmediato.

---

## Cosas interesantes que merece la pena invertir

Algunas imágenes dan resultados más interesantes que otras al invertirlas:

**Retratos:** Los tonos de piel pasan a un cian-azul inquietante. Los ojos suelen verse muy dramáticos. Mejor para uso artístico o editorial.

**Paisajes con cielo azul:** El cielo se vuelve cálido anaranjado y la vegetación verde, magenta —efecto de paisaje «extraterrestre» muy marcado.

**Fotos en blanco y negro:** Invertir escala de grises reproduce el aspecto de «negativo de película» —el negro pasa a blanco y las sombras a luces. Muy efectivo en retratos.

**Documentos de texto:** Fondo blanco y texto negro pasa a fondo negro y texto blanco —útil para pasar a un aspecto tipo modo oscuro.

**Logotipos e iconos:** Ideal para ver rápido cómo se ve un logotipo sobre fondo oscuro u claro.

**Trazos e ilustraciones:** El trazo negro sobre papel blanco pasa a trazo blanco sobre negro —útil para ciertas técnicas de impresión o ilustraciones tipo tiza.

---

## Invertir frente a otros efectos de color

Conviene distinguir la inversión de color de efectos parecidos:

| Efecto | Qué hace |
|--------|--------------|
| **Invertir** | Cambia cada píxel por su color opuesto matemático |
| **Escala de grises / B&N** | Elimina el color; conserva la luminosidad como grises |
| **Desaturar** | Reduce la intensidad del color sin quitarlo del todo |
| **Rotación de tono** | Desplaza todos los colores un ángulo fijo en la rueda cromática |
| **Negativo** | Igual que invertir (otro nombre, mismo resultado) |
| **Solarizar** | Inversión parcial —solo se invierten píxeles por encima de un umbral de brillo |

La herramienta Invertir colores de NanoImage aplica inversión completa. Para pasar a escala de grises, usa [NanoImage Blanco y negro](/bw/).

---

## Invertir para recuperar un negativo de película

Si has escaneado negativos físicos con un escáner plano habitual o con cámara, probablemente obtuviste una imagen anaranjada rojiza —la base del negativo más los colores invertidos. Así ayuda la inversión:

1. Escanea o fotografía el negativo tal cual
2. Súbelo a [NanoImage Invertir colores](/invert/)
3. Invierte la imagen
4. Aparece la imagen positiva (tonos y colores ya coherentes)

**Nota:** El color naranja de la base de la película también se invierte (hacia azul), así que casi seguro necesitarás corrección de color después para quitar la dominante. Es un primer paso básico, no un flujo completo de negativo a positivo. El software dedicado a película (como Negative Lab Pro o SilverFast) lo hace con más precisión, pero la inversión de NanoImage es un punto de partida rápido y gratuito.

---

## Preguntas frecuentes

**¿Invertir colores es lo mismo que «negativo» en apps de fotos?**
Sí —«invertir colores», «negativo» y «negativo cromático» se refieren a la misma operación: sustituir cada valor de píxel por su complemento matemático (255 menos el valor original en cada canal).

**¿Puedo invertir solo una parte de la imagen?**
La herramienta de invertir de NanoImage afecta a toda la imagen. Para inversión selectiva (solo una cara u objeto) haría falta un editor más avanzado como Photoshop o GIMP.

**¿Invertir reduce la calidad de la imagen?**
No. La inversión de color es una operación matemática sin pérdida —cada píxel se recalcula a un valor exacto. No se pierde ni se aproxima información. La calidad de salida es idéntica a la de entrada.

**¿Puedo invertir un PNG con transparencia?**
Sí —NanoImage conserva la transparencia (canal alfa) al invertir. Solo se invierten los canales RGB; las zonas transparentes siguen transparentes.

**¿Cómo vuelvo al original después de invertir?**
Invierte de nuevo. Invertir dos veces devuelve cada píxel exactamente a su valor original. Si guardaste la imagen invertida, ábrela en NanoImage e inviértela otra vez —recuperarás los colores originales.

---

## Resumen

Invertir los colores de una imagen:

1. Abre [NanoImage Invertir colores](/invert/)
2. Sube tu imagen
3. Previsualiza el efecto negativo
4. Descarga —listo al instante

Un clic, sin subida, sin cuenta.

**[Invierte los colores de tu imagen gratis →](/invert/)**
`;
