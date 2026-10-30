/**
 * NOVA FORM Generator Script
 * Generates all Front-Site and Admin Dashboard HTML pages
 */

const fs = require('fs');
const path = require('path');
const data = require('./sample-data');

const { products, categories, brands, sampleOrders, sampleCustomers, sampleDiscounts, sampleReviews, sampleBanners } = data;

// Shared Frontend Header & Announcement Bar
function getFrontendNav(activePage = 'home', relativeRoot = '') {
  return `
  <!-- Top Announcement Bar -->
  <div class="announcement-bar">
    <div class="container d-flex justify-content-between align-items-center">
      <div class="d-none d-md-flex align-items-center gap-3">
        <span><i class="bi bi-shield-check text-warning me-1"></i> 100% Genuine Full-Grain Leather</span>
        <span class="text-white-50">|</span>
        <span><i class="bi bi-truck text-warning me-1"></i> Cash on Delivery Across Pakistan</span>
      </div>
      <div class="mx-auto mx-md-0 text-center">
        <span>Complimentary Express Delivery on orders above PKR 10,000 <span class="badge-pak ms-1">PKR</span></span>
      </div>
      <div class="d-none d-lg-flex align-items-center gap-3">
        <a href="${relativeRoot}size-guide.html" class="text-white-50 text-decoration-none hover-white"><i class="bi bi-rulers me-1"></i> Size Guide</a>
        <a href="${relativeRoot}contact.html" class="text-white-50 text-decoration-none hover-white"><i class="bi bi-telephone me-1"></i> Helpline</a>
        <a href="../dashboard/index.html" class="badge bg-secondary text-white text-decoration-none px-2 py-1"><i class="bi bi-speedometer2 me-1"></i> Admin Portal</a>
      </div>
    </div>
  </div>

  <!-- Main Navigation -->
  <header class="nova-navbar">
    <div class="container">
      <div class="d-flex align-items-center justify-content-between">
        
        <!-- Mobile Menu Toggle Button -->
        <button class="navbar-toggler d-lg-none border-0 p-0 text-dark me-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#mobileNavOffcanvas" aria-controls="mobileNavOffcanvas">
          <i class="bi bi-list fs-2"></i>
        </button>

        <!-- Brand Identity -->
        <a href="${relativeRoot}index.html" class="brand-logo text-decoration-none me-4">
          NOVA FORM<span class="dot"></span>
        </a>

        <!-- Desktop Navigation Links -->
        <nav class="d-none d-lg-flex align-items-center gap-1">
          <a href="${relativeRoot}index.html" class="nav-link-nova ${activePage === 'home' ? 'active' : ''}">Home</a>
          <a href="${relativeRoot}shop.html" class="nav-link-nova ${activePage === 'shop' ? 'active' : ''}">Shop All</a>
          
          <div class="dropdown">
            <a href="${relativeRoot}category.html" class="nav-link-nova dropdown-toggle ${activePage === 'category' ? 'active' : ''}" data-bs-toggle="dropdown" aria-expanded="false">
              Categories
            </a>
            <ul class="dropdown-menu dropdown-menu-nova shadow-sm">
              <li><a class="dropdown-item" href="${relativeRoot}category.html"><i class="bi bi-suit-club me-2 text-muted"></i> Formal Shoes</a></li>
              <li><a class="dropdown-item" href="${relativeRoot}category.html"><i class="bi bi-layers me-2 text-muted"></i> Luxury Loafers</a></li>
              <li><a class="dropdown-item" href="${relativeRoot}category.html"><i class="bi bi-compass me-2 text-muted"></i> Casual Shoes</a></li>
              <li><a class="dropdown-item" href="${relativeRoot}category.html"><i class="bi bi-lightning-charge me-2 text-muted"></i> Sneakers & Trainers</a></li>
              <li><a class="dropdown-item" href="${relativeRoot}category.html"><i class="bi bi-sun me-2 text-muted"></i> Leather Sandals</a></li>
              <li><a class="dropdown-item" href="${relativeRoot}category.html"><i class="bi bi-shield-check me-2 text-muted"></i> Traditional Peshawari</a></li>
              <li><a class="dropdown-item" href="${relativeRoot}category.html"><i class="bi bi-gem me-2 text-muted"></i> Chelsea & Boots</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item text-danger fw-semibold" href="${relativeRoot}shop.html"><i class="bi bi-tag me-2"></i> View Special Offers</a></li>
            </ul>
          </div>

          <a href="${relativeRoot}category.html" class="nav-link-nova">Formal</a>
          <a href="${relativeRoot}category.html" class="nav-link-nova">Loafers</a>
          <a href="${relativeRoot}category.html" class="nav-link-nova">Traditional</a>
          <a href="${relativeRoot}about.html" class="nav-link-nova ${activePage === 'about' ? 'active' : ''}">About</a>
          <a href="${relativeRoot}shop.html" class="nav-link-nova sale-link">Sale</a>
        </nav>

        <!-- Action Icons -->
        <div class="d-flex align-items-center gap-1">
          <button class="nav-action-btn" data-bs-toggle="modal" data-bs-target="#searchModal" title="Search catalog">
            <i class="bi bi-search"></i>
          </button>
          
          <div class="dropdown">
            <button class="nav-action-btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" title="Account">
              <i class="bi bi-person"></i>
            </button>
            <ul class="dropdown-menu dropdown-menu-end dropdown-menu-nova shadow-sm">
              <li><h6 class="dropdown-header text-uppercase text-muted small fw-bold">Customer Portal</h6></li>
              <li><a class="dropdown-item" href="${relativeRoot}account.html"><i class="bi bi-person-circle me-2 text-muted"></i> My Account</a></li>
              <li><a class="dropdown-item" href="${relativeRoot}orders.html"><i class="bi bi-bag-check me-2 text-muted"></i> Order History</a></li>
              <li><a class="dropdown-item" href="${relativeRoot}wishlist.html"><i class="bi bi-heart me-2 text-muted"></i> Wishlist</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" href="${relativeRoot}login.html"><i class="bi bi-box-arrow-in-right me-2 text-muted"></i> Sign In</a></li>
              <li><a class="dropdown-item" href="${relativeRoot}register.html"><i class="bi bi-person-plus me-2 text-muted"></i> Create Account</a></li>
            </ul>
          </div>

          <a href="${relativeRoot}wishlist.html" class="nav-action-btn" title="Saved Wishlist">
            <i class="bi bi-heart"></i>
            <span class="nav-action-badge wishlist-count-badge">3</span>
          </a>

          <a href="${relativeRoot}cart.html" class="nav-action-btn" title="Shopping Bag">
            <i class="bi bi-bag"></i>
            <span class="nav-action-badge cart-count-badge">2</span>
          </a>
        </div>

      </div>
    </div>
  </header>

  <!-- Mobile Offcanvas Menu -->
  <div class="offcanvas offcanvas-start" tabindex="-1" id="mobileNavOffcanvas" aria-labelledby="mobileNavLabel">
    <div class="offcanvas-header border-bottom">
      <h5 class="offcanvas-title brand-logo" id="mobileNavLabel">NOVA FORM<span class="dot"></span></h5>
      <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body p-4">
      <div class="mb-4">
        <form action="${relativeRoot}shop.html" method="GET">
          <div class="input-group">
            <input type="text" name="q" class="form-control form-control-nova" placeholder="Search shoes, loafers, boots...">
            <button class="btn btn-dark" type="submit"><i class="bi bi-search"></i></button>
          </div>
        </form>
      </div>

      <ul class="list-unstyled mb-4">
        <li class="mb-2"><a href="${relativeRoot}index.html" class="d-block py-2 text-decoration-none fw-semibold border-bottom">Home</a></li>
        <li class="mb-2"><a href="${relativeRoot}shop.html" class="d-block py-2 text-decoration-none fw-semibold border-bottom">Shop All Footwear</a></li>
        <li class="mb-2"><a href="${relativeRoot}category.html" class="d-block py-2 text-decoration-none fw-semibold border-bottom">Formal Shoes</a></li>
        <li class="mb-2"><a href="${relativeRoot}category.html" class="d-block py-2 text-decoration-none fw-semibold border-bottom">Loafers & Slip-ons</a></li>
        <li class="mb-2"><a href="${relativeRoot}category.html" class="d-block py-2 text-decoration-none fw-semibold border-bottom">Traditional Peshawari</a></li>
        <li class="mb-2"><a href="${relativeRoot}category.html" class="d-block py-2 text-decoration-none fw-semibold border-bottom">Sneakers & Trainers</a></li>
        <li class="mb-2"><a href="${relativeRoot}size-guide.html" class="d-block py-2 text-decoration-none fw-semibold border-bottom">Shoe Size Guide (EU 39-46)</a></li>
        <li class="mb-2"><a href="${relativeRoot}about.html" class="d-block py-2 text-decoration-none fw-semibold border-bottom">About NOVA FORM</a></li>
        <li class="mb-2"><a href="${relativeRoot}contact.html" class="d-block py-2 text-decoration-none fw-semibold border-bottom">Contact & Stores</a></li>
      </ul>

      <div class="border-top pt-3">
        <div class="d-flex flex-column gap-2">
          <a href="${relativeRoot}account.html" class="btn btn-outline-dark w-100 py-2"><i class="bi bi-person me-2"></i> Customer Account</a>
          <a href="../dashboard/index.html" class="btn btn-dark w-100 py-2"><i class="bi bi-shield-lock me-2"></i> Admin Dashboard</a>
        </div>
      </div>
    </div>
  </div>

  <!-- Search Modal -->
  <div class="modal fade" id="searchModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content border-0 shadow-lg">
        <div class="modal-body p-4">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h6 class="text-uppercase fw-bold text-muted small mb-0">Search NOVA FORM Catalog</h6>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <form action="${relativeRoot}shop.html" method="GET">
            <div class="input-group input-group-lg border rounded-1 overflow-hidden">
              <span class="input-group-text bg-white border-0"><i class="bi bi-search text-muted"></i></span>
              <input type="text" name="search" class="form-control border-0 shadow-none ps-0" placeholder="Type shoe style (e.g., Oxford, Loafer, Chelsea, Chappal)..." autofocus>
              <button class="btn btn-nova-dark rounded-0 px-4" type="submit">Search</button>
            </div>
          </form>
          <div class="mt-3">
            <span class="text-muted small me-2">Trending Searches:</span>
            <a href="${relativeRoot}shop.html" class="badge bg-light text-dark text-decoration-none me-1">Oxford Shoes</a>
            <a href="${relativeRoot}shop.html" class="badge bg-light text-dark text-decoration-none me-1">Penny Loafers</a>
            <a href="${relativeRoot}shop.html" class="badge bg-light text-dark text-decoration-none me-1">Kaptaan Chappal</a>
            <a href="${relativeRoot}shop.html" class="badge bg-light text-dark text-decoration-none">Chelsea Boots</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  `;
}

// Shared Frontend Footer
function getFrontendFooter(relativeRoot = '') {
  return `
  <!-- Shared Luxe Footer -->
  <footer class="nova-footer">
    <div class="container">
      <div class="row g-4 mb-5">
        
        <!-- Brand Col -->
        <div class="col-lg-4 col-md-6">
          <a href="${relativeRoot}index.html" class="footer-logo text-decoration-none">
            NOVA FORM<span class="text-warning">.</span>
          </a>
          <p class="text-white-50 small pe-lg-4 mb-4" style="line-height: 1.8;">
            NOVA FORM is a contemporary Pakistani luxury footwear atelier. Rooted in artisanal shoemaking heritage, we craft refined men's dress shoes, Goodyear-welted oxfords, supple loafers, and authentic traditional footwear built for timeless elegance.
          </p>
          <div class="footer-social-links">
            <a href="#" aria-label="Instagram"><i class="bi bi-instagram"></i></a>
            <a href="#" aria-label="Facebook"><i class="bi bi-facebook"></i></a>
            <a href="#" aria-label="LinkedIn"><i class="bi bi-linkedin"></i></a>
            <a href="#" aria-label="Twitter"><i class="bi bi-twitter-x"></i></a>
          </div>
        </div>

        <!-- Footwear Collections -->
        <div class="col-lg-2 col-md-6 col-6">
          <h4 class="footer-heading">Collections</h4>
          <ul class="footer-links">
            <li><a href="${relativeRoot}category.html">Formal Oxfords</a></li>
            <li><a href="${relativeRoot}category.html">Penny & Tassel Loafers</a></li>
            <li><a href="${relativeRoot}category.html">Double Monk Straps</a></li>
            <li><a href="${relativeRoot}category.html">Heritage Peshawari</a></li>
            <li><a href="${relativeRoot}category.html">Chelsea Boots</a></li>
            <li><a href="${relativeRoot}category.html">Minimalist Sneakers</a></li>
            <li><a href="${relativeRoot}shop.html" class="text-warning">Seasonal Archive</a></li>
          </ul>
        </div>

        <!-- Concierge & Care -->
        <div class="col-lg-2 col-md-6 col-6">
          <h4 class="footer-heading">Client Care</h4>
          <ul class="footer-links">
            <li><a href="${relativeRoot}size-guide.html">Shoe Size Guide</a></li>
            <li><a href="${relativeRoot}orders.html">Track Your Order</a></li>
            <li><a href="${relativeRoot}contact.html">Store Ateliers</a></li>
            <li><a href="${relativeRoot}about.html">Our Craftsmanship</a></li>
            <li><a href="${relativeRoot}contact.html">Exchange & Returns</a></li>
            <li><a href="${relativeRoot}contact.html">Concierge Service</a></li>
            <li><a href="../dashboard/login.html" class="text-muted"><i class="bi bi-shield-lock me-1"></i> Staff Login</a></li>
          </ul>
        </div>

        <!-- Store Ateliers & Newsletter -->
        <div class="col-lg-4 col-md-6">
          <h4 class="footer-heading">Atelier Locations</h4>
          <p class="text-white-50 small mb-2"><i class="bi bi-geo-alt text-warning me-2"></i> <strong>Lahore:</strong> MM Alam Road, Gulberg III</p>
          <p class="text-white-50 small mb-2"><i class="bi bi-geo-alt text-warning me-2"></i> <strong>Karachi:</strong> Bukhari Commercial, DHA Phase VI</p>
          <p class="text-white-50 small mb-4"><i class="bi bi-geo-alt text-warning me-2"></i> <strong>Islamabad:</strong> Beverly Centre, Blue Area</p>

          <h5 class="text-white text-uppercase fs-6 fw-bold mb-2">Private Newsletter</h5>
          <p class="text-white-50 small mb-2">Subscribe to receive early access to limited edition shoemaking runs.</p>
          <form class="demo-newsletter-form">
            <div class="input-group">
              <input type="email" class="form-control form-control-sm rounded-0 border-secondary bg-dark text-white" placeholder="Enter your email address" required>
              <button class="btn btn-warning rounded-0 px-3 text-dark fw-bold text-uppercase small" type="submit">Join</button>
            </div>
          </form>
        </div>

      </div>

      <!-- Bottom Bar -->
      <div class="footer-bottom d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
        <p class="mb-0 text-white-50">
          &copy; 2026 NOVA FORM Footwear (Pvt) Ltd. All rights reserved. Registered in Pakistan.
        </p>
        <div class="d-flex align-items-center gap-3 text-white-50 small">
          <span>Prices in Pakistani Rupee (PKR)</span>
          <span>&bull;</span>
          <a href="${relativeRoot}about.html" class="text-white-50 text-decoration-none">Terms</a>
          <span>&bull;</span>
          <a href="${relativeRoot}about.html" class="text-white-50 text-decoration-none">Privacy</a>
          <span>&bull;</span>
          <a href="../dashboard/index.html" class="text-warning text-decoration-none fw-semibold">Dashboard Demo</a>
        </div>
      </div>
    </div>
  </footer>

  <!-- Bootstrap 5 JS Bundle -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  <!-- Custom Minimal Frontend Script -->
  <script src="${relativeRoot}assets/js/main.js"></script>
  `;
}

// Generate Product Card HTML
function renderProductCard(p, relativeRoot = '') {
  return `
  <div class="product-card">
    <div class="product-img-wrap">
      <div class="product-badges">
        ${p.isSale ? '<span class="badge-sale">Sale</span>' : ''}
        ${p.isNew ? '<span class="badge-new">New</span>' : ''}
      </div>
      <button class="product-wishlist-btn" title="Add to Wishlist" data-product-id="${p.id}">
        <i class="bi bi-heart"></i>
      </button>
      <a href="${relativeRoot}product-details.html">
        <img src="${p.image}" alt="${p.name}" loading="lazy">
      </a>
      <div class="product-quick-actions">
        <button class="quick-view-btn btn-quick-add" data-product-title="${p.name}">
          <i class="bi bi-bag-plus me-1"></i> Quick Add
        </button>
      </div>
    </div>
    <div class="product-info">
      <div class="product-category">${p.category}</div>
      <h3 class="product-name">
        <a href="${relativeRoot}product-details.html">${p.name}</a>
      </h3>
      <div class="product-rating">
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        <span class="count">(${p.reviewsCount})</span>
      </div>
      <div class="product-price-box">
        <span class="current-price">PKR ${p.price.toLocaleString()}</span>
        ${p.originalPrice > p.price ? `<span class="original-price">PKR ${p.originalPrice.toLocaleString()}</span>` : ''}
      </div>
      <div class="product-colors">
        ${p.colors.map(c => `<span class="color-dot" style="background-color: ${c};" title="Available Color"></span>`).join('')}
      </div>
    </div>
  </div>
  `;
}

// Shared Dashboard Sidebar & Topbar
function getDashboardLayout(activePage = 'overview', relativeRoot = '') {
  const menu = [
    { id: 'overview', title: 'Overview', link: 'index.html', icon: 'bi-grid' },
    { id: 'products', title: 'Products', link: 'products.html', icon: 'bi-box-seam' },
    { id: 'product-add', title: 'Add Product', link: 'product-add.html', icon: 'bi-plus-circle' },
    { id: 'categories', title: 'Categories', link: 'categories.html', icon: 'bi-tags' },
    { id: 'brands', title: 'Brands', link: 'brands.html', icon: 'bi-award' },
    { id: 'inventory', title: 'Inventory', link: 'inventory.html', icon: 'bi-boxes' },
    { id: 'orders', title: 'Orders', link: 'orders.html', icon: 'bi-cart-check' },
    { id: 'customers', title: 'Customers', link: 'customers.html', icon: 'bi-people' },
    { id: 'reviews', title: 'Reviews', link: 'reviews.html', icon: 'bi-chat-left-quote' },
    { id: 'banners', title: 'Banners', link: 'banners.html', icon: 'bi-images' },
    { id: 'website-content', title: 'Website Content', link: 'website-content.html', icon: 'bi-layout-text-window-reverse' },
    { id: 'settings', title: 'Settings', link: 'settings.html', icon: 'bi-gear' },
    { id: 'profile', title: 'Profile', link: 'profile.html', icon: 'bi-person-badge' }
  ];

  const sidebarLinks = menu.map(item => `
    <li class="sidebar-item">
      <a href="${relativeRoot}${item.link}" class="sidebar-link ${activePage === item.id ? 'active' : ''}">
        <i class="bi ${item.icon}"></i>
        <span>${item.title}</span>
      </a>
    </li>
  `).join('');

  return {
    sidebar: `
    <!-- Admin Sidebar -->
    <aside class="admin-sidebar">
      <div class="sidebar-brand">
        <a href="${relativeRoot}index.html" class="sidebar-brand-title text-decoration-none">
          NOVA FORM <span class="badge-role">ADMIN</span>
        </a>
      </div>
      <ul class="sidebar-menu">
        <li class="sidebar-heading">Operations</li>
        ${sidebarLinks}
      </ul>
      <div class="sidebar-footer">
        <a href="../front-site/index.html" class="btn btn-outline-light btn-sm w-100 mb-2 text-start">
          <i class="bi bi-box-arrow-up-right me-2"></i> Visit Storefront
        </a>
        <a href="${relativeRoot}login.html" class="btn btn-dark btn-sm w-100 text-start text-danger">
          <i class="bi bi-power me-2"></i> Sign Out
        </a>
      </div>
    </aside>
    `,
    topbar: `
    <!-- Topbar -->
    <header class="admin-topbar">
      <div class="d-flex align-items-center gap-3">
        <button class="btn btn-link text-dark p-0 d-lg-none" id="sidebarToggleBtn" aria-label="Toggle Navigation">
          <i class="bi bi-list fs-3"></i>
        </button>
        <div class="topbar-search">
          <i class="bi bi-search search-icon"></i>
          <input type="text" class="form-control" id="tableSearchInput" placeholder="Quick search inventory, orders...">
        </div>
      </div>

      <div class="topbar-actions">
        <a href="../front-site/index.html" target="_blank" class="btn btn-sm btn-outline-secondary d-none d-md-inline-flex align-items-center gap-1">
          <i class="bi bi-eye"></i> View Site
        </a>
        
        <div class="dropdown">
          <a href="#" class="topbar-icon-btn" data-bs-toggle="dropdown" aria-expanded="false" title="Notifications">
            <i class="bi bi-bell"></i>
            <span class="topbar-badge-dot"></span>
          </a>
          <ul class="dropdown-menu dropdown-menu-end shadow-sm border-0" style="min-width: 280px;">
            <li><h6 class="dropdown-header text-uppercase small fw-bold">Recent Alerts</h6></li>
            <li><a class="dropdown-item small py-2" href="${relativeRoot}orders.html"><i class="bi bi-bag-check text-success me-2"></i> New Order #NF-88291 received (PKR 14,999)</a></li>
            <li><a class="dropdown-item small py-2" href="${relativeRoot}inventory.html"><i class="bi bi-exclamation-triangle text-warning me-2"></i> Low stock: Sahara Suede Chukka (9 left)</a></li>
            <li><a class="dropdown-item small py-2" href="${relativeRoot}reviews.html"><i class="bi bi-star text-primary me-2"></i> New 5-star review pending approval</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item text-center small text-primary fw-semibold" href="${relativeRoot}orders.html">View All Notifications</a></li>
          </ul>
        </div>

        <div class="dropdown">
          <a href="#" class="d-flex align-items-center text-decoration-none dropdown-toggle text-dark" data-bs-toggle="dropdown" aria-expanded="false">
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop" class="admin-avatar me-2" alt="Admin">
            <div class="d-none d-sm-block text-start">
              <div class="fw-semibold small leading-none">M. Asif</div>
              <div class="text-muted" style="font-size: 0.7rem;">Store Director</div>
            </div>
          </a>
          <ul class="dropdown-menu dropdown-menu-end shadow-sm border-0">
            <li><a class="dropdown-item" href="${relativeRoot}profile.html"><i class="bi bi-person me-2 text-muted"></i> My Profile</a></li>
            <li><a class="dropdown-item" href="${relativeRoot}settings.html"><i class="bi bi-gear me-2 text-muted"></i> Store Settings</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item text-danger" href="${relativeRoot}login.html"><i class="bi bi-box-arrow-right me-2"></i> Logout</a></li>
          </ul>
        </div>
      </div>
    </header>
    `
  };
}

module.exports = {
  getFrontendNav,
  getFrontendFooter,
  renderProductCard,
  getDashboardLayout
};
