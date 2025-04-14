document.addEventListener('DOMContentLoaded', function() {
    const bubbles = document.querySelectorAll('.logo-bubble');
    
    // Add hover effect
    bubbles.forEach(bubble => {
        bubble.addEventListener('mouseover', function() {
            this.style.animation = 'bounce 0.5s';
            setTimeout(() => {
                this.style.animation = 'bounce 2s infinite alternate';
            }, 500);
        });
    });
    
    // Add color shift over time
    setInterval(() => {
        bubbles.forEach((bubble, index) => {
            const hue = (Date.now() / 1000 + index) % 360;
            bubble.style.background = `linear-gradient(135deg, hsl(${hue}, 70%, 60%), hsl(${(hue + 30) % 360}, 70%, 60%))`;
            bubble.style.webkitBackgroundClip = 'text';
            bubble.style.backgroundClip = 'text';
        });
    }, 100);
});