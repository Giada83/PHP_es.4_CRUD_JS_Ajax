<?php
require_once __DIR__ . '/config.php'; // Correggo il percorso del file config.php

$jsonData = json_decode(trim(file_get_contents("php://input")), true);

$id = $conn->real_escape_string($jsonData['id'] ?? '');
$name = $conn->real_escape_string(trim($jsonData['name'] ?? ''));
$surname = $conn->real_escape_string(trim($jsonData['surname'] ?? ''));
$email = $conn->real_escape_string(trim($jsonData['email'] ?? ''));

// Check if all required fields have been provided and meet the criteria
if (empty($name) || empty($surname) || empty($email)) {
    $data = [
        "message" => "All fields are required",
        "response" => 0
    ];
    echo json_encode($data);
    exit;
} elseif (strlen($name) < 2 || strlen($surname) < 2) {
    $data = [
        "message" => "Name and surname must be at least two characters long",
        "response" => 0
    ];
    echo json_encode($data);
    exit;
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $data = [
        "message" => "Invalid email format",
        "response" => 0
    ];
    echo json_encode($data);
    exit;
} elseif (!preg_match('/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/', $email)) {
    $data = [
        "message" => "Invalid email format",
        "response" => 0
    ];
    echo json_encode($data);
    exit;
}

// Query per verificare se un'altra riga ha la stessa email
$checkEmailQuery = "SELECT id FROM students WHERE email = ? AND id != ?";
$stmt = $conn->prepare($checkEmailQuery);
$stmt->bind_param("si", $email, $id);
$stmt->execute();
$result = $stmt->get_result();
$row = $result->fetch_assoc();
$stmt->close();

if ($row) {
    // Se esiste un'altra riga con la stessa email, ma con un ID diverso
    // significa che l'email è già presente nel database
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
