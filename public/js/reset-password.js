// Reset Password JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const resetPasswordForm = document.getElementById('resetPasswordForm');
    const messageDiv = document.getElementById('message');
    const togglePassword = document.getElementById('togglePassword');
    const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
    const newPasswordInput = document.getElementById('newPassword');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const emailInput = document.getElementById('email');
    const tokenInput = document.getElementById('token');

    // Get email and token from sessionStorage
    const resetEmail = sessionStorage.getItem('resetEmail');
    const resetToken = sessionStorage.getItem('resetToken');

    if (!resetEmail || !resetToken) {
        // If no email or token, redirect back to forgot password
        window.location.href = '/forgot-password';
    } else {
        emailInput.value = resetEmail;
        tokenInput.value = resetToken;
    }

    // Toggle password visibility
    togglePassword.addEventListener('click', function(e) {
        e.preventDefault();
        if (newPasswordInput.type === 'password') {
            newPasswordInput.type = 'text';
            this.querySelector('.eye-icon').textContent = '👁️‍🗨️';
        } else {
            newPasswordInput.type = 'password';
            this.querySelector('.eye-icon').textContent = '👁️';
        }
    });

    // Toggle confirm password visibility
    toggleConfirmPassword.addEventListener('click', function(e) {
        e.preventDefault();
        if (confirmPasswordInput.type === 'password') {
            confirmPasswordInput.type = 'text';
            this.querySelector('.eye-icon').textContent = '👁️‍🗨️';
        } else {
            confirmPasswordInput.type = 'password';
            this.querySelector('.eye-icon').textContent = '👁️';
        }
    });

    resetPasswordForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const email = emailInput.value.trim();
        const token = tokenInput.value.trim();
        const newPassword = newPasswordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        // Validation
        if (!email || !token || !newPassword || !confirmPassword) {
            showMessage('Vui lòng điền đầy đủ thông tin', 'error');
            return;
        }

        if (newPassword !== confirmPassword) {
            showMessage('Mật khẩu không khớp', 'error');
            return;
        }

        if (newPassword.length < 6) {
            showMessage('Mật khẩu phải ít nhất 6 ký tự', 'error');
            return;
        }

        try {
            const response = await fetch('/api/auth/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, token, newPassword, confirmPassword })
            });

            const data = await response.json();

            if (data.success) {
                showMessage('Đặt lại mật khẩu thành công!', 'success');
                
                // Clear session storage
                sessionStorage.removeItem('resetEmail');
                sessionStorage.removeItem('resetToken');
                
                // Redirect to login
                setTimeout(() => {
                    window.location.href = '/login';
                }, 1500);
            } else {
                showMessage(data.error || 'Không thể đặt lại mật khẩu', 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            showMessage('Lỗi kết nối', 'error');
        }
    });

    function showMessage(message, type) {
        messageDiv.textContent = message;
        messageDiv.className = `message show ${type}`;
        
        setTimeout(() => {
            messageDiv.classList.remove('show');
        }, 5000);
    }
});
