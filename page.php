<?php get_header(); ?>

<div id="primary" class="content-area" style="margin-top:88px;">
    <main id="main" class="site-main" role="main">
        <?php
        while (have_posts()) : the_post();
            the_content();
        endwhile;
        ?>
    </main>
</div>
<?php get_footer(); ?>
</body>