<?php
// includes/authsignup.php

require_once 'db_connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'signup') {
    // Get form data
    $fullname = trim($_POST['fullname']);
    $email = trim($_POST['email']);
    $password = $_POST['password'];
    
    // Validate inputs (you already have client-side validation)
    $errors = [];
    
    // Check if email already exists
    $stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();
    
    if ($stmt->num_rows > 0) {
        $errors['email'] = "Email already exists";
    }
    $stmt->close();
    
    if (empty($errors)) {
        // Hash the password
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);
        
        // Insert user into database
        $stmt = $conn->prepare("INSERT INTO users (fullname, email, password) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $fullname, $email, $hashed_password);
        
        if ($stmt->execute()) {
            // Registration successful
            header("Location: login.html");
            exit();
        } else {
            $errors['database'] = "Registration failed. Please try again.";
        }
        $stmt->close();
    }
    
    // If there are errors, redirect back to signup page with errors
    if (!empty($errors)) {
        $error_string = http_build_query(['errors' => $errors]);
        header("Location: signup.html");
        exit();
    }
}

?>