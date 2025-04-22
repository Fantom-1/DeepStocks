<?php
// db.php
$host = 'localhost';
$user = 'root';
$password = 'Sneakers@83';
$database = 'stock_watchlist';

$conn = new mysqli($host, $user, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>