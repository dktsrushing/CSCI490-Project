<?php
// config/db_config.php
$servername = 'localhost';
$db_username = 'CSCI490FA24';
$db_password = 'CSCI490Pass!';
$db_name = 'CSCI490FA24';

// Create connection
$conn = new mysqli($servername, $db_username, $db_password, $db_name);

// Check connection
if ($conn->connect_error) {
    die('Connection failed: ' . $conn->connect_error);
}
?>