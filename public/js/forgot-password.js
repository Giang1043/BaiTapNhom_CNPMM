// Forgot Password JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    const messageDiv = document.getElementById('message');

    forgotPasswordForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const email = document.getElementById('email').value.trim();

        // Validation
        if (!email) {
            showMessage('Vui lòng nhập email', 'error');
            return;
        }

        try {
            const response = await fetch('/api/auth/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });

            const data = await response.json();

            if (data.success) {
                showMessage(data.message || 'Mã OTP đã được gửi tới email của bạn', 'success');
                
                // Save email to sessionStorage for next step
                sessionStorage.setItem('resetEmail', email);
                
                // Redirect to verify OTP page
                setTimeout(() => {
                    window.location.href = `/verify-otp`;
                }, 2000);
            } else {
                showMessage(data.error || 'Không thể gửi OTP', 'error');
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
