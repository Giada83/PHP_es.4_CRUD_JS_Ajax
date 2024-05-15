<?php
require_once __DIR__ . '/config.php';

$jsonData = json_decode(file_get_contents("php://input"), true);

$id = $conn->real_escape_string($jsonData['id'] ?? '');
$name = $conn->real_escape_string($jsonData['name'] ?? '');
$surname = $conn->real_escape_string($jsonData['surname'] ?? '');
$email = $conn->real_escape_string($jsonData['email'] ?? '');

if (!empty($id)) {
    $sql = "UPDATE students SET name=?, surname=?, email=? WHERE id=?";

    // Using prepared statements to prevent SQL injection
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssi", $name, $surname, $email, $id);

    if ($stmt->execute()) {
        $data = [
            "message" => "User successfully updated",
            "response" => 1
        ];
        echo json_encode($data);
    } else {
        $data = [
            "message" => "Oops! Something went wrong: " . $conn->error,
            "response" => 0
        ];
        echo json_encode($data);
    }
    $stmt->close();
} else {
    $data = [
        "message" => "No id provided",
        "response" => 0
    ];
    echo json_encode($data);
}

$conn->close();
