document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const mobileProductLink = document.getElementById('mobileProductLink');
    
    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', function() {
        mobileNav.classList.toggle('active');
        mobileOverlay.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
        document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close mobile menu when clicking overlay
    mobileOverlay.addEventListener('click', function(e) {
        if (
            !mobileMenuBtn.contains(e.target) &&
            !mobileNav.contains(e.target)
          ) {
            mobileNav.classList.remove('active');
            mobileOverlay.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Toggle product dropdown in mobile menu
    if (mobileProductLink) {
        mobileProductLink.addEventListener('click', function(e) {
            e.preventDefault();
            const parent = this.parentElement;
            parent.classList.toggle('active');
        });
    }
});