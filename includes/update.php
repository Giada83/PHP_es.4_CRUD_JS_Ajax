<?php
require_once __DIR__ . '/config.php'; // Correggo il percorso del file config.php
require_once __DIR__ . './validation.php';

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
