/* ========================================
   ANIMACIONES CANVAS PROFESIONALES
   ======================================== */

var Animaciones = (function() {
    var canvas = null;
    var ctx = null;
    var animacionActual = null;
    var corriendo = false;
    var pausado = false;
    var animFrameId = null;
    var ultimoTiempo = 0;
    // En móvil (pantalla ≤768px o táctil) bajar a 30 FPS para reducir carga GPU
    var esMobile = (window.innerWidth <= 768) || ('ontouchstart' in window);
    var FPS_OBJETIVO = esMobile ? 30 : 60;
    var intervaloFrame = 1000 / FPS_OBJETIVO;
    var acumulador = 0;
    var resizeHandler = null;

    function prefersReducedMotion() {
        return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    function onVisibilityChange() {
        pausado = document.hidden;
        if (!pausado && corriendo && animacionActual) {
            ultimoTiempo = performance.now();
            bucleAnimacion(ultimoTiempo);
        }
    }

    document.addEventListener('visibilitychange', onVisibilityChange);

    // === INICIAR CANVAS ===
    function iniciarCanvas() {
        canvas = document.getElementById('seasonal-canvas');
        if (!canvas) return false;
        ctx = canvas.getContext('2d');
        canvas.style.opacity = '1';
        canvas.style.display = 'block';
        canvas.style.position = 'fixed';
        canvas.style.inset = '0';
        canvas.style.width = '100vw';
        canvas.style.height = '100vh';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '1';
        canvas.style.willChange = 'transform';
        canvas.style.transform = 'translate3d(0, 0, 0)';
        canvas.style.contain = 'strict';
        resizeCanvas();
        if (!resizeHandler) {
            resizeHandler = resizeCanvas;
            window.addEventListener('resize', resizeHandler, { passive: true });
        }
        return true;
    }

    function resizeCanvas() {
        if (!canvas) return;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    // === NIEVE PROFESIONAL ===
    function Nieve(cantidad) {
        this.copos = [];
        for (var i = 0; i < cantidad; i++) {
            this.copos.push(this.crearCopo());
        }
    }

    Nieve.prototype.crearCopo = function() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            radio: 2 + Math.random() * 5,
            velY: 0.15 + Math.random() * 0.5,
            velX: Math.random() * 0.3 - 0.15,
            opacidad: 0.3 + Math.random() * 0.5,
            oscilacion: Math.random() * Math.PI * 2,
            velOscilacion: 0.008 + Math.random() * 0.012,
            rotacion: Math.random() * Math.PI * 2,
            velRotacion: (Math.random() - 0.5) * 0.003,
            tipo: Math.floor(Math.random() * 3)
        };
    };

    Nieve.prototype.actualizar = function(dt) {
        for (var i = 0; i < this.copos.length; i++) {
            var c = this.copos[i];
            c.oscilacion += c.velOscilacion;
            c.x += c.velX + Math.sin(c.oscilacion) * 0.25;
            c.y += c.velY * dt;
            c.rotacion += c.velRotacion;
            if (c.y > canvas.height + 10) {
                c.y = -10;
                c.x = Math.random() * canvas.width;
            }
        }
    };

    Nieve.prototype.dibujarEstrella = function(c) {
        ctx.save();
        ctx.translate(c.x, c.y);
        ctx.rotate(c.rotacion);
        ctx.globalAlpha = c.opacidad;
        ctx.strokeStyle = '#ffffff';
        ctx.fillStyle = '#ffffff';
        ctx.lineWidth = Math.max(0.6, c.radio * 0.1);
        ctx.lineCap = 'round';

        var r = c.radio;
        ctx.beginPath();
        // 3 líneas directas que cruzan el centro para formar los 6 brazos sin rotaciones anidadas
        for (var b = 0; b < 3; b++) {
            var a = (Math.PI / 3) * b;
            var cos = Math.cos(a);
            var sin = Math.sin(a);
            ctx.moveTo(-r * cos, -r * sin);
            ctx.lineTo(r * cos, r * sin);
        }
        ctx.stroke();

        if (c.tipo === 1) {
            var inner = r * 0.45;
            var rBranch = r * 0.7;
            ctx.beginPath();
            for (var b = 0; b < 6; b++) {
                var a = (Math.PI / 3) * b + Math.PI / 6;
                var cos = Math.cos(a);
                var sin = Math.sin(a);
                ctx.moveTo(inner * cos, inner * sin);
                ctx.lineTo(rBranch * cos, rBranch * sin);
            }
            ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(0, 0, Math.max(0.6, r * 0.1), 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    };

    Nieve.prototype.dibujar = function() {
        for (var i = 0; i < this.copos.length; i++) {
            var c = this.copos[i];
            if (c.radio < 3) {
                ctx.save();
                ctx.globalAlpha = c.opacidad;
                ctx.fillStyle = '#ffffff';
                ctx.beginPath();
                ctx.arc(c.x, c.y, c.radio * 0.5, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            } else {
                this.dibujarEstrella(c);
            }
        }
    };

    // === MURCIÉLAGOS PROFESIONALES CON ALAS ANIMADAS ===
    function Murcielagos(cantidad) {
        this.murcielagos = [];
        for (var i = 0; i < cantidad; i++) {
            this.murcielagos.push(this.crearMurcielago(true));
        }
    }

    Murcielagos.prototype.crearMurcielago = function(randomY) {
        var tamano = 20 + Math.random() * 30;
        var startX;
        if (randomY) {
            startX = Math.random() < 0.5
                ? Math.random() * canvas.width * 0.6
                : -50 - Math.random() * 200;
        } else {
            startX = -50 - Math.random() * 100;
        }
        return {
            x: startX,
            y: randomY ? Math.random() * canvas.height * 0.85 : Math.random() * canvas.height * 0.5,
            tamano: tamano,
            velX: 2 + Math.random() * 2.5,
            velY: 0,
            alaAngulo: 0,
            alaVel: 0.1 + Math.random() * 0.08,
            opacidad: 1,
            oscilacion: Math.random() * Math.PI * 2,
            velOscilacion: 0.02 + Math.random() * 0.015,
            dirY: Math.random() > 0.5 ? 1 : -1
        };
    };

    Murcielagos.prototype.dibujarMurcielago = function(m) {
        ctx.save();
        ctx.translate(m.x, m.y);
        ctx.globalAlpha = m.opacidad;

        var t = m.tamano;
        var ala = Math.sin(m.alaAngulo) * 0.7;

        // Halo de brillo púrpura eficiente (sin shadowBlur en CPU)
        ctx.fillStyle = 'rgba(168, 85, 247, 0.22)';
        ctx.beginPath();
        ctx.ellipse(0, 0, t * 0.45, t * 0.35, 0, 0, Math.PI * 2);
        ctx.fill();

        // Cuerpo
        ctx.fillStyle = '#7c3aed';
        ctx.beginPath();
        ctx.ellipse(0, 0, t * 0.3, t * 0.25, 0, 0, Math.PI * 2);
        ctx.fill();

        // Ala izquierda
        ctx.fillStyle = '#6d28d9';
        ctx.beginPath();
        ctx.moveTo(-t * 0.15, -t * 0.05);
        ctx.quadraticCurveTo(-t * 0.6, -t * (0.3 + ala * 0.5), -t * 0.9, -t * (0.1 + ala * 0.3));
        ctx.quadraticCurveTo(-t * 0.7, t * 0.05, -t * 0.5, t * 0.1);
        ctx.quadraticCurveTo(-t * 0.3, t * 0.08, -t * 0.15, t * 0.05);
        ctx.closePath();
        ctx.fill();

        // Ala derecha
        ctx.beginPath();
        ctx.moveTo(t * 0.15, -t * 0.05);
        ctx.quadraticCurveTo(t * 0.6, -t * (0.3 + ala * 0.5), t * 0.9, -t * (0.1 + ala * 0.3));
        ctx.quadraticCurveTo(t * 0.7, t * 0.05, t * 0.5, t * 0.1);
        ctx.quadraticCurveTo(t * 0.3, t * 0.08, t * 0.15, t * 0.05);
        ctx.closePath();
        ctx.fill();

        // Orejas
        ctx.fillStyle = '#7c3aed';
        ctx.beginPath();
        ctx.moveTo(-t * 0.12, -t * 0.2);
        ctx.lineTo(-t * 0.08, -t * 0.35);
        ctx.lineTo(-t * 0.02, -t * 0.2);
        ctx.closePath();
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(t * 0.12, -t * 0.2);
        ctx.lineTo(t * 0.08, -t * 0.35);
        ctx.lineTo(t * 0.02, -t * 0.2);
        ctx.closePath();
        ctx.fill();

        // Ojos brillantes
        ctx.fillStyle = '#ff4444';
        ctx.beginPath();
        ctx.arc(-t * 0.08, -t * 0.08, t * 0.03, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(t * 0.08, -t * 0.08, t * 0.03, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    };

    Murcielagos.prototype.actualizar = function(dt) {
        for (var i = 0; i < this.murcielagos.length; i++) {
            var m = this.murcielagos[i];
            m.alaAngulo += m.alaVel * dt;
            m.oscilacion += m.velOscilacion;
            m.x += m.velX * dt;

            /* Vuelo en zig-zag: cambia de rumbo vertical cada cierto tiempo
               en vez de solo oscilar suavemente, para un paseo mas travieso */
            m.zigTimer = (m.zigTimer || 0) + dt;
            if (m.zigTimer > (m.zigDuracion || 55)) {
                m.dirY = (m.dirY || 1) * -1;
                m.zigTimer = 0;
                m.zigDuracion = 35 + Math.random() * 45;
            }
            m.y += (m.dirY || 1) * (1 + Math.abs(Math.sin(m.oscilacion)) * 1.1);
            if (m.y < canvas.height * 0.03) m.dirY = 1;
            if (m.y > canvas.height * 0.92) m.dirY = -1;

            if (m.x > canvas.width + 60) {
                var nuevo = this.crearMurcielago(false);
                m.x = nuevo.x;
                m.y = Math.random() * canvas.height * 0.9;
                m.tamano = nuevo.tamano;
                m.velX = nuevo.velX;
                m.opacidad = nuevo.opacidad;
            }
        }
    };

    Murcielagos.prototype.dibujar = function() {
        for (var i = 0; i < this.murcielagos.length; i++) {
            this.dibujarMurcielago(this.murcielagos[i]);
        }
    };

    // === CORAZONES FLOTANTES ===
    function Corazones(cantidad, color) {
        this.color = color || '#ec4899';
        this.corazones = [];
        for (var i = 0; i < cantidad; i++) {
            this.corazones.push(this.crearCorazon(true));
        }
    }

    Corazones.prototype.crearCorazon = function(randomStart) {
        return {
            x: Math.random() * canvas.width,
            y: randomStart ? Math.random() * canvas.height : canvas.height + 20,
            tamano: 8 + Math.random() * 10,
            velY: -(0.3 + Math.random() * 0.5),
            velX: (Math.random() - 0.5) * 0.3,
            opacidad: 0.18 + Math.random() * 0.22,
            rotacion: (Math.random() - 0.5) * 0.3,
            velRot: (Math.random() - 0.5) * 0.01,
            oscilacion: Math.random() * Math.PI * 2,
            velOsc: 0.015 + Math.random() * 0.01
        };
    };

    Corazones.prototype.dibujarCorazon = function(x, y, t, rot) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rot);
        ctx.scale(t / 20, t / 20);
        ctx.beginPath();
        ctx.moveTo(0, -5);
        ctx.bezierCurveTo(-10, -18, -22, -8, 0, 10);
        ctx.bezierCurveTo(22, -8, 10, -18, 0, -5);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    };

    Corazones.prototype.actualizar = function(dt) {
        for (var i = 0; i < this.corazones.length; i++) {
            var c = this.corazones[i];
            c.oscilacion += c.velOsc;
            c.x += c.velX + Math.sin(c.oscilacion) * 0.3;
            c.y += c.velY * dt;
            c.rotacion += c.velRot;
            if (c.y < -30) {
                var nuevo = this.crearCorazon(false);
                c.y = nuevo.y;
                c.x = Math.random() * canvas.width;
                c.tamano = nuevo.tamano;
                c.opacidad = nuevo.opacidad;
            }
        }
    };

    Corazones.prototype.dibujar = function() {
        ctx.fillStyle = this.color;
        for (var i = 0; i < this.corazones.length; i++) {
            var c = this.corazones[i];
            ctx.save();
            ctx.globalAlpha = c.opacidad;
            this.dibujarCorazon(c.x, c.y, c.tamano, c.rotacion);
            ctx.restore();
        }
    };

    // === PÉTALOS DE FLOR ===
    function Petalos(cantidad, color) {
        this.color = color || '#FFB7C5';
        this.petalos = [];
        for (var i = 0; i < cantidad; i++) {
            this.petalos.push(this.crearPetalo(true));
        }
    }

    Petalos.prototype.crearPetalo = function(randomStart) {
        return {
            x: Math.random() * canvas.width,
            y: randomStart ? Math.random() * canvas.height : -10,
            tamano: 2 + Math.random() * 3,
            velY: 0.2 + Math.random() * 0.5,
            velX: (Math.random() - 0.5) * 0.5,
            opacidad: 0.18 + Math.random() * 0.22,
            rotacion: Math.random() * Math.PI * 2,
            velRot: (Math.random() - 0.5) * 0.03,
            oscilacion: Math.random() * Math.PI * 2,
            velOsc: 0.015 + Math.random() * 0.01
        };
    };

    Petalos.prototype.actualizar = function(dt) {
        for (var i = 0; i < this.petalos.length; i++) {
            var p = this.petalos[i];
            p.oscilacion += p.velOsc;
            p.x += p.velX + Math.sin(p.oscilacion) * 0.4;
            p.y += p.velY * dt;
            p.rotacion += p.velRot;
            if (p.y > canvas.height + 10) {
                var nuevo = this.crearPetalo(false);
                p.y = nuevo.y;
                p.x = Math.random() * canvas.width;
                p.opacidad = nuevo.opacidad;
            }
        }
    };

    Petalos.prototype.dibujar = function() {
        ctx.fillStyle = this.color;
        for (var i = 0; i < this.petalos.length; i++) {
            var p = this.petalos[i];
            ctx.save();
            ctx.globalAlpha = p.opacidad;
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rotacion);
            ctx.beginPath();
            ctx.ellipse(0, 0, p.tamano * 1.8, p.tamano, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    };

    // === DESTELLOS DORADOS ===
    function Destellos(cantidad, color) {
        this.color = color || '#FFD700';
        this.destellos = [];
        for (var i = 0; i < cantidad; i++) {
            this.destellos.push(this.crearDestello());
        }
    }

    Destellos.prototype.crearDestello = function() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            tamano: 1.5 + Math.random() * 3,
            velY: -(0.1 + Math.random() * 0.2),
            opacidad: 0.08 + Math.random() * 0.15,
            vida: Math.random() * 200,
            maxVida: 200 + Math.random() * 100
        };
    };

    Destellos.prototype.dibujarEstrella = function(x, y, t) {
        ctx.beginPath();
        var s = t;
        ctx.moveTo(0, -s * 2.5);
        ctx.quadraticCurveTo(s * 0.3, -s * 0.3, s * 2.5, 0);
        ctx.quadraticCurveTo(s * 0.3, s * 0.3, 0, s * 2.5);
        ctx.quadraticCurveTo(-s * 0.3, s * 0.3, -s * 2.5, 0);
        ctx.quadraticCurveTo(-s * 0.3, -s * 0.3, 0, -s * 2.5);
        ctx.closePath();
        ctx.fill();
    };

    Destellos.prototype.actualizar = function(dt) {
        for (var i = 0; i < this.destellos.length; i++) {
            var d = this.destellos[i];
            d.vida += dt;
            d.y += d.velY * dt;
            var progreso = d.vida / d.maxVida;
            d.opacidad = 0.1 + 0.35 * Math.abs(Math.sin(progreso * Math.PI));
            if (d.vida >= d.maxVida || d.y < -10) {
                var nuevo = this.crearDestello();
                d.x = nuevo.x;
                d.y = canvas.height + 10;
                d.tamano = nuevo.tamano;
                d.vida = 0;
                d.maxVida = nuevo.maxVida;
            }
        }
    };

    Destellos.prototype.dibujar = function() {
        ctx.fillStyle = this.color;
        for (var i = 0; i < this.destellos.length; i++) {
            var d = this.destellos[i];
            ctx.save();
            ctx.globalAlpha = d.opacidad;
            ctx.translate(d.x, d.y);
            this.dibujarEstrella(0, 0, d.tamano);
            ctx.restore();
        }
    };

    // === BURBUJAS ===
    function Burbujas(cantidad) {
        this.burbujas = [];
        for (var i = 0; i < cantidad; i++) {
            this.burbujas.push(this.crearBurbuja(true));
        }
    }

    Burbujas.prototype.crearBurbuja = function(randomStart) {
        return {
            x: Math.random() * canvas.width,
            y: randomStart ? Math.random() * canvas.height : canvas.height + 20,
            radio: 2 + Math.random() * 5,
            velY: -(0.15 + Math.random() * 0.35),
            opacidad: 0.08 + Math.random() * 0.18,
            oscilacion: Math.random() * Math.PI * 2,
            velOsc: 0.01 + Math.random() * 0.015
        };
    };

    Burbujas.prototype.actualizar = function(dt) {
        for (var i = 0; i < this.burbujas.length; i++) {
            var b = this.burbujas[i];
            b.oscilacion += b.velOsc;
            b.x += Math.sin(b.oscilacion) * 0.5;
            b.y += b.velY * dt;
            if (b.y < -20) {
                var nuevo = this.crearBurbuja(false);
                b.y = nuevo.y;
                b.x = Math.random() * canvas.width;
                b.radio = nuevo.radio;
                b.opacidad = nuevo.opacidad;
            }
        }
    };

    Burbujas.prototype.dibujar = function() {
        for (var i = 0; i < this.burbujas.length; i++) {
            var b = this.burbujas[i];
            ctx.save();
            ctx.globalAlpha = b.opacidad;
            // Borde
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.arc(b.x, b.y, b.radio, 0, Math.PI * 2);
            ctx.stroke();
            // Brillo
            ctx.fillStyle = '#ffffff';
            ctx.globalAlpha = b.opacidad * 0.5;
            ctx.beginPath();
            ctx.arc(b.x - b.radio * 0.3, b.y - b.radio * 0.3, b.radio * 0.15, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    };

    // === FANTASMAS FLOTANTES ===
    function Fantasmas(cantidad) {
        this.fantasmas = [];
        for (var i = 0; i < cantidad; i++) {
            this.fantasmas.push(this.crearFantasma(true));
        }
    }

    Fantasmas.prototype.crearFantasma = function(randomStart) {
        return {
            x: Math.random() * canvas.width,
            y: randomStart ? Math.random() * canvas.height * 0.75 + canvas.height * 0.1 : canvas.height + 50,
            tamano: 22 + Math.random() * 20,
            velY: -(0.12 + Math.random() * 0.2),
            velX: (Math.random() - 0.5) * 0.25,
            opacidad: 0.09 + Math.random() * 0.1,
            oscilacion: Math.random() * Math.PI * 2,
            velOsc: 0.01 + Math.random() * 0.012
        };
    };

    Fantasmas.prototype.dibujarFantasma = function(f) {
        ctx.save();
        ctx.translate(f.x, f.y);
        ctx.globalAlpha = f.opacidad;
        var t = f.tamano;
        var onda = Math.sin(f.oscilacion * 2) * t * 0.08;

        ctx.fillStyle = '#ece9f7';
        ctx.beginPath();
        ctx.moveTo(-t * 0.5, t * 0.1);
        ctx.quadraticCurveTo(-t * 0.55, -t * 0.55, 0, -t * 0.6);
        ctx.quadraticCurveTo(t * 0.55, -t * 0.55, t * 0.5, t * 0.1);
        ctx.lineTo(t * 0.5, t * 0.35);
        ctx.quadraticCurveTo(t * 0.33, t * 0.25 + onda, t * 0.16, t * 0.4);
        ctx.quadraticCurveTo(0, t * 0.25 - onda, -t * 0.16, t * 0.4);
        ctx.quadraticCurveTo(-t * 0.33, t * 0.25 + onda, -t * 0.5, t * 0.35);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = 'rgba(35,25,55,0.75)';
        ctx.beginPath();
        ctx.arc(-t * 0.16, -t * 0.15, t * 0.08, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(t * 0.16, -t * 0.15, t * 0.08, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(0, t * 0.06, t * 0.07, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    };

    Fantasmas.prototype.actualizar = function(dt) {
        for (var i = 0; i < this.fantasmas.length; i++) {
            var f = this.fantasmas[i];
            f.oscilacion += f.velOsc;
            f.x += f.velX + Math.sin(f.oscilacion) * 0.35;
            f.y += f.velY * dt;
            if (f.y < -70) {
                var nuevo = this.crearFantasma(false);
                f.y = nuevo.y;
                f.x = Math.random() * canvas.width;
                f.tamano = nuevo.tamano;
                f.opacidad = nuevo.opacidad;
            }
        }
    };

    Fantasmas.prototype.dibujar = function() {
        for (var i = 0; i < this.fantasmas.length; i++) {
            this.dibujarFantasma(this.fantasmas[i]);
        }
    };

    // === ARAÑAS CAMINANDO (PATAS ANIMADAS) ===
    function Aranas(cantidad) {
        this.aranas = [];
        for (var i = 0; i < cantidad; i++) {
            this.aranas.push(this.crearArana());
        }
    }

    Aranas.prototype.crearArana = function() {
        return {
            x: Math.random() * canvas.width,
            y: canvas.height - (8 + Math.random() * 30),
            tamano: 7 + Math.random() * 5,
            dir: Math.random() > 0.5 ? 1 : -1,
            vel: 0.25 + Math.random() * 0.4,
            pataAngulo: Math.random() * Math.PI * 2,
            pataVel: 0.14 + Math.random() * 0.08,
            opacidad: 0.85 + Math.random() * 0.15,
            enPausa: false,
            pausaTiempo: 0
        };
    };

    Aranas.prototype.dibujarArana = function(a) {
        ctx.save();
        ctx.translate(a.x, a.y);
        ctx.rotate(Math.PI / 2 * a.dir);
        ctx.globalAlpha = a.opacidad;
        var t = a.tamano;
        var swing = Math.sin(a.pataAngulo) * 0.5;

        ctx.strokeStyle = '#15121e';
        ctx.lineWidth = Math.max(1, t * 0.15);
        ctx.lineCap = 'round';

        var legAngles = [-1.0, -0.5, 0.5, 1.0];
        for (var i = 0; i < legAngles.length; i++) {
            var dyn = swing * (i % 2 === 0 ? 1 : -1);
            var kx = t * 1.1;
            var ky = Math.sin(legAngles[i]) * t * 0.9 - t * 0.15 + dyn * t * 0.3;

            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.quadraticCurveTo(-t * 0.6, ky * 0.5, -kx, ky);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.quadraticCurveTo(t * 0.6, ky * 0.5, kx, ky);
            ctx.stroke();
        }

        ctx.fillStyle = '#15121e';
        ctx.beginPath();
        ctx.ellipse(0, t * 0.15, t * 0.55, t * 0.65, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(0, -t * 0.45, t * 0.35, t * 0.4, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ff4d4d';
        ctx.beginPath();
        ctx.arc(-t * 0.12, -t * 0.5, t * 0.07, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(t * 0.12, -t * 0.5, t * 0.07, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    };

    Aranas.prototype.actualizar = function(dt) {
        for (var i = 0; i < this.aranas.length; i++) {
            var a = this.aranas[i];
            a.pataAngulo += a.pataVel * dt;

            if (a.enPausa) {
                a.pausaTiempo -= dt;
                if (a.pausaTiempo <= 0) a.enPausa = false;
            } else {
                a.x += a.dir * a.vel * dt;
                if (Math.random() < 0.004) {
                    a.enPausa = true;
                    a.pausaTiempo = 40 + Math.random() * 90;
                }
                if (a.x > canvas.width + 20) a.dir = -1;
                if (a.x < -20) a.dir = 1;
            }
        }
    };

    Aranas.prototype.dibujar = function() {
        for (var i = 0; i < this.aranas.length; i++) {
            this.dibujarArana(this.aranas[i]);
        }
    };

    // === SANTA CLAUS PASANDO EN TRINEO === (legacy, no usado en producción)
    function SantaClaus() {
        this.x = -150;
        this.y = 60;
        this.velX = 0.8;
        this.tamano = 1.0;
        this.opacidad = 0.35;
        this.regalos = [];
        for (var i = 0; i < 3; i++) {
            this.regalos.push({
                offset: i * 12,
                color: ['#e74c3c', '#27ae60', '#f39c12'][i]
            });
        }
    }

    SantaClaus.prototype.dibujar = function() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.globalAlpha = this.opacidad;
        var s = this.tamano;

        // Trineo
        ctx.fillStyle = '#8B4513';
        ctx.beginPath();
        ctx.moveTo(-30 * s, 10 * s);
        ctx.lineTo(40 * s, 10 * s);
        ctx.quadraticCurveTo(50 * s, 10 * s, 48 * s, 5 * s);
        ctx.lineTo(45 * s, 2 * s);
        ctx.lineTo(-28 * s, 2 * s);
        ctx.closePath();
        ctx.fill();

        // Patines del trineo
        ctx.strokeStyle = '#c9a96e';
        ctx.lineWidth = 2 * s;
        ctx.beginPath();
        ctx.moveTo(-35 * s, 12 * s);
        ctx.quadraticCurveTo(10 * s, 18 * s, 52 * s, 12 * s);
        ctx.stroke();

        // Regalos en el trineo
        for (var i = 0; i < this.regalos.length; i++) {
            var r = this.regalos[i];
            ctx.fillStyle = r.color;
            ctx.fillRect(-20 * s + r.offset * s, -8 * s, 10 * s, 10 * s);
            // Lazo
            ctx.strokeStyle = '#FFD700';
            ctx.lineWidth = 1 * s;
            ctx.beginPath();
            ctx.moveTo(-15 * s + r.offset * s, -8 * s);
            ctx.lineTo(-15 * s + r.offset * s, 2 * s);
            ctx.moveTo(-20 * s + r.offset * s, -3 * s);
            ctx.lineTo(-10 * s + r.offset * s, -3 * s);
            ctx.stroke();
        }

        // Santa cuerpo
        ctx.fillStyle = '#e74c3c';
        ctx.beginPath();
        ctx.ellipse(10 * s, -12 * s, 8 * s, 12 * s, 0, 0, Math.PI * 2);
        ctx.fill();

        // Cara
        ctx.fillStyle = '#f5cba7';
        ctx.beginPath();
        ctx.arc(10 * s, -28 * s, 6 * s, 0, Math.PI * 2);
        ctx.fill();

        // Gorro
        ctx.fillStyle = '#e74c3c';
        ctx.beginPath();
        ctx.moveTo(4 * s, -30 * s);
        ctx.quadraticCurveTo(10 * s, -45 * s, 20 * s, -35 * s);
        ctx.quadraticCurveTo(15 * s, -30 * s, 16 * s, -28 * s);
        ctx.closePath();
        ctx.fill();

        // Borla del gorro
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(20 * s, -35 * s, 3 * s, 0, Math.PI * 2);
        ctx.fill();

        // Barba
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.moveTo(5 * s, -24 * s);
        ctx.quadraticCurveTo(10 * s, -16 * s, 15 * s, -24 * s);
        ctx.closePath();
        ctx.fill();

        // Texto "Ho Ho Ho"
        ctx.fillStyle = '#FFD700';
        ctx.font = 'bold ' + (10 * s) + 'px Georgia, serif';
        ctx.globalAlpha = this.opacidad * 0.7;
        ctx.fillText('Ho Ho Ho', 55 * s, -15 * s);

        ctx.restore();
    };

    SantaClaus.prototype.actualizar = function(dt) {
        this.x += this.velX * dt;
        this.y = 60 + Math.sin(this.x * 0.005) * 15;
        if (this.x > canvas.width + 200) {
            this.x = -200;
            this.y = 60;
        }
    };

    // === NIEBLA SUTIL ===
    function Niebla() {
        this.nubes = [];
        for (var i = 0; i < 4; i++) {
            this.nubes.push({
                x: Math.random() * canvas.width,
                y: canvas.height * 0.3 + Math.random() * canvas.height * 0.4,
                ancho: 200 + Math.random() * 300,
                alto: 40 + Math.random() * 60,
                velX: 0.1 + Math.random() * 0.2,
                opacidad: 0.06 + Math.random() * 0.06
            });
        }
    }

    Niebla.prototype.actualizar = function(dt) {
        for (var i = 0; i < this.nubes.length; i++) {
            var n = this.nubes[i];
            n.x += n.velX * dt;
            if (n.x > canvas.width + n.ancho) {
                n.x = -n.ancho;
            }
        }
    };

    Niebla.prototype.dibujar = function() {
        for (var i = 0; i < this.nubes.length; i++) {
            var n = this.nubes[i];
            ctx.save();
            ctx.globalAlpha = n.opacidad;
            var grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.ancho / 2);
            grad.addColorStop(0, 'rgba(100, 50, 150, 0.6)');
            grad.addColorStop(1, 'rgba(100, 50, 150, 0)');
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.ellipse(n.x, n.y, n.ancho / 2, n.alto / 2, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    };

    // === ARAÑAS CAMINANDO EN LA PARTE BAJA (Halloween) ===
    // Alias de Aranas con tamaño mayor para mayor visibilidad en la franja inferior
    function AranasCaminando(cantidad) {
        this.aranas = [];
        for (var i = 0; i < cantidad; i++) {
            this.aranas.push(this.crearArana());
        }
    }

    AranasCaminando.prototype.crearArana = function() {
        return {
            x: Math.random() * canvas.width,
            y: canvas.height - (14 + Math.random() * 20),
            tamano: 14 + Math.random() * 8,
            dir: Math.random() > 0.5 ? 1 : -1,
            vel: 0.3 + Math.random() * 0.35,
            pataAngulo: Math.random() * Math.PI * 2,
            pataVel: 0.1 + Math.random() * 0.08,
            opacidad: 0.9 + Math.random() * 0.1,
            enPausa: false,
            pausaTiempo: 0
        };
    };

    AranasCaminando.prototype.dibujarArana = Aranas.prototype.dibujarArana;

    AranasCaminando.prototype.actualizar = function(dt) {
        for (var i = 0; i < this.aranas.length; i++) {
            var a = this.aranas[i];
            a.pataAngulo += a.pataVel * dt;
            if (a.enPausa) {
                a.pausaTiempo -= dt;
                if (a.pausaTiempo <= 0) a.enPausa = false;
            } else {
                a.x += a.dir * a.vel * dt;
                if (Math.random() < 0.003) {
                    a.enPausa = true;
                    a.pausaTiempo = 30 + Math.random() * 80;
                }
                if (a.x > canvas.width + 30) a.dir = -1;
                if (a.x < -30) a.dir = 1;
            }
        }
    };

    AranasCaminando.prototype.dibujar = function() {
        for (var i = 0; i < this.aranas.length; i++) {
            this.dibujarArana(this.aranas[i]);
        }
    };

    // === CONTROL PRINCIPAL ===
    function iniciar(tipo, opciones) {
        detener();

        if (!iniciarCanvas()) { console.warn('[Animaciones] Canvas no encontrado'); return; }

        // Detectar si es móvil para reducir partículas y mejorar rendimiento
        esMobile = (window.innerWidth <= 768) || ('ontouchstart' in window);
        FPS_OBJETIVO = esMobile ? 30 : 60;
        intervaloFrame = 1000 / FPS_OBJETIVO;

        corriendo = true;
        pausado = false;

        // En móvil reducir la cantidad a la mitad (máx 15, mín 2)
        var cantidadBase = Math.min((opciones && opciones.cantidad) || 12, 30);
        var cantidad = esMobile ? Math.max(2, Math.floor(cantidadBase / 2)) : cantidadBase;
        var color = (opciones && opciones.color) || '#ffffff';

        switch (tipo) {
            case 'snow':
                animacionActual = { principal: new Nieve(cantidad), extras: [] };
                break;
            case 'bats':
                animacionActual = {
                    principal: new Murcielagos(cantidad),
                    // En móvil quitar arañas para reducir carga de dibujo
                    extras: esMobile ? [] : [new AranasCaminando(3)]
                };
                break;
            case 'hearts':
                animacionActual = { principal: new Corazones(cantidad, color), extras: [] };
                break;
            case 'petals':
                animacionActual = { principal: new Petalos(cantidad, color), extras: [] };
                break;
            case 'sparkles':
                animacionActual = { principal: new Destellos(cantidad, color), extras: [] };
                break;
            case 'bubbles':
                animacionActual = { principal: new Burbujas(cantidad), extras: [] };
                break;
        }

        canvas.classList.add('active');
        resizeCanvas();
        ultimoTiempo = performance.now();
        acumulador = 0;
        bucleAnimacion(ultimoTiempo);
    }

    function bucleAnimacion(tiempoActual) {
        if (!corriendo || pausado) return;

        var delta = tiempoActual - ultimoTiempo;
        ultimoTiempo = tiempoActual;
        // Evitar desbordamiento de delta durante scroll rápido o congelamiento temporal
        if (delta > 50) delta = 50;
        acumulador += delta;
        if (acumulador > 50) acumulador = 50;

        // Actualizar a velocidad fija
        while (acumulador >= intervaloFrame) {
            if (animacionActual) {
                animacionActual.principal.actualizar(1);
                if (animacionActual.extras) {
                    for (var i = 0; i < animacionActual.extras.length; i++) {
                        animacionActual.extras[i].actualizar(1);
                    }
                }
            }
            acumulador -= intervaloFrame;
        }

        // Dibujar
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (animacionActual) {
            animacionActual.principal.dibujar();
            if (animacionActual.extras) {
                for (var j = 0; j < animacionActual.extras.length; j++) {
                    animacionActual.extras[j].dibujar();
                }
            }
        }

        animFrameId = requestAnimationFrame(bucleAnimacion);
    }

    function pausar() {
        pausado = true;
        if (animFrameId) {
            cancelAnimationFrame(animFrameId);
            animFrameId = null;
        }
    }

    function reanudar() {
        if (pausado) {
            pausado = false;
            if (corriendo && animacionActual && !document.hidden) {
                ultimoTiempo = performance.now();
                if (!animFrameId) {
                    animFrameId = requestAnimationFrame(bucleAnimacion);
                }
            }
        }
    }

    function detener() {
        corriendo = false;
        pausado = false;
        if (animFrameId) {
            cancelAnimationFrame(animFrameId);
            animFrameId = null;
        }
        animacionActual = null;
        if (canvas) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            canvas.classList.remove('active');
        }
    }

    function estaActivo() {
        return corriendo;
    }

    return {
        iniciar: iniciar,
        detener: detener,
        pausar: pausar,
        reanudar: reanudar,
        estaActivo: estaActivo,
        prefersReducedMotion: prefersReducedMotion
    };
})();
