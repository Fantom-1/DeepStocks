<?php
// includes/db_connection.php

$host = 'localhost'; // or your host
$username = 'root'; // your database username
$password = 'Sneakers@83'; // your database password
$database = 'market_insights_pro';

// Create connection
$conn = new mysqli($host, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>