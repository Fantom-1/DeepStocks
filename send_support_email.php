<?php
// Start output buffering to catch any accidental output
ob_start();

// Enable error reporting but don't display errors (log them instead)
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);

// Set headers first to ensure proper JSON response
header('Content-Type: application/json; charset=UTF-8');

// Initialize response array
$response = ['success' => false, 'message' => ''];

try {
    // Verify this is a POST request
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        throw new Exception('Invalid request method');
    }

    // Get and sanitize input
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_STRING) ?? '';

    // Validate email
    if (empty($email)) {
        throw new Exception('Email is required');
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        throw new Exception('Invalid email address');
    }

    // Set admin email
    $admin_email = 'ashwin70807@gmail.com';
    $subject = 'New Support Request from Market Insights Pro';
    
    // Prepare email content
    $email_content = "You have received a new support request.\n\n";
    $email_content .= "Email: $email\n";
    $email_content .= "Message:\n$message\n";
    
    // Email headers
    $headers = [
        'From' => $email,
        'Reply-To' => $email,
        'X-Mailer' => 'PHP/' . phpversion(),
        'Content-Type' => 'text/plain; charset=UTF-8'
    ];
    
    // Format headers
    $formatted_headers = '';
    foreach ($headers as $key => $value) {
        $formatted_headers .= "$key: $value\r\n";
    }
    
    // Send email
    $mail_sent = mail($admin_email, $subject, $email_content, $formatted_headers);
    
    if ($mail_sent) {
        $response['success'] = true;
        $response['message'] = 'Thank you! Your support request has been submitted. We\'ll contact you soon.';
    } else {
        throw new Exception('Failed to send email. Mail server error.');
    }
    
} catch (Exception $e) {
    $response['message'] = $e->getMessage();
    // Log the error for debugging
    error_log('Support form error: ' . $e->getMessage());
}

// Clear any accidental output
ob_end_clean();

// Send JSON response
echo json_encode($response);
exit;
?>