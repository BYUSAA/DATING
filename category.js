// Category page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on a category page
    if (document.querySelector('.profiles-grid')) {
        loadCategoryProfiles();
        setupFilters();
    }
});

function loadCategoryProfiles() {
    const grid = document.querySelector('.profiles-grid');
    if (!grid) return;
    
    // Show loading state
    grid.innerHTML = '<div class="loading-spinner">Loading profiles...</div>';
    
    // Simulate API call
    setTimeout(() => {
        // This would be replaced with actual API data
        const mockProfiles = [
            { id: 1, name: 'Alex Johnson', age: 28, location: 'New York', bio: 'Adventure seeker and coffee enthusiast looking for meaningful connections.' },
            { id: 2, name: 'Sam Taylor', age: 31, location: 'London', bio: 'Professional chef who loves traveling and meeting new people.' },
            // More mock profiles
        ];
        
        renderProfiles(mockProfiles);
    }, 1000);
}

function renderProfiles(profiles) {
    const grid = document.querySelector('.profiles-grid');
    if (!grid) return;
    
    grid.innerHTML = profiles.map(profile => `
        <div class="profile-card" data-id="${profile.id}">
            <div class="profile-image" style="background-image: url('profile-${profile.id}.jpg')"></div>
            <div class="profile-info">
                <h3 class="profile-name">${profile.name}, ${profile.age}</h3>
                <div class="profile-meta">
                    <span>${profile.location}</span>
                </div>
                <p class="profile-bio">${profile.bio}</p>
                <div class="profile-actions">
                    <button class="btn small">Like</button>
                    <button class="btn small outline">View</button>
                </div>
            </div>
        </div>
    `).join('');
}

function setupFilters() {
    // This would handle filter changes and reload profiles
    const filters = document.querySelectorAll('.category-filters select, .category-filters input');
    filters.forEach(filter => {
        filter.addEventListener('change', function() {
            loadCategoryProfiles();
        });
    });
}