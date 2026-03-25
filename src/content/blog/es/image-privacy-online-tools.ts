export const content = `
Tienes una foto que necesitas comprimir, rotar o redimensionar. Buscas en internet, encuentras una herramienta, subes tu imagen y descargas el resultado. Bastante sencillo.

Pero, ¿qué pasó con tu foto en el proceso?

La mayoría de las personas nunca se lo preguntan. Este artículo explica lo que realmente sucede cuando subes una imagen a una herramienta en línea — y cómo protegerte cuando necesitas editar fotos sensibles.

## ¿Qué sucede cuando subes una imagen en línea?

Cuando usas una herramienta de imagen típica en línea, esto es lo que ocurre detrás de escena:

1. Seleccionas tu foto y haces clic en subir
2. Tu imagen se envía a través de internet al servidor de la herramienta (una computadora propiedad o alquilada por esa empresa)
3. El servidor procesa tu imagen (la comprime, redimensiona, etc.)
4. La imagen procesada se envía de vuelta a tu navegador para descargar

Tu foto existe en la computadora de otra persona durante este proceso. Si permanece allí después depende completamente de las políticas de esa empresa — y la mayoría de las personas nunca leen esas políticas.

## ¿Realmente conservan tus imágenes?

La respuesta honesta: **depende de la herramienta, y la mayoría no te lo dice claramente.**

Estos son los diferentes enfoques que toman las herramientas:

**"Se eliminan inmediatamente después del procesamiento"** — Algunas herramientas afirman eliminar los archivos subidos al instante después de la descarga. Esta es la política más respetuosa con la privacidad para herramientas basadas en servidor. Pero "inmediatamente" suele significar en unos segundos o minutos, y estás confiando en su palabra.

**"Se eliminan después de X horas"** — Muchas herramientas conservan tus archivos de 1 a 24 horas para permitirte volver a descargarlos. Esto es común y conveniente, pero tu imagen permanece en su servidor durante ese tiempo.

**"Pueden ser retenidas para mejorar el servicio"** — Esto es preocupante. Algunas herramientas usan las imágenes subidas para entrenar sistemas o mejorar algoritmos. Esto suele estar oculto en los términos de servicio.

**Sin política declarada** — Muchas herramientas pequeñas simplemente no abordan este tema. No tener una política declarada no es lo mismo que tener una política protectora de la privacidad.

## ¿Por qué esto realmente importa?

Para la mayoría de las imágenes — una foto de producto, un meme, una captura de pantalla de algo público — el riesgo de privacidad es bajo. Pero considera estos escenarios:

**Documentos gubernamentales e identificaciones.** Muchas solicitudes de visa y permisos requieren fotos con requisitos específicos de tamaño. La gente comprime rutinariamente fotos de pasaportes, tarjetas de identidad y documentos oficiales con herramientas en línea cualquiera. Estos documentos contienen tu nombre completo, fecha de nacimiento, dirección y número de identificación.

**Imágenes médicas.** Capturas de pantalla de apps de salud, fotos de estudios médicos, fotos de recetas. Estos son algunos de los archivos más sensibles que podrías tener en tu teléfono.

**Documentos empresariales y financieros.** Capturas de contratos, estados financieros, correos confidenciales. Si los comprimes para una entrega de trabajo, enviarlos a través de un servidor de terceros es un riesgo de seguridad.

**Fotos personales.** Fotos tuyas, de tu familia, de tu hogar — aunque no sean inmediatamente sensibles, son datos personales que quizás no quieras almacenados en servidores desconocidos.

## ¿En qué se diferencian las herramientas basadas en el navegador?

Una categoría más reciente de herramientas de imagen procesa todo directamente en tu navegador, usando una tecnología llamada Canvas API. Estas herramientas nunca necesitan enviar tu imagen a ningún lugar.

Cuando usas una herramienta basada en el navegador como [NanoImage](https://nanoimage.net):

1. Seleccionas tu foto
2. El procesamiento ocurre completamente dentro de tu navegador, en tu propio dispositivo
3. El resultado se guarda directamente en tu dispositivo
4. En ningún momento tu imagen viaja por internet hacia ningún servidor

Esta no es una diferencia de política — es una diferencia técnica. La herramienta es físicamente incapaz de almacenar tu imagen porque nunca la recibe.

## ¿Cómo verificar si una herramienta sube tus imágenes?

Algunas formas de comprobarlo:

**Revisa la política de privacidad.** Busca palabras como "subir", "almacenar", "retener", "eliminar" y "terceros". Una herramienta confiable será explícita sobre lo que sucede con tus archivos.

**Observa el tráfico de red.** En cualquier navegador, puedes abrir las Herramientas de Desarrollo (F12 o clic derecho → Inspeccionar) e ir a la pestaña Red. Sube una imagen y observa si aparecen solicitudes de red. Una herramienta basada en el navegador no mostrará actividad de subida.

**Busca funcionalidad sin conexión.** Si una herramienta funciona cuando apagas tu internet después de que la página cargue, definitivamente está procesando localmente. Las herramientas basadas en servidor fallarán sin conexión.

## ¿Cuándo ser especialmente cuidadoso?

Usa una herramienta basada en el navegador que priorice la privacidad cada vez que estés editando:

- Fotos de pasaporte o tarjeta de identidad
- Documentos médicos o historiales de salud
- Fotos de documentos financieros
- Documentos empresariales marcados como confidenciales
- Cualquier imagen que no querrías almacenada en la computadora de un desconocido

Para uso casual — redimensionar una foto de vacaciones o comprimir una imagen de comida para redes sociales — el riesgo es menor. Pero desarrollar el hábito de usar herramientas basadas en el navegador por defecto es un enfoque razonable.

## Conclusión

La mayoría de las herramientas de imagen en línea populares suben tus archivos a sus servidores. Algunas los eliminan rápidamente, otras los conservan más tiempo, y algunas no te lo dicen claramente.

Las herramientas basadas en el navegador que procesan imágenes localmente — como NanoImage — son técnicamente incapaces de almacenar tus imágenes porque nunca las reciben. Para fotos sensibles, esta es la opción más segura.

Antes de subir tu próxima foto a una herramienta en línea, tómate treinta segundos para verificar: ¿esta herramienta sube mi imagen a un servidor o la procesa en mi navegador?

La respuesta marca una diferencia mayor de lo que la mayoría de las personas creen.
`;
