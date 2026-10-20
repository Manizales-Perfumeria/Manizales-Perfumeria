/* ========================================
   DECORACIONES SVG PREMIUM — Perfumería Manizales
   ======================================== */

var DecoracionesSVG = (function() {

    var HERO_DECOS = {
        halloween: (
            '<div class="hero-deco hero-deco--web" aria-hidden="true">' +
            '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">' +
            '<g stroke="rgba(192,132,252,0.65)" stroke-width="0.8" fill="none">' +
            '<line x1="100" y1="0" x2="100" y2="80"/><line x1="100" y1="0" x2="40" y2="30"/><line x1="100" y1="0" x2="160" y2="30"/>' +
            '<line x1="100" y1="0" x2="20" y2="70"/><line x1="100" y1="0" x2="180" y2="70"/><line x1="100" y1="0" x2="10" y2="120"/>' +
            '<line x1="100" y1="0" x2="190" y2="120"/><line x1="40" y1="30" x2="160" y2="30"/><line x1="20" y1="70" x2="180" y2="70"/>' +
            '<ellipse cx="100" cy="80" rx="70" ry="50" stroke-dasharray="4 6" opacity="0.5"/>' +
            '</g>' +
            '<circle cx="100" cy="82" r="4" fill="#c084fc" opacity="0.8"/>' +
            '<line x1="100" y1="86" x2="100" y2="110" stroke="rgba(192,132,252,0.5)" stroke-width="0.8"/>' +
            '</svg></div>' +
            '<div class="hero-deco hero-deco--web-tr" aria-hidden="true">' +
            '<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">' +
            '<g stroke="rgba(220,210,255,0.75)" stroke-width="1.2" fill="none">' +
            '<line x1="400" y1="0" x2="400" y2="200"/>' +
            '<line x1="400" y1="0" x2="340" y2="40"/>' +
            '<line x1="400" y1="0" x2="260" y2="70"/>' +
            '<line x1="400" y1="0" x2="200" y2="90"/>' +
            '<line x1="400" y1="0" x2="130" y2="100"/>' +
            '<line x1="400" y1="0" x2="80" y2="60"/>' +
            '<line x1="400" y1="0" x2="40" y2="130"/>' +
            '<line x1="400" y1="0" x2="10" y2="180"/>' +
            '<line x1="400" y1="0" x2="400" y2="130"/>' +
            '<path d="M340 40 Q370 80 400 130" stroke-dasharray="5 7" opacity="0.5"/>' +
            '<path d="M340 40 Q300 50 260 70" stroke-dasharray="5 7" opacity="0.5"/>' +
            '<path d="M260 70 Q230 80 200 90" stroke-dasharray="5 7" opacity="0.45"/>' +
            '<path d="M200 90 Q165 95 130 100" stroke-dasharray="5 7" opacity="0.45"/>' +
            '<path d="M340 40 Q280 65 200 90" stroke-dasharray="5 7" opacity="0.4"/>' +
            '<path d="M260 70 Q220 88 130 100" stroke-dasharray="5 7" opacity="0.4"/>' +
            '<path d="M130 100 Q105 80 80 60" stroke-dasharray="5 7" opacity="0.35"/>' +
            '<path d="M80 60 Q60 95 40 130" stroke-dasharray="5 7" opacity="0.35"/>' +
            '<path d="M40 130 Q25 155 10 180" stroke-dasharray="5 7" opacity="0.3"/>' +
            '<path d="M300 100 Q350 140 400 200" stroke-dasharray="5 7" opacity="0.35"/>' +
            '<path d="M200 90 Q300 130 400 200" stroke-dasharray="5 7" opacity="0.3"/>' +
            '<path d="M130 100 Q265 145 400 200" stroke-dasharray="5 7" opacity="0.25"/>' +
            '<path d="M80 60 Q240 110 400 200" stroke-dasharray="5 7" opacity="0.25"/>' +
            '<path d="M350 65 Q375 100 395 155" stroke-dasharray="4 6" opacity="0.4"/>' +
            '<path d="M290 80 Q330 120 370 180" stroke-dasharray="4 6" opacity="0.35"/>' +
            '<path d="M220 88 Q280 130 350 200" stroke-dasharray="4 6" opacity="0.3"/>' +
            '<path d="M150 95 Q220 135 310 200" stroke-dasharray="4 6" opacity="0.25"/>' +
            '<path d="M380 30 Q390 60 400 110" stroke-dasharray="4 6" opacity="0.4"/>' +
            '<path d="M360 50 Q380 90 400 160" stroke-dasharray="4 6" opacity="0.3"/>' +
            '<path d="M310 60 Q345 100 385 180" stroke-dasharray="4 6" opacity="0.25"/>' +
            '<path d="M240 70 Q295 115 365 200" stroke-dasharray="4 6" opacity="0.2"/>' +
            '</g>' +
            '</svg></div>' +
            '<div class="hero-deco hero-deco--pumpkin" aria-hidden="true">' +
            '<svg viewBox="0 0 200 110" xmlns="http://www.w3.org/2000/svg">' +
            '<defs>' +
            '<radialGradient id="pk-flame" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#ffffff"/><stop offset="30%" stop-color="#ffe066"/><stop offset="75%" stop-color="#ff9800"/><stop offset="100%" stop-color="#e65100"/></radialGradient>' +
            '<radialGradient id="pk-glow-aura" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#ff9800" stop-opacity="0.8"/><stop offset="50%" stop-color="#ff9800" stop-opacity="0.25"/><stop offset="100%" stop-color="#ff9800" stop-opacity="0"/></radialGradient>' +
            '</defs>' +
            // Calabaza grande de atras
            '<g transform="translate(104,26) scale(0.82)">' +
            '<ellipse cx="40" cy="50" rx="32" ry="21" fill="url(#pk-glow-aura)" class="pk-aura-glow" style="animation-delay:0.4s;"/>' +
            '<path d="M40 24 C20 24 9 35 9 50 C9 64 22 73 40 73 C58 73 71 64 71 50 C71 35 60 24 40 24Z" fill="#150a24"/>' +
            '<path d="M26 27 C22 37 21 60 26 69" stroke="#0d0615" stroke-width="1.6" fill="none" opacity="0.55"/>' +
            '<path d="M40 24 C38 38 38 60 40 73" stroke="#0d0615" stroke-width="1.6" fill="none" opacity="0.55"/>' +
            '<path d="M54 27 C58 37 59 60 54 69" stroke="#0d0615" stroke-width="1.6" fill="none" opacity="0.55"/>' +
            '<path d="M37 8 C42 4 48 6 48 12 L40 13Z" fill="#3a6b2a"/>' +
            '<path d="M45 10 C51 8 55 11 52 15" stroke="#3a6b2a" stroke-width="2.4" fill="none" stroke-linecap="round"/>' +
            '<polygon points="24,39 37,39 30,51" fill="url(#pk-flame)" class="pk-eye-glow" style="animation-delay:0.4s;"/>' +
            '<polygon points="47,39 60,39 53,51" fill="url(#pk-flame)" class="pk-eye-glow" style="animation-delay:0.4s;"/>' +
            '<polygon points="38,53 43,53 40.5,59" fill="url(#pk-flame)" class="pk-eye-glow" style="animation-delay:0.4s;"/>' +
            '<path d="M23 62 Q29 70 35 65 Q39 61 43 65 Q49 70 56 62 Q49 68 42 64 Q33 68 23 62Z" fill="url(#pk-flame)" class="pk-eye-glow" style="animation-delay:0.4s;"/>' +
            '</g>' +
            // Calabaza grande de adelante
            '<g transform="translate(6,8)">' +
            '<ellipse cx="44" cy="54" rx="40" ry="27" fill="url(#pk-glow-aura)" class="pk-aura-glow"/>' +
            '<path d="M44 22 C20 22 7 35 7 54 C7 72 24 86 44 86 C64 86 81 72 81 54 C81 35 68 22 44 22Z" fill="#150a24"/>' +
            '<path d="M26 25 C20 38 18 68 26 80" stroke="#0d0615" stroke-width="2" fill="none" opacity="0.6"/>' +
            '<path d="M44 22 C42 40 42 70 44 86" stroke="#0d0615" stroke-width="2" fill="none" opacity="0.6"/>' +
            '<path d="M62 25 C68 38 70 68 62 80" stroke="#0d0615" stroke-width="2" fill="none" opacity="0.6"/>' +
            // brillo del borde, para que se recorte bien contra el fondo oscuro
            '<path d="M44 22 C20 22 7 35 7 54" stroke="#3b1f5c" stroke-width="1.6" fill="none" opacity="0.8"/>' +
            '<path d="M44 22 C68 22 81 35 81 54" stroke="#3b1f5c" stroke-width="1.6" fill="none" opacity="0.8"/>' +
            // tallo
            '<path d="M37 5 C42 0 50 3 48 12 L41 13Z" fill="#3a6b2a"/>' +
            '<path d="M46 8 C54 5 59 9 55 14" stroke="#3a6b2a" stroke-width="3" fill="none" stroke-linecap="round"/>' +
            // ojos
            '<polygon points="25,38 41,38 33,53" fill="url(#pk-flame)" class="pk-eye-glow"/>' +
            '<polygon points="55,38 71,38 63,53" fill="url(#pk-flame)" class="pk-eye-glow"/>' +
            '<polygon points="42,56 48,56 45,63" fill="url(#pk-flame)" class="pk-eye-glow"/>' +
            // sonrisa dentada
            '<path d="M19 68 Q27 78 35 71 Q41 66 47 71 Q55 78 68 66 Q56 76 46 70 Q32 77 19 68Z" fill="url(#pk-flame)" class="pk-eye-glow"/>' +
            '</g>' +
            '</svg></div>' +
            '<div class="hero-deco hero-deco--web-2" aria-hidden="true">' +
            '<svg viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg">' +
            '<g stroke="rgba(192,132,252,0.5)" stroke-width="0.8" fill="none">' +
            '<line x1="0" y1="0" x2="0" y2="60"/><line x1="0" y1="0" x2="45" y2="15"/><line x1="0" y1="0" x2="90" y2="0"/>' +
            '<line x1="0" y1="0" x2="20" y2="90"/><line x1="0" y1="0" x2="60" y2="45"/>' +
            '<path d="M0 20 Q25 25 45 15" stroke-dasharray="3 5" opacity="0.6"/>' +
            '<path d="M0 45 Q35 50 60 45" stroke-dasharray="3 5" opacity="0.55"/>' +
            '<path d="M0 70 Q45 78 90 60" stroke-dasharray="3 5" opacity="0.5"/>' +
            '</g>' +
            '</svg></div>' +
            '<div class="hero-deco hero-deco--spider-hang" aria-hidden="true">' +
            '<svg viewBox="0 0 60 220" xmlns="http://www.w3.org/2000/svg">' +
            '<line x1="30" y1="-120" x2="30" y2="120" stroke="rgba(220,205,255,0.45)" stroke-width="1.2"/>' +
            '<g transform="translate(30,120)">' +
            '<g stroke="#15121e" stroke-width="1.6" stroke-linecap="round">' +
            '<line x1="0" y1="0" x2="-13" y2="-9"/>' +
            '<line x1="0" y1="0" x2="-15" y2="1"/>' +
            '<line x1="0" y1="0" x2="-12" y2="10"/>' +
            '<line x1="0" y1="0" x2="13" y2="-9"/>' +
            '<line x1="0" y1="0" x2="15" y2="1"/>' +
            '<line x1="0" y1="0" x2="12" y2="10"/>' +
            '</g>' +
            '<ellipse cx="0" cy="7" rx="7" ry="8" fill="#15121e"/>' +
            '<ellipse cx="0" cy="-5" rx="4.5" ry="4.8" fill="#15121e"/>' +
            '<circle cx="-1.8" cy="-6" r="1" fill="#ff4d4d"/><circle cx="1.8" cy="-6" r="1" fill="#ff4d4d"/>' +
            '</g>' +
            '</svg></div>'
        ),
        navidad: (
            '<div class="hero-deco hero-deco--bells" aria-hidden="true">' +
            '<svg viewBox="0 0 100 80" xmlns="http://www.w3.org/2000/svg">' +
            '<g transform="translate(50,40)">' +
            '<path d="M0 0 C-15 -5 -20 10 -20 25 C-20 35 -12 40 0 42 C12 40 20 35 20 25 C20 10 15 -5 0 0Z" fill="#c9a96e" opacity="0.7"/>' +
            '<circle cx="0" cy="42" r="4" fill="#c9a96e" opacity="0.7"/>' +
            '<path d="M-5 -5 Q0 -15 5 -5" stroke="#e6483a" stroke-width="2.5" fill="none" stroke-linecap="round"/>' +
            '<ellipse cx="0" cy="18" rx="8" ry="3" fill="none" stroke="#b8860b" stroke-width="0.8" opacity="0.5"/>' +
            '</g>' +
            '</svg></div>'
        ),
        sanvalentin: (
            '<div class="hero-deco hero-deco--rose" aria-hidden="true">' +
            '<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">' +
            '<path d="M50 30 C35 15 15 25 20 45 C10 55 15 75 35 80 C40 95 60 95 65 80 C85 75 90 55 80 45 C85 25 65 15 50 30Z" fill="none" stroke="rgba(236,72,153,0.5)" stroke-width="1.2"/>' +
            '<path d="M50 80 L50 110" stroke="rgba(201,169,110,0.4)" stroke-width="1"/>' +
            '<path d="M50 90 C40 85 30 88 28 95" stroke="rgba(201,169,110,0.3)" stroke-width="0.8" fill="none"/>' +
            '<circle cx="38" cy="38" r="6" fill="rgba(236,72,153,0.15)"/><circle cx="62" cy="38" r="6" fill="rgba(236,72,153,0.15)"/>' +
            '<circle cx="50" cy="55" r="8" fill="rgba(236,72,153,0.12)"/>' +
            '</svg></div>'
        ),
        diamadre: (
            '<div class="hero-deco hero-deco--floral" aria-hidden="true">' +
            '<svg viewBox="0 0 110 130" xmlns="http://www.w3.org/2000/svg">' +
            '<path d="M55 120 L55 70" stroke="rgba(201,169,110,0.35)" stroke-width="1"/>' +
            '<ellipse cx="55" cy="55" rx="18" ry="22" fill="none" stroke="rgba(255,183,197,0.45)" stroke-width="1"/>' +
            '<ellipse cx="40" cy="48" rx="12" ry="16" fill="none" stroke="rgba(255,183,197,0.35)" stroke-width="0.8" transform="rotate(-30 40 48)"/>' +
            '<ellipse cx="70" cy="48" rx="12" ry="16" fill="none" stroke="rgba(255,183,197,0.35)" stroke-width="0.8" transform="rotate(30 70 48)"/>' +
            '<ellipse cx="48" cy="68" rx="10" ry="14" fill="none" stroke="rgba(255,183,197,0.3)" stroke-width="0.8" transform="rotate(-15 48 68)"/>' +
            '<ellipse cx="62" cy="68" rx="10" ry="14" fill="none" stroke="rgba(255,183,197,0.3)" stroke-width="0.8" transform="rotate(15 62 68)"/>' +
            '<circle cx="55" cy="55" r="5" fill="#c9a96e" opacity="0.6"/>' +
            '</svg></div>'
        ),
        amorYamistad: (
            '<div class="hero-deco hero-deco--amistad" aria-hidden="true">' +
            '<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">' +
            '<g transform="translate(60,60)">' +
            '<path d="M0 -15 C-8 -25 -22 -22 -22 -10 C-22 0 0 18 0 18 C0 18 22 0 22 -10 C22 -22 8 -25 0 -15Z" fill="none" stroke="rgba(251,191,36,0.55)" stroke-width="1.5"/>' +
            '</g>' +
            '<circle cx="28" cy="28" r="4" fill="rgba(251,191,36,0.15)"/>' +
            '<circle cx="92" cy="35" r="3" fill="rgba(251,191,36,0.12)"/>' +
            '<circle cx="60" cy="95" r="5" fill="rgba(251,191,36,0.1)"/>' +
            '<path d="M20 80 Q30 65 45 72 T60 68" stroke="rgba(251,191,36,0.25)" stroke-width="0.8" fill="none"/>' +
            '</svg></div>'
        ),
        blackfriday: (
            '<div class="hero-deco hero-deco--patron" aria-hidden="true">' +
            '<svg viewBox="0 0 140 90" xmlns="http://www.w3.org/2000/svg">' +
            '<g fill="none" stroke="rgba(234,179,8,0.4)" stroke-width="1.2">' +
            '<polygon points="70,15 82,45 115,45 88,63 98,95 70,75 42,95 52,63 25,45 58,45"/>' +
            '</g>' +
            '</svg></div>'
        ),

        diapadre: (
            '<div class="hero-deco hero-deco--laurel" aria-hidden="true">' +
            '<svg viewBox="0 0 140 80" xmlns="http://www.w3.org/2000/svg">' +
            '<path d="M10 50 Q70 10 130 50" stroke="rgba(201,169,110,0.45)" stroke-width="1.2" fill="none"/>' +
            '<path d="M10 50 Q70 70 130 50" stroke="rgba(201,169,110,0.3)" stroke-width="0.8" fill="none"/>' +
            '<ellipse cx="30" cy="42" rx="8" ry="4" fill="rgba(201,169,110,0.2)" transform="rotate(-30 30 42)"/>' +
            '<ellipse cx="50" cy="32" rx="8" ry="4" fill="rgba(201,169,110,0.2)" transform="rotate(-15 50 32)"/>' +
            '<ellipse cx="70" cy="28" rx="8" ry="4" fill="rgba(201,169,110,0.25)"/>' +
            '<ellipse cx="90" cy="32" rx="8" ry="4" fill="rgba(201,169,110,0.2)" transform="rotate(15 90 32)"/>' +
            '<ellipse cx="110" cy="42" rx="8" ry="4" fill="rgba(201,169,110,0.2)" transform="rotate(30 110 42)"/>' +
            '<ellipse cx="30" cy="58" rx="8" ry="4" fill="rgba(201,169,110,0.15)" transform="rotate(30 30 58)"/>' +
            '<ellipse cx="110" cy="58" rx="8" ry="4" fill="rgba(201,169,110,0.15)" transform="rotate(-30 110 58)"/>' +
            '</svg></div>'
        )
    };

    function getHeroDeco(eventId) {
        return HERO_DECOS[eventId] || '';
    }

    /* ========================================
       ESCENAS DE FONDO — capa ambiental completa
       ======================================== */

    /* Elementos reutilizables. La escena de PC es panoramica (1600x900) y
       reparte los sujetos a los lados: la mansion vive entre x=1040 y x=1335
       y la luna en x=230. En un celular (hero de ~360x900) con
       preserveAspectRatio="slice" solo se ve el 22% central del lienzo, asi que
       luna y mansion quedan completamente fuera de pantalla.
       Por eso el mismo dibujo se reutiliza aqui: las escenas moviles envuelven
       estos grupos en un <g transform="translate() scale()"> para llevarlos al
       centro de un lienzo vertical. Una sola fuente de verdad para los dos. */
    var HW_MANSION =
        '<ellipse cx="150" cy="330" rx="190" ry="25" fill="url(#hw-light-spill)"/>' +
        '<!-- Ala izquierda -->' +
        '<rect x="20" y="140" width="110" height="185" fill="#0d0818"/>' +
        '<path d="M10 140 L75 75 L140 140Z" fill="#07040e"/>' +
        '<path d="M10 140 L75 75 L140 140" stroke="#1f1430" stroke-width="3" fill="none"/>' +
        '<line x1="75" y1="75" x2="75" y2="45" stroke="#7c3aed" stroke-width="2"/>' +
        '<!-- Torre Central Sólida -->' +
        '<rect x="110" y="80" width="90" height="245" fill="#120b20"/>' +
        '<path d="M95 80 L155 -15 L215 80Z" fill="#0a0514"/>' +
        '<line x1="155" y1="-15" x2="155" y2="-45" stroke="#c084fc" stroke-width="2"/>' +
        '<polygon points="155,-45 166,-40 155,-35" fill="#c084fc"/>' +
        '<!-- Ala derecha -->' +
        '<rect x="190" y="155" width="95" height="170" fill="#0a0614"/>' +
        '<path d="M180 155 L237 100 L295 155Z" fill="#06030c"/>' +
        // La chimenea sale de la pendiente derecha del ala. Antes iba pegada al
        // pico del tejado central y, con ese tono, se recortaba contra el cielo
        // como un bloque suelto al lado de la mansion. Ahora es mas fina, se
        // asienta en la pendiente y tiene un remate mas ancho.
        '<rect x="246" y="74" width="15" height="54" fill="#2e1d47"/>' +
        '<rect x="242" y="68" width="23" height="8" fill="#3d2860"/>' +
        '<!-- Puerta principal -->' +
        '<path d="M130 325 L130 255 Q155 235 180 255 L180 325Z" fill="#040208"/>' +
        '<ellipse cx="155" cy="250" rx="14" ry="10" fill="#f59e0b" opacity="0.6" class="hw-window-amber"/>' +
        '<!-- Ventana superior gótica torre -->' +
        '<path d="M140 145 L140 120 Q155 105 170 120 L170 145Z" fill="#c084fc" class="hw-window-purple"/>' +
        '<path d="M140 132 L170 132 M155 108 L155 145" stroke="#0a0514" stroke-width="1.8"/>' +
        '<!-- Ventanas ala izquierda iluminadas -->' +
        '<rect x="42" y="165" width="28" height="38" rx="2" fill="#f59e0b" class="hw-window-amber"/>' +
        '<path d="M42 184 L70 184 M56 165 L56 203" stroke="#120804" stroke-width="2"/>' +
        '<rect x="82" y="165" width="24" height="38" rx="2" fill="#c084fc" class="hw-window-purple"/>' +
        '<path d="M82 184 L106 184 M94 165 L94 203" stroke="#120804" stroke-width="2"/>' +
        '<rect x="45" y="235" width="30" height="42" rx="2" fill="#f59e0b" class="hw-window-amber"/>' +
        '<path d="M45 256 L75 256 M60 235 L60 277" stroke="#120804" stroke-width="2"/>' +
        '<!-- Ventana ala derecha iluminada -->' +
        '<rect x="215" y="185" width="28" height="38" rx="2" fill="#f59e0b" class="hw-window-amber"/>' +
        '<path d="M215 204 L243 204 M229 185 L229 223" stroke="#120804" stroke-width="2"/>';

    var HW_GRAVESTONES =
        '<path d="M860 815 L860 770 Q860 753 882 753 Q904 753 904 770 L904 815Z"/>' +
        '<rect x="935" y="788" width="32" height="27"/>' +
        '<path d="M990 815 L990 775 Q990 756 1012 756 Q1034 756 1034 775 L1034 815Z"/>';

    var HW_DEADTREE =
        '<g stroke="#0d0d16" stroke-width="6" fill="none" stroke-linecap="round" opacity="0.6">' +
        '<path d="M260 810 L260 660 Q260 630 230 600 M260 690 Q292 658 315 615 M260 730 Q228 708 195 690 M260 660 Q248 630 260 600"/>' +
        '</g>';

    // Casitas nevadas de Navidad (coordenadas de la escena panoramica)
    var XM_HOUSES =
        '<!-- Casa 1 -->' +
        '<rect x="180" y="670" width="110" height="110" fill="#181024" rx="2"/>' +
        '<path d="M165 670 L235 620 L305 670Z" fill="#120b1c"/>' +
        '<path d="M160 670 L235 615 L310 670" stroke="#f0f4f8" stroke-width="8" stroke-linecap="round" fill="none"/>' +
        '<rect x="270" y="610" width="18" height="35" fill="#2d1b2e"/>' +
        '<rect x="205" y="700" width="26" height="32" rx="3" fill="#ffe066" class="house-window-glow"/>' +
        '<path d="M205 716 L231 716 M218 700 L218 732" stroke="#2a1a08" stroke-width="2"/>' +
        '<rect x="248" y="700" width="26" height="32" rx="3" fill="#ffe066" class="house-window-glow"/>' +
        '<path d="M248 716 L274 716 M261 700 L261 732" stroke="#2a1a08" stroke-width="2"/>' +
        '<ellipse cx="238" cy="785" rx="65" ry="18" fill="url(#xm-snow-warm-glow)" class="house-light-spill"/>' +
        '<!-- Casa 2 -->' +
        '<rect x="330" y="640" width="95" height="140" fill="#140d20" rx="2"/>' +
        '<path d="M315 640 L378 580 L440 640Z" fill="#0d0816"/>' +
        '<path d="M310 640 L378 575 L445 640" stroke="#f0f4f8" stroke-width="8" stroke-linecap="round" fill="none"/>' +
        '<rect x="355" y="680" width="24" height="28" rx="2" fill="#ffd166" class="house-window-glow"/>' +
        '<path d="M355 694 L379 694 M367 680 L367 708" stroke="#2a1a08" stroke-width="1.8"/>' +
        '<ellipse cx="370" cy="785" rx="55" ry="15" fill="url(#xm-snow-warm-glow)" class="house-light-spill"/>' +
        '<!-- Casa 3 -->' +
        '<rect x="460" y="660" width="80" height="120" fill="#181024" rx="2"/>' +
        '<path d="M448 660 L500 610 L552 660Z" fill="#100a18"/>' +
        '<path d="M442 660 L500 605 L558 660" stroke="#f0f4f8" stroke-width="7" stroke-linecap="round" fill="none"/>' +
        '<rect x="480" y="695" width="22" height="26" rx="2" fill="#ffd166" class="house-window-glow"/>' +
        '<path d="M480 708 L502 708 M491 695 L491 721" stroke="#2a1a08" stroke-width="1.8"/>' +
        '<ellipse cx="495" cy="785" rx="50" ry="14" fill="url(#xm-snow-warm-glow)" class="house-light-spill"/>';

    // Arbol de Navidad con guirnaldas, estrella y bombillas (coordenadas panoramicas)
    var XM_TREE =
        '<rect x="1475" y="770" width="28" height="60" fill="#3d2b1a"/>' +
        '<path d="M1360 770 L1490 580 L1620 770Z" fill="#1a4d2e"/>' +
        '<path d="M1380 720 L1490 540 L1600 720Z" fill="#1f5c36"/>' +
        '<path d="M1405 670 L1490 500 L1575 670Z" fill="#247a3e"/>' +
        '<path d="M1430 620 L1490 465 L1550 620Z" fill="#2a8f45"/>' +
        '<!-- Guirnaldas de espumillón dorado -->' +
        '<path d="M1440 515 Q1490 535 1540 515" stroke="url(#xm-tinsel-gold)" stroke-width="2" fill="none" stroke-dasharray="2 4"/>' +
        '<path d="M1415 585 Q1490 620 1565 585" stroke="url(#xm-tinsel-gold)" stroke-width="2.2" fill="none" stroke-dasharray="2 4"/>' +
        '<path d="M1390 660 Q1490 705 1590 660" stroke="url(#xm-tinsel-gold)" stroke-width="2.4" fill="none" stroke-dasharray="2 4"/>' +
        '<path d="M1370 735 Q1490 780 1610 735" stroke="url(#xm-tinsel-gold)" stroke-width="2.6" fill="none" stroke-dasharray="2 4"/>' +
        '<!-- Estrella Radiante -->' +
        '<circle cx="1490" cy="465" r="28" fill="url(#xm-star-glow)" class="xm-tree-star-halo"/>' +
        '<polygon points="1490,446 1495,457 1507,459 1498,468 1501,480 1490,474 1479,480 1482,468 1473,459 1485,457" fill="#FFD700" class="xm-tree-star"/>' +
        '<circle cx="1490" cy="465" r="4" fill="#ffffff"/>' +
        '<!-- Bombillas con Halos de Luz Brillante -->' +
        '<circle cx="1410" cy="740" r="14" fill="url(#xm-halo-red)" class="xm-tree-bulb-halo"/>' +
        '<circle cx="1410" cy="740" r="4.5" class="xm-tree-bulb" fill="#ff4757"/>' +
        '<circle cx="1450" cy="700" r="14" fill="url(#xm-halo-green)" class="xm-tree-bulb-halo"/>' +
        '<circle cx="1450" cy="700" r="4.5" class="xm-tree-bulb" fill="#2ed573"/>' +
        '<circle cx="1490" cy="730" r="14" fill="url(#xm-halo-blue)" class="xm-tree-bulb-halo"/>' +
        '<circle cx="1490" cy="730" r="4.5" class="xm-tree-bulb" fill="#1e90ff"/>' +
        '<circle cx="1430" cy="665" r="14" fill="url(#xm-halo-white)" class="xm-tree-bulb-halo"/>' +
        '<circle cx="1430" cy="665" r="4.5" class="xm-tree-bulb" fill="#ffffff"/>' +
        '<circle cx="1470" cy="630" r="14" fill="url(#xm-halo-red)" class="xm-tree-bulb-halo"/>' +
        '<circle cx="1470" cy="630" r="4.5" class="xm-tree-bulb" fill="#ff4757"/>' +
        '<circle cx="1510" cy="660" r="14" fill="url(#xm-halo-green)" class="xm-tree-bulb-halo"/>' +
        '<circle cx="1510" cy="660" r="4.5" class="xm-tree-bulb" fill="#2ed573"/>' +
        '<circle cx="1450" cy="580" r="14" fill="url(#xm-halo-gold)" class="xm-tree-bulb-halo"/>' +
        '<circle cx="1450" cy="580" r="4.5" class="xm-tree-bulb" fill="#ffa502"/>' +
        '<circle cx="1490" cy="540" r="14" fill="url(#xm-halo-red)" class="xm-tree-bulb-halo"/>' +
        '<circle cx="1490" cy="540" r="4.5" class="xm-tree-bulb" fill="#ff4757"/>' +
        '<circle cx="1470" cy="505" r="12" fill="url(#xm-halo-green)" class="xm-tree-bulb-halo"/>' +
        '<circle cx="1470" cy="505" r="4" class="xm-tree-bulb" fill="#2ed573"/>' +
        '<circle cx="1510" cy="500" r="12" fill="url(#xm-halo-blue)" class="xm-tree-bulb-halo"/>' +
        '<circle cx="1510" cy="500" r="4" class="xm-tree-bulb" fill="#1e90ff"/>' +
        '<circle cx="1370" cy="762" r="14" fill="url(#xm-halo-gold)" class="xm-tree-bulb-halo"/>' +
        '<circle cx="1370" cy="762" r="4.5" class="xm-tree-bulb" fill="#ffa502"/>' +
        '<circle cx="1610" cy="755" r="14" fill="url(#xm-halo-green)" class="xm-tree-bulb-halo"/>' +
        '<circle cx="1610" cy="755" r="4.5" class="xm-tree-bulb" fill="#2ed573"/>' +
        '<circle cx="1530" cy="745" r="14" fill="url(#xm-halo-blue)" class="xm-tree-bulb-halo"/>' +
        '<circle cx="1530" cy="745" r="4.5" class="xm-tree-bulb" fill="#1e90ff"/>' +
        '<circle cx="1550" cy="712" r="14" fill="url(#xm-halo-white)" class="xm-tree-bulb-halo"/>' +
        '<circle cx="1550" cy="712" r="4.5" class="xm-tree-bulb" fill="#ffffff"/>' +
        '<circle cx="1400" cy="698" r="14" fill="url(#xm-halo-gold)" class="xm-tree-bulb-halo"/>' +
        '<circle cx="1400" cy="698" r="4.5" class="xm-tree-bulb" fill="#ffa502"/>' +
        '<circle cx="1540" cy="678" r="14" fill="url(#xm-halo-red)" class="xm-tree-bulb-halo"/>' +
        '<circle cx="1540" cy="678" r="4.5" class="xm-tree-bulb" fill="#ff4757"/>' +
        '<circle cx="1520" cy="618" r="12" fill="url(#xm-halo-green)" class="xm-tree-bulb-halo"/>' +
        '<circle cx="1520" cy="618" r="4" class="xm-tree-bulb" fill="#2ed573"/>' +
        '<circle cx="1445" cy="598" r="12" fill="url(#xm-halo-white)" class="xm-tree-bulb-halo"/>' +
        '<circle cx="1445" cy="598" r="4" class="xm-tree-bulb" fill="#ffffff"/>' +
        '<circle cx="1500" cy="558" r="12" fill="url(#xm-halo-gold)" class="xm-tree-bulb-halo"/>' +
        '<circle cx="1500" cy="558" r="4" class="xm-tree-bulb" fill="#ffa502"/>' +
        '<circle cx="1465" cy="528" r="12" fill="url(#xm-halo-red)" class="xm-tree-bulb-halo"/>' +
        '<circle cx="1465" cy="528" r="4" class="xm-tree-bulb" fill="#ff4757"/>';

    // Corazon de San Valentin (coordenadas de la escena panoramica)
    var SV_HEART =
        '<path d="M250 205 C185 150 145 165 145 118 C145 88 175 75 200 92 C215 102 225 112 250 145 C275 112 285 102 300 92 C325 75 355 88 355 118 C355 165 315 150 250 205Z" fill="#ec4899" opacity="0.85"/>' +
        '<path d="M250 205 C185 150 145 165 145 118 C145 88 175 75 200 92 C215 102 225 112 250 145 C275 112 285 102 300 92 C325 75 355 88 355 118 C355 165 315 150 250 205Z" fill="none" stroke="#fff" stroke-width="1.2" opacity="0.35"/>';

    // Mesa con velas y arreglo de rosas (coordenadas de la escena panoramica)
    var SV_TABLE =
        '<ellipse cx="140" cy="255" rx="180" ry="18" fill="#180a12"/>' +
        '<rect x="60" y="255" width="20" height="55" fill="#180a12"/><rect x="200" y="255" width="20" height="55" fill="#180a12"/>' +
        '<path d="M110 255 L100 190 Q100 175 120 175 L160 175 Q180 175 180 190 L170 255Z" fill="#1a0a14"/>' +
        '<path d="M130 178 Q125 140 110 100" stroke="#254d2e" stroke-width="3" fill="none"/>' +
        '<path d="M150 178 Q150 130 150 85" stroke="#254d2e" stroke-width="3" fill="none"/>' +
        '<path d="M168 178 Q172 140 185 105" stroke="#254d2e" stroke-width="3" fill="none"/>' +
        '<circle cx="108" cy="92" r="16" fill="#c2185b"/><circle cx="108" cy="92" r="9" fill="#f43f5e"/>' +
        '<circle cx="150" cy="78" r="18" fill="#c2185b"/><circle cx="150" cy="78" r="11" fill="#f43f5e"/>' +
        '<circle cx="188" cy="98" r="15" fill="#c2185b"/><circle cx="188" cy="98" r="8" fill="#f43f5e"/>' +
        '<!-- Vela Derecha con Llama Viva -->' +
        '<rect x="216" y="200" width="16" height="55" rx="2" fill="#2d121f"/>' +
        '<ellipse cx="224" cy="200" rx="32" ry="16" fill="url(#sv-candle-halo)" class="candle-halo"/>' +
        '<path d="M224 195 C218 184 218 174 224 162 C230 174 230 184 224 195Z" fill="url(#sv-flame)" class="candle-flame"/>' +
        '<!-- Vela Izquierda con Llama Viva -->' +
        '<rect x="52" y="215" width="16" height="40" rx="2" fill="#2d121f"/>' +
        '<ellipse cx="60" cy="215" rx="28" ry="14" fill="url(#sv-candle-halo)" class="candle-halo" style="animation-delay:0.5s;"/>' +
        '<path d="M60 210 C55 200 55 190 60 180 C65 190 65 200 60 210Z" fill="url(#sv-flame)" class="candle-flame" style="animation-delay:0.5s;"/>';

    // Arreglo floral en jarrón de cerámica (coordenadas de la escena panoramica)
    var DM_ARRANGEMENT =
        '<ellipse cx="120" cy="275" rx="100" ry="18" fill="rgba(30,10,20,0.6)"/>' +
        '<path d="M60 270 L45 195 Q40 165 70 160 L170 160 Q200 165 195 195 L180 270Z" fill="#2a1420"/>' +
        '<path d="M50 165 L190 165" stroke="#c9a96e" stroke-width="3" stroke-linecap="round"/>' +
        '<path d="M65 205 L175 205" stroke="rgba(201,169,110,0.35)" stroke-width="1.5"/>' +
        '<path d="M120 160 Q80 120 50 130 Q65 100 100 130Z" fill="#1b432a"/>' +
        '<path d="M120 160 Q160 120 190 130 Q175 100 140 130Z" fill="#1b432a"/>' +
        '<path d="M120 155 L120 75" stroke="#255d3a" stroke-width="4" stroke-linecap="round"/>' +
        '<g transform="translate(120, 75)">' +
        '<circle cx="0" cy="0" r="45" fill="url(#dm-bloom-glow)" class="flower-bloom-aura"/>' +
        '<circle cx="-16" cy="-12" r="18" fill="#fbcfe8" opacity="0.9"/>' +
        '<circle cx="16" cy="-12" r="18" fill="#fbcfe8" opacity="0.9"/>' +
        '<circle cx="-18" cy="10" r="16" fill="#f472b6" opacity="0.85"/>' +
        '<circle cx="18" cy="10" r="16" fill="#f472b6" opacity="0.85"/>' +
        '<circle cx="0" cy="18" r="17" fill="#fbcfe8" opacity="0.9"/>' +
        '<circle cx="-8" cy="-6" r="14" fill="#ffffff" opacity="0.95"/>' +
        '<circle cx="8" cy="-6" r="14" fill="#ffffff" opacity="0.95"/>' +
        '<circle cx="0" cy="6" r="13" fill="#ffe4e9"/>' +
        '<circle cx="0" cy="0" r="7" fill="#c9a96e"/>' +
        '<circle cx="0" cy="0" r="4" fill="#ffd700"/>' +
        '</g>' +
        '<g transform="translate(75, 115)">' +
        '<circle cx="0" cy="0" r="28" fill="url(#dm-bloom-glow)"/>' +
        '<circle cx="0" cy="0" r="18" fill="#f472b6" opacity="0.9"/>' +
        '<circle cx="0" cy="0" r="12" fill="#fbcfe8"/>' +
        '<circle cx="0" cy="0" r="5" fill="#c9a96e"/>' +
        '</g>' +
        '<g transform="translate(165, 115)">' +
        '<circle cx="0" cy="0" r="28" fill="url(#dm-bloom-glow)"/>' +
        '<circle cx="0" cy="0" r="18" fill="#f472b6" opacity="0.9"/>' +
        '<circle cx="0" cy="0" r="12" fill="#fbcfe8"/>' +
        '<circle cx="0" cy="0" r="5" fill="#c9a96e"/>' +
        '</g>';

    // Cabaña campestre (coordenadas de la escena panoramica)
    var DP_CABIN =
        '<rect x="20" y="85" width="160" height="110" fill="#1c1408" rx="2"/>' +
        '<path d="M8 85 L100 20 L192 85Z" fill="#100a04"/>' +
        '<path d="M5 85 L100 16 L195 85" stroke="#2d1e0c" stroke-width="5" stroke-linecap="round" fill="none"/>' +
        '<rect x="150" y="25" width="22" height="55" fill="#2d1e0c"/>' +
        '<path d="M161 20 Q150 0 165 -20 Q180 -40 170 -60" stroke="rgba(240,220,180,0.4)" stroke-width="4" fill="none" stroke-linecap="round"/>' +
        '<rect x="35" y="130" width="36" height="65" fill="#0d0803"/>' +
        '<line x1="20" y1="130" x2="80" y2="130" stroke="#c9a96e" stroke-width="2"/>' +
        '<rect x="95" y="105" width="35" height="35" rx="3" fill="#ffb703" class="dp-window-glow"/>' +
        '<path d="M95 122 L130 122 M112 105 L112 140" stroke="#120c04" stroke-width="2"/>' +
        '<rect x="142" y="105" width="25" height="35" rx="3" fill="#ffb703" class="dp-window-glow"/>' +
        '<path d="M142 122 L167 122 M154 105 L154 140" stroke="#120c04" stroke-width="2"/>' +
        '<ellipse cx="120" cy="195" rx="60" ry="14" fill="url(#dp-sun-glow)" opacity="0.6"/>';

    var HERO_SCENES = {
        halloween: (
            '<svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">' +
            '<defs>' +
            '<radialGradient id="hw-moon-glow" cx="50%" cy="50%" r="50%">' +
            '<stop offset="0%" stop-color="#e9d8ff" stop-opacity="0.6"/><stop offset="45%" stop-color="#a78bfa" stop-opacity="0.2"/><stop offset="100%" stop-color="#a78bfa" stop-opacity="0"/></radialGradient>' +
            '<radialGradient id="hw-light-spill" cx="50%" cy="50%" r="50%">' +
            '<stop offset="0%" stop-color="#f59e0b" stop-opacity="0.35"/><stop offset="100%" stop-color="#f59e0b" stop-opacity="0"/></radialGradient>' +
            '</defs>' +
            '<g class="scene-stars">' +
            '<circle cx="120" cy="90" r="1.6" fill="#fff" opacity="0.55"/><circle cx="260" cy="160" r="1.2" fill="#fff" opacity="0.4"/>' +
            '<circle cx="400" cy="70" r="1.8" fill="#fff" opacity="0.6"/><circle cx="550" cy="200" r="1.3" fill="#fff" opacity="0.45"/>' +
            '<circle cx="700" cy="110" r="1.5" fill="#fff" opacity="0.5"/><circle cx="900" cy="60" r="1.2" fill="#fff" opacity="0.4"/>' +
            '<circle cx="1080" cy="90" r="1.6" fill="#fff" opacity="0.5"/><circle cx="1520" cy="70" r="1.3" fill="#fff" opacity="0.45"/>' +
            '<circle cx="1450" cy="150" r="1.7" fill="#fff" opacity="0.55"/><circle cx="1560" cy="40" r="1.2" fill="#fff" opacity="0.4"/>' +
            '</g>' +
            '<circle cx="230" cy="105" r="150" fill="url(#hw-moon-glow)"/>' +
            '<circle cx="230" cy="105" r="52" fill="#f3e8ff" opacity="0.9"/>' +
            '<circle cx="214" cy="90" r="52" fill="#1a0a2e" opacity="0.35"/>' +
            '<path d="M0 720 Q200 680 400 715 T800 705 T1200 715 T1600 700 L1600 900 L0 900Z" fill="#120818" opacity="0.55"/>' +
            HW_DEADTREE +
            '<!-- MANSIÓN GÓTICA COMPLETA Y ESTRUCTURADA -->' +
            '<g class="hw-mansion" transform="translate(1040,490)" opacity="0.97">' +
            HW_MANSION +
            '</g>' +
            '<g fill="#0d0d16" opacity="0.7">' +
            HW_GRAVESTONES +
            '</g>' +
            '<path d="M0 780 Q220 750 460 778 T900 768 T1600 780 L1600 900 L0 900Z" fill="#0c0510" opacity="0.7"/>' +
            '</svg>'
        ),
        navidad: (
            '<svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">' +
            '<defs>' +
            '<linearGradient id="xm-aurora1" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#c9a96e" stop-opacity="0.22"/><stop offset="100%" stop-color="#c9a96e" stop-opacity="0"/></linearGradient>' +
            '<linearGradient id="xm-aurora2" x1="1" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#7dd3c0" stop-opacity="0.14"/><stop offset="100%" stop-color="#7dd3c0" stop-opacity="0"/></linearGradient>' +
            '<radialGradient id="xm-star-glow" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#FFD700" stop-opacity="0.95"/><stop offset="40%" stop-color="#FFD700" stop-opacity="0.5"/><stop offset="100%" stop-color="#FFD700" stop-opacity="0"/></radialGradient>' +
            '<radialGradient id="xm-tree-ambient" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#ffd700" stop-opacity="0.45"/><stop offset="40%" stop-color="#2ecc71" stop-opacity="0.2"/><stop offset="100%" stop-color="#2ecc71" stop-opacity="0"/></radialGradient>' +
            '<radialGradient id="xm-halo-red" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#ff4757" stop-opacity="0.95"/><stop offset="35%" stop-color="#ff4757" stop-opacity="0.45"/><stop offset="100%" stop-color="#ff4757" stop-opacity="0"/></radialGradient>' +
            '<radialGradient id="xm-halo-green" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#2ed573" stop-opacity="0.95"/><stop offset="35%" stop-color="#2ed573" stop-opacity="0.45"/><stop offset="100%" stop-color="#2ed573" stop-opacity="0"/></radialGradient>' +
            '<radialGradient id="xm-halo-blue" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#1e90ff" stop-opacity="0.95"/><stop offset="35%" stop-color="#1e90ff" stop-opacity="0.45"/><stop offset="100%" stop-color="#1e90ff" stop-opacity="0"/></radialGradient>' +
            '<radialGradient id="xm-halo-gold" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#ffa502" stop-opacity="0.95"/><stop offset="35%" stop-color="#ffa502" stop-opacity="0.45"/><stop offset="100%" stop-color="#ffa502" stop-opacity="0"/></radialGradient>' +
            '<radialGradient id="xm-halo-white" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#ffffff" stop-opacity="0.95"/><stop offset="35%" stop-color="#ffffff" stop-opacity="0.5"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></radialGradient>' +
            '<linearGradient id="xm-tinsel-gold" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#ffd700" stop-opacity="0.4"/><stop offset="50%" stop-color="#ffffff" stop-opacity="0.85"/><stop offset="100%" stop-color="#ffd700" stop-opacity="0.4"/></linearGradient>' +
            '<linearGradient id="xm-snow-far" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#4a4a4e" stop-opacity="0.95"/><stop offset="100%" stop-color="#6e6e73" stop-opacity="0.97"/></linearGradient>' +
                '<linearGradient id="xm-snow-mid" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#87878c" stop-opacity="0.9"/><stop offset="55%" stop-color="#cfcfd3" stop-opacity="0.92"/><stop offset="100%" stop-color="#f2f2f4" stop-opacity="0.95"/></linearGradient>' +
                '<radialGradient id="xm-snow-warm-glow" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#f6d365" stop-opacity="0.5"/><stop offset="60%" stop-color="#f6d365" stop-opacity="0.15"/><stop offset="100%" stop-color="#f6d365" stop-opacity="0"/></radialGradient>' +
            '<radialGradient id="xm-snow-cool-glow" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#ffffff" stop-opacity="0.3"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></radialGradient>' +
            '</defs>' +

            '<path d="M0 0 Q400 120 800 30 T1600 90 L1600 350 Q1200 250 800 320 T0 300Z" fill="url(#xm-aurora1)"/>' +
            '<path d="M1600 0 Q1200 140 800 60 T0 110 L0 300 Q400 220 800 280 T1600 260Z" fill="url(#xm-aurora2)"/>' +

            '<g class="scene-stars">' +
            '<circle cx="120" cy="60" r="1.6" fill="#fff" opacity="0.6"/><circle cx="260" cy="130" r="1.2" fill="#fff" opacity="0.4"/>' +
            '<circle cx="400" cy="50" r="1.8" fill="#fff" opacity="0.65"/><circle cx="550" cy="180" r="1.3" fill="#fff" opacity="0.45"/>' +
            '<circle cx="700" cy="90" r="1.5" fill="#fff" opacity="0.5"/><circle cx="900" cy="45" r="1.2" fill="#fff" opacity="0.4"/>' +
            '<circle cx="1080" cy="75" r="1.6" fill="#fff" opacity="0.5"/><circle cx="1250" cy="130" r="1.4" fill="#fff" opacity="0.55"/>' +
            '<circle cx="1400" cy="55" r="1.7" fill="#fff" opacity="0.6"/><circle cx="1520" cy="120" r="1.2" fill="#fff" opacity="0.4"/>' +
            '</g>' +

            '<!-- CASITAS CON ILUMINACIÓN REALISTA -->' +
            '<g class="xm-houses" opacity="0.95">' +
            XM_HOUSES +
            '</g>' +

            '<!-- ÁRBOL CON ILUMINACIÓN RADIAL Y GUIRNALDAS -->' +
            '<ellipse cx="1490" cy="650" rx="190" ry="170" fill="url(#xm-tree-ambient)"/>' +
            '<g class="xm-tree">' +
            XM_TREE +
            '</g>' +

            '<!-- REGALOS EN VUELTOS CON LAZOS Y CINTAS 3D -->' +
            '<g class="xm-gifts">' +
            '<!-- Regalo 1 (Rojo Rubí con Lazo Dorado) -->' +
            '<rect x="1350" y="785" width="46" height="42" rx="3" fill="#c0392b"/>' +
            '<rect x="1369" y="785" width="8" height="42" fill="#ffd700"/>' +
            '<rect x="1350" y="802" width="46" height="8" fill="#ffd700"/>' +
            '<path d="M1373 785 C1360 770 1354 780 1371 785 M1373 785 C1386 770 1392 780 1375 785" stroke="#ffeaa7" stroke-width="2.5" fill="#f39c12"/>' +
            '<circle cx="1373" cy="785" r="2.8" fill="#fff"/>' +
            '<path d="M1373 785 Q1364 796 1358 805 M1373 785 Q1382 796 1388 805" stroke="#ffd700" stroke-width="1.8" fill="none"/>' +

            '<!-- Regalo 2 (Verde Esmeralda con Cinta Roja) -->' +
            '<rect x="1406" y="792" width="38" height="36" rx="3" fill="#1b4d3e"/>' +
            '<rect x="1421" y="792" width="7" height="36" fill="#e74c3c"/>' +
            '<rect x="1406" y="807" width="38" height="7" fill="#e74c3c"/>' +
            '<path d="M1425 792 C1414 780 1410 788 1423 792 M1425 792 C1436 780 1440 788 1427 792" stroke="#ff7675" stroke-width="2.2" fill="#d63031"/>' +
            '<circle cx="1425" cy="792" r="2.5" fill="#fff"/>' +

            '<!-- Regalo 3 (Dorado Champagne con Cinta Azul Real) -->' +
            '<rect x="1452" y="778" width="48" height="48" rx="3" fill="#d4af37"/>' +
            '<rect x="1472" y="778" width="8" height="48" fill="#1e3799"/>' +
            '<rect x="1452" y="798" width="48" height="8" fill="#1e3799"/>' +
            '<path d="M1476 778 C1462 764 1458 774 1474 778 M1476 778 C1490 764 1494 774 1478 778" stroke="#4a69bd" stroke-width="2.8" fill="#0c2461"/>' +
            '<circle cx="1476" cy="778" r="3" fill="#fff"/>' +
            '<path d="M1476 778 Q1466 790 1460 802 M1476 778 Q1486 790 1492 802" stroke="#1e3799" stroke-width="2" fill="none"/>' +

            '<!-- Regalo 4 (Púrpura Imperial con Cinta Dorada) -->' +
            '<rect x="1508" y="794" width="34" height="34" rx="3" fill="#4834d4"/>' +
            '<rect x="1522" y="794" width="6" height="34" fill="#ffd700"/>' +
            '<rect x="1508" y="808" width="34" height="6" fill="#ffd700"/>' +
            '<path d="M1525 794 C1516 784 1512 791 1523 794 M1525 794 C1534 784 1538 791 1527 794" stroke="#f6e58d" stroke-width="2" fill="#f9ca24"/>' +
            '<circle cx="1525" cy="794" r="2.2" fill="#fff"/>' +
            '</g>' +

            '<g class="xm-snow-floor">' +
            '<path d="M0 800 Q80 782 140 780 L670 780 Q800 783 930 798 Q1080 818 1220 828 Q1300 830 1360 830 L1600 830 L1600 900 L0 900Z" fill="url(#xm-snow-far)"/>' +
            '<path d="M0 828 Q90 811 140 810 L670 810 Q800 813 930 828 Q1080 848 1220 858 Q1300 860 1360 860 L1600 860 L1600 900 L0 900Z" fill="url(#xm-snow-mid)"/>' +
            '<path d="M0 856 Q100 841 140 840 L670 840 Q800 843 930 858 Q1080 878 1220 888 Q1300 890 1360 890 L1600 890 L1600 900 L0 900Z" fill="url(#xm-snow-near)"/>' +
            '<ellipse cx="250" cy="850" rx="90" ry="14" fill="url(#xm-snow-cool-glow)"/>' +
            '<ellipse cx="560" cy="838" rx="110" ry="16" fill="url(#xm-snow-cool-glow)"/>' +
            '<ellipse cx="980" cy="868" rx="130" ry="18" fill="url(#xm-snow-cool-glow)"/>' +
            '<ellipse cx="1490" cy="835" rx="120" ry="20" fill="url(#xm-snow-cool-glow)"/>' +
            '</g>' +
            '</svg>'
        ),
        sanvalentin: (
            '<svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">' +
            '<defs>' +
            '<radialGradient id="sv-heart-glow" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#f9a8d4" stop-opacity="0.6"/><stop offset="45%" stop-color="#ec4899" stop-opacity="0.2"/><stop offset="100%" stop-color="#ec4899" stop-opacity="0"/></radialGradient>' +
            '<radialGradient id="sv-candle-halo" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#ffd56b" stop-opacity="0.9"/><stop offset="50%" stop-color="#ff9a3c" stop-opacity="0.3"/><stop offset="100%" stop-color="#ff9a3c" stop-opacity="0"/></radialGradient>' +
            '<linearGradient id="sv-flame" x1="0" y1="1" x2="0" y2="0"><stop offset="0%" stop-color="#ff5722"/><stop offset="40%" stop-color="#ffb300"/><stop offset="80%" stop-color="#fff9c4"/><stop offset="100%" stop-color="#ffffff"/></linearGradient>' +
            '<radialGradient id="sv-orb-pink" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#ec4899" stop-opacity="0.25"/><stop offset="100%" stop-color="#ec4899" stop-opacity="0"/></radialGradient>' +
            '</defs>' +
            '<circle cx="220" cy="180" r="120" fill="url(#sv-orb-pink)"/>' +
            '<circle cx="1500" cy="90" r="130" fill="url(#sv-orb-pink)"/>' +
            '<g class="scene-stars">' +
            '<circle cx="140" cy="90" r="1.5" fill="#ffd7e8" opacity="0.5"/><circle cx="320" cy="150" r="1.1" fill="#fff" opacity="0.4"/>' +
            '<circle cx="500" cy="70" r="1.6" fill="#ffd7e8" opacity="0.55"/><circle cx="660" cy="180" r="1.2" fill="#fff" opacity="0.4"/>' +
            '<circle cx="900" cy="60" r="1.4" fill="#ffd7e8" opacity="0.5"/><circle cx="1080" cy="130" r="1.2" fill="#fff" opacity="0.4"/>' +
            '</g>' +
            '<circle cx="250" cy="140" r="170" fill="url(#sv-heart-glow)"/>' +
            SV_HEART +
            '<path d="M0 800 Q220 770 460 795 T900 780 T1600 790 L1600 900 L0 900Z" fill="#180a12" opacity="0.7"/>' +
            '<!-- MESA CON VELAS ROMÁNTICAS Y ARREGLO DE ROSAS -->' +
            '<g transform="translate(1120,560)" opacity="0.95">' +
            SV_TABLE +
            '</g>' +
            '</svg>'
        ),
        pascua: (
            '<svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">' +
            '<defs>' +
            '<linearGradient id="ps-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#2a1f30" stop-opacity="0"/><stop offset="100%" stop-color="#c9a9d9" stop-opacity="0.16"/></linearGradient>' +
            '<radialGradient id="ps-dawn-glow" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#fdf4e3" stop-opacity="0.55"/><stop offset="45%" stop-color="#c9a9d9" stop-opacity="0.2"/><stop offset="100%" stop-color="#c9a9d9" stop-opacity="0"/></radialGradient>' +
            '</defs>' +
            '<rect x="0" y="0" width="1600" height="640" fill="url(#ps-sky)"/>' +
            '<circle cx="800" cy="660" r="320" fill="url(#ps-dawn-glow)"/>' +
            '<path d="M500 660 A300 300 0 0 1 1100 660" stroke="rgba(253,244,227,0.35)" stroke-width="2" fill="none"/>' +
            '<path d="M0 780 Q200 750 400 775 Q600 800 800 770 Q1000 745 1200 775 Q1400 800 1600 770 L1600 900 L0 900Z" fill="#241a2c" opacity="0.55"/>' +
            '</svg>'
        ),
        diamadre: (
            '<svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">' +
            '<defs>' +
            '<radialGradient id="dm-bloom-glow" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#FFE1E8" stop-opacity="0.7"/><stop offset="50%" stop-color="#FFB7C5" stop-opacity="0.25"/><stop offset="100%" stop-color="#FFB7C5" stop-opacity="0"/></radialGradient>' +
            '<radialGradient id="dm-orb-pink" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#FFB7C5" stop-opacity="0.25"/><stop offset="100%" stop-color="#FFB7C5" stop-opacity="0"/></radialGradient>' +
            '</defs>' +
            '<circle cx="180" cy="150" r="140" fill="url(#dm-orb-pink)"/>' +
            '<circle cx="1500" cy="90" r="140" fill="url(#dm-orb-pink)"/>' +
            '<circle cx="250" cy="150" r="150" fill="url(#dm-bloom-glow)"/>' +
            '<g transform="translate(250,150)" opacity="0.9">' +
            '<g fill="#FFB7C5" opacity="0.85">' +
            '<ellipse cx="0" cy="-42" rx="22" ry="30"/><ellipse cx="0" cy="42" rx="22" ry="30"/>' +
            '<ellipse cx="-42" cy="0" rx="30" ry="22"/><ellipse cx="42" cy="0" rx="30" ry="22"/>' +
            '<ellipse cx="-30" cy="-30" rx="24" ry="18" transform="rotate(45 -30 -30)"/><ellipse cx="30" cy="-30" rx="24" ry="18" transform="rotate(-45 30 -30)"/>' +
            '<ellipse cx="-30" cy="30" rx="24" ry="18" transform="rotate(-45 -30 30)"/><ellipse cx="30" cy="30" rx="24" ry="18" transform="rotate(45 30 30)"/>' +
            '</g>' +
            '<circle cx="0" cy="0" r="18" fill="#c9a96e" opacity="0.9"/>' +
            '</g>' +
            '<path d="M0 830 Q120 790 260 815 Q380 835 480 800 Q620 760 760 810 Q900 850 1040 805 Q1160 768 1300 812 Q1440 850 1600 800 L1600 900 L0 900Z" fill="#3d1a2a" opacity="0.65"/>' +
            '<!-- ARREGLO FLORAL ELEGANTE CON JARRÓN CERÁMICO -->' +
            '<g transform="translate(1140,570)" opacity="0.95">' +
            DM_ARRANGEMENT +
            '</g>' +
            '</svg>'
        ),
        blackfriday: (
            '<svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">' +
            '<defs>' +
            '<linearGradient id="bf-glow" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#18181b" stop-opacity="0"/><stop offset="100%" stop-color="#eab308" stop-opacity="0.1"/></linearGradient>' +
            '</defs>' +
            '<rect x="0" y="0" width="1600" height="900" fill="url(#bf-glow)"/>' +
            '<g opacity="0.3" stroke="rgba(234,179,8,0.3)" stroke-width="1.5" fill="none">' +
            '<circle cx="800" cy="450" r="300"/><circle cx="800" cy="450" r="500"/>' +
            '</g>' +
            '</svg>'
        ),
        diapadre: (
            '<svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">' +
            '<defs>' +
            '<linearGradient id="dp-sky-wash" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#ffb703" stop-opacity="0.05"/><stop offset="60%" stop-color="#fb8500" stop-opacity="0.12"/><stop offset="100%" stop-color="#023047" stop-opacity="0"/></linearGradient>' +
            '<radialGradient id="dp-sun-corona" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#ffffff" stop-opacity="1"/><stop offset="18%" stop-color="#fff275" stop-opacity="0.9"/><stop offset="42%" stop-color="#ffb703" stop-opacity="0.5"/><stop offset="70%" stop-color="#fb8500" stop-opacity="0.2"/><stop offset="100%" stop-color="#fb8500" stop-opacity="0"/></radialGradient>' +
            '<radialGradient id="dp-sun-glow" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#ffe8a3" stop-opacity="0.85"/><stop offset="40%" stop-color="#FFD700" stop-opacity="0.35"/><stop offset="100%" stop-color="#FFD700" stop-opacity="0"/></radialGradient>' +
            '<linearGradient id="dp-sunbeam-1" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#fff3b0" stop-opacity="0.35"/><stop offset="100%" stop-color="#fff3b0" stop-opacity="0"/></linearGradient>' +
            '<linearGradient id="dp-sunbeam-2" x1="1" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#ffd166" stop-opacity="0.25"/><stop offset="100%" stop-color="#ffd166" stop-opacity="0"/></linearGradient>' +
            '<linearGradient id="dp-mtn-far" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#4a3a1a" stop-opacity="0.6"/><stop offset="100%" stop-color="#2d2410" stop-opacity="0.7"/></linearGradient>' +
            '<linearGradient id="dp-mtn-mid" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#3a2e14" stop-opacity="0.85"/><stop offset="100%" stop-color="#1f1a0c" stop-opacity="0.95"/></linearGradient>' +
            '</defs>' +
            '<rect x="0" y="100" width="1600" height="500" fill="url(#dp-sky-wash)"/>' +
            '<!-- SOL RADIANTE HIPERREALISTA CON CORONA ATMOSFÉRICA Y HACES DE LUZ -->' +
            '<g class="dp-sky-sun">' +
            '<polygon points="1180,180 840,480 940,540" fill="url(#dp-sunbeam-1)"/>' +
            '<polygon points="1180,180 1340,540 1480,490" fill="url(#dp-sunbeam-2)"/>' +
            '<polygon points="1180,180 680,310 730,380" fill="url(#dp-sunbeam-1)"/>' +
            '<circle cx="1180" cy="180" r="320" fill="url(#dp-sun-corona)"/>' +
            '<circle cx="1180" cy="180" r="120" fill="url(#dp-sun-glow)"/>' +
            '<circle cx="1180" cy="180" r="46" fill="#ffffff"/>' +
            '</g>' +
            '<!-- CORDILLERA DE MONTAÑAS -->' +
            '<path d="M0 560 L140 420 L260 520 L400 370 L540 500 L680 410 L820 530 L980 400 L1140 520 L1300 420 L1460 530 L1600 450 L1600 900 L0 900Z" fill="url(#dp-mtn-far)"/>' +
            '<path d="M0 640 L180 500 L340 600 L500 460 L660 590 L820 480 L980 610 L1160 490 L1340 610 L1500 510 L1600 580 L1600 900 L0 900Z" fill="url(#dp-mtn-mid)"/>' +
            '<!-- CABAÑA CAMPESTRE EN LA COLINA DERECHA (VISIBLE Y SIN INTERFERIR CON BOTONES) -->' +
            '<g transform="translate(1180,560)" opacity="0.97">' +
            DP_CABIN +
            '</g>' +
            '<g fill="#0e0a03" opacity="0.9">' +
            '<path d="M60 780 L80 690 L100 780Z"/><path d="M90 790 L115 670 L140 790Z"/>' +
            '<path d="M370 785 L395 680 L420 785Z"/><path d="M410 795 L430 710 L450 795Z"/>' +
            '<path d="M1020 790 L1045 700 L1070 790Z"/><path d="M1480 790 L1510 680 L1540 790Z"/>' +
            '</g>' +
            '<path d="M0 800 Q220 770 460 792 T900 782 T1600 792 L1600 900 L0 900Z" fill="#120d05" opacity="0.75"/>' +
            '</svg>'
        ),
        amorYamistad: (
            '<svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">' +
            '<defs>' +
            '<radialGradient id="ay-glow" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#fbbf24" stop-opacity="0.25"/><stop offset="100%" stop-color="#fbbf24" stop-opacity="0"/></radialGradient>' +
            '</defs>' +
            '<circle cx="800" cy="360" r="420" fill="url(#ay-glow)"/>' +
            '<g opacity="0.4">' +
            '<circle cx="200" cy="150" r="1.5" fill="#fbbf24"/><circle cx="420" cy="80" r="1.2" fill="#f472b6"/>' +
            '<circle cx="680" cy="120" r="1.8" fill="#fbbf24"/><circle cx="950" cy="60" r="1.3" fill="#fff"/>' +
            '<circle cx="1180" cy="100" r="1.6" fill="#f472b6"/><circle cx="1380" cy="140" r="1.4" fill="#fbbf24"/>' +
            '</g>' +
            '<g opacity="0.75">' +
            '<path d="M800 380 C776 356 752 360 752 376 C752 392 800 412 800 412 C800 412 848 392 848 376 C848 360 824 356 800 380Z" fill="none" stroke="#f472b6" stroke-width="1.4" opacity="0.7"/>' +
            '<path d="M360 580 C348 568 336 570 336 578 C336 586 360 598 360 598 C360 598 384 586 384 578 C384 570 372 568 360 580Z" fill="none" stroke="#fbbf24" stroke-width="1.2" opacity="0.6"/>' +
            '<path d="M1240 480 C1228 468 1216 470 1216 478 C1216 486 1240 498 1240 498 C1240 498 1264 486 1264 478 C1264 470 1252 468 1240 480Z" fill="none" stroke="#f472b6" stroke-width="1.2" opacity="0.55"/>' +
            '</g>' +
            '<g opacity="0.6" fill="none" stroke="rgba(251,191,36,0.4)" stroke-width="1">' +
            '<path d="M0 580 Q200 530 440 570 T880 555 T1320 565 T1600 548" />' +
            '<path d="M0 620 Q250 590 500 615 T1000 600 T1600 595" />' +
            '</g>' +
            '<path d="M0 830 Q220 808 460 825 T900 815 T1600 822 L1600 900 L0 900Z" fill="rgba(35,10,40,0.5)"/>' +
            '</svg>'
        )
    };

        /* ========================================
       ESCENAS MÓVILES — lienzo vertical
       ========================================
       En celular el hero mide ~360x900 (aspecto 0.4). La escena panoramica de
       1600x900 con preserveAspectRatio="slice" se escala para COBRIR, asi que
       solo queda visible el 22% central: la luna (x=230) y la mansion
       (x=1040..1335) se caian fuera de la pantalla y el movil veia un fondo
       violeta plano.

       Estas escenas usan un lienzo vertical de 760x1900 (aspecto 0.4) que
       coincide con el hero del celular, de modo que "slice" muestra practicamente
       toda la composicion. Los sujetos se reusan de la escena panoramica
        (HW_MANSION, XM_TREE, SV_TABLE...) envueltos en un transform que los
        lleva al centro. */

    var VB_MOVIL = '0 0 760 1900';

    // Campo de estrellas para el lienzo vertical
    var ESTRELLAS_MOVIL = [
        [70, 130, 1.6, 0.55], [180, 250, 1.2, 0.4], [300, 95, 1.8, 0.6], [430, 210, 1.3, 0.45],
        [560, 120, 1.5, 0.5], [680, 270, 1.2, 0.4], [110, 430, 1.4, 0.5], [250, 540, 1.1, 0.4],
        [390, 450, 1.7, 0.55], [520, 570, 1.2, 0.45], [650, 460, 1.5, 0.5], [60, 710, 1.3, 0.45],
        [200, 830, 1.6, 0.55], [330, 740, 1.2, 0.4], [470, 870, 1.4, 0.5], [610, 770, 1.7, 0.6],
        [700, 910, 1.2, 0.4], [90, 1060, 1.5, 0.5], [260, 1160, 1.3, 0.45], [420, 1090, 1.6, 0.55],
        [580, 1190, 1.2, 0.4], [700, 1090, 1.4, 0.5], [140, 1330, 1.2, 0.4], [330, 1410, 1.5, 0.5],
        [510, 1340, 1.3, 0.45], [650, 1430, 1.6, 0.55]
    ];

    function estrellasMovil(lista, color) {
        var out = '<g class="scene-stars">';
        for (var i = 0; i < lista.length; i++) {
            var s = lista[i];
            out += '<circle cx="' + s[0] + '" cy="' + s[1] + '" r="' + s[2] + '" fill="' +
                (s[3] ? s[3] : (color || '#fff')) + '" opacity="' + (s[4] || 0.5) + '"/>';
        }
        return out + '</g>';
    }

    function escenaMovil(defs, cuerpo) {
        return '<svg viewBox="' + VB_MOVIL + '" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">' +
            '<defs>' + defs + '</defs>' + cuerpo + '</svg>';
    }

    /* ========================================
       ESCENAS MÓVILES — lienzo vertical
       ========================================
       En celular el hero mide ~360x900 (aspecto 0.4). La escena panoramica de
       1600x900 con preserveAspectRatio="slice" se escala para COBRIR, asi que
       solo queda visible el 22% central: la luna (x=230) y la mansion
       (x=1040..1335) se caian fuera de la pantalla y el movil veia un fondo
       violeta plano.

       Estas escenas usan un lienzo vertical de 760x1900 (aspecto 0.4) que
       coincide con el hero del celular, de modo que "slice" muestra el 100% de
       la composicion. Los sujetos se reusan de la escena panoramica
       (HW_MANSION, XM_TREE, SV_TABLE...) envueltos en un transform que los
       lleva al centro.

       GEOMETRIA: como el lienzo vertical se ve entero, el horizonte va en
       y=1150 (justo donde arranca la tarjeta de producto, screen ~545). Si el
       suelo se pone mas arriba, un suelo claro como la nieve de Navidad lava
       los botones y el texto. */

    var VB_MOVIL = '0 0 760 1900';
    var HORIZONTE_MOVIL = 1150;

    // Campo de estrellas para el lienzo vertical
    var ESTRELLAS_MOVIL = [
        [70, 130, 1.6, 0.55], [180, 250, 1.2, 0.4], [300, 95, 1.8, 0.6], [430, 210, 1.3, 0.45],
        [560, 120, 1.5, 0.5], [680, 270, 1.2, 0.4], [110, 430, 1.4, 0.5], [250, 540, 1.1, 0.4],
        [390, 450, 1.7, 0.55], [520, 570, 1.2, 0.45], [650, 460, 1.5, 0.5], [60, 710, 1.3, 0.45],
        [200, 830, 1.6, 0.55], [330, 740, 1.2, 0.4], [470, 870, 1.4, 0.5], [610, 770, 1.7, 0.6],
        [700, 910, 1.2, 0.4], [90, 1060, 1.5, 0.5], [260, 1160, 1.3, 0.45], [420, 1090, 1.6, 0.55],
        [580, 1190, 1.2, 0.4], [700, 1090, 1.4, 0.5], [140, 1330, 1.2, 0.4], [330, 1410, 1.5, 0.5],
        [510, 1340, 1.3, 0.45], [650, 1430, 1.6, 0.55]
    ];

    function estrellasMovil(lista, color) {
        var out = '<g class="scene-stars">';
        for (var i = 0; i < lista.length; i++) {
            var s = lista[i];
            out += '<circle cx="' + s[0] + '" cy="' + s[1] + '" r="' + s[2] + '" fill="' +
                (s[3] ? s[3] : (color || '#fff')) + '" opacity="' + (s[4] || 0.5) + '"/>';
        }
        return out + '</g>';
    }

    function escenaMovil(defs, cuerpo) {
        return '<svg viewBox="' + VB_MOVIL + '" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">' +
            '<defs>' + defs + '</defs>' + cuerpo + '</svg>';
    }

    // Version del arbol con los bombillos mas grandes. En el celular el arbol
    // de escritorio dejaba cada bombillo en 1 px de diametro.
    var XM_TREE_MOVIL = XM_TREE
        .replace(/r="4\.5"/g, 'r="7.5"')
        .replace(/r="4"/g, 'r="6.5"')
        .replace(/r="14"/g, 'r="21"')
        .replace(/r="12"/g, 'r="18"')
        .replace(/r="28"/g, 'r="38"');

    var HERO_SCENES_MOVIL = {

        /* ---------- HALLOWEEN ---------- */
        // Luna arriba a la izquierda, mansion gótica centrada con las ventanas
        // encendidas, arboles muertos flanqueando y lapidas al pie.
        halloween: function () {
            var defs =
                '<radialGradient id="hw-moon-glow" cx="50%" cy="50%" r="50%">' +
                '<stop offset="0%" stop-color="#e9d8ff" stop-opacity="0.6"/><stop offset="45%" stop-color="#a78bfa" stop-opacity="0.2"/><stop offset="100%" stop-color="#a78bfa" stop-opacity="0"/></radialGradient>' +
                '<radialGradient id="hw-light-spill" cx="50%" cy="50%" r="50%">' +
                '<stop offset="0%" stop-color="#f59e0b" stop-opacity="0.35"/><stop offset="100%" stop-color="#f59e0b" stop-opacity="0"/></radialGradient>' +
                '<linearGradient id="hw-fog" x1="0" y1="0" x2="0" y2="1">' +
                '<stop offset="0%" stop-color="#a78bfa" stop-opacity="0"/><stop offset="100%" stop-color="#a78bfa" stop-opacity="0.16"/></linearGradient>';

            var cuerpo =
                estrellasMovil(ESTRELLAS_MOVIL) +
                // luna arriba a la izquierda
                '<circle cx="140" cy="290" r="210" fill="url(#hw-moon-glow)"/>' +
                '<circle cx="140" cy="290" r="62" fill="#f3e8ff" opacity="0.9"/>' +
                '<circle cx="124" cy="276" r="62" fill="#1a0a2e" opacity="0.28"/>' +
                // murciélagos
                '<g fill="#1c1030" opacity="0.85">' +
                '<path d="M300 300 q10 -12 20 0 q10 -12 20 0 q-10 8 -20 2 q-10 6 -20 -2Z" transform="translate(-8,-2) scale(0.9)"/>' +
                '<path d="M520 210 q10 -12 20 0 q10 -12 20 0 q-10 8 -20 2 q-10 6 -20 -2Z" transform="translate(0,0) scale(0.7)"/>' +
                '<path d="M210 520 q10 -12 20 0 q10 -12 20 0 q-10 8 -20 2 q-10 6 -20 -2Z" transform="translate(0,0) scale(0.6)"/>' +
                '</g>' +
                // suelo lejano
                '<path d="M0 1030 Q190 990 380 1020 T760 1010 L760 1900 L0 1900Z" fill="#120818" opacity="0.5"/>' +
                // arboles muertos flanqueando
                '<g transform="translate(-125,782) scale(0.75)">' + HW_DEADTREE + '</g>' +
                '<g transform="translate(495,782) scale(0.75)">' + HW_DEADTREE + '</g>' +
                // mansion centrada. A escala 0.9 cabe entera entre la descripcion y
                // la tarjeta, con el tejado y la chimenea a la vista, sin tapar
                // ni el titulo ni los botones.
                '<g transform="translate(533,700) scale(1.1)">' +
                '<g class="hw-mansion" opacity="0.97">' + HW_MANSION + '</g>' +
                '</g>' +
                // suelo del frente
                '<path d="M0 1150 Q190 1120 380 1145 T760 1138 L760 1900 L0 1900Z" fill="#0c0510" opacity="0.72"/>' +
                // lapidas al pie de la mansion
                '<g transform="translate(-600,395)" fill="#0d0d16" opacity="0.8">' + HW_GRAVESTONES + '</g>' +
                // niebla
                '<ellipse cx="380" cy="1200" rx="430" ry="70" fill="url(#hw-fog)"/>' +
                '<ellipse cx="180" cy="1310" rx="300" ry="54" fill="url(#hw-fog)" opacity="0.7"/>';

            return escenaMovil(defs, cuerpo);
        },

        /* ---------- NAVIDAD ---------- */
        // Aurora arriba, arbol de Navidad grande al centro con las casitas
        // iluminadas a la izquierda y los regalos a la derecha.
        navidad: function () {
            var defs =
                '<linearGradient id="xm-aurora1" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#c9a96e" stop-opacity="0.24"/><stop offset="100%" stop-color="#c9a96e" stop-opacity="0"/></linearGradient>' +
                '<linearGradient id="xm-aurora2" x1="1" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#7dd3c0" stop-opacity="0.16"/><stop offset="100%" stop-color="#7dd3c0" stop-opacity="0"/></linearGradient>' +
                '<radialGradient id="xm-star-glow" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#FFD700" stop-opacity="0.95"/><stop offset="40%" stop-color="#FFD700" stop-opacity="0.5"/><stop offset="100%" stop-color="#FFD700" stop-opacity="0"/></radialGradient>' +
                '<radialGradient id="xm-tree-ambient" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#ffd700" stop-opacity="0.45"/><stop offset="40%" stop-color="#2ecc71" stop-opacity="0.2"/><stop offset="100%" stop-color="#2ecc71" stop-opacity="0"/></radialGradient>' +
                '<radialGradient id="xm-halo-red" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#ff4757" stop-opacity="0.95"/><stop offset="35%" stop-color="#ff4757" stop-opacity="0.45"/><stop offset="100%" stop-color="#ff4757" stop-opacity="0"/></radialGradient>' +
                '<radialGradient id="xm-halo-green" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#2ed573" stop-opacity="0.95"/><stop offset="35%" stop-color="#2ed573" stop-opacity="0.45"/><stop offset="100%" stop-color="#2ed573" stop-opacity="0"/></radialGradient>' +
                '<radialGradient id="xm-halo-blue" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#1e90ff" stop-opacity="0.95"/><stop offset="35%" stop-color="#1e90ff" stop-opacity="0.45"/><stop offset="100%" stop-color="#1e90ff" stop-opacity="0"/></radialGradient>' +
                '<radialGradient id="xm-halo-gold" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#ffa502" stop-opacity="0.95"/><stop offset="35%" stop-color="#ffa502" stop-opacity="0.45"/><stop offset="100%" stop-color="#ffa502" stop-opacity="0"/></radialGradient>' +
                '<radialGradient id="xm-halo-white" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#ffffff" stop-opacity="0.95"/><stop offset="35%" stop-color="#ffffff" stop-opacity="0.5"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></radialGradient>' +
                '<linearGradient id="xm-tinsel-gold" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#ffd700" stop-opacity="0.4"/><stop offset="50%" stop-color="#ffffff" stop-opacity="0.85"/><stop offset="100%" stop-color="#ffd700" stop-opacity="0.4"/></linearGradient>' +
                '<linearGradient id="xm-snow-mid" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#87878c" stop-opacity="0.9"/><stop offset="55%" stop-color="#cfcfd3" stop-opacity="0.92"/><stop offset="100%" stop-color="#f2f2f4" stop-opacity="0.95"/></linearGradient>' +
                '<linearGradient id="xm-snow-near" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#f5f5f7" stop-opacity="0.96"/><stop offset="100%" stop-color="#ffffff" stop-opacity="1"/></linearGradient>' +
                // Nieve propia del movil: mas apagada. La version de escritorio es
                // blanca y en el movil queda justo detras de la tarjeta, que se
                // vuelve gris y pierde el texto.
                '<linearGradient id="xm-snow-mid-m" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#3b3b44" stop-opacity="0.95"/><stop offset="55%" stop-color="#6f6f7a" stop-opacity="0.9"/><stop offset="100%" stop-color="#9a9aa6" stop-opacity="0.88"/></linearGradient>' +
                '<linearGradient id="xm-snow-near-m" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#5a5a66" stop-opacity="0.92"/><stop offset="100%" stop-color="#7d7d8a" stop-opacity="0.9"/></linearGradient>' +
                '<radialGradient id="xm-snow-warm-glow" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#f6d365" stop-opacity="0.5"/><stop offset="60%" stop-color="#f6d365" stop-opacity="0.15"/><stop offset="100%" stop-color="#f6d365" stop-opacity="0"/></radialGradient>' +
                '<radialGradient id="xm-snow-cool-glow" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#ffffff" stop-opacity="0.3"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/></radialGradient>';

            var cuerpo =
                // auroras
                '<path d="M0 0 Q190 120 380 40 T760 100 L760 420 Q560 330 380 400 T0 380Z" fill="url(#xm-aurora1)"/>' +
                '<path d="M760 0 Q570 140 380 70 T0 130 L0 360 Q190 280 380 340 T760 330Z" fill="url(#xm-aurora2)"/>' +
                estrellasMovil(ESTRELLAS_MOVIL) +
                // resplandor del arbol
                '<ellipse cx="380" cy="880" rx="300" ry="300" fill="url(#xm-tree-ambient)"/>' +
                // arbol centrado (base a y=1150)
                '<g transform="translate(-1088,244) scale(1.2)">' +
                '<g class="xm-tree">' + XM_TREE_MOVIL + '</g>' +
                '</g>' +
                // casitas a la izquierda. Bajaron 61 unidades de escena: los
                // tejados cruzaban el texto del boton "COLECCION MUJER" (el
                // boton va de y=459 a y=508 y las casitas arrancaban en 479).
                '<g transform="translate(-39,715) scale(0.62)">' +
                '<g class="xm-houses" opacity="0.95">' + XM_HOUSES + '</g>' +
                '</g>' +
                // regalos a la derecha
                '<g transform="translate(-695,403) scale(0.9)">' +
                '<g class="xm-gifts">' +
                '<rect x="1350" y="785" width="46" height="42" rx="3" fill="#c0392b"/>' +
                '<rect x="1369" y="785" width="8" height="42" fill="#ffd700"/>' +
                '<rect x="1350" y="802" width="46" height="8" fill="#ffd700"/>' +
                '<path d="M1373 785 C1360 770 1354 780 1371 785 M1373 785 C1386 770 1392 780 1375 785" stroke="#ffeaa7" stroke-width="2.5" fill="#f39c12"/>' +
                '<circle cx="1373" cy="785" r="2.8" fill="#fff"/>' +
                '<path d="M1373 785 Q1364 796 1358 805 M1373 785 Q1382 796 1388 805" stroke="#ffd700" stroke-width="1.8" fill="none"/>' +
                '<rect x="1406" y="792" width="38" height="36" rx="3" fill="#1b4d3e"/>' +
                '<rect x="1421" y="792" width="7" height="36" fill="#e74c3c"/>' +
                '<rect x="1406" y="807" width="38" height="7" fill="#e74c3c"/>' +
                '<path d="M1425 792 C1414 780 1410 788 1423 792 M1425 792 C1436 780 1440 788 1427 792" stroke="#ff7675" stroke-width="2.2" fill="#d63031"/>' +
                '<circle cx="1425" cy="792" r="2.5" fill="#fff"/>' +
                '<rect x="1452" y="778" width="48" height="48" rx="3" fill="#d4af37"/>' +
                '<rect x="1472" y="778" width="8" height="48" fill="#1e3799"/>' +
                '<rect x="1452" y="798" width="48" height="8" fill="#1e3799"/>' +
                '<path d="M1476 778 C1462 764 1458 774 1474 778 M1476 778 C1490 764 1494 774 1478 778" stroke="#4a69bd" stroke-width="2.8" fill="#0c2461"/>' +
                '<circle cx="1476" cy="778" r="3" fill="#fff"/>' +
                '<rect x="1508" y="794" width="34" height="34" rx="3" fill="#4834d4"/>' +
                '<rect x="1522" y="794" width="6" height="34" fill="#ffd700"/>' +
                '<rect x="1508" y="808" width="34" height="6" fill="#ffd700"/>' +
                '<path d="M1525 794 C1516 784 1512 791 1523 794 M1525 794 C1534 784 1538 791 1527 794" stroke="#f6e58d" stroke-width="2" fill="#f9ca24"/>' +
                '<circle cx="1525" cy="794" r="2.2" fill="#fff"/>' +
                '</g>' +
                '</g>' +
// suelo nevado (arranca donde empieza la tarjeta)
                '<path d="M0 1150 Q190 1132 380 1146 T760 1140 L760 1900 L0 1900Z" fill="url(#xm-snow-mid-m)"/>' +
                '<path d="M0 1210 Q190 1192 380 1206 T760 1200 L760 1900 L0 1900Z" fill="url(#xm-snow-near-m)"/>' +
                '<ellipse cx="150" cy="1200" rx="160" ry="22" fill="url(#xm-snow-cool-glow)"/>' +
                '<ellipse cx="620" cy="1188" rx="180" ry="24" fill="url(#xm-snow-cool-glow)"/>';

            return escenaMovil(defs, cuerpo);
        },

        /* ---------- SAN VALENTÍN ---------- */
        // Corazon grande arriba al centro, mesa con velas y roses al pie.
        sanvalentin: function () {
            var defs =
                '<radialGradient id="sv-heart-glow" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#f9a8d4" stop-opacity="0.6"/><stop offset="45%" stop-color="#ec4899" stop-opacity="0.2"/><stop offset="100%" stop-color="#ec4899" stop-opacity="0"/></radialGradient>' +
                '<radialGradient id="sv-candle-halo" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#ffd56b" stop-opacity="0.9"/><stop offset="50%" stop-color="#ff9a3c" stop-opacity="0.3"/><stop offset="100%" stop-color="#ff9a3c" stop-opacity="0"/></radialGradient>' +
                '<linearGradient id="sv-flame" x1="0" y1="1" x2="0" y2="0"><stop offset="0%" stop-color="#ff5722"/><stop offset="40%" stop-color="#ffb300"/><stop offset="80%" stop-color="#fff9c4"/><stop offset="100%" stop-color="#ffffff"/></linearGradient>' +
                '<radialGradient id="sv-orb-pink" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#ec4899" stop-opacity="0.25"/><stop offset="100%" stop-color="#ec4899" stop-opacity="0"/></radialGradient>';

            var cuerpo =
                '<circle cx="120" cy="420" r="190" fill="url(#sv-orb-pink)"/>' +
                '<circle cx="650" cy="260" r="200" fill="url(#sv-orb-pink)"/>' +
                estrellasMovil(ESTRELLAS_MOVIL, '#ffd7e8') +
// corazon grande centrado en la banda alta (para no tapar el titulo)
                '<g transform="translate(375,409) scale(1.3)">' +
                '<circle cx="250" cy="140" r="170" fill="url(#sv-heart-glow)"/>' +
                SV_HEART +
                '</g>' +
                // corazones flotando
                '<g opacity="0.7" fill="#ec4899">' +
                '<path d="M170 700 q22 -26 44 0 q22 -26 44 0 q-22 18 -44 4 q-22 14 -44 -4Z" transform="scale(0.6) translate(120,420)"/>' +
                '<path d="M500 820 q22 -26 44 0 q22 -26 44 0 q-22 18 -44 4 q-22 14 -44 -4Z" transform="scale(0.45) translate(620,900)"/>' +
                '<path d="M300 980 q22 -26 44 0 q22 -26 44 0 q-22 18 -44 4 q-22 14 -44 -4Z" transform="scale(0.35) translate(480,1250)"/>' +
                '</g>' +
                // suelo
                '<path d="M0 1150 Q190 1122 380 1142 T760 1132 L760 1900 L0 1900Z" fill="#180a12" opacity="0.7"/>' +
                // mesa con velas y roses (base a y=1150)
                '<g transform="translate(173,685) scale(1.5)" opacity="0.95">' +
                SV_TABLE +
                '</g>';

            return escenaMovil(defs, cuerpo);
        },

        /* ---------- PASCUA ---------- */
        // Amanecer: arco de sol saliendo sobre las colinas.
        pascua: function () {
            var defs =
                '<linearGradient id="ps-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#2a1f30" stop-opacity="0"/><stop offset="100%" stop-color="#c9a9d9" stop-opacity="0.18"/></linearGradient>' +
                '<radialGradient id="ps-dawn-glow" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#fdf4e3" stop-opacity="0.6"/><stop offset="45%" stop-color="#c9a9d9" stop-opacity="0.2"/><stop offset="100%" stop-color="#c9a9d9" stop-opacity="0"/></radialGradient>';

var cuerpo =
                '<rect x="0" y="0" width="760" height="1300" fill="url(#ps-sky)"/>' +
                '<circle cx="380" cy="1010" r="500" fill="url(#ps-dawn-glow)"/>' +
                '<circle cx="380" cy="1010" r="250" fill="url(#ps-dawn-glow)" opacity="0.7"/>' +
                '<path d="M80 1010 A300 300 0 0 1 680 1010" stroke="rgba(253,244,227,0.42)" stroke-width="3" fill="none"/>' +
                '<path d="M150 1010 A230 230 0 0 1 610 1010" stroke="rgba(253,244,227,0.24)" stroke-width="2" fill="none"/>' +
                // rayos de amanecer
                '<g opacity="0.3" fill="none" stroke="rgba(253,244,227,0.5)" stroke-width="2" stroke-linecap="round">' +
                '<path d="M300 700 L120 420"/><path d="M340 660 L250 360"/><path d="M420 660 L510 360"/>' +
                '<path d="M460 700 L640 420"/>' +
                '</g>' +
                // aves
                '<g fill="none" stroke="rgba(253,244,227,0.45)" stroke-width="2.5" stroke-linecap="round">' +
                '<path d="M250 480 q16 -14 32 0 q16 -14 32 0"/>' +
                '<path d="M430 360 q13 -11 26 0 q13 -11 26 0"/>' +
                '<path d="M540 560 q10 -9 20 0 q10 -9 20 0"/>' +
                '<path d="M150 330 q10 -9 20 0 q10 -9 20 0"/>' +
                '</g>' +
                // estrellas tempranas
                '<g opacity="0.5">' +
                '<circle cx="90" cy="200" r="1.6" fill="#fff"/><circle cx="330" cy="140" r="1.2" fill="#fdf4e3"/>' +
                '<circle cx="620" cy="180" r="1.5" fill="#fff"/><circle cx="480" cy="240" r="1.1" fill="#fdf4e3"/>' +
                '</g>' +
                // colinas en el horizonte
                '<path d="M0 1150 Q190 1100 380 1140 T760 1125 L760 1900 L0 1900Z" fill="#241a2c" opacity="0.55"/>' +
                '<path d="M0 1290 Q200 1240 400 1280 T760 1260 L760 1900 L0 1900Z" fill="#1b1322" opacity="0.5"/>' +
                // arboles recortados en la colina
                '<g fill="#1b1322" opacity="0.5">' +
                '<path d="M120 1150 L145 1060 L170 1150Z"/><path d="M155 1155 L180 1040 L205 1155Z"/>' +
                '<path d="M600 1145 L622 1040 L644 1145Z"/>' +
                '</g>';

            return escenaMovil(defs, cuerpo);
        },

        /* ---------- DÍA DE LA MADRE ---------- */
        // Flor grande al centro y arreglo en jarrón al pie.
        diamadre: function () {
            var defs =
                '<radialGradient id="dm-bloom-glow" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#FFE1E8" stop-opacity="0.7"/><stop offset="50%" stop-color="#FFB7C5" stop-opacity="0.25"/><stop offset="100%" stop-color="#FFB7C5" stop-opacity="0"/></radialGradient>' +
                '<radialGradient id="dm-orb-pink" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#FFB7C5" stop-opacity="0.25"/><stop offset="100%" stop-color="#FFB7C5" stop-opacity="0"/></radialGradient>';

            var cuerpo =
                '<circle cx="110" cy="480" r="200" fill="url(#dm-orb-pink)"/>' +
                '<circle cx="660" cy="300" r="200" fill="url(#dm-orb-pink)"/>' +
// flor grande arriba a la derecha (la de PC esta en x=250, aqui se lleva a la
                // esquina para no quedar detras del titulo centrado)
                '<g transform="translate(700,528) scale(2)">' +
                '<circle cx="0" cy="0" r="52" fill="url(#dm-bloom-glow)" class="flower-bloom-aura"/>' +
                '<g fill="#FFB7C5" opacity="0.85">' +
                '<ellipse cx="0" cy="-42" rx="22" ry="30"/><ellipse cx="0" cy="42" rx="22" ry="30"/>' +
                '<ellipse cx="-42" cy="0" rx="30" ry="22"/><ellipse cx="42" cy="0" rx="30" ry="22"/>' +
                '<ellipse cx="-30" cy="-30" rx="24" ry="18" transform="rotate(45 -30 -30)"/><ellipse cx="30" cy="-30" rx="24" ry="18" transform="rotate(-45 30 -30)"/>' +
                '<ellipse cx="-30" cy="30" rx="24" ry="18" transform="rotate(-45 -30 30)"/><ellipse cx="30" cy="30" rx="24" ry="18" transform="rotate(45 30 30)"/>' +
                '</g>' +
                '<circle cx="0" cy="0" r="18" fill="#c9a96e" opacity="0.9"/>' +
                '</g>' +
                // segunda flor mas chica en la esquina opuesta
                '<g transform="translate(150,320) scale(1.05)" opacity="0.9">' +
                '<circle cx="0" cy="0" r="34" fill="url(#dm-bloom-glow)"/>' +
                '<circle cx="0" cy="0" r="21" fill="#f472b6" opacity="0.9"/>' +
                '<circle cx="0" cy="0" r="13" fill="#fbcfe8"/>' +
                '<circle cx="0" cy="0" r="6" fill="#c9a96e"/>' +
                '</g>' +
                // petalos sueltos
                '<g fill="#FFB7C5" opacity="0.4">' +
                '<ellipse cx="180" cy="700" rx="14" ry="20" transform="rotate(24 180 700)"/>' +
                '<ellipse cx="600" cy="640" rx="12" ry="18" transform="rotate(-32 600 640)"/>' +
                '<ellipse cx="300" cy="900" rx="13" ry="19" transform="rotate(48 300 900)"/>' +
                '</g>' +
                // suelo
                '<path d="M0 1150 Q190 1122 380 1142 T760 1132 L760 1900 L0 1900Z" fill="#3d1a2a" opacity="0.6"/>' +
                // arreglo en jarrón (base a y=1150)
                '<g transform="translate(188,686) scale(1.6)" opacity="0.95">' +
                DM_ARRANGEMENT +
                '</g>';

            return escenaMovil(defs, cuerpo);
        },

        /* ---------- BLACK FRIDAY ---------- */
        // Anillos concentricos dorados con foco central.
        blackfriday: function () {
            var defs =
                '<linearGradient id="bf-glow" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#18181b" stop-opacity="0"/><stop offset="100%" stop-color="#eab308" stop-opacity="0.12"/></linearGradient>' +
                '<radialGradient id="bf-spot" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#eab308" stop-opacity="0.28"/><stop offset="100%" stop-color="#eab308" stop-opacity="0"/></radialGradient>';

var cuerpo =
                '<rect x="0" y="0" width="760" height="1900" fill="url(#bf-glow)"/>' +
                '<circle cx="380" cy="520" r="460" fill="url(#bf-spot)"/>' +
                '<g opacity="0.32" stroke="rgba(234,179,8,0.34)" stroke-width="1.6" fill="none">' +
                '<circle cx="380" cy="520" r="110"/>' +
                '<circle cx="380" cy="520" r="190"/>' +
                '<circle cx="380" cy="520" r="270"/>' +
                '<circle cx="380" cy="520" r="350"/>' +
                '<circle cx="380" cy="520" r="430"/>' +
                '</g>' +
                // rayos radiales
                '<g opacity="0.22" stroke="rgba(234,179,8,0.5)" stroke-width="1.4" fill="none">' +
                '<path d="M380 520 L380 60"/><path d="M380 520 L620 140"/><path d="M380 520 L740 380"/>' +
                '<path d="M380 520 L700 660"/><path d="M380 520 L520 880"/><path d="M380 520 L140 700"/>' +
                '<path d="M380 520 L40 380"/><path d="M380 520 L160 150"/>' +
                '</g>' +
                // marcas de precio
                '<g fill="none" stroke="rgba(234,179,8,0.3)" stroke-width="2.5" stroke-linecap="round">' +
                '<path d="M110 250 l44 44 M154 250 l-44 44"/>' +
                '<path d="M600 760 l44 44 M644 760 l-44 44"/>' +
                '<path d="M250 960 l32 32 M282 960 l-32 32"/>' +
                '<path d="M560 300 l32 32 M592 300 l-32 32"/>' +
                '</g>' +
                // destellos
                '<g fill="rgba(250,204,21,0.5)">' +
                '<circle cx="200" cy="430" r="3"/><circle cx="590" cy="450" r="2.4"/>' +
                '<circle cx="480" cy="250" r="2.6"/><circle cx="280" cy="700" r="2.2"/>' +
                '<circle cx="660" cy="880" r="2.6"/><circle cx="150" cy="820" r="2.2"/>' +
                '</g>';

            return escenaMovil(defs, cuerpo);
        },

        /* ---------- DÍA DEL PADRE ---------- */
        // Sol radiante al centro, cordillera de montanas y cabaña al pie.
        diapadre: function () {
            var defs =
                '<linearGradient id="dp-sky-wash" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#ffb703" stop-opacity="0.06"/><stop offset="60%" stop-color="#fb8500" stop-opacity="0.14"/><stop offset="100%" stop-color="#023047" stop-opacity="0"/></linearGradient>' +
                '<radialGradient id="dp-sun-corona" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#ffffff" stop-opacity="1"/><stop offset="18%" stop-color="#fff275" stop-opacity="0.9"/><stop offset="42%" stop-color="#ffb703" stop-opacity="0.5"/><stop offset="70%" stop-color="#fb8500" stop-opacity="0.2"/><stop offset="100%" stop-color="#fb8500" stop-opacity="0"/></radialGradient>' +
                '<radialGradient id="dp-sun-glow" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#ffe8a3" stop-opacity="0.85"/><stop offset="40%" stop-color="#FFD700" stop-opacity="0.35"/><stop offset="100%" stop-color="#FFD700" stop-opacity="0"/></radialGradient>' +
                '<linearGradient id="dp-sunbeam-1" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#fff3b0" stop-opacity="0.35"/><stop offset="100%" stop-color="#fff3b0" stop-opacity="0"/></linearGradient>' +
                '<linearGradient id="dp-sunbeam-2" x1="1" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#ffd166" stop-opacity="0.25"/><stop offset="100%" stop-color="#ffd166" stop-opacity="0"/></linearGradient>' +
                '<linearGradient id="dp-mtn-far" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#4a3a1a" stop-opacity="0.6"/><stop offset="100%" stop-color="#2d2410" stop-opacity="0.7"/></linearGradient>' +
                '<linearGradient id="dp-mtn-mid" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#3a2e14" stop-opacity="0.85"/><stop offset="100%" stop-color="#1f1a0c" stop-opacity="0.95"/></linearGradient>';

            var cuerpo =
                '<rect x="0" y="0" width="760" height="1300" fill="url(#dp-sky-wash)"/>' +
// sol centrado (con la corona mas contenida: al 330 tapaba el titulo)
                '<g class="dp-sky-sun">' +
                '<polygon points="380,250 60,560 160,620" fill="url(#dp-sunbeam-1)"/>' +
                '<polygon points="380,250 700,560 600,620" fill="url(#dp-sunbeam-2)"/>' +
                '<polygon points="380,250 130,340 180,410" fill="url(#dp-sunbeam-1)"/>' +
                '<circle cx="380" cy="250" r="235" fill="url(#dp-sun-corona)"/>' +
                '<circle cx="380" cy="250" r="88" fill="url(#dp-sun-glow)"/>' +
                '<circle cx="380" cy="250" r="30" fill="#ffffff"/>' +
                '</g>' +
                // montanas
                '<path d="M0 900 L120 730 L230 850 L340 670 L450 830 L560 710 L660 850 L760 750 L760 1900 L0 1900Z" fill="url(#dp-mtn-far)"/>' +
                '<path d="M0 1060 L160 860 L310 990 L450 800 L600 970 L760 860 L760 1900 L0 1900Z" fill="url(#dp-mtn-mid)"/>' +
                // pinos
                '<g fill="#0e0a03" opacity="0.9">' +
                '<path d="M60 1150 L85 1020 L110 1150Z"/><path d="M100 1160 L130 1000 L160 1160Z"/>' +
                '<path d="M600 1140 L622 1030 L644 1140Z"/>' +
                '</g>' +
                // cabaña (base a y=1150)
                '<g transform="translate(422,857) scale(1.5)" opacity="0.97">' +
                DP_CABIN +
                '</g>' +
                // suelo
                '<path d="M0 1150 Q190 1122 380 1142 T760 1132 L760 1900 L0 1900Z" fill="#120d05" opacity="0.75"/>';

            return escenaMovil(defs, cuerpo);
        },

        /* ---------- AMOR Y AMISTAD ---------- */
        // Resplandor ambar, confeti, corazones y cintas.
        amorYamistad: function () {
            var defs =
                '<radialGradient id="ay-glow" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#fbbf24" stop-opacity="0.28"/><stop offset="100%" stop-color="#fbbf24" stop-opacity="0"/></radialGradient>';

            var cuerpo =
                '<circle cx="380" cy="560" r="520" fill="url(#ay-glow)"/>' +
                // confeti
                '<g opacity="0.5">' +
                '<circle cx="140" cy="220" r="3" fill="#fbbf24"/><circle cx="320" cy="150" r="2.4" fill="#f472b6"/>' +
                '<circle cx="520" cy="200" r="2.8" fill="#fbbf24"/><circle cx="650" cy="330" r="2.2" fill="#fff"/>' +
                '<circle cx="200" cy="480" r="2.6" fill="#f472b6"/><circle cx="600" cy="560" r="2.4" fill="#fbbf24"/>' +
                '<circle cx="90" cy="820" r="2.8" fill="#fbbf24"/><circle cx="430" cy="900" r="2.2" fill="#fff"/>' +
                '<circle cx="680" cy="980" r="2.6" fill="#f472b6"/><circle cx="250" cy="1060" r="2.4" fill="#fbbf24"/>' +
                '</g>' +
// corazones
                '<g opacity="0.75">' +
                '<path d="M380 480 C356 456 332 460 332 476 C332 492 380 512 380 512 C380 512 428 492 428 476 C428 460 404 456 380 480Z" fill="none" stroke="#f472b6" stroke-width="3"/>' +
                '<path d="M180 760 C168 748 156 750 156 758 C156 766 180 778 180 778 C180 778 204 766 204 758 C204 750 192 748 180 760Z" fill="none" stroke="#fbbf24" stroke-width="2.5"/>' +
                '<path d="M580 690 C568 678 556 680 556 688 C556 696 580 708 580 708 C580 708 604 696 604 688 C604 680 592 678 580 690Z" fill="none" stroke="#f472b6" stroke-width="2.5"/>' +
                '<path d="M300 1010 C288 998 276 1000 276 1008 C276 1016 300 1028 300 1028 C300 1028 324 1016 324 1008 C324 1000 312 998 300 1010Z" fill="none" stroke="#fbbf24" stroke-width="2.5"/>' +
                // corazones grandes en las esquinas superiores
                '<path d="M150 330 C122 302 94 307 94 325 C94 343 150 366 150 366 C150 366 206 343 206 325 C206 307 178 302 150 330Z" fill="none" stroke="#f472b6" stroke-width="3" opacity="0.6"/>' +
                '<path d="M620 400 C594 374 568 378 568 395 C568 412 620 434 620 434 C620 434 672 412 672 395 C672 378 646 374 620 400Z" fill="none" stroke="#fbbf24" stroke-width="3" opacity="0.6"/>' +
                '<path d="M420 300 C398 278 376 281 376 295 C376 309 420 328 420 328 C420 328 464 309 464 295 C464 281 442 278 420 300Z" fill="none" stroke="#fff" stroke-width="2.5" opacity="0.45"/>' +
                '</g>' +
                // cintas
                '<g opacity="0.6" fill="none" stroke="rgba(251,191,36,0.42)" stroke-width="1.4">' +
                '<path d="M0 620 Q190 560 380 605 T760 570"/>' +
                '<path d="M0 700 Q190 640 380 685 T760 650"/>' +
                '<path d="M0 980 Q190 920 380 965 T760 930"/>' +
                '</g>' +
                // suelo
                '<path d="M0 1150 Q190 1122 380 1142 T760 1132 L760 1900 L0 1900Z" fill="rgba(35,10,40,0.5)"/>';

            return escenaMovil(defs, cuerpo);
        }
    };

    function getHeroScene(eventId) {
        return HERO_SCENES[eventId] || '';
    }

    /* Escena vertical para celular. Reutiliza los sujetos de la escena
       panoramica reubicados en un lienzo 760x1900, para que en el movil se vea
       la misma decoracion que en el escritorio. */
    function getHeroSceneMobile(eventId) {
        var escena = HERO_SCENES_MOVIL[eventId];
        if (!escena) return getHeroScene(eventId);
        return escena();
    }

    function getGuirnaldaHeader(compacto) {
        // En version compacta (celular) el lienzo es mas corto y los bombillos
        // mas grandes. Con el lienzo de 1200 unidades escalado a 360 px de
        // pantalla, cada bombillo mide 3 px: se veian como puntos de color.
        var colors = compacto
            ? ['#e6483a', '#39c977', '#c9a96e', '#4fb3ff', '#ffffff', '#e6483a', '#39c977']
            : ['#e6483a', '#39c977', '#c9a96e', '#4fb3ff', '#ffffff', '#e6483a', '#39c977', '#c9a96e', '#4fb3ff', '#ffffff', '#e6483a', '#39c977'];
        var n = colors.length;
        var svgW = compacto ? 620 : 1200;
        var svgH = compacto ? 60 : 52;
        var marginL = compacto ? 130 : 280;
        var marginR = compacto ? 16 : 30;
        var bulbRx = compacto ? 9 : 5.5;
        var bulbRy = compacto ? 12.5 : 7.5;
        var haloR = compacto ? 30 : 18;
        var spacing = (svgW - marginL - marginR) / (n - 1);

        var cablePoints = [];
        for (var i = 0; i < n; i++) {
            var x = marginL + i * spacing;
            var sag = (compacto ? 16 : 12) + Math.sin(i * 0.85) * (compacto ? 9 : 7);
            cablePoints.push({ x: x, y: sag });
        }

        var pathD = 'M 0 ' + (cablePoints[0].y + 2) + ' L ' + cablePoints[0].x + ' ' + cablePoints[0].y;
        for (var i = 1; i < n; i++) {
            var prev = cablePoints[i - 1];
            var curr = cablePoints[i];
            var midX = (prev.x + curr.x) / 2;
            var sagY = Math.max(prev.y, curr.y) + 10;
            pathD += ' Q ' + midX + ' ' + sagY + ' ' + curr.x + ' ' + curr.y;
        }
        pathD += ' L ' + svgW + ' ' + (cablePoints[n - 1].y + 2);

        var svg = '<svg class="christmas-garland-svg" viewBox="0 0 ' + svgW + ' ' + svgH + '" preserveAspectRatio="none" aria-hidden="true">';
        svg += '<defs>';
        for (var i = 0; i < n; i++) {
            var c = colors[i];
            svg += '<radialGradient id="glowHalo' + i + '" cx="50%" cy="45%" r="50%">' +
                '<stop offset="0%" stop-color="' + c + '" stop-opacity="0.9"/>' +
                '<stop offset="50%" stop-color="' + c + '" stop-opacity="0.4"/>' +
                '<stop offset="100%" stop-color="' + c + '" stop-opacity="0"/></radialGradient>';
        }
        svg += '</defs>';

        svg += '<path d="' + pathD + '" fill="none" stroke="rgba(200,200,210,0.5)" stroke-width="1.5" stroke-linecap="round"/>';

        for (var i = 0; i < n; i++) {
            var p = cablePoints[i];
            var bulbY = p.y + (compacto ? 24 : 20);
            var stemTop = p.y + 1;

            svg += '<line x1="' + p.x + '" y1="' + stemTop + '" x2="' + p.x + '" y2="' + (bulbY - 8) + '" stroke="rgba(180,180,195,0.4)" stroke-width="1"/>';
            svg += '<rect x="' + (p.x - (compacto ? 4 : 2.5)) + '" y="' + (bulbY - 9) + '" width="' + (compacto ? 8 : 5) + '" height="' + (compacto ? 5 : 3.5) + '" rx="1.2" fill="rgba(130,130,145,0.5)"/>';

            svg += '<circle class="bulb-halo" data-idx="' + i + '" cx="' + p.x + '" cy="' + (bulbY + 1) + '" r="' + haloR + '" fill="url(#glowHalo' + i + ')"/>';
            svg += '<ellipse class="bulb-glass" data-idx="' + i + '" cx="' + p.x + '" cy="' + bulbY + '" rx="' + bulbRx + '" ry="' + bulbRy + '" fill="' + c + '"/>';
        }

        svg += '</svg>';
        return '<div class="christmas-lights-premium" aria-hidden="true">' + svg + '</div>';
    }

    return {
        getHeroDeco: getHeroDeco,
        getHeroScene: getHeroScene,
        getHeroSceneMobile: getHeroSceneMobile,
        getGuirnaldaHeader: getGuirnaldaHeader
    };
})();
