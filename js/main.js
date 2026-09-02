/* ========================================
   MANIZALES PERFUMERÍA - JAVASCRIPT
   ======================================== */

// === PRODUCT DATA ===
let products = [];

// === CURRENT ACTIVE VIEW TRACKER ===
let currentView = 'inicio';

// === VIEW NAVIGATION SYSTEM ===
function showView(viewId, updateHistory) {
    if (updateHistory === undefined) updateHistory = true;

    // Hide all views
    const allViews = document.querySelectorAll('.view');
    allViews.forEach(function(v) {
        v.removeAttribute('data-active');
        v.style.display = 'none';
    });

    // Show target view
    const target = document.getElementById('view-' + viewId);
    if (!target) return;

    target.style.display = 'block';
    // Force reflow to restart CSS animation
    void target.offsetWidth;
    target.setAttribute('data-active', 'true');

    // View-inicio: eliminar el gap beige entre nav y hero
    if (viewId === 'inicio') {
        target.style.paddingTop = '0';
    } else {
        target.style.paddingTop = '';
    }

    // Track current view
    currentView = viewId;

    if (updateHistory) {
        try {
            history.pushState({ type: 'view', view: viewId }, '', '#' + viewId);
        } catch(e) {}
    }

    // Update active nav link
    const allLinks = document.querySelectorAll('.nav__link');
    allLinks.forEach(function(link) {
        link.classList.remove('active');
        if (link.getAttribute('data-view') === viewId) {
            link.classList.add('active');
        }
    });

    // Ocultar en el footer el link de la sección activa, mostrar los demás
    const allFooterViews = ['inicio', 'quienes-somos', 'nuevos', 'hombre', 'mujer', 'unisex', 'ubicacion'];
    allFooterViews.forEach(function(id) {
        const li = document.getElementById('footer-link-' + id);
        if (li) li.style.display = id === viewId ? 'none' : '';
    });

    // Scroll to top - en móvil usar scroll instantáneo para evitar jank en iOS
    var esMobileScroll = ('ontouchstart' in window) || window.innerWidth <= 768;
    if (esMobileScroll) {
        window.scrollTo(0, 0);
    } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Re-renderizar sección activa con contexto correcto
    if (viewId === 'nuevos') {
        renderNuevosProducts();
    } else if (viewId === 'hombre') {
        renderHombreProducts();
    } else if (viewId === 'mujer') {
        renderMujerProducts();
    } else if (viewId === 'unisex') {
        renderUnisexProducts();
    }

    // Close mobile menu if open
    const navMenu = document.getElementById('nav-menu');
    const navOverlay = document.getElementById('nav-overlay');
    if (navMenu) {
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
    if (navOverlay) {
        navOverlay.classList.remove('active');
    }

    // Reaplicar tema de evento al cambiar de vista
    if (typeof EventosManager !== 'undefined' && EventosManager.reaplicarSiActivo) {
        setTimeout(function() { EventosManager.reaplicarSiActivo(); }, 50);
    }

    // Re-activar animaciones de entrada (scroll reveal) en TODAS las vistas,
    // haya o no un evento activo. Se ejecuta despues de reaplicarSiActivo
    // para que tambien anime las tarjetas de la seccion de evento cuando
    // se reconstruyen al volver a "inicio".
    setTimeout(function() { updateScrollReveal(); }, 120);
}

// === CLICK COUNTER SYSTEM ===
const ClickCounter = {
    STORAGE_KEY: 'manizales_clicks',
    
    getAll: function() {
        try {
            const data = localStorage.getItem(this.STORAGE_KEY);
            return data ? JSON.parse(data) : {};
        } catch (e) {
            return {};
        }
    },
    
    get: function(productId) {
        const clicks = this.getAll();
        return clicks[productId] || 0;
    },
    
    increment: function(productId) {
        const clicks = this.getAll();
        clicks[productId] = (clicks[productId] || 0) + 1;
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(clicks));
        return clicks[productId];
    }
};

// === PRODUCT MODAL ===
function openProductModal(productId, updateHistory) {
    if (updateHistory === undefined) updateHistory = true;
    const product = products.find(function(p) { return p.id === productId; });
    if (!product) return;
    
    var baseUrl = window.location.origin + window.location.pathname.replace(/\/[^\/]*$/, '/');
    var fullImageUrl = baseUrl + product.imagen;
    
    const colors = product.colores || {
        principal: '#C9A96E',
        secundario: '#E8D5B7',
        acento: '#A68B4B',
        fondo: '#FAF9F6'
    };
    
    var activeEventClass = '';
    var activeEventStyle = '';
    var activeEventId = document.body.getAttribute('data-event');
    if (activeEventId) {
        activeEventClass = ' modal--' + activeEventId;
        activeEventStyle = 'border-top: 3px solid var(--event-accent, #c9a96e);';
    }
    
    var activeDescPct = (typeof EventosManager !== 'undefined' && EventosManager.getDescuentoActivo) ? EventosManager.getDescuentoActivo() : 0;
    var activeEvent = (typeof EventosManager !== 'undefined' && EventosManager.getEventoActivo) ? EventosManager.getEventoActivo() : null;
    var modalPrecioFinal = (activeDescPct > 0 && product.precio) ? EventosManager.calcularPrecioConDescuento(product.precio) : (product.precio || 0);

    var modalPriceHtml = '';
    if (activeDescPct > 0 && product.precio) {
        modalPriceHtml = `
            <div class="modal__price-wrap">
                <span class="modal__price-old">$${product.precio.toLocaleString('es-CO')}</span>
                <span class="modal__price">$${modalPrecioFinal.toLocaleString('es-CO')}</span>
                <span class="modal__discount-tag">-${activeDescPct}% ${activeEvent ? activeEvent.nombre : 'OFF'}</span>
            </div>
        `;
    } else {
        modalPriceHtml = `
            <div class="modal__price">
                ${product.precio ? '$' + product.precio.toLocaleString('es-CO') : 'Consultar precio'}
            </div>
        `;
    }

    const modalHTML = `
        <div class="modal${activeEventClass}" id="product-modal" style="--product-color: ${colors.principal}; --product-light: ${colors.secundario}; --product-accent: ${colors.acento}; --product-bg: ${colors.fondo};">
            <div class="modal__overlay" onclick="closeProductModal()"></div>
            <div class="modal__content" style="${activeEventStyle}">
                <button class="modal__close" onclick="closeProductModal()" aria-label="Cerrar detalles del producto">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
                
                <div class="modal__grid">
                    <div class="modal__image-section">
                        <div class="modal__image-container">
                            <img src="${product.imagen}" alt="${product.nombre}" class="modal__image" onerror="this.style.display='none'; this.parentElement.querySelector('.modal__fallback').style.display='flex';">
                            <div class="modal__fallback" style="display:none;">
                                <span style="font-size: 80px;">${product.emoji || '✦'}</span>
                            </div>
                        </div>
                        <div class="modal__badges">
                            <span class="modal__badge modal__badge--type">${product.tipo_olor}</span>
                            ${currentView === 'inicio' && product.categoria ? `<span class="modal__badge modal__badge--gender">${product.categoria === 'hombre' ? '♂ Para Hombre' : product.categoria === 'mujer' ? '♀ Para Mujer' : '⚬ Unisex'}</span>` : ''}
                        </div>
                    </div>
                    
                    <div class="modal__info-section">
                        <div class="modal__mood-glow modal__mood-glow--${product.tipo_olor}"></div>
                        <span class="modal__brand">${product.marca}</span>
                        <h2 class="modal__name">${product.nombre}</h2>
                        ${modalPriceHtml}
                        
                        <p class="modal__description">${product.descripcion_corta || product.descripcion}</p>
                        
                        <div class="modal__details">
                            <div class="modal__detail">
                                <span class="modal__detail-label">Transmite:</span>
                                <span class="modal__detail-value">${product.transmite || 'Elegancia y distinción'}</span>
                            </div>
                            <div class="modal__detail">
                                <span class="modal__detail-label">Ideal para:</span>
                                <span class="modal__detail-value">${product.ideal_para || 'Uso diario y ocasiones especiales'}</span>
                            </div>
                            <div class="modal__detail">
                                <span class="modal__detail-label">Duración:</span>
                                <span class="modal__detail-value">${product.duracion || 'Media (5-7 horas)'}</span>
                            </div>
                            <div class="modal__detail">
                                <span class="modal__detail-label">Intensidad:</span>
                                <span class="modal__detail-value">${product.intensidad || 'Moderada'}</span>
                            </div>
                        </div>
                        
                        <div class="modal__notes">
                            <h4>Notas de aroma</h4>
                            <div class="modal__notes-grid">
                                <div class="modal__note">
                                    <span class="modal__note-label">Salida</span>
                                    <span class="modal__note-value">${formatNotesValue(product.notas_salida, 'Bergamota, cítricos frescos')}</span>
                                </div>
                                <div class="modal__note">
                                    <span class="modal__note-label">Corazón</span>
                                    <span class="modal__note-value">${formatNotesValue(product.notas_corazon, 'Notas florales y especias')}</span>
                                </div>
                                <div class="modal__note">
                                    <span class="modal__note-label">Fondo</span>
                                    <span class="modal__note-value">${formatNotesValue(product.notas_fondo, 'Ámbar, sándalo y maderas')}</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="modal__actions-grid">
                            <a href="javascript:void(0)" class="modal__action-btn modal__action-btn--whatsapp" data-product-id="${product.id}" onclick="shareProductWhatsApp(event, '${(product.nombre || '').replace(/'/g, "\\'")}', '${(product.marca || '').replace(/'/g, "\\'")}', '${product.imagen}', ${modalPrecioFinal || 0})">
                                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.557-5.34 11.895-11.953 11.895-.005 0-.01 0-.015 0-2.006-.001-3.98-.51-5.73-1.479L0 24zm6.305-1.654l.361.214a9.878 9.878 0 005.031 1.378h.004c5.449 0 9.883-4.437 9.886-9.888a9.82 9.82 0 00-2.893-6.994c-2.267-2.27-5.282-3.52-8.483-3.52C6.442.336 2.008 4.77 2.006 10.22a9.86 9.86 0 001.51 5.26l.235.374-.998 3.649 3.741-.982zM17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                                </svg>
                                Consultar Disponibilidad
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Remove existing modal if any
    const existingModal = document.getElementById('product-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    document.body.style.overflow = 'hidden';
    document.body.classList.add('modal-open');

    if (updateHistory) {
        try {
            history.pushState({ type: 'modal', productId: productId }, '', '#producto-' + productId);
        } catch(e) {}
    }
    
    // Track click
    const whatsappBtn = document.querySelector('.modal__action-btn--whatsapp');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function() {
            ClickCounter.increment(productId);
        });
    }
}

function closeProductModal(updateHistory) {
    if (updateHistory === undefined) updateHistory = true;
    const modal = document.getElementById('product-modal');
    if (modal) {
        modal.classList.add('modal--closing');
        setTimeout(function() {
            modal.remove();
            document.body.style.overflow = '';
            document.body.classList.remove('modal-open');
        }, 220);
    }
    if (updateHistory && window.location.hash.startsWith('#producto-')) {
        try {
            history.back();
        } catch(e) {}
    }
}

// Close modal on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeProductModal();
    }
});

// === SHARE PRODUCT WITH IMAGE & PRICE ===
function shareProductWhatsApp(e, nombre, marca, imgPath, precio) {
    e.preventDefault();
    var baseUrl = window.location.origin + window.location.pathname.replace(/\/[^\/]*$/, '/');
    var fullUrl = baseUrl + imgPath;

    var brandName = (marca || '').trim();
    var prodName = (nombre || '').trim();
    var fullTitle = prodName;
    if (brandName && !prodName.toLowerCase().includes(brandName.toLowerCase())) {
        fullTitle += ' de ' + brandName;
    }

    var activeEvent = (typeof EventosManager !== 'undefined' && EventosManager.getEventoActivo) ? EventosManager.getEventoActivo() : null;
    var descPct = (typeof EventosManager !== 'undefined' && EventosManager.getDescuentoActivo) ? EventosManager.getDescuentoActivo() : 0;

    var priceText = '';
    if (precio && !isNaN(precio) && Number(precio) > 0) {
        if (descPct > 0 && activeEvent) {
            priceText = ' - $' + Number(precio).toLocaleString('es-CO') + ' (' + descPct + '% OFF Especial ' + activeEvent.nombre + ')';
        } else {
            priceText = ' - $' + Number(precio).toLocaleString('es-CO');
        }
    }

    var text = 'Hola, estoy interesado en el perfume *' + fullTitle + '*' + priceText + '.';

    if (navigator.share && navigator.canShare) {
        fetch(fullUrl)
            .then(function(res) { return res.blob(); })
            .then(function(blob) {
                var file = new File([blob], 'perfume.jpg', { type: 'image/jpeg' });
                var shareData = { title: fullTitle, text: text };
                if (navigator.canShare({ files: [file] })) {
                    shareData.files = [file];
                }
                return navigator.share(shareData);
            })
            .catch(function() {
                fallbackWhatsApp(fullUrl, text);
            });
    } else {
        fallbackWhatsApp(fullUrl, text);
    }
}

function fallbackWhatsApp(imgUrl, text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(imgUrl).then(function() {
            showToast('Imagen copiada. En WhatsApp pegala con Ctrl+V en el chat.');
            window.open('https://wa.me/573147551411?text=' + encodeURIComponent(text), '_blank');
        }).catch(function() {
            window.open('https://wa.me/573147551411?text=' + encodeURIComponent(text), '_blank');
        });
    } else {
        window.open('https://wa.me/573147551411?text=' + encodeURIComponent(text), '_blank');
    }
}

function showToast(message) {
    var existing = document.getElementById('copy-toast');
    if (existing) existing.remove();

    var toast = document.createElement('div');
    toast.id = 'copy-toast';
    toast.textContent = message;
    toast.style.cssText = 'position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:#111827;color:#fff;padding:14px 24px;border-radius:8px;font-size:14px;z-index:10000;box-shadow:0 4px 20px rgba(0,0,0,0.3);animation:toastIn 0.3s ease;max-width:90%;text-align:center;';
    document.body.appendChild(toast);

    setTimeout(function() {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.3s ease';
        setTimeout(function() { toast.remove(); }, 300);
    }, 4000);
}

document.addEventListener('DOMContentLoaded', function() {

    // === INITIALIZE VIEW SYSTEM ===
    // Show 'inicio' by default, hide all others
    const allViews = document.querySelectorAll('.view');
    allViews.forEach(function(v) {
        v.style.display = 'none';
    });
    const inicioView = document.getElementById('view-inicio');
    if (inicioView) {
        inicioView.style.display = 'block';
        inicioView.style.paddingTop = '0';
        inicioView.setAttribute('data-active', 'true');
    }

    // Ocultar en el footer el link de la sección activa al cargar (inicio)
    const allFooterViews = ['inicio', 'quienes-somos', 'nuevos', 'hombre', 'mujer', 'unisex', 'ubicacion'];
    allFooterViews.forEach(function(id) {
        const li = document.getElementById('footer-link-' + id);
        if (li) li.style.display = id === 'inicio' ? 'none' : '';
    });

    // === HEADER SCROLL ===
    const header = document.getElementById('header');
    let lastScrollY = 0;

    function handleScroll() {
        if (document.body.classList.contains('aura-chat-active')) {
            header.classList.add('header--hidden');
            return;
        }

        const currentScrollY = window.pageYOffset;
        const scrollDelta = currentScrollY - lastScrollY;

        if (currentScrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        if (currentScrollY > 150) {
            if (scrollDelta > 5) {
                header.classList.add('header--hidden');
            } else if (scrollDelta < -5) {
                header.classList.remove('header--hidden');
            }
        } else {
            header.classList.remove('header--hidden');
        }

        lastScrollY = currentScrollY;
    }

    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });

    // === MOBILE MENU ===
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const navMenu = document.getElementById('nav-menu');
    const navOverlay = document.getElementById('nav-overlay');

    function openMobileNav(updateHistory) {
        if (updateHistory === undefined) updateHistory = true;
        if (navMenu) navMenu.classList.add('active');
        if (navOverlay) navOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        if (updateHistory) {
            try {
                history.pushState({ type: 'menu' }, '', '#menu');
            } catch(e) {}
        }
    }

    function closeMobileNav(updateHistory) {
        if (updateHistory === undefined) updateHistory = true;
        if (navMenu) navMenu.classList.remove('active');
        if (navOverlay) navOverlay.classList.remove('active');
        document.body.style.overflow = '';
        if (updateHistory && window.location.hash === '#menu') {
            try {
                history.back();
            } catch(e) {}
        }
    }

    if (navToggle) {
        navToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            if (navMenu && navMenu.classList.contains('active')) {
                closeMobileNav();
            } else {
                openMobileNav();
            }
        });
    }

    if (navClose) {
        navClose.addEventListener('click', function(e) {
            e.stopPropagation();
            closeMobileNav();
        });
    }

    if (navOverlay) {
        navOverlay.addEventListener('click', function() {
            closeMobileNav();
        });
    }

    // === GESTIÓN GLOBAL DE HISTORIAL / BOTONES DEL CELULAR ===
    initHistoryNavigation();

    // === DELEGACIÓN GLOBAL DE EVENTOS DE TARJETAS ===
    initCardEventDelegation();

    // === LOAD PRODUCTS ===
    loadProducts();

});

// === INICIALIZACIÓN DE NAVEGACIÓN Y HISTORIAL DE NAVEGADOR ===
function initHistoryNavigation() {
    var validViews = ['inicio', 'quienes-somos', 'nuevos', 'hombre', 'mujer', 'unisex', 'ubicacion'];
    var hash = window.location.hash ? window.location.hash.replace('#', '') : '';

    if (hash && validViews.indexOf(hash) !== -1) {
        try {
            history.replaceState({ type: 'view', view: hash }, '', '#' + hash);
        } catch(e) {}
        if (hash !== 'inicio') {
            showView(hash, false);
        }
    } else {
        try {
            history.replaceState({ type: 'view', view: 'inicio' }, '', '#inicio');
        } catch(e) {}
    }

    window.addEventListener('popstate', function(e) {
        // 1. Si hay modal de producto abierto, cerrarlo sin navegar fuera
        var modal = document.getElementById('product-modal');
        if (modal) {
            closeProductModal(false);
            return;
        }

        // 2. Si el asistente de IA está abierto, cerrarlo
        if (document.body.classList.contains('aura-chat-active')) {
            if (typeof AuraAI !== 'undefined' && AuraAI.toggle) {
                AuraAI.toggle(false);
                return;
            }
        }

        // 3. Si el menú móvil está abierto, cerrarlo
        var navMenu = document.getElementById('nav-menu');
        if (navMenu && navMenu.classList.contains('active')) {
            var navOverlay = document.getElementById('nav-overlay');
            if (navMenu) navMenu.classList.remove('active');
            if (navOverlay) navOverlay.classList.remove('active');
            document.body.style.overflow = '';
            return;
        }

        // 4. Navegar a la vista correspondiente
        if (e.state && e.state.view) {
            showView(e.state.view, false);
        } else if (window.location.hash) {
            var h = window.location.hash.replace('#', '');
            if (validViews.indexOf(h) !== -1) {
                showView(h, false);
            } else {
                showView('inicio', false);
            }
        } else {
            showView('inicio', false);
        }
    });
}

// === RENDER FEATURED PRODUCTS ===
function renderFeaturedProducts() {
    const container = document.getElementById('featured-products');
    const section = document.getElementById('destacados');
    if (!container || !section) return;
    
    const featured = products.filter(function(p) {
        return p.destacado && p.activo;
    });
    
    if (featured.length === 0) {
        section.style.display = 'none';
        return;
    }
    
    section.style.display = 'block';
    container.innerHTML = featured.map(function(product) {
        return createProductCard(product);
    }).join('');
    
    attachCardClickListeners();
}

// === DEFAULT PRODUCTS (FALLBACK) ===
function getDefaultProducts() {
    return [
        {
            id: 1,
            nombre: "Clinique Happy For Men",
            marca: "Clinique",
            descripcion: "Un clásico atemporal de la perfumería masculina. Clinique Happy es una explosión de frescura y vitalidad que captura la esencia de la felicidad en cada gota. Su composición cítrica y aromática fue diseñada para el hombre moderno que busca transmitir confianza y buen ánimo sin esfuerzo.",
            descripcion_corta: "Fragancia cítrica y aromática que transmite frescura, alegría y vitalidad.",
            notas: "Lima, mandarina, notas marinas, jazmín, cedro, ciprés",
            notas_salida: "Lima, mandarina, limón",
            notas_corazon: "Notas marinas, jazmín, rosa, lirio",
            notas_fondo: "Cedro, ciprés, madera de guayaco",
            tamanio: "100 ml / 3.4 oz",
            tipo_olor: "fresco",
            transmite: "Frescura, alegría, vitalidad, energía, ligereza",
            ideal_para: "Días cálidos, uso diario, oficina, citas casuales, verano",
            duracion: "Media (4-6 horas)",
            intensidad: "Moderada - Ideal para uso diurno",
            precio: 110000,
            precio_anterior: null,
            imagen: "Perfumes Mujer/clinique-happy-men.jpg",
            categoria: "hombre",
            colores: {
                principal: "#E89B3E",
                secundario: "#F5C77E",
                acento: "#C9A96E",
                fondo: "#FFF8F0"
            },
            emoji: "🌊",
            en_promocion: false,
            activo: true
        }
    ];
}

// === RENDER PRODUCTS WITH FILTERS (BAJO DEMANDA) ===
function renderNuevosProducts() {
    populateAromaSelect('nuevos');
    updateNameDropdownOptions('nuevos');
    applyFilters('nuevos');
}

function renderHombreProducts() {
    populateAromaSelect('hombre');
    updateNameDropdownOptions('hombre');
    applyFilters('hombre');
}

function renderMujerProducts() {
    populateAromaSelect('mujer');
    updateNameDropdownOptions('mujer');
    applyFilters('mujer');
}

function renderUnisexProducts() {
    populateAromaSelect('unisex');
    updateNameDropdownOptions('unisex');
    applyFilters('unisex');
}

// === REFRESH ALL PRODUCT VIEWS (CUANDO CAMBIA UN EVENTO) ===
function refreshAllProductViews() {
    renderFeaturedProducts();
    if (currentView === 'nuevos') {
        renderNuevosProducts();
    } else if (currentView === 'hombre') {
        renderHombreProducts();
    } else if (currentView === 'mujer') {
        renderMujerProducts();
    } else if (currentView === 'unisex') {
        renderUnisexProducts();
    }
}
window.refreshAllProductViews = refreshAllProductViews;

// === DYNAMIC NAME SELECT POPULATION ===
function populateNameSelects() {
    var categories = ['nuevos', 'hombre', 'mujer', 'unisex'];
    categories.forEach(function(cat) {
        populateAromaSelect(cat);
        updateNameDropdownOptions(cat);
    });
}

// === VERIFY 7-DAY NEW PRODUCT RULE ===
function isProductNew(p) {
    if (!p || !p.activo) return false;
    
    var isCandidate = p.es_nuevo === true || p.nuevo === true || [339, 340, 341].indexOf(p.id) !== -1;
    if (!isCandidate) return false;
    
    var fechaStr = p.fecha_ingreso || p.fecha_creacion || '2026-08-13';
    var fechaProd = new Date(fechaStr + 'T00:00:00');
    var ahora = new Date();
    
    var diffMs = ahora.getTime() - fechaProd.getTime();
    var diffDias = diffMs / (1000 * 60 * 60 * 24);
    
    return diffDias >= 0 && diffDias <= 7;
}

// === DYNAMIC AROMA SELECT POPULATION ===
function populateAromaSelect(category) {
    var aromaSelect = document.querySelector('.filter-select--aroma[data-target="' + category + '"]');
    if (!aromaSelect) return;

    var aromas = {};
    products.forEach(function(p) {
        if (!p.activo) return;
        if (category === 'nuevos') {
            if (!isProductNew(p)) return;
        } else if (p.categoria !== category) {
            return;
        }
        var tipo = (p.tipo_olor || '').trim();
        if (!tipo) return;
        // Extract main aroma type from compound types
        var mainAroma = tipo.split(' ')[0].toLowerCase();
        aromas[mainAroma] = (aromas[mainAroma] || 0) + 1;
    });

    var aromaLabels = {
        'floral': 'Floral',
        'dulce': 'Dulce',
        'fresco': 'Fresco',
        'oriental': 'Oriental',
        'amaderado': 'Amaderado',
        'citrico': 'Citrico',
        'frutal': 'Frutal',
        'oud': 'Oud',
        'acuatica': 'Acuatica',
        'gourmand': 'Gourmand',
        'especiado': 'Especiado',
        'aromatica': 'Aromatica',
        'otro': 'Otros'
    };

    var optionsHTML = '<option value="todos">Todos los aromas</option>';
    var sorted = Object.keys(aromas).sort();
    sorted.forEach(function(key) {
        var label = aromaLabels[key] || key.charAt(0).toUpperCase() + key.slice(1);
        optionsHTML += '<option value="' + key + '">' + label + ' (' + aromas[key] + ')</option>';
    });

    aromaSelect.innerHTML = optionsHTML;
}

// === SEARCH TEXT NORMALIZATION & MATCHING ===
function normalizeSearchText(str) {
    if (!str) return '';
    var s = String(str).toLowerCase()
        .replace(/channel/g, 'chanel')
        .replace(/gautier/g, 'gaultier')
        .replace(/milano/g, 'milano');
    try {
        return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    } catch(e) {
        return s;
    }
}

function matchSearchQuery(p, query) {
    if (!query) return true;
    var qNorm = normalizeSearchText(query);
    var words = qNorm.split(/\s+/).filter(Boolean);
    if (words.length === 0) return true;
    
    var nameNorm = normalizeSearchText(p.nombre);
    var brandNorm = normalizeSearchText(p.marca);
    var descNorm = normalizeSearchText(p.descripcion_corta || p.descripcion);
    var scentNorm = normalizeSearchText(p.tipo_olor);
    
    return words.every(function(word) {
        return nameNorm.indexOf(word) !== -1 ||
               brandNorm.indexOf(word) !== -1 ||
               descNorm.indexOf(word) !== -1 ||
               scentNorm.indexOf(word) !== -1;
    });
}

function formatNotesValue(notes, fallback) {
    if (Array.isArray(notes)) {
        var filtered = notes.filter(function(n) { return n && String(n).trim().length > 0; });
        if (filtered.length > 0) return filtered.join(', ');
    } else if (typeof notes === 'string' && notes.trim().length > 0) {
        return notes.trim();
    }
    return fallback;
}

// === UPDATE NAME DROPDOWN OPTIONS ===
function updateNameDropdownOptions(category) {
    var searchInput = document.querySelector('.search-bar__input[data-target="' + category + '"]');
    var aromaSelect = document.querySelector('.filter-select--aroma[data-target="' + category + '"]');
    var nombreSelect = document.querySelector('.filter-select--nombre[data-target="' + category + '"]');
    
    if (!nombreSelect) return;
    
    var query = searchInput ? searchInput.value.trim() : '';
    var aroma = aromaSelect ? aromaSelect.value : 'todos';
    var currentSelectedName = nombreSelect.value;
    
    // Filter matching products for this dropdown
    var matchingProducts = products.filter(function(p) {
        if (!p.activo) return false;
        if (category === 'nuevos') {
            if (!isProductNew(p)) return false;
        } else if (p.categoria !== category) {
            return false;
        }
        if (query && !matchSearchQuery(p, query)) return false;
        if (aroma !== 'todos') {
            var tipoLower = (p.tipo_olor || '').toLowerCase();
            if (tipoLower.indexOf(aroma) === -1) return false;
        }
        return true;
    });
    
    // Get unique sorted names
    var names = matchingProducts.map(function(p) { return p.nombre; });
    names = names.filter(function(value, index, self) {
        return self.indexOf(value) === index;
    });
    names.sort(function(a, b) { return a.localeCompare(b); });
    
    // Rebuild options HTML
    var optionsHTML = '<option value="todos">Todos los nombres</option>';
    names.forEach(function(name) {
        optionsHTML += '<option value="' + name + '">' + name + '</option>';
    });
    
    nombreSelect.innerHTML = optionsHTML;
    
    // Try to restore previous selection if it's still in the list
    if (names.indexOf(currentSelectedName) !== -1) {
        nombreSelect.value = currentSelectedName;
    } else {
        nombreSelect.value = 'todos';
    }
}

// === APPLY ADVANCED FILTERS ===
function applyFilters(category) {
    var searchInput = document.querySelector('.search-bar__input[data-target="' + category + '"]');
    var aromaSelect = document.querySelector('.filter-select--aroma[data-target="' + category + '"]');
    var nombreSelect = document.querySelector('.filter-select--nombre[data-target="' + category + '"]');
    var container = document.getElementById(category + '-products');
    var countEl = document.getElementById(category + '-results-count');
    
    if (!container) return;
    
    var query = searchInput ? searchInput.value.trim() : '';
    var aroma = aromaSelect ? aromaSelect.value : 'todos';
    var nombre = nombreSelect ? nombreSelect.value : 'todos';
    
    // Filter products
    var filtered = products.filter(function(p) {
        if (!p.activo) return false;
        if (category === 'nuevos') {
            if (!isProductNew(p)) return false;
        } else if (p.categoria !== category) {
            return false;
        }
        
        // Match search query (name, brand, short desc, scent type) - multi-word matching
        if (query && !matchSearchQuery(p, query)) return false;
        
        // Match aroma
        if (aroma !== 'todos') {
            var tipoLower = (p.tipo_olor || '').toLowerCase();
            if (tipoLower.indexOf(aroma) === -1) return false;
        }
        
        // Match name
        if (nombre !== 'todos' && p.nombre !== nombre) return false;
        
        return true;
    });
    
    // Render products
    if (filtered.length === 0) {
        if (category === 'nuevos' && !query && aroma === 'todos' && nombre === 'todos') {
            container.innerHTML = '<div class="no-results no-results--nuevos">' +
                '<div class="no-results__icon">✨</div>' +
                '<p class="no-results__text">¡Mantente al tanto!</p>' +
                '<p class="no-results__sub">Pronto agregaremos nuevas fragancias y lanzamientos exclusivos a nuestro catálogo.</p>' +
            '</div>';
        } else {
            var otherCatMatches = [];
            if (query) {
                ['nuevos', 'hombre', 'mujer', 'unisex'].forEach(function(cat) {
                    if (cat === category) return;
                    var found = products.some(function(p) {
                        if (!p.activo) return false;
                        if (cat === 'nuevos') {
                            if (!isProductNew(p)) return false;
                        } else if (p.categoria !== cat) {
                            return false;
                        }
                        return matchSearchQuery(p, query);
                    });
                    if (found) otherCatMatches.push(cat);
                });
            }
            
            var subText = 'Intenta con otros filtros o términos de búsqueda';
            if (otherCatMatches.length > 0) {
                var catLabels = otherCatMatches.map(function(c) {
                    return '<a href="javascript:void(0)" onclick="showView(\'' + c + '\')" style="color:var(--color-accent,#C9A96E);font-weight:600;text-decoration:underline;">' + c.toUpperCase() + '</a>';
                }).join(' o ');
                subText = '💡 Se encontraron fragancias en la sección ' + catLabels + '.';
            }
            
            container.innerHTML = '<div class="no-results"><div class="no-results__icon">🔍</div><p class="no-results__text">No se encontraron fragancias en esta sección</p><p class="no-results__sub">' + subText + '</p></div>';
        }
    } else {
        container.innerHTML = filtered.map(function(product) {
            return createProductCard(product, category);
        }).join('');
    }
    
    // Update results count label
    if (countEl) {
        if (query || aroma !== 'todos' || nombre !== 'todos') {
            countEl.textContent = filtered.length + ' resultado' + (filtered.length !== 1 ? 's' : '') + ' encontrado' + (filtered.length !== 1 ? 's' : '');
        } else {
            countEl.textContent = '';
        }
    }
    
    attachCardClickListeners();
    updateScrollReveal();
}

// === Scent badge class mapping ===
function getScentBadgeClass(tipoOlor) {
    var key = (tipoOlor || '').toLowerCase();
    if (key.indexOf('oud') !== -1) return 'oud';
    if (key.indexOf('gourmand') !== -1 || key.indexOf('dulce') !== -1) return 'gourmand';
    if (key.indexOf('acuati') !== -1) return 'acuatica';
    if (key.indexOf('frutal') !== -1 || key.indexOf('afrutado') !== -1) return 'frutal';
    if (key.indexOf('floral') !== -1) return 'floral';
    if (key.indexOf('oriental') !== -1) return 'oriental';
    if (key.indexOf('amaderado') !== -1 || key.indexOf('madera') !== -1) return 'amaderado';
    if (key.indexOf('especiado') !== -1) return 'especiado';
    if (key.indexOf('citri') !== -1 || key.indexOf('citrico') !== -1) return 'citrico';
    if (key.indexOf('fresco') !== -1 || key.indexOf('fresh') !== -1) return 'fresco';
    if (key.indexOf('aromatic') !== -1 || key.indexOf('herbal') !== -1) return 'aromatica';
    if (key.indexOf('elegante') !== -1 || key.indexOf('classico') !== -1) return 'elegante';
    if (key.indexOf('varios') !== -1 || key.indexOf('otro') !== -1) return 'otros';
    if (key.indexOf('rosa') !== -1 || key.indexOf('flor') !== -1) return 'floral';
    if (key.indexOf('tropical') !== -1) return 'frutal';
    return 'otros';
}

// === Scent badge emoji ===
function getScentEmoji(tipoOlor) {
    var key = (tipoOlor || '').toLowerCase();
    if (key.indexOf('oud') !== -1) return '\u{1F33F}';
    if (key.indexOf('gourmand') !== -1 || key.indexOf('dulce') !== -1) return '\u{1F36D}';
    if (key.indexOf('acuati') !== -1) return '\u{1F30A}';
    if (key.indexOf('frutal') !== -1 || key.indexOf('afrutado') !== -1) return '\u{1F34E}';
    if (key.indexOf('floral') !== -1) return '\u{1F338}';
    if (key.indexOf('oriental') !== -1) return '\u{1F319}';
    if (key.indexOf('amaderado') !== -1 || key.indexOf('madera') !== -1) return '\u{1FAB5}';
    if (key.indexOf('especiado') !== -1) return '\u2728';
    if (key.indexOf('citri') !== -1 || key.indexOf('citrico') !== -1) return '\u{1F34B}';
    if (key.indexOf('fresco') !== -1 || key.indexOf('fresh') !== -1) return '\u{1F30A}';
    if (key.indexOf('aromatic') !== -1 || key.indexOf('herbal') !== -1) return '\u{1F33F}';
    if (key.indexOf('elegante') !== -1 || key.indexOf('classico') !== -1) return '\u{1F451}';
    if (key.indexOf('varios') !== -1 || key.indexOf('otro') !== -1) return '\u2726';
    if (key.indexOf('rosa') !== -1 || key.indexOf('flor') !== -1) return '\u{1F338}';
    if (key.indexOf('tropical') !== -1) return '\u{1F34E}';
    return '\u2726';
}

// === Get intensity level (1-5) from text ===
function getIntensityLevel(intensidad) {
    if (!intensidad) return 3;
    var text = intensidad.toLowerCase();
    if (text.indexOf('muy alta') !== -1 || text.indexOf('muy fuerte') !== -1) return 5;
    if (text.indexOf('alta') !== -1 || text.indexOf('fuerte') !== -1) return 4;
    if (text.indexOf('moderada-alta') !== -1 || text.indexOf('moderada fuerte') !== -1) return 4;
    if (text.indexOf('moderada') !== -1) return 3;
    if (text.indexOf('suave-moderada') !== -1 || text.indexOf('suave moderada') !== -1) return 2;
    if (text.indexOf('suave') !== -1 || text.indexOf('ligera') !== -1) return 1;
    return 3;
}

// === Creative description based on product ===
function getCreativeText(product) {
    if (product.descripcion_corta && product.descripcion_corta.length > 20) {
        var text = product.descripcion_corta;
        if (text.length > 60) {
            text = text.substring(0, 57) + '...';
        }
        return text;
    }
    if (product.transmite) {
        var parts = product.transmite.split(',');
        if (parts.length >= 2) {
            return 'Evoca ' + parts[0].trim().toLowerCase() + ' y ' + parts[1].trim().toLowerCase();
        }
        return 'Evoca ' + parts[0].trim().toLowerCase();
    }
    return '';
}

// === CREATE PRODUCT CARD ===
function createProductCard(product, viewTarget) {
    var colors = product.colores || {
        principal: '#C9A96E',
        secundario: '#E8D5B7'
    };
    
    var descPct = (typeof EventosManager !== 'undefined' && EventosManager.getDescuentoActivo) ? EventosManager.getDescuentoActivo() : 0;
    var precioOriginal = product.precio || 0;
    var precioFinal = (descPct > 0 && precioOriginal > 0) ? EventosManager.calcularPrecioConDescuento(precioOriginal) : precioOriginal;

    var priceDisplay = '';
    if (descPct > 0 && precioOriginal > 0) {
        priceDisplay = '<div class="product-card__price-wrap">' +
            '<span class="product-card__price-old">$' + precioOriginal.toLocaleString('es-CO') + '</span>' +
            '<span class="product-card__price">$' + precioFinal.toLocaleString('es-CO') + '</span>' +
        '</div>';
    } else {
        priceDisplay = '<div class="product-card__price">' + (precioOriginal ? '$' + precioOriginal.toLocaleString('es-CO') : 'Consultar precio') + '</div>';
    }
    
    var discountBadge = descPct > 0 
        ? '<span class="product-card__badge product-card__badge--discount">-' + descPct + '%</span>'
        : '';

    var promoBadge = (product.en_promocion && !discountBadge)
        ? '<span class="product-card__badge product-card__badge--promo">Oferta</span>'
        : '';
    
    var scentClass = getScentBadgeClass(product.tipo_olor);
    var scentEmoji = getScentEmoji(product.tipo_olor);
    var intensityLevel = getIntensityLevel(product.intensidad);
    var creativeText = getCreativeText(product);
    
    var intensityDots = '';
    for (var i = 1; i <= 5; i++) {
        intensityDots += '<span class="product-card__intensity-dot' + (i <= intensityLevel ? ' active' : '') + '"></span>';
    }
    
    var imageHtml = '<img src="' + product.imagen + '" alt="' + product.nombre + '" loading="lazy" onerror="this.onerror=null; this.style.display=\'none\'; this.parentElement.querySelector(\'.product-card__fallback\').style.display=\'flex\';">';
    
    var fallbackHtml = '<div class="product-card__fallback" style="display:none;">' + (product.emoji || '✦') + '</div>';
    
    var creativeHtml = creativeText 
        ? '<p class="product-card__creative">' + creativeText + '</p>'
        : '';
    
    var isNuevosSection = (viewTarget === 'nuevos') || (currentView === 'nuevos');
    var genderBadge = '';
    if (isNuevosSection) {
        var cat = (product.categoria || product.genero || '').toLowerCase();
        if (cat === 'hombre') {
            genderBadge = '<span class="product-card__gender-badge product-card__gender-badge--hombre">♂ Hombre</span>';
        } else if (cat === 'mujer') {
            genderBadge = '<span class="product-card__gender-badge product-card__gender-badge--mujer">♀ Mujer</span>';
        } else if (cat === 'unisex') {
            genderBadge = '<span class="product-card__gender-badge product-card__gender-badge--unisex">⚬ Unisex</span>';
        }
    }

    return '<div class="product-card" data-id="' + product.id + '" style="--card-color: ' + colors.principal + '; --card-light: ' + colors.secundario + '; --btn-color: #C9A96E;">' +
        '<div class="product-card__image">' +
            imageHtml +
            fallbackHtml +
            discountBadge +
            promoBadge +
            '<span class="product-card__type">' + (product.emoji || '✦') + '</span>' +
        '</div>' +
        '<div class="product-card__content">' +
            '<div class="product-card__tags-row" style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:8px;">' +
                '<span class="product-card__scent-badge product-card__scent-badge--' + scentClass + '">' + scentEmoji + ' ' + product.tipo_olor + '</span>' +
                genderBadge +
            '</div>' +
            '<h3 class="product-card__name">' + product.nombre + '</h3>' +
            '<p class="product-card__brand">' + product.marca + '</p>' +
            '<div class="product-card__intensity">' +
                '<span class="product-card__intensity-label">Intensidad</span>' +
                '<div class="product-card__intensity-dots">' + intensityDots + '</div>' +
            '</div>' +
            creativeHtml +
            '<div class="product-card__footer">' +
                priceDisplay +
                '<button class="product-card__details-btn" data-id="' + product.id + '">' +
                    'Ver más' +
                    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>' +
                '</button>' +
            '</div>' +
        '</div>' +
    '</div>';
}

// === DELEGACIÓN GLOBAL DE EVENTOS DE TARJETAS (CERO RETARDO) ===
var cardDelegationInitialized = false;

function initCardEventDelegation() {
    if (cardDelegationInitialized) return;
    cardDelegationInitialized = true;

    document.addEventListener('click', function(e) {
        var detailBtn = e.target.closest('.product-card__details-btn');
        if (detailBtn) {
            e.stopPropagation();
            var btnId = parseInt(detailBtn.getAttribute('data-id'));
            if (btnId) openProductModal(btnId);
            return;
        }

        var card = e.target.closest('.product-card');
        if (card) {
            var cardId = parseInt(card.getAttribute('data-id'));
            if (cardId) openProductModal(cardId);
            return;
        }
    });
}

function attachCardClickListeners() {
    // Delegación global activa: no se requiere recorrer tarjetas en cada render
}

// === SEARCH AND FILTER FUNCTIONALITY ===
var searchTimeout = null;

function initSearch() {
    var searchInputs = document.querySelectorAll('.search-bar__input');
    searchInputs.forEach(function(input) {
        input.addEventListener('input', function() {
            var query = this.value.trim();
            var clearBtn = this.parentElement.querySelector('.search-bar__clear');
            if (clearBtn) {
                clearBtn.classList.toggle('visible', query.length > 0);
            }
            
            clearTimeout(searchTimeout);
            var self = this;
            searchTimeout = setTimeout(function() {
                var target = self.getAttribute('data-target');
                updateNameDropdownOptions(target);
                applyFilters(target);
            }, 200);
        });
    });
    
    // Clear buttons
    var clearBtns = document.querySelectorAll('.search-bar__clear');
    clearBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            var input = this.parentElement.querySelector('.search-bar__input');
            if (input) {
                input.value = '';
                input.dispatchEvent(new Event('input'));
                input.focus();
            }
        });
    });

    // Aroma selects
    var aromaSelects = document.querySelectorAll('.filter-select--aroma');
    aromaSelects.forEach(function(select) {
        select.addEventListener('change', function() {
            var target = this.getAttribute('data-target');
            updateNameDropdownOptions(target);
            applyFilters(target);
        });
    });

    // Nombre selects
    var nameSelects = document.querySelectorAll('.filter-select--nombre');
    nameSelects.forEach(function(select) {
        select.addEventListener('change', function() {
            var target = this.getAttribute('data-target');
            applyFilters(target);
        });
    });
}

// === DYNAMIC STATS ===
function updateDynamicStats() {
    var totalProducts = products.filter(function(p) { return p.activo; }).length;
    var hombreCount = products.filter(function(p) { return p.categoria === 'hombre' && p.activo; }).length;
    var mujerCount = products.filter(function(p) { return p.categoria === 'mujer' && p.activo; }).length;
    var unisexCount = products.filter(function(p) { return p.categoria === 'unisex' && p.activo; }).length;
    
    // Update stat numbers if elements exist
    var statTotal = document.getElementById('stat-total-fragancias');
    var statHombre = document.getElementById('stat-hombre-fragancias');
    var statMujer = document.getElementById('stat-mujer-fragancias');
    var statUnisex = document.getElementById('stat-unisex-fragancias');
    
    if (statTotal) statTotal.textContent = '+' + totalProducts;
    if (statHombre) statHombre.textContent = '+' + hombreCount;
    if (statMujer) statMujer.textContent = '+' + mujerCount;
    if (statUnisex) statUnisex.textContent = '+' + unisexCount;
}

// === SCROLL REVEAL OPTIMIZADO CON RAF ===
var scrollRevealObserver = null;
var scrollRevealRafId = null;

function updateScrollReveal() {
    if (scrollRevealRafId) cancelAnimationFrame(scrollRevealRafId);
    scrollRevealRafId = requestAnimationFrame(function() {
        scrollRevealRafId = null;
        _doUpdateScrollReveal();
    });
}

function _doUpdateScrollReveal() {
    var revealSelector = [
        '.product-card',
        '.about__card',
        '.about__value',
        '.location__card',
        '.location__visual',
        '.footer__grid > div',
        '.seasonal-section__header'
    ].map(function(s) { return s + ':not(.reveal--active)'; }).join(', ');

    var cards = document.querySelectorAll(revealSelector);
    if (!cards.length) return;

    cards.forEach(function(card, index) {
        card.style.setProperty('--card-index', index % 4);
        if (!card.classList.contains('reveal')) {
            card.classList.add('reveal');
        }
    });

    if (!('IntersectionObserver' in window)) {
        cards.forEach(function(card) { card.classList.add('reveal--active'); });
        return;
    }

    if (!scrollRevealObserver) {
        scrollRevealObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal--active');
                    scrollRevealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '50px' });
    }

    cards.forEach(function(card) {
        if (!card.classList.contains('reveal--active')) {
            scrollRevealObserver.observe(card);
        }
    });
}

// === INITIALIZE PRODUCTS (OPTIMIZADO PARA CARGA INSTANTÁNEA) ===
function initProducts() {
    // Solo renderizar lo visible en 'inicio' para que la página responda al instante
    renderFeaturedProducts();
    renderFraganciaDelMes();
    updateDynamicStats();
    initSearch();
    updateScrollReveal();

    // Inicializar eventos estacionales
    if (typeof EventosManager !== 'undefined') {
        EventosManager.initEventos();
    }

    // Pre-cargar selects y filtros de las otras secciones durante el tiempo ocioso (idle)
    // sin bloquear la respuesta táctil ni visual de la página
    var idleCallback = window.requestIdleCallback || function(cb) { setTimeout(cb, 600); };
    idleCallback(function() {
        populateNameSelects();
    });
}

// === FRAGRANCIA DEL MES ===
function renderFraganciaDelMes() {
    var container = document.getElementById('featured-card-dynamic');
    if (!container || !products || products.length === 0) return;

    var month = new Date().getMonth(); // 0-11

    // Map each month to a scent type that fits the season
    var monthScentMap = {
        0: 'oriental',    // Enero - invierno, calidez
        1: 'floral',      // Febrero - San Valentín, romance
        2: 'fresco',      // Marzo - inicio primavera, frescura
        3: 'floral',      // Abril - primavera, flores
        4: 'citrico',     // Mayo - primavera, cítricos
        5: 'acuatica',    // Junio - verano, acuática
        6: 'acuatica',    // Julio - verano, acuática
        7: 'frutal',      // Agosto - verano, frutal
        8: 'amaderado',   // Septiembre - otoño, madera
        9: 'especiado',   // Octubre - otoño, especias
        10: 'oriental',   // Noviembre - frío, oriental
        11: 'oriental'    // Diciembre - frío, oriental
    };

    var targetScent = monthScentMap[month];

    // Find a highlighted/featured product of that scent type, or any product
    var candidate = products.find(function(p) {
        return p.destacado && p.activo && p.tipo_olor && p.tipo_olor.toLowerCase().indexOf(targetScent) !== -1;
    });
    if (!candidate) {
        candidate = products.find(function(p) {
            return p.activo && p.tipo_olor && p.tipo_olor.toLowerCase().indexOf(targetScent) !== -1;
        });
    }
    if (!candidate) {
        candidate = products.find(function(p) { return p.activo; });
    }
    if (!candidate) return;

    container.querySelector('.featured-card__tag').textContent = 'Fragancia del Mes';
    container.querySelector('.featured-card__title').textContent = candidate.nombre;
    container.querySelector('.featured-card__brand').textContent = candidate.marca;
    container.querySelector('.featured-card__desc').textContent = candidate.descripcion_corta || candidate.descripcion;

    // FIX: antes solo el boton "Explorar Aroma" abria el producto.
    // Ahora toda la tarjeta es clicable (igual que las demas tarjetas del sitio),
    // con soporte de teclado para accesibilidad.
    container.style.cursor = 'pointer';
    container.setAttribute('role', 'button');
    container.setAttribute('tabindex', '0');
    container.setAttribute('aria-label', 'Ver detalles de ' + candidate.nombre);
    container.onclick = function() { openProductModal(candidate.id); };
    container.onkeydown = function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openProductModal(candidate.id);
        }
    };

    var btn = container.querySelector('.featured-card__btn');
    if (btn) {
        // stopPropagation para que no se abra el modal dos veces al hacer
        // clic justo en el boton (el clic ya burbujea hasta la tarjeta).
        btn.onclick = function(e) {
            e.stopPropagation();
            openProductModal(candidate.id);
        };
    }
}

// === LOAD PRODUCTS ===
async function loadProducts() {
    // 1. Datos embebidos via JS (funciona siempre, sin fetch)
    if (window.__CATALOGO_PRODUCTOS && window.__CATALOGO_PRODUCTOS.length > 0) {
        console.log('Productos cargados desde JS embebido:', window.__CATALOGO_PRODUCTOS.length);
        products = window.__CATALOGO_PRODUCTOS;
        initProducts();
        return;
    }

    // 2. Intentar API de base de datos (InfinityFree)
    try {
        var response = await fetch('api/productos.php');
        if (response.ok) {
            var data = await response.json();
            if (data && data.length > 0 && !data.error) {
                products = data;
                initProducts();
                return;
            }
        }
    } catch (e) {
        console.log('API no disponible, intentando JSON:', e);
    }
    
    // 3. Cargar desde JSON (GitHub Pages)
    try {
        var response2 = await fetch('data/productos.json');
        if (response2.ok) {
            var data2 = await response2.json();
            if (data2 && data2.length > 0) {
                products = data2;
                initProducts();
                return;
            }
        }
    } catch (e2) {
        console.log('JSON no disponible:', e2);
    }
    
    // 4. Último recurso: productos por defecto
    console.log('Usando productos por defecto');
    products = getDefaultProducts();
    initProducts();
}
