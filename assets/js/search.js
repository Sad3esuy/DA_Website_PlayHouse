const toggleSearchBtn = document.getElementById('toggleSearch');
const searchOverlay = document.getElementById('searchOverlay');
const overlay = document.getElementById('overlay');
const input = document.getElementById('searchInput');
// Khi click vào nút toggleSearch: mở/đóng overlay
toggleSearchBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  searchOverlay.classList.toggle('active');
  overlay.classList.toggle('active');
});

// Khi click vào bất cứ đâu trên document ngoại trừ toggleSearch và nội dung overlay
document.addEventListener('click', (e) => {
  if (
    !toggleSearchBtn.contains(e.target) &&
    !searchOverlay.contains(e.target)
  ) {
    searchOverlay.classList.remove('active');
    overlay.classList.remove('active');
  }
});

//animation playholder
const text = "Tìm kiếm theo tên sản phẩm...";
let index = 0;
let forward = true;

function typeEffect() {
  if (forward) {
    if (index < text.length) {
      index++;
      input.setAttribute('placeholder', text.slice(0, index));
      setTimeout(typeEffect, 40); // Tốc độ gõ: 150ms mỗi ký tự
    } else {
      forward = false;
      setTimeout(typeEffect, 500); // Dừng lại khi đã gõ hết
    }
  } else {
    if (index > 1) {
      index--;
      input.setAttribute('placeholder', text.slice(0, index));
      setTimeout(typeEffect, 40);
    } else {
      forward = true;
      setTimeout(typeEffect, 5);
    }
  }
}

typeEffect();