// Alpha Vantage API configuration
const ALPHA_VANTAGE_API_KEY = 'M4OPY9UROHXDVM9N'; // Replace with your actual API key
const ALPHA_VANTAGE_BASE_URL = 'https://www.alphavantage.co/query';

// Default stock data
const DEFAULT_STOCK = {
  symbol: 'AAPL',
  name: 'Apple Inc.',
  exchange: 'NASDAQ'
};

// Chart.js instance
let stockChart;

// Stock data cache
const stockDataCache = {};

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  // Initialize chart with default stock
  initializeStockChart();
  
  // Load default stock data
  loadStockData(DEFAULT_STOCK.symbol);
  
  // Setup event listeners
  setupEventListeners();
  
  // Initialize stock dropdown
  initializeStockDropdown();
});

// Initialize Chart.js
function initializeStockChart() {
  const ctx = document.getElementById('stockChart').getContext('2d');
  
  stockChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: 'Stock Price',
        data: [],
        borderColor: '#4f46e5',
        backgroundColor: 'rgba(79, 70, 229, 0.1)',
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 5,
        pointBackgroundColor: '#4f46e5',
        tension: 0.1,
        fill: true
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          mode: 'index',
          intersect: false,
          callbacks: {
            label: function(context) {
              return `$${context.parsed.y.toFixed(2)}`;
            }
          }
        }
      },
      scales: {
        x: {
          grid: {
            display: false
          }
        },
        y: {
          grid: {
            color: 'rgba(0, 0, 0, 0.05)'
          },
          ticks: {
            callback: function(value) {
              return '$' + value;
            }
          }
        }
      }
    }
  });
}

// Setup event listeners
function setupEventListeners() {
  // Time filter buttons
  const timeFilterButtons = document.querySelectorAll('.time-filter .card-button');
  timeFilterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      timeFilterButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      button.classList.add('active');
      
      // Get current stock symbol
      const currentSymbol = document.getElementById('stockSymbol').textContent.trim().split(' ')[0];
      
      // Reload data with new time range
      loadStockData(currentSymbol, button.textContent);
    });
  });
  
  // Stock dropdown button
  document.getElementById('stockDropdownBtn').addEventListener('click', () => {
    document.getElementById('stockDropdown').classList.toggle('show');
  });
  
  // Close dropdown when clicking outside
  window.addEventListener('click', (event) => {
    if (!event.target.matches('.dropdown-btn') && !event.target.matches('.dropdown-btn *')) {
      const dropdowns = document.getElementsByClassName('dropdown-content');
      for (let i = 0; i < dropdowns.length; i++) {
        if (dropdowns[i].classList.contains('show')) {
          dropdowns[i].classList.remove('show');
        }
      }
    }
  });
  
  // Search input
  const searchInput = document.getElementById('stockSearchInput');
  searchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      const query = searchInput.value.trim();
      if (query) {
        searchStocks(query);
      }
    }
  });
  
  // Search icon click
  document.querySelector('.search-icon').addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) {
      searchStocks(query);
    }
  });
}

// Initialize stock dropdown with popular stocks
function initializeStockDropdown() {
  const popularStocks = [
    { symbol: 'AAPL', name: 'Apple Inc.', exchange: 'NASDAQ' },
    { symbol: 'MSFT', name: 'Microsoft Corporation', exchange: 'NASDAQ' },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', exchange: 'NASDAQ' },
    { symbol: 'AMZN', name: 'Amazon.com Inc.', exchange: 'NASDAQ' },
    { symbol: 'TSLA', name: 'Tesla, Inc.', exchange: 'NASDAQ' },
    { symbol: 'META', name: 'Meta Platforms, Inc.', exchange: 'NASDAQ' },
    { symbol: 'NVDA', name: 'NVIDIA Corporation', exchange: 'NASDAQ' },
    { symbol: 'JPM', name: 'JPMorgan Chase & Co.', exchange: 'NYSE' }
  ];
  
  const dropdown = document.getElementById('stockDropdown');
  dropdown.innerHTML = '';
  
  popularStocks.forEach(stock => {
    const item = document.createElement('div');
    item.className = 'dropdown-item';
    item.innerHTML = `
      <div class="stock-item-info">
        <div class="stock-item-name">${stock.name}</div>
        <div class="stock-item-symbol">${stock.symbol} <span class="stock-badge">${stock.exchange}</span></div>
      </div>
    `;
    
    item.addEventListener('click', () => {
      updateSelectedStock(stock);
      dropdown.classList.remove('show');
    });
    
    dropdown.appendChild(item);
  });
}

// Search for stocks using Alpha Vantage API
async function searchStocks(query) {
  showChartOverlay('Searching...');
  
  try {
    const response = await fetch(`${ALPHA_VANTAGE_BASE_URL}?function=SYMBOL_SEARCH&keywords=${encodeURIComponent(query)}&apikey=${ALPHA_VANTAGE_API_KEY}`);
    const data = await response.json();
    
    if (data.bestMatches && data.bestMatches.length > 0) {
      const bestMatch = data.bestMatches[0];
      const stock = {
        symbol: bestMatch['1. symbol'],
        name: bestMatch['2. name'],
        exchange: bestMatch['4. region']
      };
      
      updateSelectedStock(stock);
    } else {
      showChartOverlay('No matching stocks found.');
    }
  } catch (error) {
    console.error('Error searching for stocks:', error);
    showChartOverlay('Error searching for stocks. Please try again.');
  }
}

// Update the selected stock
function updateSelectedStock(stock) {
  // Update stock info
  document.getElementById('stockName').textContent = stock.name;
  document.getElementById('stockSymbol').innerHTML = `${stock.symbol} <span class="stock-badge">${stock.exchange}</span>`;
  
  // Update logo (in real implementation, you'd use a logo API)
  document.getElementById('stockLogo').src = `/api/placeholder/40/40?text=${stock.symbol}`;
  
  // Reset time filter buttons
  const timeFilterButtons = document.querySelectorAll('.time-filter .card-button');
  timeFilterButtons.forEach(btn => btn.classList.remove('active'));
  document.querySelector('.time-filter .card-button[innerText="1M"]').classList.add('active');
  
  // Load stock data
  loadStockData(stock.symbol, '1M');
}

// Load stock data from Alpha Vantage API
async function loadStockData(symbol, timeRange = '1M') {
  showChartOverlay('Loading chart data...');
  
  let apiFunction, outputSize;
  switch (timeRange) {
    case '1D':
      apiFunction = 'TIME_SERIES_INTRADAY';
      interval = '5min';
      outputSize = 'compact';
      break;
    case '1W':
      apiFunction = 'TIME_SERIES_DAILY';
      outputSize = 'compact';
      break;
    case '1M':
    case '3M':
      apiFunction = 'TIME_SERIES_DAILY';
      outputSize = 'compact';
      break;
    case '1Y':
    case '5Y':
      apiFunction = 'TIME_SERIES_WEEKLY';
      outputSize = 'full';
      break;
    default:
      apiFunction = 'TIME_SERIES_DAILY';
      outputSize = 'compact';
  }
  
  const cacheKey = `${symbol}-${timeRange}`;
  
  try {
    let data;
    
    // Check cache first
    if (stockDataCache[cacheKey]) {
      data = stockDataCache[cacheKey];
    } else {
      // Fetch from API if not in cache
      let url = `${ALPHA_VANTAGE_BASE_URL}?function=${apiFunction}&symbol=${symbol}&outputsize=${outputSize}&apikey=${ALPHA_VANTAGE_API_KEY}`;
      
      if (apiFunction === 'TIME_SERIES_INTRADAY') {
        url += `&interval=${interval}`;
      }
      
      const response = await fetch(url);
      data = await response.json();
      
      // Store in cache
      stockDataCache[cacheKey] = data;
    }
    
    // Update chart with new data
    updateChartWithData(data, timeRange);
    
    // Fetch and update company overview for metrics
    await updateStockMetrics(symbol);
    
    hideChartOverlay();
  } catch (error) {
    console.error('Error loading stock data:', error);
    showChartOverlay('Error loading stock data. Please try again.');
  }
}

// Update chart with new data
function updateChartWithData(data, timeRange) {
  let timeSeriesKey;
  
  // Determine the time series key based on the API function
  if (data['Time Series (5min)']) {
    timeSeriesKey = 'Time Series (5min)';
  } else if (data['Time Series (Daily)']) {
    timeSeriesKey = 'Time Series (Daily)';
  } else if (data['Weekly Time Series']) {
    timeSeriesKey = 'Weekly Time Series';
  } else {
    showChartOverlay('No data available for this stock.');
    return;
  }
  
  const timeSeries = data[timeSeriesKey];
  const dates = Object.keys(timeSeries).sort();
  
  // Filter dates based on selected time range
  let filteredDates = dates;
  const now = new Date();
  
  switch (timeRange) {
    case '1D':
      filteredDates = dates.filter(date => {
        const dateObj = new Date(date);
        return dateObj.getDate() === now.getDate() && 
               dateObj.getMonth() === now.getMonth() && 
               dateObj.getFullYear() === now.getFullYear();
      });
      break;
    case '1W':
      const oneWeekAgo = new Date(now);
      oneWeekAgo.setDate(now.getDate() - 7);
      filteredDates = dates.filter(date => new Date(date) >= oneWeekAgo);
      break;
    case '1M':
      const oneMonthAgo = new Date(now);
      oneMonthAgo.setMonth(now.getMonth() - 1);
      filteredDates = dates.filter(date => new Date(date) >= oneMonthAgo);
      break;
    case '3M':
      const threeMonthsAgo = new Date(now);
      threeMonthsAgo.setMonth(now.getMonth() - 3);
      filteredDates = dates.filter(date => new Date(date) >= threeMonthsAgo);
      break;
    case '1Y':
      const oneYearAgo = new Date(now);
      oneYearAgo.setFullYear(now.getFullYear() - 1);
      filteredDates = dates.filter(date => new Date(date) >= oneYearAgo);
      break;
    case '5Y':
      const fiveYearsAgo = new Date(now);
      fiveYearsAgo.setFullYear(now.getFullYear() - 5);
      filteredDates = dates.filter(date => new Date(date) >= fiveYearsAgo);
      break;
  }
  
  // Format dates for display
  const formattedDates = filteredDates.map(date => {
    const dateObj = new Date(date);
    return timeRange === '1D' ? 
      dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 
      dateObj.toLocaleDateString([], { month: 'short', day: 'numeric' });
  });
  
  // Get close prices
  const closePrices = filteredDates.map(date => {
    return parseFloat(timeSeries[date]['4. close']);
  });
  
  // Update chart data
  stockChart.data.labels = formattedDates;
  stockChart.data.datasets[0].data = closePrices;
  stockChart.update();
}

// Update stock metrics
async function updateStockMetrics(symbol) {
  try {
    // Fetch company overview
    const response = await fetch(`${ALPHA_VANTAGE_BASE_URL}?function=OVERVIEW&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`);
    const overview = await response.json();
    
    // Fetch quote endpoint for latest price data
    const quoteResponse = await fetch(`${ALPHA_VANTAGE_BASE_URL}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`);
    const quoteData = await quoteResponse.json();
    const quote = quoteData['Global Quote'];
    
    // Update metrics
    if (quote) {
      document.getElementById('openValue').textContent = formatCurrency(quote['02. open']);
      document.getElementById('highValue').textContent = formatCurrency(quote['03. high']);
      document.getElementById('lowValue').textContent = formatCurrency(quote['04. low']);
      document.getElementById('volumeValue').textContent = formatVolume(quote['06. volume']);
    }
    
    if (overview) {
      document.getElementById('marketCapValue').textContent = formatMarketCap(overview.MarketCapitalization);
      document.getElementById('peRatioValue').textContent = overview.PERatio ? parseFloat(overview.PERatio).toFixed(2) : 'N/A';
    }
  } catch (error) {
    console.error('Error updating stock metrics:', error);
  }
}

// Helper function to show chart overlay
function showChartOverlay(message) {
  const overlay = document.getElementById('chartOverlay');
  overlay.style.display = 'flex';
  overlay.querySelector('.chart-loading div:last-child').textContent = message;
}

// Helper function to hide chart overlay
function hideChartOverlay() {
  document.getElementById('chartOverlay').style.display = 'none';
}

// Format currency values
function formatCurrency(value) {
  return '$' + parseFloat(value).toFixed(2);
}

// Format volume values (e.g., 68.4M)
function formatVolume(value) {
  const num = parseInt(value);
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1) + 'B';
  } else if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

// Format market cap values (e.g., $2.78T)
function formatMarketCap(value) {
  const num = parseInt(value);
  if (num >= 1000000000000) {
    return '$' + (num / 1000000000000).toFixed(2) + 'T';
  } else if (num >= 1000000000) {
    return '$' + (num / 1000000000).toFixed(2) + 'B';
  } else if (num >= 1000000) {
    return '$' + (num / 1000000).toFixed(2) + 'M';
  }
  return '$' + num.toString();
}

