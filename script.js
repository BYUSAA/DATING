// Main JavaScript for the website
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all animations and effects
    
    // Vanishing button effect
    const buttons = document.querySelectorAll('.vanishing-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create QR dissolve effect
            const qrEffect = document.createElement('div');
            qrEffect.className = 'page-transition active';
            qrEffect.innerHTML = '<div class="qr-disolve"></div>';
            document.body.appendChild(qrEffect);
            
            // Navigate after animation
            setTimeout(() => {
                window.location.href = this.href;
            }, 1500);
        });
    });
    
    // Holographic hover effects
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const x = e.clientX - this.getBoundingClientRect().left;
            const y = e.clientY - this.getBoundingClientRect().top;
            
            this.style.setProperty('--x', `${x}px`);
            this.style.setProperty('--y', `${y}px`);
            
            const glow = this.querySelector('.holographic-icon');
            if (glow) {
                glow.style.transform = `translate(${(x - this.offsetWidth/2) * 0.1}px, ${(y - this.offsetHeight/2) * 0.1}px)`;
            }
        });
    });
    
    // Binary rain effect for header
    const header = document.querySelector('.cyber-header');
    if (header) {
        header.addEventListener('mousemove', function(e) {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            this.style.setProperty('--mouse-x', x);
            this.style.setProperty('--mouse-y', y);
        });
    }
    
    // Initialize media upload functionality for registration page
    if (document.querySelector('.registration-container')) {
        initMediaUpload();
    }
});

// Media upload functionality
function initMediaUpload() {
    const imageUploads = document.querySelectorAll('.upload-box input[type="file"]');
    const videoUpload = document.querySelector('.video-upload-box input[type="file"]');
    
    // Image upload handling
    imageUploads.forEach((upload, index) => {
        upload.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    const uploadBox = upload.closest('.upload-box');
                    uploadBox.innerHTML = `
                        <div class="preview-container">
                            <img src="${event.target.result}" class="preview-image" alt="Preview">
                            <button class="remove-btn" data-index="${index}">×</button>
                        </div>
                    `;
                    
                    // Add remove functionality
                    uploadBox.querySelector('.remove-btn').addEventListener('click', function() {
                        upload.value = '';
                        resetUploadBox(uploadBox, index);
                    });
                };
                reader.readAsDataURL(file);
            }
        });
    });
    
    // Video upload handling
    if (videoUpload) {
        videoUpload.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const url = URL.createObjectURL(file);
                const uploadBox = videoUpload.closest('.upload-box');
                uploadBox.innerHTML = `
                    <div class="preview-container">
                        <video controls class="preview-image">
                            <source src="${url}" type="${file.type}">
                        </video>
                        <button class="remove-btn video-remove">×</button>
                    </div>
                `;
                
                // Add remove functionality
                uploadBox.querySelector('.video-remove').addEventListener('click', function() {
                    videoUpload.value = '';
                    resetUploadBox(uploadBox, 'video');
                });
            }
        });
    }
    
    // Reset upload box to initial state
    function resetUploadBox(box, type) {
        if (typeof type === 'number') {
            box.innerHTML = `
                <i class="fas fa-camera"></i>
                <span>Upload Photo ${type + 1}</span>
                <input type="file" accept="image/*" required>
            `;
        } else {
            box.innerHTML = `
                <i class="fas fa-video"></i>
                <span>Upload Video (Optional)</span>
                <input type="file" accept="video/*">
            `;
        }
        
        // Reinitialize the event listener
        const input = box.querySelector('input');
        input.addEventListener('change', initMediaUpload);
    }
    
    // Form submission with animation
    const registrationForm = document.querySelector('.registration-form');
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Check if all required images are uploaded
            const imageInputs = document.querySelectorAll('.upload-box:not(.video-upload-box) input[type="file"]');
            let allImagesUploaded = true;
            
            imageInputs.forEach(input => {
                if (!input.files || input.files.length === 0) {
                    allImagesUploaded = false;
                    input.closest('.upload-box').style.borderColor = 'var(--secondary)';
                }
            });
            
            if (!allImagesUploaded) {
                alert('Please upload all required photos before submitting.');
                return;
            }
            
            // Show loading animation
            const submitBtn = document.querySelector('.submit-btn');
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<div class="loading-spinner"></div> Processing...';
            
            // Simulate upload progress
            const progressBar = document.querySelector('.progress');
            let progress = 0;
            const interval = setInterval(() => {
                progress += Math.random() * 10;
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(interval);
                    
                    // Show success animation
                    setTimeout(() => {
                        const qrEffect = document.createElement('div');
                        qrEffect.className = 'page-transition active';
                        qrEffect.innerHTML = '<div class="qr-disolve success"></div>';
                        document.body.appendChild(qrEffect);
                        
                        // Redirect after animation
                        setTimeout(() => {
                            window.location.href = 'profile.html';
                        }, 1500);
                    }, 500);
                }
                progressBar.style.width = `${progress}%`;
            }, 300);
        });
    }
}

// Page transition handling
window.addEventListener('load', function() {
    const pageTransition = document.querySelector('.page-transition');
    if (pageTransition) {
        setTimeout(() => {
            pageTransition.classList.remove('active');
            setTimeout(() => {
                pageTransition.remove();
            }, 500);
        }, 500);
    }
});

// Load members for category pages
function loadCategoryMembers(category) {
    const membersContainer = document.querySelector('.members-container');
    if (!membersContainer) return;

    // Clear existing members
    membersContainer.innerHTML = '';

    // Sample data - in a real app, this would come from an API
    const sampleMembers = [
        { 
            name: 'QuantumExplorer', 
            avatar: 'avatar1.jpg', 
            location: 'Digital Dimension', 
            bio: 'Adventurer of virtual realms seeking meaningful connections across dimensions',
            compatibility: '98%'
        },
        { 
            name: 'NeuralNova', 
            avatar: 'avatar2.jpg', 
            location: 'Quantum Cloud', 
            bio: 'AI enthusiast exploring the intersection of technology and human connection',
            compatibility: '95%'
        },
        { 
            name: 'CyberSage', 
            avatar: 'avatar3.jpg', 
            location: 'Neural Network', 
            bio: 'Wisdom seeker in the age of digital consciousness',
            compatibility: '93%'
        },
        { 
            name: 'HoloHacker', 
            avatar: 'avatar4.jpg', 
            location: 'VR Space', 
            bio: 'Creating immersive experiences one line of code at a time',
            compatibility: '91%'
        },
        { 
            name: 'DataDruid', 
            avatar: 'avatar5.jpg', 
            location: 'The Cloud', 
            bio: 'Harnessing the power of data to forge genuine connections',
            compatibility: '89%'
        },
        { 
            name: 'ByteBard', 
            avatar: 'avatar6.jpg', 
            location: 'Silicon Valley', 
            bio: 'Poet of the digital age, composing connections in binary and beyond',
            compatibility: '87%'
        }
    ];

    // Add members to the container
    sampleMembers.forEach(member => {
        const memberCard = document.createElement('div');
        memberCard.className = 'member-card';
        memberCard.innerHTML = `
            <div class="member-avatar" style="background: url('./assets/images/${member.avatar}') center/cover no-repeat;"></div>
            <div class="member-info">
                <h3 class="member-name">${member.name}</h3>
                <div class="member-location">${member.location}</div>
                <p class="member-bio">${member.bio}</p>
                <div class="member-compatibility">${member.compatibility} match</div>
            </div>
            <div class="member-actions">
                <button class="member-action"><i class="fas fa-comment"></i></button>
                <button class="member-action"><i class="fas fa-heart"></i></button>
            </div>
        `;
        membersContainer.appendChild(memberCard);
    });

    // Add click event to load more button
    const loadMoreBtn = document.querySelector('.load-more');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // In a real app, this would load more members
            alert(`Loading more ${category} members...`);
        });
    }
}

// Initialize all category pages
function initCategoryPages() {
    const categoryHero = document.querySelector('.category-hero');
    if (categoryHero) {
        // Add parallax effect to category hero
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            categoryHero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        });
    }
}

// Initialize all pages when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initCategoryPages();
    
    // Add any other page-specific initializations here
    if (document.querySelector('.profile-page')) {
        initProfilePage();
    }
    
    if (document.querySelector('.subscription-plans')) {
        initSubscriptionPage();
    }
});