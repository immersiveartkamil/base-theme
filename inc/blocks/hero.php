<?php

function hero()
{

    if (function_exists('acf_register_block_type')) {

        acf_register_block_type(array(
            'name' => 'hero',
            'title' => 'hero',
            'render_template' => TEMPLATES_BLOCKS . 'hero.php',
            'icon' => 'f336',
            'keywords' => ["hero"],
            'category' => 'hero',
            'mode' => 'edit'
        ));
    }
}

add_action('acf/init', 'hero');
