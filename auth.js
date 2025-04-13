// Authentication functions
document.addEventListener('DOMContentLoaded', function() {
    // Login form handling
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            const rememberMe = document.getElementById('rememberMe').checked;
            
            // Check for admin login
            if (email === 'byusammartin@gmail.com' && password === 'Digital@12345') {
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('isAdmin', 'true');
                localStorage.setItem('userEmail', email);
                
                // Redirect to admin dashboard or intended page
                const urlParams = new URLSearchParams(window.location.search);
                const redirect = urlParams.get('redirect') || 'admin-dashboard.html';
                window.location.href = redirect;
                return;
            }
            
            // Simulate user login (in a real app, this would be an API call)
            if (email && password) {
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('isAdmin', 'false');
                localStorage.setItem('userEmail', email);
                
                if (rememberMe) {
                    localStorage.setItem('rememberMe', 'true');
                } else {
                    localStorage.removeItem('rememberMe');
                }
                
                // Redirect to intended page or homepage
                const urlParams = new URLSearchParams(window.location.search);
                const redirect = urlParams.get('redirect') || 'index.html';
                window.location.href = redirect;
            } else {
                alert('Please enter both email and password');
            }
        });
    }
    
    // Signup form handling
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const terms = document.getElementById('terms').checked;
            
            // Basic validation
            if (!email || !password || !confirmPassword) {
                alert('Please fill in all fields');
                return;
            }
            
            if (password !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }
            
            if (!terms) {
                alert('You must accept the terms and conditions');
                return;
            }
            
            // Simulate successful signup (in a real app, this would be an API call)
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userEmail', email);
            
            // Redirect to profile setup or homepage
            window.location.href = 'profile.html';
        });
    }
    
    // Logout functionality
    const logoutButtons = document.querySelectorAll('.logout-btn');
    logoutButtons.forEach(button => {
        button.addEventListener('click', function() {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('isAdmin');
            localStorage.removeItem('userEmail');
            window.location.href = 'index.html';
        });
    });
    
    // Check auth status on protected pages
    if (!window.location.pathname.includes('login.html') && 
        !window.location.pathname.includes('signup.html') &&
        !window.location.pathname.includes('index.html')) {
        
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        if (!isLoggedIn) {
            window.location.href = 'auth/login.html?redirect=' + encodeURIComponent(window.location.pathname);
        }
    }
    
    // Profile picture upload handling
    const profilePicInput = document.getElementById('profilePic');
    if (profilePicInput) {
        profilePicInput.addEventListener('change', function(e) {
            const files = e.target.files;
            if (files.length > 0) {
                const previewContainer = document.getElementById('profilePicPreview');
                previewContainer.innerHTML = '';
                
                for (let i = 0; i < Math.min(files.length, 3); i++) {
                    const reader = new FileReader();
                    reader.onload = function(event) {
                        const img = document.createElement('img');
                        img.src = event.target.result;
                        img.classList.add('profile-pic-thumbnail');
                        previewContainer.appendChild(img);
                    };
                    reader.readAsDataURL(files[i]);
                }
            }
        });
    }
    
    // Video upload handling
    const videoInput = document.getElementById('profileVideo');
    if (videoInput) {
        videoInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const previewContainer = document.getElementById('videoPreview');
                previewContainer.innerHTML = '';
                
                const video = document.createElement('video');
                video.src = URL.createObjectURL(file);
                video.controls = true;
                video.classList.add('profile-video-preview');
                previewContainer.appendChild(video);
            }
        });
    }
    
    // Vanishing button effect
    const buttons = document.querySelectorAll('.btn-vanish');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            this.style.transform = 'scale(0)';
            this.style.opacity = '0';
            
            setTimeout(() => {
                // In a real app, you would submit the form or follow the link here
                if (this.tagName === 'A') {
                    window.location.href = this.href;
                } else if (this.tagName === 'BUTTON' && this.type === 'submit') {
                    this.form.submit();
                }
            }, 300);
        });
    });
});

// Function to get user data (simplified for demo)
function getUserData() {
    return {
        email: localStorage.getItem('userEmail'),
        isAdmin: localStorage.getItem('isAdmin') === 'true'
    };
}

// Function to check if user has subscription
function hasSubscription(level) {
    // In a real app, this would check against the user's actual subscription
    const subLevel = localStorage.getItem('subscriptionLevel') || 'free';
    
    if (!level) return subLevel;
    
    const levels = ['free', 'basic', 'premium', 'vip'];
    return levels.indexOf(subLevel) >= levels.indexOf(level);
}

// Function to redirect if subscription level is insufficient
function requireSubscription(level, redirectUrl = 'subscription.html') {
    if (!hasSubscription(level)) {
        window.location.href = redirectUrl;
        return false;
    }
    return true;
}