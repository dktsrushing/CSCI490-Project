<?php
session_start();
if (!isset($_SESSION['user_id'])) {
    header('Location: ../frontend/login.html');
    exit();
}
require_once '../config/db_config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $new_username = trim($_POST['username']);
    $date_of_birth = $_POST['date_of_birth'];
    $new_password = $_POST['new_password'];
    $confirm_password = $_POST['confirm_password'];

    // Input validation
    if (empty($new_username)) {
        die('Username cannot be empty.');
    }
    if (!empty($new_password) && $new_password !== $confirm_password) {
        die('Passwords do not match.');
    }

    // Start transaction
    $conn->begin_transaction();

    try {
        // Update username and date of birth
        $stmt = $conn->prepare('UPDATE users SET username = ?, date_of_birth = ? WHERE id = ?');
        $stmt->bind_param('ssi', $new_username, $date_of_birth, $_SESSION['user_id']);
        $stmt->execute();
        $stmt->close();

        // Update session username if changed
        if ($new_username !== $_SESSION['username']) {
            $_SESSION['username'] = $new_username;
        }

        // Update password if provided
        if (!empty($new_password)) {
            $hashed_password = password_hash($new_password, PASSWORD_DEFAULT);
            $stmt = $conn->prepare('UPDATE users SET password = ? WHERE id = ?');
            $stmt->bind_param('si', $hashed_password, $_SESSION['user_id']);
            $stmt->execute();
            $stmt->close();
        }

        // Commit transaction
        $conn->commit();

        echo 'Profile updated successfully. <a href="../frontend/dashboard.php">Return to Dashboard</a>';

    } catch (Exception $e) {
        // Rollback transaction on error
        $conn->rollback();
        echo 'Error updating profile: ' . $e->getMessage();
    }

    $conn->close();

} else {
    echo 'Invalid request method.';
}
?>
