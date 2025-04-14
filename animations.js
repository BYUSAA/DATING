// Animation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations based on page
    initPageAnimations();
    
    // Add hover effects to cards
    addCardHoverEffects();
    
    // Add floating animation to elements with class 'float'
    addFloatingAnimation();
});

function initPageAnimations() {
    // Homepage specific animations
    if (document.querySelector('.hero-content')) {
        animateHeroContent();
    }
    
    // Login/signup page animations
    if (document.getElementById('auth-form')) {
        animateAuthForm();
    }
}

function animateHeroContent() {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        // Add initial hidden state
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(20px)';
        
        // Animate in
        setTimeout(() => {
            heroContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 300);
    }
}

function animateAuthForm() {
    const form = document.getElementById('auth-form');
    if (form) {
        // Add initial hidden state
        form.style.opacity = '0';
        form.style.transform = 'scale(0.95)';
        
        // Animate in
        setTimeout(() => {
            form.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            form.style.opacity = '1';
            form.style.transform = 'scale(1)';
        }, 300);
    }
}

function addCardHoverEffects() {
    const cards = document.querySelectorAll('.card, .feature-card, .testimonial');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.boxShadow = '0 8px 15px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        });
    });
}

function addFloatingAnimation() {
    const floatElements = document.querySelectorAll('.float');
    
    floatElements.forEach(el => {
        // Set initial animation properties
        const duration = Math.random() * 3 + 2;
        const delay = Math.random() * 2;
        
        el.style.animation = `float ${duration}s ease-in-out infinite`;
        el.style.animationDelay = `${delay}s`;
    });
}

// Bubble animation for logo
function createBubble() {
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
    
    return bubble;
}

// Add to global scope for HTML event handlers
window.initBubbleAnimation = function() {
    const container = document.querySelector('.bubble-animation');
    if (container) {
        // Clear existing bubbles
        container.innerHTML = '';
        
        // Create new bubbles
        for (let i = 0; i < 10; i++) {
            const bubble = createBubble();
            container.appendChild(bubble);
            
            // Remove bubble after animation
            bubble.addEventListener('animationend', function() {
                bubble.remove();
            });
        }
    }
};