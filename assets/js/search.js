const toggleSearchBtn = document.getElementById('toggleSearch');
const searchOverlay = document.getElementById('searchOverlay');
const overlay = document.getElementById('overlay');
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
