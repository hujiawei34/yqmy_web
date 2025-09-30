document.addEventListener('DOMContentLoaded', function() {
    // Signup page functionality
    setupSignupPage();
});

function setupSignupPage() {
    const signupForm = document.getElementById('signupForm');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const rememberMeCheckbox = document.getElementById('rememberMe');
    
    if (!signupForm) return;
    
    // Focus on username field when form is visible
    if (usernameInput && isElementVisible(usernameInput)) {
        usernameInput.focus();
    }

    // Handle form submission
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = usernameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();
        const rememberMe = rememberMeCheckbox.checked;
        
        // Basic validation
        if (!username) {
            alert('Please enter your username');
            usernameInput.focus();
            return;
        }
        
        if (!email) {
            alert('Please enter your email');
            emailInput.focus();
            return;
        }
        
        if (!isValidEmail(email)) {
            alert('Please enter a valid email address');
            emailInput.focus();
            return;
        }
        
        if (!password) {
            alert('Please enter your password');
            passwordInput.focus();
            return;
        }
        
        if (password.length < 6) {
            alert('Password must be at least 6 characters long');
            passwordInput.focus();
            return;
        }
        
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            confirmPasswordInput.focus();
            return;
        }
        
        // Simulate signup process
        console.log('Signup attempt:', { username, email, password, rememberMe });
        
        // Show success message (in a real app, this would be an API call)
        alert('Account created successfully! (This is a demo)');
        
        // Clear form
        signupForm.reset();
        
        // Redirect to login page after successful signup
        setTimeout(() => {
            window.location.href = '/login.html';
        }, 1500);
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

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isElementVisible(element) {
    return element.offsetParent !== null;
}