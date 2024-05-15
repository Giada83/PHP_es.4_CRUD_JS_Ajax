<?php
require_once __DIR__ . '/config.php'; // Corrected path delimiter

if (isset($_POST['id'])) {
    $id = $_POST['id'];

    $sql = "DELETE FROM students WHERE id = $id";

    if ($conn->query($sql) === true) {
        $data = [
            "message" => "User successfully deleted",
            "response" => 1
        ];
        echo json_encode($data);
    } else {
        $data = [
            "message" => "Unable to delete the selected user: " . $conn->error,
            "response" => 0
        ];
        echo json_encode($data);
    }
} else {
    $data = [
        "message" => "No id provided",
        "response" => 0
    ];
    echo json_encode($data);
}

$conn->close();
