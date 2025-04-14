// Main application functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize any main page functionality
    console.log('MetaDate application loaded');
    
    // Check for authenticated user
    checkAuthStatus();
    
    // Initialize any page-specific functionality
    if (document.querySelector('.testimonial-slider')) {
        initTestimonialSlider();
    }
    
    // Initialize bubble animation if on homepage
    if (document.getElementById('animated-logo')) {
        initBubbleAnimation();
    }
});

function checkAuthStatus() {
    // Check if user is logged in (would be replaced with actual auth check)
    const isLoggedIn = localStorage.getItem('metadate_user_token');
    const authButtons = document.querySelector('.auth-buttons');
    
    if (isLoggedIn && authButtons) {
        authButtons.innerHTML = `
            <button class="btn" onclick="window.location.href='profile.html'">Profile</button>
            <button class="btn outline" onclick="logout()">Logout</button>
        `;
    }
}

function logout() {
    // Clear authentication token
    localStorage.removeItem('metadate_user_token');
    // Redirect to home page
    window.location.href = 'index.html';
}

function initTestimonialSlider() {
    const slider = document.querySelector('.testimonial-slider');
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.classList.add('active');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.classList.remove('active');
    });

    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.classList.remove('active');
    });

    slider.addEventListener('mousemove', (e) => {
        if(!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
    });
}

function initBubbleAnimation() {
    const logo = document.getElementById('animated-logo');
    const container = document.querySelector('.bubble-animation');
    
    // Create bubbles when hovering over logo
    logo.addEventListener('mouseenter', () => {
        createBubbles(container);
    });
    
    // Create some initial bubbles
    createBubbles(container, 5);
}

function createBubbles(container, count = 10) {
    for (let i = 0; i < count; i++) {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');
        
        // Random properties
        const size = Math.random() * 20 + 5;
        const posX = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = Math.random() * 3 + 2;
        
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${posX}%`;
        bubble.style.animationDelay = `${delay}s`;
        bubble.style.animationDuration = `${duration}s`;
        
        // Random color
        const hue = Math.random() * 60 + 250; // Purple range
        bubble.style.backgroundColor = `hsla(${hue}, 80%, 70%, 0.7)`;
        
        container.appendChild(bubble);
        
        // Remove bubble after animation
        bubble.addEventListener('animationend', function() {
            bubble.remove();
        });
    }
}

// Global function for form submissions
function handleFormSubmit(formId, successRedirect) {
    const form = document.getElementById(formId);
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate form submission
            console.log('Form submitted:', formId);
            
            // For login form specifically
            if (formId === 'login-form') {
                const email = form.querySelector('input[type="email"]').value;
                const password = form.querySelector('input[type="password"]').value;
                
                // Check for admin credentials
                if (email === 'byusammartin@gmail.com' && password === 'Digital@12345') {
                    localStorage.setItem('metadate_user_token', 'admin_token');
                    localStorage.setItem('metadate_user_role', 'admin');
                    window.location.href = 'admin-dashboard.html';
                    return;
                }
                
                // Regular user login (simulated)
                localStorage.setItem('metadate_user_token', 'user_token');
                localStorage.setItem('metadate_user_role', 'user');
            }
            
            // For signup form
            if (formId === 'signup-form') {
                localStorage.setItem('metadate_user_token', 'new_user_token');
                localStorage.setItem('metadate_user_role', 'user');
                localStorage.setItem('metadate_profile_incomplete', 'true');
            }
            
            // Redirect if specified
            if (successRedirect) {
                setTimeout(() => {
                    window.location.href = successRedirect;
                }, 1000);
            }
            
            // Show success message
            alert('Action completed successfully!');
        });
    }
}