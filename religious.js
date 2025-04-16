// Religious Page Specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize accordion functionality
    initAccordion();
    
    // Initialize denomination dropdown based on religion selection
    setupDenominationDropdown();
    
    // Initialize testimonial slider
    initTestimonialSlider();
    
    // Initialize community carousel
    initCommunityCarousel();
    
    // Handle faith card clicks
    setupFaithCardNavigation();
});

function initAccordion() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const item = this.parentElement;
            const isActive = item.classList.contains('active');
            
            // Close all items first
            document.querySelectorAll('.accordion-item').forEach(i => {
                i.classList.remove('active');
            });
            
            // Open current if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

function setupDenominationDropdown() {
    const religionSelect = document.getElementById('religion');
    const denominationSelect = document.getElementById('denomination');
    
    // Denominations by religion
    const denominations = {
        christian: [
            { value: 'any', text: 'Any Denomination' },
            { value: 'baptist', text: 'Baptist' },
            { value: 'methodist', text: 'Methodist' },
            { value: 'pentecostal', text: 'Pentecostal' },
            { value: 'lutheran', text: 'Lutheran' },
            { value: 'presbyterian', text: 'Presbyterian' }
        ],
        catholic: [
            { value: 'any', text: 'Any' },
            { value: 'roman', text: 'Roman Catholic' },
            { value: 'eastern', text: 'Eastern Catholic' }
        ],
        muslim: [
            { value: 'any', text: 'Any' },
            { value: 'sunni', text: 'Sunni' },
            { value: 'shia', text: 'Shia' }
        ],
        jewish: [
            { value: 'any', text: 'Any Movement' },
            { value: 'orthodox', text: 'Orthodox' },
            { value: 'conservative', text: 'Conservative' },
            { value: 'reform', text: 'Reform' }
        ]
    };
    
    religionSelect.addEventListener('change', function() {
        const religion = this.value;
        denominationSelect.innerHTML = '<option value="any">Any</option>';
        
        if (denominations[religion]) {
            denominationSelect.disabled = false;
            denominations[religion].forEach(denomination => {
                const option = document.createElement('option');
                option.value = denomination.value;
                option.textContent = denomination.text;
                denominationSelect.appendChild(option);
            });
        } else {
            denominationSelect.disabled = true;
        }
    });
}

function initTestimonialSlider() {
    const slider = document.querySelector('.testimonial-slider');
    if (!slider) return;
    
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
        if(!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
    });
}

function initCommunityCarousel() {
    const carousel = document.querySelector('.communities-carousel');
    if (!carousel) return;
    
    // Similar drag functionality as testimonial slider
    let isDown = false;
    let startX;
    let scrollLeft;

    carousel.addEventListener('mousedown', (e) => {
        isDown = true;
        carousel.classList.add('active');
        startX = e.pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
    });

    carousel.addEventListener('mouseleave', () => {
        isDown = false;
        carousel.classList.remove('active');
    });

    carousel.addEventListener('mouseup', () => {
        isDown = false;
        carousel.classList.remove('active');
    });

    carousel.addEventListener('mousemove', (e) => {
        if(!isDown) return;
        e.preventDefault();
        const x = e.pageX - carousel.offsetLeft;
        const walk = (x - startX) * 2;
        carousel.scrollLeft = scrollLeft - walk;
    });
}

function setupFaithCardNavigation() {
    const faithCards = document.querySelectorAll('.faith-card');
    
    faithCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't navigate if clicking on the button
            if (e.target.tagName === 'BUTTON') return;
            
            const faithType = this.getAttribute('data-faith');
            // In a real app, this would filter the main profiles grid
            alert(`Showing ${faithType} profiles. In a real app, this would filter the results.`);
        });
    });
}

function scrollToTestimonials() {
    const testimonials = document.getElementById('testimonials');
    if (testimonials) {
        testimonials.scrollIntoView({ behavior: 'smooth' });
    }
}

// Make functions available globally if needed
window.scrollToTestimonials = scrollToTestimonials;