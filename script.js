// DOM Elements
const themeSwitcher = document.getElementById('theme-switcher');
const loginLink = document.getElementById('login-link');
const signupLink = document.getElementById('signup-link');
const loginModal = document.getElementById('login-modal');
const closeModal = document.querySelector('.close-modal');

// Theme Switching
themeSwitcher.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    
    // Update icon
    const icon = themeSwitcher.querySelector('i');
    icon.className = newTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
    
    // Save preference to localStorage
    localStorage.setItem('theme', newTheme);
});

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);
themeSwitcher.querySelector('i').className = savedTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';

// Modal Handling
loginLink.addEventListener('click', (e) => {
    e.preventDefault();
    loginModal.style.display = 'flex';
});

signupLink.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = 'signup.html';
});

closeModal.addEventListener('click', () => {
    loginModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        loginModal.style.display = 'none';
    }
});

// Form Submission
document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    // Here you would typically send this data to your backend
    console.log('Login attempt with:', { email, password });
    
    // For demo purposes, we'll just close the modal
    loginModal.style.display = 'none';
});

// Category Card Hover Effects
const categoryCards = document.querySelectorAll('.category-card');
categoryCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        const icon = card.querySelector('.category-icon');
        icon.style.transform = 'scale(1.1) rotate(5deg)';
    });
    
    card.addEventListener('mouseleave', () => {
        const icon = card.querySelector('.category-icon');
        icon.style.transform = 'scale(1) rotate(0)';
    });
});

// Floating particles animation
const particles = document.querySelectorAll('.logo-particle');
particles.forEach(particle => {
    const delay = Math.random() * 2;
    particle.style.animationDelay = `${delay}s`;
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add animation to buttons when clicked
document.querySelectorAll('.vanish').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        this.classList.add('clicked');
        
        // For demo, we'll just submit after animation
        setTimeout(() => {
            if (this.closest('form')) {
                this.closest('form').submit();
            } else if (this.getAttribute('href')) {
                window.location.href = this.getAttribute('href');
            }
        }, 300);
    });
});