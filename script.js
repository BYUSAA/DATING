// Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check for saved theme preference or use preferred color scheme
    const savedTheme = localStorage.getItem('theme') || 
                      (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Theme toggle button
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Button click effects
    document.querySelectorAll('.cyber-button, .cyber-button-alt, .form-button, .upload-label').forEach(button => {
        button.addEventListener('click', function() {
            this.classList.add('button-click');
            setTimeout(() => {
                this.classList.remove('button-click');
            }, 500);
        });
    });
    
    // Initialize any sliders or carousels
    initTestimonialSlider();
    
    // Check authentication status
    checkAuthStatus();
});

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

function initTestimonialSlider() {
    const slider = document.querySelector('.testimonial-slider');
    if (slider) {
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
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2;
            slider.scrollLeft = scrollLeft - walk;
        });

        // Touch events for mobile
        slider.addEventListener('touchstart', (e) => {
            isDown = true;
            slider.classList.add('active');
            startX = e.touches[0].pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });

        slider.addEventListener('touchend', () => {
            isDown = false;
            slider.classList.remove('active');
        });

        slider.addEventListener('touchmove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.touches[0].pageX - slider.offsetLeft;
            const walk = (x - startX) * 2;
            slider.scrollLeft = scrollLeft - walk;
        });
    }
}

// Authentication functions
function checkAuthStatus() {
    const protectedPages = ['profile.html', 'categories/*', 'subscription.html'];
    const currentPage = window.location.pathname.split('/').pop();
    
    // Check if current page requires authentication
    const requiresAuth = protectedPages.some(page => {
        if (page.endsWith('/*')) {
            const prefix = page.replace('/*', '');
            return currentPage.startsWith(prefix);
        }
        return currentPage === page;
    });
    
    if (requiresAuth) {
        const isLoggedIn = localStorage.getItem('authToken');
        if (!isLoggedIn) {
            window.location.href = 'auth/login.html';
        }
    }
}

// Form handling for login/signup
function handleFormSubmit(formId, isLogin = true) {
    const form = document.getElementById(formId);
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            // Simple validation
            if (!data.email || !data.password) {
                alert('Please fill in all required fields');
                return;
            }
            
            if (!isLogin && (!data.name || !data.confirmPassword || data.password !== data.confirmPassword)) {
                alert('Please check your inputs. Passwords must match.');
                return;
            }
            
            // Simulate API call
            setTimeout(() => {
                // In a real app, you would verify credentials with your backend
                localStorage.setItem('authToken', 'simulated-token');
                localStorage.setItem('userEmail', data.email);
                localStorage.setItem('userName', data.name || 'User');
                
                // Redirect to profile or home page
                window.location.href = isLogin ? 'profile.html' : 'profile.html';
            }, 1000);
        });
    }
}

// Profile image upload
function setupProfileUpload() {
    const uploadInput = document.getElementById('profile-upload');
    const uploadPreview = document.getElementById('upload-preview');
    
    if (uploadInput && uploadPreview) {
        uploadInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    uploadPreview.innerHTML = `<img src="${event.target.result}" alt="Profile Preview">`;
                };
                reader.readAsDataURL(file);
            }
        });
    }
}

// Initialize category pages
function initCategoryPage() {
    // Generate fake users for the category
    const userGrid = document.querySelector('.user-grid');
    if (userGrid) {
        const category = window.location.pathname.split('/').pop().replace('.html', '');
        const categoryNames = {
            dating: ['Romantic', 'Casual', 'Serious'],
            marriage: ['Ready to Wed', 'Looking for Spouse', 'Arranged'],
            religious: ['Christian', 'Muslim', 'Jewish', 'Hindu', 'Buddhist'],
            polygamy: ['Polyamorous', 'Open', 'Group'],
            friendship: ['Buddies', 'Activity Partners', 'Support'],
            fantasy: ['Roleplay', 'Fetish', 'Cosplay'],
            international: ['Foreign', 'Cultural Exchange', 'Language'],
            business: ['Networking', 'Professional', 'Entrepreneurs'],
            specialneeds: ['Accessible', 'Understanding', 'Supportive'],
            penpal: ['Inmates', 'Prisoners', 'Correspondence']
        };
        
        const subcategories = categoryNames[category] || ['General'];
        
        // Create 100 fake users
        for (let i = 1; i <= 100; i++) {
            const subcategory = subcategories[Math.floor(Math.random() * subcategories.length)];
            const gender = Math.random() > 0.5 ? 'male' : 'female';
            const age = Math.floor(Math.random() * 30) + 18;
            const location = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Miami'][Math.floor(Math.random() * 5)];
            
            const userCard = document.createElement('div');
            userCard.className = 'user-card';
            userCard.innerHTML = `
                <div class="user-avatar">
                    <img src="assets/images/users/${gender}${Math.floor(Math.random() * 10) + 1}.jpg" alt="User ${i}">
                    <div class="user-badge">${subcategory}</div>
                </div>
                <div class="user-info">
                    <h4>User${i}</h4>
                    <p>${age} • ${location}</p>
                    <button class="cyber-button small">Connect</button>
                </div>
            `;
            userGrid.appendChild(userCard);
        }
    }
}

// Subscription handling
function initSubscriptionPage() {
    const subscriptionButtons = document.querySelectorAll('.subscription-option .cyber-button');
    subscriptionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const plan = this.getAttribute('data-plan');
            localStorage.setItem('subscriptionPlan', plan);
            alert(`You've selected the ${plan} plan. In a real app, you would proceed to payment.`);
            window.location.href = 'profile.html';
        });
    });
}

// Check subscription level for messaging
function checkSubscriptionLevel() {
    const currentPlan = localStorage.getItem('subscriptionPlan') || 'free';
    const messageButtons = document.querySelectorAll('.message-button');
    
    if (messageButtons.length > 0) {
        // In a real app, you would check the user's actual subscription status
        // and message limits from your backend
        
        messageButtons.forEach((button, index) => {
            if (currentPlan === 'free' && index >= 3) {
                button.disabled = true;
                button.textContent = 'Upgrade to Message';
                button.classList.add('cyber-button-alt');
                button.addEventListener('click', () => {
                    window.location.href = 'subscription.html';
                });
            } else {
                button.addEventListener('click', () => {
                    startMessaging(button.closest('.user-card').querySelector('h4').textContent);
                });
            }
        });
    }
}

function startMessaging(username) {
    // In a real app, this would open a chat interface
    alert(`Starting conversation with ${username}. In the full app, this would open a chat window.`);
}

// Initialize appropriate functions based on page
const pageInitFunctions = {
    'login.html': () => handleFormSubmit('login-form', true),
    'signup.html': () => {
        handleFormSubmit('signup-form', false);
        setupProfileUpload();
    },
    'profile.html': () => {
        // Display user info
        const userNameElement = document.getElementById('user-name');
        const userEmailElement = document.getElementById('user-email');
        
        if (userNameElement) {
            userNameElement.textContent = localStorage.getItem('userName') || 'User';
        }
        if (userEmailElement) {
            userEmailElement.textContent = localStorage.getItem('userEmail') || 'user@example.com';
        }
        
        // Display subscription status
        const subscriptionElement = document.getElementById('subscription-status');
        if (subscriptionElement) {
            const plan = localStorage.getItem('subscriptionPlan') || 'free';
            subscriptionElement.textContent = plan.charAt(0).toUpperCase() + plan.slice(1);
            subscriptionElement.className = plan;
        }
    },
    'subscription.html': initSubscriptionPage,
    'default': () => {
        // Check if we're on a category page
        if (window.location.pathname.includes('categories/')) {
            initCategoryPage();
            checkSubscriptionLevel();
        }
    }
};

// Run the appropriate init function for the current page
const currentPage = window.location.pathname.split('/').pop();
if (pageInitFunctions[currentPage]) {
    pageInitFunctions[currentPage]();
} else {
    pageInitFunctions['default']();
}