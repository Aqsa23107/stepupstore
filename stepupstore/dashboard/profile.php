<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Profile | NOVA FORM Admin Dashboard</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
  <link rel="stylesheet" href="assets/css/dashboard.css">
  <link rel="stylesheet" href="assets/css/responsive.css">
</head>
<body>

  <div class="admin-wrapper">
    
    <!-- Admin Sidebar -->
    <aside class="admin-sidebar">
      <div class="sidebar-brand">
        <a href="index.html" class="sidebar-brand-title text-decoration-none">
          NOVA FORM <span class="badge-role">ADMIN</span>
        </a>
      </div>
      <ul class="sidebar-menu">
        <li class="sidebar-heading">Operations</li>
        
    <li class="sidebar-item">
      <a href="index.html" class="sidebar-link ">
        <i class="bi bi-grid"></i>
        <span>Overview</span>
      </a>
    </li>
  
    <li class="sidebar-item">
      <a href="products.html" class="sidebar-link ">
        <i class="bi bi-box-seam"></i>
        <span>Products</span>
      </a>
    </li>
  
    <li class="sidebar-item">
      <a href="product-add.html" class="sidebar-link ">
        <i class="bi bi-plus-circle"></i>
        <span>Add Product</span>
      </a>
    </li>
  
    <li class="sidebar-item">
      <a href="categories.html" class="sidebar-link ">
        <i class="bi bi-tags"></i>
        <span>Categories</span>
      </a>
    </li>
  
    <li class="sidebar-item">
      <a href="brands.html" class="sidebar-link ">
        <i class="bi bi-award"></i>
        <span>Brands</span>
      </a>
    </li>
  
    <li class="sidebar-item">
      <a href="inventory.html" class="sidebar-link ">
        <i class="bi bi-boxes"></i>
        <span>Inventory</span>
      </a>
    </li>
  
    <li class="sidebar-item">
      <a href="orders.html" class="sidebar-link ">
        <i class="bi bi-cart-check"></i>
        <span>Orders</span>
      </a>
    </li>
  
    <li class="sidebar-item">
      <a href="customers.html" class="sidebar-link ">
        <i class="bi bi-people"></i>
        <span>Customers</span>
      </a>
    </li>
  
    <li class="sidebar-item">
      <a href="reviews.html" class="sidebar-link ">
        <i class="bi bi-chat-left-quote"></i>
        <span>Reviews</span>
      </a>
    </li>
  
    <li class="sidebar-item">
      <a href="banners.html" class="sidebar-link ">
        <i class="bi bi-images"></i>
        <span>Banners</span>
      </a>
    </li>
  
    <li class="sidebar-item">
      <a href="website-content.html" class="sidebar-link ">
        <i class="bi bi-layout-text-window-reverse"></i>
        <span>Website Content</span>
      </a>
    </li>
  
    <li class="sidebar-item">
      <a href="settings.html" class="sidebar-link ">
        <i class="bi bi-gear"></i>
        <span>Settings</span>
      </a>
    </li>
  
    <li class="sidebar-item">
      <a href="profile.html" class="sidebar-link active">
        <i class="bi bi-person-badge"></i>
        <span>Profile</span>
      </a>
    </li>
  
      </ul>
      <div class="sidebar-footer">
        <a href="../front-site/index.html" class="btn btn-outline-light btn-sm w-100 mb-2 text-start">
          <i class="bi bi-box-arrow-up-right me-2"></i> Visit Storefront
        </a>
        <a href="login.html" class="btn btn-dark btn-sm w-100 text-start text-danger">
          <i class="bi bi-power me-2"></i> Sign Out
        </a>
      </div>
    </aside>
    

    <div class="admin-main">
      
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
            <li><a class="dropdown-item small py-2" href="orders.html"><i class="bi bi-bag-check text-success me-2"></i> New Order #NF-88291 received (PKR 14,999)</a></li>
            <li><a class="dropdown-item small py-2" href="inventory.html"><i class="bi bi-exclamation-triangle text-warning me-2"></i> Low stock: Sahara Suede Chukka (9 left)</a></li>
            <li><a class="dropdown-item small py-2" href="reviews.html"><i class="bi bi-star text-primary me-2"></i> New 5-star review pending approval</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item text-center small text-primary fw-semibold" href="orders.html">View All Notifications</a></li>
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
            <li><a class="dropdown-item" href="profile.html"><i class="bi bi-person me-2 text-muted"></i> My Profile</a></li>
            <li><a class="dropdown-item" href="settings.html"><i class="bi bi-gear me-2 text-muted"></i> Store Settings</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item text-danger" href="login.html"><i class="bi bi-box-arrow-right me-2"></i> Logout</a></li>
          </ul>
        </div>
      </div>
    </header>
    

      <main class="admin-content">
        
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h1 class="page-title">Administrator Profile</h1>
        <p class="page-subtitle">Manage personal credentials and security access.</p>
      </div>
    </div>

    <form class="admin-demo-form" data-success-msg="Admin profile credentials updated!">
      <div class="row g-4">
        
        <div class="col-lg-8">
          <div class="admin-card mb-4">
            <div class="admin-card-header"><h5 class="admin-card-title">Account Details</h5></div>
            <div class="admin-card-body">
              <div class="row g-3">
                <div class="col-md-6">
                  <label class="form-label small fw-bold">Full Name</label>
                  <input type="text" class="form-control" value="M. Asif" required>
                </div>
                <div class="col-md-6">
                  <label class="form-label small fw-bold">Administrative Role</label>
                  <input type="text" class="form-control bg-light" value="Store Director (Superadmin)" readonly>
                </div>
                <div class="col-md-6">
                  <label class="form-label small fw-bold">Email Address</label>
                  <input type="email" class="form-control" value="admin@novaformshoes.pk" required>
                </div>
                <div class="col-md-6">
                  <label class="form-label small fw-bold">Phone Number</label>
                  <input type="tel" class="form-control" value="+92 300 8472911">
                </div>
              </div>
            </div>
          </div>

          <div class="admin-card mb-4">
            <div class="admin-card-header"><h5 class="admin-card-title">Security & Password</h5></div>
            <div class="admin-card-body">
              <div class="row g-3">
                <div class="col-md-6">
                  <label class="form-label small fw-bold">New Password</label>
                  <input type="password" class="form-control" placeholder="••••••••">
                </div>
                <div class="col-md-6">
                  <label class="form-label small fw-bold">Confirm New Password</label>
                  <input type="password" class="form-control" placeholder="••••••••">
                </div>
              </div>
            </div>
          </div>

          <button type="submit" class="btn btn-dark px-4 py-2">Update Profile</button>
        </div>

        <div class="col-lg-4">
          <div class="admin-card p-4 text-center">
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop" class="admin-avatar mb-3" style="width: 80px; height: 80px;" alt="Admin Avatar">
            <h5 class="fw-bold mb-1">M. Asif</h5>
            <div class="text-muted small mb-3">Store Director</div>
            <button type="button" class="btn btn-sm btn-outline-dark" onclick="alert('Choose new avatar');">Upload New Photo</button>
          </div>
        </div>

      </div>
    </form>
  
      </main>
    </div>
  </div>

  <!-- Delete Confirmation Modal (Shared) -->
  <div class="modal fade" id="deleteConfirmModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-sm">
      <div class="modal-content border-0 shadow">
        <div class="modal-body text-center p-4">
          <div class="text-danger fs-1 mb-2"><i class="bi bi-exclamation-circle"></i></div>
          <h5 class="fw-bold mb-2">Confirm Delete?</h5>
          <p class="text-muted small mb-4">Are you sure you want to remove <strong id="deleteTargetName">this item</strong> from the database? This action is simulated for the prototype.</p>
          <div class="d-flex justify-content-center gap-2">
            <button type="button" class="btn btn-sm btn-outline-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-sm btn-danger px-3" id="btnConfirmDelete">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  <script src="assets/js/dashboard.js"></script>
</body>
</html>