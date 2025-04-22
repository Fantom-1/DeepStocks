<?php
session_start();

// Redirect to login if not authenticated
if (!isset($_SESSION['user_id'])) {
    header("Location: login.html");
    exit();
}

// Get user initials for avatar
$initials = '';
if (isset($_SESSION['user_fullname'])) {
    $names = explode(' ', $_SESSION['user_fullname']);
    $initials = substr($names[0], 0, 1);
    if (count($names) > 1) {
        $initials .= substr(end($names), 0, 1);
    }
}
?>


<!DOCTYPE html>
<html lang="en">
<head>
<link rel="icon" type="image/png" sizes="32x32" href="./assets/logo.png">    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Deep Stocks | Advanced Stock Analytics</title>
<link rel="stylesheet" href="./assets/css/index.css">
<script type="module" src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<link rel="stylesheet" href="./assets/css/popup.css">
</head>

<body>
    <div class="toast" id="notification-toast">
        <div class="toast-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
            </svg>
        </div>
        <div class="toast-content">
            <div class="toast-title">Stock Alert</div>
            <div class="toast-message">AAPL has increased by 2.5% in the last hour.</div>
        </div>
        <button class="toast-close">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>
        </button>
    </div>

    <div class="container">
        <!-- Sidebar -->
        <aside class="sidebar">
            <div class="logo">
                <div class="logo-text">Deep Stocks</div>
            </div>

            <div class="nav-section">
                <div class="nav-title">Main</div>
                <ul class="nav-list">
                    <li class="nav-item">
                        <a href="#" class="nav-link ">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5ZM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5 5 5Z"/>
                            </svg>
                            Dashboard
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="#" class="nav-link" >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M0 0h1v15h15v1H0V0Zm14.817 3.113a.5.5 0 0 1 .07.704l-4.5 5.5a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61 4.15-5.073a.5.5 0 0 1 .704-.07Z"/>
                            </svg>
                            Analytics
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="#" class="nav-link">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M5 10.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
                                <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z"/>
                                <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z"/>
                            </svg>
                            Watchlists
                        </a>
                    </li>
                </ul>
            </div>

        

            <div class="nav-section">
                <div class="nav-title">Account</div>
                <ul class="nav-list">
                    <li class="nav-item">
                        <a href="#" class="nav-link" id="sidebarProfileLink">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                            </svg>
                            Profile
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="aboutus.php" class="nav-link">
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M16 11c1.66 0 3-1.34 3-3s-1.34-3-3-3 -3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 3-1.34 3-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5C14 14.17 10.33 13 8 13zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 2.08 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                        </svg>
                            About US
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="support.php" class="nav-link">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M8 1a5 5 0 0 0-5 5v1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a6 6 0 1 1 12 0v6a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1V6a5 5 0 0 0-5-5z"/>
                            </svg>
                            Support
                        </a>
                    </li>
                </ul>
            </div>
            <!-- market status -->
            <div class="market-status">
                <div class="market-status-header">
                    <div class="market-status-title">Market Status</div>
                    <div class="market-status-indicator">
                        <div class="indicator-dot"></div>
                        Open
                    </div>
                </div>
                <!-- <div class="market-status-time">04:30:45 PM EDT</div> -->
                <div class="market-status-list">
                    <div class="market-item">
                        <div class="market-name">S&P 500</div>
                        <div class="market-value">5,234.18</div>
                    </div>
                    <div class="market-item">
                        <div class="market-name">Nasdaq</div>
                        <div class="market-value">16,752.23</div>
                    </div>
                    <div class="market-item">
                        <div class="market-name">Dow Jones</div>
                        <div class="market-value">38,654.42</div>
                    </div>
                </div>
            </div>
        </aside>
<!-- The popup overlay -->
<div class="popup-overlay" id="analyticsPopup">
    <div class="popup-container">
        <div class="popup-header">
            <div class="popup-title">Stock Fundamentals Analysis</div>
            <button class="popup-close" id="closePopup">&times;</button>
        </div>
        <div class="popup-body">
            <div class="stock-display">
                Analyzing stock: <span class="stock-symbol" id="selectedStock">--</span>
            </div>
            
            <div id="noStockMessage" class="no-stock-message" style="display: none;">
                No stock selected. Please enter a stock symbol below.
            </div>
            
            <div id="manualStockInput" class="manual-input" style="display: none;">
                <input type="text" class="form-input" id="manualStock" placeholder="Enter stock symbol (e.g., AAPL)">
                <button class="btn" id="setStockBtn">Set Stock</button>
            </div>
            
            <button class="btn btn-block" id="analyzeBtn">Analyze Fundamentals</button>
            
            <div class="loading-spinner" id="loadingSpinner">
                <div class="spinner"></div>
                <p>Analyzing fundamentals...</p>
            </div>
            
            <div class="results-container" id="resultsContainer" style="display: none;">
                <div class="results-title">Analysis Results</div>
                <div id="analysisResults"></div>
            </div>
        </div>
    </div>
</div>

        <!-- Header -->
        <header class="header">
            <div class="search-container">
                <input type="text" id="stockSearchInput" class="search-input" placeholder="Search for stocks, ETFs...">
                <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                </svg>
              </div>
          
            
            
            <div class="header-actions">
                <button class="action-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"/>
                    </svg>
                </button>
                <button class="action-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"/>
                    </svg>
                </button>
                <div class="user-profile" id="userProfile">
                <a href="#" class="nav-link" id="sidebarProfileLink">
                    <div class="avatar"><?php echo strtoupper($initials); ?></div></a>
                    <div class="user-info">
                    <div class="user-name" id="username"><?php echo htmlspecialchars($_SESSION['user_fullname']); ?></div>
                    <div class="user-role" style="color: #D4AF37;">Premium Account</div>
                    </div>
                </div>
            </div>
        </header>

        <!-- Main Content Area -->
        <main class="main-content">
            <div class="main-header">
            <div class="welcome">Good <?php 
                    date_default_timezone_set('Asia/Kolkata');
                    $hour = date('H');
                    echo ($hour < 12) ? 'morning' : (($hour < 17) ? 'afternoon' : 'evening');
                ?>, 
                <b style="font-weight: bold; color:#3B82F6; font-size:larger;"><?php echo htmlspecialchars(explode(' ', $_SESSION['user_fullname'])[0]); ?></b></div>
                <div class="date-time" id="liveDateTime"></div>

                <script>
                function updateLiveDateTime() {
                    const now = new Date();
                    const options = {
                        weekday: 'long',    
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        timeZone: 'Asia/Kolkata',
                        timeZoneName: 'short'
                };
    
                    document.getElementById('liveDateTime').textContent = 
                    now.toLocaleString('en-US', options);
                }
                // Update immediately
                updateLiveDateTime();

                // Update every second (1000ms)
                setInterval(updateLiveDateTime, 1000);
            </script>
            </div>

            <div class="dashboard-grid">
           <!-- Market Overview Card -->
<div class="card market-overview-card">
    <div class="card-header">
        <div class="card-title">Market Overview</div>
        <div class="card-actions">
            <button class="card-button active">Markets</button>
        </div>
    </div>
    <div class="market-overview">
       
    </div>
</div>
<script src="./assets/js/overview.js"></script>

                <div class="card stock-chart-card" >
    <!-- Chart Controls -->
    <div class="chart-controls">
        <!-- Stock Selector -->
        <div class="stock-selector">
            <div class="stock-logo" id="stockLogo">A</div>
            <div class="stock-info">
                <div class="stock-name" id="stockName">Apple Inc.</div>
                <div class="stock-symbol" id="stockSymbol">
                    AAPL <span class="stock-badge">NASDAQ</span>
                </div>
            </div>
        </div>
        
        <!-- Search Input -->

        <!-- Time Filters -->
        <div class="time-filter">
            <button class="card-button" data-range="1min" data-period="1">1D</button>
            <button class="card-button" data-range="5min" data-period="5">1W</button>
            <button class="card-button active" data-range="1day" data-period="30">1M</button>
            <button class="card-button" data-range="1day" data-period="90">3M</button>
            <button class="card-button" data-range="1week" data-period="365">1Y</button>
            <button class="card-button" data-range="1month" data-period="1825">5Y</button>
        </div>
    </div>

    <script src="./assets/js/watchlist.js"></script>

                            <div class="card-actions" style=" margin-left:95%;"  >
                              <button class="card-button" onclick="submitStock()">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                                      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                  </svg>
                              </button>
                          </div>


    <!-- Chart Container -->
    <div class="chart-container">
        <canvas id="stockChart"></canvas>
        <div class="chart-overlay hidden" id="chartOverlay">
            <div class="chart-loading">
                <div class="spinner"></div>
                <div id="loadingMessage">Loading chart data...</div>
            </div>
        </div>
    </div>

    <!-- Stock Metrics -->
    <div class="stock-metrics">
        <div class="metric-item">
            <div class="metric-label">Open</div>
            <div class="metric-value" id="openValue">$173.28</div>
        </div>
        <div class="metric-item">
            <div class="metric-label">High</div>
            <div class="metric-value" id="highValue">$177.54</div>
        </div>
        <div class="metric-item">
            <div class="metric-label">Low</div>
            <div class="metric-value" id="lowValue">$172.30</div>
        </div>
        <div class="metric-item" id="Close">
            <div class="metric-label">Close</div>
            <div class="metric-value" id="closeValue">$175.88</div>
        </div>
        <div class="metric-item">
            <div class="metric-label">Volume</div>
            <div class="metric-value" id="volumeValue">89.2M</div>
        </div>
        <div class="metric-item">
            <div class="metric-label">Change</div>
            <div class="metric-value positive" id="changeValue">+1.23%</div>
        </div>
    </div>
</div>
                

              <!-- Watchlist Card -->
              <div class="card watchlist-card">
                  <div class="watchlist-header">
                      <div class="card-header">
                          <div class="card-title">Watchlists</div>
                      </div>
                  </div>
                  <div class="watchlist-content">
                      <ul class="stock-list">
                          <li class="stock-list-item active">
                              <div class="stock-list-info">
                                  <div class="mini-logo">
                                      <img src="/api/placeholder/32/32" alt="Apple Logo">
                                  </div>
                                  <div class="stock-list-details">
                                      <div class="stock-list-name">Apple Inc.</div>
                                      <div class="stock-list-symbol">AAPL</div>
                                  </div>
                              </div>
                              <div class="stock-list-price">
                                  <div class="stock-list-value">$177.42</div>
                                  <div class="stock-list-change change-positive">+2.36%</div>
                              </div>
                          </li>
                          <li class="stock-list-item">
                              <div class="stock-list-info">
                                  <div class="mini-logo">
                                      <img src="/api/placeholder/32/32" alt="Microsoft Logo">
                                  </div>
                                  <div class="stock-list-details">
                                      <div class="stock-list-name">Microsoft Corp.</div>
                                      <div class="stock-list-symbol">MSFT</div>
                                  </div>
                              </div>
                              <div class="stock-list-price">
                                  <div class="stock-list-value">$423.65</div>
                                  <div class="stock-list-change change-positive">+1.78%</div>
                              </div>
                          </li>
                          <li class="stock-list-item">
                              <div class="stock-list-info">
                                  <div class="mini-logo">
                                      <img src="/api/placeholder/32/32" alt="Google Logo">
                                  </div>
                                  <div class="stock-list-details">
                                      <div class="stock-list-name">Alphabet Inc.</div>
                                      <div class="stock-list-symbol">GOOGL</div>
                                  </div>
                              </div>
                              <div class="stock-list-price">
                                  <div class="stock-list-value">$165.87</div>
                                  <div class="stock-list-change change-positive">+0.92%</div>
                              </div>
                          </li>
                          <li class="stock-list-item">
                              <div class="stock-list-info">
                                  <div class="mini-logo">
                                      <img src="/api/placeholder/32/32" alt="Amazon Logo">
                                  </div>
                                  <div class="stock-list-details">
                                      <div class="stock-list-name">Amazon.com Inc.</div>
                                      <div class="stock-list-symbol">AMZN</div>
                                  </div>
                              </div>
                              <div class="stock-list-price">
                                  <div class="stock-list-value">$182.45</div>
                                  <div class="stock-list-change change-positive">+1.15%</div>
                              </div>
                          </li>
                          <li class="stock-list-item">
                              <div class="stock-list-info">
                                  <div class="mini-logo">
                                      <img src="/api/placeholder/32/32" alt="Tesla Logo">
                                  </div>
                                  <div class="stock-list-details">
                                      <div class="stock-list-name">Tesla Inc.</div>
                                      <div class="stock-list-symbol">TSLA</div>
                                  </div>
                              </div>
                              <div class="stock-list-price">
                                  <div class="stock-list-value">$172.63</div>
                                  <div class="stock-list-change change-negative">-2.14%</div>
                              </div>
                          </li>
                          <li class="stock-list-item">
                              <div class="stock-list-info">
                                  <div class="mini-logo">
                                      <img src="/api/placeholder/32/32" alt="NVIDIA Logo">
                                  </div>
                                  <div class="stock-list-details">
                                      <div class="stock-list-name">NVIDIA Corp.</div>
                                      <div class="stock-list-symbol">NVDA</div>
                                  </div>
                              </div>
                              <div class="stock-list-price">
                                  <div class="stock-list-value">$897.46</div>
                                  <div class="stock-list-change change-positive">+3.65%</div>
                              </div>
                          </li>
                          <li class="stock-list-item">
                              <div class="stock-list-info">
                                  <div class="mini-logo">
                                      <img src="/api/placeholder/32/32" alt="Meta Logo">
                                  </div>
                                  <div class="stock-list-details">
                                      <div class="stock-list-name">Meta Platforms Inc.</div>
                                      <div class="stock-list-symbol">META</div>
                                  </div>
                              </div>
                              <div class="stock-list-price">
                                  <div class="stock-list-value">$492.14</div>
                                  <div class="stock-list-change change-positive">+1.23%</div>
                              </div>
                          </li>
                      </ul>
                  </div>
              </div>

              <!-- Performance Card -->
              <div class="card performance-card">
                  <div class="performance-header">
                      <div class="card-header">
                          <div class="card-title">Portfolio Performance</div>
                          <div class="card-actions">
                              <button class="card-button active">1M</button>
                              <button class="card-button">3M</button>
                              <button class="card-button">1Y</button>
                          </div>
                      </div>
                  </div>
                  <div class="performance-chart">
                      <canvas id="performanceChart"></canvas>
                  </div>
              </div>

              <!-- Holdings Card -->
              <div class="card holdings-card">
                  <div class="card-header">
                      <div class="card-title">Trending Stocks</div>
                      <div class="card-actions">
                          <button class="card-button">
                             
                            
                          </button>
                      </div>
                  </div>
                  <table class="holdings-table">
                      <thead>
                          <tr>
                              <th>Asset</th>
                              
                            
                              <th>Current Price</th>
                              
                              <th>Return</th>
                              <th>Allocation</th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr>
                              <td>
                                  <div class="asset">
                                      <div class="asset-logo">
                                          <img src="/api/placeholder/30/30" alt="Apple Logo">
                                      </div>
                                      <div class="asset-info">
                                          <div class="asset-name">Apple Inc.</div>
                                          <div class="asset-symbol">AAPL</div>
                                      </div>
                                  </div>
                              </td>
                              <td>125</td>
                              <td>$152.34</td>
                              <td>$177.42</td>
                              <td>$22,177.50</td>
                              <td class="change-positive">+16.46%</td>
                              <td>
                                  <div class="progress-bar">
                                      <div class="progress" style="width: 32%;"></div>
                                  </div>
                              </td>
                          </tr>
                          <tr>
                              <td>
                                  <div class="asset">
                                      <div class="asset-logo">
                                          <img src="/api/placeholder/30/30" alt="Microsoft Logo">
                                      </div>
                                      <div class="asset-info">
                                          <div class="asset-name">Microsoft Corp.</div>
                                          <div class="asset-symbol">MSFT</div>
                                      </div>
                                  </div>
                              </td>
                              <td>42</td>
                              <td>$378.15</td>
                              <td>$423.65</td>
                              <td>$17,793.30</td>
                              <td class="change-positive">+12.03%</td>
                              <td>
                                  <div class="progress-bar">
                                      <div class="progress" style="width: 26%;"></div>
                                  </div>
                              </td>
                          </tr>
                          <tr>
                              <td>
                                  <div class="asset">
                                      <div class="asset-logo">
                                          <img src="/api/placeholder/30/30" alt="NVIDIA Logo">
                                      </div>
                                      <div class="asset-info">
                                          <div class="asset-name">NVIDIA Corp.</div>
                                          <div class="asset-symbol">NVDA</div>
                                      </div>
                                  </div>
                              </td>
                              <td>15</td>
                              <td>$425.78</td>
                              <td>$897.46</td>
                              <td>$13,461.90</td>
                              <td class="change-positive">+110.78%</td>
                              <td>
                                  <div class="progress-bar">
                                      <div class="progress" style="width: 19%;"></div>
                                  </div>
                              </td>
                          </tr>
                          <tr>
                              <td>
                                  <div class="asset">
                                      <div class="asset-logo">
                                          <img src="/api/placeholder/30/30" alt="Amazon Logo">
                                      </div>
                                      <div class="asset-info">
                                          <div class="asset-name">Amazon.com Inc.</div>
                                          <div class="asset-symbol">AMZN</div>
                                      </div>
                                  </div>
                              </td>
                              <td>68</td>
                              <td>$145.23</td>
                              <td>$182.45</td>
                              <td>$12,406.60</td>
                              <td class="change-positive">+25.63%</td>
                              <td>
                                  <div class="progress-bar">
                                      <div class="progress" style="width: 18%;"></div>
                                  </div>
                              </td>
                          </tr>
                          <tr>
                              <td>
                                  <div class="asset">
                                      <div class="asset-logo">
                                          <img src="/api/placeholder/30/30" alt="Google Logo">
                                      </div>
                                      <div class="asset-info">
                                          <div class="asset-name">Alphabet Inc.</div>
                                          <div class="asset-symbol">GOOGL</div>
                                      </div>
                                  </div>
                              </td>
                              <td>32</td>
                              <td>$142.80</td>
                              <td>$165.87</td>
                              <td>$5,307.84</td>
                              <td class="change-positive">+16.15%</td>
                              <td>
                                  <div class="progress-bar">
                                      <div class="progress" style="width: 8%;"></div>
                                  </div>
                              </td>
                          </tr>
                      </tbody>
                  </table>
              </div>
              <script src="./assets/js/trends.js"></script>

              <!-- News Card -->

              <div class="card news-card">
                <div class="news-header">
                    <div class="card-header">
                        <div class="card-title">Latest News</div>
                        <div class="card-actions">
                            <button class="card-button">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                                    <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="news-content">
                    <ul class="news-list" id="dynamic-news-list">
                        <!-- News items will be dynamically loaded here -->
                    </ul>
                </div>
            </div>
<script src="./assets/js/news.js"></script>
          </div>
      </main>
  </div>
  <script src="./assets/js/charts.js"></script>
  <script src="./assets/js/chartv.js"></script>
  <script src="./assets/js/index.js"></script>
  <script src="./assets/js/analysis.js"></script>
  <script src="./assets/js/profile.js"></script>
  <!-- Profile Popup -->
<div class="popup-overlay" id="profilePopup">
    <div class="popup-container" style =" height: 375px">
        <div class="popup-header">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                            </svg>
            <div class="popup-title">User Profile</div>
            <button class="popup-close" id="closeProfilePopup">&times;</button>
        </div>
        <div class="popup-body">
            <!-- <div class="profile-avatar-large">
                <?php echo strtoupper($initials); ?>
            </div> -->
            <div class="profile-info">

                <h3><?php echo htmlspecialchars($_SESSION['user_fullname']); ?></h3>
                <p class="profile-role" style ="color: #FFD700;">Premium Account</p><br>
                
                <div class="profile-details">
                    <div class="detail-item">
                        <span class="detail-label">Member Since: </span>
                        <span class="detail-value"><?php echo date('F Y', strtotime('-1 year')); ?></span>
                    </div><br>
                    <div class="detail-item">
                        <span class="detail-label">Portfolio Value: </span>
                        <span class="detail-value">$20,214.14</span>
                    </div><br>
                    <div class="detail-item">
                        <span class="detail-label">Account Status: </span>
                        <span class="detail-value status-active" style ="color:rgb(30, 201, 44);">Active</span>
                    </div><br>
                </div>
                
                <div class="profile-actions">
                    <!-- <button class="btn btn-outline">Edit Profile</button> -->
                    <button class="btn btn-primary">Upgrade Plan</button>
                    <button class="btn btn-primary" style="margin-left: 10%;" onclick="window.location.href='logout.php'">Log Out</button>
                </div>
            </div>
        </div>
    </div>
</div>
</body>
</html>