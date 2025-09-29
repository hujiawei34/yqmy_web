document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    // Focus on username field when page loads
    usernameInput.focus();

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
    document.querySelector('.forgot-password').addEventListener('click', function(e) {
        e.preventDefault();
        alert('Password reset functionality would be implemented here');
    });

    // Handle sign up link
    document.querySelector('.signup-link a').addEventListener('click', function(e) {
        e.preventDefault();
        alert('Sign up page would be implemented here');
    });
});