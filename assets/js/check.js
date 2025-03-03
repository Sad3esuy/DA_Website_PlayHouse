document.addEventListener('DOMContentLoaded', function() {
    // Toggle between phone and email input
    const radioButtons = document.querySelectorAll('input[name="search-method"]');
    const phoneInputGroup = document.getElementById('phoneInputGroup');
    const emailInputGroup = document.getElementById('emailInputGroup');
    
    radioButtons.forEach(button => {
        button.addEventListener('change', function() {
            if (this.id === 'phone') {
                phoneInputGroup.style.display = 'block';
                emailInputGroup.style.display = 'none';
            } else if (this.id === 'email') {
                phoneInputGroup.style.display = 'none';
                emailInputGroup.style.display = 'block';
            }
        });
    });
    
    // Track Order Button Click
    const trackOrderBtn = document.getElementById('trackOrderBtn');
    const orderResults = document.getElementById('orderResults');
    
    trackOrderBtn.addEventListener('click', function() {
        // Here you would normally make an API call to check the order
        // For demo purposes, we'll just show a sample result
        const method = document.getElementById('phone').checked ? 'phone' : 'email';
        let contactValue = '';
        
        if (method === 'phone') {
            contactValue = phoneInputGroup.querySelector('input').value;
        } else {
            contactValue = emailInputGroup.querySelector('input').value;
        }
        
        if (!contactValue) {
            alert('Vui lòng nhập thông tin để tìm kiếm đơn hàng!');
            return;
        }
        
        if (!document.getElementById('recaptcha').checked) {
            alert('Vui lòng xác nhận bạn không phải là người máy!');
            return;
        }
        
        // Show loading state
        trackOrderBtn.textContent = 'Đang tìm kiếm...';
        trackOrderBtn.disabled = true;
        
        // Simulate API call with timeout
        setTimeout(() => {
            // Reset button state
            trackOrderBtn.textContent = 'Xem ngay';
            trackOrderBtn.disabled = false;
            
            // Display results - for demo purposes showing "No orders found"
            orderResults.innerHTML = `
                <div style="text-align: center; padding: 30px; background: #f8f8f8; border-radius: 8px; margin-top: 20px;">
                    <img src="../assets/images/no-order.png" alt="No Orders" style="width: 80px; margin-bottom: 15px;">
                    <h3 style="font-size: 18px; margin-bottom: 10px;">Không tìm thấy đơn hàng</h3>
                    <p style="color: #666; margin-bottom: 20px;">
                        Không tìm thấy đơn hàng với thông tin bạn cung cấp. Vui lòng kiểm tra lại hoặc liên hệ hỗ trợ!
                    </p>
                    <a href="#" style="display: inline-block; background: #15a2d0; color: white; padding: 10px 20px; border-radius: 4px; text-decoration: none;">
                        Mua sắm ngay
                    </a>
                </div>
            `;
            
            // Show results section
            orderResults.classList.add('show');
            
            // Scroll to results
            orderResults.scrollIntoView({ behavior: 'smooth' });
        }, 1500);
    });
});
