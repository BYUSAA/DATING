document.addEventListener('DOMContentLoaded', function() {
    // Theme Switcher
    const themeSwitcher = document.getElementById('theme-switcher');
    const body = document.body;
    
    // Check for saved theme preference or use preferred color scheme
    const savedTheme = localStorage.getItem('theme') || 
                      (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    
    // Apply the saved theme
    body.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    // Theme switcher click event
    themeSwitcher.addEventListener('click', function() {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
    
    function updateThemeIcon(theme) {
        const icon = themeSwitcher.querySelector('i');
        if (theme === 'dark') {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        } else {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    }
    
    // Button hover effects
    const buttons = document.querySelectorAll('.glow-button, .hollow-button, .category-card, .feature-card');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = this.style.transform || 'translateY(0)';
        });
        
        button.addEventListener('mouseleave', function() {
            if (this.classList.contains('glow-button') || this.classList.contains('hollow-button')) {
                this.style.transform = 'translateY(0)';
            }
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form submission handling
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            // Here you would typically handle form submission with AJAX
            console.log('Form submitted:', this);
            
            // Show a success message (in a real app, you'd do this after successful submission)
            if (this.classList.contains('newsletter-form')) {
                alert('Thanks for subscribing to our newsletter!');
                this.reset();
            }
        });
    });
    
    // Animation on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.category-card, .feature-card, .step');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animated elements
    document.querySelectorAll('.category-card, .feature-card, .step').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load
    
    // Testimonial slider navigation
    const testimonialSlider = document.querySelector('.testimonials-slider');
    if (testimonialSlider) {
        let isDown = false;
        let startX;
        let scrollLeft;
        
        testimonialSlider.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - testimonialSlider.offsetLeft;
            scrollLeft = testimonialSlider.scrollLeft;
        });
        
        testimonialSlider.addEventListener('mouseleave', () => {
            isDown = false;
        });
        
        testimonialSlider.addEventListener('mouseup', () => {
            isDown = false;
        });
        
        testimonialSlider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - testimonialSlider.offsetLeft;
            const walk = (x - startX) * 2;
            testimonialSlider.scrollLeft = scrollLeft - walk;
        });
    }
    
    // Category card click effects
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Check if user is logged in (in a real app, you'd check authentication status)
            const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
            
            if (!isLoggedIn && !this.href.includes('login.html') && !this.href.includes('signup.html')) {
                e.preventDefault();
                window.location.href = 'auth/login.html?redirect=' + encodeURIComponent(this.href);
            }
        });
    });
    
    // Initialize any other interactive elements
    initInteractiveElements();
});

function initInteractiveElements() {
    // This function can be expanded to initialize other interactive elements
    console.log('Initializing interactive elements...');
    
    // Example: Initialize a counter for something
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = target / 100;
        
        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(updateCounter, 1);
        } else {
            counter.innerText = target;
        }
        
        function updateCounter() {
            const count = +counter.innerText;
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCounter, 1);
            } else {
                counter.innerText = target;
            }
        }
    });
}

// Check authentication status (simplified for demo)
function checkAuth() {
    return localStorage.getItem('isLoggedIn') === 'true';
}

// Admin login check
function checkAdminAuth() {
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    if (!isAdmin && window.location.pathname.includes('admin-dashboard.html')) {
        window.location.href = 'auth/login.html';
    }
}

// Call this on admin pages
checkAdminAuth();