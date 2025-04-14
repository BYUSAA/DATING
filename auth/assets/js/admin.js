document.addEventListener('DOMContentLoaded', function() {
    // Sidebar toggle for mobile
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.admin-sidebar');
    
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
    }
    
    // Admin profile dropdown
    const adminProfile = document.querySelector('.admin-profile');
    if (adminProfile) {
        adminProfile.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }
    
    // Notification dropdown
    const notificationBtn = document.querySelector('.notification-btn');
    if (notificationBtn) {
        notificationBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            // In a real app, this would toggle a dropdown
            alert('Notifications would appear here');
        });
    }
    
    // Close dropdowns when clicking elsewhere
    document.addEventListener('click', function() {
        if (adminProfile) adminProfile.classList.remove('active');
    });
    
    // Prevent dropdown close when clicking inside
    const dropdowns = document.querySelectorAll('.admin-profile, .notification-btn');
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    });
    
    // FAQ accordion in contact page
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            this.parentElement.classList.toggle('active');
            const answer = this.nextElementSibling;
            const icon = this.querySelector('i');
            
            if (this.parentElement.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            } else {
                answer.style.maxHeight = '0';
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            }
        });
    });
    
    // Billing toggle in subscription page
    const billingToggle = document.getElementById('billingToggle');
    if (billingToggle) {
        billingToggle.addEventListener('change', function() {
            const monthlyPrices = document.querySelectorAll('.monthly-price');
            const yearlyPrices = document.querySelectorAll('.yearly-price');
            
            if (this.checked) {
                monthlyPrices.forEach(price => price.style.display = 'none');
                yearlyPrices.forEach(price => price.style.display = 'block');
            } else {
                monthlyPrices.forEach(price => price.style.display = 'block');
                yearlyPrices.forEach(price => price.style.display = 'none');
            }
        });
    }
    
    // Admin login check
    checkAdminAuth();
    
    function checkAdminAuth() {
        const isAdmin = localStorage.getItem('isAdmin') === 'true';
        if (!isAdmin && window.location.pathname.includes('admin-dashboard.html')) {
            window.location.href = '../auth/login.html';
        }
    }
    
    // Logout functionality
    const logoutButtons = document.querySelectorAll('.logout, .logout-btn');
    logoutButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('isAdmin');
            localStorage.removeItem('userEmail');
            window.location.href = '../index.html';
        });
    });
    
    // Form submissions
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (this.classList.contains('contact-form')) {
                alert('Thank you for your message! We will get back to you soon.');
                this.reset();
            } else if (this.classList.contains('payment-form')) {
                alert('Payment processed successfully! Thank you for upgrading.');
                // In a real app, this would redirect to a success page
            }
        });
    });
    
    // File upload previews
    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach(input => {
        input.addEventListener('change', function() {
            const previewId = this.id + 'Preview';
            const previewContainer = document.getElementById(previewId);
            
            if (previewContainer) {
                previewContainer.innerHTML = '';
                
                if (this.files && this.files.length > 0) {
                    for (let i = 0; i < this.files.length; i++) {
                        const reader = new FileReader();
                        reader.onload = function(e) {
                            if (input.accept.includes('image')) {
                                const img = document.createElement('img');
                                img.src = e.target.result;
                                img.classList.add('preview-thumbnail');
                                previewContainer.appendChild(img);
                            } else if (input.accept.includes('video')) {
                                const video = document.createElement('video');
                                video.src = e.target.result;
                                video.controls = true;
                                previewContainer.appendChild(video);
                            }
                        };
                        reader.readAsDataURL(this.files[i]);
                    }
                }
            }
        });
    });
    
    // Theme switcher (shared with main site)
    const themeSwitcher = document.getElementById('theme-switcher');
    if (themeSwitcher) {
        themeSwitcher.addEventListener('click', function() {
            const body = document.body;
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            const icon = this.querySelector('i');
            if (newTheme === 'dark') {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            } else {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            }
        });
    }
});