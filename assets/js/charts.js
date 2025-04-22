const API_KEY_CHARTS = "5b0f6617c1af44e582139a2f8a55d1a8"; // Ashwin 2 api key
const BASE_URL = "https://api.twelvedata.com";
const DEFAULT_STOCK = {
  symbol: "AAPL",
  name: "Apple Inc.",
  exchange: "NASDAQ",
};

// Chart and state variables
let stockChart;
let currentStock = DEFAULT_STOCK;
let currentRange = "1day";
let currentPeriod = "30"; // Default to 1 month
const stockDataCache = {};

// DOM Elements
const searchInput = document.getElementById("stockSearchInput");
const stockNameEl = document.getElementById("stockName");
const stockSymbolEl = document.getElementById("stockSymbol");
const stockLogoEl = document.getElementById("stockLogo");
const timeFilters = document.querySelectorAll(".time-filter");
const chartOverlay = document.getElementById("chartOverlay");
const loadingMessage = document.getElementById("loadingMessage");

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  initializeChart();
  loadStockData(currentStock.symbol, currentRange, currentPeriod);
  setupEventListeners();
});

// Set up event listeners
function setupEventListeners() {
  // Search input
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const query = searchInput.value.trim();
      if (query) {
        // For simplicity, we'll assume the user enters a symbol directly
        const stock = {
          symbol: query.toUpperCase(),
          name: query.toUpperCase(), // Placeholder - in real app you'd fetch the name
          exchange: "NYSE", // Placeholder
        };
        updateStockDisplay(stock);
        loadStockData(stock.symbol, currentRange, currentPeriod);
        searchInput.value = "";
      }
    }
  });

  // Time filter buttons
  timeFilters.forEach((button) => {
    button.addEventListener("click", () => {
      timeFilters.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      currentRange = button.dataset.range;
      currentPeriod = button.dataset.period;
      loadStockData(currentStock.symbol, currentRange, currentPeriod);
    });
  });
}

// Initialize Chart.js
function initializeChart() {
  const ctx = document.getElementById("stockChart").getContext("2d");

  if (stockChart) {
    stockChart.destroy();
  }

  stockChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: [],
      datasets: [
        {
          label: "Stock Price",
          data: [],
          borderColor: "#3B82F6",
          backgroundColor: "rgba(59, 130, 246, 0.1)",
          borderWidth: 2,
          pointRadius: 0,
          pointHoverRadius: 5,
          pointBackgroundColor: "#3B82F6",
          tension: 0.1,
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          mode: "index",
          intersect: false,
          callbacks: {
            label: (context) => `$${context.parsed.y.toFixed(2)}`,
          },
        },
      },
      scales: {
        x: { grid: { display: false } },
        y: {
          grid: { color: "rgba(0, 0, 0, 0.05)" },
          ticks: { callback: (value) => "$" + value },
        },
      },
    },
  });
}

// Load stock data from Twelve Data API
async function loadStockData(symbol, interval = "1day", period = "30") {
  showLoading("Loading chart data...");

  const cacheKey = `${symbol}-${interval}-${period}`;

  try {
    let data = stockDataCache[cacheKey];

    if (!data) {
      const now = new Date();
      const endDate = now.toISOString().split("T")[0];

      const startDate = new Date();
      startDate.setDate(startDate.getDate() - parseInt(period));
      const startDateStr = startDate.toISOString().split("T")[0];

      const response = await fetch(
        `${BASE_URL}/time_series?symbol=${symbol}&interval=${interval}&apikey=${API_KEY_CHARTS}&start_date=${startDateStr}&end_date=${endDate}`
      );
      data = await response.json();

      if (data.code || data.status === "error") {
        throw new Error(data.message || "Error fetching data");
      }

      stockDataCache[cacheKey] = data;
    }

    updateChart(data, interval, period);
    updateStockMetrics(data);
    hideLoading();
  } catch (error) {
    console.error("Data load error:", error);
    showLoading("Error loading stock data");
    setTimeout(hideLoading, 2000);
  }
}

// Update chart with data
function updateChart(data, interval, period) {
  if (!data.values || data.values.length === 0) {
    showLoading("No data available");
    setTimeout(hideLoading, 2000);
    return;
  }

  // Process data
  const values = data.values.reverse(); // Reverse to get chronological order
  const labels = values.map((item) => {
    const date = new Date(item.datetime);

    if (period === "1") {
      // Today
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else if (period === "5" || period === "30") {
      // 5 days or 1 month
      return date.toLocaleDateString([], { month: "short", day: "numeric" });
    } else {
      // 1 year
      return date.toLocaleDateString([], { month: "short", year: "2-digit" });
    }
  });

  const closePrices = values.map((item) => parseFloat(item.close));

  // Update chart
  stockChart.data.labels = labels;
  stockChart.data.datasets[0].data = closePrices;
  stockChart.update();
}

// Update stock metrics
function updateStockMetrics(data) {
  if (!data.values || data.values.length === 0) return;

  const latest = data.values[0];
  const previous = data.values[1] || latest;

  const change = (
    ((latest.close - previous.close) / previous.close) *
    100
  ).toFixed(2);
  const changeClass = change >= 0 ? "positive" : "negative";

  document.getElementById("openValue").textContent = formatCurrency(
    latest.open
  );
  document.getElementById("highValue").textContent = formatCurrency(
    latest.high
  );
  document.getElementById("lowValue").textContent = formatCurrency(latest.low);
  document.getElementById("closeValue").textContent = formatCurrency(
    latest.close
  );
  document.getElementById("volumeValue").textContent = formatVolume(
    latest.volume
  );

  const changeEl = document.getElementById("changeValue");
  changeEl.textContent = `${change >= 0 ? "+" : ""}${change}%`;
  changeEl.className = `metric-value ${changeClass}`;
}

// Update stock display
function updateStockDisplay(stock) {
  currentStock = stock;
  stockNameEl.textContent = stock.name;
  stockSymbolEl.textContent = `${stock.symbol} • ${stock.exchange}`;
  stockLogoEl.textContent = stock.symbol.charAt(0);
}

// Helper functions
function showLoading(message) {
  loadingMessage.textContent = message;
  chartOverlay.classList.remove("hidden");
}

function hideLoading() {
  chartOverlay.classList.add("hidden");
}

function formatCurrency(value) {
  return "$" + parseFloat(value).toFixed(2);
}

function formatVolume(value) {
  const num = parseInt(value);
  if (num >= 1000000000) return (num / 1000000000).toFixed(1) + "B";
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return (num / 1000).toFixed(1) + "K";
  return num.toString();
}
