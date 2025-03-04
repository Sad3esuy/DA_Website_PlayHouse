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
    const orderDetailsTextarea = document.getElementById('orderDetails'); // Thêm tham chiếu đến textarea
    
    trackOrderBtn.addEventListener('click', function() {
        // Here you would normally make an API call to check the order
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
            
            // Dữ liệu giả lập để hiển thị trong textarea
            const orderInfo = contactValue.includes('0909') || contactValue.includes('@example.com') 
                ? `Thông tin đơn hàng:\n` +
                  `Mã đơn hàng: DH12345\n` +
                  `Trạng thái: Đang giao hàng\n` +
                  `Ngày đặt: 03/03/2025\n` +
                  `Tổng tiền: 500,000 VNĐ\n` +
                  `Phương thức liên hệ: ${contactValue}`
                : `Không tìm thấy đơn hàng với thông tin: ${contactValue}\n` +
                  `Vui lòng kiểm tra lại hoặc liên hệ hỗ trợ qua hotline 1900 xxxx!`;

            // Điền thông tin vào textarea
            orderDetailsTextarea.value = orderInfo;
            
            // Scroll đến textarea (nếu cần)
            orderDetailsTextarea.scrollIntoView({ behavior: 'smooth' });
        }, 1500);
    });
});