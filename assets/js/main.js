document.addEventListener('DOMContentLoaded', function() {
    // Initialize all animations
    initMarketAnimations();
    initParticleSystem();
    initDigitalRain();
    initCandlestickCharts();
    initFloatingIndicators();
    
    // Password strength indicator
    const passwordInputs = document.querySelectorAll('input[type="password"]');
    passwordInputs.forEach(input => {
        input.addEventListener('input', function() {
            if (this.id === 'password' || this.id === 'new_password') {
                updatePasswordStrength(this.value);
            }
            
            if (this.id === 'confirm_password' || this.id === 'confirm_new_password') {
                const originalField = this.id === 'confirm_password' 
                    ? document.getElementById('password')
                    : document.getElementById('new_password');
                
                if (this.value !== originalField.value) {
                    this.setCustomValidity("Passwords don't match");
                } else {
                    this.setCustomValidity('');
                }
            }
        });
    });
    
    // Form validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!this.checkValidity()) {
                e.preventDefault();
                e.stopPropagation();
            }
            this.classList.add('was-validated');
        });
    });
});

function initMarketAnimations() {
    // Create floating market elements
    const floatingContainer = document.querySelector('.floating-elements');
    if (floatingContainer) {
        const symbols = ['📈', '💹', '📊', '💰', '🔍', '💎', '🚀', '🧠', '⚡', '🏆'];
        
        for (let i = 0; i < 15; i++) {
            const element = document.createElement('div');
            element.className = 'market-indicator';
            element.textContent = symbols[Math.floor(Math.random() * symbols.length)];
            
            // Random position
            const left = Math.random() * 90 + 5;
            const top = Math.random() * 90 + 5;
            element.style.left = `${left}%`;
            element.style.top = `${top}%`;
            
            // Random animation
            const duration = Math.random() * 6 + 4;
            const delay = Math.random() * 5;
            element.style.animation = `float ${duration}s ease-in-out ${delay}s infinite, colorShift ${duration * 2}s linear ${delay}s infinite`;
            
            floatingContainer.appendChild(element);
        }
    }
    
    // Create neon sign for login page
    const loginAnimation = document.querySelector('.login-animation');
    if (loginAnimation) {
        const neon = document.createElement('div');
        neon.className = 'neon-sign';
        neon.textContent = 'DEEP STOCKS';
        loginAnimation.appendChild(neon);
    }
}

function initParticleSystem() {
    const container = document.querySelector('.market-particles');
    if (!container) return;
    
    // Create particles
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random properties
        const size = Math.random() * 5 + 2;
        const left = Math.random() * 100;
        const duration = Math.random() * 10 + 5;
        const delay = Math.random() * 5;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${left}%`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        
        // Random color
        const colors = ['rgba(41, 98, 255, 0.7)', 'rgba(0, 200, 83, 0.7)', 'rgba(255, 171, 0, 0.7)', 'rgba(255, 255, 255, 0.7)'];
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        container.appendChild(particle);
    }
}

function initDigitalRain() {
    const container = document.querySelector('.digital-rain');
    if (!container) return;
    
    // Create digital rain columns
    const columns = Math.floor(window.innerWidth / 20);
    const characters = '01';
    
    for (let i = 0; i < columns; i++) {
        const column = document.createElement('div');
        column.className = 'digital-column';
        
        // Random properties
        const left = (i / columns) * 100;
        const duration = Math.random() * 10 + 5;
        const delay = Math.random() * 5;
        
        column.style.left = `${left}%`;
        column.style.animationDuration = `${duration}s`;
        column.style.animationDelay = `${delay}s`;
        
        // Create characters
        const charCount = 30;
        let content = '';
        for (let j = 0; j < charCount; j++) {
            content += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        column.textContent = content;
        
        container.appendChild(column);
    }
}

function initCandlestickCharts() {
    const container = document.querySelector('.candlestick-container');
    if (!container) return;
    
    // Clear any existing candlesticks
    container.innerHTML = '';
    
    // Create candlesticks
    const candleCount = 20;
    for (let i = 0; i < candleCount; i++) {
        const candle = document.createElement('div');
        candle.className = 'candlestick';
        
        // Random properties
        const height = Math.random() * 80 + 10;
        const wickHeight = Math.random() * 30 + 5;
        const delay = i * 0.1;
        const isGreen = Math.random() > 0.3;
        
        candle.style.setProperty('--final-height', `${height}%`);
        candle.style.setProperty('--wick-height', `${wickHeight}px`);
        candle.style.setProperty('--delay', delay);
        
        if (isGreen) {
            candle.style.background = 'linear-gradient(to top, #00c853, #a5d6a7)';
        } else {
            candle.style.background = 'linear-gradient(to top, #ff5252, #ff8a80)';
        }
        
        container.appendChild(candle);
    }
}

function initFloatingIndicators() {
    const indicatorsContainer = document.querySelector('.market-indicators');
    if (!indicatorsContainer) return;
    
    const indicators = [
        { label: 'S&P 500', value: '+0.75%', direction: 'up' },
        { label: 'NASDAQ', value: '-0.32%', direction: 'down' },
        { label: 'DOW', value: '+1.02%', direction: 'up' },
        { label: 'RUSSELL', value: '+0.45%', direction: 'up' },
        { label: 'VIX', value: '-2.10%', direction: 'down' }
    ];
    
    indicatorsContainer.innerHTML = '';
    
    indicators.forEach(indicator => {
        const element = document.createElement('div');
        element.className = `indicator ${indicator.direction}`;
        
        element.innerHTML = `
            <span class="label">${indicator.label}</span>
            <span class="value">${indicator.value}</span>
            <span class="trend">${indicator.direction === 'up' ? '↑' : '↓'}</span>
        `;
        
        // Add animation
        element.style.animation = `pulse ${Math.random() * 3 + 2}s ease infinite`;
        
        indicatorsContainer.appendChild(element);
    });
}

function updatePasswordStrength(password) {
    const strengthBars = document.querySelectorAll('.strength-bar');
    const strengthText = document.querySelector('.strength-text');
    
    if (!strengthBars.length || !strengthText) return;
    
    // Reset
    strengthBars.forEach(bar => {
        bar.style.width = '0';
        bar.style.backgroundColor = '';
    });
    
    // Calculate strength
    let strength = 0;
    if (password.length > 0) strength = 1;
    if (password.length >= 8) strength = 2;
    if (password.length >= 12 && /[A-Z]/.test(password) && /[0-9]/.test(password)) strength = 3;
    if (password.length >= 16 && /[A-Z]/.test(password) && /[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password)) strength = 4;
    
    // Animate strength bars
    strengthBars.forEach((bar, index) => {
        if (index < strength) {
            setTimeout(() => {
                bar.style.width = '100%';
                
                if (strength <= 2) {
                    bar.style.backgroundColor = 'var(--danger-color)';
                } else if (strength === 3) {
                    bar.style.backgroundColor = 'var(--warning-color)';
                } else {
                    bar.style.backgroundColor = 'var(--success-color)';
                }
            }, index * 200);
        }
    });
    
    // Update text
    const messages = ['Very Weak', 'Weak', 'Moderate', 'Strong', 'Very Strong'];
    strengthText.textContent = messages[strength - 1] || '';
    strengthText.style.color = strength <= 2 ? 'var(--danger-color)' : 
                             strength === 3 ? 'var(--warning-color)' : 
                             'var(--success-color)';
    
    // Add pulse animation when strength changes
    strengthText.style.animation = 'none';
    void strengthText.offsetWidth; // Trigger reflow
    strengthText.style.animation = 'pulse 0.5s ease';
}
