<?php
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);

require_once __DIR__ . './config.php';

// The script fetching all users from the database, storing them in an array, and then outputting the array in JSON format.

if (isset($_GET['id']) && !empty($_GET['id'])) {
    // Se è stato fornito un ID, recupera solo i dati dell'utente con quell'ID
    $id = $_GET['id'];
    $sql = "SELECT * FROM students WHERE id = $id";
} else {
    // Se non è stato fornito un ID, seleziona tutti i dati degli studenti
    $sql = "SELECT * FROM students";
}
// $sql = 'SELECT * FROM students';

if ($results = $conn->query($sql)) {
    // Initialize an empty array to store the results
    $data = [];

    // Iterate through the query results
    if ($results->num_rows > 0) {

        while ($row = $results->fetch_array(MYSQLI_ASSOC)) { // get the results of a SQL query executed against a MySQL database as an associative array. The results will be returned with keys that match the database column names.

            $temp; // temporary array for each row
            $temp['id'] = $row['id'];
            $temp['name'] = $row['name'];
            $temp['surname'] = $row['surname'];
            $temp['email'] = $row['email'];

            array_push($data, $temp);
        }

        echo json_encode($data); // Convert the data array to JSON format (object)
    } else {
        echo json_encode($data);
    }
} else {
    echo "Errore: " . $conn->error;
}

$conn->close();
