<?php
// DB connection
$conn = new mysqli("localhost", "root", "Sneakers@83", "stock_watchlist");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$username = $_POST['username']; // You can use $_GET if needed

$sql = "SELECT stock_symbol, closing_price, added_date FROM watchlist WHERE username = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

$watchlist = [];

while ($row = $result->fetch_assoc()) {
    $watchlist[] = $row;
}

header('Content-Type: application/json');
echo json_encode($watchlist);

$conn->close();
?>
