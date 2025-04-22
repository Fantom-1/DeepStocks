document.addEventListener("DOMContentLoaded", function() {
    const apiKey = '201909f0f1be48699ffd41984000f1e0'; // Your API key
    const symbols = [
        'AAPL', 'TSLA', 'GOOGL', 'AMZN', 'MSFT', 'META', 'NFLX', 'TWTR', 
        'NVDA', 'ADBE', 'ZM', 'INTC', 'CRM', 'ORCL', 'SPOT', 'SNAP', 
        'PYPL', 'UBER', 'AMD', 'BABA' // 20 random stock symbols
    ];

    // Function to fetch stock data from 12Data API
    async function fetchStockData(symbol) {
        const url = `https://api.twelvedata.com/quote?symbol=${symbol}&apikey=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }

    // Function to generate the market cards with fetched data
    async function generateMarketCards() {
        const marketOverview = document.querySelector('.market-overview');
        
        // Clear existing cards before inserting new ones
        marketOverview.innerHTML = '';

        // Shuffle symbols to display random stocks each time
        const randomSymbols = symbols.sort(() => 0.5 - Math.random()).slice(0, 5); // Display 5 random symbols

        for (const symbol of randomSymbols) {
            try {
                const data = await fetchStockData(symbol);

                if (data && data.status === 'ok') {
                    const company = {
                        name: data.name,
                        symbol: data.symbol,
                        price: parseFloat(data.close),  // Close price from the response
                        change: parseFloat(data.percent_change), // Change percentage
                        changeAmount: parseFloat(data.change), // Change amount
                    };

                    const card = document.createElement('div');
                    card.classList.add('market-card');

                    card.innerHTML = `
                        <div class="market-card-header">
                            <div class="market-card-name">${company.name}</div>
                            <div class="market-card-symbol">${company.symbol}</div>
                        </div>
                        <div class="market-card-price">${company.price.toFixed(2)}</div>
                        <div class="market-card-change ${company.change > 0 ? 'change-positive' : 'change-negative'}">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="${company.change > 0 ? 'M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z' : 'M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z'}"/>
                            </svg>
                            ${company.change > 0 ? '+' : ''}${company.change.toFixed(2)}% (${company.changeAmount.toFixed(2)})
                        </div>
                    `;

                    marketOverview.appendChild(card);
                } else {
                    console.error(`Error fetching data for symbol ${symbol}`);
                }
            } catch (error) {
                console.error(`Error fetching data for symbol ${symbol}:`, error);
            }
        }
    }

    // Call the function to generate the market cards on page load
    generateMarketCards();

    // Set interval to refresh the market cards every 30 seconds (30000 milliseconds)
    setInterval(() => {
        generateMarketCards();
    }, 30000); // Refresh every 30 seconds
});
