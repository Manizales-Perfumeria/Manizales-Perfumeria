/* ==========================================================================
   AURA AI — Sommelier de Perfumería e Inteligencia Artificial
   Perfumería Manizales — Motor 100% Frontend (Sin APIs externas)
   ========================================================================== */

var AuraIA = (function() {
    'use strict';

    // === ESTADO DE LA CONVERSACIÓN Y MEMORIA ===
    var state = {
        isOpen: false,
        isTyping: false,
        unreadCount: 0,
        currentFocusProduct: null,     // Último perfume mencionado o recomendado
        lastRecommendedIds: [],        // IDs de la última recomendación
        ultimaConsulta: null,            // Slots de la última búsqueda (base de los refinamientos)
        history: [],                   // Historial de mensajes en sesión
        userPreferences: {
            gender: null,              // 'hombre', 'mujer', 'unisex'
            occasion: null,            // 'cita', 'oficina', 'noche', 'diario', 'fiesta', 'calor', 'frio'
            scentType: null,           // 'dulce', 'amaderado', 'fresco', 'citrico', 'floral', 'oriental', 'cuero'
            budgetMax: null,
            potency: null,             // 'alta' o 'baja'
            excludedFamilies: []       // familias olfativas que el usuario NO quiere
        }
    };

    var STORAGE_KEY = 'manizales_aura_chat_v1';

    // === BASE DE CONOCIMIENTO SEMÁNTICO Y OLFAVO ===
    var KNOWLEDGE = {
        // Puntos de aplicación y fijación
        aplicacion: [
            "Para lograr la **máxima proyección y duración (hasta 12+ horas)**, aplica en los puntos de pulso donde la sangre fluye más cerca de la piel: **a los lados del cuello, clavículas, detrás de las orejas y en el pliegue interno de los codos**.",
            "💡 **Tip de Sommelier:** Aplica siempre crema hidratante sin aroma en la piel antes de perfumarte; una piel bien hidratada retiene las moléculas aromáticas el doble de tiempo.",
            "⚠️ **Nunca frotes las muñecas** después de aplicar el perfume. Frotar rompe las notas de salida (la apertura) y altera la evolución natural de la fragancia."
        ],
        // Concentraciones
        concentraciones: {
            edt: "Un **Eau de Toilette (EDT)** contiene entre 5% y 15% de aceites aromáticos. Suelen ser fragancias más frescas y ligeras, con una duración promedio de 4 a 6 horas.",
            edp: "Un **Eau de Parfum (EDP)** tiene entre 15% y 20% de concentración de aceites esenciales. Ofrece una duración de 8 a 10 horas con una estela notable y rica evolución.",
            parfum: "Un **Parfum / Extrait de Parfum / Elixir** supera el 20% al 40% de concentración pura. Son fragancias de fijación extrema (12+ horas) que dejan una estela inolvidable y maduran profundamente en piel."
        },
        // Envíos y tienda
        envios: "📍 En **Perfumería Manizales** realizamos entregas rápidas a domicilio en **Manizales, Villamaría y Neira**, y despachos seguros a toda Colombia coordinados directamente por WhatsApp.",
        pedidos: "💳 Para gestionar tu pedido o apartar tu fragancia, puedes presionar el botón **'Pedir por WhatsApp'** en cualquiera de nuestras recomendaciones o escribirnos directamente al **+57 314 7551411**. Aceptamos transferencias Bancolombia, Nequi, Daviplata y envíos nacionales.",
        originalidad: "✨ Todas nuestras fragancias son **100% originales, selladas y garantizadas** en su caja original, importadas directamente de las casas perfumeras más prestigiosas del mundo árabe y de diseñador."
    };

    // === DICCIONARIOS DE INTENCIONES Y SINÓNIMOS ===
    var DICTIONARY = {
        // Saludos
        saludos: ['hola', 'buenas', 'buenos dias', 'buenas tardes', 'buenas noches', 'que tal', 'como estas', 'hey', 'saludos', 'hola aura', 'buen dia', 'parce', 'amigo', 'quiubo', 'que mas', 'buenas noches aura', 'hola buenas'],

        // Género
        hombre: ['hombre', 'hombres', 'masculino', 'caballero', 'chico', 'para mi novio', 'para mi esposo', 'para mi papa', 'para mi hermano', 'varonil', 'masculina', 'man', 'caballeros', 'para hombre', 'de hombre', 'para un hombre', 'para un man', 'mi novio', 'mi esposo', 'mi papa', 'mi hermano', 'mi hijo', 'para mi hijo', 'para un chico'],
        // OJO: 'para el' (de "para él") NO va aqui. Al normalizar se le quitan
        // los acentos y queda igual que "para el día de la madre", que es un
        // REGALO, no un hombre. El caso "para él" se resuelve aparte, mirando
        // si la frase termina en "para el".
        mujer: ['mujer', 'mujeres', 'femenino', 'dama', 'chica', 'para mi novia', 'para mi esposa', 'para mi mama', 'para mi hermana', 'femenina', 'senora', 'damas', 'para mujer', 'de mujer', 'para ella', 'para una mujer', 'mi novia', 'mi esposa', 'mi mama', 'mi hermana', 'mi hija', 'para mi hija', 'para una chica', 'para una senora'],
        unisex: ['unisex', 'ambos', 'para los dos', 'compartir', 'neutro', 'mixto', 'para cualquiera', 'para hombre o mujer'],

        // Eventos y Temporadas
        navidad: ['navidad', 'navideno', 'navidena', 'ano nuevo', 'diciembre', 'nochebuena', 'fin de ano', 'fiestas decembrinas', 'clima frio', 'invierno', 'dicembrino'],
        sanvalentin: ['san valentin', '14 de febrero', 'sanvalentin', 'enamorados', 'dia de los enamorados'],
        halloween: ['halloween', 'noche de brujas', 'octubre', 'misterio', 'misterioso'],
        diamadre: ['dia de la madre', 'dia de las madres', 'para mama', 'para mi mama', 'mama', 'regalo para mama', 'dia de la mama'],
        diapadre: ['dia del padre', 'dia de los padres', 'para papa', 'para mi papa', 'papa', 'regalo para papa'],
        blackfriday: ['black friday', 'blackfriday', 'viernes negro'],
        amorYamistad: ['amor y amistad', 'septiembre', 'dia del amor'],

        // Ocasiones ampliadas
        cita: ['cita', 'citas', 'conquistar', 'seducir', 'romantico', 'romantica', 'pareja', 'enamorar', 'sensual', 'atraccion', 'sexy', 'sexapil', 'aniversario', 'luna de miel', 'primera cita', 'salir con alguien', 'impresionar', 'gustarle', 'llamar la atencion', 'que le guste', 'que lo conquiste', 'que la conquiste'],
        oficina: ['oficina', 'trabajo', 'trabajar', 'formal', 'reunion', 'universidad', 'estudio', 'diario', 'todos los dias', 'versatil', 'firma', 'elegante', 'discreto', 'profesional', 'jefe', 'ejecutivo', 'valla de trabajo', 'valla a trabajar', 'vaya al trabajo', 'vaya a trabajar', 'al trabajo', 'en el trabajo', 'para el trabajo', 'cotidiano', 'dia a dia', 'para usar siempre', 'uso diario'],
        fiesta: ['fiesta', 'noche', 'rumba', 'discoteca', 'farra', 'salir', 'club', 'antorcha', 'destacar', 'imponente', 'llamar la atencion', 'proyeccion', 'pesada', 'modo bestia', 'bestia', 'evento', 'baile', 'parche', 'parchar', 'rumbear', 'recocha', 'jolgorio'],
        calor: ['calor', 'calido', 'verano', 'playa', 'dia soleado', 'fresco', 'sol', 'tarde', 'piscina', 'costa', 'caliente', 'humedo', 'humedad', 'clima caliente', 'clima tropical', 'cartagena', 'barranquilla', 'santa marta', 'cali', 'medellin caliente', 'tierra caliente', 'en la costa'],
        frio: ['frio', 'invierno', 'noche fria', 'lluvia', 'otono', 'acogedor', 'manizales', 'paramo', 'templado', 'bogota', 'clima frio', 'hace frio', 'frio extremo', 'temperatura baja'],
        gala: ['gala', 'boda', 'matrimonio', 'grado', 'graduacion', 'evento especial', 'lujo', 'exclusivo', 'etiqueta', 'quinceanos', 'primera comunion', 'ceremonia', 'coctel', 'prom', 'fiesta elegante', 'fiesta de gala', 'evento formal'],
        gym: ['gym', 'gimnasio', 'deporte', 'entrenar', 'ejercicio', 'sudor', 'frescor', 'ligero', 'correr', 'crossfit', 'cardio'],

        // Regalos (intención de regalo)
        regalo: ['regalo', 'regalar', 'obsequio', 'detalle', 'sorpresa', 'es para regalar', 'lo quiero regalar', 'lo quiero de regalo', 'para darle', 'para darle a', 'es un regalo', 'como regalo', 'de regalo', 'quiero regalar'],

        // Potencia y Duración (incluye modismos colombianos)
        potencia: [
            'fuerte', 'olor fuerte', 'dure arto', 'dure harto', 'dure mucho', 'dure bastante', 'duracion',
            'cuanto dura', 'fijacion', 'longevidad', 'proyeccion', 'estela', 'potente', 'durable', 'horas',
            'modo bestia', 'bestia', 'fijador', 'buena fijacion', 'que pegue', 'pesado', 'pesada', 'imponente',
            'penetrante', 'que se sienta', 'todo el dia', '10 horas', '12 horas', 'dure largo', 'oler bueno', 'oler rico', 'oler bien',
            'que dure todo el dia', 'que no se vaya', 'que permanezca', 'que perdure', 'larga duracion', 'muy potente'
        ],

        // Familias y Notas Olfativas (ampliadas)
        dulce: ['dulce', 'gourmand', 'vainilla', 'caramelo', 'chocolate', 'praline', 'tonka', 'haba tonka', 'miel', 'algodon de azucar', 'azucar', 'postre', 'malvavisco', 'delicioso', 'rico', 'comestible', 'almendra', 'avellana', 'butterscotch', 'toffee'],
        amaderado: ['amaderado', 'madera', 'maderas', 'cedro', 'sandalo', 'vetiver', 'oud', 'madera de oud', 'gaiac', 'pino', 'roble', 'madera oscura', 'bosque', 'musgo', 'pachuli'],
        citrico: ['citrico', 'citricos', 'bergamota', 'limon', 'naranja', 'mandarina', 'pomelo', 'toronja', 'lima', 'vital', 'energetico', 'vibrante', 'citrus', 'fresco citrico'],
        floral: ['floral', 'flores', 'rosa', 'rosas', 'jazmin', 'peonia', 'lirio', 'azahar', 'nardo', 'iris', 'violeta', 'orquidea', 'magnolia', 'flor de cerezo', 'floral femenino', 'bouquet'],
        oriental: ['oriental', 'ambar', 'resina', 'incienso', 'mirra', 'especias', 'especiado', 'arabe', 'arabes', 'calido', 'opulento', 'mistico', 'exotico', 'balsamo', 'canela', 'cardamomo'],
        cuero: ['cuero', 'ante', 'gamuza', 'leather', 'humo', 'tabaco', 'ceniza', 'tabaco y ron', 'ahumado', 'suede'],
        acuatica: ['acuatico', 'acuatica', 'marino', 'marina', 'oceano', 'brisa', 'agua', 'ozonico', 'limpio', 'jabon', 'fresco marino', 'viento', 'lluvia', 'niebla'],
        frutal: ['frutal', 'frutas', 'manzana', 'pina', 'maracuya', 'durazno', 'frutos rojos', 'fresa', 'pera', 'lichi', 'mango', 'coco', 'melon', 'cereza', 'mora', 'fruto de la pasion'],

        // Precios / Promociones
        precios: ['precio', 'precios', 'cuanto vale', 'cuanto cuesta', 'costo', 'valor', 'barato', 'economico', 'descuento', 'descuentos', 'oferta', 'ofertas', 'promocion', 'promociones', 'rebaja', 'rebajas', 'baratos', 'economicos', 'ganga', '3b', 'cuanto es', 'cuanto sale', 'a cuanto esta', 'hay descuento', 'hay oferta', 'tienen descuento', 'tienen ofertas', 'manejan descuento', 'hacen descuento'],

        // Stock / disponibilidad
        stock: ['tienen', 'tienen ese', 'tienen el', 'tienen la', 'hay', 'hay ese', 'hay stock', 'esta disponible', 'lo tienen', 'la tienen', 'disponible', 'en stock', 'agotado', 'si tienen', 'si hay'],

        // Negociación de precio
        negociacion: ['me hace precio', 'me da precio', 'me baja el precio', 'precio especial', 'descuento especial', 'algo mas barato', 'lo mas economico', 'por dos', 'si compro dos', 'combo', 'precio por mayoreo', 'precio al por mayor', 'me da uno mas barato', 'puede bajar'],

        // Marcas principales (ampliadas)
        marcas: ['afnan', 'lattafa', 'armaf', 'maison alhambra', 'al haramain', 'rasasi', 'bharara', 'orientica', 'club de nuit', 'asad', 'khamrah', 'yara', '9pm', 'fakhar', 'amber & leather', 'qaed al fursan', 'oud', 'fragrance world', 'surrati', 'swiss arabian', 'ajmal'],

        // Quejas y post-venta
        quejas: [
            'llego roto', 'llego danado', 'llego malo', 'llego mal', 'no llego', 'no ha llegado', 'no me ha llegado',
            'no llego mi pedido', 'quiero devolver', 'devolucion', 'cambio del producto', 'producto danado',
            'botella rota', 'perfume roto', 'envio perdido', 'paquete perdido', 'se perdio el paquete',
            'donde esta mi pedido', 'cuando llega mi pedido', 'mi pedido no llega', 'problema con mi pedido',
            'estoy molesto', 'estoy brava', 'estoy bravo', 'queja', 'inconformidad', 'mal servicio',
            'no me gusto', 'no era lo que esperaba', 'viene diferente', 'me mandaron otro', 'pedido incorrecto'
        ],

        // Negaciones explícitas
        negaciones: ['no quiero', 'sin', 'que no sea', 'que no tenga', 'no me gusta', 'no me gustan', 'nada de', 'evitar', 'que no huela', 'no dulce', 'no floral', 'no citrico', 'no amaderado', 'no oriental', 'no muy', 'nada muy', 'no tan'],

        // === NUEVAS CATEGORÍAS DE INTENCIÓN ===

        // Métodos de pago
        pagos: [
            'nequi', 'daviplata', 'bancolombia', 'pse', 'tarjeta de credito', 'tarjeta de debito',
            'efecty', 'contra entrega', 'contraentrega', 'transferencia', 'consignacion', 'efectivo',
            'como pago', 'como se paga', 'formas de pago', 'metodos de pago', 'aceptan tarjeta',
            'pago online', 'pago digital', 'billetera digital', 'pago contra entrega',
            'pago al recibir', 'aceptan nequi', 'aceptan daviplata', 'aceptan efectivo',
            'puedo pagar', 'puedo pagar con', 'como le pago', 'que medios de pago',
            'aceptan pagos', 'pago con nequi', 'pago con daviplata', 'hay contraentrega'
        ],

        // Seguimiento de pedido (no es queja — es consulta de estado)
        seguimiento: [
            'donde esta mi pedido', 'cuando llega mi paquete', 'ya salio', 'en camino',
            'fue despachado', 'fue enviado', 'numero de guia', 'guia de envio',
            'estado del pedido', 'mi pedido va', 'cuanto falta para llegar',
            'cuando me llega', 'ya fue enviado', 'lo enviaron', 'lo despacharon',
            'ya lo enviaron', 'ya lo despacharon', 'cuando llega mi pedido',
            'cuanto se demora', 'cuantos dias tarda', 'en cuantos dias llega',
            'el paquete', 'mi paquete', 'el envio', 'mi envio'
        ],

        // Más vendidos / Top de popularidad / Ver catálogo general
        masvendidos: [
            'mas vendido', 'mas vendidos', 'el que mas piden', 'el top', 'los top',
            'el numero uno', 'cuales son los mejores', 'cual piden mas', 'el favorito',
            'el clasico', 'el estrella', 'que recomiendas', 'que me recomiendas',
            'cual recomiendas', 'mas popular', 'mas populares', 'el hit', 'los hits',
            'trending', 'los de moda', 'lo que esta de moda', 'los mas solicitados',
            'los mas pedidos', 'el preferido', 'el mas exitoso', 'los mas exitosos',
            'el ganador', 'los top ventas', 'top ventas', 'best seller', 'bestseller',
            // Variantes naturales de "recomendár" (muy usadas por clientes)
            'recomienda', 'me recomienda', 'que recomienda', 'recomiendame', 'recomiendenos',
            'me puede recomendar', 'pueden recomendar', 'que me recomienda', 'que nos recomiendas',
            'que me recomiendan', 'me recomiendan', 'que me recomendarias', 'cual me recomendarias',
            // Solicitudes de ver catálogo / opciones
            'que perfumes tienen', 'que perfumes tienes', 'que tienes', 'que hay',
            'muestrame', 'muestrame algo', 'muestrame opciones', 'quiero ver opciones',
            'ver opciones', 'ver perfumes', 'ver fragancias', 'ver catalogo',
            'que fragancias tienes', 'que fragancias tienen', 'que opciones hay',
            'que opciones tienen', 'cuales tienen', 'que hay disponible',
            'muestra opciones', 'dame opciones', 'dame una opcion', 'enseñame'
        ],

        // Novedades / nuevos productos
        nuevos: [
            'nuevo', 'nuevos', 'nueva', 'nuevas', 'novedades', 'novedad',
            'llegaron nuevos', 'que hay de nuevo', 'ultimas llegadas', 'recien llegado',
            'recien llegados', 'ultimo lanzamiento', 'lo ultimo', 'acaban de llegar',
            'llegaron', 'hay algo nuevo', 'los mas nuevos', 'los de ultima hora',
            'lo mas reciente', 'ultimos lanzamientos', 'lanzamientos nuevos'
        ],

        // Empaque y presentación de regalo
        empaque: [
            'empaque', 'empacan', 'empaquetan', 'caja de regalo', 'papel de regalo',
            'bolsa de regalo', 'presentacion de regalo', 'viene en caja', 'viene bien presentado',
            'esta bien empacado', 'lo envuelven', 'packaging', 'como viene empacado',
            'viene en caja original', 'viene sellado', 'presentacion', 'bien presentado',
            'bonita presentacion', 'lleva caja', 'trae caja', 'es bonita la caja'
        ],

        // Horarios de atención
        horarios: [
            'horario', 'horarios', 'a que hora atienden', 'cuando atienden', 'estan abiertos',
            'cuando abren', 'cuando cierran', 'dias de atencion', 'atienden hoy',
            'atienden los domingos', 'atienden sabados', 'atienden fines de semana',
            'hasta que hora', 'desde que hora', 'que dias atienden', 'horario de atencion',
            'estan disponibles', 'hay alguien', 'hay atencion'
        ],

        // Redes sociales y contacto digital
        redes: [
            'instagram', 'facebook', 'tiktok', 'redes sociales', 'pagina web', 'pagina',
            'tienda en linea', 'tienda online', 'web', 'como los sigo', 'donde los sigo',
            'tienen pagina', 'tienen instagram', 'tienen tiktok', 'tienen facebook',
            'como los encuentro', 'arroba', 'perfil de instagram', 'cuenta de instagram',
            'que es la cuenta', 'cuales son las redes'
        ],

        // Layering / combinar fragancias
        layering: [
            'combinar', 'mezclar', 'layering', 'capas', 'dos perfumes juntos',
            'ponerse dos perfumes', 'usarlos juntos', 'que combina con', 'que va bien con',
            'se pueden mezclar', 'se pueden combinar', 'se pueden usar juntos',
            'quedan bien juntos', 'como hacer capas', 'que queda bien con',
            'que perfume va bien', 'como se combinan', 'puedo usar dos a la vez'
        ],

        // Piel sensible / alergias
        pielsensible: [
            'piel sensible', 'alergico', 'alergica', 'alergia', 'alergias', 'piel reactiva',
            'piel delicada', 'sin alcohol', 'hipoalergenico', 'me da alergia', 'me irrita',
            'irritacion', 'me produce alergia', 'tengo piel sensible', 'soy alergico',
            'podria reaccionar', 'reaccion alergica', 'sensibilidad', 'piel irritable'
        ],

        // Interés en producto ya mostrado — cliente quiere comprar lo que se le recomendó
        interesMostrado: [
            'ese', 'ese mismo', 'quiero ese', 'dame ese', 'como lo pido', 'como lo compro',
            'quiero comprarlo', 'quiero pedirlo', 'como pido ese', 'lo quiero pedir',
            'el primero', 'el segundo', 'el tercero', 'el de arriba', 'el ultimo',
            'cualquiera de esos', 'todos me gustan', 'me llevo ese', 'apartame ese',
            'separame ese', 'lo aparto', 'lo reservo', 'me intereso', 'me gusto ese',
            'me gusto el primero', 'me gusto el segundo', 'quiero el primero',
            'quiero el segundo', 'el mas barato de esos', 'el mas economico de esos',
            'me quedo con ese', 'me quedo con el primero', 'me quedo con el segundo'
        ],

        // Afirmaciones simples (cliente dice sí con modismos colombianos)
        afirmaciones: [
            'si', 'claro', 'dale', 'listo', 'ok', 'okay', 'perfecto', 'de acuerdo',
            'va', 'venga', 'chevere', 'bacano', 'eso', 'eso mismo', 'exacto',
            'correcto', 'seguro', 'con gusto', 'claro que si', 'por supuesto',
            'obvio', 'claro que si', 'claro que lo quiero', 'si claro',
            'si por favor', 'si me interesa', 'si quiero', 'si lo quiero'
        ],

        // Negativas simples
        negativas: [
            'no gracias', 'no por ahora', 'mejor no', 'no me interesa',
            'paso', 'mas adelante', 'luego', 'despues', 'no ahorita',
            'lo pienso', 'lo pienso y vuelvo', 'voy a pensar'
        ]
    };

    // Palabras fuera de dominio (Guardrails)
    var OUT_OF_DOMAIN = [
        'politica', 'presidente', 'elecciones', 'partido politico', 'gobierno', 'alcalde', 'senado', 'congreso', 'ministro',
        'receta', 'cocinar', 'como hacer arroz', 'como preparar', 'ingredientes para comida', 'comida', 'restaurante', 'menu',
        'programacion', 'javascript', 'python', 'codigo html', 'resolver ecuacion', 'matematicas', 'tarea de', 'ensayo sobre', 'chatgpt', 'inteligencia artificial',
        'futbol', 'partido de futbol', 'quien gano', 'champions league', 'messi', 'cristiano ronaldo', 'liga', 'mundial',
        'medico', 'sintomas de enfermedad', 'remedio para', 'pastilla para', 'diagnostico', 'doctor', 'hospital', 'salud',
        'religion', 'dios', 'iglesia', 'biblia', 'oracion', 'rezo', 'jesucristo', 'virgen maria',
        'sexo', 'sexual', 'erotic', 'xxx', 'pornografia', 'adulto contenido',
        'musica', 'cancion', 'artista', 'concierto', 'spotify', 'youtube video',
        'clima', 'temperatura', 'tiempo', 'lluvia', 'sol hoy', 'pronostico',
        'deportes', 'nba', 'nfl', 'tennis', 'baloncesto', 'voleibol',
        'tecnologia', 'celular', 'iphone', 'android', 'computador', 'laptop',
        'moda', 'ropa', 'zapatillas', 'tenis', 'camisa', 'pantalon',
        'mascota', 'perro', 'gato', 'animal', 'veterinario',
        'viaje', 'avion', 'hotel', 'pasaje', 'vuelo', 'destino turistico',
        'trabajo', 'empleo', 'curriculum', 'vacante', 'contratar', 'salario',
        'amor', 'relacion', 'noviazgo', ' separacion', 'terapia de pareja',
        'bitcoin', 'criptomoneda', 'inversion', 'bolsa', 'acciones', 'dinero',
        'astrologia', 'horoscopo', 'signo zodiacal', 'leo', 'acuario', 'escorpio'
    ];

    // === MAPA DE INSPIRACIONES: MARCAS EXTERNAS → PERFIL OLFATIVO (35 referencias) ===
    var INSPIRATIONS_MAP = [
        // Masculinos
        { keywords: ['bleu de chanel', 'bleu chanel', 'blue chanel'],    gender: 'hombre', scentType: 'amaderado', occasion: 'oficina',  desc: 'fresco amaderado con cedro y sándalo, elegante y versátil' },
        { keywords: ['sauvage', 'sauvaje', 'savaje dior', 'savage dior'], gender: 'hombre', scentType: 'amaderado', potency: 'alta',     desc: 'fresco especiado intenso con ambroxan y pimienta de Sichuan' },
        { keywords: ['one million', '1 million', 'un million'],           gender: 'hombre', scentType: 'oriental',  occasion: 'cita',    desc: 'cuero especiado dorado y seductor con notas de canela y madera' },
        { keywords: ['aventus creed', 'aventus creed'],                   gender: 'hombre', scentType: 'frutal',    potency: 'alta',     desc: 'frutal ahumado con piña, abedul y ámbar de lujo' },
        { keywords: ['invictus', 'invictus paco'],                        gender: 'hombre', scentType: 'acuatica',  occasion: 'gym',     desc: 'marino acuático fresco y deportivo con pomelo y sal' },
        { keywords: ['eros versace', 'versace eros', 'eros'],             gender: 'hombre', scentType: 'oriental',  occasion: 'cita',    desc: 'menta fresca sobre vainilla y madera seductora' },
        { keywords: ['dior homme', 'dior intense', 'homme dior'],         gender: 'hombre', scentType: 'floral',    occasion: 'gala',    desc: 'iris polvoroso sofisticado y muy elegante' },
        { keywords: ['tobacco vanille', 'tobacco tom ford', 'tom ford tobacco'], gender: 'hombre', scentType: 'oriental', occasion: 'frio', desc: 'tabaco ahumado con vainilla cálida y ron' },
        { keywords: ['acqua di gio', 'acqua de gio', 'acqua armani'],     gender: 'hombre', scentType: 'acuatica',  occasion: 'diario',  desc: 'marino fresco con bergamota y almizcle muy versátil' },
        { keywords: ['la nuit de lhomme', 'la nuit', 'la noche ysl'],     gender: 'hombre', scentType: 'oriental',  occasion: 'cita',    desc: 'cardamomo especiado cálido y seductor con cedro' },
        { keywords: ['terre dhermes', 'terre hermes', 'tierra hermes'],   gender: 'hombre', scentType: 'amaderado', occasion: 'gala',    desc: 'naranja y pomelo sobre tierra mineral y vetiver sofisticado' },
        { keywords: ['fahrenheit dior', 'fahrenheit', 'farenheit'],       gender: 'hombre', scentType: 'cuero',     occasion: 'fiesta',  desc: 'cuero violeta y gasolina, icónico e impactante' },
        { keywords: ['polo ralph lauren', 'polo sport', 'polo blue'],     gender: 'hombre', scentType: 'acuatica',  occasion: 'diario',  desc: 'fresco acuático clásico con menta y madera' },
        { keywords: ['hugo boss bottled', 'hugo boss', 'boss bottled'],   gender: 'hombre', scentType: 'amaderado', occasion: 'oficina', desc: 'manzana fresca con canela y cedro, el caballero ejecutivo' },
        { keywords: ['paco rabanne million', 'million privé'],             gender: 'hombre', scentType: 'oriental',  occasion: 'cita',    desc: 'caramelo amaderado oscuro y muy seductor' },
        // Femeninos
        { keywords: ['black opium', 'black opium ysl', 'opium negro'],   gender: 'mujer',   scentType: 'dulce',    occasion: 'fiesta',  desc: 'café negro adictivo con vainilla y flores blancas' },
        { keywords: ['la vie est belle', 'lavie est belle', 'la vie'],    gender: 'mujer',   scentType: 'dulce',    occasion: 'diario',  desc: 'iris pralinado luminoso con jazmín y vainilla gourmand' },
        { keywords: ['coco mademoiselle', 'mademoiselle chanel', 'mademoiselle'], gender: 'mujer', scentType: 'floral', occasion: 'oficina', desc: 'cítrico floral moderno con rosa y patchouli elegante' },
        { keywords: ['jadore dior', 'j adore', 'jadore', 'j\'adore'],   gender: 'mujer',   scentType: 'floral',   occasion: 'gala',    desc: 'bouquet floral luminoso de ylang ylang y jazmín' },
        { keywords: ['good girl', 'good girl carolina', 'carolina herrera good'], gender: 'mujer', scentType: 'dulce', occasion: 'cita', desc: 'jazmín y tonka sedosos con cacao y café' },
        { keywords: ['flowerbomb', 'flower bomb', 'viktor rolf'],         gender: 'mujer',   scentType: 'floral',   potency: 'alta',     desc: 'floral explosivo con rosas, jazmín y pachulí' },
        { keywords: ['chance chanel', 'chance eau tendre', 'chance'],     gender: 'mujer',   scentType: 'floral',   occasion: 'diario',  desc: 'floral cítrico fresco con iris y almizcle' },
        { keywords: ['olympea', 'olympia paco rabanne'],                  gender: 'mujer',   scentType: 'oriental', occasion: 'cita',    desc: 'vainilla salada y jengibre, moderno y seductor' },
        { keywords: ['ysl libre', 'ysl mon paris', 'libre ysl'],          gender: 'mujer',   scentType: 'floral',   occasion: 'fiesta',  desc: 'lavanda floral con frutos rojos, libre y moderno' },
        { keywords: ['miss dior', 'miss dior blooming', 'miss dior cherie'], gender: 'mujer', scentType: 'floral', occasion: 'diario', desc: 'fresas frescas y rosas rosadas, la mujer clásica' },
        { keywords: ['212 sexy', '212 carolina herrera', '212 vip'],      gender: 'mujer',   scentType: 'floral',   occasion: 'fiesta',  desc: 'floral sexy con rosa y almizcle, muy proyectivo' },
        { keywords: ['idole lancome', 'idole', 'idole eau de parfum'],    gender: 'mujer',   scentType: 'floral',   occasion: 'gala',    desc: 'rosa y bergamota luminosa sobre almizcle cálido' },
        { keywords: ['si giorgio armani', 'si armani', 'si parfum'],      gender: 'mujer',   scentType: 'frutal',   occasion: 'oficina', desc: 'grosella negra y rosa moderna, elegante y fresca' }
    ];

    // === CORRECTOR DE TYPOS EN NOMBRES DE PRODUCTOS ===
    // Mapea errores comunes de escritura a nombres correctos buscables
    var TYPO_MAP = {
        'jasad': 'asad',   'asadd': 'asad',
        'camrah': 'khamrah', 'jamrah': 'khamrah', 'hamrah': 'khamrah',
        'jara': 'yara', 'iara': 'yara', 'yra': 'yara',
        '9 pm': '9pm', 'nueve pm': '9pm', '9 p m': '9pm',
        'oud club': 'club de nuit', 'club night': 'club de nuit',
        'latafa': 'lattafa', 'lattfaa': 'lattafa',
        'afnan one': 'afnan', 'elman': 'al haramain',
        'rasaci': 'rasasi', 'rasasy': 'rasasi',
        'armaf club': 'club de nuit', 'armaf creed': 'club de nuit',
        'fajahr': 'fakhar', 'fajhar': 'fakhar',
        'clound': 'cloud', 'clounf': 'cloud', 'clooud': 'cloud', 'cloud pick': 'cloud pink',
        'clound pick': 'cloud pink', 'cloud pinkk': 'cloud pink', 'ariann': 'ariana', 'ariana grnde': 'ariana grande'
    };

    var STOP_WORDS = [
        'como', 'estas', 'esta', 'este', 'estos', 'estas', 'para', 'pero', 'solo', 'algo',
        'bueno', 'bien', 'hola', 'buenas', 'dias', 'tardes', 'noches', 'hacer', 'tener',
        'todo', 'toda', 'todos', 'todas', 'mucho', 'poco', 'mas', 'menos', 'aqui', 'alla',
        'esto', 'eso', 'aquel', 'unos', 'unas', 'otro', 'otra', 'otros', 'otras', 'donde',
        'cuando', 'quien', 'cual', 'cuales', 'porque', 'por', 'que', 'con', 'sin', 'sobre',
        'desde', 'hasta', 'entre', 'hacia', 'favor', 'dime', 'decir', 'ver', 'mirar', 'consultar',
        'segura', 'seguras', 'seguro', 'seguros', 'compra', 'compras', 'confiable', 'confiables',
        'estafa', 'estafas', 'garantia', 'precio', 'precios', 'pago', 'pagos', 'envio', 'envios', 'tienda'
    ];

    // === NORMALIZACIÓN DE TEXTO ===
    function normalize(text) {
        if (!text) return '';
        return text
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^\w\s]/gi, ' ')
            .replace(/\s+/g, ' ')
            .trim();
    }

    function containsAny(text, wordList) {
        var clean = normalize(text);
        for (var i = 0; i < wordList.length; i++) {
            var w = normalize(wordList[i]);
            var regex = new RegExp('\\b' + w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'i');
            if (regex.test(clean)) return true;
        }
        return false;
    }

    function extractTokens(text) {
        return normalize(text).split(' ').filter(function(t) { 
            return t.length > 2 && STOP_WORDS.indexOf(t) === -1; 
        });
    }

    // === CORRECCIÓN DE TYPOS EN TEXTO DE BÚSQUEDA ===
    function applyTypoCorrection(text) {
        var norm = normalize(text);
        var keys = Object.keys(TYPO_MAP);
        for (var i = 0; i < keys.length; i++) {
            var typo = normalize(keys[i]);
            if (norm.indexOf(typo) !== -1) {
                norm = norm.replace(new RegExp('\\b' + typo + '\\b', 'gi'), normalize(TYPO_MAP[keys[i]]));
            }
        }
        return norm;
    }

    // =========================================================
    //  RAZONAMIENTO: ENMASCARADO DE NEGACIONES
    // =========================================================
    // Antes, "dame uno que NO sea dulce" seguia cumpliendo containsAny() con la
    // palabra 'dulce', y el bot respondia pitching aromas dulces. Ahora se tapan
    // los tramos negados antes de buscar coincidencias positivas, pero se guardan
    // aparte para saber que exclusion quiere el usuario.
    var NEGATION_PATTERNS = [
        // "que no sea dulce", "no quiero dulce", y las cadenas "no sea ni dulce ni amaderado"
        /\b(?:que\s+)?no\s+(?:quiero|me\s+gusta|guste|sea|sean|busco|busques|prefiero|prefiera|huela|huelas|tenga|tengan|debe\s+ser)\s+((?:ni\s+)?[a-z]+(?:\s+ni\s+[a-z]+)*)/g,
        // "sin notas de vainilla", "sin que sea dulce"
        /\bsin\s+(?:notas?\s+de\s+|acordes?\s+de\s+|que\s+sea\s+|que\s+)?([a-z]+)/g,
        // "evita dulce", "descarta amaderado", "nada de Oriental"
        /\b(?:evita|evitar|descarta|descartar|nada\s+de|fuera)\s+(?:el\s+|la\s+|lo\s+)?([a-z]+)/g
    ];

    function enmascararNegaciones(text) {
        var norm = normalize(text);
        var excluidas = [];

        for (var i = 0; i < NEGATION_PATTERNS.length; i++) {
            var re = new RegExp(NEGATION_PATTERNS[i].source, 'g');
            var m;
            while ((m = re.exec(norm)) !== null) {
                if (!m[1]) continue;
                // Una coincidencia puede traer varias: "ni dulce ni amaderado"
                var partes = m[1].split(/\s+ni\s+|\s+/);
                for (var p = 0; p < partes.length; p++) {
                    var palabra = partes[p];
                    if (!palabra || palabra === 'ni') continue;
                    // 'el','la','lo','mas' no son familias: no se cuentan como
                    // exclusión para no romper frases como "no sea el mas caro"
                    if (palabra === 'el' || palabra === 'la' || palabra === 'lo' ||
                        palabra === 'mas' || palabra === 'menos' || palabra === 'muy') {
                        continue;
                    }
                    excluidas.push(palabra);
                }
                // Se reemplaza el tramo por un token neutro: asi el termino
                // excluido deja de disparar los detectores positivos
                norm = norm.slice(0, m.index) + ' __negado__ ' + norm.slice(m.index + m[0].length);
                re.lastIndex = m.index + 10;
            }
        }
        return { texto: norm, excluidas: excluidas };
    }

    // Comprueba si una palabra excluida corresponde a una familia de aromas
    // ('amaderado' -> 'amaderado', 'vainilla' -> 'dulce', etc.)
    var FAMILIA_POR_PALABRA = {
        dulce: 'dulce', vainilla: 'dulce', caramelo: 'dulce', praline: 'dulce',
        gourmand: 'dulce', golosina: 'dulce',
        amaderado: 'amaderado', madera: 'amaderado', oud: 'amaderado',
        sándalo: 'amaderado', sandalo: 'amaderado', cedro: 'amaderado',
        vetiver: 'amaderado', pachuli: 'amaderado', incienso: 'amaderado',
        citrico: 'citrico', cítrico: 'citrico', limon: 'citrico', bergamota: 'citrico',
        naranja: 'citrico', pomelo: 'citrico',
        floral: 'floral', flor: 'floral', flores: 'floral', rosa: 'floral',
        jazmin: 'floral', jazmín: 'floral', lavanda: 'floral',
        oriental: 'oriental', canela: 'oriental', cardamomo: 'oriental',
        cuero: 'cuero', piel: 'cuero',
        acuatica: 'acuatica', acuática: 'acuatica', marino: 'acuatica',
        mar: 'acuatica', agua: 'acuatica',
        frutal: 'frutal', fruta: 'frutal', frutas: 'frutal', mandarina: 'frutal'
    };

    function familiasExcluidasDe(texto) {
        var neg = enmascararNegaciones(texto);
        var familias = [];
        for (var i = 0; i < neg.excluidas.length; i++) {
            var fam = FAMILIA_POR_PALABRA[neg.excluidas[i]];
            if (fam && familias.indexOf(fam) === -1) familias.push(fam);
        }
        return familias;
    }

    // =========================================================
    //  RAZONAMIENTO: ¿LA CONSULTA ES DE PERFUMERÍA?
    // =========================================================
    // El guardrail de fuera-de-dominio se evaluaba antes que todo y con palabras
    // que tambien son vocabulario de la tienda ('clima', 'trabajo', 'tiempo',
    // 'amor'), asi que rechazaba consultas legitimas. Ahora el guardrail solo
    // aplica si la consulta NO tiene ninguna senal de perfumeria.
    var CACHE_SENAL_DOMINIO = null;

    function esConsultaDePerfumeria(text) {
        if (CACHE_SENAL_DOMINIO === null) {
            var set = {};
            for (var key in DICTIONARY) {
                if (!DICTIONARY.hasOwnProperty(key)) continue;
                var list = DICTIONARY[key];
                if (!list || !list.length) continue;
                for (var i = 0; i < list.length; i++) {
                    var n = normalize(list[i]);
                    if (n.length > 2) set[n] = true;
                }
            }
            CACHE_SENAL_DOMINIO = set;
        }

        var norm = normalize(text);
        // 1) marca de perfume explicita
        if (/\b(perfume|perfumeria|fragancia|aroma|olor|olores|notas|eau|edp|edt|parfum)\b/.test(norm)) {
            return true;
        }
        // 2) alguna palabra del diccionario de intencion
        var palabras = norm.split(' ');
        for (var k = 0; k < palabras.length; k++) {
            if (palabras[k].length > 2 && CACHE_SENAL_DOMINIO[palabras[k]]) return true;
        }
        // 3) coincidencia EXACTA con un nombre o marca del catalogo.
        //    Ojo: no se usa la busqueda difusa aqui, porque "arroz" o "mundial"
        //    quedan a distancia de edicion 1 de varios nombres y eso hacia que
        //    "como hago arroz" pasara como consulta de perfumeria, anulando el
        //    guardrail de fuera de dominio.
        var indice = construirIndiceCatalogo();
        for (var p = 0; p < palabras.length; p++) {
            var tok = palabras[p];
            if (tok.length < 3) continue;
            if (indice.porNombre[tok] || indice.porToken[tok] || indice.porMarca[tok]) return true;
        }
        return false;
    }

    // =========================================================
    //  RAZONAMIENTO: ¿LA CONSULTA ES ESPECÍFICA O GENÉRICA?
    // =========================================================
    // 'DICTIONARY.masvendidos' incluye palabras genéricas como 'recomienda', y ese
    // handler se evaluaba ANTES que la ocasión, el regalo y el presupuesto. Por eso
    // "recomiendame algo para el día de la madre" devolvía las 3 más vendidas de la
    // tienda: la palabra 'recomienda' se comía toda la consulta.
    // Ahora solo se atiende como genérica si el usuario NO dio ninguna pista concreta.
    var OCASIONES_CLAVE = ['navidad', 'sanvalentin', 'halloween', 'diamadre', 'diapadre',
                           'blackfriday', 'amorYamistad', 'cita', 'oficina', 'fiesta',
                           'calor', 'frio', 'gala', 'gym'];

    function consultaTieneEspecificidad(text) {
        var positivo = enmascararNegaciones(text).texto;

        // pista de ocasión
        for (var i = 0; i < OCASIONES_CLAVE.length; i++) {
            if (containsAny(positivo, DICTIONARY[OCASIONES_CLAVE[i]])) return true;
        }
        // pista de regalo
        if (detectGiftIntent(text)) return true;
        // pista de familia olfativa
        var fams = ['amaderado', 'dulce', 'citrico', 'floral', 'oriental', 'cuero', 'acuatica', 'frutal'];
        for (var j = 0; j < fams.length; j++) {
            if (containsAny(positivo, DICTIONARY[fams[j]])) return true;
        }
        // pista de género
        if (containsAny(positivo, DICTIONARY.hombre) ||
            containsAny(positivo, DICTIONARY.mujer) ||
            containsAny(positivo, DICTIONARY.unisex)) return true;
        // pista de presupuesto o precio
        if (extractBudget(text)) return true;
        if (/\b(barato|barata|economic|economica|precio|cuanto|cuesta|vale|presupuesto|caro)\b/.test(normalize(text))) {
            return true;
        }
        // producto concreto mencionado
        if (buscarProductoEnCatalogo(text)) return true;
        return false;
    }

    // =========================================================
    //  RAZONAMIENTO: ÍNDICE Y BÚSQUEDA DE PRODUCTO POR NOMBRE
    // =========================================================
    // Antes solo encontraba un producto si el texto contenia el NOMBRE COMPLETO
    // normalizado, asi que "¿cuánto el 9pm?" o "el de Armaf" no lo encontraban.
    var CATALOGO_INDICE = null;

    function construirIndiceCatalogo() {
        if (CATALOGO_INDICE) return CATALOGO_INDICE;

        var catalog = getCatalog().filter(function(p) { return p && p.activo !== false; });
        var porNombre = {};   // nombre normalizado -> producto
        var porToken = {};    // token -> [productos]
        var porMarca = {};    // marca normalizada -> [productos]
        var conteoToken = {}; // token -> cuantas fragancias lo tienen

        for (var i = 0; i < catalog.length; i++) {
            var p = catalog[i];
            var normNombre = normalize(p.nombre || '');
            if (normNombre) porNombre[normNombre] = p;

            var normMarca = normalize(p.marca || '');
            if (normMarca) {
                if (!porMarca[normMarca]) porMarca[normMarca] = [];
                porMarca[normMarca].push(p);
            }

            var tokens = normNombre.split(' ').filter(function(t) {
                // Minimo 3 letras: "la", "de", "el" no identifican nada y
                // hacian que "donde queda la tienda" terminara en "La Belle".
                // (Los nombres cortos de verdad, como "9PM" o "212", se
                // conservan porque tienen 3 o mas caracteres.)
                return t.length >= 3 && STOP_WORDS.indexOf(t) === -1;
            });
            for (var j = 0; j < tokens.length; j++) {
                if (!porToken[tokens[j]]) porToken[tokens[j]] = [];
                porToken[tokens[j]].push(p);
            }
        }

        for (var tk in porToken) {
            if (porToken.hasOwnProperty(tk)) conteoToken[tk] = porToken[tk].length;
        }

        CATALOGO_INDICE = {
            porNombre: porNombre,
            porToken: porToken,
            porMarca: porMarca,
            conteoToken: conteoToken,
            todos: catalog
        };
        return CATALOGO_INDICE;
    }

    function invalidarIndiceCatalogo() {
        CATALOGO_INDICE = null;
        CACHE_SENAL_DOMINIO = null;
    }

    // Distancia de Damerau-Levenshtein acotada, para tolerar errores de tipeo
    function distanciaCercana(a, b) {
        if (a === b) return 0;
        if (!a || !b) return 99;
        if (Math.abs(a.length - b.length) > 2) return 99;
        var prev2 = [], prev = [], cur = [];
        for (var j = 0; j <= b.length; j++) prev[j] = j;
        for (var i = 1; i <= a.length; i++) {
            cur[0] = i;
            for (var jj = 1; jj <= b.length; jj++) {
                var coste = a[i - 1] === b[jj - 1] ? 0 : 1;
                var v = Math.min(cur[jj - 1] + 1, prev[jj] + 1, prev[jj - 1] + coste);
                // transposition (Damerau): "ab" -> "ba"
                if (i > 1 && jj > 1 && a[i - 1] === b[jj - 2] && a[i - 2] === b[jj - 1]) {
                    v = Math.min(v, prev2[jj - 2] + 1);
                }
                cur[jj] = v;
            }
            prev2 = prev;
            prev = cur.slice();
        }
        return prev[b.length];
    }

    /**
     * Busca un producto concreto en el texto. Devuelve {product, confianza} o null.
     * Estrategia: nombre exacto -> prefijo/frase -> token con coincidencias ->
     * token por cercania (typos) -> marca.
     */
    // Comprueba si una frase aparece en el texto respetando limites de palabra.
    // Sin esto, "son originales" contenia el nombre de producto "Original".
    function contienePalabraFrase(texto, frase) {
        if (!texto || !frase) return false;
        var re = new RegExp('(^|[^\\w])' + frase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '([^\\w]|$)', 'i');
        return re.test(texto);
    }

    function buscarProductoEnCatalogo(text) {
        var indice = construirIndiceCatalogo();
        if (!indice.todos.length) return null;

        var norm = normalize(text);
        if (!norm) return null;

        // 0) El NOMBRE COMPLETO del producto aparece en la frase: es definitivo.
        //    Se revisa antes que los tokens sueltos para no confundir
        //    "Club de Nuit" con cualquier producto que tenga "de" o "nuit".
        var clavesNombre = Object.keys(indice.porNombre);
        for (var n = 0; n < clavesNombre.length; n++) {
            var claveNombre = clavesNombre[n];
            if (claveNombre.length >= 5 && contienePalabraFrase(norm, claveNombre)) {
                return { product: indice.porNombre[claveNombre], confianza: 0.95 };
            }
        }

        // 1) coincidencia por token exacto (respeta \b para no cortar 9pm/9PM)
        var palabras = norm.split(' ');
        var candidatos = {};

        for (var i = 0; i < palabras.length; i++) {
            var tok = palabras[i];
            if (tok.length < 2) continue;
            // Token demasiado comun ("de" esta en 19 fragancias, "pour" en 14):
            // no identifica ningun producto y hacia que cualquier frase
            // terminara recommending uno al azar.
            if (indice.conteoToken[tok] > 8) continue;
            var lista = indice.porToken[tok];
            if (lista && lista.length) {
                for (var k = 0; k < lista.length; k++) candidatos[lista[k].id] = lista[k];
            }
        }

        if (Object.keys(candidatos).length) {
            // Puntua por cuantos tokens de la consulta encuentra
            var mejor = null;
            var mejorPuntaje = -1;
            for (var cid in candidatos) {
                var prod = candidatos[cid];
                var normNombre = normalize(prod.nombre || '');
                var puntos = 0;
                for (var t = 0; t < palabras.length; t++) {
                    if (palabras[t].length > 1 && normNombre.indexOf(palabras[t]) !== -1) puntos++;
                }
                if (norm.indexOf(normNombre) !== -1) puntos += 3;
                if (puntos > mejorPuntaje) { mejorPuntaje = puntos; mejor = prod; }
            }
            if (mejor) {
                var conf = Math.min(1, 0.5 + mejorPuntaje * 0.12);
                // Si lo unico que coincidio fue la MARCA y esa marca tiene varias
                // fragancias, no es un producto concreto. "recomiendame perfumes
                // de Armaf" debe ser una recomendacion, no un producto.
                var normNombreM = normalize(mejor.nombre || '');
                var normMarcaM = normalize(mejor.marca || '');
                var coincideNombre = false, coincideMarca = false;
                for (var t2 = 0; t2 < palabras.length; t2++) {
                    if (palabras[t2].length < 2) continue;
                    if (indice.conteoToken[palabras[t2]] > 8) continue;
                    if (normNombreM.indexOf(palabras[t2]) !== -1) coincideNombre = true;
                    else if (normMarcaM.indexOf(palabras[t2]) !== -1) coincideMarca = true;
                }
                if (coincideMarca && !coincideNombre) {
                    var deLaMarca = indice.porMarca[normMarcaM];
                    if (!deLaMarca || deLaMarca.length > 2) conf = 0.4;
                }
                return { product: mejor, confianza: conf };
            }
        }

        // 2) token por cercania (tolerancia a typos: "fajhar" -> "fakhar").
        //    Solo si la consulta PARECE un nombre de producto: maximo 3 palabras,
        //    sin palabras de pregunta y con un token DISTINTIVO (pocas
        //    fragancias lo tienen). Sin este filtro "cuanto dura un perfume" se
        //    comia "Erba Pura" (dura ~ pura) y cualquier pregunta terminaba
        //   devolviendo un producto.
        var PALABRAS_PREGUNTA_FUERTE = ['cuanto', 'cuanta', 'precio', 'cuesta', 'vale',
                                        'notas', 'huele', 'dura', 'duracion', 'cuando',
                                        'donde', 'para', 'tienen', 'venden', 'busco',
                                        'son', 'es', 'esta', 'estan', 'tiene', 'hay',
                                        'sabes', 'puede', 'pueden', 'quieres', 'tiene'];
        var pareceNombre = palabras.length <= 3;
        for (var q = 0; q < palabras.length; q++) {
            if (PALABRAS_PREGUNTA_FUERTE.indexOf(palabras[q]) !== -1) pareceNombre = false;
        }

        if (pareceNombre) {
            for (var i2 = 0; i2 < palabras.length; i2++) {
                var t2 = palabras[i2];
                if (t2.length < 4) continue;
                var claves = Object.keys(indice.porToken);
                for (var c = 0; c < claves.length; c++) {
                    var clave = claves[c];
                    if (clave.length < 4) continue;
                    if (Math.abs(clave.length - t2.length) > 2) continue;
                    // Token demasiado comun: "pura" esta en muchas fragancias y
                    // cualquier palabra parecida daria un falso positivo
                    if (indice.conteoToken[clave] > 4) continue;
                    if (distanciaCercana(t2, clave) <= (t2.length > 6 ? 2 : 1)) {
                        var coincide = indice.porToken[clave];
                        if (coincide && coincide.length) {
                            return { product: coincide[0], confianza: 0.55 };
                        }
                    }
                }
            }
        }

        return null;
    }

    // =========================================================
    //  RAZONAMIENTO: RANGO REAL DE PRECIOS DEL CATÁLOGO
    // =========================================================
    function rangoPrecios() {
        var indice = construirIndiceCatalogo();
        var min = Infinity, max = 0;
        for (var i = 0; i < indice.todos.length; i++) {
            var pr = indice.todos[i].precio;
            if (typeof pr === 'number' && pr > 0) {
                if (pr < min) min = pr;
                if (pr > max) max = pr;
            }
        }
        if (min === Infinity) return null;
        return { min: min, max: max };
    }

    function formatoMoneda(n) {
        return '$' + Math.round(n).toLocaleString('es-CO');
    }

    // =========================================================
    //  RAZONAMIENTO: SELECCIÓN DIVERSA
    // =========================================================
    // El orden era siempre el mismo (sort estable por puntaje + slice(0,3)), asi
    // que la misma consulta daba SIEMPRE los mismos 3 productos. Se rota la
    // ventana de resultados de forma estable a partir de la consulta, para que
    // dos mensajes parecidos exploren opciones distintas sin perder el orden de
    // relevancia.
    function variarResultados(lista, semilla) {
        if (!lista || lista.length <= 3) return lista;
        // La ventana de rotación se limita a los 6 mejores: rotar sobre toda la
        // lista podría mostrar el puesto 98 de 100, es decir, productos que
        // apenas superan el umbral de relevancia.
        var top = lista.slice(0, 6);
        if (top.length <= 3) return top;

        var hash = 0;
        var s = String(semilla || '');
        for (var i = 0; i < s.length; i++) {
            hash = ((hash << 5) - hash + s.charCodeAt(i)) | 0;
        }
        var extra = Math.abs(hash) % (top.length - 2);
        if (extra === 0) return top.slice(0, 3);
        return top.slice(extra, extra + 3);
    }

    // === DETECCIÓN DE INTENCIÓN DE REGALO ===
    function detectGiftIntent(text) {
        return containsAny(text, DICTIONARY.regalo);
    }

    // === EXTRACCIÓN DE GÉNERO DEL DESTINATARIO EN CONTEXTO REGALO ===
    function extractGiftRecipientGender(text) {
        var norm = normalize(text);
        // Masculino: novio, esposo, papa, hermano, hijo, amigo, el
        var mascPatterns = ['para mi novio', 'para mi esposo', 'para mi papa', 'para mi hermano', 'para mi hijo', 'para un hombre', 'para un man', 'para el', 'para un chico', 'regalarle a el', 'regalo a mi papa', 'regalo a mi novio'];
        // Femenino: novia, esposa, mama, hermana, hija, amiga, ella
        var femPatterns = ['para mi novia', 'para mi esposa', 'para mi mama', 'para mi hermana', 'para mi hija', 'para una mujer', 'para ella', 'para una chica', 'para una senora', 'regalarle a ella', 'regalo a mi mama', 'regalo a mi novia'];
        if (containsAny(text, mascPatterns)) return 'hombre';
        if (containsAny(text, femPatterns)) return 'mujer';
        return null;
    }

    // === DETECCIÓN DE NEGACIONES ===
    // Extrae qué familias olfativas el usuario NO quiere.
    // Ej: "algo que no sea dulce" → excludedFamilies: ['dulce']
    function extractNegations(text) {
        var norm = normalize(text);
        var excluded = [];
        var families = ['dulce', 'amaderado', 'citrico', 'floral', 'oriental', 'cuero', 'acuatica', 'frutal'];
        // Patrones de negación + familia
        var negPatterns = [
            /no (quiero|me gusta[n]?|sea|sean|tenga|tengan|huela|huelas?).{0,20}(dulce|amaderado|citrico|floral|oriental|cuero|acuatico|frutal)/,
            /sin (notas? de |acordes? de )?(dulce|madera|citrico|flores?|oriental|cuero|agua|frutas?)/,
            /nada (de |muy )?(dulce|amaderado|citrico|floral|oriental|cuero|acuatico|frutal)/,
            /evitar (lo )?(dulce|amaderado|citrico|floral|oriental|cuero|acuatico|frutal)/
        ];
        // Mapa de palabras comunes a familia
        var wordToFamily = {
            'dulce': 'dulce', 'vainilla': 'dulce', 'caramelo': 'dulce', 'dulces': 'dulce',
            'amaderado': 'amaderado', 'madera': 'amaderado', 'maderas': 'amaderado', 'cedro': 'amaderado', 'sandalo': 'amaderado',
            'citrico': 'citrico', 'citrica': 'citrico', 'limon': 'citrico', 'naranja': 'citrico',
            'floral': 'floral', 'flores': 'floral', 'rosa': 'floral', 'jazmin': 'floral',
            'oriental': 'oriental', 'ambar': 'oriental', 'incienso': 'oriental',
            'cuero': 'cuero', 'tabaco': 'cuero',
            'acuatico': 'acuatica', 'marino': 'acuatica', 'agua': 'acuatica', 'fresco': 'acuatica',
            'frutal': 'frutal', 'frutas': 'frutal'
        };

        // Buscar con regex patrones de negación
        negPatterns.forEach(function(pat) {
            var match = norm.match(pat);
            if (match) {
                families.forEach(function(f) {
                    if (norm.indexOf(f) !== -1 && excluded.indexOf(f) === -1) excluded.push(f);
                });
            }
        });

        // Buscar "no X" donde X es una nota/familia conocida
        var noMatch = norm.match(/no\s+(\w+)/g);
        if (noMatch) {
            noMatch.forEach(function(phrase) {
                var word = phrase.replace('no ', '').trim();
                if (wordToFamily[word] && excluded.indexOf(wordToFamily[word]) === -1) {
                    excluded.push(wordToFamily[word]);
                }
            });
        }

        // "sin X"
        var sinMatch = norm.match(/sin\s+(\w+)/g);
        if (sinMatch) {
            sinMatch.forEach(function(phrase) {
                var word = phrase.replace('sin ', '').trim();
                if (wordToFamily[word] && excluded.indexOf(wordToFamily[word]) === -1) {
                    excluded.push(wordToFamily[word]);
                }
            });
        }

        return excluded;
    }

    // === EXTRACCIÓN DE PRESUPUESTO ===
    // Detecta frases como "tengo 80 mil", "máximo 100000", "hasta 150k"
    function extractBudget(text) {
        var norm = normalize(text);
        // Patrón: número seguido de "mil", "k", "000" o número largo directamente
        var patterns = [
            /(?:maximo|hasta|menos de|no mas de|no paso de|tengo|presupuesto|con)\s*(\d+)\s*(?:mil|k)/i,
            /(?:maximo|hasta|menos de|no mas de|no paso de|tengo|presupuesto|con)\s*(\d{2,3})(?:\.\d{3})/i,
            /(\d+)\s*(?:mil|k)\b/i,
            /(\d{5,6})\b/  // número directo tipo 80000 o 100000
        ];
        for (var i = 0; i < patterns.length; i++) {
            var m = norm.match(patterns[i]);
            if (m) {
                var val = parseInt(m[1]);
                // Si el valor capturado es < 1000, asumir que es "en miles"
                if (val < 1000) val = val * 1000;
                if (val >= 20000 && val <= 2000000) return val;
            }
        }
        // Palabras clave de presupuesto bajo / "no sea tan caro"
        if (/\b(economico|barato|lo mas barato|lo mas economico|precio bajo|sin gastar mucho|algo sencillo|no sea tan caro|no tan caro|no sea caro|no muy caro|que no sea caro|que no cueste mucho|no cueste mucho|algo accesible|accesible|no quiero gastar mucho)\b/.test(norm)) {
            return 120000; // Presupuesto moderado cuando pide "no tan caro"
        }
        return null;
    }

    // === DETECCIÓN DE COMPARACIÓN DIRECTA ===
    // Detecta "diferencia entre X y Y", "X vs Y", "cual es mejor X o Y"
    function detectComparison(text) {
        var norm = normalize(text);
        var compKeywords = [
            'diferencia entre', 'diferencia de', 'vs', 'versus', 'cual es mejor',
            'cual dura mas entre', 'compara', 'comparame', 'comparar',
            'cual prefiero', 'cual me recomiendas entre', 'cual de los dos',
            'o el', 'o la'
        ];
        var hasCompare = false;
        for (var i = 0; i < compKeywords.length; i++) {
            if (norm.indexOf(normalize(compKeywords[i])) !== -1) { hasCompare = true; break; }
        }
        if (!hasCompare) return null;

        var catalog = getCatalog();
        var found = [];
        for (var j = 0; j < catalog.length; j++) {
            var p = catalog[j];
            var pName = normalize(p.nombre || '');
            if (!pName || pName.length < 3) continue;
            var pRegex = new RegExp('\\b' + pName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'i');
            if (pRegex.test(norm)) {
                found.push(p);
                if (found.length === 2) break;
            }
        }
        return (found.length === 2) ? found : null;
    }

    // === DETECCIÓN DE INSPIRACIÓN EXTERNA ===
    // Detecta "algo similar al Bleu de Chanel", "alternativa al Sauvage", etc.
    function detectInspiration(text) {
        var norm = normalize(text);
        var inspireKeywords = ['similar', 'parecido', 'alternativa', 'alternativo', 'clon', 'inspirado', 'como el', 'como la', 'igual al', 'igual a', 'tipo el', 'tipo la'];
        var hasInspire = false;
        for (var i = 0; i < inspireKeywords.length; i++) {
            if (norm.indexOf(normalize(inspireKeywords[i])) !== -1) { hasInspire = true; break; }
        }
        if (!hasInspire) return null;

        for (var j = 0; j < INSPIRATIONS_MAP.length; j++) {
            var entry = INSPIRATIONS_MAP[j];
            for (var k = 0; k < entry.keywords.length; k++) {
                if (norm.indexOf(normalize(entry.keywords[k])) !== -1) {
                    return entry;
                }
            }
        }
        return null;
    }

    // === ACCESO AL CATÁLOGO DE PRODUCTOS ===
    function getCatalog() {
        if (typeof products !== 'undefined' && products && products.length) {
            return products;
        }
        if (typeof window.__CATALOGO_PRODUCTOS !== 'undefined' && window.__CATALOGO_PRODUCTOS) {
            return window.__CATALOGO_PRODUCTOS;
        }
        return [];
    }

    // === MOTOR DE BÚSQUEDA Y SCORING INTELIGENTE ===
    function searchPerfumes(queryText, options) {
        options = options || {};
        var catalog = getCatalog().filter(function(p) { return p && p.activo !== false; });
        if (!catalog.length) return [];

        // Filtro por presupuesto si existe.
        // Antes: si NADA cumplía el presupuesto, se ignoraba el filtro en silencio y
        // devolvía las fragancias más caras diciendo que eran "op económicas". El
        // catálogo real empieza en $110.000, así que cualquier presupuesto menor
        // quedaba sin satisfacer y el usuario recibía una respuesta falsa.
        var budgetMax = options.budgetMax || null;
        var budgetImposible = false;
        if (budgetMax) {
            var filtered = catalog.filter(function(p) { return !p.precio || p.precio <= budgetMax; });
            if (filtered.length > 0) {
                catalog = filtered;
            } else {
                budgetImposible = true;
            }
        }

        // Familias excluidas por negación
        var excludedFamilies = options.excludedFamilies || [];

        var tokens = extractTokens(queryText);
        var normQuery = normalize(queryText);

        var scored = catalog.map(function(p) {
            var score = 0;
            var matchReasons = [];

            var normNombre = normalize(p.nombre || '');
            var normMarca = normalize(p.marca || '');
            var normTipo = normalize(p.tipo_olor || '');
            var normNotas = normalize((p.notas || '') + ' ' + (p.notas_salida || '') + ' ' + (p.notas_corazon || '') + ' ' + (p.notas_fondo || ''));
            var normTransmite = normalize(p.transmite || '');
            var normIdeal = normalize(p.ideal_para || '');
            var normDesc = normalize(p.descripcion || '');
            var categoria = (p.categoria || '').toLowerCase();
            var duracionNorm = normalize(p.duracion || '');
            var intensidadNorm = normalize(p.intensidad || '');

            // 1. Coincidencia de Marca
            if (normQuery.indexOf(normMarca) !== -1) {
                score += 40;
                matchReasons.push('marca ' + p.marca);
            }

            // 2. Filtro / Bonificación de Género
            var targetGender = options.gender;
            if (!targetGender) {
                if (containsAny(queryText, DICTIONARY.hombre)) targetGender = 'hombre';
                else if (containsAny(queryText, DICTIONARY.mujer)) targetGender = 'mujer';
                else if (containsAny(queryText, DICTIONARY.unisex)) targetGender = 'unisex';
            }

            if (targetGender) {
                if (categoria === targetGender) {
                    score += 50;
                    matchReasons.push('género ' + targetGender);
                } else if (categoria === 'unisex') {
                    score += 30;
                    matchReasons.push('unisex');
                } else {
                    score -= 80; // Fuerte penalización para no mezclar
                }
            }

            // 3. Potencia / Duración Extrema (Fuerte, Dure arto, Modo Bestia)
            if (options.potency === 'baja') {
                // Usuario quiere algo SUAVE — premiar fragancias ligeras, penalizar intensas
                if (intensidadNorm.indexOf('suave') !== -1 || intensidadNorm.indexOf('ligera') !== -1 || intensidadNorm.indexOf('moderada') !== -1) {
                    score += 40;
                    matchReasons.push('intensidad suave/moderada');
                }
                if (intensidadNorm.indexOf('muy alta') !== -1 || intensidadNorm.indexOf('modo bestia') !== -1) {
                    score -= 50; // Penalizar las muy intensas
                }
                if (duracionNorm.indexOf('4') !== -1 || duracionNorm.indexOf('6') !== -1 || duracionNorm.indexOf('media') !== -1) {
                    score += 20;
                }
            } else if (options.potency === 'alta' || containsAny(queryText, DICTIONARY.potencia)) {
                if (duracionNorm.indexOf('10') !== -1 || duracionNorm.indexOf('12') !== -1 || duracionNorm.indexOf('larga') !== -1) {
                    score += 45;
                    matchReasons.push('duración extrema (10h+)');
                }
                if (intensidadNorm.indexOf('muy alta') !== -1 || intensidadNorm.indexOf('alta') !== -1) {
                    score += 35;
                    matchReasons.push('intensidad alta');
                }
            }

            // 4. Temporada / Eventos (Navidad, San Valentín, etc.)
            var targetOccasion = options.occasion;
            if (targetOccasion === 'navidad' || containsAny(queryText, DICTIONARY.navidad) || targetOccasion === 'frio' || containsAny(queryText, DICTIONARY.frio)) {
                if (normTipo.indexOf('dulce') !== -1 || normTipo.indexOf('oriental') !== -1 || normTipo.indexOf('amaderado') !== -1 || normNotas.indexOf('vainilla') !== -1 || normNotas.indexOf('canela') !== -1) {
                    score += 40;
                    matchReasons.push('ideal para navidad');
                }
                if (duracionNorm.indexOf('10') !== -1 || duracionNorm.indexOf('larga') !== -1) {
                    score += 20;
                }
            }

            var occasions = ['cita', 'oficina', 'fiesta', 'calor', 'gala', 'gym', 'sanvalentin', 'halloween', 'diamadre', 'diapadre'];
            occasions.forEach(function(occ) {
                if (DICTIONARY[occ] && (targetOccasion === occ || containsAny(queryText, DICTIONARY[occ]))) {
                    DICTIONARY[occ].forEach(function(occWord) {
                        if (normTransmite.indexOf(occWord) !== -1 || normIdeal.indexOf(occWord) !== -1 || normDesc.indexOf(occWord) !== -1) {
                            score += 30;
                            matchReasons.push('ideal para ' + occ);
                        }
                    });
                }
            });

            // 5. Familias Olfativas y Notas
            var families = ['dulce', 'amaderado', 'citrico', 'floral', 'oriental', 'cuero', 'acuatica', 'frutal'];
            families.forEach(function(fam) {
                if (containsAny(queryText, DICTIONARY[fam]) || options.scentType === fam) {
                    if (normTipo.indexOf(fam) !== -1 || normNotas.indexOf(fam) !== -1) {
                        score += 35;
                        matchReasons.push('acorde ' + fam);
                    }
                    DICTIONARY[fam].forEach(function(noteWord) {
                        if (normNotas.indexOf(noteWord) !== -1 || normTipo.indexOf(noteWord) !== -1) {
                            score += 15;
                        }
                    });
                }
            });

            // 6. Token matching con nombres o notas
            tokens.forEach(function(tok) {
                if (tok.length < 4) return;
                var tokRegex = new RegExp('\\b' + tok + '\\b', 'i');
                if (tokRegex.test(normNombre)) {
                    score += 35;
                    matchReasons.push('nombre ' + tok);
                } else if (tokRegex.test(normNotas)) {
                    score += 15;
                    matchReasons.push('nota ' + tok);
                }
            });

            // 7. Bonificación si es destacado
            if (p.destacado) score += 15;

            // 8. Penalización fuerte si pertenece a familia excluida por negación
            if (excludedFamilies.length > 0) {
                var normTipoCheck = normalize(p.tipo_olor || '');
                var notasCheck = normalize((p.notas || '') + ' ' + (p.notas_fondo || '') + ' ' + (p.notas_corazon || ''));
                excludedFamilies.forEach(function(exFam) {
                    if (normTipoCheck.indexOf(exFam) !== -1 || notasCheck.indexOf(exFam) !== -1) {
                        score -= 150; // Penalización decisiva
                        matchReasons.push('EXCLUIDO por negación: ' + exFam);
                    }
                });
            }

            return {
                product: p,
                score: score,
                reasons: matchReasons
            };
        });

        // Filtrar y ordenar por puntuación
        scored = scored.filter(function(s) { return s.score >= 35 && s.reasons.filter(function(r) { return r.indexOf('EXCLUIDO') === -1; }).length > 0; });
        scored.sort(function(a, b) { return b.score - a.score; });

        var resultados;
        if (scored.length > 3) {
            // Se fija SIEMPRE el mejor puntaje (es el que mejor encaja) y se rotan los
            // siguientes. Antes sort estable + slice(0,3) devolvia SIEMPRE los mismos
            // 3 productos para la misma consulta, y dos frases equivalentes daba
            // respuestas byte a byte idénticas.
            var cabeza = [scored[0]];
            var resto = variarResultados(scored.slice(1).map(function(s) { return s.product; }), queryText);
            // 1 fija + 2 rotados = 3, que es lo que espera la UI
            resultados = cabeza.map(function(s) { return s.product; }).concat(resto.slice(0, 2));
        } else {
            resultados = scored.slice(0, 3).map(function(s) { return s.product; });
        }

        if (budgetImposible) {
            // Ninguna fragancia cumple el presupuesto. Se devuelven las más
            // baratas (que sí son las más baratas de la tienda, así que no es
            // inventar nada) pero se marca el arreglo para que quien llama pueda
            // decirlo con palabras en vez de presentarlas como "opciones económicas".
            resultados.presupuestoInsatisfacible = true;
            var rango = rangoPrecios();
            resultados.precioMinimoCatalogo = rango ? rango.min : null;
        }
        return resultados;
    }

    function updateUserPreferencesFromMessage(text) {
        // La búsqueda positiva se hace sobre el texto CON LAS NEGACIONES ENMASCARADAS.
        // Antes se usaba el texto crudo, así que "dame uno que no sea dulce" terminaba
        // fijando scentType='dulce' y el bot seguía pitchando aromas dulces.
        var neg = enmascararNegaciones(text);
        var positivo = neg.texto;
        var norm = normalize(text);

        // Detección de cambio de opinión / reinicio de contexto
        var isContextSwitch = containsAny(text, [
            'cambie de opinion', 'cambie de parecer', 'mejor no', 'o mejor', 'ahora quiero',
            'olvida lo anterior', 'olvida eso', 'en vez de eso', 'ahora busco', 'mejor busco',
            'otro perfume', 'otra opcion', 'otra cosa', 'para regalar a', 'no para mi'
        ]);

        if (isContextSwitch) {
            state.userPreferences.occasion = null;
            state.userPreferences.scentType = null;
            state.userPreferences.potency = null;
            state.userPreferences.excludedFamilies = [];
            state.currentFocusProduct = null;
            state.ultimaConsulta = null;
            state.lastRecommendedIds = [];
        }

        // Actualizar presupuesto
        var budget = extractBudget(text);
        if (budget) state.userPreferences.budgetMax = budget;

        // Actualizar negaciones acumulativas
        var newExcluded = extractNegations(text);
        // Lo que el usuario negó explícitamente también cuenta como exclusión,
        // aunque extractNegations (que solo mira el campo tipo_olor) no lo haya visto
        familiasExcluidasDe(text).forEach(function(f) {
            if (newExcluded.indexOf(f) === -1) newExcluded.push(f);
        });
        if (newExcluded.length > 0) {
            state.userPreferences.excludedFamilies = state.userPreferences.excludedFamilies || [];
            newExcluded.forEach(function(f) {
                if (state.userPreferences.excludedFamilies.indexOf(f) === -1) {
                    state.userPreferences.excludedFamilies.push(f);
                }
            });
        }

        if (containsAny(positivo, DICTIONARY.hombre)) {
            state.userPreferences.gender = 'hombre';
        } else if (detectaParaEl(norm)) {
            state.userPreferences.gender = 'hombre';
        } else if (containsAny(positivo, DICTIONARY.mujer)) {
            state.userPreferences.gender = 'mujer';
        } else if (containsAny(positivo, DICTIONARY.unisex)) {
            state.userPreferences.gender = 'unisex';
        }

        if (containsAny(positivo, DICTIONARY.potencia)) {
            state.userPreferences.potency = 'alta';
        }

        var occasions = ['navidad', 'sanvalentin', 'halloween', 'diamadre', 'diapadre', 'blackfriday', 'amorYamistad', 'cita', 'oficina', 'fiesta', 'calor', 'frio', 'gala', 'gym'];
        for (var i = 0; i < occasions.length; i++) {
            var occ = occasions[i];
            if (DICTIONARY[occ] && containsAny(positivo, DICTIONARY[occ])) {
                state.userPreferences.occasion = occ;
                break;
            }
        }

        var families = ['amaderado', 'dulce', 'citrico', 'floral', 'oriental', 'cuero', 'acuatica', 'frutal'];
        for (var j = 0; j < families.length; j++) {
            var fam = families[j];
            if (containsAny(positivo, DICTIONARY[fam])) {
                state.userPreferences.scentType = fam;
                break;
            }
        }
    }

    function isPureGreeting(text) {
        var clean = normalize(text);
        var searchKeywords = ['busco', 'quiero', 'necesito', 'recomiendame', 'recomienda', 'perfume', 'locion', 'fragancia', 'aroma', 'cuanto', 'precio', 'comprar', 'pedir', 'tienes', 'vendes', 'navidad', 'hombre', 'mujer', 'segura', 'seguras', 'seguro', 'fuerte', 'dure', 'arto'];
        for (var i = 0; i < searchKeywords.length; i++) {
            if (clean.indexOf(searchKeywords[i]) !== -1) return false;
        }
        return containsAny(text, DICTIONARY.saludos) || clean === 'hola' || clean === 'buenas' || clean === 'buen dia' || clean === 'hola como estas';
    }

    // === GENERADOR DE RESPUESTAS PERSUASIVAS DEL SOMMELIER ===
    // === KEYWORDS DE DESCUENTOS Y OFERTAS (usadas para priorizar sobre stock) ===
    var DISCOUNT_KEYWORDS = [
        'descuento', 'descuentos', 'oferta', 'ofertas', 'promocion', 'promociones',
        'rebaja', 'rebajas', 'tienen descuento', 'hay descuento', 'hay oferta',
        'tienen oferta', 'manejan descuento', 'hacen descuento', 'precio especial',
        'hay algo en oferta', 'algo en oferta', 'algo en descuento', 'algo de oferta'
    ];

    function isDiscountQuery(text) {
        return containsAny(text, DISCOUNT_KEYWORDS);
    }

    // =========================================================
    //  MOTOR DE DIÁLOGO
    //  Slots, memoria de la conversación y router con puntaje.
    // =========================================================
    //
    // processUserMessage era una cadena de ~45 if/return en la que ganaba la
    // PRIMERA coincidencia. Eso hacia que "recomiendame un perfume para el dia
    // de la madre" devolviera las 3 mas vendidas (ganaba la palabra
    // "recomienda") y que "dame algo mas barato" se fuera a WhatsApp (ganaba
    // "negociacion").
    //
    // Ahora, antes de la cadena legacy, se extraen los slots de la frase y se
    // puntuan las intenciones. El router solo entra si gana con confianza; si
    // no, sigue la cadena legacy, que responde las FAQs, politicas y datos de
    // la tienda con el copy que ya tenias.

    // Confianza minima para que el router tome el control de la conversacion.
    // Es el UNICO mando: bajarlo hace que el asistente maneje mas formas de
    // escritura con el motor nuevo (con explicacion de criterios, refinamiento
    // y orden por precio) en vez de la cadena legacy.
    // Medido con 30 consultas reales:
    //   35 (actual) -> refinamientos por exclusion ("sin vainilla") y por
    //                   cambio de ocasion ("algo para la oficina"), ademas de
    //                   los que ya tenian evidencia clara
    //   30          -> suma esos dos
    //   25          -> suma "quiero/busco/dame un perfume" (peticion generica)
    // Las preguntas de la tienda y el flujo de regalo NO dependen de este valor:
    // estan bloqueados por PREGUNTAS_DE_TIENDA y PREGUNTAS_DE_REGALO.
    var UMBRAL_ROUTER = 35;

    // Verbos y formulas que indican "quiero que me recomiendes algo"
    var PALABRAS_RECOMENDAR = [
        'recomienda', 'recomiendame', 'recomendame', 'sugerencia', 'sugereme', 'sugiere',
        'busco', 'buscar', 'buscame', 'quiero', 'necesito', 'dame', 'recomendacion',
        'opciones', 'alternativas', 'cual me recomiendas', 'que me recomiendas',
        'muestrame', 'ensename', 'ayudame a elegir', 'ayudame a encontrar',
        'que fragancia', 'que perfume', 'cual perfume', 'cual fragancia', 'elige por mi'
    ];

    // Los verbos FUERTES ya son una peticion de recomendacion por si solos.
    // Los debiles ("dame", "quiero", "busco") necesitan ademas alguna pista
    // mas, porque "dame el precio" o "quiero saber los horarios" no son
    // recomendaciones.
    var PALABRAS_RECOMENDAR_FUERTES = [
        'recomienda', 'recomiendame', 'recomendame', 'sugereme', 'sugiere',
        'cual me recomiendas', 'que me recomiendas', 'ayudame a elegir',
        'ayudame a encontrar', 'buscame', 'muestrame', 'ensename', 'elige por mi',
        'que fragancia', 'que perfume', 'cual perfume', 'cual fragancia'
    ];

    // Palabras que, con contexto previo, refinan la busqueda anterior.
    // OJO: 'para hombre' / 'para mujer' NO van aqui. La primera frase del
    // usuario ya las contiene ("recomiendame un perfume para hombre") y hacia
    // que toda recomendacion se tomara como refinamiento. El cambio de genero
    // se detecta por slot, no por palabra.
    var PALABRAS_REFINAMIENTO = [
        'mas barato', 'mas baratos', 'mas barata', 'baratas', 'barato', 'barata',
        'mas economico', 'mas economicos', 'economico', 'economicos', 'mas barato que ese',
        'mas caro', 'mas caros', 'mas cara', 'caras', 'caro', 'mas caro que ese',
        'mas fresco', 'frescos', 'fresco', 'fresa', 'mas dulce', 'dulces', 'dulce',
        'mas amaderado', 'amaderados', 'amaderado', 'mas suave', 'suaves', 'mas fuerte',
        'mas intenso', 'mas duradero', 'mas parfumado', 'menos caro', 'mas cortos',
        'otra vez', 'otro perfume', 'otra opcion', 'algo mas', 'y si', 'mejor', 'pero',
        'no quiero', 'sin', 'distinta', 'diferente', 'cambia', 'cambiar', 'en vez de',
        'otra marca', 'demas', 'menos', 'opcion', 'que sea', 'otro'
    ];

    // Preguntas que se hacen sobre un perfume concreto
    var PREGUNTAS_SOBRE_PRODUCTO = [
        'cuanto cuesta', 'cuanto vale', 'cuanto es', 'precio', 'cuanto',
        'que notas', 'notas de', 'como huele', 'que tal es', 'vale la pena',
        'es de', 'sirve para', 'es bueno para', 'para que queda', 'cuando usarlo',
        'dura', 'duracion', 'fijacion', 'proyecta', 'es original', 'es para'
    ];

    var NOMBRES_OCASION = {
        oficina: 'la oficina', cita: 'una cita', fiesta: 'la fiesta', calor: 'clima calido',
        frio: 'invierno', navidad: 'Navidad', sanvalentin: 'San Valentin',
        halloween: 'Halloween', diamadre: 'el dia de la madre', diapadre: 'el dia del padre',
        blackfriday: 'Black Friday', amorYamistad: 'el dia del amor y la amistad',
        gala: 'un evento elegante', gym: 'el gimnasio', diario: 'el dia a dia', regalo: 'regalar'
    };

    // === VOCABULARIO DE NOTAS DEL CATÁLOGO ===
    // Permite entender "quiero algo con vainilla y oud": las palabras de la
    // consulta se cruzan con las notas que realmente tienen los 299 productos.
    function vocabularioNotas() {
        var indice = construirIndiceCatalogo();
        if (indice.vocabNotas) return indice.vocabNotas;
        var set = {};
        for (var i = 0; i < indice.todos.length; i++) {
            var p = indice.todos[i];
            var txt = (p.notas || '') + ' ' + (p.notas_salida || '') + ' ' +
                      (p.notas_corazon || '') + ' ' + (p.notas_fondo || '') + ' ' +
                      (p.tipo_olor || '') + ' ' + (p.transmite || '');
            var toks = normalize(txt).split(' ');
            for (var j = 0; j < toks.length; j++) {
                if (toks[j].length >= 4 && STOP_WORDS.indexOf(toks[j]) === -1) set[toks[j]] = true;
            }
        }
        indice.vocabNotas = set;
        return set;
    }

    function detectarNotas(texto) {
        var vocab = vocabularioNotas();
        // Estas palabras son occasion o familia, no notas: "oficina" no es
        // una nota, es un motivo de compra.
        var NO_NOTAS = ['oficina', 'cita', 'fiesta', 'calor', 'frio', 'navidad', 'sanvalentin',
                        'halloween', 'diamadre', 'diapadre', 'blackfriday', 'amorYamistad',
                        'gala', 'gym', 'regalo', 'diario', 'amaderado', 'dulce', 'citrico',
                        'floral', 'oriental', 'cuero', 'acuatica', 'frutal'];
        var toks = normalize(texto).split(' ');
        var out = [];
        for (var i = 0; i < toks.length; i++) {
            var t = toks[i];
            if (t.length >= 4 && vocab[t] && NO_NOTAS.indexOf(t) === -1 && out.indexOf(t) === -1) {
                out.push(t);
            }
        }
        return out;
    }

    // "para él" (con tilde) se pierde al normalizar. Se recupera solo si la
    // frase TERMINA en "para el", que es como se escribe "quiero algo para él".
    // "para el día de la madre" no termina ahí, así que no se confunde.
    function detectaParaEl(norm) {
        return /\bpara\s+el\s*$/.test(norm) ||
               /\bpara\s+el\s+(hombre|masculino|chico|novio|esposo|papa)\b/.test(norm);
    }

    // === EXTRACCIÓN DE SLOTS DE UN MENSAJE ===
    function extraerSlots(text) {
        var norm = normalize(text);
        var positivo = enmascararNegaciones(text).texto;
        var c = {
            texto: text,
            norm: norm,
            positivo: positivo,
            longitud: norm.length
        };

        // género SOLO de este mensaje (no acumulado)
        c.genero = null;
        if (containsAny(positivo, DICTIONARY.hombre)) c.genero = 'hombre';
        else if (detectaParaEl(norm)) c.genero = 'hombre';
        else if (containsAny(positivo, DICTIONARY.mujer)) c.genero = 'mujer';
        else if (containsAny(positivo, DICTIONARY.unisex)) c.genero = 'unisex';

        // ocasión
        c.ocasion = null;
        var occs = ['navidad', 'sanvalentin', 'halloween', 'diamadre', 'diapadre', 'blackfriday',
                    'amorYamistad', 'cita', 'oficina', 'fiesta', 'calor', 'frio', 'gala', 'gym'];
        for (var i = 0; i < occs.length; i++) {
            if (containsAny(positivo, DICTIONARY[occs[i]])) { c.ocasion = occs[i]; break; }
        }
        if (!c.ocasion && detectGiftIntent(text)) c.ocasion = 'regalo';

        // familia olfativa
        c.familia = null;
        var fams = ['amaderado', 'dulce', 'citrico', 'floral', 'oriental', 'cuero', 'acuatica', 'frutal'];
        for (var j = 0; j < fams.length; j++) {
            if (containsAny(positivo, DICTIONARY[fams[j]])) { c.familia = fams[j]; break; }
        }

        c.presupuesto = extractBudget(text);
        c.exclusiones = familiasExcluidasDe(text);
        c.notas = detectarNotas(positivo);
        c.producto = buscarProductoEnCatalogo(text);

        // Marca mencionada. "recomiendame perfumes de Armaf" no es consultar
        // un producto: es pedir una recomendacion de esa marca.
        c.marca = null;
        var marcas = construirIndiceCatalogo().porMarca;
        for (var mb in marcas) {
            if (!marcas.hasOwnProperty(mb)) continue;
            if (mb.length >= 3 && norm.indexOf(mb) !== -1) { c.marca = mb; break; }
        }

        c.quiereRecomendacion = containsAny(positivo, PALABRAS_RECOMENDAR);
        c.quiereRefinar = containsAny(positivo, PALABRAS_REFINAMIENTO);
        c.preguntaSobreProducto = containsAny(positivo, PREGUNTAS_SOBRE_PRODUCTO);

        c.referencia = null;
        if (containsAny(positivo, ['el primero', 'el 1', 'primero', 'primer'])) c.referencia = 0;
        else if (containsAny(positivo, ['el segundo', 'el 2', 'segundo'])) c.referencia = 1;
        else if (containsAny(positivo, ['el tercero', 'el 3', 'tercero'])) c.referencia = 2;

        c.hayContexto = !!(state.ultimaConsulta ||
                           (state.lastRecommendedIds && state.lastRecommendedIds.length));
        return c;
    }

    // === ROUTER CON PUNTAJE ===
    // Cada intencion devuelve un puntaje. Gana la de mayor puntaje, siempre que
    // supere el umbral. Asi "mas barato" (refinamiento) le gana a "recomienda"
    // (recomendacion) cuando hay resultados previos, y "dame algo para la
    // oficina" no se come la palabra "dame" de otra intencion.
    // Preguntas sobre la TIENDA (datos, politicas, garantias). Estas las
    // responde la cadena legacy con el copy que ya existe, asi que el router
    // no debeRobarlas: antes "donde queda la tienda" terminaba mostrndole
    // el perfume "La Belle".
    var PREGUNTAS_DE_TIENDA = [
        'donde queda la tienda', 'donde estan', 'donde se encuentra', 'tienda fisica',
        'ubicacion', 'direccion', 'cual es la diferencia', 'diferencia entre',
        'edp', 'edt', 'eau de parfum', 'eau de toilette', 'concentracion',
        'horarios', 'horario', 'abren', 'cierran', 'a que hora',
        'envio', 'envios', 'enviar', 'domicilio', 'domicilios', 'entrega', 'entregas',
        'cuantos dias', 'cuanto tarda', 'tiempo de entrega', 'rastrear', 'seguimiento',
        'como pago', 'formas de pago', 'medios de pago', 'puedo pagar', 'transferencia',
        'contra entrega', 'tarjeta', 'nequi', 'daviplata', 'efectivo',
        'garantia', 'originales', 'replicas', 'autentico', 'autenticos', 'sellado',
        'batch code', 'procedencia', 'replica', 'copia', 'copias',
        'decant', 'decants', 'muestra', 'muestras', 'tamano', 'tamanos',
        'reclamar', 'reclamo', 'queja', 'quejas', 'llegó roto', 'llego roto',
        'llego danado', 'pedido damaged', 'devolucion', 'devoluciones', 'cambio',
        'descuento por cantidad', 'por cantidad', 'precio especial', 'mayorista',
        'aplicar', 'fijacion', 'donde aplicar', 'puntos de aplicacion', 'como aplicar',
        'gracias', 'muchas gracias', 'quien eres', 'como te llamas'
    ];

    // El flujo de REGALO lo maneja mejor la cadena legacy: deduce el genero
    // del destinatario, pregunta si no lo sabe y ofrece el empaque. Si el
    // router lo captura, se pierde ese copy.
    var PREGUNTAS_DE_REGALO = [
        'regalo', 'regalar', 'regale', 'obsequio', 'presente', 'sorpresa',
        'cumpleanos', 'aniversario', 'boda', 'novia', 'novio', 'esposa', 'esposo',
        'dia de la madre', 'dia del padre', 'dia del amor', 'dia de la amistad',
        'dia de san valentin', 'san valentin', 'para mi mama', 'para mi papa',
        'para mi mama', 'para mi papa', 'para miherbano', 'para mi hermana'
    ];

    function puntuarIntenciones(c) {
        var lista = [];

        // Si es una pregunta de la tienda (datos, politicas, garantias) el
        // router se aparta y deja que la cadena legacy conteste.
        if (containsAny(c.positivo, PREGUNTAS_DE_TIENDA)) return lista;

        // Lo mismo con el flujo de regalo, que la cadena legacy hace mejor.
        if (containsAny(c.positivo, PREGUNTAS_DE_REGALO)) return lista;

        // --- 1. CONSULTA SOBRE UN PRODUCTO CONCRETO ---
        if (c.producto && c.producto.confianza >= 0.55) {
            var s = 20;
            if (c.preguntaSobreProducto) s += 45;
            // Para GANAR con un verbo de recomendacion hace falta que haya
            // aparecido el nombre COMPLETO del producto (confianza 0.85+). Si lo
            // unico que coincidio fue la marca, es una recomendacion de esa
            // marca, no un producto.
            if (c.quiereRecomendacion && c.producto.confianza >= 0.85) s += 30;
            if (c.referencia !== null) s += 15;
            if (c.quiereRefinar) s += 10;
            // Solo se anota la intencion si tiene una base solida: nombrar un
            // producto suelta (20 puntos) no basta, hace falta una pregunta
            // sobre el o un verbo de compra.
            if (s >= 40) lista.push({ id: 'producto', puntaje: s });
        }

        // --- 2. REFINAMIENTO DE LA BUSQUEDA ANTERIOR ---
        if (c.hayContexto) {
            var r = 20;
            if (c.quiereRefinar) r += 45;
            if (c.genero) r += 22;
            if (c.presupuesto) r += 22;
            if (c.familia) r += 16;
            if (c.exclusiones.length) r += 16;
            if (c.ocasion) r += 14;
            if (c.notas.length) r += 12;
            if (c.referencia !== null) r += 12;
            lista.push({ id: 'refinar', puntaje: r });
        }

        // --- 3. RECOMENDACION ---
        var m = 0;
        if (containsAny(c.positivo, PALABRAS_RECOMENDAR_FUERTES)) m += 45;
        else if (c.quiereRecomendacion) m += 28;
        if (c.genero) m += 12;
        if (c.ocasion) m += 12;
        if (c.familia) m += 10;
        if (c.presupuesto) m += 10;
        if (c.notas.length) m += 8;
        if (c.exclusiones.length) m += 6;
        if (c.marca) m += 8;
        if (m >= 20) lista.push({ id: 'recomendar', puntaje: m });

        lista.sort(function (a, b) { return b.puntaje - a.puntaje; });
        return lista;
    }

    function elegirIntencion(c) {
        var lista = puntuarIntenciones(c);
        if (!lista.length) return null;
        if (lista[0].puntaje < UMBRAL_ROUTER) return null;
        return lista[0].id;
    }

    // === UTILIDADES DE SLOTS ===
    function unionListas() {
        var out = [];
        for (var i = 0; i < arguments.length; i++) {
            var l = arguments[i];
            if (!l) continue;
            for (var j = 0; j < l.length; j++) {
                if (out.indexOf(l[j]) === -1) out.push(l[j]);
            }
        }
        return out;
    }

    function componerConsulta(texto, s) {
        var p = [texto];
        if (s.familia) p.push(s.familia);
        if (s.ocasion && s.ocasion !== 'regalo') p.push(s.ocasion);
        if (s.notas && s.notas.length) p.push(s.notas.join(' '));
        return p.join(' ');
    }

    function explicarCriterios(s) {
        var partes = [];
        if (s.genero) partes.push(s.genero === 'hombre' ? 'para hombre' : s.genero === 'mujer' ? 'para mujer' : 'unisex');
        if (s.ocasion) partes.push('para ' + (NOMBRES_OCASION[s.ocasion] || s.ocasion));
        if (s.familia) partes.push('aroma ' + s.familia);
        if (s.marca) partes.push('de la marca ' + s.marca);
        if (s.presupuesto) partes.push('hasta ' + formatoMoneda(s.presupuesto));
        if (s.exclusiones && s.exclusiones.length) partes.push('sin ' + s.exclusiones.join(' ni '));
        if (s.notas && s.notas.length) partes.push('notas de ' + s.notas.slice(0, 2).join(', '));
        // Los 3 mas relevantes: una lista larga de criterios parece un formulario
        return partes.slice(0, 3);
    }

    function estadoSlots(c) {
        // Slots efectivos: lo de este mensaje sobre lo que ya se recuerda
        var prefs = state.userPreferences;
        var base = state.ultimaConsulta || {};
        var s = {
            genero: c.genero || base.genero || prefs.gender,
            occasion: c.ocasion || base.ocasion || prefs.occasion,
            familia: c.familia || base.familia || prefs.scentType,
            presupuesto: c.presupuesto || base.presupuesto || prefs.budgetMax,
            exclusiones: unionListas(base.exclusiones, c.exclusiones, prefs.excludedFamilies),
            // Las notas NO se acumulan: "vainilla" de hace 3 turnos ya no debe
            // seguir pesando en la busqueda actual.
            notas: c.notas || [],
            marca: c.marca || base.marca || null
        };

        // Una peticion FUERTE ("recomiendame", "ayudame a elegir") empieza una
        // busqueda nueva: se limpian las pistas blandas (ocasion, familia, notas)
        // y se conservan las duras (genero, presupuesto, exclusiones, marca).
        if (containsAny(c.positivo, PALABRAS_RECOMENDAR_FUERTES)) {
            s.ocasion = c.ocasion || null;
            s.familia = c.familia || null;
            s.notas = c.notas || [];
        }
        return s;
    }

    // Para "los mas baratos" / "los mas caros" el ranking por relevancia no
    // sirve: hay que ORDENAR el catalogo por precio. Si no, el buscador
    // devuelve los de mayor puntaje, que no son necesariamente los mas baratos.
    function buscarPorPrecio(s, ascendente) {
        var catalogo = construirIndiceCatalogo().todos;
        var filtrados = catalogo.filter(function (p) {
            if (!p.precio) return false;
            if (s.genero) {
                var c = (p.categoria || '').toLowerCase();
                if (c !== s.genero && c !== 'unisex') return false;
            }
            if (s.marca) {
                if (normalize(p.marca || '') !== s.marca) return false;
            }
            if (s.exclusiones && s.exclusiones.length) {
                var fam = ((p.tipo_olor || '') + ' ' + (p.notas || '')).toLowerCase();
                for (var i = 0; i < s.exclusiones.length; i++) {
                    if (fam.indexOf(s.exclusiones[i]) !== -1) return false;
                }
            }
            return true;
        });
        filtrados.sort(function (a, b) {
            return ascendente ? (a.precio - b.precio) : (b.precio - a.precio);
        });
        return filtrados.slice(0, 3);
    }

    function guardarConsulta(s, matches) {
        state.ultimaConsulta = {
            // OJO: aqui la clave es 'genero' (como en estadoSlots). El buscador
            // usa 'gender' (como en searchPerfumes). No son el mismo nombre.
            genero: s.genero,
            ocasion: s.ocasion,
            familia: s.familia,
            presupuesto: s.presupuesto,
            exclusiones: s.exclusiones,
            notas: s.notas,
            marca: s.marca || null,
            ids: matches.map(function (m) { return m.id; })
        };
    }

    // Filtra por la marca que menciono el usuario ("perfumes de Armaf").
    // Si la busqueda por relevancia no trae ninguno de esa marca, se buscan
    // directo en el catalogo: si no, el botdiria "de la marca Armaf" y
    // mostraria fragancias de otra.
    function productosDeMarca(marca, s) {
        if (!marca) return [];
        var catalogo = construirIndiceCatalogo().todos;
        return catalogo.filter(function (p) {
            if (normalize(p.marca || '') !== marca) return false;
            if (s && s.genero) {
                var c = (p.categoria || '').toLowerCase();
                if (c !== s.genero && c !== 'unisex') return false;
            }
            if (s && s.exclusiones && s.exclusiones.length) {
                var fam = ((p.tipo_olor || '') + ' ' + (p.notas || '')).toLowerCase();
                for (var i = 0; i < s.exclusiones.length; i++) {
                    if (fam.indexOf(s.exclusiones[i]) !== -1) return false;
                }
            }
            return true;
        });
    }

    function filtrarPorMarca(matches, marca) {
        if (!marca || !matches || !matches.length) return matches;
        var deLaMarca = matches.filter(function (m) {
            return normalize(m.marca || '') === marca;
        });
        return deLaMarca.length ? deLaMarca : matches;
    }

    // === RESPUESTA: REFINAMIENTO ===
    function responderRefinamiento(c) {
        var base = state.ultimaConsulta || {};
        var s = estadoSlots(c);

        // Que cambio respecto de la busqueda anterior (para explicarlo)
        var cambios = [];
        if (c.genero && c.genero !== base.genero) {
            cambios.push('ahora para ' + (c.genero === 'hombre' ? 'hombre' : c.genero === 'mujer' ? 'mujer' : 'unisex'));
        }
        if (c.presupuesto && c.presupuesto !== base.presupuesto) {
            cambios.push('hasta ' + formatoMoneda(c.presupuesto));
        }
        if (c.familia && c.familia !== base.familia) {
            cambios.push('aroma ' + c.familia);
        }
        if (c.ocasion && c.ocasion !== base.ocasion) {
            cambios.push('para ' + (NOMBRES_OCASION[c.ocasion] || c.ocasion));
        }
        if (c.exclusiones.length) {
            cambios.push('excluyendo ' + c.exclusiones.join(' y '));
        }
        if (c.notas.length) {
            cambios.push('con notas de ' + c.notas.slice(0, 3).join(', '));
        }
        if (!cambios.length && base.ids) {
            cambios.push('otra tanda de la misma búsqueda');
        }

        var query = componerConsulta(c.texto, s);
        var opts = {
            gender: s.genero,
            budgetMax: s.presupuesto,
            excludedFamilies: s.exclusiones,
            potency: state.userPreferences.potency
        };
        var matches = searchPerfumes(query, opts);
        var relajado = false;

        if (!matches.length || matches.presupuestoInsatisfacible) {
            // El precio pedido no deja nada: se avisa con el minimo real
            var rango = rangoPrecios();
            if (rango && s.presupuesto && s.presupuesto < rango.min) {
                return {
                    type: 'text',
                    content: "💰 Con un tope de **" + formatoMoneda(s.presupuesto) + "** no tenemos ninguna fragancia: lo más barato del catálogo está en **" +
                             formatoMoneda(rango.min) + "**.\n\n" +
                             "Trabajamos con precios directos en cada referencia, así que no hay un escalón más barato. Lo que sí puedo hacer:\n\n" +
                             "• **Buscarte la opción más económica** dentro de tu estilo (" + formatoMoneda(rango.min) + " es el piso)\n" +
                             "• **Consultar una condición especial** por WhatsApp\n\n" +
                             "📲 [Consultar precio especial →](https://wa.me/573147551411?text=" + encodeURIComponent('Hola, busco un perfume con un presupuesto de ' + s.presupuesto + '. ¿Tienen alguna condición especial?') + ")"
                };
            }
        }
        if (!matches.length) {
            matches = searchPerfumes(query, {
                gender: s.genero,
                budgetMax: null,
                excludedFamilies: s.exclusiones
            });
            relajado = true;
            if (matches.length) cambios.push('relajé el límite de precio');
        }

        if (!matches.length) {
            return {
                type: 'text',
                content: "🤔 Con esos filtros no me sale ninguna fragancia del catálogo. " +
                         "¿Prefieres que **quite el precio**, que **quite la exclusión de aromas** o que mire **otro tipo de fragancia**?"
            };
        }

        // "más barato" / "más caro" ordenan por precio. Sin esto el buscador
        // devolvia los de mayor puntaje, que no son necesariamente los más
        // baratos.
        var quiereBarato = containsAny(c.positivo, ['mas barato', 'mas baratos', 'barato', 'barata',
                                                     'baratas', 'mas economico', 'mas economicos',
                                                     'economico', 'economicos', 'mas barata',
                                                     'menos caro', 'mas baratas']);
        var quiereCaro = containsAny(c.positivo, ['mas caro', 'mas caros', 'caro', 'mas cara',
                                                   'mas caras', 'caros', 'premium', 'exclusivo',
                                                   'exclusivos', 'lujo', 'mas de lujo']);
        if (quiereBarato || quiereCaro) {
            var porPrecio = buscarPorPrecio(s, quiereBarato);
            if (porPrecio.length) {
                matches = porPrecio;
                if (quiereBarato) {
                    cambios.push('ordenadas de menor a mayor precio');
                } else {
                    cambios.push('ordenadas de mayor a menor precio');
                }
            }
        }

        state.lastRecommendedIds = matches.map(function (m) { return m.id; });
        state.currentFocusProduct = matches[0];
        guardarConsulta(s, matches);

        var criterios = explicarCriterios(s);
        var cabecera = "🔧 **Ajusté tu búsqueda:** " + cambios.join(' · ') + ".";
        if (criterios.length) cabecera += "\n🎯 **Criterios:** " + criterios.join(' · ') + ".";

        // El intro por defecto elige tema segun laoccasion guardada, asi que para
        // "los mas baratos" decía "Modo Bestia". Aqui va uno acorde a la consulta.
        var gTxt = s.genero === 'hombre' ? ' (Hombre)' : s.genero === 'mujer' ? ' (Mujer)' : s.genero === 'unisex' ? ' (Unisex)' : '';
        var cuerpo;
        if (quiereBarato) {
            cuerpo = "💸 **Las más económicas" + gTxt + ":** te ordené el catálogo de menor a mayor precio para que veas primero lo que menos pesa en tu bolsillo:";
        } else if (quiereCaro) {
            cuerpo = "👑 **Las más exclusivas" + gTxt + ":** te ordené el catálogo de mayor a menor precio, con las piezas de mayor concentración y proyección:";
        } else {
            cuerpo = generateRecommendationIntro(c.texto, matches);
        }
        if (relajado) {
            cabecera += "\n⚠️ No encontré nada con TODOS los filtros, así que aflojé el de precio.";
        }

        return {
            type: 'recommendation',
            content: cabecera + "\n\n" + cuerpo,
            products: matches
        };
    }

    // === RESPUESTA: RECOMENDACION ===
    function responderRecomendacion(c) {
        var prefs = state.userPreferences;
        var s = estadoSlots(c);

        // Falta el genero y hay contexto claro de compra: preguntar, SIN perder
        // lo que el usuario ya dijo (la memoria queda en userPreferences)
        if (!s.genero && (s.ocasion || s.familia || s.notas.length)) {
            var contexto = [];
            if (s.ocasion) contexto.push('para ' + (NOMBRES_OCASION[s.ocasion] || s.ocasion));
            if (s.familia) contexto.push('aroma ' + s.familia);
            if (s.notas.length) contexto.push('con notas de ' + s.notas.slice(0, 3).join(', '));
            return {
                type: 'text',
                content: "💫 Perfecto" + (contexto.length ? " (" + contexto.join(', ') + ")" : "") +
                         ". Para afinar la selección: **¿es para hombre, mujer o unisex?**\n\n" +
                         "Con eso te muestro las 3 fragancias que mejor encajan y te explico por qué."
            };
        }

        var query = componerConsulta(c.texto, s);
        var opts = {
            gender: s.genero,
            budgetMax: s.presupuesto,
            excludedFamilies: s.exclusiones,
            potency: prefs.potency
        };
        var matches = searchPerfumes(query, opts);
        matches = filtrarPorMarca(matches, s.marca);

        // Si el usuario pidio una marca y los resultados no son de esa marca,
        // se buscan ESA marca en el catalogo. Si no, el bot diria "de la marca
        // Armaf" y mostraria fragancias de otras marcas.
        if (s.marca) {
            var deEsaMarca = productosDeMarca(s.marca, s);
            if (deEsaMarca.length) {
                matches = deEsaMarca.slice(0, 3);
            }
        }

        // El buscador marca cuando NADA cumple el presupuesto (en vez de
        // ignorarlo en silencio). Si es asi, hay que decirlo: mostrar productos
        // que cuestan el doble de lo que pidio es mentirle.
        if (matches.presupuestoInsatisfacible && s.presupuesto) {
            var rangoImposible = rangoPrecios();
            if (rangoImposible && s.presupuesto < rangoImposible.min) {
                return {
                    type: 'text',
                    content: "💰 Con un tope de **" + formatoMoneda(s.presupuesto) + "** no hay fragancias disponibles: lo más barato del catálogo está en **" +
                             formatoMoneda(rangoImposible.min) + "**.\n\n" +
                             "Trabajamos con precios directos en cada referencia, así que no hay un escalón más barato. Lo que sí puedo hacer:\n\n" +
                             "• **Buscarte la opción más económica** dentro de tu estilo\n" +
                             "• **Consultar una condición especial** por WhatsApp\n\n" +
                             "📲 [Consultar precio especial →](https://wa.me/573147551411?text=" + encodeURIComponent('Hola, busco un perfume con un presupuesto de ' + s.presupuesto + '. ¿Tienen alguna condición especial?') + ")"
                };
            }
        }

        if (!matches.length && s.presupuesto) {
            var rango = rangoPrecios();
            if (rango && s.presupuesto < rango.min) {
                return {
                    type: 'text',
                    content: "💰 Con un tope de **" + formatoMoneda(s.presupuesto) + "** no hay fragancias disponibles: lo más barato del catálogo está en **" +
                             formatoMoneda(rango.min) + "**.\n\n" +
                             "Trabajamos con precios directos en cada referencia, así que no hay un escalón más barato. Lo que sí puedo hacer:\n\n" +
                             "• **Buscarte la opción más económica** dentro de tu estilo\n" +
                             "• **Consultar una condición especial** por WhatsApp\n\n" +
                             "📲 [Consultar precio especial →](https://wa.me/573147551411?text=" + encodeURIComponent('Hola, busco un perfume con un presupuesto de ' + s.presupuesto + '. ¿Tienen alguna condición especial?') + ")"
                };
            }
        }
        if (!matches.length) {
            matches = searchPerfumes(query, { gender: s.genero, budgetMax: null, excludedFamilies: s.exclusiones });
            if (matches.length) {
                var cab0 = "⚠️ No encontré nada con **todos** tus filtros, así que aflojé el de precio.";
                state.lastRecommendedIds = matches.map(function (m) { return m.id; });
                state.currentFocusProduct = matches[0];
                guardarConsulta(s, matches);
                return {
                    type: 'recommendation',
                    content: cab0 + "\n\n" + generateRecommendationIntro(c.texto, matches),
                    products: matches
                };
            }
            return {
                type: 'text',
                content: "🤔 No me sale ninguna fragancia con esa combinación. ¿Quieres que **quite el precio**, que **quite la exclusión de aromas** o que revise **otra familia olfativa**?"
            };
        }

        state.lastRecommendedIds = matches.map(function (m) { return m.id; });
        state.currentFocusProduct = matches[0];
        guardarConsulta(s, matches);

        var criterios = explicarCriterios(s);
        var cabecera = criterios.length ? "🎯 **Criterios:** " + criterios.join(' · ') + ".\n\n" : "";
        return {
            type: 'recommendation',
            content: cabecera + generateRecommendationIntro(c.texto, matches),
            products: matches
        };
    }

    // === RESPUESTA: CONSULTA SOBRE UN PRODUCTO ===
    function responderConsultaProducto(c) {
        var producto = c.producto.product;
        // Si el usuario pide explicitamente ese perfume ("quiero el 9pm"),
        // se le muestra la ficha y no solo la descripcion.
        var soloInfo = c.preguntaSobreProducto && !c.quiereRecomendacion;
        if (soloInfo) {
            state.currentFocusProduct = producto;
            return generatePerfumeDeepDive(producto, c.texto);
        }
        state.currentFocusProduct = producto;
        state.lastRecommendedIds = [producto.id];
        guardarConsulta(estadoSlots(c), [producto]);
        return {
            type: 'recommendation',
            content: "✨ Aquí tienes lo que buscas:\n\n" + generatePerfumeDeepDive(producto, c.texto).content,
            products: [producto]
        };
    }

    function processUserMessage(rawText) {
        var text = rawText.trim();
        var norm = normalize(text);

        if (!text) return null;

        // 0. ACTUALIZAR PREFERENCIAS ANTES DE EVALUAR CUALQUIER INTENCIÓN.
        // Antes esto pasaba en el paso 8, muy por debajo de los handlers que leen
        // state.userPreferences (los más vendidos, los nuevos, etc.), así que
        // respondían con el género y la ocasión del mensaje ANTERIOR.
        var textoConTyos = applyTypoCorrection(text);
        updateUserPreferencesFromMessage(textoConTyos !== text ? textoConTyos + ' ' + text : text);

        // 1. GUARDRAIL: fuera de dominio.
        // Solo se rechaza si la consulta NO tiene ninguna señal de perfumería. Antes
        // se evaluaba siempre primero y con palabras que la propia tienda usa
        // ('clima', 'trabajo', 'tiempo', 'amor'), de modo que 3 de los 5 chips
        // rápidos del chat respondían "No puedo ayudarte con ese tema".
        if (containsAny(text, OUT_OF_DOMAIN) && !esConsultaDePerfumeria(text)) {
            return {
                type: 'text',
                content: "Mi especialidad y pasión es la alta perfumería. No puedo ayudarte con ese tema, pero con el mayor de los gustos puedo asesorarte para encontrar tu fragancia ideal, explicarte notas exclusivas o gestionar tu pedido por WhatsApp. ✨"
            };
        }



    // === ROUTER CON PUNTAJE ===
        // Se extraen los slots de la frase y se puntuan las intenciones. Solo entra
        // si alguna gana con confianza; si no, sigue la cadena legacy de abajo.
        var slots = extraerSlots(text);
        var intencion = elegirIntencion(slots);
        if (intencion === 'producto') {
            var rProd = responderConsultaProducto(slots);
            if (rProd) return rProd;
        } else if (intencion === 'refinar') {
            var rRef = responderRefinamiento(slots);
            if (rRef) return rRef;
        } else if (intencion === 'recomendar') {
            var rRec = responderRecomendacion(slots);
            if (rRec) return rRec;
        }

        // 1-EARLY. DESCUENTOS Y OFERTAS — se evalúa MUY TEMPRANO para que preguntas como
        // "¿Tienen descuentos?" no sean capturadas por el handler de stock (que tiene "tienen").
        if (isDiscountQuery(text)) {
            var eventoVigente = (typeof EventosManager !== 'undefined' && EventosManager.getEventoActivo) ? EventosManager.getEventoActivo() : null;
            var destacadosEarly = productosDestacadosDelEvento(3);

            if (eventoVigente) {
                state.lastRecommendedIds = destacadosEarly.map(function(m) { return m.id; });
                state.currentFocusProduct = destacadosEarly[0] || null;
                return {
                    type: 'recommendation',
                    content: "💎 **Sobre nuestros precios:**\n\n" +
                             "Manejamos **precio directo** en perfumería árabe y de diseñador importada, sin intermediarios. **No manejamos descuentos ni rebajas automáticas**: el precio que ves es el precio final.\n\n" +
                             "Lo que sí tenemos activo ahora es la **" + eventoVigente.nombre + "**: una selección de fragancias que encajan con esa fecha. Te dejo las más destacadas:",
                    products: destacadosEarly
                };
            }

            return {
                type: 'text',
                content: "💎 **Sobre nuestros precios:**\n\n" +
                         "Manejamos **precios directos** en perfumería árabe y de diseñador importada, sin intermediarios. **No tenemos descuentos permanentes ni rebajas automáticas** en el catálogo: el precio que ves es el precio final.\n\n" +
                         "• Para pedidos de **2 o más frascos** o compras especiales, siempre buscamos la mejor condición para ti.\n" +
                         "• Cuando llega una fecha especial (Navidad, San Valentín, Amor & Amistad...) el sitio se viste de esa temática y te mostramos **las fragancias que mejor encajan** con ese momento.\n\n" +
                         "📲 ¿Quieres que te avisen por WhatsApp cuando haya novedades? Escríbenos: [Contactar por WhatsApp →](https://wa.me/573147551411?text=" + encodeURIComponent('Hola, quiero que me avisen cuando tengan novedades o promociones activas.') + ")"
            };
        }

        // 1b. QUEJAS Y POST-VENTA
        if (containsAny(text, DICTIONARY.quejas)) {
            var waComplaint = encodeURIComponent('Hola, tengo un inconveniente con mi pedido y necesito ayuda.');
            return {
                type: 'text',
                content: "😔 **Lamentamos mucho lo sucedido y lo atenderemos de inmediato.**\n\n" +
                         "Nuestro equipo está listo para solucionar cualquier inconveniente con tu pedido:\n\n" +
                         "• **Escríbenos ahora por WhatsApp** y en cuestión de minutos un asesor real revisará tu caso y buscará la mejor solución.\n" +
                         "• En casos de producto dañado en envío, realizamos **reposición inmediata** sin costo adicional.\n" +
                         "• Nuestro número directo: **+57 314 7551411**\n\n" +
                         "[Toca aquí para escribirnos directamente →](https://wa.me/573147551411?text=" + waComplaint + ")\n\n" +
                         "Tu satisfacción es nuestra mayor prioridad. ✨"
            };
        }

        // 1c. COMPARACIÓN DIRECTA ENTRE DOS PRODUCTOS DEL CATÁLOGO
        var comparedPair = detectComparison(text);
        if (comparedPair) {
            var p1 = comparedPair[0];
            var p2 = comparedPair[1];
            state.lastRecommendedIds = [p1.id, p2.id];
            return {
                type: 'recommendation',
                content: "⚖️ **Comparativa Sommelier: " + p1.nombre + " vs " + p2.nombre + "**\n\n" +
                         "• **" + p1.nombre + "** (*" + (p1.marca || '') + "*): Su aura es *" + (p1.transmite || p1.descripcion_corta || 'sofisticada') + "*. " +
                         "Familia olfativa: **" + (p1.tipo_olor || 'exclusiva').toUpperCase() + "**. " +
                         "Duración: *" + (p1.duracion || 'excelente') + "* · Intensidad: *" + (p1.intensidad || 'alta') + "*.\n\n" +
                         "• **" + p2.nombre + "** (*" + (p2.marca || '') + "*): Su aura es *" + (p2.transmite || p2.descripcion_corta || 'imponente') + "*. " +
                         "Familia olfativa: **" + (p2.tipo_olor || 'exclusiva').toUpperCase() + "**. " +
                         "Duración: *" + (p2.duracion || 'excelente') + "* · Intensidad: *" + (p2.intensidad || 'alta') + "*.\n\n" +
                         "💡 **Veredicto Sommelier:** " +
                         "Elige **" + p1.nombre + "** si buscas " + (p1.ideal_para || 'presencia y elegancia') + ". " +
                         "Elige **" + p2.nombre + "** si prefieres " + (p2.ideal_para || 'versatilidad y distinción') + ".\n\n" +
                         "¿Deseas pedir alguno de los dos o ver más detalles?",
                products: [p1, p2]
            };
        }

        // 1d. INSPIRACIÓN EN MARCA EXTERNA ("algo similar al Sauvage", "alternativa al Bleu")
        var inspiration = detectInspiration(text);
        if (inspiration) {
            // Transferir el perfil al buscador
            var inspOptions = {
                gender: inspiration.gender,
                scentType: inspiration.scentType,
                occasion: inspiration.occasion || state.userPreferences.occasion,
                potency: inspiration.potency || state.userPreferences.potency,
                budgetMax: state.userPreferences.budgetMax
            };
            var inspMatches = searchPerfumes(text, inspOptions);
            if (inspMatches.length > 0) {
                state.lastRecommendedIds = inspMatches.map(function(m) { return m.id; });
                state.currentFocusProduct = inspMatches[0];
                return {
                    type: 'recommendation',
                    content: "🪞 **Alternativas a ese perfume de lujo, con ADN olfativo muy similar:**\n\n" +
                             "Ese perfume es conocido por ser *" + inspiration.desc + "*. " +
                             "Te presento las mejores opciones de nuestro catálogo con ese mismo perfil olfativo, " +
                             "a una fracción del precio y con igual o mayor duración en piel:\n",
                    products: inspMatches
                };
            }
        }

        // 1e. INTERÉS EN COMPRAR UN PRODUCTO YA MOSTRADO
        // El cliente dice "ese", "lo quiero", "el primero", etc. — se activa SOLO si hay productos mostrados.
        if ((state.currentFocusProduct || (state.lastRecommendedIds && state.lastRecommendedIds.length > 0)) && containsAny(text, DICTIONARY.interesMostrado)) {
            var targetProd = state.currentFocusProduct;
            // Si no hay producto en foco, usar el primero de los recomendados
            if (!targetProd && state.lastRecommendedIds && state.lastRecommendedIds.length > 0) {
                var allProds = getCatalog();
                targetProd = allProds.filter(function(p) { return p.id === state.lastRecommendedIds[0]; })[0] || null;
            }
            // Detectar si pide el segundo o tercero
            if (containsAny(text, ['el segundo', 'el 2', 'segundo']) && state.lastRecommendedIds && state.lastRecommendedIds.length >= 2) {
                var allCat = getCatalog();
                targetProd = allCat.filter(function(p) { return p.id === state.lastRecommendedIds[1]; })[0] || targetProd;
            }
            if (containsAny(text, ['el tercero', 'el 3', 'tercero']) && state.lastRecommendedIds && state.lastRecommendedIds.length >= 3) {
                var allCat2 = getCatalog();
                targetProd = allCat2.filter(function(p) { return p.id === state.lastRecommendedIds[2]; })[0] || targetProd;
            }
            if (targetProd) {
                state.currentFocusProduct = targetProd;
                var priceStrI = targetProd.precio ? '$' + targetProd.precio.toLocaleString('es-CO') : 'Consultar';
                var waI = encodeURIComponent('¡Hola Perfumería Manizales! Me interesa el ' + targetProd.nombre + ' (' + (targetProd.marca || '') + ') que me recomendó Aura AI. ¿Podría darme más información para comprarlo?');
                return {
                    type: 'single_product',
                    content: "✨ **¡Excelente elección! " + targetProd.nombre + "** es una de las fragancias más apreciadas de nuestro catálogo.\n\n" +
                             "💰 **Precio:** **" + priceStrI + "**\n\n" +
                             "Para apartar tu frasco ahora mismo y coordinar tu entrega, solo presiona el botón **'Pedir'** o toca aquí:\n\n" +
                             "📲 [Pedir " + targetProd.nombre + " por WhatsApp →](https://wa.me/573147551411?text=" + waI + ")",
                    products: [targetProd]
                };
            }
        }

        // 1f. MÉTODOS DE PAGO — respuesta directa antes de llegar a handlers genéricos
        if (containsAny(text, DICTIONARY.pagos)) {
            var prodPago = state.currentFocusProduct;
            var waPago = encodeURIComponent('Hola, me gustaría saber los métodos de pago disponibles' + (prodPago ? (' para el ' + prodPago.nombre) : '') + '.');
            return {
                type: 'text',
                content: "💳 **Medios de Pago en Perfumería Manizales:**\n\n" +
                         "Aceptamos múltiples formas de pago 100% seguras:\n\n" +
                         "• 📱 **Nequi** — Envío de dinero digital\n" +
                         "• 📱 **Daviplata** — Billetera móvil Davivienda\n" +
                         "• 🏦 **Transferencia Bancolombia** — Transferencia directa\n" +
                         "• 💵 **Efectivo contra entrega** — Disponible en zonas autorizadas de Manizales\n" +
                         "• 🔄 **Consignación bancaria** — Para pedidos nacionales\n\n" +
                         "📦 Para pedidos fuera de Manizales: pago **previo a despacho** para garantizar seguridad en el envío.\n\n" +
                         "¿Tienes alguna pregunta adicional o ya decidiste qué fragancia quieres? [Escribirnos por WhatsApp →](https://wa.me/573147551411?text=" + waPago + ")"
            };
        }

        // 1g. SEGUIMIENTO DE PEDIDO — cliente pregunta dónde está su envío
        if (containsAny(text, DICTIONARY.seguimiento) && !containsAny(text, DICTIONARY.quejas)) {
            var waSeg = encodeURIComponent('Hola, quiero saber el estado de mi pedido o consultar el número de guía de mi envío.');
            return {
                type: 'text',
                content: "📦 **Seguimiento de tu Pedido:**\n\n" +
                         "Para consultarte el estado de tu envío y darte el número de guía con el transportador, nuestro equipo está disponible directamente por WhatsApp:\n\n" +
                         "• 📲 **WhatsApp directo:** +57 314 7551411\n" +
                         "• Indica tu **nombre completo** y la **fecha aproximada de tu pedido** para agilizar la búsqueda.\n" +
                         "• Para pedidos en Manizales, Villamaría y Neira: entrega el mismo día (si el pedido se realiza antes de las 5pm).\n" +
                         "• Para envíos nacionales: entre **1 y 3 días hábiles** según la ciudad destino.\n\n" +
                         "[Consultar estado de mi pedido →](https://wa.me/573147551411?text=" + waSeg + ")"
            };
        }

        // 1h. NOVEDADES — productos nuevos en el catálogo
        if (containsAny(text, DICTIONARY.nuevos)) {
            var genderNew = state.userPreferences.gender;
            var newCatalog = getCatalog().filter(function(p) { return p.activo !== false; });
            // Intentar encontrar productos marcados como nuevos
            var markedNew = newCatalog.filter(function(p) { return p.nuevo || p.es_nuevo; });
            var topNew = markedNew.length >= 2 ? markedNew.slice(0, 3) :
                         newCatalog.slice(-6).reverse().slice(0, 3); // Últimos añadidos al catálogo
            if (genderNew) {
                var filtNew = topNew.filter(function(p) {
                    return (p.categoria || '').toLowerCase() === genderNew || (p.categoria || '').toLowerCase() === 'unisex';
                });
                if (filtNew.length >= 2) topNew = filtNew;
            }
            if (topNew.length > 0) {
                state.lastRecommendedIds = topNew.map(function(m) { return m.id; });
                state.currentFocusProduct = topNew[0];
                return {
                    type: 'recommendation',
                    content: "🆕 **Últimas Novedades de Perfumería Manizales:**\n\n" +
                             "Estas fragancias acaban de llegar y son opciones excelentes:" +
                             (genderNew ? ' (filtrado para **' + genderNew + '**)' : '') + "",
                    products: topNew
                };
            }
        }

        // 1i. MÁS VENDIDOS / TOP DEL CATÁLOGO
        // Solo si la consulta es GENÉRICA. Si el usuario dio una pista concreta
        // (ocasión, familia, género, presupuesto, un producto) esta consulta la
        // debe atender el motor de búsqueda de más abajo, no el catálogo fijo.
        if (containsAny(text, DICTIONARY.masvendidos) && !consultaTieneEspecificidad(text)) {
            var genderTop = state.userPreferences.gender;
            var topCatalog = getCatalog().filter(function(p) { return p.activo !== false; });
            // Productos marcados como destacados primero, luego por ID
            var destacados = topCatalog.filter(function(p) { return p.destacado; });
            var topSellers = destacados.length >= 2 ? destacados.slice(0, 3) :
                             topCatalog.filter(function(p) { return p.precio; }).sort(function(a,b){ return (b.precio||0)-(a.precio||0); }).slice(0, 3);
            if (genderTop) {
                var filtTop = topSellers.filter(function(p) {
                    return (p.categoria || '').toLowerCase() === genderTop || (p.categoria || '').toLowerCase() === 'unisex';
                });
                if (filtTop.length >= 2) topSellers = filtTop;
            }
            if (topSellers.length > 0) {
                state.lastRecommendedIds = topSellers.map(function(m) { return m.id; });
                state.currentFocusProduct = topSellers[0];
                return {
                    type: 'recommendation',
                    content: "👑 **Nuestras Mejores Opciones:**\n\n" +
                             "Estas son las fragancias que más destacan por su calidad, duración y relación calidad-precio:\n" +
                             (genderTop ? ' *(para **' + genderTop + '**)*' : ''),
                    products: topSellers
                };
            }
        }

        // 1j. EMPAQUE Y PRESENTACIÓN DE REGALO
        if (containsAny(text, DICTIONARY.empaque)) {
            var prodEmp = state.currentFocusProduct;
            return {
                type: 'text',
                content: "🎁 **Presentación y Empaque de Nuestras Fragancias:**\n\n" +
                         (prodEmp ? "**" + prodEmp.nombre + "** viene en su caja original sellada de fábrica, con atomizador de lujo incluido. " : "") +
                         "Cada fragancia de Perfumería Manizales llega:\n\n" +
                         "• 📦 **Caja original sellada de fábrica** — sin abrir, con todos sus sellos de seguridad.\n" +
                         "• ✨ **Atomizador de lujo incluido** — presentación premium lista para regalar.\n" +
                         "• 🛡️ **Protección de burbuja** — las botellas van empacadas en caja rígida protectora para envíos.\n" +
                         "• 🎀 **Para regalos especiales:** si deseas lazo o tarjeta de regalo adicional, indícalo al hacer tu pedido por WhatsApp y con gusto lo coordinamos.\n\n" +
                         "¿Deseas hacer tu pedido ahora o consultar alguna fragancia específica?"
            };
        }

        // 1k. LAYERING — cómo combinar fragancias
        if (containsAny(text, DICTIONARY.layering)) {
            var prodLayer = state.currentFocusProduct;
            var waLayer = encodeURIComponent('Hola, me gustaría saber qué perfumes combinan bien' + (prodLayer ? (' con el ' + prodLayer.nombre) : '') + ' para hacer layering.');
            return {
                type: 'text',
                content: "🎨 **El Arte del Layering: Combinar Fragancias como un Sommelier**\n\n" +
                         "El layering es la técnica de superponer dos o más fragancias para crear un aroma único y personalizado.\n\n" +
                         "**Reglas de oro del Sommelier Aura:**\n" +
                         "• 🪵 **Base + Fresco:** Aplica primero una fragancia amaderada/oriental en el cuerpo y luego una fresca/cítrica encima — el resultado es espectacular.\n" +
                         "• 🌸 **Floral + Dulce:** Una base floral con un dulce avainillado por encima crea una fragancia femenina irresistible.\n" +
                         "• 💡 **Regla de bronce:** Las notas de fondo de la primera fragancia actúan como 'base' para la segunda. Aplica la más fuerte en la piel y la más suave sobre ropa.\n" +
                         (prodLayer ? "\n🔍 Para **" + prodLayer.nombre + "** te recomendaría combinarlo con algo más fresco o cítrico para equilibrar su perfil *" + (prodLayer.tipo_olor || 'principal') + "*.\n" : "") +
                         "\n📲 [Consultarle a nuestro asesor combinaciones específicas →](https://wa.me/573147551411?text=" + waLayer + ")"
            };
        }

        // 1l. PIEL SENSIBLE / ALERGIAS
        if (containsAny(text, DICTIONARY.pielsensible)) {
            return {
                type: 'text',
                content: "🌿 **Fragancias para Piel Sensible o Reactiva:**\n\n" +
                         "Entendemos tu preocupación. Algunos consejos importantes:\n\n" +
                         "• ✅ **Todas nuestras fragancias son originales** — las fórmulas originales de las casas perfumeras son creadas con estándares internacionales de seguridad dérmica (IFRA).\n" +
                         "• 💧 **¿Tienes piel muy sensible?** Te recomendamos aplicar el perfume **sobre la ropa** (en especial la interna como la camiseta) en lugar de directamente en la piel — tendrás todo el aroma sin contacto dérmico.\n" +
                         "• 🌸 **Familias más suaves:** Las fragancias **florales**, **cítricas** y **acuáticas** tienden a ser las más toleradas por pieles reactivas, a diferencia de las muy especiadas u orientales pesadas.\n" +
                         "• ⚠️ **Alergia confirmada:** Si tienes alergia médica a ingredientes específicos (como el almizcle o las maderas), consúltalo con tu médico antes de comprar.\n\n" +
                         "¿Te digo cuáles de nuestras fragancias tienen un perfil más suave y ligero?"
            };
        }

        // 1m. HORARIOS DE ATENCIÓN
        if (containsAny(text, DICTIONARY.horarios)) {
            var waH = encodeURIComponent('Hola, quiero saber sus horarios de atención.');
            return {
                type: 'text',
                content: "🕐 **Horarios de Atención Perfumería Manizales:**\n\n" +
                         "Atendemos con total disponibilidad:\n\n" +
                         "• 📅 **Lunes a Sábado:** 9:00 AM – 8:00 PM\n" +
                         "• 📅 **Domingos y festivos:** 10:00 AM – 6:00 PM\n" +
                         "• 📲 **WhatsApp:** Respondemos mensajes fuera de horario — si no estamos en línea, te respondemos en la próxima disponibilidad.\n\n" +
                         "Para entregas express en **Manizales, Villamaría y Neira**: coordina tu despacho antes de las **5:00 PM** para recibir el mismo día.\n\n" +
                         "[Escríbenos ahora →](https://wa.me/573147551411?text=" + waH + ")"
            };
        }

        // 1n. REDES SOCIALES Y CONTACTO DIGITAL
        if (containsAny(text, DICTIONARY.redes)) {
            return {
                type: 'text',
                content: "📱 **Encuéntranos en Redes Sociales:**\n\n" +
                         "• 📸 **Instagram:** [@manizalesperfumeria](https://www.instagram.com/manizalesperfumeria) — Aquí publicamos novedades, lanzamientos y reviews en video de cada fragancia.\n" +
                         "• 💬 **WhatsApp:** [+57 314 7551411](https://wa.me/573147551411) — Canal principal de ventas y atención personalizada.\n" +
                         "• 🎵 **TikTok:** Búscanos como **@manizalesperfumeria** para ver reseñas, unboxings y comparativas en video.\n\n" +
                         "¡Síguenos para enterarte primero de todas las novedades! ¿En qué más puedo ayudarte?"
            };
        }

        // 1o. AFIRMACIONES SIMPLES — cliente dice "sí", "dale", "bacano", etc.
        // Se activa SOLO si hay un producto en foco o recomendaciones previas, para redirigir a compra.
        if (containsAny(text, DICTIONARY.afirmaciones) && (state.currentFocusProduct || (state.lastRecommendedIds && state.lastRecommendedIds.length > 0))) {
            var afProd = state.currentFocusProduct;
            if (!afProd && state.lastRecommendedIds && state.lastRecommendedIds.length > 0) {
                var afCat = getCatalog();
                afProd = afCat.filter(function(p) { return p.id === state.lastRecommendedIds[0]; })[0] || null;
            }
            if (afProd) {
                var afWa = encodeURIComponent('¡Hola Perfumería Manizales! Aura AI me recomendó el ' + afProd.nombre + ' (' + (afProd.marca || '') + ') y me interesa comprarlo. ¿Me pueden dar más información?');
                return {
                    type: 'single_product',
                    content: "¡Perfecto! Con mucho gusto. ✨\n\nPara proceder con tu pedido de **" + afProd.nombre + "** y coordinar la entrega en tu ciudad, solo toca el botón **'Pedir'** o escríbenos directamente:\n\n📲 [Confirmar pedido por WhatsApp →](https://wa.me/573147551411?text=" + afWa + ")",
                    products: [afProd]
                };
            }
        }

        // 1p. NEGATIVAS SUAVES — cliente dice "no gracias", "lo pienso", "luego"
        if (containsAny(text, DICTIONARY.negativas)) {
            return {
                type: 'text',
                content: "Sin problema. ✨ Cuando lo desees, aquí estaré para asesorarte. Recuerda que puedes preguntarme sobre cualquier fragancia, comparar precios o pedir directamente por WhatsApp. \n\n¿Hay algo más en lo que pueda ayudarte hoy?"
            };
        }

        // 2. SALUDO INICIAL O CORDIALIDAD PURA (¡Sin enviar tarjetas aleatorias!)
        if (isPureGreeting(text)) {
            return {
                type: 'text',
                content: "¡Hola! Muy bien, gracias por preguntar. ✨ Un verdadero placer saludarte y darte la bienvenida a **Perfumería Manizales**.\n\n" +
                         "Soy **Aura**, tu Sommelier de Fragancias e Inteligencia Artificial personal. Cuéntame con total tranquilidad: ¿qué tipo de perfume tienes en mente hoy o para qué ocasión te gustaría encontrar tu fragancia ideal? ✦"
            };
        }

        // 3. SEGURIDAD, CONFIANZA Y COMPRAS SEGURAS (¿Las compras sí son seguras?, ¿Es confiable?, ¿Es estafa?)
        if (containsAny(text, [
            'segura', 'seguras', 'seguro', 'seguros', 'es seguro', 'son seguras', 'confiable', 'confiables',
            'es confiable', 'son confiables', 'estafa', 'estafas', 'me van a estafar', 'garantia de entrega',
            'como se que me llega', 'puedo confiar', 'por que confiar', 'referencias', 'testimonios',
            'comprobante', 'es legal', 'son legales', 'seguridad', 'garantizan la entrega'
        ])) {
            return {
                type: 'text',
                content: "🛡️ **¡Totalmente seguras y 100% garantizadas!**\n\n" +
                         "En **Perfumería Manizales** tu compra y tu dinero están completamente protegidos:\n\n" +
                         "• **Atención 1 a 1 y transparencia:** Todo el proceso de compra se atiende directamente vía WhatsApp con un asesor real que te envía fotos y videos reales de tu perfume antes del despacho.\n" +
                         "• **100% Originales y sellados:** Cada fragancia viene en su caja original sellada de fábrica con batch code y sello de garantía.\n" +
                         "• **Entregas locales y a nivel nacional:** En **Manizales, Villamaría y Neira** realizamos entregas el mismo día con opción de pago contraentrega en áreas autorizadas, y despachos seguros a toda Colombia coordinados directamente por WhatsApp.\n\n" +
                         "¿Qué perfume te gustaría consultar o pedir hoy con total tranquilidad? ✨"
            };
        }

        // 4. DEVOLUCIONES, CAMBIOS Y GARANTÍA DE ENVÍO
        if (containsAny(text, ['devolucion', 'devoluciones', 'cambio', 'cambios', 'si llega roto', 'si se parte', 'garantia de envio', 'politica de cambio'])) {
            return {
                type: 'text',
                content: "📦 **Garantía Total de Envío y Satisfacción:**\n\n" +
                         "• **Empaque blindado:** Todos nuestros envíos van en cajas rígidas con protección de burbuja de alta densidad.\n" +
                         "• **Seguro de transporte:** Si el paquete sufriera cualquier daño o rotura durante el transporte por la transportadora, te realizamos la reposición inmediata de tu botella sin costo adicional.\n" +
                         "• **Garantía de sellado:** Recibes tu perfume totalmente nuevo y sellado de fábrica.\n\n" +
                         "Tu tranquilidad y satisfacción son nuestra máxima prioridad. ¿Deseas consultar alguna fragancia?"
            };
        }

        // 5. CONSULTA DE CÓMO COMPRAR / PEDIDOS VÍA WHATSAPP
        if (containsAny(text, [
            'como se compra', 'como comprar', 'como compro', 'como se pide', 'como pedir', 'como pido',
            'como hago el pedido', 'como hago para comprar', 'como es el proceso', 'como me llega',
            'me interesa comprar', 'como adquirir', 'donde consignar', 'como es para comprar',
            'donde lo pido', 'hacer el pedido', 'pasos para comprar', 'quiero comprar', 'quiero pedir'
        ])) {
            var targetProduct = state.currentFocusProduct;
            var prodNote = targetProduct ? (" de **" + targetProduct.nombre + "**") : "";
            var finalPrice = targetProduct ? targetProduct.precio : null;
            var priceStr = finalPrice ? ' por solo **$' + finalPrice.toLocaleString('es-CO') + '**' : '';

            var contentText = "💬 **Las compras y pedidos se realizan 100% vía WhatsApp:**\n\n" +
                "1. **Toca el botón verde 'Pedir'**" + prodNote + priceStr + " (o haz clic en el botón de WhatsApp en pantalla).\n" +
                "2. Te atenderemos de inmediato por nuestro WhatsApp oficial (**+57 314 7551411**) para confirmar tu pedido y coordinar el despacho a tu ciudad o dirección.\n\n" +
                "✨ ¡Todo el proceso de compra es directo, seguro y personalizado a través de WhatsApp!";

            return {
                type: 'recommendation',
                content: contentText,
                products: targetProduct ? [targetProduct] : []
            };
        }

        // 6. VALIDACIÓN / CONFIRMACIÓN SOBRE EL PERFUME EN PANTALLA
        if (state.currentFocusProduct && containsAny(text, ['si es de', 'sirve para', 'es bueno para', 'es para', 'se puede usar en', 'pega para', 'es de navidad', 'sirve en', 'sirve de'])) {
            var currP = state.currentFocusProduct;

            if (containsAny(text, DICTIONARY.navidad) || containsAny(text, DICTIONARY.frio)) {
                return {
                    type: 'single_product',
                    content: "🎄 **¡Totalmente! " + currP.nombre + " es una excelente opción para Navidad y fin de año.**\n\n" +
                             "• **¿Por qué encaja perfecto?** Sus notas de *" + (currP.notas_salida || currP.notas || 'gran cuerpo') + "* con fondo *" + (currP.tipo_olor || 'cálido y opulento') + "* generan una sensación acogedora, elegante y festiva, ideal para las noches frescas y cenas decembrinas.\n\n" +
                             "• **Rendimiento:** " + (currP.duracion || 'Larga duración') + " para acompañarte durante toda la celebración.\n\n" +
                             "💰 ¿Deseas pedirlo directamente por WhatsApp?",
                    products: [currP]
                };
            }

            if (containsAny(text, DICTIONARY.cita)) {
                return {
                    type: 'single_product',
                    content: "🌹 **¡Sí, sin duda! " + currP.nombre + " es una joya para citas románticas.**\n\n" +
                             "Su aura *" + (currP.transmite || 'seductora y magnética') + "* genera cumplidos inmediatos en distancias cortas y deja un recuerdo inolvidable.\n\n" +
                             "¿Te gustaría pedirlo o compararlo con otra opción?",
                    products: [currP]
                };
            }

            if (containsAny(text, DICTIONARY.oficina)) {
                return {
                    type: 'single_product',
                    content: "💼 **Para oficina y entorno profesional:** " + currP.nombre + " te brindará una presencia *" + (currP.tipo_olor || 'elegante') + "* con duración *" + (currP.duracion || 'excelente') + "*. No invade pero se hace notar con distinción.\n\n¿Deseas pedirlo por WhatsApp?",
                    products: [currP]
                };
            }

            // Respuesta general para "sirve para X" cuando no coincide con una ocasión específica
            return {
                type: 'single_product',
                content: "✨ **Sobre " + currP.nombre + ":**\n\n" +
                         "• **Familia olfativa:** " + (currP.tipo_olor || 'Alta perfumería') + "\n" +
                         "• **Duración:** " + (currP.duracion || 'Excelente') + "\n" +
                         "• **Transmite:** " + (currP.transmite || 'Elegancia y presencia') + "\n\n" +
                         "¿Tienes alguna otra duda sobre este perfume o te gustaría ver otra opción?",
                products: [currP]
            };
        }

        // 7. CONSULTA DE STOCK / DISPONIBILIDAD
        // NOTA: isDiscountQuery() ya fue evaluado antes (paso 1-EARLY), así que aquí
        // solo llegamos si NO es una consulta de descuentos.
        if (containsAny(text, DICTIONARY.stock) && !isDiscountQuery(text)) {
            var correctedText = applyTypoCorrection(text);
            var stockProduct = state.currentFocusProduct || findProductByName(correctedText) || findProductByName(text);
            if (stockProduct) state.currentFocusProduct = stockProduct;
            var waStock = encodeURIComponent('Hola, quiero saber si tienen disponible' + (stockProduct ? (' el ' + stockProduct.nombre) : ' un perfume que me interesa') + '. ¿Está en stock?');
            return {
                type: 'text',
                content: "📦 **Disponibilidad de inventario en tiempo real:**\n\n" +
                         (stockProduct ? ("Para confirmar si **" + stockProduct.nombre + "** (*" + (stockProduct.marca || '') + "*) está disponible ahora mismo, ") : "Para verificar el stock de cualquier fragancia, ") +
                         "te recomiendo consultarnos directamente por **WhatsApp** — nuestro asesor te confirmará en segundos y podrás apartar tu botella de inmediato si hay disponibilidad.\n\n" +
                         (stockProduct ? ("💰 **Precio:** $" + (stockProduct.precio ? stockProduct.precio.toLocaleString('es-CO') : 'Consultar') + "\n\n") : "") +
                         "📲 [Consultar disponibilidad por WhatsApp →](https://wa.me/573147551411?text=" + waStock + ")"
            };
        }

        // 8. PREGUNTA SOBRE UN PERFUME EN CONCRETO (Específico por nombre)
        var correctedText = applyTypoCorrection(text);
        var specificProduct = findProductByName(correctedText) || findProductByName(text);
        if (!specificProduct && state.currentFocusProduct && isFollowUpQuestion(text)) {
            specificProduct = state.currentFocusProduct;
        }
        if (specificProduct) {
            state.currentFocusProduct = specificProduct;
            return generatePerfumeDeepDive(specificProduct, text);
        }

        // 7c. NEGOCIACIÓN DE PRECIO / DESCUENTOS ESPECIALES
        if (containsAny(text, DICTIONARY.negociacion)) {
            return {
                type: 'text',
                content: "💎 **Precios y condiciones especiales:**\n\n" +
                         "Nuestros precios son los más justos y directos del mercado en perfumería árabe y de diseñador importada, **sin intermediarios y sin letra chica**.\n\n" +
                         "Para pedidos de **2 o más frascos** o compras especiales, puedes consultar condiciones directamente con nuestro asesor por WhatsApp 👉 siempre buscamos la mejor experiencia para ti.\n\n" +
                         "💬 [Consultar precio especial 💬](https://wa.me/573147551411?text=" + encodeURIComponent('Hola, estoy interesado en comprar y quisiera saber si tienen alguna condición especial o precio por cantidad.') + ")"
            };
        }

        // 8. Las preferencias ya se actualizaron en el paso 0, antes de evaluar
        // cualquier intención (si no, los handlers de arriba leían las del turno
        // anterior).

        // 8b. INTENCIÓN DE REGALO — derivar género automáticamente si se detecta destinatario
        if (detectGiftIntent(text)) {
            var recipientGender = extractGiftRecipientGender(text);
            if (recipientGender && !state.userPreferences.gender) {
                state.userPreferences.gender = recipientGender;
            }
            // Si aún no sabemos para quién es el regalo
            if (!state.userPreferences.gender) {
                return {
                    type: 'text',
                    content: "🎁 **¡Qué hermoso detalle! Los perfumes son el regalo perfecto — siempre impresionan y se recuerdan.**\n\n" +
                             "Para seleccionarte las mejores opciones de regalo:\n" +
                             "• ¿El perfume es para **hombre, mujer o unisex**?\n" +
                             "• ¿Tienes un presupuesto en mente? (opcional)"
                };
            }
        }

        // 9. CASOS DONDE EL USUARIO INDICA OCASIÓN / NOTAS / POTENCIA PERO AÚN NO EL GÉNERO
        if (!state.userPreferences.gender) {
            // Caso A: Oficina / Trabajo
            if (state.userPreferences.occasion === 'oficina' || containsAny(text, DICTIONARY.oficina)) {
                state.userPreferences.occasion = 'oficina';
                return {
                    type: 'text',
                    content: "💼 **¡Excelente elección! Para oficina y trabajo destacan fragancias elegantes, limpias y versátiles que proyectan presencia y profesionalismo durante toda la jornada laboral.**\n\n" +
                             "Para seleccionarte las mejores opciones:\n" +
                             "• ¿Buscas fragancias para **hombre, mujer o unisex**?"
                };
            }

            // Caso B: Citas / Romance
            if (state.userPreferences.occasion === 'cita' || containsAny(text, DICTIONARY.cita)) {
                state.userPreferences.occasion = 'cita';
                return {
                    type: 'text',
                    content: "🌹 **¡Las fragancias para citas son mágicas! Acordes sensuales, magnéticos y envolventes que dejan una huella imborrable y generan cumplidos inmediatos.**\n\n" +
                             "Para mostrarte las mejores opciones de seducción:\n" +
                             "• ¿Buscas opciones para **hombre, mujer o unisex**?"
                };
            }

            // Caso C: Fiesta / Noche
            if (state.userPreferences.occasion === 'fiesta' || containsAny(text, DICTIONARY.fiesta)) {
                state.userPreferences.occasion = 'fiesta';
                return {
                    type: 'text',
                    content: "🔥 **¡Para fiesta y eventos nocturnos necesitas proyección y estela imponente! Aromas con personalidad que se hagan notar al entrar a cualquier lugar.**\n\n" +
                             "Para recomendarte las mejores opciones nocturnas:\n" +
                             "• ¿Buscas para **hombre, mujer o unisex**?"
                };
            }

            // Caso D: Calor / Verano / Fresco
            if (state.userPreferences.occasion === 'calor' || containsAny(text, DICTIONARY.calor)) {
                state.userPreferences.occasion = 'calor';
                return {
                    type: 'text',
                    content: "☀️ **Para días cálidos y clima templado destacan fragancias frescas, cítricas y acuáticas que energizan y brindan sensación de limpieza duradera.**\n\n" +
                             "Para seleccionarte las mejores fragancias frescas:\n" +
                             "• ¿Buscas para **hombre, mujer o unisex**?"
                };
            }

            // Caso E: Navidad / Fin de año
            if (state.userPreferences.occasion === 'navidad' || containsAny(text, DICTIONARY.navidad)) {
                state.userPreferences.occasion = 'navidad';
                return {
                    type: 'text',
                    content: "🎄 **¡La temporada navideña y de fin de año es la época más especial para perfumarse!**\n\n" +
                             "Para las noches decembrinas y clima fresco destacan los aromas **cálidos, dulces, amaderados y especiados** (con vainilla, canela, ámbar y maderas nobles).\n\n" +
                             "Para darte la selección más acertada:\n" +
                             "• ¿Buscas fragancias para **hombre, mujer o unisex**?"
                };
            }

            // Caso F: Dulce / Gourmand
            if (state.userPreferences.scentType === 'dulce' || containsAny(text, DICTIONARY.dulce)) {
                state.userPreferences.scentType = 'dulce';
                return {
                    type: 'text',
                    content: "🍯 **¡Los aromas dulces gourmand con notas de vainilla, caramelo, chocolate y praliné son deliciosos y adictivos!**\n\n" +
                             "Para darte las mejores opciones dulces:\n" +
                             "• ¿Buscas para **hombre, mujer o unisex**?"
                };
            }

            // Caso G: Amaderado
            if (state.userPreferences.scentType === 'amaderado' || containsAny(text, DICTIONARY.amaderado)) {
                state.userPreferences.scentType = 'amaderado';
                return {
                    type: 'text',
                    content: "🪵 **Las fragancias amaderadas (sándalo, cedro, oud y vetiver) transmiten elegancia, presencia y distinción.**\n\n" +
                             "Para seleccionarte las mejores opciones amaderadas:\n" +
                             "• ¿Buscas fragancias para **hombre, mujer o unisex**?"
                };
            }
        }

        // 9b. POTENCIA / DURACIÓN — detectar SIEMPRE (independiente del género)
        var isPotencyNegated = containsAny(text, [
            'no sea tan fuerte', 'no muy fuerte', 'no tan fuerte', 'no tan intenso', 'no tan intensa',
            'no sea fuerte', 'no sea intenso', 'no sea intensa', 'que no sea fuerte',
            'suave', 'suavecito', 'ligero', 'ligera', 'no muy intenso', 'no pesado',
            'discreta', 'discreto', 'no tan pesado', 'que no se sienta mucho',
            'que no sea tan obvio', 'no muy potente', 'sin mucha potencia'
        ]);
        if (isPotencyNegated) {
            state.userPreferences.potency = 'baja';
        } else if (containsAny(text, DICTIONARY.potencia) && state.userPreferences.potency !== 'baja') {
            state.userPreferences.potency = 'alta';
            if (!state.userPreferences.gender) {
                return {
                    type: 'text',
                    content: "🔥 **¡Excelente elección! Los perfumes de alta potencia, proyección imponente y duración extrema (10 a 14+ horas en piel) son nuestra especialidad.**\n\n" +
                             "Estas fragancias cuentan con altísima concentración de aceites que dejan una estela inolvidable donde sea que llegues.\n\n" +
                             "Para seleccionarte las mejores opciones en rendimiento:\n" +
                             "• ¿Buscas fragancias para **hombre, mujer o unisex**?"
                };
            }
        }

        // 10. BÚSQUEDA Y RECOMENDACIÓN SOMMELIER POR PREFERENCIAS ACUMULADAS
        // Pasar negaciones y presupuesto al motor de búsqueda
        var searchOpts = Object.assign({}, state.userPreferences);
        searchOpts.excludedFamilies = state.userPreferences.excludedFamilies || [];
        var matches = searchPerfumes(text, searchOpts);

        // Feedback sobre filtros activos
        var filterNote = '';
        if (searchOpts.budgetMax) {
            filterNote += ' (filtrando hasta **$' + searchOpts.budgetMax.toLocaleString('es-CO') + '**)';
        }
        if (searchOpts.excludedFamilies && searchOpts.excludedFamilies.length > 0) {
            filterNote += ' (excluyendo aromas **' + searchOpts.excludedFamilies.join(', ') + '**)';
        }

        if (matches.length > 0) {
            state.lastRecommendedIds = matches.map(function(m) { return m.id; });
            state.currentFocusProduct = matches[0];

            var intro = generateRecommendationIntro(text, matches) + filterNote;
            return {
                type: 'recommendation',
                content: intro,
                products: matches
            };
        }

        // 12. GARANTÍA Y ORIGINALIDAD
        if (containsAny(text, ['originales', 'original', 'replica', 'replicas', 'copia', 'copias', 'garantia', 'sellado', 'sellados', 'autentico', 'autenticos', 'son originales', 'es original', 'batch code', 'procedencia'])) {
            return {
                type: 'text',
                content: "✨ **Garantía de Autenticidad 100% Perfumería Manizales:**\n\n" +
                         "• Todas nuestras fragancias son **100% originales, selladas de fábrica y garantizadas** en su empaque y caja de lujo original.\n" +
                         "• Trabajamos con importación directa de las casas perfumeras más prestigiosas del mundo árabe y de diseñador (Lattafa, Afnan, Armaf, Maison Alhambra, etc.).\n" +
                         "• **Cero réplicas:** Solo calidad premium y total fijación en piel.\n\n" +
                         "¿Hay algún perfume en especial que quieras consultar?"
            };
        }

        // 13. DECANTS / TAMAÑOS / MUESTRAS
        if (containsAny(text, ['decant', 'decants', 'muestra', 'muestras', 'tamano', 'tamanos', 'mililitros', 'cuantos ml', 'que tamano', 'fraccion'])) {
            var currP = state.currentFocusProduct;
            return {
                type: 'text',
                content: "🍾 **Presentaciones y Tamaños:**\n\n" +
                         (currP ? "• **" + currP.nombre + "** viene en su presentación completa sellada de fábrica (habitualmente de 100 ml con atomizador de lujo).\n\n" : "") +
                         "• Nuestro catálogo principal cuenta con botellas completas y selladas de 100 ml / 80 ml / 50 ml según la casa perfumera.\n" +
                         "• Para disponibilidad de decants o tamaños específicos, puedes consultarnos directamente al WhatsApp.\n\n" +
                         "¿Deseas verificar la disponibilidad de alguna fragancia?"
            };
        }

        // 14. TIENDA FÍSICA / UBICACIÓN
        if (containsAny(text, ['tienda fisica', 'donde queda la tienda', 'donde estan', 'donde se encuentran', 'direccion de la tienda', 'tienen local', 'donde los visito'])) {
            return {
                type: 'text',
                content: "📍 **Ubicación y Cobertura de Perfumería Manizales:**\n\n" +
                         "Atendemos con asesoría personalizada y entregas directas en el Eje Cafetero:\n" +
                         "• **Domicilios express:** Manizales, Villamaría y Neira.\n" +
                         "• **Envíos nacionales:** Despachamos a toda Colombia de forma 100% segura.\n" +
                         "• **Línea directa:** WhatsApp **+57 314 7551411**.\n\n" +
                         "¿En qué ciudad te encuentras para coordinar tu entrega?"
            };
        }

        // 15. AGRADECIMIENTOS O CORTESÍA DE CIERRE
        if (containsAny(text, ['gracias', 'muchas gracias', 'mil gracias', 'muy amable', 'excelente gracias', 'vale gracias', 'listo gracias'])) {
            return {
                type: 'text',
                content: "¡Con el mayor de los gustos! ✨ Para mí es un honor asesorarte. Recuerda que si deseas apartar alguna fragancia o tienes dudas sobre duración o despachos, puedes pulsar **'Pedir'** o preguntarme lo que necesites."
            };
        }

        // 16. IDENTIDAD DE LA IA
        if (containsAny(text, ['quien eres', 'como te llamas', 'que eres', 'que haces'])) {
            return {
                type: 'text',
                content: "Soy **Aura**, la Sommelier de Perfumería e Inteligencia Artificial de **Perfumería Manizales**. ✦\n\n" +
                         "Mi misión es ayudarte a encontrar tu aroma firma ideal, desglosar notas olfativas de salida, corazón y fondo, aconsejarte según la ocasión o el clima, y guiarte en tu pedido."
            };
        }

        // 17. COMPARACIÓN CONTEXTUAL DE PERFUMES ANTERIORES
        if (state.lastRecommendedIds && state.lastRecommendedIds.length > 1 && containsAny(text, ['cual dura mas', 'cual de esos', 'cual me recomiendas', 'cual es mejor', 'cual es mas barato', 'cual proyecta mas', 'diferencia entre esos'])) {
            var comparedList = getCatalog().filter(function(p) { return state.lastRecommendedIds.indexOf(p.id) !== -1; });
            if (comparedList.length >= 2) {
                var p1 = comparedList[0];
                var p2 = comparedList[1];
                return {
                    type: 'recommendation',
                    content: "⚖️ **Comparativa Sommelier de los perfumes que vimos:**\n\n" +
                             "• **" + p1.nombre + "** (" + (p1.marca || '') + "): Destaca por su acorde *" + (p1.tipo_olor || '') + "*. Tiene una duración *" + (p1.duracion || 'excelente') + "* e intensidad *" + (p1.intensidad || 'alta') + "*. Ideal si buscas " + (p1.transmite || 'presencia y elegancia') + ".\n\n" +
                             "• **" + p2.nombre + "** (" + (p2.marca || '') + "): Es más *" + (p2.tipo_olor || '') + "*. Su fijación es *" + (p2.duracion || 'muy duradera') + "*. Ideal si prefieres " + (p2.transmite || 'versatilidad y distinción') + ".\n\n" +
                             "💡 **Veredicto Sommelier:** Si buscas máxima proyección y cumplidos, elije **" + p1.nombre + "**. Si buscas sofisticación y versatilidad diaria, **" + p2.nombre + "** es tu ganador.",
                    products: comparedList.slice(0, 2)
                };
            }
        }

        // 18. CONSULTA DE APLICACIÓN / CONSEJOS DE FIJACIÓN
        if (containsAny(text, ['como aplicar', 'donde aplicar', 'durar mas', 'fijacion', 'hacer que dure', 'puntos de pulso', 'aplicarse'])) {
            return {
                type: 'text',
                content: "✨ **Secretos de Sommelier para que tu perfume dure todo el día:**\n\n" +
                         "1. **Puntos de pulso clave:** Aplica a los lados del cuello, clavículas, detrás de las orejas y en el pliegue interno del codo. El calor natural de estas zonas proyecta el aroma en cada movimiento.\n" +
                         "2. **Hidratación previa:** Aplica siempre crema hidratante sin aroma antes del perfume. La piel hidratada sella las moléculas aromáticas.\n" +
                         "3. **¡Prohibido frotar!:** Frotar las muñecas rompe la estructura de las notas de salida y quema la frescura inicial.\n\n" +
                         "¿Te gustaría que te recomiende perfumes con **duración modo bestia (10 a 14+ horas)**?"
            };
        }

        // 19. CONSULTA DE DIFERENCIA EDP / EDT / PARFUM
        if (containsAny(text, ['edp', 'edt', 'eau de parfum', 'eau de toilette', 'concentracion', 'diferencia entre'])) {
            return {
                type: 'text',
                content: "🏛️ **Guía rápida de concentraciones en Perfumería:**\n\n" +
                         "• **Eau de Toilette (EDT):** 5%–15% de aceites. Fresco y radiante, dura entre 4 y 6 horas. Ideal para oficina y calor.\n" +
                         "• **Eau de Parfum (EDP):** 15%–20% de aceites. Gran estela y longevidad de 8 a 10 horas. Es el equilibrio perfecto.\n" +
                         "• **Parfum / Elixir / Extrait:** 20%–40% de concentración pura. Duración extrema (12+ horas), denso, opulento y con enorme fijación en piel.\n\n" +
                         "¿Prefieres una fragancia fresca y versátil o un Elixir potente para la noche?"
            };
        }

        // 20. CONSULTA DE ENVÍOS / UBICACIÓN / DOMICILIOS
        if (containsAny(text, ['envio', 'envios', 'domicilio', 'domicilios', 'neira', 'villamaria', 'manizales', 'cuanto tarda', 'cuanto demora', 'cuando llega', 'costo de envio'])) {
            return {
                type: 'text',
                content: "📍 **Cobertura y Domicilios Perfumería Manizales:**\n\n" +
                         "• **Domicilios locales express:** Entregas el mismo día en **Manizales, Villamaría y Neira**.\n" +
                         "• **Envíos nacionales:** Despachamos a **toda Colombia** de forma 100% segura con seguimiento directo por WhatsApp.\n" +
                         "• **Embalaje protector:** Todas las botellas van en caja protectora con amortiguación para garantizar que lleguen en perfecto estado.\n\n" +
                         "¿A qué ciudad deseas programar tu entrega?"
            };
        }

        // 21-A. QUERY DE PRODUCTOS MÁS CAROS / PREMIUM / EXCLUSIVOS
        // Detecta: "y los más caros?", "cuáles son los más caros", "los más exclusivos", etc.
        if (containsAny(text, [
            'los mas caros', 'las mas caras', 'el mas caro', 'la mas cara',
            'los mas exclusivos', 'los mas lujosos', 'los mas premium', 'los mas finos',
            'los mas costosos', 'los de mayor precio', 'los mejores del catalogo',
            'cuales son los caros', 'cuales son los mas caros', 'cuales son los premium',
            'los premium', 'los de lujo', 'los de alta gama',
            'los exclusivos', 'quiero ver los caros', 'muestrame los caros',
            'muestrame los mas caros', 'ver los mas caros', 'los top',
            'los mas caros que tienen', 'cuanto cuestan los mas caros'
        ])) {
            var genderForPremium = state.userPreferences.gender;
            var premiumCatalog = getCatalog().filter(function(p) { return p.precio; });
            if (genderForPremium) {
                premiumCatalog = premiumCatalog.filter(function(p) {
                    return (p.categoria || '').toLowerCase() === genderForPremium ||
                           (p.categoria || '').toLowerCase() === 'unisex';
                });
            }
            premiumCatalog.sort(function(a, b) { return (b.precio || 0) - (a.precio || 0); });
            var topPremium = premiumCatalog.slice(0, 3);
            if (topPremium.length > 0) {
                // IMPORTANTE: limpiar el budgetMax para que no contamine búsquedas siguientes
                state.userPreferences.budgetMax = null;
                state.lastRecommendedIds = topPremium.map(function(m) { return m.id; });
                state.currentFocusProduct = topPremium[0];
                return {
                    type: 'recommendation',
                    content: "\uD83D\uDC8E **Las fragancias más exclusivas y premium" + (genderForPremium ? (' para ' + genderForPremium) : '') + " de nuestro catálogo:**\n\n" +
                             "Son las joyas de la corona \u2014 alta concentración, proyección extrema y materias primas de la más alta calidad:\n",
                    products: topPremium
                };
            }
        }

        // 21-B. PREGUNTA DE PRECIO CONTEXTUAL sobre productos ya recomendados
        // IMPORTANTE: solo se activa si ya hay productos mostrados (lastRecommendedIds)

        var isPriceFollowUp = state.lastRecommendedIds && state.lastRecommendedIds.length > 0 && containsAny(text, [
            'son caros', 'es caro', 'es cara', 'son caras', 'muy caro', 'muy cara',
            'los mas baratos', 'las mas baratas', 'el mas barato', 'la mas barata',
            'son esos los baratos', 'son esos los economicos', 'son esos los mas economicos',
            'cuanto cuestan esos', 'cuanto valen esos', 'cuanto son esos', 'cuanto salen esos',
            'hay algo mas economico', 'hay algo mas barato', 'algo mas economico', 'algo mas barato',
            'mas barato que ese', 'mas barata que esa',
            'no es tan caro', 'no tan caro', 'no tan cara', 'tienen algo mas barato',
            'cierto que son baratos', 'son los mas baratos', 'son economicos esos',
            'precio de esos', 'precio de ese', 'precio de esa', 'cuanto es ese', 'cuanto es esa'
        ]);

        if (isPriceFollowUp && state.lastRecommendedIds && state.lastRecommendedIds.length > 0) {
            var shownProducts = getCatalog().filter(function(p) {
                return state.lastRecommendedIds.indexOf(p.id) !== -1 && p.precio;
            });

            if (shownProducts.length > 0) {
                // Ordenar por precio para encontrar el más barato mostrado
                shownProducts.sort(function(a, b) { return (a.precio || 0) - (b.precio || 0); });
                var cheapestShown = shownProducts[0];
                var priceFmt = function(p) { return p.precio ? ('$' + p.precio.toLocaleString('es-CO')) : 'consultar'; };

                // Buscar opciones más económicas del catálogo con el mismo género/preferencias
                var allCatalog = getCatalog().filter(function(p) { return p.precio; });
                allCatalog.sort(function(a, b) { return (a.precio || 0) - (b.precio || 0); });
                // Filtrar por género si se conoce
                var cheaperOpts = allCatalog.filter(function(p) {
                    if (state.userPreferences.gender) {
                        return (p.categoria || '').toLowerCase() === state.userPreferences.gender || (p.categoria || '').toLowerCase() === 'unisex';
                    }
                    return true;
                }).filter(function(p) {
                    return !cheapestShown.precio || p.precio < cheapestShown.precio;
                }).slice(0, 3);

                if (cheaperOpts.length > 0) {
                    // Hay opciones más baratas — mostrarlas
                    state.lastRecommendedIds = cheaperOpts.map(function(m) { return m.id; });
                    state.currentFocusProduct = cheaperOpts[0];
                    return {
                        type: 'recommendation',
                        content: "💰 **¡Claro que hay opciones más económicas!**\n\n" +
                                 "Los que te mostré antes tienen un precio desde **" + priceFmt(cheapestShown) + "**. " +
                                 "Aquí tienes alternativas de menor precio con excelente calidad y duración:\n",
                        products: cheaperOpts
                    };
                } else {
                    // Ya eran los más baratos disponibles
                    return {
                        type: 'recommendation',
                        content: "💎 **Sí, esos ya son las opciones más accesibles de nuestro catálogo** con esa calidad y duración. " +
                                 "El precio desde **" + priceFmt(cheapestShown) + "** incluye una fragancia completamente original, sellada y con altísima fijación en piel.\n\n" +
                                 "Si buscas algo con un tope de precio específico, dímelo y ajusto la búsqueda ✨",
                        products: shownProducts.slice(0, 3)
                    };
                }
            }
        }

        // Pregunta de precio general sin contexto previo
        if (isPriceFollowUp || (containsAny(text, DICTIONARY.precios) && containsAny(text, ['barato', 'economico', 'baratos', 'economicos', 'accesible', 'precio bajo']))) {
            var genderFilter = state.userPreferences.gender;
            var cheapCatalog = getCatalog().filter(function(p) { return p.precio; });
            if (genderFilter) {
                cheapCatalog = cheapCatalog.filter(function(p) {
                    return (p.categoria || '').toLowerCase() === genderFilter || (p.categoria || '').toLowerCase() === 'unisex';
                });
            }
            cheapCatalog.sort(function(a, b) { return (a.precio || 0) - (b.precio || 0); });
            var topCheap = cheapCatalog.slice(0, 3);
            if (topCheap.length > 0) {
                state.lastRecommendedIds = topCheap.map(function(m) { return m.id; });
                state.currentFocusProduct = topCheap[0];
                return {
                    type: 'recommendation',
                    content: "💰 **Las opciones más económicas" + (genderFilter ? (' para ' + genderFilter) : '') + " de nuestro catálogo:**\n\n" +
                             "Son fragancias 100% originales con excelente calidad y duración a precio accesible:\n",
                    products: topCheap
                };
            }
        }

        // 21b. CONSULTA DE OFERTAS / DESCUENTOS ACTIVOS (fallback, en caso de no haber sido
        // capturado por el paso 1-EARLY — esto puede ocurrir con frases muy genéricas de precio)
        if (containsAny(text, DICTIONARY.precios) && containsAny(text, ['descuento', 'descuentos', 'oferta', 'ofertas', 'promocion', 'promociones', 'rebaja', 'rebajas', 'evento'])) {
            var destacadosFallback = productosDestacadosDelEvento(3);
            var eventoFallback = (typeof EventosManager !== 'undefined' && EventosManager.getEventoActivo) ? EventosManager.getEventoActivo() : null;

            return {
                type: 'recommendation',
                content: eventoFallback
                    ? "💎 En **Perfumería Manizales** los precios son directos, sin intermediarios, y **no aplicamos descuentos**. Ahora mismo estamos en **" + eventoFallback.nombre + "**, así que te dejo las fragancias que mejor encajan con esa fecha:"
                    : "💎 En **Perfumería Manizales** mantenemos los mejores precios directos en perfumería árabe y de diseñador. Aquí tienes opciones destacadas con excelente relación calidad-precio:",
                products: destacadosFallback
            };
        }

        // 22. FALLBACK ULTRA-INTELIGENTE CONTEXTUAL (nunca pregunta lo que ya sabe)
        var knownGender = state.userPreferences.gender;
        var knownOccasion = state.userPreferences.occasion;
        var knownScent = state.userPreferences.scentType;

        if (knownGender && knownOccasion && !knownScent) {
            // Sabe género y ocasión, solo falta tipo de aroma
            return {
                type: 'text',
                content: "Para afinar la selección perfecta de perfume *" + knownOccasion + "* para " + (knownGender === 'hombre' ? 'él' : knownGender === 'mujer' ? 'ella' : 'ambos') + ":\n\n" +
                         "• ¿Prefieres aromas **dulces y avainillados**, **frescos y cítricos**, **amaderados y elegantes** o **orientales y especiados**?"
            };
        }

        if (knownGender && !knownOccasion) {
            var gTitle = knownGender === 'hombre' ? 'masculina' : knownGender === 'mujer' ? 'femenina' : 'unisex';
            return {
                type: 'text',
                content: "✨ Para seleccionarte la fragancia " + gTitle + " perfecta:\n\n" +
                         "• ¿Para qué ocasión la necesitas principalmente?\n" +
                         "  🌹 **Cita/Romance** · 💼 **Oficina/Diario** · 🔥 **Fiesta/Noche** · ☀️ **Clima cálido** · ❄️ **Clima frío** · 🎓 **Evento especial/Gala**\n\n" +
                         "• ¿Tienes presupuesto en mente o algún tipo de aroma preferido?"
            };
        }

        return {
            type: 'text',
            content: "Para asesorarte con total precisión y encontrar el perfume ideal para ti, cuéntame un poco más:\n\n" +
                     "• ¿Buscas una fragancia para **hombre, mujer o unisex**?\n" +
                     "• ¿Para qué ocasión la usarás (citas, oficina, fiesta, calor o diario)?\n" +
                     "• ¿Te inclinas más por aromas **dulces, amaderados, frescos cítricos o de larga duración**?\n\n" +
                     "Dime tus preferencias y te seleccionaré las mejores opciones de nuestro catálogo. ✨"
        };
    }

    // === AYUDAS DE BÚSQUEDA ESPECÍFICA ===
    function findProductByName(text) {
        var catalog = getCatalog();
        var norm = normalize(text);

        // Si el texto es una frase común o genérica, NUNCA debe coincidir con un perfume por error
        var genericPhrases = [
            'para hombre', 'para mujer', 'para dama', 'para caballero', 'de hombre', 'de mujer',
            'hombre', 'mujer', 'unisex', 'navidad', 'para navidad', 'como se compra', 'hola', 'buenas',
            'que tal', 'cuanto dura', 'que notas tiene', 'es de navidad', 'sirve para navidad',
            'ese perfume si es de navidad', 'ese perfume es de navidad', 'nuevo', 'nuevos'
        ];
        if (genericPhrases.indexOf(norm) !== -1) {
            return null;
        }

        // Búsqueda por coincidencia de nombre exacto o nombre completo como palabra delimitada
        for (var i = 0; i < catalog.length; i++) {
            var p = catalog[i];
            var pName = normalize(p.nombre || '');
            if (!pName || pName.length < 3) continue;

            // 1. Coincidencia exacta del nombre completo
            if (norm === pName) {
                return p;
            }

            // 2. Coincidencia como frase o palabra completa en el mensaje (ej: "que tal es 9pm elixir" o "hablame de asad")
            var pRegex = new RegExp('\\b' + pName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'i');
            if (pRegex.test(norm)) {
                return p;
            }
        }

        // 3. Respaldo por token y por typos: permite "¿cuánto el 9pm?" o
        //    "quiero el fajhar" cuando el texto no trae el nombre completo.
        var aprox = buscarProductoEnCatalogo(text);
        if (aprox && aprox.confianza >= 0.5) {
            return aprox.product;
        }
        return null;
    }

    function isFollowUpQuestion(text) {
        return containsAny(text, [
            'cuanto dura', 'que notas', 'como huele', 'para que clima', 'es dulce', 'es amaderado',
            'es fresco', 'para cuando', 'para que estacion', 'cuanto vale', 'dame mas detalles',
            'explicame mas', 'que tal es', 'vale la pena', 'proyecta bien', 'que proyecta'
        ]);
    }

    /* Los eventos ya NO tienen descuentos: solo cambian la tematica del sitio
       y muestran las fragancias que mejor encajan con esa fecha. Esta funcion
       se conserva para que el resto del codigo siga funcionando, pero siempre
       informa que no hay descuento activo. */
    function getActiveDiscountInfo() {
        var nombre = '';
        if (typeof EventosManager !== 'undefined' && EventosManager.getEventoActivo) {
            var ev = EventosManager.getEventoActivo();
            if (ev) nombre = ev.nombre;
        }
        return { hasDiscount: false, pct: 0, name: nombre, nextEvent: null };
    }

    /* Fragancias que destacan para el evento que esta activo. Si no hay
       evento, se recurren a los productos marcados como destacado. */
    function productosDestacadosDelEvento(cantidad) {
        var limite = cantidad || 3;
        var lista = [];
        if (typeof EventosManager !== 'undefined' && EventosManager.getEventoActivo && EventosManager.filtrarProductosPorEvento) {
            var ev = EventosManager.getEventoActivo();
            if (ev) {
                try { lista = EventosManager.filtrarProductosPorEvento(ev) || []; } catch (e) { lista = []; }
            }
        }
        if (!lista.length) {
            lista = getCatalog().filter(function (p) { return p.destacado; });
        }
        if (!lista.length) lista = getCatalog();
        return lista.slice(0, limite);
    }

    // === GENERADORES DE TEXTO EXPLICATIVO PERSUASIVO ===
    function generatePerfumeDeepDive(product, userQuery) {
        var finalPrice = product.precio;
        var priceStr = finalPrice ? '$' + finalPrice.toLocaleString('es-CO') : 'Consultar';
        var oldPriceStr = '';

        var text = "✨ **Análisis Sommelier de " + product.nombre + "** (" + (product.marca || 'Casa Perfumera') + ")\n\n" +
                   "• **Aura y Sensación:** " + (product.transmite || product.descripcion_corta || 'Una fragancia imponente y sofisticada.') + "\n" +
                   "• **Familia Olfativa:** " + (product.tipo_olor ? product.tipo_olor.toUpperCase() : 'Alta perfumería') + "\n" +
                   "• **Pirámide Olfativa:**\n" +
                   "   🔺 *Salida:* " + (product.notas_salida || 'Apertura vibrante') + "\n" +
                   "   ❤️ *Corazón:* " + (product.notas_corazon || 'Cuerpo cautivador') + "\n" +
                   "   🪵 *Fondo:* " + (product.notas_fondo || product.notas || 'Fijación duradera') + "\n" +
                   "• **Rendimiento:** Duración " + (product.duracion || 'Excelente (8-10h+)') + " con intensidad " + (product.intensidad || 'Moderada-Alta') + ".\n" +
                   "• **Ocasión Ideal:** " + (product.ideal_para || 'Versátil para destacar en cualquier momento.') + "\n\n" +
                   "💰 **Inversión:** **" + priceStr + "**" + oldPriceStr + ".\n\n" +
                   "¿Deseas que preparemos tu despacho por WhatsApp o te gustaría ver cómo se compara con otra fragancia?";

        return {
            type: 'single_product',
            content: text,
            products: [product]
        };
    }

    function generateRecommendationIntro(queryText, matchedList) {
        var gTitle = state.userPreferences.gender === 'hombre' ? ' (Hombre)' : state.userPreferences.gender === 'mujer' ? ' (Mujer)' : state.userPreferences.gender === 'unisex' ? ' (Unisex)' : '';

        if (state.userPreferences.occasion === 'oficina' || containsAny(queryText, DICTIONARY.oficina)) {
            return "💼 **Elegancia y Versatilidad Profesional" + gTitle + ":** He seleccionado fragancias con proyección limpia, distinguida y excelente duración para oficina, reuniones y uso diario:";
        }
        if (state.userPreferences.occasion === 'cita' || containsAny(queryText, DICTIONARY.cita)) {
            return "🌹 **Selección de Seducción y Romance" + gTitle + ":** He seleccionado fragancias con acordes magnéticos y sensuales que generan cumplidos inmediatos y dejan una huella imborrable:";
        }
        if (state.userPreferences.occasion === 'fiesta' || containsAny(queryText, DICTIONARY.fiesta)) {
            return "🔥 **Potencia y Proyección para la Noche" + gTitle + ":** Si buscas destacar en la noche y que tu estela se sienta al entrar a cualquier lugar, estas son las joyas indicadas:";
        }
        if (state.userPreferences.occasion === 'calor' || containsAny(queryText, DICTIONARY.calor)) {
            return "☀️ **Frescura y Vitalidad para Clima Cálido" + gTitle + ":** Fragancias cítricas, acuáticas y florales frescas que no empalagan y revitalizan con elegancia:";
        }
        if (state.userPreferences.occasion === 'navidad' || containsAny(queryText, DICTIONARY.navidad)) {
            return "🎄 **Selección Navideña y Noches Festivas" + gTitle + ":** Para las celebraciones de Navidad y fin de año, he seleccionado fragancias cálidas, envolventes y sofisticadas que dejan una estela inolvidable:";
        }
        if (state.userPreferences.potency === 'alta' || containsAny(queryText, DICTIONARY.potencia)) {
            return "🔥 **Selección Modo Bestia y Duración Extrema" + gTitle + ":** He seleccionado las fragancias con mayor fijación (10 a 14+ horas en piel), enorme proyección e intensidad imponente de nuestro catálogo:";
        }
        if (state.userPreferences.scentType === 'dulce' || containsAny(queryText, DICTIONARY.dulce)) {
            return "🍯 **Gourmand & Vainilla Exquisita" + gTitle + ":** Para los amantes de los aromas dulces, cálidos y reconfortantes, estas fragancias combinan vainilla, maderas y especias adictivas:";
        }
        if (state.userPreferences.scentType === 'amaderado' || containsAny(queryText, DICTIONARY.amaderado)) {
            return "🪵 **Carácter y Maderas Nobles" + gTitle + ":** Maderas finas de sándalo, cedro y oud para un porte imponente, maduro y de altísima distinción:";
        }
        if (state.userPreferences.gender === 'hombre') {
            return "👑 **Selección Exclusiva Masculina:** Estas son las fragancias para hombre con mejor rendimiento, calidad y relación calidad-precio de nuestro catálogo:";
        }
        if (state.userPreferences.gender === 'mujer') {
            return "🌸 **Selección Exclusiva Femenina:** Estas son las fragancias para mujer más elegantes, versátiles y con excelente duración de nuestro catálogo:";
        }
        if (state.userPreferences.gender === 'unisex') {
            return "✨ **Selección Exclusiva Unisex:** Fragancias versátiles y opulentas ideales para compartir y destacar en cualquier momento:";
        }

        return "✦ He analizado nuestro catálogo completo y estas son las fragancias que mejor encajan con tu estilo y preferencias:";
    }

    // === RENDERIZADO DE MENSAJES Y PRODUCTOS EN LA INTERFAZ ===
    function renderProductCard(p) {
        var finalPrice = p.precio;
        var priceFormatted = finalPrice ? '$' + finalPrice.toLocaleString('es-CO') : 'Consultar';


        var waMessage = encodeURIComponent("¡Hola Perfumería Manizales! El Sommelier AI me recomendó *" + p.nombre + "* (" + (p.marca || '') + ") y deseo más información para comprarlo.");
        var waUrl = "https://wa.me/573147551411?text=" + waMessage;

        var auraImg = (typeof window.imagenesProducto === 'function') ? window.imagenesProducto(p) : null;
        var auraThumb = auraImg
            ? '<img src="' + auraImg.original + '" srcset="' + auraImg.srcset + '" sizes="80px" alt="' + p.nombre + '" loading="lazy" decoding="async" onerror="this.style.display=\'none\'; this.nextElementSibling.style.display=\'flex\';">'
            : '<img src="' + p.imagen + '" alt="' + p.nombre + '" loading="lazy" decoding="async" onerror="this.style.display=\'none\'; this.nextElementSibling.style.display=\'flex\';">';

        return (
            '<div class="aura-product-card" data-product-id="' + p.id + '">' +
                '<div class="aura-card__thumb">' +
                    auraThumb +
                    '<div class="aura-card__fallback" style="display:none;">' + (p.emoji || '✦') + '</div>' +
                '</div>' +
                '<div class="aura-card__info">' +
                    '<span class="aura-card__brand">' + (p.marca || 'Perfumería Manizales') + '</span>' +
                    '<h4 class="aura-card__title">' + p.nombre + '</h4>' +
                    '<span class="aura-card__scent">' + (p.tipo_olor || 'Exclusivo') + '</span>' +
                    '<div class="aura-card__price-row">' +
                        '<span class="aura-card__price">' + priceFormatted + '</span>' +
                    '</div>' +
                    '<div class="aura-card__actions">' +
                        '<button class="aura-btn aura-btn--details" onclick="AuraIA.verDetalles(' + p.id + ')">' +
                            '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>' +
                            'Detalles' +
                        '</button>' +
                        '<a href="' + waUrl + '" target="_blank" rel="noopener" class="aura-btn aura-btn--buy">' +
                            '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>' +
                            'Pedir' +
                        '</a>' +
                    '</div>' +
                '</div>' +
            '</div>'
        );
    }

    // Escapa HTML antes de aplicar markdown. El texto llega a innerHTML sin
    // ninguna Conversion previa, asi que un "**...<img onerror=...>**" en un
    // nombre de producto ejecutaba script en el navegador del cliente.
    function escaparHtml(text) {
        if (!text) return '';
        return String(text)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function formatMarkdown(text) {
        if (!text) return '';
        var html = escaparHtml(text)
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
            .replace(/(^|[^*])\*([^*\n]+?)\*(?!\*)/g, '$1<em>$2</em>')
            .replace(/~([^~\n]+?)~/g, '<del>$1</del>')
            // Solo enlaces http/https, para que no se pueda inyectar javascript:
            .replace(/\[([^\]]+)\]\(((?:https?:\/\/)[^)\s]+)\)/g,
                     '<a href="$2" target="_blank" rel="noopener" class="aura-link">$1</a>')
            .replace(/\n\n/g, '<br><br>')
            .replace(/\n/g, '<br>');
        return html;
    }

    // === MANEJO DEL DOM Y EVENTOS DEL CHAT ===
    // === TECLADO EN MOVIL ===
    // En iOS el viewport de layout NO se encoge al abrir el teclado, asi que el
    // panel (88dvh) queda por encima del teclado y el usuario escribe en un campo
    // que no ve. visualViewport si informa del area realmente visible, y la
    // diferencia se publica como --kb-inset (lo consume .aura-window en CSS).
    function syncKeyboardInset() {
        var vv = window.visualViewport;
        if (!vv) return;
        var oculto = Math.max(0, window.innerHeight - vv.height - vv.offsetTop);
        // Umbral de 80px: en escritorio visualViewport puede diferir un poco de
        // innerHeight por el chrome del navegador, y sin este filtro el panel
        // ganaba un relleno inferior fantasma.
        if (oculto < 80) oculto = 0;
        document.documentElement.style.setProperty('--kb-inset', oculto + 'px');
        var win = document.getElementById('aura-chat-window');
        if (win && win.classList.contains('aura-window--open')) {
            setTimeout(scrollToBottom, 60);
        }
    }

    function initKeyboardInset() {
        var vv = window.visualViewport;
        if (!vv) return;
        vv.addEventListener('resize', syncKeyboardInset);
        vv.addEventListener('scroll', syncKeyboardInset);
    }

    function initUI() {
        if (document.getElementById('aura-chat-launcher')) return;
        initKeyboardInset();

        // 1. Inyectar botón lanzador y contenedor de chat
        var container = document.createElement('div');
        container.id = 'aura-ai-root';
        container.innerHTML = (
            '<!-- Botón Flotante Aura AI -->' +
            '<button id="aura-chat-launcher" class="aura-launcher" aria-label="Abrir Sommelier AI de Fragancias" onclick="AuraIA.toggle()">' +
                '<div class="aura-launcher__glow"></div>' +
                '<div class="aura-launcher__icon">' +
                    '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">' +
                        '<path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"></path>' +
                    '</svg>' +
                '</div>' +
                '<span class="aura-launcher__badge" id="aura-badge" style="display:none;">1</span>' +
                '<div class="aura-launcher__tooltip">¿Buscas tu perfume ideal? Pregúntale a <strong>Aura AI</strong> ✨</div>' +
            '</button>' +

            '<!-- Ventana de Chat Aura AI -->' +
            '<div id="aura-chat-window" class="aura-window" aria-hidden="true">' +
                '<div class="aura-header">' +
                    '<div class="aura-header__avatar">' +
                        '<div class="aura-avatar-glow"></div>' +
                        '<span>✦</span>' +
                    '</div>' +
                    '<div class="aura-header__info">' +
                        '<div class="aura-header__title-row">' +
                            '<h3>Aura AI</h3>' +
                            '<span class="aura-header__tag">Sommelier</span>' +
                        '</div>' +
                        '<p class="aura-header__status"><span class="aura-status-dot"></span> Experto en Fragancias En Línea</p>' +
                    '</div>' +
                    '<div class="aura-header__actions">' +
                        '<button class="aura-header__btn" title="Limpiar chat" onclick="AuraIA.limpiarChat()">' +
                            '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>' +
                        '</button>' +
                        '<button class="aura-header__btn" title="Cerrar chat" onclick="AuraIA.toggle()">' +
                            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>' +
                        '</button>' +
                    '</div>' +
                '</div>' +

                '<div class="aura-body" id="aura-messages-container">' +
                    '<!-- Los mensajes se renderizan dinámicamente -->' +
                '</div>' +

                '<!-- Chips de sugerencias rápidas -->' +
                '<div class="aura-quick-chips" id="aura-quick-chips">' +
                    '<button class="aura-chip" onclick="AuraIA.enviarMensajeRapido(\'Busco un perfume seductor para una cita romántica\')">🌹 Cita romántica</button>' +
                    '<button class="aura-chip" onclick="AuraIA.enviarMensajeRapido(\'Recomiéndame un perfume elegante para oficina y trabajo\')">💼 Para oficina</button>' +
                    '<button class="aura-chip" onclick="AuraIA.enviarMensajeRapido(\'Quiero un perfume potente con vainilla o madera que dure mucho\')">🔥 Seductor y duradero</button>' +
                    '<button class="aura-chip" onclick="AuraIA.enviarMensajeRapido(\'Busco una fragancia fresca para clima cálido\')">☀️ Fresco para calor</button>' +
                    '<button class="aura-chip" onclick="AuraIA.enviarMensajeRapido(\'Busco un perfume para regalar\')">🎁 Para regalar</button>' +
                '</div>' +

                '<form class="aura-footer" id="aura-input-form" onsubmit="AuraIA.handleSubmit(event)">' +
                    '<input type="text" id="aura-chat-input" placeholder="Escribe lo que buscas o pregúntale a Aura..." autocomplete="off">' +
                    '<button type="submit" id="aura-send-btn" aria-label="Enviar mensaje">' +
                        '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
                            '<line x1="22" y1="2" x2="11" y2="13"></line>' +
                            '<polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>' +
                        '</svg>' +
                    '</button>' +
                '</form>' +
            '</div>'
        );
        document.body.appendChild(container);

        // Mensaje de bienvenida inicial si no hay historial
        loadHistory();
        if (state.history.length === 0) {
            pushMessage('aura', {
                type: 'text',
                content: "¡Hola! Soy **Aura**, tu Sommelier de Perfumería con Inteligencia Artificial. ✨\n\n" +
                         "Estoy aquí para ayudarte a elegir tu fragancia ideal, explicarte notas y acordes, o gestionar tu pedido.\n\n" +
                         "¿Qué tipo de perfume buscas hoy o para qué ocasión lo necesitas?"
            }, false);
        }
    }

    function toggle(updateHistory) {
        if (updateHistory === undefined) updateHistory = true;
        state.isOpen = !state.isOpen;
        var win = document.getElementById('aura-chat-window');
        var launcher = document.getElementById('aura-chat-launcher');
        var badge = document.getElementById('aura-badge');
        var headerEl = document.getElementById('header');

        if (win && launcher) {
            if (state.isOpen) {
                // Pausar animaciones canvas pesadas de fondo para garantizar 60 FPS en móvil
                if (typeof Animaciones !== 'undefined' && Animaciones.estaActivo()) {
                    Animaciones.pausar();
                }
                win.classList.add('aura-window--open');
                win.setAttribute('aria-hidden', 'false');
                launcher.classList.add('aura-launcher--active');
                document.body.classList.add('aura-chat-active');
                if (window.innerWidth <= 600) {
                    if (window.ManizalesScrollLock) window.ManizalesScrollLock.lock();
                    else document.body.style.overflow = 'hidden';
                }
                if (headerEl) headerEl.classList.add('header--hidden');
                state.unreadCount = 0;
                if (badge) badge.style.display = 'none';

                if (updateHistory) {
                    try {
                        history.pushState({ type: 'aura' }, '', '#chat-ia');
                    } catch(e) {}
                }

                setTimeout(function() {
                    var input = document.getElementById('aura-chat-input');
                    if (input && window.innerWidth > 600) input.focus();
                    scrollToBottom();
                }, 100);
            } else {
                // Reanudar animaciones canvas si estaban activas
                if (typeof Animaciones !== 'undefined') {
                    Animaciones.reanudar();
                }
                win.classList.remove('aura-window--open');
                win.setAttribute('aria-hidden', 'true');
                launcher.classList.remove('aura-launcher--active');
                document.body.classList.remove('aura-chat-active');
                if (window.innerWidth <= 600) {
                    if (window.ManizalesScrollLock) window.ManizalesScrollLock.unlock();
                    else document.body.style.overflow = '';
                }
                // Sin este condicional el header podia quedar oculto para siempre
                // tras cerrar el chat: se ocultaba al abrir y solo se restauraba
                // si la pagina estaba cerca del tope, y el scroll de main.js exige
                // ademas un delta hacia arriba para mostrarlo.
                if (headerEl) {
                    headerEl.classList.remove('header--hidden');
                }

                if (updateHistory && window.location.hash === '#chat-ia') {
                    try {
                        history.back();
                    } catch(e) {}
                }
            }
        }
    }

    function pushMessage(sender, data, save) {
        if (save === undefined) save = true;
        var container = document.getElementById('aura-messages-container');
        if (!container) return;

        var msgEl = document.createElement('div');
        msgEl.className = 'aura-message aura-message--' + sender;

        var bubbleContent = '';
        if (sender === 'aura') {
            bubbleContent += '<div class="aura-msg-avatar">✦</div>';
        }

        bubbleContent += '<div class="aura-msg-bubble">';
        if (data.content) {
            bubbleContent += '<div class="aura-msg-text">' + formatMarkdown(data.content) + '</div>';
        }

        if (data.products && data.products.length) {
            bubbleContent += '<div class="aura-cards-grid">';
            data.products.forEach(function(p) {
                bubbleContent += renderProductCard(p);
            });
            bubbleContent += '</div>';
        }
        bubbleContent += '</div>';

        msgEl.innerHTML = bubbleContent;
        container.appendChild(msgEl);
        scrollToBottom();

        if (save) {
            state.history.push({ sender: sender, data: data });
            saveHistory();
        }

        if (!state.isOpen && sender === 'aura') {
            state.unreadCount++;
            var badge = document.getElementById('aura-badge');
            if (badge) {
                badge.innerText = state.unreadCount;
                badge.style.display = 'flex';
            }
        }
    }

    function showTypingIndicator() {
        var container = document.getElementById('aura-messages-container');
        if (!container || document.getElementById('aura-typing-indicator')) return;

        var typing = document.createElement('div');
        typing.id = 'aura-typing-indicator';
        typing.className = 'aura-message aura-message--aura aura-typing';
        typing.innerHTML = (
            '<div class="aura-msg-avatar">✦</div>' +
            '<div class="aura-msg-bubble aura-typing-bubble">' +
                '<span></span><span></span><span></span>' +
            '</div>'
        );
        container.appendChild(typing);
        scrollToBottom();
    }

    function hideTypingIndicator() {
        var el = document.getElementById('aura-typing-indicator');
        if (el) el.remove();
    }

    function scrollToBottom() {
        requestAnimationFrame(function() {
            var container = document.getElementById('aura-messages-container');
            if (container) {
                container.scrollTop = container.scrollHeight;
            }
        });
    }

    function handleSubmit(e) {
        if (e) e.preventDefault();
        var input = document.getElementById('aura-chat-input');
        if (!input) return;
        var text = input.value.trim();
        if (!text) return;

        input.value = '';
        pushMessage('user', { content: text });

        // Simular pensamiento y respuesta de IA (400ms a 750ms para naturalidad)
        showTypingIndicator();
        var responseDelay = Math.min(850, Math.max(450, text.length * 15));

        setTimeout(function() {
            // processUserMessage() es una función larga con decenas de ramas y
            // cualquier excepción escapaba del setTimeout: el indicador de
            // escritura se quedaba pegado para siempre y el chat no respondía más.
            var reply;
            try {
                reply = processUserMessage(text);
            } catch (err) {
                console.error('[AuraIA] error procesando el mensaje:', err);
                hideTypingIndicator();
                pushMessage('aura', {
                    type: 'text',
                    content: "😅 Disculpa, tuve un problema procesando tu pregunta. ¿Podrías reformularla o escribirme por WhatsApp al **+57 314 7551411**? Te atendemos de inmediato."
                });
                return;
            }

            hideTypingIndicator();
            if (reply) {
                pushMessage('aura', reply);
            } else {
                pushMessage('aura', {
                    type: 'text',
                    content: "¿Podrías darme un poco más de contexto? Por ejemplo: **¿para hombre, mujer o unisex?**, **¿para qué ocasión** (oficina, cita, fiesta, día a día) y **qué tipo de aroma** prefieres (fresco, dulce, amaderado, oriental)."
                });
            }
        }, responseDelay);
    }

    function enviarMensajeRapido(text) {
        var input = document.getElementById('aura-chat-input');
        if (input) input.value = text;
        handleSubmit();
    }

    function verDetalles(productId) {
        if (state.isOpen) {
            toggle();
        }
        setTimeout(function() {
            if (typeof openProductModal === 'function') {
                openProductModal(productId);
            }
        }, 180);
    }

    function limpiarChat() {
        state.history = [];
        state.currentFocusProduct = null;
        state.lastRecommendedIds = [];
        state.userPreferences = {
            gender: null,
            occasion: null,
            scentType: null,
            potency: null,
            budgetMax: null,
            excludedFamilies: []
        };
        try {
            localStorage.removeItem(STORAGE_KEY);
        } catch (e) {}
        var container = document.getElementById('aura-messages-container');
        if (container) container.innerHTML = '';
        pushMessage('aura', {
            type: 'text',
            content: "¡Chat renovado! ¿En qué fragancia o consulta puedo asesorarte ahora?"
        }, false);
    }

    function saveHistory() {
        try {
            var payload = {
                history: state.history.slice(-30),
                userPreferences: state.userPreferences,
                currentFocusProductId: state.currentFocusProduct ? state.currentFocusProduct.id : null,
                lastRecommendedIds: state.lastRecommendedIds,
                ultimaConsulta: state.ultimaConsulta,
                savedAt: Date.now()
            };
            // localStorage para persistir entre sesiones (no solo en la pestaña)
            localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
        } catch (e) {}
    }

    function loadHistory() {
        try {
            var raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return;
            var data = JSON.parse(raw);
            if (!data) return;

            // Caducar preferencias después de 7 días (604800000ms)
            var isExpired = data.savedAt && (Date.now() - data.savedAt > 604800000);

            if (data.userPreferences && !isExpired) {
                state.userPreferences = data.userPreferences;
                state.userPreferences.excludedFamilies = state.userPreferences.excludedFamilies || [];
                state.userPreferences.potency = state.userPreferences.potency || null;
            }
            if (data.lastRecommendedIds) state.lastRecommendedIds = data.lastRecommendedIds;
            if (data.ultimaConsulta) state.ultimaConsulta = data.ultimaConsulta;
            if (data.currentFocusProductId) {
                var _cat = getCatalog();
                var _found = null;
                for (var _i = 0; _i < _cat.length; _i++) {
                    if (_cat[_i].id === data.currentFocusProductId) { _found = _cat[_i]; break; }
                }
                state.currentFocusProduct = _found;
            }

            // Solo restaurar el historial de mensajes de la misma sesión (no de hace días)
            var sessionRaw = sessionStorage.getItem(STORAGE_KEY + '_session');
            if (sessionRaw) {
                var sessionData = JSON.parse(sessionRaw);
                if (sessionData && Array.isArray(sessionData.history)) {
                    state.history = sessionData.history;
                    sessionData.history.forEach(function(item) {
                        pushMessage(item.sender, item.data, false);
                    });
                    return;
                }
            }

            // Si hay preferencias guardadas pero no historial de sesión, saludo personalizado
            if (state.userPreferences.gender && !isExpired) {
                var genderLabel = state.userPreferences.gender === 'hombre' ? 'masculinas' :
                                  state.userPreferences.gender === 'mujer' ? 'femeninas' : 'unisex';
                pushMessage('aura', {
                    type: 'text',
                    content: "¡Bienvenido de nuevo! ✨ Recuerdo que la última vez explorabas fragancias **" + genderLabel + "**" +
                             (state.userPreferences.occasion ? " para **" + state.userPreferences.occasion + "**" : '') +
                             ". ¿Seguimos desde ahí o tienes una nueva búsqueda hoy?"
                }, false);
            }
        } catch (e) {}
    }

    // Guardar historial de mensajes también en sessionStorage (solo persiste mientras la pestaña está abierta)
    var _origSaveHistory = saveHistory;
    saveHistory = function() {
        _origSaveHistory();
        try {
            var sessionPayload = { history: state.history.slice(-30) };
            sessionStorage.setItem(STORAGE_KEY + '_session', JSON.stringify(sessionPayload));
        } catch (e) {}
    };

    // Inicialización automática
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initUI);
    } else {
        initUI();
    }

    return {
        init: initUI,
        toggle: toggle,
        handleSubmit: handleSubmit,
        enviarMensajeRapido: enviarMensajeRapido,
        verDetalles: verDetalles,
        limpiarChat: limpiarChat,
        // Expuestos para pruebas automatizadas y depuracion en consola
        _internals: {
            normalize: normalize,
            enmascararNegaciones: enmascararNegaciones,
            familiasExcluidasDe: familiasExcluidasDe,
            esConsultaDePerfumeria: esConsultaDePerfumeria,
            buscarProductoEnCatalogo: buscarProductoEnCatalogo,
            construirIndiceCatalogo: construirIndiceCatalogo,
            invalidarIndiceCatalogo: invalidarIndiceCatalogo,
            distanciaCercana: distanciaCercana,
            rangoPrecios: rangoPrecios,
            variarResultados: variarResultados,
            searchPerfumes: searchPerfumes,
            extractBudget: extractBudget,
            formatMarkdown: formatMarkdown,
            state: state,
            // Motor de diálogo
            extraerSlots: extraerSlots,
            puntuarIntenciones: puntuarIntenciones,
            elegirIntencion: elegirIntencion,
            responderRecomendacion: responderRecomendacion,
            responderRefinamiento: responderRefinamiento,
            responderConsultaProducto: responderConsultaProducto,
            explicarCriterios: explicarCriterios,
            componerConsulta: componerConsulta,
            detectarNotas: detectarNotas,
            processUserMessage: processUserMessage
        }
    };
})();
