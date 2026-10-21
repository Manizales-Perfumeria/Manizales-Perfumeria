# Manizales Perfumería - Guía de Instalación

## 🗓️ Publicación en GitHub Pages

El sitio se publica en:

```
https://manizales-perfumeria.github.io/Manizales-Perfumeria/
```

La URL lleva la subcarpeta porque la cuenta `Manizales-Perfumeria` es de tipo
**usuario**: GitHub Pages solo sirve en la raíz (`manizales-perfumeria.github.io/`)
un repositorio llamado exactamente `Manizales-Perfumeria.github.io`. Con este
repo, el sitio queda en la subcarpeta `/Manizales-Perfumeria/`.

Para publicar: `git add -A && git commit -m "..." && git push origin main`.
GitHub Pages recompila solo; tarda entre 1 y 3 minutos.

### Aviso de novedades

`js/novedades.js` muestra en el menú un aviso con los cambios de la última
actualización, con un distintivo **NUEVO** durante los primeros días desde
`CONFIG.fechaLanzamiento`. Para cambiar la ventana:

```js
// js/novedades.js
fechaLanzamiento: '2026-10-20',   // día en que se publica
diasVisibles: 32,                  // cuántos días dura el distintivo
activo: true                       // false = quita la opción del menú
```

### Notas de la actualización del 20 de octubre de 2026

- `js/aura-ai-engine.js` se eliminó. Nunca se llamaba a su `init()`, así que
  jamás ejecutó nada, y el modelo que descargaba (BART-large-MNLI) pesa unos
  400 MB, no los 50 MB que decía su propio comentario. Además no entiende
  español. El asistente ahora funciona con un motor propio, sin descargas.
- `data/productos.json.js` se genera minificado con `data/rebuild_js.py`.
- `img/thumbs/` contiene las miniaturas WebP de 600 px que usan las tarjetas.
  Se regeneran con `python data/generar_thumbs.py`.

## 📁 Estructura del Proyecto

```
manizales-perfumeria/
├── index.html              ← Página principal
├── admin/                  ← Panel de administración
│   ├── config.php          ← Configuración (BD, usuario)
│   ├── login.php           ← Login del admin
│   ├── index.php           ← Dashboard
│   ├── productos.php       ← Lista de productos
│   ├── agregar.php         ← Agregar/Editar producto
│   ├── logout.php          ← Cerrar sesión
│   └── css/admin.css       ← Estilos del admin
├── css/style.css           ← Estilos principales
├── js/main.js              ← JavaScript principal
├── data/productos.json     ← Productos (respaldo)
├── img/productos/          ← Imágenes de perfumes
├── sql/                    ← Script de base de datos
│   └── manizales_perfumeria.sql
└── README.md               ← Este archivo
```

## 🚀 Instalación en InfinityFree

### Paso 1: Crear cuenta
1. Ve a https://infinityfree.com
2. Crea una cuenta gratuita
3. Crea un nuevo sitio web

### Paso 2: Subir archivos
1. Ve al File Manager de InfinityFree
2. Sube TODOS los archivos a la carpeta `htdocs`
3. Asegúrate de mantener la estructura de carpetas

### Paso 3: Crear base de datos
1. Ve a "MySQL Databases" en el panel
2. Crea una nueva base de datos
3. Anota: hostname, nombre de BD, usuario y contraseña
4. Ve a phpMyAdmin
5. Importa el archivo `sql/manizales_perfumeria.sql`

### Paso 4: Configurar
1. Abre `admin/config.php`
2. Cambia los valores de la base de datos:
   - DB_HOST → tu hostname MySQL
   - DB_NAME → tu nombre de base de datos
   - DB_USER → tu usuario MySQL
   - DB_PASS → tu contraseña MySQL
3. Cambia SITE_URL por tu URL real

### Paso 5: Probar
1. Ve a tu sitio web
2. Prueba el login: `admin` / `manizales2024`
3. Agrega productos desde el panel

## 🔧 Cómo Usar el Panel de Administración

### Login
- URL: `tusitio.com/admin/login.php`
- Usuario: `admin`
- Contraseña: `manizales2024`

### Agregar un perfume
1. Click en "Agregar Producto"
2. Llena los datos (nombre, marca, precio, etc.)
3. Sube la imagen
4. Selecciona categoría (hombre/mujer) y tipo de olor
5. Click "Agregar Producto"

### Poner en promoción
1. Edita el producto
2. Marca "Está en promoción"
3. Agrega el precio anterior
4. El sitio **no muestra descuentos**: el badge de oferta se retiró y el
   precio que ve el cliente es siempre el precio real. El dato queda solo
   como referencia interna en el panel.

### Eventos temáticos (sin descuentos)
- Los eventos (Halloween, Navidad, San Valentín, Día de la Madre, Día del
  Padre, Amor y Amistad, Black Friday y Semana Santa) cambian la temática
  del sitio y muestran **las fragancias que mejor encajan** con esa fecha.
- **No aplican ningún porcentaje de descuento**: no hay precio tachado, ni
  distintivo de "-X%", ni banner de descuento. El precio es siempre el real.

### Activar/Desactivar
- En la lista de productos, click "Activar" o "Desactivar"

## 📱 Características

- ✅ Diseño 100% responsive (móvil, tablet, PC)
- ✅ Buscador en el inicio: busca en todo el catálogo sin salir de la portada
- ✅ Colores dinámicos por tipo de perfume
- ✅ Botón flotante de WhatsApp
- ✅ Panel de administración completo
- ✅ Filtros por categoría
- ✅ Sin dependencias externas (funciona offline)

## 🎨 Colores por Tipo de Perfume

| Tipo | Color | Emoji |
|------|-------|-------|
| Fresco | Azul | 🌊 |
| Elegante | Dorado | ✨ |
| Aromático | Verde | 🌿 |
| Floral | Rosa | 💐 |
| Dulce | Morado | 🍬 |
| Deportivo | Naranja | ⚡ |

## 📞 Contacto

- WhatsApp: +57 314 7551411
- Instagram: @carlosmario0528
- Instagram: @santiago_pineda219

## ⚠️ Notas Importantes

1. **Imagen del producto**: Para el Clinique Happy, guarda tu imagen como `clinique-happy-men.jpg` en la carpeta `img/productos/`

2. **Cambios después de publicar**: Entra al panel de admin para agregar/editar productos. Los cambios se reflejan automáticamente.

3. **Hosting gratuito**: InfinityFree es gratis pero tiene algunas limitaciones. Si necesitas más rendimiento, considera Hostinger (~$5/mes).