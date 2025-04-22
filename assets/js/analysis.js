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
        
        async function analyzeStock() {
            const stockSymbol = document.getElementById('selectedStock').textContent;
            
            if (stockSymbol === "--") {
                document.getElementById('noStockMessage').style.display = 'block';
                document.getElementById('manualStockInput').style.display = 'flex';
                return;
            }
            
            // Show loading spinner
            document.getElementById('loadingSpinner').style.display = 'block';
            document.getElementById('resultsContainer').style.display = 'none';
            
            try {
                const analysisData = await fetchStockAnalysis(API_KEY, stockSymbol);
                
                // Hide spinner and show results
                document.getElementById('loadingSpinner').style.display = 'none';
                document.getElementById('resultsContainer').style.display = 'block';
                
                // Display the API results
                document.getElementById('analysisResults').innerHTML = formatResults(analysisData);
            } catch (error) {
                document.getElementById('loadingSpinner').style.display = 'none';
                document.getElementById('resultsContainer').style.display = 'block';
                document.getElementById('analysisResults').innerHTML = `<div style="color: #f87171;">Error: ${error.message}</div>`;
            }
        }
        let Comments = ""
        async function fetchStockAnalysis(apiKey, stockSymbol) {
            try {
                // Make the API call to Google AI Studio
                const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-goog-api-key': apiKey
                    },
                    body: JSON.stringify({
                        contents: [{
                            parts: [{
                                text: `Analyze the fundamental metrics and outlook for ${stockSymbol} stock. strictly Include only and current data numbers: 
                                1. Key financial ratios (P/E, EPS, ROE, debt/equity)
                                2. Recent performance and earnings
                                3. Growth potential and market position
                                4. Risk factors
                                5. Overall investment outlook
                                
                                Format as HTML without any ${Comments} without any comments and structure help with appropriate headings and structure. `
                            }]
                        }],
                        generationConfig: {
                            temperature: 0.2,
                            topK: 40,
                            topP: 0.95,
                            maxOutputTokens: 1024
                        }
                    })
                });
                
                if (!response.ok) {
                    throw new Error(`API request failed with status ${response.status}`);
                }
                
                const data = await response.json();
                
                // Extract the text content from the response
                if (data.candidates && 
                    data.candidates[0] && 
                    data.candidates[0].content && 
                    data.candidates[0].content.parts && 
                    data.candidates[0].content.parts[0] && 
                    data.candidates[0].content.parts[0].text) {
                    return data.candidates[0].content.parts[0].text;
                } else {
                    throw new Error('Unexpected API response format');
                }
                
            } catch (error) {
                console.error("Error fetching stock analysis:", error);
                throw new Error("Failed to get analysis from AI service. Please check API configuration and try again.");
            }
        }
        
        function formatResults(resultsText) {
            // The API returns text that may already be in HTML format
            // If it's not in HTML format, we can do basic formatting here
            if (resultsText.includes('<h') || resultsText.includes('<p>')) {
                // Already has HTML formatting
                return resultsText;
            } else {
                // Basic text formatting
                const lines = resultsText.split('\n');
                let html = '';
                
                // Format headings and paragraphs
                lines.forEach(line => {
                    line = line.trim();
                    if (!line) return;
                    
                    if (line.startsWith('#')) {
                        // Handle markdown-style headings
                        const level = line.match(/^#+/)[0].length;
                        const title = line.replace(/^#+\s*/, '');
                        html += `<h${Math.min(level, 6)}>${title}</h${Math.min(level, 6)}>`;
                    } else if (line.match(/^\d+\.\s/)) {
                        // Handle numbered list items
                        const content = line.replace(/^\d+\.\s/, '');
                        html += `<p><strong>${line.match(/^\d+/)[0]}.</strong> ${content}</p>`;
                    } else if (line.match(/^[A-Za-z\s]+:/)) {
                        // Handle label: value format
                        const [label, ...valueParts] = line.split(':');
                        const value = valueParts.join(':');
                        html += `<p><strong>${label}:</strong> ${value}</p>`;
                    } else {
                        // Regular paragraph
                        html += `<p>${line}</p>`;
                    }
                });
                
                return html;
            }
        }