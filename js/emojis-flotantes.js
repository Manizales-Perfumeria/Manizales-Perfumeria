/* ========================================
   EMOJIS FLOTANTES — Manizales Perfumería
   Capa creativa full-page: emojis del evento
   cayendo/flotando por toda la pagina, sin
   tapar el contenido (pointer-events:none)
   ======================================== */
var EmojisFlotantes = (function() {

    var CONFIG = {
        halloween:   { emojis: ['🦇','🎃','👻','🕷️'], modo: 'fall',  cantidad: 4, duracionMin: 14, duracionMax: 22, tamMin: 16, tamMax: 24 },
        navidad:     { emojis: ['❄️','🎄','🎁','⭐'], modo: 'fall',  cantidad: 5, duracionMin: 12, duracionMax: 20, tamMin: 14, tamMax: 22 },
        sanvalentin: { emojis: ['💕','🌹','💖'],       modo: 'rise',  cantidad: 4, duracionMin: 14, duracionMax: 22, tamMin: 14, tamMax: 22 },
        pascua:      { emojis: ['🕊️','🌸','🕯️'],      modo: 'rise',  cantidad: 4, duracionMin: 14, duracionMax: 22, tamMin: 14, tamMax: 22 },
        diamadre:    { emojis: ['🌷','💐','🌸'],       modo: 'rise',  cantidad: 4, duracionMin: 14, duracionMax: 22, tamMin: 14, tamMax: 22 },
        blackfriday: { emojis: ['🛍️','🏷️','⚡','✨'], modo: 'fall',  cantidad: 4, duracionMin: 14, duracionMax: 22, tamMin: 14, tamMax: 22 },
        diapadre:    { emojis: ['🏆','🎉','⭐'],       modo: 'fall',  cantidad: 4, duracionMin: 14, duracionMax: 22, tamMin: 14, tamMax: 20 }
    };

    var timeoutId = null;

    function prefersReducedMotion() {
        return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    function rand(min, max) { return min + Math.random() * (max - min); }

    function crearEmoji(cfg) {
        var layer = document.getElementById('event-emoji-layer');
        if (!layer) return;
        var el = document.createElement('span');
        el.className = 'event-emoji event-emoji--' + cfg.modo;
        el.textContent = cfg.emojis[Math.floor(Math.random() * cfg.emojis.length)];
        el.style.setProperty('--emoji-size', rand(cfg.tamMin, cfg.tamMax).toFixed(0) + 'px');
        el.style.setProperty('--emoji-duration', rand(cfg.duracionMin, cfg.duracionMax).toFixed(1) + 's');
        el.style.setProperty('--emoji-opacity', (0.2 + Math.random() * 0.25).toFixed(2));
        if (cfg.modo === 'drift') {
            el.style.setProperty('--emoji-top', rand(5, 70).toFixed(0) + '%');
        } else {
            el.style.setProperty('--emoji-left', rand(2, 95).toFixed(0) + '%');
        }
        layer.appendChild(el);
        // Auto-limpieza tras un ciclo para no acumular nodos
        setTimeout(function() {
            if (el && el.parentNode) el.parentNode.removeChild(el);
        }, (cfg.duracionMax + 1) * 1000);
    }

    function iniciar(eventId) {
        // Emojis flotantes desactivados — solo se usan animaciones canvas
        return;
    }

    function detener() {
        if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
        }
        var layer = document.getElementById('event-emoji-layer');
        if (layer) layer.innerHTML = '';
    }

    return {
        iniciar: iniciar,
        detener: detener
    };
})();
