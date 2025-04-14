// Theme switcher functionality
document.addEventListener('DOMContentLoaded', function() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('metadate_theme') || 'light';
    
    // Set initial theme
    setTheme(currentTheme);
    
    // Toggle theme on button click
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', toggleTheme);
    }
    
    // Add theme class to body for transitions
    document.body.classList.add('theme-transition');
});

function setTheme(theme) {
    document.body.className = theme + '-theme';
    localStorage.setItem('metadate_theme', theme);
    
    // Update button text
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        themeToggleBtn.textContent = theme === 'light' ? '🌙' : '☀️';
    }
}

function toggleTheme() {
    const currentTheme = localStorage.getItem('metadate_theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
}

// Expose to global scope for HTML onclick attributes
window.toggleTheme = toggleTheme;