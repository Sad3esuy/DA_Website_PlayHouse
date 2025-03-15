// JavaScript cho sidebar danh mục sản phẩm
document.addEventListener('DOMContentLoaded', function() {
    // Lấy tất cả các radio button
    const radioButtons = document.querySelectorAll('input[name="danh-muc-sanpham"]');
    
    // Lưu trữ lựa chọn của người dùng vào localStorage
    function saveSelection(value) {
        localStorage.setItem('selectedCategory', value);
    }
    
    // Khôi phục lựa chọn từ localStorage khi tải trang
    function restoreSelection() {
        const savedValue = localStorage.getItem('selectedCategory');
        if (savedValue) {
            const radioToCheck = document.querySelector(`input[value="${savedValue}"]`);
            if (radioToCheck) {
                radioToCheck.checked = true;
                // Kích hoạt sự kiện change để hiển thị sản phẩm tương ứng
                const event = new Event('change');
                radioToCheck.dispatchEvent(event);
            }
        }
    }
    
    // Xử lý sự kiện khi người dùng chọn danh mục
    radioButtons.forEach(radio => {
        radio.addEventListener('change', function() {
            // Lưu lựa chọn của người dùng
            saveSelection(this.value);
            
            // Lấy danh sách sản phẩm tương ứng với danh mục đã chọn
            const categoryValue = this.value;
            
            // Ẩn tất cả danh sách sản phẩm
            hideAllProductLists();
            
            // Hiển thị danh sách sản phẩm tương ứng
            showProductList(categoryValue);
        });
    });
    
    // Hàm ẩn tất cả danh sách sản phẩm
    function hideAllProductLists() {
        const productLists = document.querySelectorAll('[id^="list-"]');
        productLists.forEach(list => {
            list.style.display = 'none';
        });
    }
    
    // Hàm hiển thị danh sách sản phẩm theo danh mục
    function showProductList(categoryId) {
        const productList = document.getElementById(categoryId);
        if (productList) {
            productList.style.display = 'block';
            
            // Hiệu ứng fade in đơn giản
            productList.style.opacity = 0;
            let opacity = 0;
            const fadeIn = setInterval(() => {
                opacity += 0.1;
                productList.style.opacity = opacity;
                if (opacity >= 1) clearInterval(fadeIn);
            }, 30);
        }
    }
    
    // Thêm hiệu ứng khi hover vào các danh mục
    const categoryItems = document.querySelectorAll('.col');
    categoryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            // Chỉ áp dụng hiệu ứng nếu không phải là mục đã chọn
            const radio = this.querySelector('input[type="radio"]');
            if (!radio.checked) {
                this.style.transform = 'translateX(5px)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
    
    // Khôi phục lựa chọn khi tải trang
    restoreSelection();
    
    // Nếu không có lựa chọn nào, mặc định chọn mục đầu tiên
    if (!localStorage.getItem('selectedCategory')) {
        const firstRadio = radioButtons[0];
        if (firstRadio) {
            firstRadio.checked = true;
            saveSelection(firstRadio.value);
            
            // Kích hoạt sự kiện change để hiển thị sản phẩm tương ứng
            const event = new Event('change');
            firstRadio.dispatchEvent(event);
        }
    }
});