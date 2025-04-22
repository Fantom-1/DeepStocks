document.addEventListener("DOMContentLoaded", function () {
    const apiKey = '201909f0f1be48699ffd41984000f1e0'; //Yash's API
    const allSymbols = [
        'AAPL', 'TSLA', 'GOOGL', 'AMZN', 'MSFT',
        'META', 'NFLX', 'NVDA', 'ADBE', 'INTC',
        'CRM', 'ORCL', 'PYPL', 'UBER', 'AMD',
        'BABA', 'SPOT', 'SNAP', 'TWTR', 'ZM'
    ];

    const marketOverview = document.querySelector('.market-overview');

    async function fetchQuote(symbol) {
        const url = `https://api.twelvedata.com/quote?symbol=${symbol}&apikey=${apiKey}`;
        try {
            const res = await fetch(url);
            const data = await res.json();

            if (data.status === 'error') {
                console.warn(`API Error for ${symbol}: ${data.message}`);
                return null;
            }

            return {
                name: data.name,
                symbol: data.symbol,
                price: parseFloat(data.close),
                change: parseFloat(data.percent_change),
                changeAmount: parseFloat(data.change)
            };
        } catch (error) {
            console.error(`Fetch error for ${symbol}:`, error);
            return null;
        }
    }

    async function updateCards() {
        marketOverview.innerHTML = '';

        const shuffled = allSymbols.sort(() => 0.5 - Math.random()).slice(0, 5); // Only 5 stocks to avoid API limit

        for (const symbol of shuffled) {
            const company = await fetchQuote(symbol);
            if (!company) continue;

            const card = document.createElement('div');
            card.classList.add('market-card');

            const arrow = company.change >= 0
                ? 'M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z'
                : 'M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z';

            const changeClass = company.change >= 0 ? 'change-positive' : 'change-negative';

            card.innerHTML = `
                <div class="market-card-header">
                    <div class="market-card-name">${company.name}</div>
                    <div class="market-card-symbol">${company.symbol}</div>
                </div>
                <div class="market-card-price">${company.price.toFixed(2)}</div>
                <div class="market-card-change ${changeClass}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="${arrow}"/>
                    </svg>
                    ${company.change >= 0 ? '+' : ''}${company.change.toFixed(2)}% (${company.changeAmount.toFixed(2)})
                </div>
            `;

            marketOverview.appendChild(card);
        }
    }

    updateCards();
    setInterval(updateCards, 300000000); // Refresh every 30 seconds
});
