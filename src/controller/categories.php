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
$cats = $query->selectQuery("SELECT `category_id` as id, `category_name` AS name FROM `bg_categories`");

header('Content-Type: application/json');

$json_cats = json_encode($cats);

echo $json_cats;
