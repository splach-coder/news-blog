<?php
// Import the DB class to handle database connections
require_once('../model/handleQuery.php');

// Check if request method is GET
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    header('HTTP/1.1 405 Method Not Allowed');
    echo 'Invalid request method';
    exit;
}

$query = new handleQuery();
$news = $query->selectQuery("SELECT p.post_id AS id, p.title AS title, p.date, c.category_name AS category, i.alt, i.data_src, i.decoding, i.data_src_set
FROM `bg_posts` AS p 
INNER JOIN `bg_categories` AS c ON p.category_id = c.category_id
INNER JOIN `bg_image_posts` AS i ON i.post_id = p.post_id
WHERE DATE(p.created_at) = CURDATE() ORDER BY p.created_at DESC LIMIT 5;");

header('Content-Type: application/json');

// Create an associative array with the "clients" key
//$response = array("clients" => $clients);

$json_news = json_encode($news);

echo $json_news;
