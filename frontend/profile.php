<?php
session_start();
if (!isset($_SESSION['user_id'])) {
    header('Location: login.html');
    exit();
}
require_once '../config/db_config.php';

// Fetch user data
$stmt = $conn->prepare('SELECT username, date_of_birth FROM users WHERE id = ?');
$stmt->bind_param('i', $_SESSION['user_id']);
$stmt->execute();
$stmt->bind_result($username, $date_of_birth);
$stmt->fetch();
$stmt->close();
$conn->close();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Profile</title>
</head>
<body>
    <h2>Edit Profile</h2>
    <form action="../backend/update_profile.php" method="POST">
        <label>Username:</label>
        <input type="text" name="username" value="<?php echo htmlspecialchars($username); ?>" required /><br /><br />
        
        <label>Date of Birth:</label>
        <input type="date" name="date_of_birth" value="<?php echo htmlspecialchars($date_of_birth); ?>" /><br /><br />
        
        <label>New Password:</label>
        <input type="password" name="new_password" /><br /><br />
        
        <label>Confirm Password:</label>
        <input type="password" name="confirm_password" /><br /><br />
        
        <input type="submit" value="Update Profile" />
    </form>
    <br />
    <a href="dashboard.php">Back to Dashboard</a> | 
    <a href="../backend/logout.php">Logout</a>
</body>
</html>
