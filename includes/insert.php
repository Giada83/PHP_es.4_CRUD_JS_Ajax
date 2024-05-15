<?php
require_once __DIR__ . '/config.php';

// Get the JSON data from the request body
//1. json_decode() is a PHP function that is used to decode a JSON string into a PHP object or associative array.
//2. In pratica, file_get_contents("php://input") = reads the entire body of the HTTP POST request and returns the data as a string.
//3. true = associative array - false(default) = php object
$jsonData = json_decode(file_get_contents("php://input"), true);

// Get and clean the incoming data
// real_escape_string : method of the $conn connection object that is used to prevent SQL injection.
$name = $conn->real_escape_string($jsonData['name'] ?? '');
$surname = $conn->real_escape_string($jsonData['surname'] ?? '');
$email = $conn->real_escape_string($jsonData['email'] ?? '');

// Data validation 
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
