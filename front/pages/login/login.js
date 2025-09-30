document.addEventListener('DOMContentLoaded', function() {
    // Login page functionality
    setupLoginPage();
});

function setupLoginPage() {
    setupLoginForm();
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

function isElementVisible(element) {
    return element.offsetParent !== null;
}