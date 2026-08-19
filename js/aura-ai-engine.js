/* ==========================================================================
   AURA AI ENGINE — Transformers.js Integration
   Capa de IA avanzada: Sentiment Analysis + Zero-Shot Classification
   Carga dinámica: funciona con file:// (sin IA) y http:// (con IA completa)
   ========================================================================== */

var AuraAIEngine = (function() {
    'use strict';

    var engine = {
        ready: false,
        loading: false,
        pipelineFn: null,
        sentimentClassifier: null,
        intentClassifier: null,
        error: null
    };

    var MODELS = {
        sentiment: 'Xenova/distilbert-base-uncased-finetuned-sst-2-english',
        zeroShot: 'Xenova/bart-large-mnli'
    };

    var INTENT_LABELS = [
        'buscar perfume para hombre',
        'buscar perfume para mujer',
        'buscar perfume unisex',
        'recomendar perfume para cita',
        'recomendar perfume para oficina',
        'recomendar perfume para fiesta',
        'recomendar perfume para clima caliente',
        'recomendar perfume para clima frio',
        'recomendar perfume dulce',
        'recomendar perfume amaderado',
        'recomendar perfume fresco',
        'consultar precio',
        'consultar descuento u oferta',
        'hacer un pedido',
        'consultar disponibilidad o stock',
        'quejas o problemas',
        'informacion de envios',
        'metodos de pago',
        'buscar inspiracion en marca famosa',
        'consultar duracion o potencia del perfume',
        'regalo para alguien',
        'novedades o productos nuevos',
        'informacion de la tienda'
    ];

    var SENTIMENT_RESPONSES = {
        negative: {
            prefixes: [
                'Entiendo tu frustración, ',
                'Lamento que estés pasando por eso, ',
                'Completamente comprensible, '
            ]
        },
        positive: {
            prefixes: [
                '¡Me alegra mucho! ',
                '¡Genial! ',
                '¡Excelente! '
            ]
        },
        neutral: { prefixes: [] }
    };

    var CDN_URL = 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.5.1';

    async function loadTransformers() {
        if (engine.pipelineFn) return engine.pipelineFn;
        try {
            var mod = await import(CDN_URL);
            engine.pipelineFn = mod.pipeline;
            return engine.pipelineFn;
        } catch (e) {
            console.warn('[AuraEngine] No se pudo cargar Transformers.js:', e.message);
            return null;
        }
    }

    async function initSentimentModel() {
        try {
            if (engine.sentimentClassifier) return engine.sentimentClassifier;
            if (!engine.pipelineFn) return null;
            console.log('[AuraEngine] Cargando modelo de sentimiento (~25MB)...');
            engine.sentimentClassifier = await engine.pipelineFn('sentiment-analysis', MODELS.sentiment, {
                dtype: 'q8'
            });
            console.log('[AuraEngine] Modelo de sentimiento listo');
            return engine.sentimentClassifier;
        } catch (e) {
            console.warn('[AuraEngine] Error en modelo de sentimiento:', e.message);
            return null;
        }
    }

    async function initZeroShotModel() {
        try {
            if (engine.intentClassifier) return engine.intentClassifier;
            if (!engine.pipelineFn) return null;
            console.log('[AuraEngine] Cargando modelo de zero-shot (~50MB)...');
            engine.intentClassifier = await engine.pipelineFn('zero-shot-classification', MODELS.zeroShot, {
                dtype: 'q8'
            });
            console.log('[AuraEngine] Modelo de zero-shot listo');
            return engine.intentClassifier;
        } catch (e) {
            console.warn('[AuraEngine] Error en modelo de zero-shot:', e.message);
            return null;
        }
    }

    async function analyzeSentiment(text) {
        if (!engine.sentimentClassifier) return { label: 'neutral', score: 0.5 };
        try {
            var result = await engine.sentimentClassifier(text, { topk: 1 });
            if (result && result.length > 0) {
                return { label: result[0].label.toLowerCase(), score: result[0].score };
            }
        } catch (e) {
            console.warn('[AuraEngine] Error en sentimiento:', e.message);
        }
        return { label: 'neutral', score: 0.5 };
    }

    async function classifyIntent(text) {
        if (!engine.intentClassifier) return { intent: null, confidence: 0 };
        try {
            var result = await engine.intentClassifier(text, INTENT_LABELS, {
                multi_label: false,
                hypothesis_template: 'El usuario está interesado en: {}'
            });
            if (result && result.labels && result.labels.length > 0 && result.scores[0] > 0.35) {
                return {
                    intent: result.labels[0],
                    confidence: result.scores[0],
                    allIntents: result.labels.slice(0, 3).map(function(label, i) {
                        return { intent: label, confidence: result.scores[i] };
                    })
                };
            }
        } catch (e) {
            console.warn('[AuraEngine] Error en clasificación:', e.message);
        }
        return { intent: null, confidence: 0 };
    }

    function generateEmpathicPrefix(sentiment) {
        var responses = SENTIMENT_RESPONSES[sentiment.label] || SENTIMENT_RESPONSES.neutral;
        if (responses.prefixes.length === 0) return '';
        return responses.prefixes[Math.floor(Math.random() * responses.prefixes.length)];
    }

    function isSpanish(text) {
        if (!text) return false;
        if (/[áéíóúñ¿¡]/i.test(text)) return true;
        var words = text.toLowerCase().split(/\s+/);
        var common = ['el','la','los','las','un','una','de','del','en','es','se','no','si','yo','tu','el','ella','me','te','le','lo','mi','su','algo','mas','menos','bien','mal','todo','nada','poco','mucho','este','esta','que','pero','con','sin','por','para','sobre','hasta','desde','muy','tan','ni','o','y','a','al','hola','buenas','buenos','gracias','quiero','necesito','busco','puedo','tengo','hay','tiene','puede','hace','hacer','como','barato','baratos','barata','baratas','mejor','mejores','peor','recomendar','recomienda','recomiendame','perfume','perfumes','fragancia','fragancias','aroma','aromas','dulce','dulces','fresco','frescos','amaderado','floral','oriental','citrico','cuero','acuatico','frutal','hombre','mujer','unisex','cita','oficina','fiesta','navidad','regalo','precio','precios','descuento','oferta','ofertas','envio','pago','pagos','pedido','stock','disponible','nuevo','recomendado','favorito','vendido','popular','actualmente','tienen','baratos','caros','caro','caras','cara','economico','economicos'];
        for (var i = 0; i < words.length; i++) {
            if (common.indexOf(words[i]) !== -1) return true;
        }
        return false;
    }

    function enhanceResponseWithSentiment(originalResponse, sentiment, userText) {
        if (!sentiment || sentiment.label === 'neutral' || !originalResponse) return originalResponse;

        if (isSpanish(userText)) {
            return originalResponse;
        }

        if (sentiment.label === 'negative' && sentiment.score > 0.92) {
            var prefix = generateEmpathicPrefix(sentiment);
            if (prefix && originalResponse.content) {
                originalResponse.content = prefix + originalResponse.content;
            }
        }

        if (sentiment.label === 'positive' && sentiment.score > 0.9) {
            if (originalResponse.content && originalResponse.content.indexOf('¡') === -1) {
                originalResponse.content = '¡Excelente! ' + originalResponse.content;
            }
        }

        return originalResponse;
    }

    function applyIntentEnhancements(intentResult, state) {
        if (!intentResult || !intentResult.intent) return;
        var intent = intentResult.intent;

        if (intent.indexOf('hombre') !== -1 && !state.userPreferences.gender) {
            state.userPreferences.gender = 'hombre';
        } else if (intent.indexOf('mujer') !== -1 && !state.userPreferences.gender) {
            state.userPreferences.gender = 'mujer';
        } else if (intent.indexOf('unisex') !== -1 && !state.userPreferences.gender) {
            state.userPreferences.gender = 'unisex';
        }

        if (!state.userPreferences.occasion) {
            if (intent.indexOf('cita') !== -1) state.userPreferences.occasion = 'cita';
            else if (intent.indexOf('oficina') !== -1) state.userPreferences.occasion = 'oficina';
            else if (intent.indexOf('fiesta') !== -1) state.userPreferences.occasion = 'fiesta';
            else if (intent.indexOf('caliente') !== -1) state.userPreferences.occasion = 'calor';
            else if (intent.indexOf('frio') !== -1) state.userPreferences.occasion = 'frio';
        }

        if (!state.userPreferences.scentType) {
            if (intent.indexOf('dulce') !== -1) state.userPreferences.scentType = 'dulce';
            else if (intent.indexOf('amaderado') !== -1) state.userPreferences.scentType = 'amaderado';
            else if (intent.indexOf('fresco') !== -1) state.userPreferences.scentType = 'citrico';
        }
    }

    async function enhance(userText, baseResponse, chatState) {
        if (!engine.ready || !baseResponse) return baseResponse;
        try {
            var analyses = await Promise.all([
                analyzeSentiment(userText),
                classifyIntent(userText)
            ]);
            var sentiment = analyses[0];
            var intent = analyses[1];

            applyIntentEnhancements(intent, chatState);
            var enhanced = enhanceResponseWithSentiment(baseResponse, sentiment, userText);

            if (enhanced && intent.confidence > 0.5) {
                enhanced._aiMeta = { sentiment: sentiment, intent: intent };
            }

            return enhanced;
        } catch (e) {
            console.warn('[AuraEngine] Error mejorando respuesta:', e.message);
            return baseResponse;
        }
    }

    function updateChatAIIndicator(active) {
        var header = document.querySelector('.aura-header__status');
        if (header) {
            header.innerHTML = active
                ? '<span class="aura-status-dot aura-status-dot--ai"></span> IA Avanzada Activa'
                : '<span class="aura-status-dot"></span> Experto en Fragancias En Línea';
        }
    }

    async function init() {
        if (engine.loading || engine.ready) return;
        engine.loading = true;

        try {
            console.log('[AuraEngine] Iniciando motor de IA con Transformers.js...');

            var pipelineFn = await loadTransformers();
            if (!pipelineFn) {
                throw new Error('Transformers.js no pudo cargarse (abre desde un servidor para IA completa)');
            }

            var results = await Promise.allSettled([
                initSentimentModel(),
                initZeroShotModel()
            ]);

            var anySuccess = results.some(function(r) { return r.status === 'fulfilled' && r.value !== null; });

            if (anySuccess) {
                engine.ready = true;
                updateChatAIIndicator(true);
                console.log('[AuraEngine] Motor de IA listo');
                console.log('[AuraEngine] Modelos:', {
                    sentiment: !!engine.sentimentClassifier,
                    zeroShot: !!engine.intentClassifier
                });
            } else {
                throw new Error('Ningún modelo se pudo cargar');
            }
        } catch (e) {
            engine.error = e.message;
            console.warn('[AuraEngine] IA avanzada no disponible. Funcionando con motor base.');
            updateChatAIIndicator(false);
        } finally {
            engine.loading = false;
        }
    }

    return {
        init: init,
        enhance: enhance,
        isReady: function() { return engine.ready; },
        isLoading: function() { return engine.loading; },
        getSentiment: analyzeSentiment,
        getClassifyIntent: classifyIntent,
        getStatus: function() {
            return {
                ready: engine.ready,
                loading: engine.loading,
                error: engine.error,
                models: { sentiment: !!engine.sentimentClassifier, zeroShot: !!engine.intentClassifier }
            };
        }
    };
})();

window.AuraAIEngine = AuraAIEngine;
// No inicializar automáticamente al cargar la página para evitar descargas
// de 75MB y bloqueo del hilo principal de JavaScript. Se inicializa bajo demanda
// cuando el usuario abre el chat de Aura AI.
