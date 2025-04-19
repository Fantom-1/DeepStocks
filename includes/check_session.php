<?php
// includes/check_session.php

session_start();

if (!isset($_SESSION['user_id'])) {
    // Check for remember token cookie
    if (isset($_COOKIE['remember_token'])) {
        require_once 'db_connection.php';
        
        $token = $_COOKIE['remember_token'];
        $stmt = $conn->prepare("SELECT id, email, fullname FROM users WHERE remember_token = ?");
        $stmt->bind_param("s", $token);
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($result->num_rows === 1) {
            $user = $result->fetch_assoc();
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['user_email'] = $user['email'];
            $_SESSION['user_fullname'] = $user['fullname'];
        }
        
        $stmt->close();
        $conn->close();
    } else {
        // Redirect to login page if not logged in
        header("Location: login.html");
        exit();
    }
}
?>