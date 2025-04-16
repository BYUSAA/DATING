// Polygamy Page Interactive Elements
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Accordion
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const item = this.parentElement;
            item.classList.toggle('active');
            
            // Close other items if needed
            // document.querySelectorAll('.accordion-item').forEach(i => {
            //     if (i !== item) i.classList.remove('active');
            // });
        });
    });

    // Tooltips for Poly Relationship Diagram
    const people = document.querySelectorAll('.person');
    people.forEach(person => {
        const tooltip = person.getAttribute('data-tooltip');
        if (tooltip) {
            person.addEventListener('mouseenter', function() {
                showPolyTooltip(this, tooltip);
            });
            person.addEventListener('mouseleave', function() {
                hidePolyTooltip();
            });
        }
    });

    // Apply Filters Button
    const applyBtn = document.getElementById('apply-poly-filters');
    if (applyBtn) {
        applyBtn.addEventListener('click', function() {
            const polyType = document.getElementById('poly-type').value;
            const experience = document.getElementById('experience').value;
            alert(`Searching for ${polyType} matches with ${experience} experience.`);
        });
    }
});

function scrollToGuide() {
    const guideSection = document.getElementById('guide');
    if (guideSection) {
        guideSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function showPolyTooltip(element, text) {
    const tooltip = document.createElement('div');
    tooltip.className = 'poly-tooltip';
    tooltip.textContent = text;
    document.body.appendChild(tooltip);

    const rect = element.getBoundingClientRect();
    tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px`;
    tooltip.style.top = `${rect.top - 40}px`;
}

function hidePolyTooltip() {
    const tooltip = document.querySelector('.poly-tooltip');
    if (tooltip) {
        tooltip.remove();
    }
}