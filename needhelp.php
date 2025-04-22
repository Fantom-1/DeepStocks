<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Need Help? | Market Insights Pro</title>
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="stylesheet" href="assets/css/animations.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body>
    <div class="auth-container password-reset-mode" >
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
        margin: 2rem; height: 460px;  margin-top: 150px;">
            <div class="auth-header">
                <h2>Need Any Help?</h2>
                <p style="color: rgb(58, 26, 26);">Enter your email to receive a link</p>
            </div>
            
            <form id="forgotPasswordForm" class="auth-form" style="gap: 1.5rem;" action="includes/auth.php" method="POST">
                <input type="hidden" name="action" value="forgot_password">
                
                <div class="form-group">
                    <label for="email">Email</label>
                    <div class="input-with-icon">
                        <i class="fas fa-envelope"></i>
                        <input type="email" id="email" name="email"  placeholder="Enter your email" onblur="return validateEmail()" required>
                    </div>
                    <span class="EmailError"></span>
                </div>
                
                <button type="submit"  class="btn auth-btn">Send Link <i class="fas fa-paper-plane"></i></button>
                
                <div class="auth-footer">
                    <p style="color: black;"> <a href="login.html">Login</a> | <a href="signup.html">Signup</a> </p>
                </div>
            </form>
        </div>
    </div>
    
    <script src="assets/js/main.js"></script>
    <script src="assets/js/auth.js"></script>
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
    </script>
</body>
</html>