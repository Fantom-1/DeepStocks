<?php
require_once 'db.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    $username = $conn->real_escape_string($data['username']);
    // $stockName = $conn->real_escape_string($data['stockName']);
    $stockSymbol = $conn->real_escape_string($data['stockSymbol']);
    $closingPrice = $conn->real_escape_string($data['closingPrice']);

    $sql = "INSERT INTO watchlist (username, stock_symbol, closing_price) 
            VALUES ('$username', '$stockSymbol', '$closingPrice')";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(['success' => true, 'message' => 'Added to watchlist']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error: ' . $conn->error]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}

$conn->close();
?>