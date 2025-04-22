async function fetchTrendingStocks() {
    const tableBody = document.querySelector('.holdings-table tbody');
    tableBody.innerHTML = ''; // Clear previous entries

    const allSymbols = [
        'AAPL', 'MSFT', 'GOOGL', 'AMZN', 'NVDA',
        'TSLA', 'META', 'NFLX', 'BABA', 'ORCL',
        'INTC', 'ADBE', 'CRM', 'PYPL', 'UBER',
        'DIS', 'PEP', 'KO', 'CSCO', 'NKE'
    ];

    const randomSymbols = allSymbols
        .sort(() => Math.random() - 0.5)
        .slice(0, 5);

    const apiKey_trends = '4a6f4219ff0a4fbab2fbdfaaa5878b39'; //Ashwins API key

    try {
        const responses = await Promise.all(
            randomSymbols.map(symbol =>
                fetch(`https://api.twelvedata.com/quote?symbol=${symbol}&apikey=${apiKey_trends}`)
            )
        );

        const data = await Promise.all(responses.map(res => res.json()));

        data.forEach(stock => {
            if (stock.code || stock.status === "error") {
                console.warn('Error for stock:', stock.message || stock.code);
                return;
            }

            const {
                symbol,
                name,
                close,
                previous_close
            } = stock;

            const quantity = Math.floor(Math.random() * 100) + 1;
            const avgPrice = (parseFloat(previous_close) * (0.9 + Math.random() * 0.2)).toFixed(2);
            const currentPrice = parseFloat(close).toFixed(2);
            const value = (quantity * currentPrice).toFixed(2);
            const returnPercent = (((currentPrice - avgPrice) / avgPrice) * 100).toFixed(2);
            const changeClass = returnPercent >= 0 ? 'change-positive' : 'change-negative';
            const allocation = Math.floor(Math.random() * 40) + 10;

            const rowHTML = `
                <tr>
                    <td>
                        <div class="asset">
                            <div class="asset-logo">
                                <img src="/api/placeholder/30/30" alt="${name} Logo">
                            </div>
                            <div class="asset-info">
                                <div class="asset-name">${name || symbol}</div>
                                <div class="asset-symbol">${symbol}</div>
                            </div>
                        </div>
                    </td>
                    
                
                    <td>$${currentPrice}</td>
                
                    <td class="${changeClass}">${returnPercent}%</td>
                    <td>
                        <div class="progress-bar">
                            <div class="progress" style="width: ${allocation}%;"></div>
                        </div>
                    </td>
                </tr>
            `;

            tableBody.insertAdjacentHTML('beforeend', rowHTML);
        });
    } catch (error) {
        console.error('Failed to fetch data from Twelve Data API:', error);
        tableBody.innerHTML = `<tr><td colspan="7">Error loading data</td></tr>`;
    }
}

document.addEventListener('DOMContentLoaded', fetchTrendingStocks);