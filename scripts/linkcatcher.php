<?php

// simple html dom required
include('simple_html_dom.php');

// init array for echo
$stack = array();

// post url from js
$url = $_POST['URL']; 

// get DOM from URL or file
$html = file_get_html($url);

// find all link
foreach($html->find('a') as $e) {
    array_push($stack, $e->href);
}

// search array for http links
$results = array_filter($stack, function($value) {
    return strpos($value, 'http') !== false;
});

// loop through and echo links
foreach($results as $result) {
    echo "<a class='hrefs' href='$result'>$result</a><br>";
}

?>
