<?php
/**
 * SCRIPT DE ACTUALIZACIÓN DE IMÁGENES
 * ===================================
 * 
 * Este script actualiza los nombres y rutas de imágenes en la base de datos
 * para que coincidan exactamente con la carpeta 'Perfumes Mujer/'.
 * 
 * INSTRUCCIONES:
 * 1. Sube este archivo a la raíz de tu sitio en InfinityFree.
 * 2. Visita: https://manizales-pf.great-site.net/actualizar_imagenes_db.php
 * 3. Una vez completado, ELIMINA este archivo de tu servidor por seguridad.
 */

header('Content-Type: text/html; charset=utf-8');
require_once __DIR__ . '/admin/config.php';

echo "<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <title>Actualizando Rutas de Imágenes</title>
    <style>
        body { font-family: sans-serif; background: #f5f5f5; padding: 20px; }
        .container { max-width: 800px; margin: 0 auto; background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
        h1 { color: #C9A96E; }
        .log-entry { padding: 6px; border-bottom: 1px solid #eee; font-family: monospace; font-size: 13px; }
        .success { color: green; }
        .info { color: blue; }
        .error { color: red; }
    </style>
</head>
<body>
<div class='container'>
    <h1>Actualizando Rutas de Imágenes en la Base de Datos</h1>
    <div style='max-height: 500px; overflow-y: scroll; border: 1px solid #ccc; padding: 10px; margin-bottom: 20px;'>
";

try {
    $pdo = getDB();
    
    // Lista de actualizaciones a aplicar (ID -> Nueva Ruta)
    $updates = [
        1 => 'Perfumes Mujer/clinique-happy-men.jpg', // Clinique - Clinique Happy For Men
        2 => 'Perfumes Mujer/afnan-9am-pour-femme.jpg', // Afnan - 9 Am Pour Femme
        3 => 'Perfumes Mujer/armaf-club-de-nuit.jpg', // Armaf - Club de Nuit
        4 => 'Perfumes Mujer/armaf-isabella.jpg', // Armaf - Isabella
        5 => 'Perfumes Mujer/ariana-grande-cloud.jpg', // Ariana Grande - Cloud
        6 => 'Perfumes Mujer/ariana-grande-cloud-pink.jpg', // Ariana Grande - Cloud Pink
        7 => 'Perfumes Mujer/ariana-grande-sweet-like-candy.jpg', // Ariana Grande - Sweet Like Candy
        8 => 'Perfumes Mujer/balmain-extatic.jpg', // Balmain - Extatic
        9 => 'Perfumes Mujer/burberry-her.jpg', // Burberry - Her
        10 => 'Perfumes Mujer/burberry-her-intense.jpg', // Burberry - Her Intense
        11 => 'Perfumes Mujer/cacharel-amor-amor.jpg', // Cacharel - Amor Amor
        12 => 'Perfumes Mujer/carolina-herrera-212-nyc.jpg', // Carolina Herrera - 212 NYC
        13 => 'Perfumes Mujer/carolina-herrera-212-vip.jpg', // Carolina Herrera - 212 VIP
        14 => 'Perfumes Mujer/carolina-herrera-good-girl.jpg', // Carolina Herrera - Good Girl
        15 => 'Perfumes Mujer/chanel-chance-eau-fraiche.jpg', // Chanel - Chance Eau Fraîche
        16 => 'Perfumes Mujer/chanel-chance-eau-tendre.jpg', // Chanel - Chance Eau Tendre
        17 => 'Perfumes Mujer/chanel-coco-mademoiselle.jpg', // Chanel - Coco Mademoiselle
        18 => 'Perfumes Mujer/chanel-no5.jpg', // Chanel - No. 5
        19 => 'Perfumes Mujer/chloe-love-story.jpg', // Chloe - Love Story
        20 => 'Perfumes Mujer/coach-flower.jpg', // Coach - Flower
        21 => 'Perfumes Mujer/dior-addict.jpg', // Dior - Addict
        22 => 'Perfumes Mujer/dior-hypnotic-poison.jpg', // Dior - Hypnotic Poison
        23 => 'Perfumes Mujer/dior-jadore.jpg', // Dior - J\'adore
        24 => 'Perfumes Mujer/dior-jadore-diorissimo.jpg', // Dior - J\'adore Diorissimo
        25 => 'Perfumes Mujer/dior-miss-dior.jpg', // Dior - Miss Dior
        26 => 'Perfumes Mujer/dolce-gabbana-light-blue.jpg', // Dolce & Gabbana - Light Blue
        27 => 'Perfumes Mujer/dolce-gabbana-pour-femme.jpg', // Dolce & Gabbana - Pour Femme
        28 => 'Perfumes Mujer/dolce-gabbana-the-one.jpg', // Dolce & Gabbana - The One
        29 => 'Perfumes Mujer/elizabeth-arden-5th-avenue.jpg', // Elizabeth Arden - 5th Avenue
        30 => 'Perfumes Mujer/estee-lauder-beautiful.jpg', // Estée Lauder - Beautiful
        31 => 'Perfumes Mujer/estee-lauder-youth-dew.jpg', // Estée Lauder - Youth Dew
        32 => 'Perfumes Mujer/giorgio-armani-acqua-di-gio.jpg', // Giorgio Armani - Acqua di Gio
        33 => 'Perfumes Mujer/giorgio-armani-acqua-di-gioia.jpg', // Giorgio Armani - Acqua di Gioia
        34 => 'Perfumes Mujer/giorgio-armani-si.jpg', // Giorgio Armani - Sì
        35 => 'Perfumes Mujer/gucci-flora-gorgeous-magnolia.jpg', // Gucci - Flora Gorgeous Magnolia
        36 => 'Perfumes Mujer/hugo-boss-the-scent-her.jpg', // Hugo Boss - The Scent For Her
        37 => 'Perfumes Mujer/issey-miyake-leau-dissey.jpg', // Issey Miyake - L\'Eau d\'Issey
        38 => 'Perfumes Mujer/jean-paul-gaultier-classique.jpg', // Jean Paul Gaultier - Classique
        39 => 'Perfumes Mujer/jean-paul-gaultier-la-belle.jpg', // Jean Paul Gaultier - La Belle
        40 => 'Perfumes Mujer/juicy-couture-viva-la-juicy.jpg', // Juicy Couture - Viva La Juicy
        41 => 'Perfumes Mujer/kilian-forbidden-games.jpg', // Kilian - Forbidden Games
        42 => 'Perfumes Mujer/kilian-good-girl-gone-bad.jpg', // Kilian - Good Girl Gone Bad
        43 => 'Perfumes Mujer/lancome-idole.jpg', // Lancôme - Idôle
        44 => 'Perfumes Mujer/lancome-idole-le-parfum.jpg', // Lancôme - Idôle Le Parfum
        45 => 'Perfumes Mujer/lancome-idole-nectar.jpg', // Lancôme - Idôle Nectar
        46 => 'Perfumes Mujer/lancome-la-nuit-tresor.jpg', // Lancôme - La Nuit Trésor
        47 => 'Perfumes Mujer/lancome-la-vie-est-belle.jpg', // Lancôme - La Vie Est Belle
        48 => 'Perfumes Mujer/lancome-la-vie-est-belle-leclat.jpg', // Lancôme - La Vie Est Belle L\'Eclat
        49 => 'Perfumes Mujer/lancome-tresor.jpg', // Lancôme - Trésor
        50 => 'Perfumes Mujer/lalique-le-parfum.jpg', // Lalique - Le Parfum
        51 => 'Perfumes Mujer/lattafa-ana-abiyedh.jpg', // Lattafa - Ana Abiyedh
        52 => 'Perfumes Mujer/lattafa-fakhar.jpg', // Lattafa - Fakhar
        53 => 'Perfumes Mujer/lattafa-cherry-on-top.jpg', // Lattafa - Berry On Top
        54 => 'Perfumes Mujer/lattafa-choco-overdose.jpg', // Lattafa - Choco Overdose
        55 => 'Perfumes Mujer/lattafa-cookie-crave.jpg', // Lattafa - Cookie Crave
        56 => 'Perfumes Mujer/lattafa-mallow-madness.jpg', // Lattafa - Mallow Madness
        57 => 'Perfumes Mujer/lattafa-vanilla-freak.jpg', // Lattafa - Vanilla Freak
        58 => 'Perfumes Mujer/lattafa-yara-pink.jpg', // Lattafa - Yara
        59 => 'Perfumes Mujer/lattafa-yara-elixir.jpg', // Lattafa - Yara Elixir
        60 => 'Perfumes Mujer/lattafa-yara-pink.jpg', // Lattafa - Yara Pink
        61 => 'Perfumes Mujer/lattafa-yara-tendance.jpg', // Lattafa - Yara Tendance
        62 => 'Perfumes Mujer/maison-francis-kurkdjian-baccarat-rouge-540.jpg', // Maison Francis Kurkdjian - Baccarat Rouge 540
        63 => 'Perfumes Mujer/michael-kors-beautiful.jpg', // Michael Kors - Beautiful
        64 => 'Perfumes Mujer/montale-roses-musk.jpg', // Montale - Roses Musk
        65 => 'Perfumes Mujer/montblanc-signature.jpg', // Montblanc - Signature
        66 => 'Perfumes Mujer/mugler-alien.jpg', // Mugler - Alien
        67 => 'Perfumes Mujer/narciso-rodriguez-for-her.jpg', // Narciso Rodriguez - For Her
        68 => 'Perfumes Mujer/nina-ricci-lextase.jpg', // Nina Ricci - L\'Extase
        69 => 'Perfumes Mujer/orientica-dania.jpg', // Orientica - Dania
        70 => 'Perfumes Mujer/paris-hilton-heiress.jpg', // Paris Hilton - Heiress
        71 => 'Perfumes Mujer/paris-hilton-rush.jpg', // Paris Hilton - Rush
        72 => 'Perfumes Mujer/parfums-de-marly-delina-exclusif.jpg', // Parfums de Marly - Delina Exclusif
        73 => 'Perfumes Mujer/prada-candy.jpg', // Prada - Candy
        74 => 'Perfumes Mujer/prada-la-femme.jpg', // Prada - La Femme
        75 => 'Perfumes Mujer/ralph-lauren-ralph.jpg', // Ralph Lauren - Ralph
        76 => 'Perfumes Mujer/tom-ford-bitter-peach.jpg', // Tom Ford - Bitter Peach
        77 => 'Perfumes Mujer/tom-ford-lost-cherry.jpg', // Tom Ford - Lost Cherry
        78 => 'Perfumes Mujer/tom-ford-noir-de-noir.jpg', // Tom Ford - Noir de Noir
        79 => 'Perfumes Mujer/tom-ford-oud-wood.jpg', // Tom Ford - Oud Wood
        80 => 'Perfumes Mujer/tom-ford-soleil-blanc.jpg', // Tom Ford - Soleil Blanc
        81 => 'Perfumes Mujer/tom-ford-tobacco-vanille.jpg', // Tom Ford - Tobacco Vanille
        82 => 'Perfumes Mujer/valentino-donna-born-in-roma.jpg', // Valentino - Donna Born in Roma
        83 => 'Perfumes Mujer/victorias-secret-bombshell.jpg', // Victoria\'s Secret - Bombshell
        84 => 'Perfumes Mujer/victorias-secret-tease-rebel.jpg', // Victoria\'s Secret - Tease Rebel
        85 => 'Perfumes Mujer/versace-bright-crystal.jpg', // Versace - Bright Crystal
        86 => 'Perfumes Mujer/versace-eros-pour-femme.jpg', // Versace - Eros Pour Femme
        87 => 'Perfumes Mujer/versace-versense.jpg', // Versace - Versense
        88 => 'Perfumes Mujer/ysl-black-opium.jpg', // YSL - Black Opium
        89 => 'Perfumes Mujer/ysl-libre.jpg', // YSL - Libre
        90 => 'Perfumes Mujer/ysl-mon-paris.jpg', // YSL - Mon Paris
        91 => 'Perfumes Mujer/zadig-voltaire-this-is-her.jpg', // Zadig & Voltaire - This is Her
    ];

    $actualizados = 0;
    $errores = 0;
    
    $stmt = $pdo->prepare("UPDATE productos SET imagen = ? WHERE id = ?");
    
    foreach ($updates as $id => $nueva_ruta) {
        try {
            // Obtener el nombre del producto antes de actualizar
            $get_stmt = $pdo->prepare("SELECT nombre, marca, imagen FROM productos WHERE id = ?");
            $get_stmt->execute([$id]);
            $prod = $get_stmt->fetch();
            
            if ($prod) {
                if ($prod['imagen'] !== $nueva_ruta) {
                    $stmt->execute([$nueva_ruta, $id]);
                    echo "<div class='log-entry success'>[OK] ID $id: {$prod['marca']} - {$prod['nombre']} -> Actualizado de '{$prod['imagen']}' a '$nueva_ruta'</div>";
                    $actualizados++;
                } else {
                    echo "<div class='log-entry info'>[INFO] ID $id: {$prod['marca']} - {$prod['nombre']} -> Ya está actualizado a '$nueva_ruta'</div>";
                }
            } else {
                echo "<div class='log-entry error'>[ERROR] ID $id no encontrado en la base de datos</div>";
                $errores++;
            }
        } catch (PDOException $e) {
            echo "<div class='log-entry error'>[ERROR] Error al actualizar ID $id: " . $e->getMessage() . "</div>";
            $errores++;
        }
        ob_flush();
        flush();
    }
    
    echo "</div>
    <h3>Proceso Completado</h3>
    <p>Productos actualizados: <strong>$actualizados</strong></p>
    <p>Errores/No encontrados: <strong>$errores</strong></p>
    <p style='color: orange; font-weight: bold;'>IMPORTANTE: Elimina este archivo (actualizar_imagenes_db.php) del servidor por seguridad.</p>
    ";
    
} catch (Exception $e) {
    echo "<div class='log-entry error'>[ERROR CRÍTICO] " . $e->getMessage() . "</div></div>";
}

echo "</div></body></html>";
