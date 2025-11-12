// Register JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    const messageDiv = document.getElementById('message');
    const togglePassword = document.getElementById('togglePassword');
    const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');

    // Toggle password visibility
    togglePassword.addEventListener('click', function(e) {
        e.preventDefault();
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            this.querySelector('.eye-icon').textContent = '👁️‍🗨️';
        } else {
            passwordInput.type = 'password';
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

    // Form submission
    registerForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const fullName = document.getElementById('fullName').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        // Validation
        if (!fullName || !email || !phone || !password || !confirmPassword) {
            showMessage('Vui lòng điền đầy đủ thông tin', 'error');
            return;
        }

        if (password !== confirmPassword) {
            showMessage('Mật khẩu không khớp', 'error');
            return;
        }

        if (password.length < 6) {
            showMessage('Mật khẩu phải ít nhất 6 ký tự', 'error');
            return;
        }

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password, fullName, phone })
            });

            const data = await response.json();

            if (data.success) {
                showMessage('Đăng ký thành công! Đang chuyển hướng...', 'success');
                
                // Redirect to login
                setTimeout(() => {
                    window.location.href = '/login';
                }, 1500);
            } else {
                showMessage(data.error || 'Đăng ký thất bại', 'error');
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
