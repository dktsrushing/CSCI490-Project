<?php
// config/db_config.php
$servername = 'localhost';
$db_username = 'root';
$db_password = '';
$db_name = 'csci490fa24';

// Create connection
$conn = new mysqli($servername, $db_username, $db_password, $db_name);

// Check connection
if ($conn->connect_error) {
    die('Connection failed: ' . $conn->connect_error);
}
?>
