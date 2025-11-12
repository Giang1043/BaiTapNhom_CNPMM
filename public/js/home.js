// Home Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Check if user is already logged in
    const user = localStorage.getItem('user');
    if (user) {
        // Optionally redirect to dashboard
        // window.location.href = '/dashboard';
    }
});
