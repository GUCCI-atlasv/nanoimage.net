export const content = `
# Cómo redimensionar una foto para una solicitud de visado o pasaporte

Los requisitos de fotografía para pasaporte y visado son famosamente estrictos. Dimensiones incorrectas, tamaño de archivo inadecuado, fondo equivocado —y tu solicitud se rechaza. Volver a tramitar la foto cuesta tiempo y a veces dinero, y puede retrasar tus planes de viaje.

Esta guía recoge los requisitos exactos para los pasaportes y visados más habituales y te explica paso a paso cómo redimensionar y preparar la foto tú mismo —gratis, en el navegador.

---

## Por qué los requisitos de la foto de pasaporte son tan estrictos

Las fotos de pasaporte se usan para reconocimiento facial, verificación de identidad y coincidencia biométrica. Los requisitos estrictos de tamaño garantizan:

- Que el rostro esté siempre en la misma posición y escala para la comparación automática
- Que la foto encaje en las dimensiones físicas del librete del pasaporte
- Que los sistemas digitales puedan extraer los rasgos faciales con fiabilidad

La mayoría de los rechazos se deben a **proporción (relación de aspecto) incorrecta**, **cara demasiado pequeña o demasiado grande en el encuadre** o **tamaño de archivo demasiado grande o pequeño** —no porque la foto «se vea mal».

---

## Tamaños de foto de pasaporte por país

### Estados Unidos (pasaporte estadounidense)

| Requisito | Especificación |
|-------------|------|
| Tamaño de impresión | 2 × 2 pulgadas (51 × 51 mm) |
| Tamaño digital | Mínimo 600 × 600 px, hasta 1200 × 1200 px |
| Relación de aspecto | 1:1 (cuadrada) |
| Tamaño de archivo | 240 KB a 10 MB (solicitudes en línea) |
| Tamaño del rostro | La cabeza debe ocupar el 50–69 % de la altura del encuadre |
| Fondo | Blanco liso o blanco roto |

### Reino Unido (pasaporte británico)

| Requisito | Especificación |
|-------------|------|
| Tamaño de impresión | 35 × 45 mm |
| Relación de aspecto | 35:45 (aproximadamente 7:9) |
| Tamaño digital | Mínimo 600 px en el lado más corto |
| Tamaño de archivo | Menos de 10 MB |
| Tamaño del rostro | 29–34 mm del mentón a la coronilla |
| Fondo | Gris claro o crema |

### Visado Schengen (UE)

| Requisito | Especificación |
|-------------|------|
| Tamaño de impresión | 35 × 45 mm |
| Relación de aspecto | 35:45 |
| Tamaño del rostro | 32–36 mm del mentón a la parte superior de la cabeza (70–80 % del encuadre) |
| Fondo | Claro/blanco |

### Pasaporte de Canadá

| Requisito | Especificación |
|-------------|------|
| Tamaño de impresión | 50 × 70 mm |
| Relación de aspecto | 5:7 |
| Tamaño del rostro | 31–36 mm del mentón a la coronilla |
| Fondo | Blanco |

### Pasaporte de Australia

| Requisito | Especificación |
|-------------|------|
| Tamaño de impresión | 35 × 45 mm |
| Relación de aspecto | 35:45 |
| Rostro | Debe ocupar el 70–80 % del encuadre |
| Fondo | Claro liso |

### Pasaporte / visado de India

| Requisito | Especificación |
|-------------|------|
| Tamaño de impresión | 51 × 51 mm (2 × 2 pulgadas) |
| Tamaño digital | 200 × 200 px a 1000 × 1000 px |
| Tamaño de archivo | 10 KB a 1 MB |
| Fondo | Blanco |

---

## Paso a paso: preparar tu foto de pasaporte

### Paso 1: Hacer la foto

Antes de redimensionar nada, necesitas una buena foto de partida:

- **Fondo liso:** Usa una pared blanca o de color claro. Evita sombras —separa unos treinta centímetros de la pared.
- **Expresión neutra:** Boca cerrada, ojos abiertos y claramente visibles.
- **Posición de la cabeza:** Mira directamente a la cámara. Sin inclinar la cabeza.
- **Sin gafas:** La mayoría de los países rechazan ya las fotos con gafas.
- **Iluminación:** Luz uniforme en el rostro. Sin sombras duras a un lado.

Haz la foto con buena luz (cerca de una ventana suele ir bien) con cualquier cámara de smartphone en orientación vertical.

### Paso 2: Recortar con la proporción correcta

Abre [NanoImage Recortar](/crop/) y sube tu foto.

Para **pasaportes de EE. UU. e India:** elige el preset **1:1** → coloca el cuadro de recorte de modo que el rostro quede centrado, con espacio sobre la cabeza y bajo el mentón → recorta.

Para **pasaportes del Reino Unido, Schengen y Australia:** elige proporción **Personalizada** → introduce **35:45** → coloca el rostro de forma que ocupe el 70–80 % de la altura del encuadre → recorta.

Para **pasaporte canadieno:** elige **Personalizada** → introduce **5:7** → recorta.

**Consejo de encuadre:** Los ojos deberían quedar en el tercio superior del encuadre, aproximadamente a 2/3 de altura desde el borde inferior de la imagen.

### Paso 3: Redimensionar a las medidas exigidas

Abre [NanoImage Redimensionar](/resize/) y sube la foto ya recortada.

Introduce las dimensiones objetivo en píxeles. Para la mayoría de las solicitudes en línea:
- Pasaporte de EE. UU. (digital): **600 × 600 px** (mínimo) —puedes subir hasta 1200 × 1200 px
- Reino Unido / Schengen / Australia (digital): **600 × 771 px** (escala 35:45 a 600 px de ancho)
- Canadá (digital): **600 × 840 px** (escala 5:7 a 600 px de ancho)
- India (digital): **600 × 600 px**

Asegúrate de que **Bloquear relación de aspecto** esté activado. Como ya recortaste con la proporción correcta, las medidas deberían calcularse bien.

### Paso 4: Comprobar el tamaño del archivo

La mayoría de los portales de envío de fotos de pasaporte en línea imponen un límite de tamaño (habitualmente 240 KB–10 MB).

Comprueba el tamaño de tu foto redimensionada. Si es demasiado grande, abre [NanoImage Comprimir](/compress/), sube la foto, define un tamaño objetivo ligeramente por debajo del límite y descarga.

Si es demasiado pequeña (raro pero posible), la foto puede tener resolución insuficiente —vuelve a hacerla con más resolución.

---

## Motivos habituales de rechazo (y cómo evitarlos)

**Cara demasiado pequeña:** Si la cabeza ocupa menos del 50 % de la altura del encuadre, rechazan la foto. Acerca el recorte al rostro —deja menos espacio vacío sobre la cabeza.

**Cara demasiado grande:** Si la cabeza se corta arriba o en el mentón, amplía el recorte para dejar más margen. El objetivo suele ser un 70–80 % de cobertura del rostro en el encuadre.

**Proporción incorrecta:** Una foto vertical recortada desde horizontal no tendrá automáticamente la proporción adecuada. Usa siempre la herramienta de recorte con proporción personalizada, no a ojo.

**Sombra en el fondo:** Rechazo por no cumplir el requisito de «fondo liso». Vuelve a hacer la foto con más distancia entre tú y la pared.

**Archivo demasiado grande:** Muchos portales gubernamentales tienen límites estrictos (a veces tan bajos como 240 KB en solicitudes de EE. UU.). Usa la compresión con tamaño objetivo para alcanzar un KB concreto.

**Formato incorrecto:** Algunos portales exigen JPEG (no PNG ni WebP). Usa [NanoImage Convertir a JPG](/convert-jpg/) para asegurarte de que la salida sea .jpg.

---

## Por qué hacerlo en el navegador

Una foto de pasaporte muestra tu rostro completo, datos biométricos y suele ir ligada a información personal. Una herramienta basada en servidor implica subir una foto facial en alta resolución a un tercero.

NanoImage procesa todo en tu navegador —el recorte, el redimensionado y la compresión ocurren en tu dispositivo. Tu foto no sale de tu ordenador ni de tu teléfono.

---

## Preguntas frecuentes

**¿Puedo hacerme la foto de pasaporte en casa?**
Sí —para envíos digitales y muchas solicitudes presenciales se aceptan fotos hechas por uno mismo si cumplen los requisitos técnicos. La foto debe ser reciente (normalmente de los últimos 6 meses).

**¿Tiene que imprimirse la foto o puedo enviarla solo en digital?**
La mayoría de los trámites nuevos de pasaporte (EE. UU., Reino Unido, Canadá, Australia) permiten foto digital. Consulta el portal concreto de tu solicitud. Para entregas en oficina de correos o centros de fotografía necesitarás copia impresa.

**¿Qué resolución debo usar?**
Para envíos digitales: 600 px en el lado corto es el mínimo en muchos portales. 1200 px es seguro para todos sin superar límites superiores habituales.

**¿Puedo usar foto con gafas?**
Entre 2023 y 2026, prácticamente todos los países importantes que emiten pasaporte rechazan fotos con gafas, incluidas graduadas y de sol. Quítate las gafas para la foto.

**Mi portal dice que el archivo sigue siendo demasiado grande aun después de comprimir. ¿Qué hago?**
Define un objetivo más agresivo en NanoImage Comprimir —prueba 200 KB en portales con límites muy ajustados. A 600×600 px, un JPEG con calidad 70–75 suele quedar por debajo de 100 KB con calidad aceptable.

---

## Resumen

Preparar tu propia foto de pasaporte o visado:

1. Haz una foto bien iluminada ante un fondo liso
2. [Recorta con la proporción correcta](/crop/) — 1:1 para EE. UU./India, 35:45 para Reino Unido/Schengen/Australia, 5:7 para Canadá
3. [Redimensiona a los píxeles exigidos](/resize/)
4. [Comprime para cumplir los límites de tamaño](/compress/) si hace falta
5. [Convierte a JPG](/convert-jpg/) si el portal exige JPEG

**[Redimensiona tu foto de pasaporte ahora — gratis, sin subida, sin cuenta →](/resize/)**
`;
