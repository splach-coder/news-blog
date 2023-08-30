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
$tags = $query->selectQuery("SELECT `tag_id` AS id, `tag_name` AS name FROM `bg_tags`");

header('Content-Type: application/json');

// Create an associative array with the "clients" key
//$response = array("clients" => $clients);

$json_tags = json_encode($tags);

echo $json_tags;
