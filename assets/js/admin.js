document.addEventListener("DOMContentLoaded", function () {
  const openFormBtn = document.getElementById("openFormBtn");
  // const closeFormBtn = document.getElementById("closeFormBtn");
  const overlay = document.getElementById("overlay");
  const addProductFormContainer = document.getElementById("addProductFormContainer");
  const closeBtn = document.querySelector(".close-btn");
  const addProductForm = document.getElementById("addProductForm");
  const productList = document.getElementById("productList");
  const imageFileInput = document.getElementById("imageFile");
  const previewImage = document.getElementById("previewImage");

  // Hiển thị form thêm sản phẩm
  openFormBtn.addEventListener("click", function () {
      overlay.style.display = "block";
      addProductFormContainer.style.display = "block";
  });

  // Đóng form khi nhấn vào overlay hoặc nút đóng
  overlay.addEventListener("click", closeForm);
  if (closeBtn) {
      closeBtn.addEventListener("click", closeForm);
  }

  function closeForm() {
      overlay.style.display = "none";
      addProductFormContainer.style.display = "none";
  }

  // Xử lý chọn ảnh và hiển thị preview
  imageFileInput.addEventListener("change", function (event) {
      const file = event.target.files[0];
      if (file) {
          const reader = new FileReader();
          reader.onload = function (e) {
              previewImage.src = e.target.result;
              previewImage.classList.remove("hidden");
          };
          reader.readAsDataURL(file);
      }
  });

  // Xử lý form khi nhấn "Add Product"
  addProductForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Lấy dữ liệu từ form
      const productName = document.getElementById("productName").value;
      const description = document.getElementById("description").value;
      const imageUrl = previewImage.src; // Lấy ảnh đã chọn
      const productCategory = document.getElementById("productCategory").value;
      const productPrice = document.getElementById("productPrice").value;
      const productStock = document.getElementById("productStock").value;

      if (!productName || !description || !imageUrl || !productCategory || !productPrice || !productStock) {
          alert("Vui lòng nhập đầy đủ thông tin!");
          return;
      }

      // Tạo object sản phẩm
      const newProduct = {
          name: productName,
          description,
          image: imageUrl,
          category: productCategory,
          price: productPrice,
          stock: productStock,
      };

      // Lưu vào Local Storage
      let products = JSON.parse(localStorage.getItem("products")) || [];
      products.push(newProduct);
      localStorage.setItem("products", JSON.stringify(products));

      // Hiển thị sản phẩm mới trên danh sách
      renderProducts();

      // Reset form
      addProductForm.reset();
      previewImage.classList.add("hidden");
      imageFileInput.value = "";
      closeForm();
  });

  // Hiển thị danh sách sản phẩm từ Local Storage
  function renderProducts() {
      let products = JSON.parse(localStorage.getItem("products")) || [];
      productList.innerHTML = "";
      products.forEach((product, index) => {
          const productItem = document.createElement("div");
          productItem.classList.add("product-item");
          productItem.innerHTML = `
              <img src="${product.image}" alt="${product.name}">
              <h4>${product.name}</h4>
              <p>${product.description}</p>
              <p><strong>Category:</strong> ${product.category}</p>
              <p><strong>Price:</strong> $${product.price}</p>
              <p><strong>Stock:</strong> ${product.stock}</p>
              <button class="delete-btn" data-index="${index}">🗑 Xóa</button>
          `;
          productList.appendChild(productItem);
      });

      // Thêm sự kiện xóa sản phẩm
      document.querySelectorAll(".delete-btn").forEach((button) => {
          button.addEventListener("click", function () {
              const index = this.getAttribute("data-index");
              let products = JSON.parse(localStorage.getItem("products")) || [];
              products.splice(index, 1);
              localStorage.setItem("products", JSON.stringify(products));
              renderProducts();
          });
      });
  }

  // Gọi renderProducts khi load trang
  renderProducts();
});

          // Add Product Form Submission
      document.getElementById('addProductForm').addEventListener('submit', function(event) {
          event.preventDefault();

          const productName = document.getElementById('productName').value;
          const productCategory = document.getElementById('productCategory').value;
          const productPrice = document.getElementById('productPrice').value;
          const productStock = document.getElementById('productStock').value;

          // Create a new row in the product table
          const productTableBody = document.getElementById('productTableBody');
          const newRow = document.createElement('tr');
          newRow.innerHTML = `
              <td>${productName}</td>
              <td>${productCategory}</td>
              <td>$${productPrice}</td>
              <td>${productStock}</td>
              <td>
                  <button class="action-btn btn-edit">Edit</button>
                  <button class="action-btn btn-delete">Delete</button>
              </td>
          `;
          productTableBody.appendChild(newRow);

          // Clear the form
          document.getElementById('addProductForm').reset();
      });

      // Update Order Form Submission
      document.getElementById('updateOrderForm').addEventListener('submit', function(event) {
          event.preventDefault();

          const orderId = document.getElementById('orderId').value;
          const orderStatus = document.getElementById('orderStatus').value;

          // Find the order in the table and update its status
          const orderTableBody = document.getElementById('orderTableBody');
          const rows = orderTableBody.getElementsByTagName('tr');
          for (let row of rows) {
              const cells = row.getElementsByTagName('td');
              if (cells[0].textContent === `#${orderId}`) {
                  cells[3].innerHTML = `<span class="status-badge status-${orderStatus.toLowerCase()}">${orderStatus}</span>`;
                  break;
              }
          }

          // Clear the form
          document.getElementById('updateOrderForm').reset();
      });
      // Toggle Sidebar
      const sidebar = document.getElementById('sidebar');


          // Tab Navigation
          const navItems = document.querySelectorAll('.nav-item');
          const tabContents = document.querySelectorAll('.tab-content');

          navItems.forEach(item => {
              item.addEventListener('click', () => {
                  // Remove active class from all nav items
                  navItems.forEach(nav => nav.classList.remove('active'));

                  // Add active class to clicked nav item
                  item.classList.add('active');

                  // Hide all tab contents
                  tabContents.forEach(tab => tab.classList.remove('active'));

                  // Show selected tab content
                  const tabId = item.getAttribute('data-tab');
                  document.getElementById(tabId).classList.add('active');
              });
          });

          // Sample data loading (you would typically fetch this from an API)
          function loadDashboardData() {
              // Implementation for loading dashboard data
          }

          function loadProductsData() {
              // Implementation for loading products data
          }

          function loadOrdersData() {
              // Implementation for loading orders data
          }

          function loadUsersData() {
              // Implementation for loading users data
          }

          // Initialize the dashboard
          document.addEventListener('DOMContentLoaded', () => {
              loadDashboardData();
          });