<?php
$host = "127.0.0.1";
$user = "root";
$pass = "Sneakers@83"; // Your password if set
$db = "stock_watchlist";

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $username = $conn->real_escape_string($_POST['username']);
    $symbol = $conn->real_escape_string($_POST['symbol']);
    $closingPrice = $conn->real_escape_string($_POST['closingPrice']);

    $sql = "INSERT INTO watchlist (username, stock_symbol, closing_price, added_date)
            VALUES ('$username', '$symbol', '$closingPrice', NOW())";

    if ($conn->query($sql) === TRUE) {
        echo "Stock for $username ($symbol at $$closingPrice) added!";
    } else {
        echo "Error: " . $conn->error;
    }
}

$conn->close();
?>
