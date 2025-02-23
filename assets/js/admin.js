// Hàm để tải nội dung từ file HTML với Promise
function loadHTML(id, url) {
    return new Promise((resolve) => {
        fetch(url)
            .then(response => {
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                return response.text();
            })
            .then(data => {
                const container = document.getElementById(id);
                if (!container) throw new Error(`Container #${id} not found`);
                container.innerHTML = data;
                resolve();
            })
            .catch(error => {
                console.error(`Error loading ${url}:`, error);
                reject(error);
            });
    });
}

// Khởi tạo ứng dụng
document.addEventListener('DOMContentLoaded', async function () {
    try {
        // Tải các thành phần chính
        await Promise.all([
            loadHTML('sidebar', '../views/templates/admin/sidebar.html'),
            loadHTML('headeradmin', '../views/templates/admin/headeradmin.html'),
            loadHTML('dashboard', '../admin/dashboard.html'),
            loadHTML('products', '../admin/products.html'),
            loadHTML('orders', '../admin/orders.html'),
            loadHTML('users', '../admin/users.html'),
            loadHTML('banner', '../admin/banner.html')
        ]);

        // Khởi tạo các module
        initializeSidebar();
        initializeProductManagement();
        initializeOrderManagement();
        initializeTabs();
        
        // Tải dữ liệu ban đầu
        loadDashboardData();
        renderProducts();

    } catch (error) {
        console.error('Initialization failed:', error);
    }
});

// Module quản lý sidebar
function initializeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('toggleSidebar');

    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
        });
    }
}

// Module quản lý sản phẩm
function initializeProductManagement() {
    const productForm = document.getElementById('addProductForm');
    const productTableBody = document.getElementById('productTableBody');

    // Xử lý mở/đóng form
    document.addEventListener('click', function(event) {
        if (event.target.matches('#openFormBtn')) {
            showElement('overlay');
            showElement('addProductFormContainer');
        }
        if (event.target.matches('#overlay, .close-btn')) {
            hideElement('overlay');
            hideElement('addProductFormContainer');
        }
    });

    // Xử lý preview ảnh
    document.getElementById('imageFile')?.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const preview = document.getElementById('previewImage');
                preview.src = e.target.result;
                preview.classList.remove('hidden');
            };
            reader.readAsDataURL(file);
        }
    });

    // Xử lý submit form
    if (productForm) {
        productForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleProductSubmit();
        });
    }

    // Xử lý xóa sản phẩm
    if (productTableBody) {
        productTableBody.addEventListener('click', function(e) {
            if (e.target.matches('.btn-delete')) {
                const row = e.target.closest('tr');
                const productId = row.dataset.productId;
                deleteProduct(productId);
            }
        });
    }
}

// Module quản lý đơn hàng
function initializeOrderManagement() {
    const orderForm = document.getElementById('updateOrderForm');
    
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const orderId = document.getElementById('orderId').value;
            const newStatus = document.getElementById('orderStatus').value;
            updateOrderStatus(orderId, newStatus);
        });
    }
}

// Module quản lý tabs
function initializeTabs() {
    const navItems = document.querySelectorAll('.nav-item');
    const tabContents = document.querySelectorAll('.tab-content');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            // Xử lý chuyển tab
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
            
            const tabId = item.dataset.tab;
            tabContents.forEach(tab => {
                tab.classList.toggle('active', tab.id === tabId);
            });

            // Tải dữ liệu khi chuyển tab
            switch(tabId) {
                case 'products':
                    loadProductsData();
                    break;
                case 'orders':
                    loadOrdersData();
                    break;
                case 'users':
                    loadUsersData();
                    break;
            }
        });
    });
}

// Các hàm tiện ích
function showElement(id) {
    const el = document.getElementById(id);
    if (el) el.style.display = 'block';
}

function hideElement(id) {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
}

// Các hàm xử lý dữ liệu
async function handleProductSubmit() {
    const newProduct = {
        name: document.getElementById('productName').value,
        description: document.getElementById('description').value,
        image: document.getElementById('previewImage').src,
        category: document.getElementById('productCategory').value,
        price: parseFloat(document.getElementById('productPrice').value),
        stock: parseInt(document.getElementById('productStock').value)
    };

    try {
        // Giả lập API call
        await fakeApiCall('/products', 'POST', newProduct);
        renderProducts();
        hideElement('overlay');
        hideElement('addProductFormContainer');
        document.getElementById('addProductForm').reset();
    } catch (error) {
        alert('Error saving product: ' + error.message);
    }
}

async function fakeApiCall(endpoint, data) {
    // Giả lập API call với độ trễ
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Logic lưu vào localStorage
            if (endpoint === '/products') {
                const products = JSON.parse(localStorage.getItem('products') || '[]');
                products.push({...data, id: Date.now()});
                localStorage.setItem('products', JSON.stringify(products));
            }
            resolve({ status: 'success' });
        }, 500);
    });
}

// Các hàm render dữ liệu
function renderProducts() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const container = document.getElementById('productList') || document.getElementById('productTableBody');
    
    if (container) {
        container.innerHTML = products.map(product => `
            <tr data-product-id="${product.id}">
                <td>${product.name}</td>
                <td>${product.category}</td>
                <td>$${product.price.toFixed(2)}</td>
                <td>${product.stock}</td>
                <td>
                    <button class="action-btn btn-edit">Edit</button>
                    <button class="action-btn btn-delete">Delete</button>
                </td>
            </tr>
        `).join('');
    }
}

// Các hàm load dữ liệu
async function loadDashboardData() {
    // Implement dashboard data loading
}

async function loadProductsData() {
    // Implement products data loading
}

async function loadOrdersData() {
    // Implement orders data loading
}

async function loadUsersData() {
    // Implement users data loading
}