document.addEventListener('DOMContentLoaded', function() {
    // Homepage functionality
    setupHomepage();
});

function setupHomepage() {
    // Login modal functionality
    const loginModal = document.getElementById('loginModal');
    const modalOverlay = document.querySelector('.modal-overlay');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Show login modal when nav links are clicked (except explore services)
    navLinks.forEach(link => {
        if (link.textContent !== 'Explore Services') {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                showLoginModal();
            });
        }
    });
    
    // Close modal when overlay is clicked
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function() {
            hideLoginModal();
        });
    }
    
    // Setup login form in modal
    setupLoginForm();
    
    function showLoginModal() {
        if (loginModal) {
            loginModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            // Focus on username field
            setTimeout(() => {
                const usernameInput = document.getElementById('username');
                if (usernameInput) usernameInput.focus();
            }, 100);
        }
    }
    
    function hideLoginModal() {
        if (loginModal) {
            loginModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }
    
    // Add scroll effect to navbar
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.primary-header');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.style.boxShadow = '0 6px 20px rgba(40, 44, 53, 0.12)';
            } else {
                navbar.style.boxShadow = '0 1px 0 rgba(40, 44, 53, 0.05)';
            }
        }
    });
    
    // Search functionality
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                alert(`Searching for: ${searchTerm}`);
                // In a real app, this would trigger a search
            }
        });
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchBtn.click();
            }
        });
    }
    
    // Custom offer button
    const customOfferBtn = document.querySelector('.custom-offer-btn');
    if (customOfferBtn) {
        customOfferBtn.addEventListener('click', function() {
            showLoginModal();
        });
    }

    setupCarousels();
}

function setupLoginForm() {
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    
    if (!loginForm) return;
    
    // Focus on username field when form is visible
    if (usernameInput && isElementVisible(usernameInput)) {
        usernameInput.focus();
    }

    // Handle form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        
        // Basic validation
        if (!username) {
            alert('Please enter your username');
            usernameInput.focus();
            return;
        }
        
        if (!password) {
            alert('Please enter your password');
            passwordInput.focus();
            return;
        }
        
        // Simulate login process
        console.log('Login attempt:', { username, password });
        
        // Show success message (in a real app, this would be an API call)
        alert('Sign in successful! (This is a demo)');
        
        // Clear form
        loginForm.reset();
        
        // Hide modal if we're in homepage
        const loginModal = document.getElementById('loginModal');
        if (loginModal && loginModal.style.display === 'block') {
            loginModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Add input animations
    const inputFields = document.querySelectorAll('.input-field');
    
    inputFields.forEach(field => {
        field.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
            this.parentElement.style.transition = 'transform 0.2s ease';
        });
        
        field.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });

    // Handle forgot password link
    const forgotPasswordLink = document.querySelector('.forgot-password');
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Password reset functionality would be implemented here');
        });
    }
}

function setupCarousels() {
    const carousels = document.querySelectorAll('[data-carousel]');

    carousels.forEach(section => {
        const track = section.querySelector('.carousel-track');
        const prevBtn = section.querySelector('.carousel-arrow--prev');
        const nextBtn = section.querySelector('.carousel-arrow--next');

        if (!track || (!prevBtn && !nextBtn)) {
            return;
        }

        const getScrollAmount = () => {
            const item = track.querySelector('.service-card, .promo-card');
            if (!item) {
                return track.clientWidth;
            }

            const styles = window.getComputedStyle(track);
            const gap = parseInt(styles.columnGap || styles.gap || '0', 10);
            return item.clientWidth + gap;
        };

        const updateControls = () => {
            const maxScrollLeft = track.scrollWidth - track.clientWidth - 1;

            if (prevBtn) {
                const atStart = track.scrollLeft <= 0;
                prevBtn.disabled = atStart;
                prevBtn.classList.toggle('carousel-arrow--disabled', atStart);
            }

            if (nextBtn) {
                const atEnd = track.scrollLeft >= maxScrollLeft;
                nextBtn.disabled = atEnd;
                nextBtn.classList.toggle('carousel-arrow--disabled', atEnd);
            }
        };

        prevBtn?.addEventListener('click', () => {
            track.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
        });

        nextBtn?.addEventListener('click', () => {
            track.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
        });

        track.addEventListener('scroll', updateControls, { passive: true });
        window.addEventListener('resize', updateControls);

        updateControls();
    });
}

function isElementVisible(element) {
    return element.offsetParent !== null;
}
