<?php
$jsonFilePath = "../data/emails.json"; // Replace with your JSON file path

var_dump($_SERVER["REQUEST_METHOD"]);
exit;

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $newEmail = $_POST["email"];

    $jsonData = file_get_contents($jsonFilePath);
    $emails = json_decode($jsonData, true);

    $emails[] = $newEmail;

    $updatedJsonData = json_encode($emails);

    if (file_put_contents($jsonFilePath, $updatedJsonData)) {
        echo "Email appended successfully.";
    } else {
        echo "Error appending email.";
    }
} else {
    echo "Invalid request.";
}
