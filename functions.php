<?php

function university_files() {
	wp_enqueue_style('roboto-font', '//fonts.googleapis.com/css?family=Roboto+Condensed:300,300i,400,400i,700,700i|Roboto:100,300,400,400i,700,700i');
	  wp_enqueue_style('font-awesome','//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');

	  wp_enqueue_script('slider-script-js', get_theme_file_uri('js/scripts-bundled.js'), NULL, microtime(), true);


  wp_enqueue_style('university_main_styles', get_stylesheet_uri(), null, microtime());
}

add_action('wp_enqueue_scripts', 'university_files');


function university_features() {
    add_theme_support('title-tag');
}

add_action('after_setup_theme', 'university_features');

function university_adjust_queries($query) {
    // Programs
    if(!is_admin() AND is_post_type_archive('program') AND $query->is_main_query()) {
        $query->set('orderby','title');
        $query->set('order', 'ASC');
        $query->set('posts_per_page', -1);
    }
    // Events
    if(!is_admin() AND is_post_type_archive('event') AND $query->is_main_query()) {
        $today = date('Ymd');
        $query->set('meta_key', 'event_date');
        $query->set('orderby','meta_value_num');
        $query->set('order', 'ASC');
        $query->set('meta_query', array(
                    array(
                     'key' => 'event_date',
                        'compare' => '>=',
                        'value' => $today,
                        'type' => 'numeric'
                    )
                ));
    }
}

add_action('pre_get_posts', 'university_adjust_queries');



// Custom function
function get_ID_by_slug($page_slug) {
    // Returns page_id
    // Pass in page_slug
    $page = get_page_by_path($page_slug);
    if ($page) {
        return $page->ID;
    } else {
        return null;
    }
}

