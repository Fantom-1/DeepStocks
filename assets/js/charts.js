const API_KEY = 'M4OPY9UROHXDVM9N'; // Replace with your actual Alpha Vantage API key
const baseURL = 'https://www.alphavantage.co/query?';

let stockChart = null;

// Clear previous stock data
function clearStockInfo() {
    document.getElementById("stockName").textContent = "--";
    document.getElementById("stockSymbol").textContent = "--";
    document.getElementById("openValue").textContent = "--";
    document.getElementById("highValue").textContent = "--";
    document.getElementById("lowValue").textContent = "--";
    document.getElementById("volumeValue").textContent = "--";
    document.getElementById("marketCapValue").textContent = "--";
    document.getElementById("peRatioValue").textContent = "--";
}

// Fetch stock chart data for a given symbol (time period is '1m' by default)
async function fetchChartData(symbol, timePeriod = '1m') {
    const res = await fetch(`${baseURL}function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API_KEY}`);
    const data = await res.json();
    return data["Time Series (Daily)"] || null;
}

// Fetch stock metrics like open, high, low, volume
async function fetchMetrics(symbol) {
    const res = await fetch(`${baseURL}function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`);
    const data = await res.json();
    return data["Global Quote"] || null;
}

// Fetch stock overview information
async function fetchOverview(symbol) {
    const res = await fetch(`${baseURL}function=OVERVIEW&symbol=${symbol}&apikey=${API_KEY}`);
    const data = await res.json();
    return data || null;
}

// Update UI with fetched data
async function updateStockInfo(symbol) {
    const chartData = await fetchChartData(symbol);
    const metrics = await fetchMetrics(symbol);
    const overview = await fetchOverview(symbol);

    if (chartData) {
        updateChart(chartData);
    }

    if (metrics) {
        document.getElementById("openValue").textContent = `$${metrics["02. open"]}`;
        document.getElementById("highValue").textContent = `$${metrics["03. high"]}`;
        document.getElementById("lowValue").textContent = `$${metrics["04. low"]}`;
        document.getElementById("volumeValue").textContent = `${(metrics["06. volume"] / 1e6).toFixed(2)}M`;
    }

    if (overview) {
        document.getElementById("stockName").textContent = overview["Name"];
        document.getElementById("stockSymbol").textContent = overview["Symbol"];
        document.getElementById("marketCapValue").textContent = `$${overview["MarketCapitalization"]}`;
        document.getElementById("peRatioValue").textContent = overview["PERatio"];
    }
}

// Update chart with the fetched data
function updateChart(data) {
    const dates = Object.keys(data);
    const closingPrices = dates.map(date => parseFloat(data[date]["4. close"]));

    if (stockChart) {
        stockChart.destroy();
    }

    const ctx = document.getElementById('stockChart').getContext('2d');
    stockChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates.reverse(),
            datasets: [{
                label: 'Closing Price',
                data: closingPrices.reverse(),
                borderColor: '#007bff',
                borderWidth: 2,
                fill: false
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    type: 'category',
                    labels: dates.reverse(),
                    ticks: {
                        autoSkip: true,
                        maxRotation: 0
                    }
                },
                y: {
                    beginAtZero: false
                }
            }
        });
}

// Handle stock selection from dropdown
document.getElementById('stockDropdownBtn').addEventListener('click', () => {
    const dropdown = document.getElementById('stockDropdown');
    dropdown.classList.toggle('show');
});

// Populate dropdown with stock options
const stockSymbols = ['AAPL', 'GOOGL', 'AMZN', 'MSFT', 'TSLA'];  // List of stock symbols
const stockDropdown = document.getElementById('stockDropdown');
stockSymbols.forEach(symbol => {
    const option = document.createElement('div');
    option.textContent = symbol;
    option.addEventListener('click', () => {
        updateStockInfo(symbol);
        document.getElementById('stockDropdownBtn').textContent = `Change Stock (${symbol})`;
        stockDropdown.classList.remove('show');
    });
    stockDropdown.appendChild(option);
});

// Initial load with default stock symbol (Apple Inc.)
updateStockInfo('IBM');
