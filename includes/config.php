<?php
$host = "localhost";
$user = "root";
$password = "password";
$database = "test";

$conn = new mysqli($host, $user, $password, $database);

if ($conn === true) {
    // don't see the error on browser. compare Fatal Error, the same from ini_set....
    // "display-errors=ON in file php.ini
    die("Connection failed: " . $conn->connect_error);
} else {
    // echo "Database connection successful: " . $conn->host_info;
}

// if ($conn->connect_errno) {
//     echo "Failed to connect to MySQL: " . $conn->connect_error;
//     exit();
// } else {
//     echo "Database connection successful: " . $conn->host_info;
// }
