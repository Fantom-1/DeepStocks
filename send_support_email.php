<?php
// Ensure no output before headers
if (ob_get_level()) ob_end_clean();

header('Content-Type: application/json');

// Disable displaying errors to the user
ini_set('display_errors', 0);
ini_set('log_errors', 1);

try {
    // Verify the request method
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        throw new RuntimeException('Invalid request method');
    }

    // Get and validate input
    $email = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
    $message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_STRING) ?? '';

    if (!$email) {
        throw new RuntimeException('Please provide a valid email address');
    }

    // Email configuration
    $to = 'ash70807@gmail.com';
    $subject = 'New Support Request from ' . $email;
    $body = "You have received a new support request.\n\n";
    $body .= "Email: $email\n";
    $body .= "Message: \n$message\n";

    $headers = [
        'From' => $email,
        'Reply-To' => $email,
        'X-Mailer' => 'PHP/' . phpversion(),
        'Content-Type' => 'text/plain; charset=UTF-8'
    ];

    // Build header string
    $headerString = '';
    foreach ($headers as $name => $value) {
        $headerString .= "$name: $value\r\n";
    }

    // Send email
    $sent = mail($to, $subject, $body, $headerString);
    var_dump($sent);
    if (!$sent) {
        throw new RuntimeException('Unable to send email. Please try again later.');
    }

    echo json_encode([
        'success' => true,
        'message' => 'Your support request has been submitted successfully!'
    ]);

} catch (RuntimeException $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'An unexpected error occurred. Please try again later.'
    ]);
}

exit;
?>