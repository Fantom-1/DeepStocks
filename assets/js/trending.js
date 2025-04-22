// const API_KEY_Trends = '201909f0f1be48699ffd41984000f1e0'; // Replace with your API key from 12 Data
// const trendingStocks = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'NVDA']; // Example stock symbols

// // Function to fetch stock data from 12 Data API
// async function fetchStockData(symbol) {
//   try {
//     const response = await fetch(`https://api.12data.com/v1/quote?symbol=${symbol}&apikey=${API_KEY_Trends}`);
//     const data = await response.json();

//     // Check if the response contains valid data
//     if (data.status === 'ok') {
//       const { symbol, close, high, low, open, volume } = data;
//       return { symbol, closingPrice: close, highPrice: high, lowPrice: low, openPrice: open, volume };
//     } else {
//       console.error(`Error fetching data for ${symbol}:`, data.message);
//       return null;
//     }
//   } catch (error) {
//     console.error(`Error fetching data for ${symbol}:`, error);
//     return null;
//   }
// }

// // Function to fetch trending stocks data
// async function fetchTrendingStocks() {
//   const stockDataPromises = trendingStocks.map(symbol => fetchStockData(symbol));
//   const stockData = await Promise.all(stockDataPromises);

//   // Filter out invalid data (null values)
//   const validStockData = stockData.filter(stock => stock !== null);

//   // Update table with valid stock data
//   if (validStockData.length > 0) {
//     updateTrendingStocksTable(validStockData);
//   } else {
//     console.log("No valid stock data available");
//   }
// }

// // Function to update the HTML table with fetched stock data
// function updateTrendingStocksTable(stocks) {
//   const tbody = document.getElementById("trending-stocks-body");
//   tbody.innerHTML = ""; // Clear previous content

//   stocks.forEach(stock => {
//     const { symbol, closingPrice, highPrice, lowPrice, openPrice, volume } = stock;

//     const tr = document.createElement("tr");
//     tr.innerHTML = `
//       <td>
//         <div class="asset">
//           <div class="asset-logo">
//             <img src="/api/placeholder/30/30" alt="${symbol} Logo">
//           </div>
//           <div class="asset-info">
//             <div class="asset-name">${symbol}</div>
//             <div class="asset-symbol">${symbol}</div>
//           </div>
//         </div>
//       </td>
//       <td>-</td>
//       <td>-</td>
//       <td>$${closingPrice}</td>
//       <td>$${highPrice}</td>
//       <td class="change-positive">+0.00%</td>
//       <td>
//         <div class="progress-bar">
//           <div class="progress" style="width: 0%;"></div>
//         </div>
//       </td>
//     `;
//     tbody.appendChild(tr);
//   });
// }

// // Fetch the trending stocks data when the page loads
// fetchTrendingStocks();
