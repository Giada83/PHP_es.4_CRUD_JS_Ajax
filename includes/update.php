<?php
require_once __DIR__ . './config.php';
require_once __DIR__ . './validation.php';

// Query to check if another row has the same email
$checkEmailQuery = "SELECT id FROM students WHERE email = ? AND id != ?";
$stmt = $conn->prepare($checkEmailQuery);
$stmt->bind_param("si", $email, $id);
$stmt->execute();
$result = $stmt->get_result();
$row = $result->fetch_assoc();
$stmt->close();

if ($row) {
    // If there is another row with the same email, but with a different ID
    // means that the email is already present in the database
    $data = [
        "message" => "L'email è già presente nel database",
        "response" => 0
    ];
    echo json_encode($data);
    exit;
}

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
$conn->close();
