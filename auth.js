// Authentication specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize form validation
    const registrationForm = document.querySelector('.registration-form');
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            // Validate password match
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            
            if (password !== confirmPassword) {
                e.preventDefault();
                alert('Quantum password fields do not match!');
                document.getElementById('password').style.borderColor = 'var(--secondary)';
                document.getElementById('confirm-password').style.borderColor = 'var(--secondary)';
                return;
            }
            
            // Validate age
            const age = document.getElementById('age').value;
            if (age && (age < 18 || age > 120)) {
                e.preventDefault();
                alert('Please enter a valid age between 18 and 120');
                document.getElementById('age').style.borderColor = 'var(--secondary)';
                return;
            }
            
            // Validate image uploads
            const imageInputs = document.querySelectorAll('.upload-box:not(.video-upload-box) input[type="file"]');
            let allImagesUploaded = true;
            
            imageInputs.forEach(input => {
                if (!input.files || input.files.length === 0) {
                    allImagesUploaded = false;
                    input.closest('.upload-box').style.borderColor = 'var(--secondary)';
                }
            });
            
            if (!allImagesUploaded) {
                e.preventDefault();
                alert('Please upload all required holographic images to proceed');
                return;
            }
            
            // If all validations pass, the form will submit
        });
    }
    
    // Add futuristic effects to form inputs
    const inputs = document.querySelectorAll('.cyber-input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.boxShadow = '0 0 15px rgba(0, 255, 252, 0.6)';
            this.style.borderColor = 'var(--primary)';
        });
        
        input.addEventListener('blur', function() {
            this.style.boxShadow = 'none';
            this.style.borderColor = 'rgba(0, 255, 252, 0.3)';
        });
    });
    
    // Add special effect to select dropdowns
    const selects = document.querySelectorAll('select.cyber-input');
    selects.forEach(select => {
        select.addEventListener('change', function() {
            if (this.value) {
                this.style.color = 'var(--primary)';
                this.style.textShadow = '0 0 5px var(--primary)';
            } else {
                this.style.color = 'var(--light)';
                this.style.textShadow = 'none';
            }
        });
    });
});

// Quantum encryption simulation for passwords
function quantumEncrypt(password) {
    // This is a mock function - in a real app, use proper hashing
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
        const char = password.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash |= 0; // Convert to 32bit integer
    }
    return 'quantum:' + Math.abs(hash).toString(16);
}