// Authentication functions
class Auth {
    constructor() {
        this.users = JSON.parse(localStorage.getItem('metadatez_users')) || [];
        this.currentUser = JSON.parse(localStorage.getItem('metadatez_currentUser')) || null;
    }
    
    // Sign up new user
    signUp(userData) {
        // Check if user already exists
        const userExists = this.users.some(user => user.email === userData.email);
        if (userExists) {
            return { success: false, message: 'Email already registered' };
        }
        
        // Create new user
        const newUser = {
            id: this.generateId(),
            ...userData,
            createdAt: new Date().toISOString(),
            subscription: 'free',
            credits: 0,
            photos: [],
            category: userData.category || 'dating',
            subcategories: userData.subcategories || []
        };
        
        this.users.push(newUser);
        this.saveUsers();
        
        // Auto-login
        this.currentUser = newUser;
        localStorage.setItem('metadatez_currentUser', JSON.stringify(newUser));
        
        return { success: true, user: newUser };
    }
    
    // Log in user
    login(email, password) {
        const user = this.users.find(u => u.email === email && u.password === password);
        if (!user) {
            return { success: false, message: 'Invalid email or password' };
        }
        
        this.currentUser = user;
        localStorage.setItem('metadatez_currentUser', JSON.stringify(user));
        return { success: true, user };
    }
    
    // Log out user
    logout() {
        this.currentUser = null;
        localStorage.removeItem('metadatez_currentUser');
        return { success: true };
    }
    
    // Check if user is logged in
    isAuthenticated() {
        return this.currentUser !== null;
    }
    
    // Get current user
    getCurrentUser() {
        return this.currentUser;
    }
    
    // Update user profile
    updateProfile(userId, updates) {
        const userIndex = this.users.findIndex(u => u.id === userId);
        if (userIndex === -1) return false;
        
        this.users[userIndex] = { ...this.users[userIndex], ...updates };
        
        if (this.currentUser && this.currentUser.id === userId) {
            this.currentUser = this.users[userIndex];
            localStorage.setItem('metadatez_currentUser', JSON.stringify(this.currentUser));
        }
        
        this.saveUsers();
        return true;
    }
    
    // Add photo to user profile
    addPhoto(userId, photoUrl) {
        const user = this.users.find(u => u.id === userId);
        if (!user) return false;
        
        // Check subscription limits
        if (user.subscription === 'free' && user.photos.length >= 3) {
            return { success: false, message: 'Free accounts limited to 3 photos' };
        }
        
        if (user.subscription === 'classic' && user.photos.length >= 10) {
            return { success: false, message: 'Classic accounts limited to 10 photos' };
        }
        
        user.photos.push(photoUrl);
        this.updateProfile(userId, { photos: user.photos });
        return { success: true };
    }
    
    // Remove photo from user profile
    removePhoto(userId, photoIndex) {
        const user = this.users.find(u => u.id === userId);
        if (!user || !user.photos[photoIndex]) return false;
        
        user.photos.splice(photoIndex, 1);
        this.updateProfile(userId, { photos: user.photos });
        return true;
    }
    
    // Helper methods
    generateId() {
        return Math.random().toString(36).substr(2, 9);
    }
    
    saveUsers() {
        localStorage.setItem('metadatez_users', JSON.stringify(this.users));
    }
}

// Initialize auth
const auth = new Auth();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = auth;
}