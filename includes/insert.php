<?php
require_once __DIR__ . '/config.php';

// Get and clean the incoming data
// real_escape_string : method of the $conn connection object that is used to prevent SQL injection. 
$name = $conn->real_escape_string($_POST['name'] ?? ''); //The operator ?? is used to provide a default value in case the variable is undefined or null.
$surname = $conn->real_escape_string($_POST['surname'] ?? '');
$email = $conn->real_escape_string($_POST['email'] ?? '');

// // Data validation
if (empty($name) || empty($surname) || empty($email)) {
    $data = [
        "message" => "All fields are required",
        "response" => 0
    ];
    echo json_encode($data); //convert a PHP array or object to a JSON string. Useful to send a response from the server to the client (AJAX call) in a format that can be easily interpreted by the client's JavaScript.
    exit;
}

// Query to insert data into the database
$sql = "INSERT INTO students (name, surname, email) VALUES ('$name', '$surname', '$email')";
if ($conn->query($sql) === true) {
    $data = [
        "message" => "Data entered correctly",
        "response" => 1
    ];
} else {
    $data = [
        "message" => "Error: " . $conn->error,
        "response" => 0
    ];
}

echo json_encode($data);

// Close the database connection
$conn->close();
