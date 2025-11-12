// Login JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const messageDiv = document.getElementById('message');
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');

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

    // Form submission
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;

        // Validation
        if (!email || !password) {
            showMessage('Vui lòng điền đầy đủ thông tin', 'error');
            return;
        }

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (data.success) {
                // Save user data to localStorage
                localStorage.setItem('user', JSON.stringify(data.user));
                showMessage('Đăng nhập thành công!', 'success');
                
                // Redirect to dashboard
                setTimeout(() => {
                    window.location.href = '/dashboard';
                }, 1500);
            } else {
                showMessage(data.error || 'Đăng nhập thất bại', 'error');
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
