export const content = `
# Resolución de Imagen Explicada: Píxeles, DPI y Por Qué Importa

Probablemente hayas escuchado los términos "resolución", "píxeles" y "DPI" cuando se habla de calidad de imagen. Pero ¿qué significan realmente — y cuándo importan para ti?

Esta guía explica la resolución de imagen en términos simples, para que puedas tomar decisiones inteligentes sobre el tamaño, la calidad y el formato de las imágenes.

---

## ¿Qué Es un Píxel?

Un **píxel** (abreviatura de "picture element" o elemento de imagen) es la unidad más pequeña de una imagen digital. Haz zoom en cualquier foto digital lo suficiente y la verás disolverse en una cuadrícula de pequeños cuadrados de colores — esos son píxeles.

El número total de píxeles en una imagen es su **resolución**. Una imagen de 1920×1080 tiene 1,920 píxeles de ancho y 1,080 píxeles de alto, para un total de aproximadamente 2 millones de píxeles — por eso se llama "2 megapíxeles" (MP).

Más píxeles significa:
- Más detalle y nitidez
- Archivos más grandes
- La capacidad de imprimir más grande o recortar más sin perder calidad

---

## ¿Qué Es el DPI?

**DPI** significa "dots per inch" (puntos por pulgada). Describe cuántos píxeles se comprimen en una pulgada de espacio físico cuando se imprime o muestra una imagen.

Aquí es donde muchas personas se confunden, porque el DPI es un **concepto de impresión** — no es realmente significativo para imágenes mostradas en pantallas.

Por qué: las pantallas muestran imágenes al tamaño que encaja en la pantalla. Una imagen de 1920×1080 en un monitor de 24 pulgadas se ve diferente que la misma imagen en una pantalla de teléfono de 5 pulgadas. Los píxeles por pulgada cambian según el dispositivo, pero la imagen en sí no cambia.

Cuando **imprimes** una imagen, el DPI se vuelve crítico porque determina qué tan nítida se verá la impresión en un tamaño físico específico.

---

## Resolución para Pantalla vs. para Impresión

### Para Pantallas
La mayoría de las pantallas muestran entre 72–144 PPI (píxeles por pulgada). Estándares comunes:
- **Monitores estándar:** ~96 PPI
- **Pantallas Retina / HiDPI:** 192–264 PPI
- **Pantallas de smartphone:** 300–460 PPI

Para imágenes web, lo que importa son las **dimensiones en píxeles**, no la configuración de DPI. Una imagen de 72 DPI y una de 300 DPI con las mismas dimensiones en píxeles se ven idénticas en pantalla.

### Para Impresión
Aquí es donde el DPI importa. La recomendación estándar:

| Caso de Uso | DPI Recomendado |
|---|---|
| Impresión fotográfica profesional | 300 DPI |
| Impresora doméstica | 200–300 DPI |
| Póster de gran formato (visto desde lejos) | 100–150 DPI |
| Valla publicitaria (vista desde 10+ metros) | 15–30 DPI |
| Documento de oficina estándar | 150–200 DPI |

**La regla:** cuanto más cerca esté el observador de la pieza impresa, mayor debe ser el DPI.

---

## Calcular el Tamaño de Impresión a partir de las Dimensiones en Píxeles

Aquí está la fórmula clave:

> **Tamaño de impresión (pulgadas) = Dimensión en píxeles ÷ DPI**

Entonces, si tienes una imagen de 3000×2000 píxeles y quieres imprimir a 300 DPI:
- Ancho: 3000 ÷ 300 = **10 pulgadas**
- Alto: 2000 ÷ 300 = **6.67 pulgadas**

Si intentas imprimir esa misma imagen de 3000×2000 a un tamaño mayor — digamos 20×13 pulgadas a 300 DPI — necesitarías una imagen de 6000×3900 píxeles. Estirar la imagen de 3000×2000 a ese tamaño significa imprimir a solo 150 DPI, lo que se verá notablemente suave.

---

## Por Qué las Imágenes Se Ven Bien en Pantalla pero Borrosas al Imprimir

Este es uno de los problemas de imagen más comunes que encuentran las personas.

**La causa:** Una imagen que se ve nítida en pantalla puede no tener suficientes píxeles para el tamaño de impresión físico que deseas.

**Ejemplo:** Una foto de una aplicación de mensajería o redes sociales a menudo se comprime a 1080×1080 píxeles. En pantalla a 5 pulgadas de ancho, eso es aproximadamente 216 PPI — suficientemente nítido. Pero intenta imprimirla a 8×8 pulgadas a 300 DPI, y solo tienes 135 DPI — notablemente suave.

**La solución:** Siempre usa el original de mayor resolución que tengas. Para impresión profesional, tu imagen necesita suficientes píxeles para imprimir a 300 DPI al tamaño deseado.

---

## Megapíxeles y Resolución de Cámaras

A menudo verás cámaras comercializadas por su cuenta de megapíxeles. Esto es lo que significa para la impresión:

| Resolución de Cámara | Tamaño Máximo de Impresión a 300 DPI |
|---|---|
| 8 MP (3264×2448) | ~10.9 × 8.2 pulgadas |
| 12 MP (4000×3000) | ~13.3 × 10 pulgadas |
| 20 MP (5472×3648) | ~18.2 × 12.2 pulgadas |
| 48 MP (8000×6000) | ~26.7 × 20 pulgadas |

Los smartphones modernos con cámaras de 12–50 MP pueden producir excelente calidad de impresión para tamaños estándar como 4×6, 5×7 y 8×10 pulgadas.

---

## Errores Comunes de Resolución

### Usar Imágenes de Baja Resolución para Impresión
Descargar imágenes de sitios web para usar en materiales impresos es un error clásico. Las imágenes web están optimizadas para archivos pequeños a resolución de pantalla — rara vez tienen suficientes píxeles para una impresión de calidad.

### Confundir "Redimensionar" con "Aumentar la Resolución"
Redimensionar una imagen a dimensiones más grandes no agrega información de píxeles — simplemente estira los píxeles existentes. Una imagen de 500×500 redimensionada a 2000×2000 se verá borrosa porque el software está adivinando el detalle que falta (este proceso se llama "escalado" o "sobremuestreo").

### Ignorar el DPI al Exportar para Impresión
Algunas herramientas de diseño te permiten establecer el DPI al exportar. Si exportas una imagen optimizada para web a 72 DPI pero pretendes imprimirla, puedes obtener una impresión física más pequeña de lo esperado — o una borrosa.

---

## Referencia Rápida: Resolución para Usos Comunes

| Caso de Uso | Dimensiones en Píxeles Recomendadas |
|---|---|
| Banner de ancho completo para sitio web | 1920×1080 px mínimo |
| Publicación de Instagram (cuadrado) | 1080×1080 px |
| Retrato de Instagram | 1080×1350 px |
| Foto de portada de Facebook | 851×315 px |
| Banner de LinkedIn | 1584×396 px |
| Imagen para newsletter por correo | 600–800 px de ancho |
| Impresión de foto 4×6 (300 DPI) | 1200×1800 px |
| Impresión de foto 8×10 (300 DPI) | 2400×3000 px |
| Impresión de documento A4 (300 DPI) | 2480×3508 px |

---

## Gestión de la Resolución de Imagen con NanoImage

¿Necesitas redimensionar una imagen a dimensiones específicas en píxeles? [La herramienta de Redimensionado de NanoImage](https://nanoimage.net/resize-image) te permite establecer dimensiones exactas en píxeles directamente en tu navegador — sin necesidad de software.

¿Necesitas reducir el tamaño del archivo sin cambiar las dimensiones? [Comprimir](https://nanoimage.net/compress-image) también se encarga de eso.

---

## Herramientas Relacionadas

- **[Redimensionar Imagen](https://nanoimage.net/resize-image)** — Establece dimensiones exactas en píxeles
- **[Comprimir Imagen](https://nanoimage.net/compress-image)** — Reduce el tamaño del archivo manteniendo las dimensiones
- **[Recortar Imagen](https://nanoimage.net/crop-image)** — Elimina áreas no deseadas y cambia la relación de aspecto
`;
