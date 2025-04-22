function submitStock() {
    const username = document.getElementById('username').innerText.trim();
    const symbol = document.getElementById('stockSymbol').innerText.trim();
    let closingPriceRaw = document.getElementById('closeValue').innerText.trim();
    const closingPrice = closingPriceRaw.replace(/[^\d.]/g, '');

    fetch('add_to_watchlist.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `username=${encodeURIComponent(username)}&symbol=${encodeURIComponent(symbol)}&closingPrice=${encodeURIComponent(closingPrice)}`
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        loadWatchlist(); // 🔁 Refresh watchlist after add
    })
    .catch(err => {
        console.error("Error:", err);
    });
}


function loadWatchlist() {
    const username = document.getElementById('username').innerText.trim();

    fetch('get_watchlist.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `username=${encodeURIComponent(username)}`
    })
    .then(response => response.json())
    .then(data => {
        const list = document.querySelector('.stock-list');
        list.innerHTML = '';

        data.forEach(stock => {
            const li = document.createElement('li');
            li.className = 'stock-list-item';

            li.innerHTML = `
                <div class="stock-list-info">
                    <div class="mini-logo">
                        <img src="/api/placeholder/32/32" alt="${stock.stock_symbol} Logo">
                    </div>
                    <div class="stock-list-details">
                        <div class="stock-list-name">${stock.stock_symbol}</div>
                        <div class="stock-list-symbol">${stock.stock_symbol}</div>
                    </div>
                </div>
                <div class="stock-list-price">
                    <div class="stock-list-value">$${parseFloat(stock.closing_price).toFixed(2)}</div>
                    <div class="stock-list-change">Added</div>
                </div>
                <button class="delete-button" data-symbol="${stock.stock_symbol}" style="background-color: rgb(192, 4, 4); color:white; border-style: none; padding: 0.4rem 0.8rem;">DEL</button>
            `;

            list.appendChild(li);
        });

        // Add delete listeners
        document.querySelectorAll('.delete-button').forEach(button => {
            button.addEventListener('click', function () {
                const symbol = this.dataset.symbol;
                deleteStock(username, symbol);
            });
        });
    })
    .catch(error => console.error('Error loading watchlist:', error));
}


function deleteStock(username, symbol) {
    fetch('delete_from_watchlist.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `username=${encodeURIComponent(username)}&symbol=${encodeURIComponent(symbol)}`
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        loadWatchlist(); // 🔁 Reload after deletion
    })
    .catch(error => console.error("Delete error:", error));
}
window.addEventListener('DOMContentLoaded', loadWatchlist);
