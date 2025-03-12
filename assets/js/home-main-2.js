document.addEventListener('DOMContentLoaded', function() {
    const categoryCards = document.querySelectorAll('.category-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target); // Chỉ chạy animation một lần
            }
        });
    }, {
        threshold: 0.1 // Kích hoạt khi 10% card vào viewport
    });
    
    categoryCards.forEach((card, index) => {
        // Khởi tạo trạng thái ban đầu
        card.style.opacity = 0;
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        // Quan sát với độ trễ tăng dần
        setTimeout(() => observer.observe(card), index * 100);
    });
});