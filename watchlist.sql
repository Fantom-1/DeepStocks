CREATE DATABASE stock_watchlist;

USE stock_watchlist;

CREATE TABLE watchlist (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    stock_symbol VARCHAR(20) NOT NULL,
    closing_price DECIMAL(10,2) NOT NULL,
    added_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);