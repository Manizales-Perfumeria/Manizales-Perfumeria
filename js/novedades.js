/* ========================================
   NOVEDADES — aviso de actualización del sitio
   ========================================
   Muestra en la barra de navegación una opción con el resumen de los cambios y
   mejoras de esta actualización. El distintivo "NUEVO" solo se muestra durante
   los primeros 32 dias desde el lanzamiento; despues la opción sigue disponible
   para consultar las novedades, pero sin el distintivo.

   PARA AJUSTARLO:
   - Cambiar 'fechaLanzamiento' para reiniciar la ventana de 32 dias.
   - Poner 'activo: false' para quitar la opción del menú por completo.
   - Editar 'grupos' para cambiar el contenido del aviso.
   */

var Novedades = (function () {
    var CONFIG = {
        activo: true,
        // Fecha en que se publica esta actualización (YYYY-MM-DD, hora local).
        // Es la fecha en que sube al sitio: a partir de acá corre la ventana.
        fechaLanzamiento: '2026-10-20',
        // Cuántos días se muestra el distintivo "NUEVO" (un mes).
        diasVisibles: 32,
        titulo: 'Qué hay de nuevo',
        subtitulo: 'Un montón de arreglos que llevábamos queriendo hacer desde hace rato.'
    };

    // Contenido del aviso. Cada grupo es una sección con su ícono y sus puntos.
    var GRUPOS = [
        {
            icono: '⚡',
            titulo: 'La página carga más rápido',
            items: [
                'El catálogo pesa 261 KB en vez de 407. Se nota sobre todo si entras con datos del celular.',
                'Las fotos de los perfumes ahora pesan 38 KB en vez de 129, y solo se descargan cuando las estás mirando.',
                'La nieve y los murciélagos de los eventos se dibujan a 30 imágenes por segundo en vez de 60. Se ven igual y gastan la mitad de batería.',
                'Antes, cada vez que bajabas la página la barra del navegador se estiraba y el fondo del evento se reiniciaba entero. Se notaba un parpadeo.'
            ]
        },
        {
            icono: '📱',
            titulo: 'Mejoramos el rendimiento y corregimos la UI en Android y iOS',
            items: [
                'El menú no se cerraba al tocar afuera. Solo se oscurecía un pedacito de arriba y no había forma de salir. Ahora toca en cualquier parte y se cierra.',
                'Cuando lo cerrabas, la página te botaba de vuelta arriba. Ya no pasa.',
                'Había una franja en blanco entre el logo y la portada. La quitamos.',
                'El buscador no hace zoom al tocarlo. Antes la página se agrandaba y se quedaba así.',
                'El teclado tapaba la caja donde escribes en el chat. Ya no lo tapa.',
                'Los botones eran chiquitos para el dedo. Ahora todos se tocan bien.',
                'En pantallas angostas las tarjetas se cortaban. Ya no.'
            ]
        },
        {
            icono: '🎃',
            titulo: 'Mejoramos y optimizamos las decoraciones de los eventos en Android y iOS',
            items: [
                'Cada evento tiene su propio dibujo para pantalla vertical. En el celular solo se veía un pedazo de la imagen: la luna y la mansión quedaban por fuera.',
                'La calabaza, la araña y la telaraña volvieron a moverse. Las habíamos apagado sin querer al optimizar el celular.',
                'Los murciélagos y la nieve también se veían en los equipos más viejos, solo que más despacio y con menos partículas.',
                'Cuando había nieve de fondo, el texto de los botones se perdía. Ya se lee bien.',
                'En celulares viejos quitamos los efectos más pesados. En los demás no se nota ningún cambio.'
            ]
        },
        {
            icono: '💬',
            titulo: 'Aura ahora sí te entiende',
            items: [
                'Antes ganaba la primera palabra que se le pareciera a lo que escribiste. Ahora piensa qué es lo que le estás pidiendo de verdad.',
                'Se acuerda de la conversación. Si le pides algo más barato, o para mujer, o sin vainilla, afina lo que ya te había propuesto.',
                'Si le dices "no quiero dulce", ya no te está vendiendo aromas dulces.',
                'Si pides "de Armaf", te enseña solo de esa marca.',
                'Reconoce las notas de verdad: vainilla, oud, cuero…',
                'Si le pides un perfume de 60 mil y lo más barato que tenemos está en 110 mil, te lo dice. Antes te contestaba con los más caros como si nada.',
                'Encuentra el perfume aunque no escribas el nombre completo, y perdona los errores de escritura.',
                'Te explica por qué eligió cada uno.',
                'Tres de los cinco botoncitos del chat no funcionaban. Ahora sí funcionan.'
            ]
        },
        {
            icono: '🤝',
            titulo: 'Accesibilidad',
            items: [
                'Ya se puede saltar directo al contenido con el teclado.',
                'Corregimos el contraste de cinco textos que costaban de leer.',
                'Todos los botones tienen nombre para los lectores de pantalla.'
            ]
        }
    ];

    // ---- Ventana de 32 d[ií]as ----
    function fechaLanzamiento() {
        var partes = String(CONFIG.fechaLanzamiento).split('-');
        return new Date(+partes[0], (+partes[1]) - 1, +partes[2], 0, 0, 0, 0);
    }

    function diasTranscurridos() {
        var ahora = new Date();
        var hoy = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate());
        var msPorDia = 1000 * 60 * 60 * 24;
        return Math.floor((hoy.getTime() - fechaLanzamiento().getTime()) / msPorDia);
    }

    // ¿Sigue dentro de la ventana de 32 d[ií]as?
    function dentroDeVentana() {
        var d = diasTranscurridos();
        return d >= 0 && d < CONFIG.diasVisibles;
    }

    // Días que quedan para que se quite el distintivo (0 si ya expiró)
    function diasRestantes() {
        var d = diasTranscurridos();
        if (d < 0) return CONFIG.diasVisibles;
        return Math.max(0, CONFIG.diasVisibles - d);
    }

    function mostrarDistintivo() {
        return CONFIG.activo && dentroDeVentana();
    }

    // ---- Render ----
    function escapar(t) {
        return String(t === undefined || t === null ? '' : t)
            .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    }

    function htmlModal() {
        var grupos = '';
        for (var i = 0; i < GRUPOS.length; i++) {
            var g = GRUPOS[i];
            var puntos = '';
            for (var j = 0; j < g.items.length; j++) {
                puntos += '<li class="novedades__item">' + escapar(g.items[j]) + '</li>';
            }
            grupos +=
                '<section class="novedades__grupo">' +
                    '<h3 class="novedades__grupo-titulo">' +
                        '<span class="novedades__grupo-icono" aria-hidden="true">' + escapar(g.icono) + '</span>' +
                        escapar(g.titulo) +
                    '</h3>' +
                    '<ul class="novedades__lista">' + puntos + '</ul>' +
                '</section>';
        }

        var distintivo = mostrarDistintivo()
            ? '<span class="novedades__badge">NUEVO</span>'
            : '';
        var pie = mostrarDistintivo()
            ? '<p class="novedades__aviso">Este aviso se retira automáticamente en ' + diasRestantes() +
              (diasRestantes() === 1 ? ' día.' : ' días.') + '</p>'
            : '';

        return '' +
        '<div class="novedades" id="novedades-modal" role="dialog" aria-modal="true" aria-labelledby="novedades-titulo" hidden>' +
            '<div class="novedades__overlay" data-novedades-cerrar></div>' +
            '<div class="novedades__content">' +
                '<button type="button" class="novedades__close" data-novedades-cerrar aria-label="Cerrar novedades">' +
                    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">' +
                        '<line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>' +
                    '</svg>' +
                '</button>' +
                '<header class="novedades__header">' +
                    '<p class="novedades__kicker">' + (distintivo || 'Novedades') + '</p>' +
                    '<h2 class="novedades__titulo" id="novedades-titulo">' + escapar(CONFIG.titulo) + '</h2>' +
                    '<p class="novedades__subtitulo">' + escapar(CONFIG.subtitulo) + '</p>' +
                '</header>' +
                '<div class="novedades__grupos">' + grupos + '</div>' +
                '<footer class="novedades__footer">' + pie +
                    '<button type="button" class="novedades__cerrar-btn" data-novedades-cerrar>Entendido</button>' +
                '</footer>' +
            '</div>' +
        '</div>';
    }

    function htmlNav() {
        var distintivo = mostrarDistintivo()
            ? '<span class="nav__new-badge" aria-label="novedad">NUEVO</span>'
            : '';
        return '' +
        '<li class="nav__item nav__item--novedades" id="nav-novedades">' +
            '<a href="#" class="nav__link nav__link--novedades" id="nav-novedades-link" aria-haspopup="dialog">' +
                'Novedades' + distintivo +
            '</a>' +
        '</li>';
    }

    // ---- Estado del modal ----
    var modal = null;
    var ultimoFoco = null;

    // Refresca el contador de dias y retira el distintivo si ya se cumplio el
    // plazo. Se hace al abrir el aviso para que la cuenta no se quede
    // congelada si la pestaña lleva mucho tiempo abierta.
    function actualizarContador() {
        if (!modal) return;

        var dentro = mostrarDistintivo();

        var aviso = modal.querySelector('.novedades__aviso');
        if (aviso) {
            if (dentro) {
                var r = diasRestantes();
                aviso.textContent = 'Este aviso se retira automáticamente en ' +
                    r + (r === 1 ? ' día.' : ' días.');
            } else {
                aviso.parentNode.removeChild(aviso);
            }
        }

        var badge = document.querySelector('.nav__new-badge');
        if (badge && !dentro && badge.parentNode) {
            badge.parentNode.removeChild(badge);
        }
    }

    function abrir() {
        if (!modal) return;
        // Si no había nada enfocado (por ejemplo, un click programático), se
        // devuelve el foco al enlace del menú, que es de donde se abrió.
        ultimoFoco = document.activeElement;
        if (!ultimoFoco || ultimoFoco === document.body) {
            ultimoFoco = document.getElementById('nav-novedades-link') || ultimoFoco;
        }
        modal.hidden = false;
        document.body.classList.add('novedades-open');
        actualizarContador();
        var cerrar = modal.querySelector('.novedades__close');
        if (cerrar) cerrar.focus();
        if (window.ManizalesScrollLock) window.ManizalesScrollLock.lock();
        else document.body.style.overflow = 'hidden';
    }

    function cerrar() {
        if (!modal || modal.hidden) return;
        modal.hidden = true;
        document.body.classList.remove('novedades-open');
        if (window.ManizalesScrollLock) window.ManizalesScrollLock.unlock();
        else document.body.style.overflow = '';
        if (ultimoFoco && ultimoFoco.focus) ultimoFoco.focus();
    }

    function alTeclear(e) {
        if (e.key === 'Escape') cerrar();
    }

    function inyectar() {
        if (!CONFIG.activo) return;

        // El item del menú
        var lista = document.querySelector('.nav__list');
        if (lista && !document.getElementById('nav-novedades')) {
            lista.insertAdjacentHTML('beforeend', htmlNav());
        }

        // El modal
        if (!document.getElementById('novedades-modal')) {
            document.body.insertAdjacentHTML('beforeend', htmlModal());
            modal = document.getElementById('novedades-modal');
        }

        var link = document.getElementById('nav-novedades-link');
        if (link) {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                abrir();
            });
        }

        if (modal) {
            modal.addEventListener('click', function (e) {
                var cierra = e.target.closest('[data-novedades-cerrar]');
                if (cierra) {
                    e.preventDefault();
                    cerrar();
                }
            });
            document.addEventListener('keydown', alTeclear);
        }
    }

    function init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', inyectar);
        } else {
            inyectar();
        }
    }

    return {
        init: init,
        abrir: abrir,
        cerrar: cerrar,
        // Para pruebas y para saber si toca mostrar el distintivo
        mostrarDistintivo: mostrarDistintivo,
        diasRestantes: diasRestantes,
        diasTranscurridos: diasTranscurridos,
        CONFIG: CONFIG
    };
})();

// Arranque automatico. init() espera al DOMContentLoaded si hace falta.
if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () { Novedades.init(); });
    } else {
        Novedades.init();
    }
}
