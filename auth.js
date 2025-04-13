document.addEventListener('DOMContentLoaded', function() {
    // Login Form Handling
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            if (loginUser(email, password)) {
                // Redirect to homepage or intended page
                const redirectUrl = localStorage.getItem('redirectUrl') || 'index.html';
                window.location.href = redirectUrl;
            } else {
                showAlert('Invalid email or password', 'error');
            }
        });
    }
    
    // Signup Form Handling
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        // Initialize file upload preview
        const profilePicInput = document.getElementById('profilePics');
        const profilePicPreview = document.getElementById('profilePicPreview');
        const videoInput = document.getElementById('profileVideo');
        const videoPreview = document.getElementById('videoPreview');
        
        profilePicInput.addEventListener('change', function() {
            profilePicPreview.innerHTML = '';
            const files = Array.from(this.files);
            
            if (files.length > 3) {
                showAlert('You can upload maximum 3 photos', 'error');
                this.value = '';
                return;
            }
            
            files.forEach(file => {
                if (!file.type.match('image.*')) {
                    showAlert('Only image files are allowed', 'error');
                    this.value = '';
                    profilePicPreview.innerHTML = '';
                    return;
                }
                
                const reader = new FileReader();
                reader.onload = function(e) {
                    const imgContainer = document.createElement('div');
                    imgContainer.className = 'preview-image';
                    
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    
                    const removeBtn = document.createElement('button');
                    removeBtn.innerHTML = '&times;';
                    removeBtn.className = 'remove-image';
                    removeBtn.addEventListener('click', function() {
                        imgContainer.remove();
                        // Update files list (would need more complex handling in a real app)
                    });
                    
                    imgContainer.appendChild(img);
                    imgContainer.appendChild(removeBtn);
                    profilePicPreview.appendChild(imgContainer);
                };
                reader.readAsDataURL(file);
            });
        });
        
        videoInput.addEventListener('change', function() {
            const file = this.files[0];
            if (!file) return;
            
            if (!file.type.match('video.*')) {
                showAlert('Only video files are allowed', 'error');
                this.value = '';
                return;
            }
            
            const reader = new FileReader();
            reader.onload = function(e) {
                videoPreview.innerHTML = '';
                
                const video = document.createElement('video');
                video.src = e.target.result;
                video.controls = true;
                video.style.maxWidth = '100%';
                
                const removeBtn = document.createElement('button');
                removeBtn.innerHTML = '&times;';
                removeBtn.className = 'remove-video';
                removeBtn.addEventListener('click', function() {
                    videoPreview.innerHTML = '';
                    videoInput.value = '';
                });
                
                videoPreview.appendChild(video);
                videoPreview.appendChild(removeBtn);
            };
            reader.readAsDataURL(file);
        });
        
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            const password = document.getElementById('signupPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            if (password !== confirmPassword) {
                showAlert('Passwords do not match', 'error');
                return;
            }
            
            if (profilePicInput.files.length < 3) {
                showAlert('Please upload at least 3 profile pictures', 'error');
                return;
            }
            
            // Collect form data
            const userData = {
                name: document.getElementById('signupName').value,
                email: document.getElementById('signupEmail').value,
                password: password,
                dob: document.getElementById('signupDob').value,
                gender: document.getElementById('signupGender').value,
                interestedIn: Array.from(document.getElementById('interestedIn').selectedOptions).map(opt => opt.value),
                category: document.getElementById('signupCategory').value,
                bio: document.getElementById('signupBio').value,
                // In a real app, you would upload the files to a server
                profilePics: Array.from(profilePicInput.files).map(file => file.name),
                profileVideo: videoInput.files[0] ? videoInput.files[0].name : null,
                subscription: 'free', // Default to free tier
                joinedDate: new Date().toISOString()
            };
            
            // Register user
            const result = registerUser(userData);
            if (result.success) {
                showAlert('Registration successful! Redirecting...', 'success');
                setTimeout(() => {
                    window.location.href = 'subscription.html';
                }, 1500);
            } else {
                showAlert(result.message, 'error');
            }
        });
    }
    
    // Logout Button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logoutUser);
    }
    
    // Check if user is logged in
    const currentUser = JSON.parse(localStorage.getItem('metadatez_user'));
    if (currentUser) {
        // Update UI for logged in user
        const userGreeting = document.getElementById('userGreeting');
        if (userGreeting) {
            userGreeting.textContent = `Hi, ${currentUser.name.split(' ')[0]}`;
        }
        
        const loginLinks = document.querySelectorAll('.login-link');
        const logoutLinks = document.querySelectorAll('.logout-link');
        
        loginLinks.forEach(link => link.style.display = 'none');
        logoutLinks.forEach(link => link.style.display = 'block');
    }
    
    // Store redirect URL for after login
    if (window.location.pathname.includes('categories/') || window.location.pathname.includes('profile.html')) {
        localStorage.setItem('redirectUrl', window.location.href);
    }
});

function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    
    const container = document.querySelector('.auth-container') || document.querySelector('main');
    container.insertBefore(alertDiv, container.firstChild);
    
    setTimeout(() => {
        alertDiv.style.opacity = '0';
        setTimeout(() => alertDiv.remove(), 500);
    }, 3000);
}