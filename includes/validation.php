<?php
// Get the JSON data from the request body
//1. json_decode() is a PHP function that is used to decode a JSON string into a PHP object or associative array.
//2. file_get_contents("php://input") = reads the entire body of the HTTP POST request and returns the data as a string.
//3. true = associative array - false(default) = php object
//4. trim() - leave space before and after the string
$jsonData = json_decode(trim(file_get_contents("php://input")), true);

// Get and clean the incoming data
// real_escape_string : method of the $conn connection object that is used to prevent SQL injection.
$id = $conn->real_escape_string($jsonData['id'] ?? '');
$name = $conn->real_escape_string(trim($jsonData['name'] ?? ''));
$surname = $conn->real_escape_string(trim($jsonData['surname'] ?? ''));
$email = $conn->real_escape_string(trim($jsonData['email'] ?? ''));

// Capitalize the first letter of name and surname
$name = ucfirst(strtolower($name));
$surname = ucfirst(strtolower($surname));

// Data validation 
if (empty($name) || empty($surname) || empty($email)) {
    $data = [
        "message" => "All fields are required",
        "response" => 0
    ];
    echo json_encode($data); //convert a PHP array or object to a JSON string. Useful to send a response from the server to the client (AJAX call) in a format that can be easily interpreted by the client's JavaScript.
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
