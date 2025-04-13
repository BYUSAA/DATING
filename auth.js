// User data storage (simulated - in a real app, this would be server-side)
const users = JSON.parse(localStorage.getItem('users')) || [];

// Initialize auth forms
document.addEventListener('DOMContentLoaded', () => {
    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (validateForm(loginForm)) {
                const email = loginForm.querySelector('#loginEmail').value;
                const password = loginForm.querySelector('#loginPassword').value;
                
                // Check if user exists
                const user = users.find(u => u.email === email && u.password === password);
                if (user) {
                    // Successful login
                    localStorage.setItem('isLoggedIn', 'true');
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    window.location.href = 'index.html';
                } else {
                    // Show error
                    const errorElement = loginForm.querySelector('.form-error.general');
                    if (errorElement) {
                        errorElement.textContent = 'Invalid email or password';
                        errorElement.style.display = 'block';
                    }
                }
            }
        });
    }
    
    // Signup form
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (validateForm(signupForm)) {
                const name = signupForm.querySelector('#signupName').value;
                const email = signupForm.querySelector('#signupEmail').value;
                const password = signupForm.querySelector('#signupPassword').value;
                const category = signupForm.querySelector('#signupCategory').value;
                
                // Check if email is already registered
                if (users.some(u => u.email === email)) {
                    const errorElement = signupForm.querySelector('.form-error.general');
                    if (errorElement) {
                        errorElement.textContent = 'Email already registered';
                        errorElement.style.display = 'block';
                    }
                    return;
                }
                
                // Get uploaded images (simplified for demo)
                const profileImage = signupForm.querySelector('#profileImage')?.files[0];
                const additionalImages = [
                    signupForm.querySelector('#image1')?.files[0],
                    signupForm.querySelector('#image2')?.files[0]
                ].filter(img => img);
                
                // Create new user
                const newUser = {
                    id: Date.now().toString(),
                    name,
                    email,
                    password,
                    category,
                    subscription: 'free',
                    profileImage: profileImage ? URL.createObjectURL(profileImage) : 'assets/images/default-avatar.jpg',
                    images: additionalImages.map(img => URL.createObjectURL(img)),
                    joined: new Date().toISOString()
                };
                
                // Save user
                users.push(newUser);
                localStorage.setItem('users', JSON.stringify(users));
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('currentUser', JSON.stringify(newUser));
                
                // Redirect to home
                window.location.href = 'index.html';
            }
        });
    }
    
    // Logout functionality
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('currentUser');
            window.location.href = 'login.html';
        });
    }
    
    // Check auth status on page load
    checkAuthStatus();
});

// Check authentication status
function checkAuthStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const authPages = ['login.html', 'signup.html'];
    const currentPage = window.location.pathname.split('/').pop();
    
    if (isLoggedIn && authPages.includes(currentPage)) {
        // Redirect logged in users away from auth pages
        window.location.href = 'index.html';
    } else if (!isLoggedIn && !authPages.includes(currentPage)) {
        // Redirect non-logged in users to login
        window.location.href = 'login.html';
    }
    
    // Update UI based on auth status
    const loginBtn = document.querySelector('.login-btn');
    const signupBtn = document.querySelector('.signup-btn');
    const profileLink = document.getElementById('profileLink');
    
    if (isLoggedIn) {
        if (loginBtn) loginBtn.style.display = 'none';
        if (signupBtn) signupBtn.style.display = 'none';
        if (profileLink) {
            profileLink.style.display = 'block';
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if (currentUser) {
                profileLink.querySelector('img').src = currentUser.profileImage;
            }
        }
    } else {
        if (profileLink) profileLink.style.display = 'none';
    }
}

// Form validation
function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('.form-input[required]');
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('error');
            const errorElement = input.nextElementSibling;
            if (errorElement && errorElement.classList.contains('form-error')) {
                errorElement.textContent = 'This field is required';
                errorElement.style.display = 'block';
            }
            isValid = false;
        } else {
            input.classList.remove('error');
            const errorElement = input.nextElementSibling;
            if (errorElement && errorElement.classList.contains('form-error')) {
                errorElement.style.display = 'none';
            }
            
            // Additional validation for specific fields
            if (input.type === 'email' && !validateEmail(input.value)) {
                input.classList.add('error');
                const errorElement = input.nextElementSibling;
                if (errorElement && errorElement.classList.contains('form-error')) {
                    errorElement.textContent = 'Please enter a valid email address';
                    errorElement.style.display = 'block';
                }
                isValid = false;
            }
            
            if (input.id === 'signupPassword' && input.value.length < 6) {
                input.classList.add('error');
                const errorElement = input.nextElementSibling;
                if (errorElement && errorElement.classList.contains('form-error')) {
                    errorElement.textContent = 'Password must be at least 6 characters';
                    errorElement.style.display = 'block';
                }
                isValid = false;
            }
        }
    });
    
    return isValid;
}

// Email validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Subscription handling
function handleSubscription(plan) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        currentUser.subscription = plan;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        // Update in users array
        const users = JSON.parse(localStorage.getItem('users'));
        const userIndex = users.findIndex(u => u.id === currentUser.id);
        if (userIndex !== -1) {
            users[userIndex].subscription = plan;
            localStorage.setItem('users', JSON.stringify(users));
        }
        
        // Reset message counts for free tier
        if (plan !== 'free') {
            localStorage.removeItem('messageCount');
            localStorage.removeItem('mediaCount');
        }
        
        // Redirect to profile
        window.location.href = 'profile.html';
    }
}

// Initialize subscription buttons
document.addEventListener('DOMContentLoaded', () => {
    const subscriptionButtons = document.querySelectorAll('.select-plan-btn');
    subscriptionButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const plan = button.dataset.plan;
            handleSubscription(plan);
        });
    });
});