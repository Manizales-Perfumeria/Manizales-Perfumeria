# Manizales Perfumería - Guía de Instalación

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
4. Se mostrará badge "Oferta" automáticamente

### Activar/Desactivar
- En la lista de productos, click "Activar" o "Desactivar"

## 📱 Características

- ✅ Diseño 100% responsive (móvil, tablet, PC)
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