<?php

/**
 * The header
 */
?>
<!doctype html>
<html <?php language_attributes(); ?>>

<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="profile" href="https://gmpg.org/xfn/11">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.1/css/bootstrap-grid.rtl.min.css" integrity="sha512-IdCHbOHsCrqqXhmvpjhmTgDIwGrF5NMdQZcC/v0Jdle5sYnhSZ0PJPh57i4NgvtjKr/vflogE6lTs2Fk6aclSA==" crossorigin="anonymous" referrerpolicy="no-referrer" defer />
    <script src="https://kit.fontawesome.com/7273ba5046.js" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/gh/sarathsaleem/grained/grained.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.2/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.2/Draggable.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.2/InertiaPlugin.min.js"></script>
    <script src="<?php echo get_template_directory_uri(); ?>/assets/js/gsap/dist/gsap.min.js"></script>
    <script src="<?php echo get_template_directory_uri(); ?>/assets/js/gsap/dist/ScrollTrigger.min.js"></script>
    <script src="<?php echo get_template_directory_uri(); ?>/assets/js/gsap/dist/ScrollSmoother.min.js"></script>
    <script src="<?php echo get_template_directory_uri(); ?>/assets/js/gsap/dist/MorphSVGPlugin.min.js"></script>
    <script src="<?php echo get_template_directory_uri(); ?>/assets/js/gsap/dist/SplitText.min.js"></script>
    <script src="<?php echo get_template_directory_uri(); ?>/assets/js/gsap/dist/ScrambleTextPlugin.min.js"></script>

    <script type="importmap">
        {
    "imports": {
      "three": "https://cdn.jsdelivr.net/npm/three@0.152.0/build/three.module.js",
      "OrbitControls": "https://cdn.jsdelivr.net/npm/three@0.152.0/examples/jsm/controls/OrbitControls.js",
      "@tweenjs/tween.js": "https://unpkg.com/browse/@tweenjs/tween.js@23.1.3/dist/tween.esm.js"
    }
  }
</script>


    <script type="module">
        import GUI from 'https://cdn.jsdelivr.net/npm/lil-gui@0.20/dist/lil-gui.esm.js';
    </script>


    <script src="https://unpkg.com/lenis@1.1.14/dist/lenis.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.2/SplitText.min.js"></script>
    <link rel="stylesheet" href="https://use.typekit.net/oid5myu.css">
    <!-- Load jQuery first -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

    <!-- Load Slick Carousel -->
    <script src="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>

    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.css" />
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick-theme.min.css" />




    <?php wp_head(); ?>

</head>

<body <?php body_class(); ?>>
    <?php wp_body_open(); ?>
    <div id="page" class="site">
        <header id="masthead" class="site-header">
            <div class="container-fluid menu-big-wapper">
                <div class="container-fluid">
                    <nav id="site-navigation" class="main-navigation container-fluid">
                        <div class="site-branding">
                            <a href="<?php echo get_home_url(); ?>">
                                <!-- <img class="branding-logo" src="https://completeinterior.pl/wp-content/uploads/2024/04/logo.png" alt="" height="60" width="80"></a> -->
                                <?php
                                if (function_exists('the_custom_logo')) {
                                    the_custom_logo();
                                }
                                ?>
                            </a>
                        </div>
                        <div class="mobile-hamburger">
                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
                            </svg>
                        </div>
                        <div class="custom-menu">
                            <?php
                            wp_nav_menu(array('theme_location' => 'primary_menu', 'container_class' => 'nav-menu', 'menu_class' => 'nav-menu'));
                            ?>
                        </div>


                    </nav>
                </div>
            </div>
        </header>