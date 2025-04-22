// chartv.js

let stockChart;
let currentSymbol = "AAPL";
const ctx = document.getElementById("stockChart").getContext("2d");

function initializeChart(labels = [], data = []) {
    if (stockChart) stockChart.destroy();

    stockChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Stock Price',
                data: data,
                borderColor: "#3B82F6",
                backgroundColor: "rgba(59, 130, 246, 0.1)",
                borderWidth: 2,
                pointRadius: 0,
                pointHoverRadius: 5,
                pointBackgroundColor: "#3B82F6",
                tension: 0.1,
                fill: true,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        label: context => `$${context.parsed.y.toFixed(2)}`
                    }
                }
            },
            scales: {
                x: { grid: { display: false }},
                y: {
                    grid: { color: 'rgba(0, 0, 0, 0.05)' },
                    ticks: {
                        callback: value => `$${value}`
                    }
                }
            }
        }
    });
}

// This is called from index.js
function changeStockSymbol(symbol) {
    currentSymbol = symbol;
    fetchStockDataAndUpdateChart();
}

// Fetch mock data or API data and update chart
function fetchStockDataAndUpdateChart() {
    // Simulate loading
    document.getElementById("chartOverlay").classList.add("visible");

    // Simulate async delay and mock data
    setTimeout(() => {
        const data = generateMockData(currentSymbol, 30);
        const labels = Array.from({ length: data.length }, (_, i) => i + 1);

        initializeChart(labels, data);

        document.getElementById("chartOverlay").classList.remove("visible");
    }, 800);
}

// Mock data generator
function generateMockData(symbol, points = 30) {
    const base = Math.random() * 100 + 100;
    return Array.from({ length: points }, () =>
        (base + Math.random() * 10 - 5).toFixed(2)
    );
}
