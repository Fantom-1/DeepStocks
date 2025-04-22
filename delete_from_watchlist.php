<?php
$conn = new mysqli("localhost", "root", "Sneakers@83", "stock_watchlist");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$username = $_POST['username'];
$symbol = $_POST['symbol'];

$sql = "DELETE FROM watchlist WHERE username = ? AND stock_symbol = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $username, $symbol);

if ($stmt->execute()) {
    echo "Deleted successfully";
} else {
    echo "Error: " . $stmt->error;
}

$conn->close();
?>
