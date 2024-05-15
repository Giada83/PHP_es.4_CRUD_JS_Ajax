<?php
require_once __DIR__ . '/config.php';

$id = ($_POST['id'] ?? '');
$name = ($_POST['name'] ?? '');
$surname = ($_POST['surname'] ?? '');
$email = ($_POST['email'] ?? '');

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
