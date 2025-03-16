const products = [
  {
    id: 1,
    name: "LABUBU Limited Edition Merlion Plush Series",
    price: 499000,
    originalPrice: 599000,
    image: "../assets/images/sanpham/labubu/sanpham-labubu-limit.jpg",
    badges: "Bán chạy",
    badgeColor: "#38c172" // green
  },
  {
    id: 2,
    name: "LABUBU × PRONOUNCE - WINGS OF FORTUNE",
    price: 350000,
    image: "../assets/images/sanpham/labubu/sanpham-labubu-1.jpg",
    badges: "Bán chạy",
    badgeColor: "#38c172" // green
  },
  {
    id: 3,
    name: "LABUBU - Good Luck To You",
    price: 1200000,
    originalPrice: 1500000,
    image: "../assets/images/sanpham/labubu/sanpham-labubu-2.jpg",
    badges: "Mới",
    badgeColor: "#3490dc" // blue
  },
  {
    id: 4,
    name: "Labubu Chinese New Year China",
    price: 790000,
    image: "../assets/images/sanpham/labubu/sanpham-labubu-3.jpg",
    badges: "Mới",
    badgeColor: "#3490dc" // blue
  },
  {
    id: 5,
    name: "Baby Three 12 Con Giáp Zodiac Chinese",
    price: 150000,
    image: "../assets/images/sanpham/babythree/sanpham-babythree-1.jpg",
    badges: "Giảm giá",
    badgeColor: "#e3342f" // red
  },
  {
    id: 6,
    name: "Baby Three Lucky Cat",
    price: 450000,
    originalPrice: 520000,
    image: "../assets/images/sanpham/babythree/sanpham-babythree-2.jpg",
    badges: "Giảm giá",
    badgeColor: "#e3342f"
  },
  {
    id: 7,
    name: "Mô hình OnePiece Luffy nika gear 5",
    price: 320000,
    image: "../assets/images/sanpham/mohinh/sanpham-mohinh-1.jpg",
    badges: "Giảm giá",
    badgeColor: "#e3342f" // red
  },
  {
    id: 8,
    name: "Mô hình Monkey D Luffy One Piece Gear 4 25cm",
    price: 890000,
    originalPrice: 950000,
    image: "../assets/images/sanpham/mohinh/sanpham-mohinh-2.png",
    badges: "Giảm giá",
    badgeColor: "#e3342f"
  },
  {
    id: 9,
    name: "LABUBU Limited Edition Merlion Plush Series",
    price: 499000,
    originalPrice: 599000,
    image: "../assets/images/sanpham/labubu/sanpham-labubu-limit.jpg",
    badges: "Bán chạy",
    badgeColor: "#38c172" // green
  },
  {
    id: 10,
    name: "LABUBU × PRONOUNCE - WINGS OF FORTUNE",
    price: 350000,
    image: "../assets/images/sanpham/labubu/sanpham-labubu-1.jpg",
    badges: "Bán chạy",
    badgeColor: "#38c172" // green
  },
  {
    id: 11,
    name: "LABUBU - Good Luck To You",
    price: 1200000,
    originalPrice: 1500000,
    image: "../assets/images/sanpham/labubu/sanpham-labubu-2.jpg",
    badges: "Mới",
    badgeColor: "#3490dc" // blue
  },
  {
    id: 12,
    name: "Labubu Chinese New Year China",
    price: 790000,
    image: "../assets/images/sanpham/labubu/sanpham-labubu-3.jpg",
    badges: "Mới",
    badgeColor: "#3490dc" // blue
  },
  {
    id: 13,
    name: "Baby Three 12 Con Giáp Zodiac Chinese",
    price: 150000,
    image: "../assets/images/sanpham/babythree/sanpham-babythree-1.jpg",
    badges: "Giảm giá",
    badgeColor: "#e3342f" // red
  },
  {
    id: 14,
    name: "Baby Three Lucky Cat",
    price: 450000,
    originalPrice: 520000,
    image: "../assets/images/sanpham/babythree/sanpham-babythree-2.jpg",
    badges: "Giảm giá",
    badgeColor: "#e3342f"
  },
  {
    id: 15,
    name: "Mô hình OnePiece Luffy nika gear 5",
    price: 320000,
    image: "../assets/images/sanpham/mohinh/sanpham-mohinh-1.jpg",
    badges: "Giảm giá",
    badgeColor: "#e3342f" // red
  },
  {
    id: 16,
    name: "Mô hình Monkey D Luffy One Piece Gear 4 25cm",
    price: 890000,
    originalPrice: 950000,
    image: "../assets/images/sanpham/mohinh/sanpham-mohinh-2.png",
    badges: "Giảm giá",
    badgeColor: "#e3342f"
  },
];

// Cấu hình phân trang
const itemsPerPage = 16;
let currentPage = 1;
let filteredProducts = [...products];

// Hàm định dạng giá tiền
function formatPrice(price) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
          .format(price)
          .replace('₫', 'đ');
}

// Hàm tạo toast thông báo
function showToast(title, description) {
  const toastContainer = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<strong>${title}</strong><br>${description}`;
  toastContainer.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// Xử lý các hành động
function handleAddToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (product) {
    showToast("Thêm vào giỏ hàng thành công", `${product.name} đã được thêm vào giỏ hàng.`);
  }
}

function handleAddToWishlist(productId, btnWishlist) {
  const product = products.find(p => p.id === productId);
  if (product) {
    product.wishlist = !product.wishlist;
    if (product.wishlist) {
      btnWishlist.classList.add('wishlist-active');
      btnWishlist.querySelector('.tooltip').textContent = 'Bỏ yêu thích';
    } else {
      btnWishlist.classList.remove('wishlist-active');
      btnWishlist.querySelector('.tooltip').textContent = 'Yêu thích';
    }
  }
}

// Hàm tạo mã HTML cho từng sản phẩm
function createProductCard(product) {
  const card = document.createElement('div');
  card.className = 'product-card';

  // Container hình ảnh
  const imageContainer = document.createElement('div');
  imageContainer.className = 'image-container';

  // Badge nếu có
  if (product.badges) {
    const badgeSpan = document.createElement('span');
    badgeSpan.className = 'badges';
    badgeSpan.style.backgroundColor = product.badgeColor;
    badgeSpan.style.display = 'inline-block';
    badgeSpan.style.padding = '8px 16px';
    badgeSpan.style.fontSize = '0.8rem';
    badgeSpan.style.fontWeight = '600';
    badgeSpan.style.color = '#fff';
    badgeSpan.style.borderRadius = '9999px';
    badgeSpan.style.textTransform = 'uppercase';
    badgeSpan.style.margin = '0';
    badgeSpan.textContent = product.badges;
    imageContainer.appendChild(badgeSpan);
  }
  
  const img = document.createElement('img');
  img.src = product.image;
  img.alt = product.name;
  imageContainer.appendChild(img);

  // Overlay buttons
  const overlay = document.createElement('div');
  overlay.className = 'overlay-buttons';

  // Button Add to Cart
  const btnCart = document.createElement('button');
  btnCart.setAttribute('aria-label', 'Add to cart');
  btnCart.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2"
      viewBox="0 0 24 24">
      <circle cx="9" cy="21" r="1"></circle>
      <circle cx="20" cy="21" r="1"></circle>
      <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 001.98-1.75l1.54-9.26H6"></path>
    </svg>`;
  btnCart.addEventListener('click', function(e) {
    e.stopPropagation();
    handleAddToCart(product.id);
  });
  overlay.appendChild(btnCart);

  // Button Add to Wishlist
  const btnWishlist = document.createElement('button');
  btnWishlist.setAttribute('aria-label', 'Add to wishlist');
  btnWishlist.className = product.wishlist ? 'wishlist-active' : '';
  btnWishlist.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2"
      viewBox="0 0 24 24">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
    </svg>
    <span class="tooltip">${product.wishlist ? 'Bỏ yêu thích' : 'Yêu thích'}</span>`;
  btnWishlist.addEventListener('click', function(e) {
    e.stopPropagation();
    handleAddToWishlist(product.id, btnWishlist);
  });
  overlay.appendChild(btnWishlist);

  // Link Quick View
  const linkView = document.createElement('a');
  linkView.href = `../../views/product-details.html`;//   /products/${product.id}
  linkView.setAttribute('aria-label', 'Quick view');
  linkView.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2"
      viewBox="0 0 24 24">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>`;
  overlay.appendChild(linkView);

  imageContainer.appendChild(overlay);
  card.appendChild(imageContainer);

  // Thông tin sản phẩm
  const info = document.createElement('div');
  info.className = 'product-info';

  const nameEl = document.createElement('h3');
  nameEl.textContent = product.name;
  info.appendChild(nameEl);

  const priceEl = document.createElement('div');
  priceEl.innerHTML = `<span class="price">${formatPrice(product.price)}</span>`;
  if(product.originalPrice) {
    priceEl.innerHTML += `<span class="original-price">${formatPrice(product.originalPrice)}</span>`;
  }
  info.appendChild(priceEl);

  card.appendChild(info);
  return card;
}

// Hiển thị danh sách sản phẩm
const productsGrid = document.getElementById('productsGrid');
products.forEach(product => {
  const card = createProductCard(product);
  productsGrid.appendChild(card);
});
// Hàm hiển thị danh sách sản phẩm (đã hợp nhất)
function renderProducts(productsToShow) {
  const productsGrid = document.getElementById('productsGrid');
  productsGrid.innerHTML = ''; // Xóa tất cả sản phẩm hiện tại
  
  if (productsToShow.length === 0) {
    const message = document.createElement('p');
    // message.textContent = 'Không tìm thấy sản phẩm nào.';
    productsGrid.appendChild(message);
  } else {
    productsToShow.forEach(product => {
      const card = createProductCard(product);
      productsGrid.appendChild(card);
    });
  }
}

function updateDisplay() {
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  renderProducts(filteredProducts.slice(start, end));
  updatePagination();
}

function updatePagination() {
  const paginationContainer = document.querySelector('.pagination');
  paginationContainer.innerHTML = '';
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  if(totalPages === 0) return; // Nếu không có sản phẩm nào, không tạo phân trang

  // Nút Previous
  const prevButton = document.createElement('button');
  prevButton.innerHTML = '&laquo;';
  prevButton.disabled = currentPage === 1;
  prevButton.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      updateDisplay();
    }
  });
  paginationContainer.appendChild(prevButton);

  // Các nút trang
  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement('button');
    pageButton.textContent = i;
    pageButton.className = i === currentPage ? 'active' : '';
    pageButton.addEventListener('click', () => {
      currentPage = i;
      updateDisplay();
    });
    paginationContainer.appendChild(pageButton);
  }

  // Nút Next
  const nextButton = document.createElement('button');
  nextButton.innerHTML = '&raquo;';
  nextButton.disabled = currentPage === totalPages;
  nextButton.addEventListener('click', () => {
    if (currentPage < totalPages) {
      currentPage++;
      updateDisplay();
    }
  });
  paginationContainer.appendChild(nextButton);
}

// Sửa lại hàm handleCategoryChange để lọc sản phẩm theo danh mục đúng
function handleCategoryChange(selectedCategoryId) {
  if (selectedCategoryId === 'all') {
    filteredProducts = [...products];
  } else if (selectedCategoryId === 'labubu') {
    filteredProducts = products.filter(product => 
      product.name.toLowerCase().includes('labubu')
    );
  } else if (selectedCategoryId === 'babythree') {
    filteredProducts = products.filter(product => 
      product.name.toLowerCase().includes('baby three')
    );
  } else if (selectedCategoryId === 'lego') {
    filteredProducts = products.filter(product => 
      product.name.toLowerCase().includes('lego')
    );
  } else if (selectedCategoryId === 'mohinh') {
    filteredProducts = products.filter(product => 
      product.name.toLowerCase().includes('mô hình')
    );
  }
  
  applyCurrentSort();
  currentPage = 1;
  updateDisplay();
}

function applyCurrentSort() {
  const sortValue = document.getElementById('sort-select').value;
  switch(sortValue) {
    case 'Tên A → Z':
      filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'Tên Z → A':
      filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case 'Giá thấp đến cao':
      filteredProducts.sort((a, b) => a.price - b.price);
      break;
    case 'Giá cao đến thấp':
      filteredProducts.sort((a, b) => b.price - a.price);
      break;
    case 'Mới nhất':
      filteredProducts.sort((a, b) => b.id - a.id);
      break;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Thiết lập giá trị ban đầu
  filteredProducts = [...products];
  
  // Chọn radio button "Tất cả" làm mặc định
  document.getElementById('all').checked = true;
  
  // Áp dụng sắp xếp và hiển thị ban đầu
  applyCurrentSort();
  updateDisplay();

  // Sự kiện cho radio button danh mục
  document.querySelectorAll('input[name="danh-muc-sanpham"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      handleCategoryChange(e.target.id);
    });
  });

  // Sự kiện thay đổi sắp xếp
  document.getElementById('sort-select').addEventListener('change', () => {
    applyCurrentSort();
    currentPage = 1;
    updateDisplay();
  });

  // Sự kiện cho phần danh sách yêu thích
  document.getElementById('wishlistSection').addEventListener('click', function() {
    const wishlistProducts = products.filter(product => product.wishlist);
    renderProducts(wishlistProducts);
  });
});
