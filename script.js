// Theme Toggle
const themeBtn = document.getElementById('themeBtn');
const body = document.body;

// Check for saved theme preference or use preferred color scheme
const currentTheme = localStorage.getItem('theme') || 
                     (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
setTheme(currentTheme);

themeBtn.addEventListener('click', () => {
    const newTheme = body.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
});

function setTheme(theme) {
    body.setAttribute('data-theme', theme);
    const icon = themeBtn.querySelector('i');
    icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
}

// Hover effect for category cards
const categoryCards = document.querySelectorAll('.category-card');
categoryCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--x', `${x}px`);
        card.style.setProperty('--y', `${y}px`);
    });
});

// Navigation function
function navigateTo(page) {
    // Check if user is logged in (simplified for demo)
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (!isLoggedIn && page !== 'login.html' && page !== 'signup.html') {
        window.location.href = 'login.html';
    } else {
        window.location.href = page;
    }
}

// Form validation for login/signup
function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('.form-input');
    
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
        }
    });
    
    return isValid;
}

// File upload preview
function setupFileUpload() {
    const uploadAreas = document.querySelectorAll('.upload-area');
    
    uploadAreas.forEach(area => {
        const input = area.querySelector('input[type="file"]');
        const preview = area.querySelector('.upload-preview');
        
        area.addEventListener('click', () => {
            input.click();
        });
        
        input.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    preview.src = event.target.result;
                    area.classList.add('has-image');
                };
                reader.readAsDataURL(file);
            }
        });
    });
}

// Initialize functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check if we're on a page with file upload
    if (document.querySelector('.upload-area')) {
        setupFileUpload();
    }
    
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.auth-btn, .select-plan-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple element
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            
            // Position the ripple
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            // Add ripple to button
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 1000);
        });
    });
    
    // Simulate loading user data for profile pages
    if (document.querySelector('.profile-page')) {
        simulateProfileData();
    }
    
    // Simulate subscription check
    if (document.querySelector('.message-input')) {
        checkSubscription();
    }
});

// Simulate profile data loading
function simulateProfileData() {
    const profiles = [
        {
            name: 'Alex Johnson',
            age: 28,
            location: 'New York, USA',
            bio: 'Adventure seeker and tech enthusiast. Looking for someone to share life\'s journey with.',
            images: [
                'assets/images/profile1.jpg',
                'assets/images/profile2.jpg',
                'assets/images/profile3.jpg'
            ]
        },
        // Add more simulated profiles as needed
    ];
    
    // Populate profile data
    const profile = profiles[0]; // For demo, just use first profile
    document.querySelector('.profile-name').textContent = profile.name;
    document.querySelector('.profile-location').textContent = `${profile.age} • ${profile.location}`;
    document.querySelector('.profile-bio').textContent = profile.bio;
    
    // Set profile image
    const avatar = document.querySelector('.profile-avatar');
    if (avatar) {
        avatar.src = profile.images[0];
    }
    
    // Populate gallery
    const gallery = document.querySelector('.profile-gallery');
    if (gallery) {
        gallery.innerHTML = '';
        profile.images.forEach((img, index) => {
            if (index === 0) return; // Skip first image as it's the avatar
            
            const item = document.createElement('div');
            item.className = 'gallery-item';
            item.innerHTML = `<img src="${img}" alt="Profile image ${index + 1}">`;
            gallery.appendChild(item);
        });
    }
}

// Check subscription status and apply limits
function checkSubscription() {
    const subscription = localStorage.getItem('subscription') || 'free';
    const messageInput = document.querySelector('.message-field');
    const sendBtn = document.querySelector('.send-btn');
    const attachmentBtn = document.querySelector('.attachment-btn');
    
    if (subscription === 'free') {
        // Apply free tier limits
        const messageCount = parseInt(localStorage.getItem('messageCount') || '0');
        const mediaCount = parseInt(localStorage.getItem('mediaCount') || '0');
        
        if (messageCount >= 10) {
            messageInput.disabled = true;
            messageInput.placeholder = 'Upgrade to send more messages';
            sendBtn.disabled = true;
            showUpgradeModal();
        }
        
        if (mediaCount >= 2) {
            attachmentBtn.disabled = true;
            attachmentBtn.title = 'Upgrade to send more media';
        }
    }
}

// Show upgrade modal
function showUpgradeModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="modal-close">&times;</span>
            <div class="modal-body">
                <h2>Upgrade Your Subscription</h2>
                <p>You've reached the limit for your free account. Upgrade to continue messaging and enjoy more features!</p>
                <a href="subscription.html" class="select-plan-btn">View Subscription Plans</a>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.style.display = 'flex';
    
    // Close modal
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.removeChild(modal);
    });
    
    // Close when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.removeChild(modal);
        }
    });
}

// Simulate sending a message
function sendMessage() {
    const subscription = localStorage.getItem('subscription') || 'free';
    let messageCount = parseInt(localStorage.getItem('messageCount') || '0');
    
    if (subscription === 'free' && messageCount >= 10) {
        showUpgradeModal();
        return false;
    }
    
    // Increment message count for free tier
    if (subscription === 'free') {
        messageCount++;
        localStorage.setItem('messageCount', messageCount.toString());
    }
    
    return true;
}

// Initialize message functionality
if (document.querySelector('.message-input')) {
    const sendBtn = document.querySelector('.send-btn');
    const messageField = document.querySelector('.message-field');
    
    sendBtn.addEventListener('click', () => {
        if (messageField.value.trim()) {
            if (sendMessage()) {
                // Add message to UI
                const messageContainer = document.querySelector('.message-container');
                const newMessage = document.createElement('div');
                newMessage.className = 'message sent';
                newMessage.innerHTML = `
                    <p>${messageField.value}</p>
                    <div class="message-time">Just now</div>
                `;
                messageContainer.appendChild(newMessage);
                messageField.value = '';
                
                // Scroll to bottom
                messageContainer.scrollTop = messageContainer.scrollHeight;
                
                // Simulate AI response after delay
                setTimeout(() => {
                    simulateAIResponse();
                }, 1000);
            }
        }
    });
    
    // Allow pressing Enter to send (but Shift+Enter for new line)
    messageField.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendBtn.click();
        }
    });
}

// Simulate AI response
function simulateAIResponse() {
    const aiPrompts = [
        "That's really interesting! Tell me more about that.",
        "I'd love to hear more about your experiences with that.",
        "That sounds amazing! What else do you enjoy doing?",
        "I can relate to that. How did you get into it?",
        "Fascinating! What's your favorite part about that?"
    ];
    
    const randomPrompt = aiPrompts[Math.floor(Math.random() * aiPrompts.length)];
    const messageContainer = document.querySelector('.message-container');
    
    // Add AI prompt suggestion
    const aiPrompt = document.createElement('div');
    aiPrompt.className = 'ai-prompt';
    aiPrompt.innerHTML = `
        <p>${randomPrompt}</p>
        <button class="use-prompt-btn">Use This</button>
    `;
    messageContainer.appendChild(aiPrompt);
    
    // Scroll to bottom
    messageContainer.scrollTop = messageContainer.scrollHeight;
    
    // Set up use prompt button
    const usePromptBtn = aiPrompt.querySelector('.use-prompt-btn');
    const messageField = document.querySelector('.message-field');
    
    usePromptBtn.addEventListener('click', () => {
        messageField.value = randomPrompt;
        aiPrompt.remove();
        messageField.focus();
    });
}