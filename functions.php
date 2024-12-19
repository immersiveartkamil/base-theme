<?php
add_theme_support('title-tag');
add_theme_support('custom-logo');
add_theme_support('post-thumbnails');

define('TEMPLATES_BLOCKS', dirname(__FILE__) . '/template-parts/blocks/');
//Client config
define('FULL_NAME', 'Base Theme');
define('SHORT_NAME', 'BT');

include('inc/register-blocks.php');

function mytheme_register_nav_menu()
{
    register_nav_menus(array(
        'primary_menu' => __('Primary', 'nav-menu'),

    ));
}
add_action('after_setup_theme', 'mytheme_register_nav_menu', 0);
// add styles/srcipts

function theme_scripts()
{
    wp_enqueue_style('compiled-styles', get_template_directory_uri() . '/dist/build/main.min.css', array(), rand(1, 999));
    wp_enqueue_script('lenis', 'https://unpkg.com/@studio-freight/lenis@1.0.0-beta.12/bundle.min.js', array(), null, true);

    wp_enqueue_script('scripts', get_stylesheet_directory_uri() . '/src/js/app.js');

    add_filter("script_loader_tag", "add_module_to_my_script", 10, 3);
    function add_module_to_my_script($tag, $handle, $src)
    {
        if ("scripts" === $handle) {
            $tag = '<script type="module" src="' . esc_url($src) . '"></script>';
        }

        return $tag;
    }

    // Enqueue font files
    wp_enqueue_style('creamy-peachy-font', get_template_directory_uri() . '/src/fonts/Creamy-Peachy.ttf', array(), null);
}
add_action('wp_enqueue_scripts', 'theme_scripts');
function enqueue_custom_scripts()
{
    // Ensure WordPress jQuery is loaded
    wp_enqueue_script('jquery'); // Load WP’s version of jQuery

    // Enqueue Slick Slider JS and CSS
    wp_enqueue_script('slick-cdn', 'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js', ['jquery'], '1.8.1', true);
    wp_enqueue_style('slick-css', 'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css', [], '1.8.1');
    wp_enqueue_style('slick-theme-css', 'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css', [], '1.8.1');

    // Enqueue custom script after Slick is loaded, with dependencies
    wp_enqueue_script('portfolio-scripts', get_template_directory_uri() . '/src/js/modules/portfolio.js', ['jquery', 'slick-cdn'], null, true);
}
add_action('wp_enqueue_scripts', 'enqueue_custom_scripts');


function mytheme_custom_logo_setup()
{
    add_theme_support('custom-logo', array(
        'height'      => 80,
        'width' => 80,
        'flex-height' => true,
        'flex-width'  => true,
    ));
}
add_action('after_setup_theme', 'mytheme_custom_logo_setup');

// add widget area
function register_widget_areas()
{

    register_sidebar(array(
        'name'          => 'Footer area one',
        'id'            => 'footer_area_one',
        'description'   => 'This widget area discription',
        'before_widget' => '<div class="footer-area footer-area-one">',
        'after_widget'  => '</div>',
        'before_title'  => '<p class="footer__title">',
        'after_title'   => '</p>',
    ));

    register_sidebar(array(
        'name'          => 'Footer area two',
        'id'            => 'footer_area_two',
        'description'   => 'This widget area discription',
        'before_widget' => '<div class="footer-area footer-area-two">',
        'after_widget'  => '</div>',
        'before_title'  => '<p class="footer__title">',
        'after_title'   => '</p>',
    ));

    register_sidebar(array(
        'name'          => 'Footer area three',
        'id'            => 'footer_area_three',
        'description'   => 'This widget area discription',
        'before_widget' => '<div class="footer-area footer-area-three">',
        'after_widget'  => '</div>',
        'before_title'  => '<p class="footer__title">',
        'after_title'   => '</p>',
    ));

    register_sidebar(array(
        'name'          => 'Footer area four',
        'id'            => 'footer_area_four',
        'description'   => 'This widget area discription',
        'before_widget' => '<div class="footer-area footer-area-three">',
        'after_widget'  => '</div>',
        'before_title'  => '<p class="footer__title">',
        'after_title'   => '</p>',
    ));
}

add_action('widgets_init', 'register_widget_areas');


// SVG Support 
add_filter('wp_check_filetype_and_ext', function ($data, $file, $filename, $mimes) {
    $filetype = wp_check_filetype($filename, $mimes);
    return [
        'ext'             => $filetype['ext'],
        'type'            => $filetype['type'],
        'proper_filename' => $data['proper_filename']
    ];
}, 10, 4);

function cc_mime_types($mimes)
{
    $mimes['svg'] = 'image/svg+xml';
    return $mimes;
}
add_filter('upload_mimes', 'cc_mime_types');

function fix_svg()
{
    echo '<style type="text/css">
		  .attachment-266x266, .thumbnail img {
			   width: 100% !important;
			   height: auto !important;
		  }
		  </style>';
}
add_action('admin_head', 'fix_svg');
add_filter('show_admin_bar', '__return_false');
remove_filter('the_content', 'wpautop');
