<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Support | Market Insights Pro</title>
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="stylesheet" href="assets/css/animations.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <style>
        .success-message {
            color: rgb(37, 136, 45);
            margin-top: 3px;
            display: none;
            font-size: 14px;
            text-align: center;
        }
        .error-message {
            color: rgb(118, 21, 21);
            margin-top: 3px;
            display: none;
            font-size: 14px;
            text-align: center;
        }
        .input-with-icon {
            position: relative;
        }
        .input-with-icon1 {
            position: relative;
        }
        .input-with-icon i, .input-with-icon svg {
            position: absolute;
            left: 10px;
            top: 50%;
            transform: translateY(-50%);
            color: #667eea;
        }
        .input-with-icon1 i, .input-with-icon1 svg {
            position: absolute;
            left: 10px;
            top: 18px;
            color: #667eea;
        }
        .input-with-icon input {
            padding-left: 35px;
        }
        .input-with-icon1 textarea {
            padding-left: 35px;
        }
        textarea {
            width: 100%;
            padding: 10px;
            border: 1px solid #667eea;
            resize: vertical;
            min-height: 50px;
            border-radius: 4px;
        }
        .btn.auth-btn {
            cursor: pointer;
        }
        .btn.auth-btn:disabled {
            opacity: 0.7;
            cursor: not-allowed;
        }
    </style>
</head>
<body>
    <div class="auth-container password-reset-mode">
        <div class="password-reset-animation">
            <div class="market-grid"></div>
            <div class="market-particles"></div>
            <div class="floating-elements"></div>
            <div class="password-reset-glow"></div>
        </div>
        
        <div class="auth-form-container" style="position: relative;
        z-index: 10;
        background: linear-gradient(135deg, #667eea 0%, #bfbdc0 90%);
        border-radius: 8px;
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        margin: 2rem; height: 600px;  margin-top: 70px;">
            <div class="auth-header">
                <h2>Need Any Help?</h2>
                <p style="color: rgb(58, 26, 26);">Enter your email and we'll contact you shortly</p>
            </div>
            
            <form id="supportForm" class="auth-form" style="gap: 1.5rem;">
                <div class="form-group">
                    <label for="email">Email</label>
                    <div class="input-with-icon">
                        <i class="fas fa-envelope"></i>
                        <input type="email" id="email" name="email" placeholder="Enter your email" onblur="return validateEmail()" required>
                    </div>
                    <span class="EmailError"></span>
                </div>
                
                <div class="form-group">
                    <label for="message">Message (Optional)</label>
                    <div class="input-with-icon1">
                        <!-- Message SVG Icon -->
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#667eea" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                        </svg>
                        <textarea id="message" name="message" rows="3" placeholder="Describe your issue..."></textarea>
                    </div>
                </div>
                
                <button type="submit" class="btn auth-btn" id="submitBtn">Submit <i class="fas fa-paper-plane"></i></button>
                <div class="auth-footer">
                    <p style="color: black;"> <a href="login.html">Login</a> | <a href="signup.html">Signup</a> </p>
                </div>
                <div id="successMessage" class="success-message">
                    Thank you! Your support request has been submitted. We'll contact you soon.
                </div>
                <div id="errorMessage" class="error-message">
                    There was an error submitting your request. <br>Please try again later.
                </div>
            </form>
        </div>
    </div>
    
    <script src="assets/js/main.js"></script>
    <script>
        function validateEmail() {
            const emailInput = document.getElementById('email');
            const emailError = document.querySelector('.EmailError');
            const email = emailInput.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            emailError.textContent = '';
            emailInput.classList.remove('error');
            
            if (email === '') {
                emailError.textContent = 'Email is required';
                emailInput.classList.add('error');
                return false;
            }
            
            if (!emailRegex.test(email)) {
                emailError.textContent = 'Please enter a valid email address';
                emailInput.classList.add('error');
                return false;
            }
            
            return true;
        }

        document.getElementById('supportForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    if (!validateEmail()) {
        return;
    }
    
    const submitBtn = document.getElementById('submitBtn');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
    
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
    successMessage.style.display = 'none';
    errorMessage.style.display = 'none';
    
    try {
        const formData = new FormData(this);
        const response = await fetch('send_support_email.php', {
            method: 'POST',
            body: formData
        });

        // Check if response is JSON
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            const text = await response.text();
            throw new Error(`Server returned: ${text}`);
        }

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Server returned an error');
        }

        if (data.success) {
            successMessage.style.display = 'block';
            this.reset();
        } else {
            throw new Error(data.message || 'Request failed');
        }
    } catch (error) {
        console.error('Submission error:', error);
        errorMessage.style.display = 'block';
        errorMessage.innerHTML = 'There was an error processing your request. <br>Please try again later.';
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Submit <i class="fas fa-paper-plane"></i>';
    }
});
    </script>
</body>
</html>