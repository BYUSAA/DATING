// Authentication Functions
class Auth {
    constructor() {
        this.users = JSON.parse(localStorage.getItem('metadatezUsers')) || [];
        this.currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
    }
    
    // Save users to localStorage
    saveUsers() {
        localStorage.setItem('metadatezUsers', JSON.stringify(this.users));
    }
    
    // Register new user
    register(userData) {
        // Check if email already exists
        if (this.users.some(user => user.email === userData.email)) {
            return { success: false, message: 'Email already registered' };
        }
        
        // Add new user
        const newUser = {
            id: Date.now().toString(),
            ...userData,
            createdAt: new Date().toISOString(),
            subscription: 'free',
            credits: 0,
            profileComplete: false,
            photos: [],
            videos: []
        };
        
        this.users.push(newUser);
        this.saveUsers();
        
        return { success: true, user: newUser };
    }
    
    // Login user
    login(email, password) {
        const user = this.users.find(u => u.email === email && u.password === password);
        
        if (user) {
            this.currentUser = user;
            localStorage.setItem('currentUser', JSON.stringify(user));
            localStorage.setItem('isLoggedIn', 'true');
            return { success: true, user };
        } else {
            return { success: false, message: 'Invalid email or password' };
        }
    }
    
    // Logout user
    logout() {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
        localStorage.setItem('isLoggedIn', 'false');
    }
    
    // Update user profile
    updateProfile(userId, updates) {
        const userIndex = this.users.findIndex(u => u.id === userId);
        
        if (userIndex !== -1) {
            this.users[userIndex] = { ...this.users[userIndex], ...updates };
            this.saveUsers();
            
            if (this.currentUser && this.currentUser.id === userId) {
                this.currentUser = this.users[userIndex];
                localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
            }
            
            return { success: true, user: this.users[userIndex] };
        }
        
        return { success: false, message: 'User not found' };
    }
    
    // Add media to user profile
    addMedia(userId, type, file) {
        if (type !== 'photo' && type !== 'video') {
            return { success: false, message: 'Invalid media type' };
        }
        
        const userIndex = this.users.findIndex(u => u.id === userId);
        
        if (userIndex !== -1) {
            const mediaItem = {
                id: Date.now().toString(),
                type,
                url: URL.createObjectURL(file),
                uploadedAt: new Date().toISOString()
            };
            
            if (type === 'photo') {
                // Check photo limit based on subscription
                const photoLimit = this.getPhotoLimit(this.users[userIndex].subscription);
                if (this.users[userIndex].photos.length >= photoLimit) {
                    return { success: false, message: `Photo limit reached (${photoLimit})` };
                }
                this.users[userIndex].photos.push(mediaItem);
            } else {
                // Check video limit based on subscription
                const videoLimit = this.getVideoLimit(this.users[userIndex].subscription);
                if (this.users[userIndex].videos.length >= videoLimit) {
                    return { success: false, message: `Video limit reached (${videoLimit})` };
                }
                this.users[userIndex].videos.push(mediaItem);
            }
            
            this.saveUsers();
            
            if (this.currentUser && this.currentUser.id === userId) {
                this.currentUser = this.users[userIndex];
                localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
            }
            
            return { success: true, media: mediaItem };
        }
        
        return { success: false, message: 'User not found' };
    }
    
    // Remove media from user profile
    removeMedia(userId, type, mediaId) {
        const userIndex = this.users.findIndex(u => u.id === userId);
        
        if (userIndex !== -1) {
            let mediaArray, mediaIndex;
            
            if (type === 'photo') {
                mediaArray = this.users[userIndex].photos;
            } else if (type === 'video') {
                mediaArray = this.users[userIndex].videos;
            } else {
                return { success: false, message: 'Invalid media type' };
            }
            
            mediaIndex = mediaArray.findIndex(m => m.id === mediaId);
            
            if (mediaIndex !== -1) {
                mediaArray.splice(mediaIndex, 1);
                this.saveUsers();
                
                if (this.currentUser && this.currentUser.id === userId) {
                    this.currentUser = this.users[userIndex];
                    localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
                }
                
                return { success: true };
            }
            
            return { success: false, message: 'Media not found' };
        }
        
        return { success: false, message: 'User not found' };
    }
    
    // Get photo limit based on subscription
    getPhotoLimit(subscription) {
        switch (subscription) {
            case 'free': return 3;
            case 'basic': return 10;
            case 'premium': return 30;
            case 'vip': return 100;
            default: return 3;
        }
    }
    
    // Get video limit based on subscription
    getVideoLimit(subscription) {
        switch (subscription) {
            case 'free': return 1;
            case 'basic': return 3;
            case 'premium': return 10;
            case 'vip': return 30;
            default: return 1;
        }
    }
    
    // Update user subscription
    updateSubscription(userId, newSubscription) {
        const userIndex = this.users.findIndex(u => u.id === userId);
        
        if (userIndex !== -1) {
            this.users[userIndex].subscription = newSubscription;
            this.saveUsers();
            
            if (this.currentUser && this.currentUser.id === userId) {
                this.currentUser = this.users[userIndex];
                localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
            }
            
            return { success: true, user: this.users[userIndex] };
        }
        
        return { success: false, message: 'User not found' };
    }
    
    // Check if user can send message (based on subscription limits)
    canSendMessage(userId) {
        const user = this.users.find(u => u.id === userId);
        if (!user) return false;
        
        // For demo purposes, we'll just check if user is logged in
        // In a real app, you'd check message limits, credits, etc.
        return true;
    }
}

// Initialize auth
const auth = new Auth();

// Login Form Handler
document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = this.querySelector('[name="email"]').value;
    const password = this.querySelector('[name="password"]').value;
    
    const result = auth.login(email, password);
    
    if (result.success) {
        // Show success message
        showAlert('Login successful! Redirecting...', 'success');
        
        // Redirect to home page after 1.5 seconds
        setTimeout(() => {
            window.location.href = '../index.html';
        }, 1500);
    } else {
        showAlert(result.message, 'error');
    }
});

// Signup Form Handler
document.getElementById('signupForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const userData = {
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
        gender: formData.get('gender'),
        dob: formData.get('dob'),
        location: formData.get('location'),
        interests: formData.getAll('interests')
    };
    
    const result = auth.register(userData);
    
    if (result.success) {
        // Automatically log in the new user
        auth.login(userData.email, userData.password);
        
        // Show success message
        showAlert('Registration successful! Please complete your profile.', 'success');
        
        // Redirect to profile page after 1.5 seconds
        setTimeout(() => {
            window.location.href = '../profile.html';
        }, 1500);
    } else {
        showAlert(result.message, 'error');
    }
});

// Logout Button Handler
document.getElementById('logoutBtn')?.addEventListener('click', function() {
    auth.logout();
    showAlert('Logged out successfully', 'success');
    setTimeout(() => {
        window.location.href = '../index.html';
    }, 1000);
});

// Profile Form Handler
document.getElementById('profileForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (!auth.currentUser) {
        showAlert('You must be logged in to update your profile', 'error');
        return;
    }
    
    const formData = new FormData(this);
    const updates = {
        bio: formData.get('bio'),
        lookingFor: formData.get('lookingFor'),
        category: formData.get('category'),
        subcategory: formData.get('subcategory'),
        profileComplete: true
    };
    
    const result = auth.updateProfile(auth.currentUser.id, updates);
    
    if (result.success) {
        showAlert('Profile updated successfully!', 'success');
    } else {
        showAlert(result.message, 'error');
    }
});

// Media Upload Handlers
document.getElementById('photoUpload')?.addEventListener('change', function(e) {
    if (!auth.currentUser) {
        showAlert('You must be logged in to upload photos', 'error');
        return;
    }
    
    const files = Array.from(this.files);
    if (files.length === 0) return;
    
    // For demo, we'll just process the first file
    const file = files[0];
    if (!file.type.startsWith('image/')) {
        showAlert('Please upload an image file', 'error');
        return;
    }
    
    const result = auth.addMedia(auth.currentUser.id, 'photo', file);
    if (result.success) {
        showAlert('Photo uploaded successfully!', 'success');
        // Refresh profile display
        displayUserProfile();
    } else {
        showAlert(result.message, 'error');
    }
});

document.getElementById('videoUpload')?.addEventListener('change', function(e) {
    if (!auth.currentUser) {
        showAlert('You must be logged in to upload videos', 'error');
        return;
    }
    
    const files = Array.from(this.files);
    if (files.length === 0) return;
    
    // For demo, we'll just process the first file
    const file = files[0];
    if (!file.type.startsWith('video/')) {
        showAlert('Please upload a video file', 'error');
        return;
    }
    
    const result = auth.addMedia(auth.currentUser.id, 'video', file);
    if (result.success) {
        showAlert('Video uploaded successfully!', 'success');
        // Refresh profile display
        displayUserProfile();
    } else {
        showAlert(result.message, 'error');
    }
});

// Display user profile
function displayUserProfile() {
    if (!auth.currentUser) return;
    
    const user = auth.currentUser;
    
    // Update profile info
    document.getElementById('profileName')?.textContent = user.name;
    document.getElementById('profileEmail')?.textContent = user.email;
    document.getElementById('profileLocation')?.textContent = user.location || 'Not specified';
    document.getElementById('profileBio')?.textContent = user.bio || 'No bio yet';
    document.getElementById('profileLookingFor')?.textContent = user.lookingFor || 'Not specified';
    document.getElementById('profileCategory')?.textContent = user.category || 'Not specified';
    document.getElementById('profileSubcategory')?.textContent = user.subcategory || 'Not specified';
    
    // Display photos
    const photosContainer = document.getElementById('profilePhotos');
    if (photosContainer) {
        photosContainer.innerHTML = '';
        
        if (user.photos.length === 0) {
            photosContainer.innerHTML = '<p>No photos uploaded yet</p>';
        } else {
            user.photos.forEach(photo => {
                const photoElement = document.createElement('div');
                photoElement.className = 'profile-photo';
                photoElement.innerHTML = `
                    <img src="${photo.url}" alt="Profile photo">
                    <button class="delete-photo" data-id="${photo.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                `;
                photosContainer.appendChild(photoElement);
            });
        }
    }
    
    // Display videos
    const videosContainer = document.getElementById('profileVideos');
    if (videosContainer) {
        videosContainer.innerHTML = '';
        
        if (user.videos.length === 0) {
            videosContainer.innerHTML = '<p>No videos uploaded yet</p>';
        } else {
            user.videos.forEach(video => {
                const videoElement = document.createElement('div');
                videoElement.className = 'profile-video';
                videoElement.innerHTML = `
                    <video controls src="${video.url}"></video>
                    <button class="delete-video" data-id="${video.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                `;
                videosContainer.appendChild(videoElement);
            });
        }
    }
    
    // Add event listeners for delete buttons
    document.querySelectorAll('.delete-photo').forEach(btn => {
        btn.addEventListener('click', function() {
            const photoId = this.getAttribute('data-id');
            const result = auth.removeMedia(user.id, 'photo', photoId);
            
            if (result.success) {
                showAlert('Photo deleted successfully', 'success');
                displayUserProfile();
            } else {
                showAlert(result.message, 'error');
            }
        });
    });
    
    document.querySelectorAll('.delete-video').forEach(btn => {
        btn.addEventListener('click', function() {
            const videoId = this.getAttribute('data-id');
            const result = auth.removeMedia(user.id, 'video', videoId);
            
            if (result.success) {
                showAlert('Video deleted successfully', 'success');
                displayUserProfile();
            } else {
                showAlert(result.message, 'error');
            }
        });
    });
}

// Show alert message
function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `cyber-alert ${type}`;
    alertDiv.textContent = message;
    
    document.body.appendChild(alertDiv);
    
    setTimeout(() => {
        alertDiv.classList.add('fade-out');
        setTimeout(() => {
            alertDiv.remove();
        }, 500);
    }, 3000);
}

// Initialize profile display when page loads
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('profile.html')) {
        displayUserProfile();
    }
    
    // Pre-fill profile form if user is logged in
    if (auth.currentUser && document.getElementById('profileForm')) {
        const user = auth.currentUser;
        document.getElementById('bio').value = user.bio || '';
        document.getElementById('lookingFor').value = user.lookingFor || '';
        document.getElementById('category').value = user.category || '';
        document.getElementById('subcategory').value = user.subcategory || '';
    }
    
    // Check if user is logged in and update UI
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const loginBtn = document.getElementById('loginBtn');
    const profileBtn = document.getElementById('profileBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    
    if (isLoggedIn) {
        if (loginBtn) loginBtn.style.display = 'none';
        if (profileBtn) profileBtn.style.display = 'block';
        if (logoutBtn) logoutBtn.style.display = 'block';
    } else {
        if (loginBtn) loginBtn.style.display = 'block';
        if (profileBtn) profileBtn.style.display = 'none';
        if (logoutBtn) logoutBtn.style.display = 'none';
    }
});