// Dashboard JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const user = localStorage.getItem('user');

    if (!user) {
        // Redirect to login if not authenticated
        window.location.href = '/login';
        return;
    }

    const userData = JSON.parse(user);
    document.getElementById('userEmail').textContent = userData.email;
    document.getElementById('displayEmail').textContent = userData.email;
    document.getElementById('displayName').textContent = userData.full_name || 'Người dùng';

    // Logout button
    document.getElementById('logoutBtn').addEventListener('click', function() {
        localStorage.removeItem('user');
        window.location.href = '/login';
    });
});
