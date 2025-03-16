document.addEventListener('DOMContentLoaded', function() {
    // Lấy các phần tử DOM
    const cartQuantityInputs = document.querySelectorAll('.cart-quantity');
    const cartDecreaseButtons = document.querySelectorAll('.cart-decrease');
    const cartIncreaseButtons = document.querySelectorAll('.cart-increase');
    const cartDeleteButtons = document.querySelectorAll('.cart-page-delete-btn');
    const cartUpdateButtons = document.querySelectorAll('.cart-page-update-btn');
    
    // Lưu trữ giá sản phẩm
    const productPrices = [];
    document.querySelectorAll('.cart-page-product-price').forEach(priceElement => {
        const priceText = priceElement.textContent;
        const price = parseFloat(priceText.replace(/\./g, '').replace('đ', ''));
        productPrices.push(price);
    });
    
    // Xử lý sự kiện cho nút giảm số lượng
    cartDecreaseButtons.forEach((button, index) => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const input = cartQuantityInputs[index];
            let value = parseInt(input.value);
            
            if (value > 1) {
                value--;
                input.value = value;
                updateOrderTotal();
            }
        });
    });
    
    // Xử lý sự kiện cho nút tăng số lượng
    cartIncreaseButtons.forEach((button, index) => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const input = cartQuantityInputs[index];
            let value = parseInt(input.value);
            
            value++;
            input.value = value;
            updateOrderTotal();
        });
    });
    
    // Xử lý sự kiện khi người dùng thay đổi số lượng trực tiếp
    cartQuantityInputs.forEach((input, index) => {
        input.addEventListener('change', function() {
            let value = parseInt(this.value);
            
            if (isNaN(value) || value < 1) {
                this.value = 1;
                value = 1;
            }
            
            updateOrderTotal();
        });
    });
    
    // Xử lý sự kiện cho nút xóa sản phẩm
    cartDeleteButtons.forEach((button, index) => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?')) {
                const row = this.closest('tr');
                row.remove();
                
                // Cập nhật mảng giá sản phẩm sau khi xóa
                productPrices.splice(index, 1);
                
                // Cập nhật tổng đơn hàng sau khi xóa sản phẩm
                updateOrderTotal();
            }
        });
    });
    
    // Xử lý sự kiện cho nút cập nhật
    cartUpdateButtons.forEach((button, index) => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            updateOrderTotal();
            
            // Hiển thị thông báo cập nhật thành công
            alert('Cập nhật giỏ hàng thành công!');
        });
    });
    
    // Xử lý sự kiện nút thanh toán
    // const checkoutButton = document.querySelector('.cart-page-checkout-btn');
    // if (checkoutButton) {
    //     checkoutButton.addEventListener('click', function(e) {
    //         e.preventDefault();
    //         alert('Chuyển đến trang thanh toán!');
    //         // Thực tế sẽ chuyển hướng đến trang thanh toán
    //         window.location.href = '../pay/index.html';
    //     });
    // }
    
    // Hàm cập nhật tổng đơn hàng
    function updateOrderTotal() {
        let subtotal = 0;
        
        // Tính tổng tiền dựa trên số lượng và giá của từng sản phẩm
        cartQuantityInputs.forEach((input, index) => {
            if (index < productPrices.length) {
                const quantity = parseInt(input.value);
                subtotal += productPrices[index] * quantity;
            }
        });
        
        // Phí vận chuyển
        const shippingFee = 30000;
        const total = subtotal + shippingFee;
        
        // Định dạng số với dấu chấm ngăn cách hàng nghìn
        function formatPrice(price) {
            return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + 'đ';
        }
        
        // Cập nhật giá trị tạm tính
        const subtotalElement = document.querySelector('.summary-row:nth-child(1) span:last-child');
        subtotalElement.textContent = formatPrice(subtotal);
        
        // Cập nhật tổng cộng
        const totalElement = document.querySelector('.summary-row.total .cart-page-price-total');
        totalElement.textContent = formatPrice(total);
    }
    
    // Khởi tạo tổng đơn hàng khi trang được tải
    updateOrderTotal();
});