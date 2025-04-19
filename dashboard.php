<?php
require_once 'includes/utils.php';
require_once 'includes/config.php';

// Start session and check if user is logged in
session_start();
redirectIfNotLoggedIn();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard | Market Insights Pro</title>
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
</head>
<body>
    <div class="dashboard-container">
        <aside class="sidebar">
            <div class="sidebar-header">
                <h2>Market Insights</h2>
                <div class="user-profile">
                    <div class="avatar"><?php echo substr($_SESSION['user_fullname'], 0, 1); ?></div>
                    <div class="user-info">
                        <span class="username"><?php echo htmlspecialchars($_SESSION['user_fullname']); ?></span>
                        <span class="email"><?php echo htmlspecialchars($_SESSION['user_email']); ?></span>
                    </div>
                </div>
            </div>
            <nav class="sidebar-nav">
                <ul>
                    <li class="active"><a href="#"><i class="fas fa-chart-line"></i> Dashboard</a></li>
                    <li><a href="#"><i class="fas fa-search-dollar"></i> Market Analysis</a></li>
                    <li><a href="#"><i class="fas fa-bell"></i> Alerts</a></li>
                    <li><a href="#"><i class="fas fa-book"></i> Watchlist</a></li>
                    <li><a href="#"><i class="fas fa-cog"></i> Settings</a></li>
                </ul>
            </nav>
            <div class="sidebar-footer">
                <a href="includes/auth.php?action=logout" class="logout-btn"><i class="fas fa-sign-out-alt"></i> Logout</a>
            </div>
        </aside>
        
        <main class="main-content">
            <header class="main-header">
                <h1>Dashboard</h1>
                <div class="header-actions">
                    <div class="search-box">
                        <input type="text" placeholder="Search stocks...">
                        <i class="fas fa-search"></i>
                    </div>
                    <div class="notifications">
                        <i class="fas fa-bell"></i>
                        <span class="badge">3</span>
                    </div>
                </div>
            </header>
            
            <div class="content-grid">
                <section class="welcome-card">
                    <h2>Welcome back, <?php echo htmlspecialchars($_SESSION['user_fullname']); ?>!</h2>
                    <p>Ready to analyze today's market trends?</p>
                    <div class="market-indicators">
                        <div class="indicator up">
                            <span class="label">S&P 500</span>
                            <span class="value">+0.75%</span>
                        </div>
                        <div class="indicator down">
                            <span class="label">NASDAQ</span>
                            <span class="value">-0.32%</span>
                        </div>
                        <div class="indicator up">
                            <span class="label">DOW</span>
                            <span class="value">+1.02%</span>
                        </div>
                    </div>
                </section>
                
                <section class="quick-actions">
                    <h3>Quick Actions</h3>
                    <div class="action-buttons">
                        <button class="action-btn">
                            <i class="fas fa-chart-bar"></i>
                            <span>New Analysis</span>
                        </button>
                        <button class="action-btn">
                            <i class="fas fa-plus-circle"></i>
                            <span>Add to Watchlist</span>
                        </button>
                        <button class="action-btn">
                            <i class="fas fa-bell"></i>
                            <span>Create Alert</span>
                        </button>
                    </div>
                </section>
                
                <section class="recent-activity">
                    <h3>Recent Activity</h3>
                    <div class="activity-list">
                        <div class="activity-item">
                            <div class="activity-icon">
                                <i class="fas fa-search"></i>
                            </div>
                            <div class="activity-details">
                                <p>Analyzed AAPL stock</p>
                                <span class="activity-time">2 hours ago</span>
                            </div>
                        </div>
                        <div class="activity-item">
                            <div class="activity-icon">
                                <i class="fas fa-bookmark"></i>
                            </div>
                            <div class="activity-details">
                                <p>Added TSLA to watchlist</p>
                                <span class="activity-time">Yesterday</span>
                            </div>
                        </div>
                        <div class="activity-item">
                            <div class="activity-icon">
                                <i class="fas fa-bell"></i>
                            </div>
                            <div class="activity-details">
                                <p>Created alert for AMZN</p>
                                <span class="activity-time">2 days ago</span>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    </div>
    
    <script src="assets/js/main.js"></script>
</body>
</html>