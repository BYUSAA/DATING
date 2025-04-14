// Admin-specific functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check admin status
    checkAdminStatus();
    
    // Load dashboard data
    loadDashboardData();
    
    // Initialize any admin-specific functionality
    initAdminUI();
});

function checkAdminStatus() {
    const userRole = localStorage.getItem('metadate_user_role');
    if (userRole !== 'admin') {
        window.location.href = 'index.html';
    }
}

function loadDashboardData() {
    // In a real app, this would fetch from an API
    const activityData = [
        { id: 1, user: 'JohnDoe', action: 'created account', time: '2 minutes ago' },
        { id: 2, user: 'JaneSmith', action: 'upgraded to premium', time: '15 minutes ago' },
        { id: 3, user: 'MikeJohnson', action: 'reported a profile', time: '32 minutes ago' },
        { id: 4, user: 'SarahWilliams', action: 'matched with AlexBrown', time: '1 hour ago' },
        { id: 5, user: 'System', action: 'nightly backup completed', time: '3 hours ago' }
    ];
    
    const activityList = document.querySelector('.activity-list');
    if (activityList) {
        activityList.innerHTML = activityData.map(item => `
            <div class="activity-item">
                <strong>${item.user}</strong> ${item.action} <span class="activity-time">${item.time}</span>
            </div>
        `).join('');
    }
}

function initAdminUI() {
    // Any admin-specific UI initialization
    console.log('Admin UI initialized');
    
    // Add click handlers for sidebar
    const sidebarItems = document.querySelectorAll('.sidebar-nav li');
    sidebarItems.forEach(item => {
        item.addEventListener('click', function() {
            sidebarItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Add to global scope
window.logout = function() {
    localStorage.removeItem('metadate_user_token');
    localStorage.removeItem('metadate_user_role');
    window.location.href = 'index.html';
};