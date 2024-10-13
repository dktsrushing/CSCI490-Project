<?php
// backend/login.php
session_start();
require_once '../config/db_config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username']);
    $password = $_POST['password'];

    // Input validation
    if (empty($username) || empty($password)) {
        die('Please fill in all fields.');
    }

    // Prepare SQL statement
    $stmt = $conn->prepare('SELECT id, password FROM users WHERE username = ?');
    $stmt->bind_param('s', $username);
    $stmt->execute();
    $stmt->store_result();

    // Verify user exists
    if ($stmt->num_rows === 1) {
        $stmt->bind_result($id, $hashed_password);
        $stmt->fetch();

        // Verify password
        if (password_verify($password, $hashed_password)) {
            // Success: Set session variables
            $_SESSION['user_id'] = $id;
            $_SESSION['username'] = $username;
            header('Location: ../frontend/dashboard.php');
            exit();
        } else {
            echo 'Invalid username or password.';
        }
    } 
    else {
        echo 'Invalid username or password.';
    }

    $stmt->close();
    $conn->close();
} else {
    echo 'Invalid request method.';
}
?>