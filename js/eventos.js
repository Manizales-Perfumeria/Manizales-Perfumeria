/* Helper para fallback de imagen en tarjetas de evento */
function _eventoImgError(img) {
    img.style.display = 'none';
    var fb = img.nextElementSibling;
    if (fb && fb.classList.contains('product-card__fallback')) fb.style.display = 'flex';
}

/* ========================================
   EVENTOS ESTACIONALES - MANIZALES PERFUMERIA
   Decoraciones premium: canvas + SVG hero
   ======================================== */
var EventosManager = (function() {

    /* Calcula el Domingo de Resurreccion para un anio dado (algoritmo de
       Gauss/Meeus, calendario gregoriano). Devuelve {mes, dia} con mes
       0-indexado (0=enero), igual que el resto del sistema de eventos. */
    function calcularDomingoPascua(anio) {
        var a = anio % 19;
        var b = Math.floor(anio / 100);
        var c = anio % 100;
        var d = Math.floor(b / 4);
        var e = b % 4;
        var f = Math.floor((b + 8) / 25);
        var g = Math.floor((b - f + 1) / 3);
        var h = (19 * a + b - d - g + 15) % 30;
        var i = Math.floor(c / 4);
        var k = c % 4;
        var l = (32 + 2 * e + 2 * i - h - k) % 7;
        var m = Math.floor((a + 11 * h + 22 * l) / 451);
        var mesUno = Math.floor((h + l - 7 * m + 114) / 31); // 1-indexado (3=marzo, 4=abril)
        var dia = ((h + l - 7 * m + 114) % 31) + 1;
        return { mes: mesUno - 1, dia: dia };
    }

    /* Suma (o resta) dias a una fecha {mes,dia} de un anio dado, dejando
       que el objeto Date nativo resuelva el acarreo de mes correctamente. */
    function sumarDias(fecha, anio, dias) {
        var d = new Date(anio, fecha.mes, fecha.dia + dias);
        return { mes: d.getMonth(), dia: d.getDate() };
    }

    /* Día del Amor y la Amistad en Colombia: se celebra el tercer sábado de septiembre */
    function calcularAmorYamistad(anio) {
        var primerDia = new Date(anio, 8, 1).getDay(); // 0 = domingo, 6 = sábado
        var primerSabado = 1 + ((6 - primerDia + 7) % 7);
        var tercerSabado = primerSabado + 14;
        // Temporada activa en perfumería: desde 8 días antes (2do viernes) hasta el domingo después
        var inicio = sumarDias({ mes: 8, dia: tercerSabado }, anio, -8);
        var fin = sumarDias({ mes: 8, dia: tercerSabado }, anio, 1);
        return { inicio: inicio, fin: fin };
    }

    /* Día de la Madre en Colombia: segundo domingo de mayo */
    function calcularDiaMadre(anio) {
        var primerDia = new Date(anio, 4, 1).getDay();
        var primerDomingo = 1 + ((7 - primerDia) % 7);
        var segundoDomingo = primerDomingo + 7;
        var inicio = { mes: 4, dia: 1 };
        var fin = sumarDias({ mes: 4, dia: segundoDomingo }, anio, 1);
        return { inicio: inicio, fin: fin };
    }

    /* Día del Padre en Colombia: tercer domingo de junio */
    function calcularDiaPadre(anio) {
        var primerDia = new Date(anio, 5, 1).getDay();
        var primerDomingo = 1 + ((7 - primerDia) % 7);
        var tercerDomingo = primerDomingo + 14;
        var inicio = sumarDias({ mes: 5, dia: tercerDomingo }, anio, -10);
        var fin = sumarDias({ mes: 5, dia: tercerDomingo }, anio, 1);
        return { inicio: inicio, fin: fin };
    }

    /* Black Friday: cuarto viernes de noviembre */
    function calcularBlackFriday(anio) {
        var primerDia = new Date(anio, 10, 1).getDay();
        var primerViernes = 1 + ((5 - primerDia + 7) % 7);
        var cuartoViernes = primerViernes + 21;
        var inicio = sumarDias({ mes: 10, dia: cuartoViernes }, anio, -2); // Miércoles
        var fin = sumarDias({ mes: 10, dia: cuartoViernes }, anio, 3);    // Cyber Monday
        return { inicio: inicio, fin: fin };
    }

    /* Semana Santa / Pascua */
    function calcularSemanaSanta(anio) {
        var pascua = calcularDomingoPascua(anio);
        return {
            inicio: sumarDias(pascua, anio, -7), // Domingo de Ramos
            fin: sumarDias(pascua, anio, 1)      // Lunes de Pascua
        };
    }

    var EVENTOS = [
        { id:'halloween', nombre:'Halloween', emoji:'🎃', descuento: 10, fechaInicio:{mes:9,dia:18}, fechaFin:{mes:10,dia:2}, colores:{navBg:'rgba(30,10,30,0.95)',navBorder:'rgba(180,80,180,0.2)',heroGradient:'linear-gradient(135deg,#1a0a2e,#2d1b4e,#1a0a2e)',accent:'#c084fc',btnColor:'#c084fc',sectionTitle:'#7c3aed'}, aromas:['oriental','oud','especiado'], tituloSeccion:'Especial Halloween', descripcionSeccion:'Fragancias misteriosas y oscuras con 10% de descuento especial' },
        { id:'navidad', nombre:'Navidad / Año Nuevo', emoji:'🎄', descuento: 15, fechaInicio:{mes:11,dia:1}, fechaFin:{mes:0,dia:6}, colores:{navBg:'rgba(20,10,10,0.95)',navBorder:'rgba(201,169,110,0.3)',heroGradient:'linear-gradient(135deg,#1a1a2e,#2d1b1b,#1a1a2e)',accent:'#c9a96e',btnColor:'#c9a96e',sectionTitle:'#b8860b'}, aromas:['oriental','dulce','amaderado','gourmand'], tituloSeccion:'Especial de Navidad', descripcionSeccion:'Fragancias cálidas y envolventes con 15% de descuento navideño' },
        { id:'sanvalentin', nombre:'San Valentín', emoji:'💕', descuento: 15, fechaInicio:{mes:1,dia:7}, fechaFin:{mes:1,dia:16}, colores:{navBg:'rgba(40,10,20,0.95)',navBorder:'rgba(236,72,153,0.2)',heroGradient:'linear-gradient(135deg,#2d1520,#4a1942,#2d1520)',accent:'#ec4899',btnColor:'#ec4899',sectionTitle:'#db2777'}, aromas:['floral','dulce'], tituloSeccion:'Especial San Valentín', descripcionSeccion:'Fragancias románticas con 15% de descuento para celebrar el amor' },
        { id:'amorYamistad', nombre:'Amor y Amistad', emoji:'💛', descuento: 15, calcularFechas: calcularAmorYamistad, colores:{navBg:'rgba(35,10,30,0.95)',navBorder:'rgba(251,191,36,0.25)',heroGradient:'linear-gradient(135deg,#2a1040,#3d1535,#2a1040)',accent:'#fbbf24',btnColor:'#fbbf24',sectionTitle:'#d97706'}, aromas:['floral','dulce','frutal'], tituloSeccion:'Día del Amor y la Amistad', descripcionSeccion:'Fragancias ideales para regalar con 15% de descuento especial' },
        { id:'diamadre', nombre:'Día de la Madre', emoji:'🌸', descuento: 15, calcularFechas: calcularDiaMadre, colores:{navBg:'rgba(40,20,25,0.95)',navBorder:'rgba(255,183,197,0.2)',heroGradient:'linear-gradient(135deg,#2d1520,#3d1a2a,#2d1520)',accent:'#FFB7C5',btnColor:'#FFB7C5',sectionTitle:'#d4627a'}, aromas:['floral','elegante'], tituloSeccion:'Especial Día de la Madre', descripcionSeccion:'Fragancias delicadas y elegantes con 15% de descuento para mamá' },
        { id:'blackfriday', nombre:'Black Friday', emoji:'🛍️', descuento: 30, calcularFechas: calcularBlackFriday, colores:{navBg:'rgba(15,15,15,0.96)',navBorder:'rgba(234,179,8,0.35)',heroGradient:'linear-gradient(135deg,#09090b,#18181b,#09090b)',accent:'#eab308',btnColor:'#eab308',sectionTitle:'#ca8a04'}, aromas:['oriental','gourmand','amaderado','dulce'], tituloSeccion:'Ofertas Black Friday', descripcionSeccion:'¡Gran descuento del 30% en todas nuestras fragancias por Black Friday!' },
        { id:'diapadre', nombre:'Día del Padre', emoji:'🌾', descuento: 15, calcularFechas: calcularDiaPadre, colores:{navBg:'rgba(30,25,10,0.95)',navBorder:'rgba(255,215,0,0.2)',heroGradient:'linear-gradient(135deg,#1a1a10,#2d2a15,#1a1a10)',accent:'#FFD700',btnColor:'#FFD700',sectionTitle:'#b8960a'}, aromas:['amaderado','fresco','aromatica'], tituloSeccion:'Especial Día del Padre', descripcionSeccion:'Fragancias con carácter con 15% de descuento para papá' },
        { id:'pascua', nombre:'Semana Santa / Pascua', emoji:'🕊️', descuento: 10, calcularFechas: calcularSemanaSanta, colores:{navBg:'rgba(35,25,40,0.95)',navBorder:'rgba(201,169,214,0.25)',heroGradient:'linear-gradient(135deg,#2a1f30,#3d2a42,#2a1f30)',accent:'#c9a9d9',btnColor:'#c9a9d9',sectionTitle:'#8a6a9e'}, aromas:['floral','fresco','amaderado'], tituloSeccion:'Especial Semana Santa', descripcionSeccion:'Fragancias sutiles y elegantes con 10% de descuento de Pascua' }
    ];

    var CANVAS_MAP = {
        halloween:    { canvas: 'bats',     opciones: { cantidad: 3 } },
        navidad:      { canvas: 'snow',     opciones: { cantidad: 12 } },
        sanvalentin:  { canvas: 'hearts',   opciones: { cantidad: 6, color: '#ec4899' } },
        amorYamistad: { canvas: 'hearts',   opciones: { cantidad: 6, color: '#fbbf24' } },
        diamadre:     { canvas: 'petals',   opciones: { cantidad: 7, color: '#FFB7C5' } },
        blackfriday:  { canvas: 'sparkles', opciones: { cantidad: 8, color: '#eab308' } },
        diapadre:     { canvas: 'sparkles', opciones: { cantidad: 6, color: '#C9A96E' } },
        pascua:       { canvas: 'petals',   opciones: { cantidad: 6, color: '#c9a9d9' } }
    };

    var HERO_CLASSES = ['hero--halloween','hero--navidad','hero--sanvalentin','hero--amorYamistad','hero--diamadre','hero--blackfriday','hero--diapadre','hero--pascua'];
    var eventoActivo = null;
    var temporizador = null;

    function prefersReducedMotion() {
        if (typeof Animaciones !== 'undefined' && Animaciones.prefersReducedMotion) {
            return Animaciones.prefersReducedMotion();
        }
        return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    function isDebugMode() {
        try {
            var searchParams = new URLSearchParams(window.location.search);
            return searchParams.get('modoprueba') === '1' || searchParams.get('test') === '1' || window.MODO_PRUEBA === true;
        } catch (e) {
            return false;
        }
    }

    function toggleModoPrueba() {
        var panel = document.getElementById('test-panel');
        if (!panel) return false;
        var isVisible = panel.style.display === 'block';
        if (isVisible) {
            panel.style.display = 'none';
        } else {
            crearPanelPrueba();
        }
        return !isVisible;
    }

    function detectarEvento() {
        var ahora = new Date();
        var mes = ahora.getMonth(), dia = ahora.getDate(), anio = ahora.getFullYear();
        for (var i = 0; i < EVENTOS.length; i++) {
            var ev = EVENTOS[i];
            var rango = ev.calcularFechas ? ev.calcularFechas(anio) : { inicio: ev.fechaInicio, fin: ev.fechaFin };
            if (estaEnRango(mes, dia, rango.inicio, rango.fin)) return ev;
        }
        return null;
    }

    function estaEnRango(mes, dia, inicio, fin) {
        // FIX: cuando el evento empieza y termina en el mismo mes (ej. San
        // Valentin: Feb 1-15, Dia de la Madre: May 1-15, Dia del Padre:
        // Jun 1-21), la logica anterior evaluaba "dia >= inicio.dia" OR
        // "dia <= fin.dia" por separado, y como ambas condiciones juntas
        // cubren TODO el mes (por ejemplo dia>=1 ya es siempre cierto),
        // el evento terminaba activo el mes entero en vez de solo esos
        // dias. Esto tambien "tapaba" cualquier evento nuevo que quisiera
        // usar el resto del mismo mes (como Dia de la Afrocolombianidad,
        // 16-28 de mayo, que quedaba oculto detras de Dia de la Madre).
        if (inicio.mes === fin.mes) {
            return mes === inicio.mes && dia >= inicio.dia && dia <= fin.dia;
        }
        if (inicio.mes < fin.mes) {
            if (mes === inicio.mes) return dia >= inicio.dia;
            if (mes === fin.mes) return dia <= fin.dia;
            return mes > inicio.mes && mes < fin.mes;
        }
        // inicio.mes > fin.mes: el rango cruza el fin de anio (ej. Navidad: Dic -> Ene)
        if (mes === inicio.mes) return dia >= inicio.dia;
        if (mes === fin.mes) return dia <= fin.dia;
        return mes > inicio.mes || mes < fin.mes;
    }

    function poblarHeroDecos(eventId) {
        var container = document.querySelector('.hero__decos');
        if (!container || typeof DecoracionesSVG === 'undefined') return;
        container.innerHTML = DecoracionesSVG.getHeroDeco(eventId);
    }

    function poblarHeroScene(eventId) {
        var container = document.querySelector('.hero__scene');
        if (!container || typeof DecoracionesSVG === 'undefined') return;
        container.innerHTML = DecoracionesSVG.getHeroScene ? DecoracionesSVG.getHeroScene(eventId) : '';
    }

    var guirnaldaTimers = [];

    function montarGuirnaldaHeader() {
        var header = document.getElementById('header');
        if (!header || typeof DecoracionesSVG === 'undefined') return;
        var existing = header.querySelector('.christmas-lights-premium');
        if (existing) existing.remove();
        header.insertAdjacentHTML('afterbegin', DecoracionesSVG.getGuirnaldaHeader());
        setTimeout(iniciarParpadeoLuces, 50);
    }

    function hexToRgb(hex) {
        var r = parseInt(hex.slice(1, 3), 16);
        var g = parseInt(hex.slice(3, 5), 16);
        var b = parseInt(hex.slice(5, 7), 16);
        return { r: r, g: g, b: b };
    }

    var BULB_COLORS = ['#e6483a', '#39c977', '#c9a96e', '#4fb3ff', '#ffffff', '#e6483a', '#39c977', '#c9a96e', '#4fb3ff', '#ffffff', '#e6483a', '#39c977'];

    function iniciarParpadeoLuces() {
        quitarParpadeoLuces();
        var glassEls = document.querySelectorAll('.christmas-lights-premium .bulb-glass');
        var haloEls = document.querySelectorAll('.christmas-lights-premium .bulb-halo');
        if (!glassEls.length) return;

        for (var i = 0; i < glassEls.length; i++) {
            var color = BULB_COLORS[i % BULB_COLORS.length];
            glassEls[i].setAttribute('fill', color);
            glassEls[i].setAttribute('opacity', '0.95');
            if (haloEls[i]) haloEls[i].setAttribute('opacity', '0.85');
        }
    }

    function quitarParpadeoLuces() {
        guirnaldaTimers.forEach(function(t) { clearTimeout(t); });
        guirnaldaTimers = [];
    }

    var arbolTimers = [];

    function iniciarParpadeoArbol() {
        quitarParpadeoArbol();
    }

    function quitarParpadeoArbol() {
        arbolTimers.forEach(function(t) { clearTimeout(t); });
        arbolTimers = [];
    }

    function quitarGuirnaldaHeader() {
        quitarParpadeoLuces();
        var el = document.querySelector('.christmas-lights-premium');
        if (el) el.remove();
    }

    function aplicarDecoracionesPremium(evento) {
        poblarHeroScene(evento.id);
        poblarHeroDecos(evento.id);

        if (evento.id === 'navidad') {
            montarGuirnaldaHeader();
            setTimeout(iniciarParpadeoArbol, 100);
        }

        // EmojisFlotantes desactivados: solo se usan animaciones canvas

        var cfg = CANVAS_MAP[evento.id];
        if (cfg && typeof Animaciones !== 'undefined') {
            Animaciones.iniciar(cfg.canvas, cfg.opciones);
        }
    }

    function mantenerCanvasActivo(evento) {
        if (typeof Animaciones !== 'undefined' && !Animaciones.estaActivo()) {
            var cfg = CANVAS_MAP[evento.id];
            if (cfg) {
                Animaciones.iniciar(cfg.canvas, cfg.opciones);
            }
        }
        if (evento.id === 'navidad') {
            var existing = document.querySelector('.christmas-lights-premium');
            if (!existing) montarGuirnaldaHeader();
            var treeBulbs = document.querySelectorAll('.xm-tree-bulb');
            if (treeBulbs.length && arbolTimers.length === 0) {
                setTimeout(iniciarParpadeoArbol, 100);
            }
        }
        if (typeof EmojisFlotantes !== 'undefined') {
            var layer = document.getElementById('event-emoji-layer');
            if (layer && layer.children.length === 0) {
                EmojisFlotantes.iniciar(evento.id);
            }
        }
    }

    function quitarDecoraciones() {
        if (typeof Animaciones !== 'undefined') Animaciones.detener();
        if (typeof EmojisFlotantes !== 'undefined') EmojisFlotantes.detener();
        var heroDecos = document.querySelector('.hero__decos');
        if (heroDecos) heroDecos.innerHTML = '';
        var heroScene = document.querySelector('.hero__scene');
        if (heroScene) heroScene.innerHTML = '';
        quitarGuirnaldaHeader();
        quitarParpadeoArbol();
    }

    function aplicarTheming(evento) {
        document.body.setAttribute('data-event', evento.id);
        var header = document.getElementById('header');
        if (header) header.classList.add('event-themed');

        var hero = document.querySelector('.hero');
        if (hero) {
            hero.classList.remove.apply(hero.classList, HERO_CLASSES);
            hero.classList.add('hero--' + evento.id);
        }
    }

    function quitarTheming() {
        document.body.removeAttribute('data-event');
        var header = document.getElementById('header');
        if (header) header.classList.remove('event-themed');

        var hero = document.querySelector('.hero');
        if (hero) hero.classList.remove.apply(hero.classList, HERO_CLASSES);
    }

    function aplicarEvento(evento) {
        if (!evento) return;
        eventoActivo = evento;
        aplicarTheming(evento);
        aplicarDecoracionesPremium(evento);
        renderSeccionEvento(evento);
        if (typeof refreshAllProductViews === 'function') {
            refreshAllProductViews();
        }
    }

    function desactivarEvento() {
        eventoActivo = null;
        quitarDecoraciones();
        quitarTheming();
        var section = document.getElementById('seasonal-section');
        if (section) section.style.display = 'none';
        if (typeof refreshAllProductViews === 'function') {
            refreshAllProductViews();
        }
    }

    function esProductoDeEvento(p, eventoId) {
        if (!p || !p.activo) return 0;
        var tipo = (p.tipo_olor || '').toLowerCase();
        var notas = ((p.notas || '') + ' ' + (p.notas_salida || '') + ' ' + (p.notas_corazon || '') + ' ' + (p.notas_fondo || '')).toLowerCase();
        var desc = ((p.descripcion || '') + ' ' + (p.descripcion_corta || '') + ' ' + (p.transmite || '') + ' ' + (p.ideal_para || '')).toLowerCase();
        var cat = (p.categoria || '').toLowerCase();
        var nombre = (p.nombre || '').toLowerCase();
        var full = tipo + ' ' + notas + ' ' + desc + ' ' + nombre;
        var score = 0;

        var esAcuaticoGym = /acuatica|acuatico/.test(tipo) || /playa|veraniego|deporte|gym|sandia|acuatic/.test(full);

        switch (eventoId) {
            case 'halloween':
                // Solo perfumes oscuros, misteriosos, especias nocturnas, oud, cuero, incienso, tabaco
                if (esAcuaticoGym) return 0;
                if (/fresco floral|citrico|acuatic/.test(tipo)) return 0;
                var tieneOlorOscuro = /oud|oriental|especiado|cuero/.test(tipo) || (/amaderado|dulce/.test(tipo) && /oud|cuero|incienso|tabaco|ambar|pimienta|canela|patchouli/.test(notas));
                var tieneVibeOscuro = /misterio|oscur|noche|nocturn|intenso|seducc|pasion|bruj|gotico|sombra|fuego|prohibid|rebel|elixir/.test(full);
                if (tieneOlorOscuro && (tieneVibeOscuro || /oud|cuero|incienso|tabaco/.test(notas))) {
                    score = 3 + (tieneVibeOscuro ? 2 : 0) + (p.destacado ? 1 : 0);
                }
                break;

            case 'navidad':
                // Cálido, canela, vainilla, gourmand, ámbar cálido, boozy, fiesta, lujo
                if (esAcuaticoGym) return 0;
                if (/fresco citrico|acuatica|fresco acuatico/.test(tipo)) return 0;
                var tieneGourmandCalido = /gourmand|dulce|oriental dulce/.test(tipo) || /canela|vainilla|habatonka|tonka|caramelo|chocolate|miel|ron|cognac|praline/.test(notas);
                var tieneVibeFiesta = /navidad|invierno|calid|fiesta|celebrac|lujo|dorado|oro|nochebuena|abrig|envolvente/.test(full);
                if (tieneGourmandCalido && (tieneVibeFiesta || /canela|vainilla|tonka|caramelo|ron|miel/.test(notas))) {
                    score = 3 + (tieneVibeFiesta ? 2 : 0) + (p.destacado ? 1 : 0);
                }
                break;

            case 'sanvalentin':
                // Romántico, citas, rosas, jazmín, seducción, pasión, frutos rojos
                if (esAcuaticoGym) return 0;
                var tieneNotasRomanticas = /rosa|jazmin|frutos rojos|frambuesa|cereza|fresa|vainilla|orquidea|peonia/.test(notas);
                var tieneVibeRomantico = /romant|cita|sensual|seducc|pasion|amor|afrodisiac|enamor|atractiv|pareja|tentacion|beso/.test(full);
                if (tieneNotasRomanticas && tieneVibeRomantico) {
                    score = 4 + (p.destacado ? 1 : 0);
                }
                break;

            case 'amorYamistad':
                // Regalos especiales, amistad, amor, notas atractivas, celebración
                if (/gym|deporte extremo/.test(full)) return 0;
                var esRegaloAfin = /regalo|especial|amistad|amor|compartir|celebrac|encant|alegria|favorit|cumple/.test(full) ||
                                  (p.destacado && /floral|dulce|frutal|fresco floral|amaderado/.test(tipo)) ||
                                  (/floral frutal|gourmand|dulce/.test(tipo) && /vainilla|fruta|rosa|caramelo/.test(notas));
                if (esRegaloAfin) {
                    score = 3 + (p.destacado ? 1 : 0);
                }
                break;

            case 'diamadre':
                // EXCLUSIVAMENTE Mujer y Unisex: florales delicados, rosas, peonía, lirios, elegancia
                if (cat === 'hombre') return 0;
                if (/cuero pesado|tabaco negro|humo/.test(notas)) return 0;
                var tieneNotasMadre = /floral|fresco floral|floral frutal|oriental floral/.test(tipo) || /rosa|peon|jazmin|lirio|magnolia|orquidea|azahar|violeta|almizcle blanco/.test(notas);
                var tieneEleganciaFemenina = /madre|mujer|femenin|delicad|eleganc|ternura|mama|reina|sofisticad|luminos|pureza|bello/.test(full);
                if (tieneNotasMadre && tieneEleganciaFemenina) {
                    score = 4 + (p.destacado ? 1 : 0);
                }
                break;

            case 'diapadre':
                // EXCLUSIVAMENTE Hombre y Unisex: maderas, aromáticas, cuero, cítricos distinguidos, carácter
                if (cat === 'mujer') return 0;
                if (/floral dulce|gourmand dulce/.test(tipo)) return 0;
                var tieneNotasPadre = /amaderado|aromatica|cuero|fresco|citrico|especiado/.test(tipo) || /cedro|vetiver|sandalo|cuero|lavanda|bergamota|cardamomo|pimienta/.test(notas);
                var tieneCaracterMasculino = /padre|hombre|masculin|caracter|fuerza|lider|exito|poder|papa|caballero|distinguid|elegancia|firme/.test(full);
                if (tieneNotasPadre && tieneCaracterMasculino) {
                    score = 4 + (p.destacado ? 1 : 0);
                }
                break;

            case 'blackfriday':
                // Destacados, promociones, bestsellers hype
                if (p.destacado || p.en_promocion) {
                    score = 4;
                } else if (/bestseller|mas vendido|hype|exclusivo|lujo|icono|popular|joya/.test(full)) {
                    score = 3;
                }
                break;

            case 'pascua':
                // Fragancias sutiles, elegantes, frescas y limpias
                if (/cuero pesado|tabaco negro|humo/.test(notas)) return 0;
                var tieneAromaLimpio = /floral|fresco|amaderado|citrico/.test(tipo) || /jazmin|lirio|azahar|almizcle blanco|sandalo/.test(notas);
                if (tieneAromaLimpio) {
                    score = 3 + (p.destacado ? 1 : 0);
                }
                break;
        }

        return score;
    }

    function filtrarProductosPorEvento(evento) {
        if (!window.__CATALOGO_PRODUCTOS || !evento) return [];
        var prodsConScore = [];
        for (var i = 0; i < window.__CATALOGO_PRODUCTOS.length; i++) {
            var p = window.__CATALOGO_PRODUCTOS[i];
            var score = esProductoDeEvento(p, evento.id);
            if (score > 0) {
                prodsConScore.push({ prod: p, score: score });
            }
        }
        // Ordenar por mayor afinidad con el evento
        prodsConScore.sort(function(a, b) {
            return b.score - a.score;
        });
        return prodsConScore.map(function(item) { return item.prod; });
    }

    function renderSeccionEvento(evento) {
        var section = document.getElementById('seasonal-section');
        if (!section) return;
        var productos = filtrarProductosPorEvento(evento);
        if (productos.length === 0) {
            section.style.display = 'none';
            return;
        }
        section.style.display = 'block';
        section.className = 'seasonal-section event-' + evento.id;
        var titleEl = section.querySelector('.seasonal-section__title');
        var descEl = section.querySelector('.seasonal-section__desc');
        var gridEl = section.querySelector('.seasonal-section__grid');
        var actionsEl = document.getElementById('seasonal-section-actions');
        if (!actionsEl) {
            actionsEl = document.createElement('div');
            actionsEl.id = 'seasonal-section-actions';
            actionsEl.className = 'seasonal-section__actions';
            section.appendChild(actionsEl);
        }

        if (titleEl) titleEl.textContent = evento.tituloSeccion;
        var descPct = evento.descuento || 0;
        var subtitle = descPct > 0 
            ? '✨ ' + descPct + '% de descuento en todas las fragancias.'
            : evento.descripcionSeccion;
        if (descEl) descEl.textContent = subtitle;

        var limiteInicial = Math.min(productos.length, 28);
        var mostrandoTodos = false;

        function renderizarTarjetas(cantidad) {
            if (!gridEl) return;
            gridEl.innerHTML = '';
            for (var i = 0; i < cantidad; i++) {
                gridEl.insertAdjacentHTML('beforeend', crearEventoCard(productos[i], evento));
            }
            gridEl.querySelectorAll('.product-card').forEach(function(card) {
                card.addEventListener('click', function() {
                    openProductModal(parseInt(this.getAttribute('data-id'), 10));
                });
            });

            if (actionsEl) {
                if (productos.length > limiteInicial && !mostrandoTodos) {
                    actionsEl.innerHTML = '<button class="seasonal-section__more-btn" id="seasonal-more-btn">Ver todas las fragancias (' + productos.length + ') <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg></button>';
                    var moreBtn = document.getElementById('seasonal-more-btn');
                    if (moreBtn) {
                        moreBtn.addEventListener('click', function() {
                            mostrandoTodos = true;
                            renderizarTarjetas(productos.length);
                            actionsEl.innerHTML = '';
                        });
                    }
                } else {
                    actionsEl.innerHTML = '';
                }
            }

            if (typeof updateScrollReveal === 'function') {
                updateScrollReveal();
            }
        }

        renderizarTarjetas(limiteInicial);
    }

    function crearEventoCard(product, evento) {
        var colors = product.colores || { principal: '#C9A96E', secundario: '#E8D5B7' };
        var descPct = evento && evento.descuento ? evento.descuento : 0;
        var precioOriginal = product.precio || 0;
        var precioFinal = descPct > 0 ? Math.round(precioOriginal * (1 - descPct / 100)) : precioOriginal;
        
        var priceHtml = '';
        if (descPct > 0 && precioOriginal > 0) {
            priceHtml = '<div class="product-card__price-wrap">' +
                '<span class="product-card__price-old">$' + precioOriginal.toLocaleString('es-CO') + '</span>' +
                '<span class="product-card__price">$' + precioFinal.toLocaleString('es-CO') + '</span>' +
            '</div>';
        } else {
            priceHtml = '<div class="product-card__price">' + (precioOriginal ? '$' + precioOriginal.toLocaleString('es-CO') : 'Consultar precio') + '</div>';
        }

        var discountBadge = descPct > 0 
            ? '<span class="product-card__badge product-card__badge--discount">-' + descPct + '%</span>'
            : '';

        return '<div class="product-card" data-id="' + product.id + '" style="--card-color:' + colors.principal + ';--card-light:' + colors.secundario + ';--btn-color:' + evento.colores.btnColor + ';">' +
            '<div class="product-card__image">' +
                '<img src="' + product.imagen + '" alt="' + product.nombre + '" loading="lazy" onerror="_eventoImgError(this)">' +
                '<div class="product-card__fallback" style="display:none;">' + (product.emoji || '✦') + '</div>' +
                discountBadge +
                '<span class="product-card__type">' + (product.emoji || '✦') + '</span>' +
            '</div>' +
            '<div class="product-card__content"><h3 class="product-card__name">' + product.nombre + '</h3><p class="product-card__brand">' + product.marca + '</p>' +
            '<div class="product-card__footer">' + priceHtml +
            '<button class="product-card__details-btn" data-id="' + product.id + '">Ver más<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg></button></div></div></div>';
    }

    function reaplicarSiActivo() {
        if (!eventoActivo) return;
        aplicarTheming(eventoActivo);
        mantenerCanvasActivo(eventoActivo);
        renderSeccionEvento(eventoActivo);
    }

    function crearPanelPrueba() {
        if (!isDebugMode()) return;
        var panel = document.getElementById('test-panel');
        if (!panel) return;
        var html = '<div class="test-panel__header" style="display:flex;justify-content:space-between;align-items:center;"><span>MODO PRUEBA</span><button id="test-panel-close" style="background:transparent;border:none;color:#fff;cursor:pointer;font-size:16px;line-height:1;padding:0 4px;" title="Cerrar panel">&times;</button></div><div class="test-panel__body">';
        for (var i = 0; i < EVENTOS.length; i++) {
            var ev = EVENTOS[i];
            html += '<button class="test-panel__btn" data-evento="' + ev.id + '">' + ev.nombre + ' (' + ev.descuento + '%)</button>';
        }
        html += '<button class="test-panel__btn test-panel__btn--normal" data-evento="normal">Normal</button></div>';
        panel.innerHTML = html;
        panel.style.display = 'block';

        var closeBtn = document.getElementById('test-panel-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                panel.style.display = 'none';
            });
        }

        panel.querySelectorAll('.test-panel__btn').forEach(function(btn) {
            btn.addEventListener('click', function() {
                var eid = this.getAttribute('data-evento');
                if (eid === 'normal') {
                    desactivarEvento();
                    marcarActivo(null);
                } else {
                    var ev = EVENTOS.find(function(e) { return e.id === eid; });
                    if (ev) {
                        desactivarEvento();
                        aplicarEvento(ev);
                        marcarActivo(eid);
                    }
                }
            });
        });
    }

    function marcarActivo(eventoId) {
        document.querySelectorAll('.test-panel__btn').forEach(function(btn) {
            btn.classList.remove('active');
            if (btn.getAttribute('data-evento') === eventoId) btn.classList.add('active');
        });
    }

    function getEventoActivo() {
        return eventoActivo;
    }

    function getDescuentoActivo() {
        return eventoActivo ? (eventoActivo.descuento || 0) : 0;
    }

    function calcularPrecioConDescuento(precioBase) {
        if (!precioBase || isNaN(precioBase)) return precioBase;
        var desc = getDescuentoActivo();
        if (desc <= 0) return precioBase;
        return Math.round(precioBase * (1 - desc / 100));
    }

    var heroObserver = null;
    function initHeroObserver() {
        if (!('IntersectionObserver' in window)) return;
        var hero = document.querySelector('.hero');
        if (!hero || heroObserver) return;
        heroObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    hero.classList.remove('hero--offscreen');
                } else {
                    hero.classList.add('hero--offscreen');
                }
            });
        }, { threshold: 0.05 });
        heroObserver.observe(hero);
    }

    function initEventos() {
        try {
            localStorage.removeItem('manizales_modo_prueba');
        } catch (e) {}

        var panel = document.getElementById('test-panel');
        if (panel) {
            panel.style.display = 'none';
            panel.innerHTML = '';
        }

        if (isDebugMode()) {
            crearPanelPrueba();
        }
        initHeroObserver();
        var ev = detectarEvento();
        if (ev) aplicarEvento(ev);
        temporizador = setInterval(function() {
            if (isDebugMode() && eventoActivo) return;
            var now = detectarEvento();
            if (now && (!eventoActivo || eventoActivo.id !== now.id)) {
                if (eventoActivo) desactivarEvento();
                aplicarEvento(now);
            } else if (!now && eventoActivo) {
                desactivarEvento();
            }
        }, 30000);
    }

    return {
        initEventos: initEventos,
        EVENTOS: EVENTOS,
        detectarEvento: detectarEvento,
        aplicarEvento: aplicarEvento,
        desactivarEvento: desactivarEvento,
        reaplicarSiActivo: reaplicarSiActivo,
        filtrarProductosPorEvento: filtrarProductosPorEvento,
        getEventoActivo: getEventoActivo,
        getDescuentoActivo: getDescuentoActivo,
        calcularPrecioConDescuento: calcularPrecioConDescuento,
        toggleModoPrueba: toggleModoPrueba
    };
})();
