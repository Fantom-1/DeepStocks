<?php
// includes/authlogin.php

require_once 'db_connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get form data
    $email = trim($_POST['email']);
    $password = $_POST['password'];
    // $remember = isset($_POST['remember']) ? true : false;
    
    // Find user in database
    $stmt = $conn->prepare("SELECT id, fullname, email, password FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows === 1) {
        $user = $result->fetch_assoc();
        
        // Verify password
        if (password_verify($password, $user['password'])) {
            // Password is correct, start session
            session_start();
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['user_email'] = $user['email'];
            $_SESSION['user_fullname'] = $user['fullname'];
            
            // If "Remember me" is checked, set cookie
            // if ($remember) {
            //     $token = bin2hex(random_bytes(32));
            //     $expiry = time() + 60 * 60 * 24 * 30; // 30 days
                
            //     // Update user record with token
            //     $update_stmt = $conn->prepare("UPDATE users SET remember_token = ? WHERE id = ?");
            //     $update_stmt->bind_param("si", $token, $user['id']);
            //     $update_stmt->execute();
            //     $update_stmt->close();
                
            //     setcookie('remember_token', $token, $expiry, '/');
            // }
            
            // Redirect to dashboard or home page
            header("Location: index.php");
            exit();
        } else {
            $error = "Password is incorrect";
        }
    } 
    else {
        echo "No user found with this credential";
    }

    
    // If login fails, redirect back to login page with error
    if (isset($error)) {
        echo $error;
        exit();
    }
}

?>