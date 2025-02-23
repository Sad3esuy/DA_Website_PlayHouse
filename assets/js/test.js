  // Hàm để tải nội dung từ file HTML
  function loadHTML(id, url) {
    fetch(url)
      .then(response => response.text())
      .then(data => {
        document.getElementById(id).innerHTML = data;
      })
      .catch(error => console.error(`Lỗi khi tải ${url}:`, error));
  }

  // Tải sidebar và header
  document.addEventListener('DOMContentLoaded', function () {
    loadHTML('sidebar', '../views/templates/sidebar.html');
    loadHTML('headeradmin','../views/templates/headeradmin.html');
    loadHTML('dashboard','../admin/dashboard.html');
    loadHTML('products','../admin/products.html');
    loadHTML('orders','../admin/orders.html');
    loadHTML('users','../admin/users.html');

  });