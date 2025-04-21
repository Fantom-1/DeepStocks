const API_KEY = "AIzaSyDudD9Y3DOa9PBgyR8imuekqzteBQti12E";
        
        document.addEventListener('DOMContentLoaded', function() {
            // Find the Analytics link
            const analyticsLinks = document.querySelectorAll('.nav-link');
            analyticsLinks.forEach(link => {
                if (link.textContent.trim() === 'Analytics') {
                    link.classList.add('analytics-trigger');
                    link.addEventListener('click', function(e) {
                        e.preventDefault();
                        
                        // Get stock value from search input
                        const searchInput = document.getElementById('stockSearchInput');
                        let stockSymbol = '';
                        
                        if (searchInput && searchInput.value.trim()) {
                            stockSymbol = parseStockSymbol(searchInput.value);
                            document.getElementById('selectedStock').textContent = stockSymbol;
                            document.getElementById('noStockMessage').style.display = 'none';
                            document.getElementById('manualStockInput').style.display = 'none';
                        } else {
                            document.getElementById('selectedStock').textContent = "--";
                            document.getElementById('noStockMessage').style.display = 'block';
                            document.getElementById('manualStockInput').style.display = 'flex';
                        }
                        
                        document.getElementById('analyticsPopup').style.display = 'flex';
                    });
                }
            });
            
            // Close popup when clicking the close button
            document.getElementById('closePopup').addEventListener('click', function() {
                document.getElementById('analyticsPopup').style.display = 'none';
            });
            
            // Close popup when clicking outside the popup
            document.getElementById('analyticsPopup').addEventListener('click', function(e) {
                if (e.target === this) {
                    this.style.display = 'none';
                }
            });
            
            // Handle manual stock input
            document.getElementById('setStockBtn').addEventListener('click', function() {
                const manualStock = document.getElementById('manualStock').value.trim().toUpperCase();
                if (manualStock) {
                    document.getElementById('selectedStock').textContent = manualStock;
                    document.getElementById('noStockMessage').style.display = 'none';
                    document.getElementById('manualStockInput').style.display = 'none';
                }
            });
            
            // Also set the stock on Enter key in the manual input
            document.getElementById('manualStock').addEventListener('keydown', function(e) {
                if (e.key === 'Enter') {
                    const manualStock = this.value.trim().toUpperCase();
                    if (manualStock) {
                        document.getElementById('selectedStock').textContent = manualStock;
                        document.getElementById('noStockMessage').style.display = 'none';
                        document.getElementById('manualStockInput').style.display = 'none';
                    }
                }
            });
            
            // Handle analyze button click
            document.getElementById('analyzeBtn').addEventListener('click', analyzeStock);
        });
        
        // Extract stock symbol from search input
        function parseStockSymbol(input) {
            // Basic extraction - assumes format like "AAPL - Apple Inc." or just "AAPL"
            const matches = input.match(/^([A-Z]+)/);
            if (matches && matches[1]) {
                return matches[1];
            }
            return input.trim().split(' ')[0].toUpperCase(); // Fallback to first word
        }
        
        function analyzeStock() {
            const stockSymbol = document.getElementById('selectedStock').textContent;
            const analysisType = document.getElementById('analysisType').value;
            
            if (stockSymbol === "--") {
                document.getElementById('noStockMessage').style.display = 'block';
                document.getElementById('manualStockInput').style.display = 'flex';
                return;
            }
            
            // Show loading spinner
            document.getElementById('loadingSpinner').style.display = 'block';
            document.getElementById('resultsContainer').style.display = 'none';
            
            // Using the API key defined at the top of the script
            fetchStockAnalysis(API_KEY, stockSymbol, analysisType)
                .then(result => {
                    // Hide spinner and show results
                    document.getElementById('loadingSpinner').style.display = 'none';
                    document.getElementById('resultsContainer').style.display = 'block';
                    
                    // Display the results
                    document.getElementById('analysisResults').innerHTML = formatResults(result);
                })
                .catch(error => {
                    document.getElementById('loadingSpinner').style.display = 'none';
                    document.getElementById('resultsContainer').style.display = 'block';
                    document.getElementById('analysisResults').innerHTML = `<div style="color: #f87171;">Error: ${error.message}</div>`;
                });
        }
        
        async function fetchStockAnalysis(apiKey, stockSymbol, analysisType) {
            try {
                // This is where you would make the actual API call to Google AI Studio
                // For demonstration purposes, we'll simulate a response
                
                // In a real implementation, you would use fetch() to call the API:
                /*
                const response = await fetch('https://ai.googleapis.com/v1/projects/your-project/locations/us-central1/publishers/google/models/gemini-pro:generateContent', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${apiKey}`
                    },
                    body: JSON.stringify({
                        contents: [{
                            parts: [{
                                text: `Analyze the fundamentals of ${stockSymbol} with focus on ${analysisType.replace('_', ' ')}`
                            }]
                        }]
                    })
                });
                
                if (!response.ok) {
                    throw new Error(`API request failed with status ${response.status}`);
                }
                
                const data = await response.json();
                return data.candidates[0].content.parts[0].text;
                */
                
                // Simulated response for demo purposes
                await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API delay
                
                // Different simulated responses based on analysis type
                const responses = {
                    financial_ratios: `<h3>${stockSymbol} Financial Ratios</h3>
                        <p><strong>P/E Ratio:</strong> 24.5</p>
                        <p><strong>EPS:</strong> $3.67</p>
                        <p><strong>ROE:</strong> 18.2%</p>
                        <p><strong>Debt-to-Equity:</strong> 1.3</p>
                        <p><strong>Quick Ratio:</strong> 1.45</p>`,
                    
                    earnings_forecast: `<h3>${stockSymbol} Earnings Forecast</h3>
                        <p><strong>Next Quarter:</strong> Expected EPS $0.92 (7% YoY growth)</p>
                        <p><strong>Annual Forecast:</strong> $3.85 per share</p>
                        <p><strong>Revenue Growth:</strong> Projected 12% increase</p>
                        <p><strong>Analyst Consensus:</strong> Moderately bullish</p>`,
                    
                    growth_potential: `<h3>${stockSymbol} Growth Potential</h3>
                        <p><strong>Market Expansion:</strong> Strong positioning in emerging markets</p>
                        <p><strong>Innovation Pipeline:</strong> 3 major product launches expected</p>
                        <p><strong>Projected 5-Year Growth:</strong> 15.7% annually</p>
                        <p><strong>Competitive Position:</strong> Market leader with increasing share</p>`,
                    
                    risk_assessment: `<h3>${stockSymbol} Risk Assessment</h3>
                        <p><strong>Volatility (Beta):</strong> 1.32</p>
                        <p><strong>Sector Risk:</strong> Moderate</p>
                        <p><strong>Regulatory Concerns:</strong> Minimal near-term impact</p>
                        <p><strong>Liquidity Risk:</strong> Low, strong cash position</p>`,
                    
                    comprehensive: `<h3>${stockSymbol} Comprehensive Analysis</h3>
                        <p><strong>Financial Health:</strong> Strong balance sheet with $45B cash reserves</p>
                        <p><strong>Growth Trajectory:</strong> 12-15% annual growth projected</p>
                        <p><strong>Competitive Position:</strong> Industry leader with 28% market share</p>
                        <p><strong>Key Metrics:</strong></p>
                        <ul>
                            <li>P/E: 24.5</li>
                            <li>EPS Growth: 16.8%</li>
                            <li>Dividend Yield: 1.2%</li>
                            <li>Debt-to-EBITDA: 1.3</li>
                        </ul>
                        <p><strong>Recommendation:</strong> Strong buy potential with 12-month price target of $185</p>`
                };
                
                return responses[analysisType] || "Analysis not available for the selected type.";
                
            } catch (error) {
                console.error("Error fetching stock analysis:", error);
                throw new Error("Failed to connect to AI service. Please check API configuration and try again.");
            }
        }
        
        function formatResults(resultsHtml) {
            // The results are already formatted in HTML from our simulated response
            return resultsHtml;
        }