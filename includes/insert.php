<?php
require_once __DIR__ . '/config.php';
require_once __DIR__ . './validation.php'; //php validation

// Check if the email already exists
$emailCheckQuery = "SELECT COUNT(*) AS count FROM students WHERE email = '$email'";
$emailCheckResult = $conn->query($emailCheckQuery);
if ($emailCheckResult) {
    $row = $emailCheckResult->fetch_assoc();
    if ($row['count'] > 0) {
        $data = [
            "message" => "Email already exists",
            "response" => 0
        ];
        echo json_encode($data);
        exit;
    }
}

// Query to insert data into the database
$sql = "INSERT INTO students (name, surname, email) VALUES ('$name', '$surname', '$email')";
if ($conn->query($sql) === true) {
    $data = [
        "message" => "Data entered correctly",
        "response" => 1
    ];
    echo json_encode($data);
} else {
    $data = [
        "message" => "Error: " . $conn->error,
        "response" => 0
    ];
    echo json_encode($data);
}

// Close the database connection
$conn->close();
