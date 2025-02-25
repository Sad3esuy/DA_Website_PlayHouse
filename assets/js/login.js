document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const userBtn = document.getElementById('userBtnHeader');
    const userBtnOverlay = document.getElementById('userBtnOverlay');
    const authModal = document.getElementById('authModal');
    const closeAuthModal = document.getElementById('closeAuthModal');
    const authTabs = document.querySelectorAll('.auth-tab');
    const authForms = document.querySelectorAll('.auth-form');
    const forgotPasswordBtn = document.getElementById('forgotPasswordBtn');
    const backToLoginBtn = document.querySelector('.back-to-login');
    const togglePasswordBtns = document.querySelectorAll('.toggle-password');
    
    // Open auth modal when user button is clicked
    userBtn.addEventListener('click', function() {
        authModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    });
    userBtnOverlay.addEventListener('click', function() {
      authModal.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  });
    // Close auth modal
    closeAuthModal.addEventListener('click', function() {
        authModal.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Close modal when clicking outside
    authModal.addEventListener('click', function(e) {
        if (e.target === authModal) {
            authModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Tab switching
    authTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and forms
            authTabs.forEach(t => t.classList.remove('active'));
            authForms.forEach(f => f.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding form
            this.classList.add('active');
            
            // Show the selected form with animation
            const targetForm = document.getElementById(targetTab + 'Form');
            targetForm.classList.add('active');
            
            // Reset the forgot password form display
            if (targetTab === 'login' || targetTab === 'register') {
                document.getElementById('forgotPasswordForm').classList.remove('active');
            }
        });
    });
    
    // Forgot password link
    forgotPasswordBtn.addEventListener('click', function() {
        authForms.forEach(f => f.classList.remove('active'));
        document.getElementById('forgotPasswordForm').classList.add('active');
    });
    
    // Back to login from forgot password
    backToLoginBtn.addEventListener('click', function() {
        authForms.forEach(f => f.classList.remove('active'));
        document.getElementById('loginForm').classList.add('active');
        
        // Update the tabs UI
        authTabs.forEach(t => t.classList.remove('active'));
        document.querySelector('[data-tab="login"]').classList.add('active');
    });
    
    // Toggle password visibility
    togglePasswordBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const passwordInput = this.parentElement.querySelector('input');
            const icon = this.querySelector('i');
            
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                icon.textContent = 'visibility';
            } else {
                passwordInput.type = 'password';
                icon.textContent = 'visibility_off';
            }
        });
    });
    
    // Form Validation - Login
    document.querySelector('#loginForm form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        // Basic validation
        if (!email || !password) {
            showFormError('loginForm', 'Vui lòng điền đầy đủ thông tin');
            return;
        }
        
        // Send login request to server (mock for now)
        console.log('Login request', { email, password });
        
        // Mock successful login
        showSuccessMessage('Đăng nhập thành công!');
        setTimeout(() => {
            authModal.classList.remove('active');
            document.body.style.overflow = '';
        }, 2000);
    });
    
    // Form Validation - Register
    document.querySelector('#registerForm form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const phone = document.getElementById('registerPhone').value;
        const password = document.getElementById('registerPassword').value;
        const agreeTerms = document.getElementById('agreeTerms').checked;
        
        // Basic validation
        if (!name || !email || !phone || !password) {
            showFormError('registerForm', 'Vui lòng điền đầy đủ thông tin');
            return;
        }
        
        
        if (!agreeTerms) {
            showFormError('registerForm', 'Vui lòng đồng ý với điều khoản dịch vụ');
            return;
        }
        
        // Send register request to server (mock for now)
        console.log('Register request', { name, email, phone, password });
        
        // Mock successful registration
        showSuccessMessage('Đăng ký thành công! Vui lòng kiểm tra email để xác thực tài khoản.');
        setTimeout(() => {
            // Switch to login tab after successful registration
            authTabs.forEach(t => t.classList.remove('active'));
            authForms.forEach(f => f.classList.remove('active'));
            document.querySelector('[data-tab="login"]').classList.add('active');
            document.getElementById('loginForm').classList.add('active');
        }, 2000);
    });
    
    // Form Validation - Forgot Password
    document.querySelector('#forgotPasswordForm form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('forgotEmail').value;
        
        // Basic validation
        if (!email) {
            showFormError('forgotPasswordForm', 'Vui lòng nhập email');
            return;
        }
        
        // Send forgot password request to server (mock for now)
        console.log('Forgot password request', { email });
        
        // Mock successful request
        showSuccessMessage('Email hướng dẫn đặt lại mật khẩu đã được gửi!');
        setTimeout(() => {
            // Switch back to login tab
            authTabs.forEach(t => t.classList.remove('active'));
            authForms.forEach(f => f.classList.remove('active'));
            document.querySelector('[data-tab="login"]').classList.add('active');
            document.getElementById('loginForm').classList.add('active');
        }, 2000);
    });
    
    // Helper function to show form errors
    function showFormError(formId, message) {
        // Remove any existing error messages
        const existingError = document.querySelector(`#${formId} .error-message`);
        if (existingError) existingError.remove();
        
        // Create and append error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.color = '#ff3333';
        errorDiv.style.marginTop = '15px';
        errorDiv.style.fontSize = '14px';
        errorDiv.style.textAlign = 'center';
        errorDiv.textContent = message;
        
        document.querySelector(`#${formId} form`).appendChild(errorDiv);
        
        // Remove error after 3 seconds
        setTimeout(() => {
            errorDiv.remove();
        }, 3000);
    }
    
    // Helper function to show success messages
    function showSuccessMessage(message) {
        // Remove any existing messages
        const existingMessage = document.querySelector('.success-message');
        if (existingMessage) existingMessage.remove();
        
        // Create and append success message
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.style.position = 'fixed';
        successDiv.style.top = '20px';
        successDiv.style.left = '50%';
        successDiv.style.transform = 'translateX(-50%)';
        successDiv.style.padding = '15px 25px';
        successDiv.style.backgroundColor = '#4CAF50';
        successDiv.style.color = 'white';
        successDiv.style.borderRadius = '4px';
        successDiv.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
        successDiv.style.zIndex = '2000';
        successDiv.style.animation = 'slideIn 0.3s ease';
        successDiv.textContent = message;
        
        document.body.appendChild(successDiv);
        
        // Remove success message after 3 seconds
        setTimeout(() => {
            successDiv.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                successDiv.remove();
            }, 300);
        }, 3000);
    }
  });
  
  // Add these keyframes to your CSS or add them dynamically
  document.head.insertAdjacentHTML('beforeend', `
    <style>
        @keyframes slideIn {
            from { 
                opacity: 0;
                transform: translate(-50%, -20px);
            }
            to { 
                opacity: 1;
                transform: translate(-50%, 0);
            }
        }
        
        @keyframes fadeOut {
            from { 
                opacity: 1;
            }
            to { 
                opacity: 0;
            }
        }
    </style>
  `);