document.addEventListener('DOMContentLoaded', function() {
    const trackingForm = document.getElementById('check-trackingForm');
    const searchInput = document.getElementById('searchInput');
    const notFoundResult = document.getElementById('notFoundResult');
    const foundResult = document.getElementById('foundResult');
    
    // Mẫu dữ liệu đơn hàng để demo
    const sampleOrders = {
        '0123456789': {
            id: 'PH-123456',
            date: '16/03/2025',
            name: 'Nguyễn Văn A',
            phone: '0123456789',
            address: 'Số 123 Đường ABC, Quận XYZ, TP. Hồ Chí Minh',
            total: '1.250.000 VNĐ',
            status: 'Đang giao hàng'
        },
        '0987654321': {
            id: 'PH-654321',
            date: '15/03/2025',
            name: 'Trần Thị B',
            phone: '0987654321',
            address: 'Số 456 Đường DEF, Quận UVW, TP. Hà Nội',
            total: '850.000 VNĐ',
            status: 'Đã giao hàng'
        }
    };
    
    // Xử lý sự kiện submit form
    trackingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const phoneNumber = searchInput.value.trim();
        
        // Kiểm tra số điện thoại có hợp lệ không
        if (phoneNumber === '') {
            showError('Vui lòng nhập số điện thoại');
            return;
        }
        
        // Tìm kiếm đơn hàng
        const order = sampleOrders[phoneNumber];
        
        if (order) {
            // Hiển thị kết quả nếu tìm thấy
            displayOrderDetails(order);
            notFoundResult.style.display = 'none';
            foundResult.style.display = 'block';
        } else {
            // Hiển thị thông báo không tìm thấy
            notFoundResult.style.display = 'flex';
            foundResult.style.display = 'none';
        }
    });
    
    // Hàm hiển thị thông báo lỗi
    function showError(message) {
        // Tạo thông báo lỗi
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.textContent = message;
        errorMessage.style.color = '#f44336';
        errorMessage.style.fontSize = '14px';
        errorMessage.style.marginTop = '5px';
        
        // Xóa thông báo lỗi cũ nếu có
        const oldError = searchInput.parentNode.querySelector('.error-message');
        if (oldError) {
            oldError.remove();
        }
        
        // Thêm thông báo lỗi mới
        searchInput.parentNode.appendChild(errorMessage);
        
        // Xóa thông báo lỗi sau 3 giây
        setTimeout(() => {
            errorMessage.remove();
        }, 3000);
    }
    
    // Hàm hiển thị chi tiết đơn hàng
    function displayOrderDetails(order) {
        // Cập nhật thông tin đơn hàng
        document.querySelector('.check-order-info-value:nth-child(1)').textContent = `#${order.id}`;
        
        const infoItems = foundResult.querySelectorAll('.check-order-info-item');
        infoItems[0].querySelector('.check-order-info-value').textContent = order.date;
        infoItems[1].querySelector('.check-order-info-value').textContent = order.name;
        infoItems[2].querySelector('.check-order-info-value').textContent = order.phone;
        infoItems[3].querySelector('.check-order-info-value').textContent = order.address;
        infoItems[4].querySelector('.check-order-info-value').textContent = order.total;
        
        // Cập nhật trạng thái đơn hàng
        const statusElement = foundResult.querySelector('.check-order-page-status');
        statusElement.textContent = order.status;
        
        // Thay đổi màu sắc trạng thái dựa vào tình trạng đơn hàng
        if (order.status === 'Đã giao hàng') {
            statusElement.style.backgroundColor = '#4caf50'; // Xanh lá
        } else if (order.status === 'Đang giao hàng') {
            statusElement.style.backgroundColor = '#2196f3'; // Xanh dương
        } else if (order.status === 'Đang xử lý') {
            statusElement.style.backgroundColor = '#ff9800'; // Cam
        } else if (order.status === 'Đã hủy') {
            statusElement.style.backgroundColor = '#f44336'; // Đỏ
        }
    }
    
    // Hiển thị ban đầu là phần không tìm thấy
    notFoundResult.style.display = 'flex';
    foundResult.style.display = 'none';
    
    // Thêm hiệu ứng cho input khi focus
    searchInput.addEventListener('focus', function() {
        this.parentElement.classList.add('active');
    });
    
    searchInput.addEventListener('blur', function() {
        this.parentElement.classList.remove('active');
    });
});