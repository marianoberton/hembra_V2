# Carpeta de imágenes de Servicios

Colocá las imágenes de cada servicio en este directorio usando alguno de estos formatos: `webp`, `jpg`, `png` o `avif`.

Nombres esperados:
- `estrategia.(webp|jpg|png|avif)`
- `alma.(webp|jpg|png|avif)`
- `innovacion.(webp|jpg|png|avif)`
- `prototipado.(webp|jpg|png|avif)`
- `produccion.(webp|jpg|png|avif)`

Notas:
- Preferí `webp` por mejor peso/calidad.
- Minúsculas, sin espacios ni acentos.
- Dimensiones sugeridas: ancho 1600–1920 px, calidad ~75.

El código intenta las extensiones en cascada: `webp → jpg → png → avif`. Si ninguna imagen existe, se muestra `public/placeholder.svg`.