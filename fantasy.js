// Fantasy Page Interactive Elements
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Particle.js Background
    particlesJS.load('particles-js', 'particles-fantasy.json', function() {
        console.log('Particles loaded!');
    });

    // Initialize Fantasy Role Selection
    const roleCards = document.querySelectorAll('.role-card');
    roleCards.forEach(card => {
        card.addEventListener('click', function() {
            const role = this.getAttribute('data-race');
            alert(`Selected: ${role}. This would filter fantasy profiles.`);
        });
    });

    // Initialize Realm Carousel Drag
    const realmCarousel = document.querySelector('.realm-carousel');
    if (realmCarousel) {
        let isDragging = false;
        let startX, scrollLeft;

        realmCarousel.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.pageX - realmCarousel.offsetLeft;
            scrollLeft = realmCarousel.scrollLeft;
        });

        realmCarousel.addEventListener('mouseleave', () => {
            isDragging = false;
        });

        realmCarousel.addEventListener('mouseup', () => {
            isDragging = false;
        });

        realmCarousel.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const x = e.pageX - realmCarousel.offsetLeft;
            const walk = (x - startX) * 2;
            realmCarousel.scrollLeft = scrollLeft - walk;
        });
    }

    // Magic Button Effects
    const magicButtons = document.querySelectorAll('.magic-btn');
    magicButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.boxShadow = `0 0 20px ${getRandomColor()}`;
        });
    });

    // Tooltips for Fantasy Characters
    const characters = document.querySelectorAll('.character');
    characters.forEach(char => {
        const tooltip = char.getAttribute('data-tooltip');
        if (tooltip) {
            char.addEventListener('mouseenter', function() {
                showTooltip(this, tooltip);
            });
            char.addEventListener('mouseleave', function() {
                hideTooltip();
            });
        }
    });
});

function scrollToRealms() {
    const realmsSection = document.getElementById('realms');
    if (realmsSection) {
        realmsSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function showTooltip(element, text) {
    const tooltip = document.createElement('div');
    tooltip.className = 'fantasy-tooltip';
    tooltip.textContent = text;
    document.body.appendChild(tooltip);

    const rect = element.getBoundingClientRect();
    tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px`;
    tooltip.style.top = `${rect.top - 40}px`;
}

function hideTooltip() {
    const tooltip = document.querySelector('.fantasy-tooltip');
    if (tooltip) {
        tooltip.remove();
    }
}

function getRandomColor() {
    const colors = ['#9c4dff', '#ff6d00', '#00e5ff', '#ff4081'];
    return colors[Math.floor(Math.random() * colors.length)];
}