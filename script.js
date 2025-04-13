// Loader
window.addEventListener('load', function() {
    const loader = document.querySelector('.cyber-loader');
    setTimeout(() => {
        loader.classList.add('hidden');
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 1500);
});

// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const body = document.body;

// Check for saved theme preference
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    body.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
}

themeToggle.addEventListener('click', () => {
    if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    } else {
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Button Animation
document.querySelectorAll('.cyber-button').forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        ripple.classList.add('ripple-effect');
        
        // Get click position relative to button
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Position the ripple
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        this.appendChild(ripple);
        
        // Remove ripple after animation
        setTimeout(() => {
            ripple.remove();
        }, 1000);
    });
});

// Form Validation
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
        let isValid = true;
        
        // Check required fields
        this.querySelectorAll('[required]').forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
                
                // Remove error class after showing
                setTimeout(() => {
                    field.classList.remove('error');
                }, 3000);
            }
        });
        
        if (!isValid) {
            e.preventDefault();
            
            // Show error message
            const errorMsg = document.createElement('div');
            errorMsg.classList.add('cyber-alert', 'error');
            errorMsg.textContent = 'Please fill in all required fields';
            
            this.prepend(errorMsg);
            
            // Remove error message after 3 seconds
            setTimeout(() => {
                errorMsg.remove();
            }, 3000);
        }
    });
});

// Testimonial Slider Auto-scroll
const testimonialSlider = document.querySelector('.testimonial-slider');
if (testimonialSlider) {
    let scrollAmount = 0;
    const scrollStep = 380; // Width of testimonial card + gap
    
    function autoScrollTestimonials() {
        scrollAmount += scrollStep;
        
        // If we've scrolled to the end, reset to start
        if (scrollAmount >= testimonialSlider.scrollWidth - testimonialSlider.clientWidth) {
            scrollAmount = 0;
            testimonialSlider.scrollTo({
                left: 0,
                behavior: 'instant'
            });
            setTimeout(autoScrollTestimonials, 3000);
            return;
        }
        
        testimonialSlider.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });
        
        setTimeout(autoScrollTestimonials, 5000);
    }
    
    // Start auto-scroll after 5 seconds
    setTimeout(autoScrollTestimonials, 5000);
}

// Hover effects for category cards
document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
        this.style.boxShadow = '0 10px 30px rgba(0, 247, 255, 0.2)';
        this.style.borderColor = 'var(--cyber-blue)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = '';
        this.style.boxShadow = '';
        this.style.borderColor = 'var(--cyber-grid)';
    });
});

// Add floating particles effect
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'cyber-particles';
    document.body.appendChild(particlesContainer);
    
    const particleCount = window.innerWidth < 768 ? 30 : 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'cyber-particle';
        
        // Random properties
        const size = Math.random() * 5 + 1;
        const posX = Math.random() * window.innerWidth;
        const posY = Math.random() * window.innerHeight;
        const delay = Math.random() * 5;
        const duration = Math.random() * 10 + 10;
        const color = `hsl(${Math.random() * 60 + 180}, 100%, 50%)`;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}px`;
        particle.style.top = `${posY}px`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.backgroundColor = color;
        
        particlesContainer.appendChild(particle);
    }
}

// Initialize particles
createParticles();

// Check authentication state
function checkAuth() {
    const protectedPages = [
        'profile.html',
        'categories/dating.html',
        'categories/marriage.html',
        // Add all other protected pages
    ];
    
    const currentPage = window.location.pathname.split('/').pop();
    
    if (protectedPages.includes(currentPage)) {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        if (!isLoggedIn) {
            window.location.href = 'auth/login.html';
        }
    }
}

// Run auth check when page loads
document.addEventListener('DOMContentLoaded', checkAuth);