<?php

// Assuming you've already established the PDO connection in your DB class
require_once 'db.php';

// Load JSON data from file
$jsonData = file_get_contents('../data/data.json');
$data = json_decode($jsonData, true);

$db = new db();
$conn = $db->getConnection();

exit();

foreach ($data['jobs'] as $job) {
    //get image infos
    $imagesrc = $job['img'];

    if (!empty($imagesrc)) {

        $imagesrc = $job['img']['dataSrc'];
        $imagesrcset = $job['img']['dataSrcSet'];
        $alt = $job['img']['alt'];
        $decoding = $job['img']['decoding'];
        $title = $job['title'];
        $date = $job['date'];
        $text = $job['text'];

        $category_id = 1;

        $id = uniqid();

        $sql = "INSERT INTO `bg_posts`(`post_id`, `title`, `content`, `category_id`, `date`) VALUES (:id, :title, :content, :category_id, :date)";

        $stmt = $conn->prepare($sql);

        $stmt->bindParam(':id', $id);
        $stmt->bindParam(':title', $title);
        $stmt->bindParam(':content', $text);
        $stmt->bindParam(':date', $date);
        $stmt->bindParam(':category_id', $category_id);

        if ($stmt->execute()) {
            $sql = "INSERT INTO `bg_image_posts`(`alt`, `decoding`, `data_src`, `data_src_set`, `post_id`) VALUES (:alt, :decoding, :data_src, :data_src_set, :post_id)";

            $stmt = $conn->prepare($sql);

            $stmt->bindParam(':alt', $alt);
            $stmt->bindParam(':decoding', $decoding);
            $stmt->bindParam(':data_src', $imagesrc);
            $stmt->bindParam(':data_src_set', $imagesrcset);
            $stmt->bindParam(':post_id', $id);

            if ($stmt->execute()) {
                echo "Job Record inserted successfully.<br>";
            } else {
                echo "Error: " . $stmt->errorInfo()[2] . "<br>";
            }
        } else {
            echo "Error: " . $stmt->errorInfo()[2] . "<br>";
        }
    }
}
