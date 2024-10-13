<?php
session_start();
if (!isset($_SESSION['user_id'])) {
    header('Location: login.html');
    exit();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Dashboard</title>
</head>
<body>
    <!-- Link to Profile Page -->
    <div style="position: absolute; top: 10px; right: 10px;">
        <a href="profile.php">Profile</a>
    </div>
    <h1>Welcome, <?php echo htmlspecialchars($_SESSION['username']); ?>!</h1>
</body>
</html>
