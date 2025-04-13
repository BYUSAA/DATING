document.addEventListener('DOMContentLoaded', function() {
    // Typewriter Effect
    const typewriterElement = document.querySelector('.typewriter');
    const words = ["Soulmate", "Partner", "Friend", "Pen Pal", "Business Connection"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 150;
    
    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 150;
        }
        
        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typingSpeed = 1500; // Pause at end of word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500; // Pause before typing next word
        }
        
        setTimeout(type, typingSpeed);
    }
    
    // Start the typewriter effect after a short delay
    setTimeout(type, 1000);
    
    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        testimonials[index].classList.add('active');
        currentTestimonial = index;
    }
    
    prevBtn.addEventListener('click', () => {
        let newIndex = currentTestimonial - 1;
        if (newIndex < 0) newIndex = testimonials.length - 1;
        showTestimonial(newIndex);
    });
    
    nextBtn.addEventListener('click', () => {
        let newIndex = currentTestimonial + 1;
        if (newIndex >= testimonials.length) newIndex = 0;
        showTestimonial(newIndex);
    });
    
    // Auto-rotate testimonials
    setInterval(() => {
        let newIndex = currentTestimonial + 1;
        if (newIndex >= testimonials.length) newIndex = 0;
        showTestimonial(newIndex);
    }, 5000);
    
    // Theme Toggle
    const themeBtn = document.getElementById('themeBtn');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check for saved theme preference or use the system preference
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        updateThemeIcon(currentTheme);
    } else if (prefersDarkScheme.matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
        updateThemeIcon('dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        updateThemeIcon('light');
    }
    
    themeBtn.addEventListener('click', function() {
        let theme;
        if (document.documentElement.getAttribute('data-theme') === 'light') {
            theme = 'dark';
        } else {
            theme = 'light';
        }
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        updateThemeIcon(theme);
    });
    
    function updateThemeIcon(theme) {
        const icon = themeBtn.querySelector('i');
        if (theme === 'light') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }
    
    // Floating orbs animation
    const orbs = document.querySelectorAll('.floating-orb');
    orbs.forEach((orb, index) => {
        orb.style.animationDelay = `${index * 2}s`;
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
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Check authentication status
    checkAuthStatus();
});

// Authentication functions
function checkAuthStatus() {
    const protectedLinks = document.querySelectorAll('a[href^="categories/"], a[href="profile.html"]');
    const isLoggedIn = localStorage.getItem('metadatez_user') !== null;
    
    protectedLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (!isLoggedIn) {
                e.preventDefault();
                window.location.href = 'auth/login.html';
            }
        });
    });
}

function loginUser(email, password) {
    // In a real app, this would be an API call to your backend
    const users = JSON.parse(localStorage.getItem('metadatez_users')) || [];
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        localStorage.setItem('metadatez_user', JSON.stringify(user));
        return true;
    }
    return false;
}

function registerUser(userData) {
    // In a real app, this would be an API call to your backend
    const users = JSON.parse(localStorage.getItem('metadatez_users')) || [];
    
    // Check if user already exists
    if (users.some(u => u.email === userData.email)) {
        return { success: false, message: 'Email already registered' };
    }
    
    // Add new user
    users.push(userData);
    localStorage.setItem('metadatez_users', JSON.stringify(users));
    localStorage.setItem('metadatez_user', JSON.stringify(userData));
    
    return { success: true };
}

function logoutUser() {
    localStorage.removeItem('metadatez_user');
    window.location.href = 'index.html';
}