// Xử lý gallery ảnh
function changeImage(element) {
    // Lấy src của thumbnail được click
    const newImageSrc = element.src;
    
    // Cập nhật ảnh chính
    document.getElementById('mainImage').src = newImageSrc;
    
    // Xóa class active khỏi tất cả thumbnails
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach(thumb => {
        thumb.classList.remove('active');
    });
    
    // Thêm class active vào thumbnail được chọn
    element.classList.add('active');
}

// Xử lý số lượng sản phẩm
function increaseQuantity() {
    const quantityInput = document.getElementById('quantity');
    let quantity = parseInt(quantityInput.value);
    quantityInput.value = quantity + 1;
}

function decreaseQuantity() {
    const quantityInput = document.getElementById('quantity');
    let quantity = parseInt(quantityInput.value);
    if (quantity > 1) {
        quantityInput.value = quantity - 1;
    }
}

// Validate input khi người dùng nhập trực tiếp
document.getElementById('quantity').addEventListener('change', function() {
    const value = parseInt(this.value);
    if (isNaN(value) || value < 1) {
        this.value = 1;
    } else {
        this.value = Math.floor(value);
    }
});

// Xử lý accordion
function toggleAccordion(button) {
    // Lấy parent element (accordion)
    const accordion = button.parentElement;
    
    // Toggle class active
    accordion.classList.toggle('active');
    
    // Nếu muốn đóng accordion khác khi mở accordion mới, uncomment đoạn code dưới
    /*
    const allAccordions = document.querySelectorAll('.accordion');
    allAccordions.forEach(item => {
        if (item !== accordion) {
            item.classList.remove('active');
        }
    });
    */
}

// Xử lý nút wishlist
document.querySelector('.wishlist-btn').addEventListener('click', function() {
    const icon = this.querySelector('i');
    
    // Toggle giữa far (regular) và fas (solid)
    if (icon.classList.contains('far')) {
        icon.classList.remove('far');
        icon.classList.add('fas');
        this.classList.add('active');
    } else {
        icon.classList.remove('fas');
        icon.classList.add('far');
        this.classList.remove('active');
    }
});

// Auto initialize
document.addEventListener('DOMContentLoaded', function() {
    // Hiển thị accordion đầu tiên mở sẵn khi trang load
    const firstAccordion = document.querySelector('.accordion');
    if (firstAccordion) {
        firstAccordion.classList.add('active');
    }
    
    // Set thumbnail đầu tiên là active
    const firstThumbnail = document.querySelector('.thumbnail');
    if (firstThumbnail) {
        firstThumbnail.classList.add('active');
        // Set ảnh chính từ thumbnail đầu tiên
        document.getElementById('mainImage').src = firstThumbnail.src;
    }
});