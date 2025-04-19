document.addEventListener('DOMContentLoaded', function() {
    // Chart.js initialization
    const stockChartCtx = document.getElementById('stockChart').getContext('2d');
    const performanceChartCtx = document.getElementById('performanceChart').getContext('2d');
    
    // Chart.js configuration
    const stockChart = new Chart(stockChartCtx, {
        type: 'line',
        data: {
            labels: Array.from({length: 30}, (_, i) => i + 1),
            datasets: [{
                label: 'AAPL Stock Price',
                data: [
                    170.12, 171.45, 169.87, 172.34, 173.65, 174.28, 172.95, 173.42, 175.63, 174.89,
                    173.76, 172.54, 171.98, 173.21, 174.67, 175.32, 176.54, 175.87, 174.32, 173.98,
                    175.21, 176.43, 175.76, 174.32, 173.87, 175.32, 176.85, 177.32, 176.87, 177.42
                ],
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                borderColor: '#3B82F6',
                borderWidth: 2,
                pointBackgroundColor: 'transparent',
                pointBorderColor: 'transparent',
                pointHoverBackgroundColor: '#3B82F6',
                pointHoverBorderColor: '#3B82F6',
                pointHoverRadius: 5,
                tension: 0.3,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    grid: {
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        color: '#94A3B8',
                        font: {
                            size: 10
                        },
                        maxRotation: 0
                    }
                },
                y: {
                    grid: {
                        color: 'rgba(71, 85, 105, 0.15)',
                        drawBorder: false
                    },
                    ticks: {
                        color: '#94A3B8',
                        font: {
                            size: 10
                        },
                        callback: function(value) {
                            return '$' + value;
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: '#1E293B',
                    titleColor: '#F8FAFC',
                    bodyColor: '#E2E8F0',
                    titleFont: {
                        size: 12
                    },
                    bodyFont: {
                        size: 12
                    },
                    padding: 10,
                    cornerRadius: 4,
                    displayColors: false,
                    callbacks: {
                        title: function(tooltipItems) {
                            return 'Day ' + tooltipItems[0].label;
                        },
                        label: function(context) {
                            return '$' + context.raw;
                        }
                    }
                }
            }
        }
    });

    const performanceChart = new Chart(performanceChartCtx, {
        type: 'line',
        data: {
            labels: Array.from({length: 30}, (_, i) => i + 1),
            datasets: [{
                label: 'Portfolio Value',
                data: [
                    68520, 68750, 68200, 69150, 69800, 70200, 69750, 70100, 71500, 71200,
                    70400, 69800, 69500, 70300, 71200, 71800, 72500, 72100, 71400, 71000,
                    71800, 72900, 72400, 71500, 71200, 72300, 73800, 74500, 74100, 74800
                ],
                backgroundColor: 'rgba(34, 197, 94, 0.1)',
                borderColor: '#22C55E',
                borderWidth: 2,
                pointBackgroundColor: 'transparent',
                pointBorderColor: 'transparent',
                pointHoverBackgroundColor: '#22C55E',
                pointHoverBorderColor: '#22C55E',
                pointHoverRadius: 5,
                tension: 0.3,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    display: false
                },
                y: {
                    grid: {
                        color: 'rgba(71, 85, 105, 0.15)',
                        drawBorder: false
                    },
                    ticks: {
                        color: '#94A3B8',
                        font: {
                            size: 10
                        },
                        callback: function(value) {
                            return '$' + value.toLocaleString();
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: '#1E293B',
                    titleColor: '#F8FAFC',
                    bodyColor: '#E2E8F0',
                    titleFont: {
                        size: 12
                    },
                    bodyFont: {
                        size: 12
                    },
                    padding: 10,
                    cornerRadius: 4,
                    displayColors: false,
                    callbacks: {
                        title: function(tooltipItems) {
                            return 'Day ' + tooltipItems[0].label;
                        },
                        label: function(context) {
                            return '$' + context.raw.toLocaleString();
                        }
                    }
                }
            }
        }
    });

    // Chart loading simulation
    const chartOverlay = document.getElementById('chartOverlay');
    chartOverlay.classList.add('visible');
    
    setTimeout(() => {
        chartOverlay.classList.remove('visible');
    }, 1500);

    // Dropdown functionality
    const stockDropdownBtn = document.getElementById('stockDropdownBtn');
    const stockDropdown = document.getElementById('stockDropdown');

    stockDropdownBtn.addEventListener('click', function() {
        stockDropdown.classList.toggle('show');
    });

    // Close the dropdown if clicked outside
    window.addEventListener('click', function(event) {
        if (!event.target.matches('.dropdown-btn') && !event.target.closest('.dropdown-btn')) {
            if (stockDropdown.classList.contains('show')) {
                stockDropdown.classList.remove('show');
            }
        }
    });

    // Dropdown item selection
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    dropdownItems.forEach(item => {
        item.addEventListener('click', function() {
            // Get selected stock info
            const symbol = this.querySelector('.dropdown-item-symbol').textContent;
            const name = this.querySelector('.dropdown-item-name').textContent;
            const logo = this.querySelector('.mini-logo img').getAttribute('src');
            
            // Update the stock selector display
            const stockLogo = document.querySelector('.stock-selector .stock-logo img');
            const stockName = document.querySelector('.stock-selector .stock-name');
            const stockSymbol = document.querySelector('.stock-selector .stock-symbol');
            
            stockLogo.setAttribute('src', logo);
            stockName.textContent = name;
            stockSymbol.innerHTML = symbol + '<span class="stock-badge">NASDAQ</span>';
            
            // Update chart with new stock data (simulated)
            updateStockChart(symbol);
            
            // Close dropdown
            stockDropdown.classList.remove('show');
        });
    });
    
    // Function to update stock chart with new data (simulated)
    function updateStockChart(symbol) {
        // Add loading effect
        chartOverlay.classList.add('visible');
        
        // Simulate data fetch
        setTimeout(() => {
            // Generate random stock data based on symbol
            const mockData = generateMockData(symbol);
            
            // Update chart data
            stockChart.data.datasets[0].label = symbol + ' Stock Price';
            stockChart.data.datasets[0].data = mockData;
            stockChart.update();
            
            // Update stock metrics
            updateStockMetrics(symbol);
            
            // Remove loading
            chartOverlay.classList.remove('visible');
        }, 800);
    }
    
    // Function to generate mock data for different stocks
    function generateMockData(symbol) {
        const baseValue = {
            'AAPL': 175,
            'MSFT': 420,
            'GOOGL': 165,
            'AMZN': 180,
            'TSLA': 170
        }[symbol] || 100;
        
        // Generate 30 days of slightly varying data
        return Array.from({length: 30}, () => {
            return baseValue + (Math.random() * 10 - 5);
        });
    }
    
    // Function to update stock metrics
    function updateStockMetrics(symbol) {
        const metrics = {
            'AAPL': {
                open: '$173.28',
                high: '$177.54',
                low: '$172.95',
                volume: '68.4M',
                marketCap: '$2.78T',
                pe: '29.45'
            },
            'MSFT': {
                open: '$421.32',
                high: '$425.84',
                low: '$418.75',
                volume: '24.2M',
                marketCap: '$3.15T',
                pe: '35.78'
            },
            'GOOGL': {
                open: '$165.12',
                high: '$167.25',
                low: '$164.45',
                volume: '32.8M',
                marketCap: '$2.12T',
                pe: '25.34'
            },
            'AMZN': {
                open: '$181.25',
                high: '$183.64',
                low: '$180.32',
                volume: '45.1M',
                marketCap: '$1.92T',
                pe: '42.15'
            },
            'TSLA': {
                open: '$173.45',
                high: '$175.32',
                low: '$168.87',
                volume: '78.5M',
                marketCap: '$548B',
                pe: '58.32'
            }
        }[symbol] || {
            open: '$100.00',
            high: '$105.00',
            low: '$98.00',
            volume: '10M',
            marketCap: '$500B',
            pe: '20.00'
        };
        
        // Update metric values in the DOM
        const metricItems = document.querySelectorAll('.metric-item');
        metricItems[0].querySelector('.metric-value').textContent = metrics.open;
        metricItems[1].querySelector('.metric-value').textContent = metrics.high;
        metricItems[2].querySelector('.metric-value').textContent = metrics.low;
        metricItems[3].querySelector('.metric-value').textContent = metrics.volume;
        metricItems[4].querySelector('.metric-value').textContent = metrics.marketCap;
        metricItems[5].querySelector('.metric-value').textContent = metrics.pe;
    }
    
    // Tab navigation functionality for watchlist
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // You could load different watchlist data here
            // For now, we'll just simulate a loading effect
            const stockList = document.querySelector('.stock-list');
            stockList.style.opacity = '0.5';
            
            setTimeout(() => {
                stockList.style.opacity = '1';
            }, 500);
        });
    });
    
    // Watchlist stock item selection
    const stockListItems = document.querySelectorAll('.stock-list-item');
    stockListItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            stockListItems.forEach(i => i.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Get stock symbol
            const symbol = this.querySelector('.stock-list-symbol').textContent;
            
            // Update main chart
            const stockName = this.querySelector('.stock-list-name').textContent;
            const stockLogo = this.querySelector('.mini-logo img').getAttribute('src');
            
            // Update the stock selector display
            const mainStockLogo = document.querySelector('.stock-selector .stock-logo img');
            const mainStockName = document.querySelector('.stock-selector .stock-name');
            const mainStockSymbol = document.querySelector('.stock-selector .stock-symbol');
            
            mainStockLogo.setAttribute('src', stockLogo);
            mainStockName.textContent = stockName;
            mainStockSymbol.innerHTML = symbol + '<span class="stock-badge">NASDAQ</span>';
            
            // Update chart with new stock data
            updateStockChart(symbol);
        });
    });
    
    // Time filter functionality for stock chart
    const timeFilters = document.querySelectorAll('.time-filter .card-button');
    timeFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            // Remove active class from all filters
            timeFilters.forEach(f => f.classList.remove('active'));
            
            // Add active class to clicked filter
            this.classList.add('active');
            
            // Update chart data based on time filter
            const period = this.textContent;
            updateChartPeriod(period);
        });
    });
    
    // Function to update chart data based on selected time period
    function updateChartPeriod(period) {
        // Add loading effect
        chartOverlay.classList.add('visible');
        
        setTimeout(() => {
            // Generate data points based on selected period
            let dataPoints = 0;
            let label = '';
            
            switch(period) {
                case '1D':
                    dataPoints = 24;
                    label = 'Hourly';
                    break;
                case '1W':
                    dataPoints = 7;
                    label = 'Daily';
                    break;
                case '1M':
                    dataPoints = 30;
                    label = 'Daily';
                    break;
                case '3M':
                    dataPoints = 90;
                    label = 'Daily';
                    break;
                case '1Y':
                    dataPoints = 12;
                    label = 'Monthly';
                    break;
                case '5Y':
                    dataPoints = 60;
                    label = 'Monthly';
                    break;
                default:
                    dataPoints = 30;
                    label = 'Daily';
            }
            
            // Generate new labels
            stockChart.data.labels = Array.from({length: dataPoints}, (_, i) => i + 1);
            
            // Generate new data
            const currentSymbol = document.querySelector('.stock-selector .stock-symbol').textContent.split('<')[0].trim();
            stockChart.data.datasets[0].data = generateMockData(currentSymbol);
            
            // Update chart
            stockChart.update();
            
            // Remove loading
            chartOverlay.classList.remove('visible');
        }, 800);
    }
    
    // Performance card time filter functionality
    const performanceFilters = document.querySelectorAll('.performance-card .card-button');
    performanceFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            // Remove active class from all filters
            performanceFilters.forEach(f => f.classList.remove('active'));
            
            // Add active class to clicked filter
            this.classList.add('active');
            
            // Update performance chart based on selected period
            updatePerformanceChart(this.textContent);
        });
    });
    
    function updatePerformanceChart(period) {
        // Generate different data based on the selected period
        let portfolioData = [];
        
        switch(period) {
            case '1M':
                portfolioData = [
                    68520, 68750, 68200, 69150, 69800, 70200, 69750, 70100, 71500, 71200,
                    70400, 69800, 69500, 70300, 71200, 71800, 72500, 72100, 71400, 71000,
                    71800, 72900, 72400, 71500, 71200, 72300, 73800, 74500, 74100, 74800
                ];
                break;
            case '3M':
                portfolioData = [
                    65400, 66200, 67500, 68300, 69100, 68700, 69400, 70200, 71100, 70800,
                    71500, 72300, 71900, 72400, 73200, 72800, 73500, 74200, 73800, 74500
                ];
                break;
            case '1Y':
                portfolioData = [
                    58200, 59500, 61200, 62800, 64500, 63900, 65200, 66800, 68500, 69700,
                    71200, 74800
                ];
                break;
        }
        
        // Update chart data
        performanceChart.data.datasets[0].data = portfolioData;
        performanceChart.data.labels = Array.from({length: portfolioData.length}, (_, i) => i + 1);
        performanceChart.update();
    }
    
    // Toast notification functionality
    const notificationToast = document.getElementById('notification-toast');
    const toastCloseButton = document.querySelector('.toast-close');
    
    // Show toast notification after a short delay
    setTimeout(() => {
        notificationToast.classList.add('show');
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            notificationToast.classList.remove('show');
        }, 5000);
    }, 3000);
    
    // Close toast when button is clicked
    toastCloseButton.addEventListener('click', function() {
        notificationToast.classList.remove('show');
    });
});