// Verify OTP JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const verifyOTPForm = document.getElementById('verifyOTPForm');
    const messageDiv = document.getElementById('message');
    const emailInput = document.getElementById('email');
    const otpInput = document.getElementById('otp');

    // Get email from sessionStorage
    const resetEmail = sessionStorage.getItem('resetEmail');
    if (resetEmail) {
        emailInput.value = resetEmail;
    } else {
        // If no email in sessionStorage, redirect back to forgot password
        window.location.href = '/forgot-password';
    }

    // Auto format OTP input - only numbers
    otpInput.addEventListener('input', function() {
        this.value = this.value.replace(/[^0-9]/g, '').slice(0, 6);
    });

    verifyOTPForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const email = emailInput.value.trim();
        const otp = otpInput.value.trim();

        // Validation
        if (!email || !otp) {
            showMessage('Vui lòng nhập đầy đủ thông tin', 'error');
            return;
        }

        if (otp.length !== 6) {
            showMessage('Mã OTP phải có 6 chữ số', 'error');
            return;
        }

        try {
            const response = await fetch('/api/auth/verify-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, otp })
            });

            const data = await response.json();

            if (data.success) {
                showMessage('Xác thực OTP thành công!', 'success');
                
                // Save email and token to sessionStorage
                sessionStorage.setItem('resetEmail', email);
                sessionStorage.setItem('resetToken', data.token);
                
                // Redirect to reset password page
                setTimeout(() => {
                    window.location.href = '/reset-password';
                }, 1500);
            } else {
                showMessage(data.error || 'OTP không hợp lệ', 'error');
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
