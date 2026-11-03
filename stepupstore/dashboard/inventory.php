<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Inventory | NOVA FORM Admin Dashboard</title>
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
      <a href="inventory.html" class="sidebar-link active">
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
      <a href="profile.html" class="sidebar-link ">
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
        
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
      <div>
        <h1 class="page-title">Warehouse Inventory Tracking</h1>
        <p class="page-subtitle">Real-time stock ledger across Lahore & Karachi fulfillment hubs.</p>
      </div>
      <div class="d-flex gap-2">
        <button class="btn btn-sm btn-dark" data-bs-toggle="modal" data-bs-target="#stockAdjustModal">
          <i class="bi bi-arrow-down-up me-1"></i> Quick Stock Adjustment
        </button>
      </div>
    </div>

    <div class="admin-card">
      <div class="admin-table-wrap">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Footwear Model</th>
              <th>SKU</th>
              <th>Available Stock</th>
              <th>Reserved in Cart</th>
              <th>Reorder Level</th>
              <th>Stock Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody class="filterable-table-body">
            
              <tr>
                <td>
                  <div class="d-flex align-items-center gap-3">
                    <img src="https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=800&auto=format&fit=crop" class="rounded-1" style="width: 40px; height: 40px; object-fit: cover;" alt="Regal Wholecut Oxford">
                    <div>
                      <strong class="text-dark">Regal Wholecut Oxford</strong>
                      <div class="text-muted small">Formal Shoes</div>
                    </div>
                  </div>
                </td>
                <td><code>NF-OXF-01</code></td>
                <td class="fw-bold">28 pairs</td>
                <td class="text-muted">2 pairs</td>
                <td>8 pairs</td>
                <td>
                  <span class="badge bg-success">
                    In Stock
                  </span>
                </td>
                <td>
                  <button class="btn btn-sm btn-outline-secondary py-1 px-2" data-bs-toggle="modal" data-bs-target="#stockAdjustModal" title="Adjust stock"><i class="bi bi-pencil-square"></i> Adjust</button>
                </td>
              </tr>
            
              <tr>
                <td>
                  <div class="d-flex align-items-center gap-3">
                    <img src="https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=800&auto=format&fit=crop" class="rounded-1" style="width: 40px; height: 40px; object-fit: cover;" alt="Sienna Burnished Penny Loafer">
                    <div>
                      <strong class="text-dark">Sienna Burnished Penny Loafer</strong>
                      <div class="text-muted small">Loafers</div>
                    </div>
                  </div>
                </td>
                <td><code>NF-PEN-02</code></td>
                <td class="fw-bold">19 pairs</td>
                <td class="text-muted">2 pairs</td>
                <td>5 pairs</td>
                <td>
                  <span class="badge bg-success">
                    In Stock
                  </span>
                </td>
                <td>
                  <button class="btn btn-sm btn-outline-secondary py-1 px-2" data-bs-toggle="modal" data-bs-target="#stockAdjustModal" title="Adjust stock"><i class="bi bi-pencil-square"></i> Adjust</button>
                </td>
              </tr>
            
              <tr>
                <td>
                  <div class="d-flex align-items-center gap-3">
                    <img src="https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=800&auto=format&fit=crop" class="rounded-1" style="width: 40px; height: 40px; object-fit: cover;" alt="Kensington Braided Tassel Loafer">
                    <div>
                      <strong class="text-dark">Kensington Braided Tassel Loafer</strong>
                      <div class="text-muted small">Loafers</div>
                    </div>
                  </div>
                </td>
                <td><code>NF-TAS-03</code></td>
                <td class="fw-bold">14 pairs</td>
                <td class="text-muted">2 pairs</td>
                <td>5 pairs</td>
                <td>
                  <span class="badge bg-success">
                    In Stock
                  </span>
                </td>
                <td>
                  <button class="btn btn-sm btn-outline-secondary py-1 px-2" data-bs-toggle="modal" data-bs-target="#stockAdjustModal" title="Adjust stock"><i class="bi bi-pencil-square"></i> Adjust</button>
                </td>
              </tr>
            
              <tr>
                <td>
                  <div class="d-flex align-items-center gap-3">
                    <img src="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=800&auto=format&fit=crop" class="rounded-1" style="width: 40px; height: 40px; object-fit: cover;" alt="Mayfair Double Monk Strap">
                    <div>
                      <strong class="text-dark">Mayfair Double Monk Strap</strong>
                      <div class="text-muted small">Formal Shoes</div>
                    </div>
                  </div>
                </td>
                <td><code>NF-MNK-04</code></td>
                <td class="fw-bold">12 pairs</td>
                <td class="text-muted">2 pairs</td>
                <td>4 pairs</td>
                <td>
                  <span class="badge bg-success">
                    In Stock
                  </span>
                </td>
                <td>
                  <button class="btn btn-sm btn-outline-secondary py-1 px-2" data-bs-toggle="modal" data-bs-target="#stockAdjustModal" title="Adjust stock"><i class="bi bi-pencil-square"></i> Adjust</button>
                </td>
              </tr>
            
              <tr>
                <td>
                  <div class="d-flex align-items-center gap-3">
                    <img src="https://images.unsplash.com/photo-1608256246200-53e635b5b65f?q=80&w=800&auto=format&fit=crop" class="rounded-1" style="width: 40px; height: 40px; object-fit: cover;" alt="Khyber Heritage Peshawari Chappal">
                    <div>
                      <strong class="text-dark">Khyber Heritage Peshawari Chappal</strong>
                      <div class="text-muted small">Traditional Footwear</div>
                    </div>
                  </div>
                </td>
                <td><code>NF-PES-05</code></td>
                <td class="fw-bold">45 pairs</td>
                <td class="text-muted">2 pairs</td>
                <td>10 pairs</td>
                <td>
                  <span class="badge bg-success">
                    In Stock
                  </span>
                </td>
                <td>
                  <button class="btn btn-sm btn-outline-secondary py-1 px-2" data-bs-toggle="modal" data-bs-target="#stockAdjustModal" title="Adjust stock"><i class="bi bi-pencil-square"></i> Adjust</button>
                </td>
              </tr>
            
              <tr>
                <td>
                  <div class="d-flex align-items-center gap-3">
                    <img src="https://images.unsplash.com/photo-1638247025967-b4e38f787b76?q=80&w=800&auto=format&fit=crop" class="rounded-1" style="width: 40px; height: 40px; object-fit: cover;" alt="Highland Burnished Chelsea Boot">
                    <div>
                      <strong class="text-dark">Highland Burnished Chelsea Boot</strong>
                      <div class="text-muted small">Boots</div>
                    </div>
                  </div>
                </td>
                <td><code>NF-CHE-06</code></td>
                <td class="fw-bold">18 pairs</td>
                <td class="text-muted">2 pairs</td>
                <td>6 pairs</td>
                <td>
                  <span class="badge bg-success">
                    In Stock
                  </span>
                </td>
                <td>
                  <button class="btn btn-sm btn-outline-secondary py-1 px-2" data-bs-toggle="modal" data-bs-target="#stockAdjustModal" title="Adjust stock"><i class="bi bi-pencil-square"></i> Adjust</button>
                </td>
              </tr>
            
              <tr>
                <td>
                  <div class="d-flex align-items-center gap-3">
                    <img src="https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=800&auto=format&fit=crop" class="rounded-1" style="width: 40px; height: 40px; object-fit: cover;" alt="Veloce Minimalist Court Sneaker">
                    <div>
                      <strong class="text-dark">Veloce Minimalist Court Sneaker</strong>
                      <div class="text-muted small">Sneakers / Sports Shoes</div>
                    </div>
                  </div>
                </td>
                <td><code>NF-SNK-07</code></td>
                <td class="fw-bold">35 pairs</td>
                <td class="text-muted">2 pairs</td>
                <td>8 pairs</td>
                <td>
                  <span class="badge bg-success">
                    In Stock
                  </span>
                </td>
                <td>
                  <button class="btn btn-sm btn-outline-secondary py-1 px-2" data-bs-toggle="modal" data-bs-target="#stockAdjustModal" title="Adjust stock"><i class="bi bi-pencil-square"></i> Adjust</button>
                </td>
              </tr>
            
              <tr>
                <td>
                  <div class="d-flex align-items-center gap-3">
                    <img src="https://images.unsplash.com/photo-1603808033192-082d6919d3e1?q=80&w=800&auto=format&fit=crop" class="rounded-1" style="width: 40px; height: 40px; object-fit: cover;" alt="Riviera Cross-Strap Leather Sandal">
                    <div>
                      <strong class="text-dark">Riviera Cross-Strap Leather Sandal</strong>
                      <div class="text-muted small">Sandals</div>
                    </div>
                  </div>
                </td>
                <td><code>NF-SND-08</code></td>
                <td class="fw-bold">22 pairs</td>
                <td class="text-muted">2 pairs</td>
                <td>6 pairs</td>
                <td>
                  <span class="badge bg-success">
                    In Stock
                  </span>
                </td>
                <td>
                  <button class="btn btn-sm btn-outline-secondary py-1 px-2" data-bs-toggle="modal" data-bs-target="#stockAdjustModal" title="Adjust stock"><i class="bi bi-pencil-square"></i> Adjust</button>
                </td>
              </tr>
            
              <tr>
                <td>
                  <div class="d-flex align-items-center gap-3">
                    <img src="https://images.unsplash.com/photo-1582898967732-7235a8e0f93a?q=80&w=800&auto=format&fit=crop" class="rounded-1" style="width: 40px; height: 40px; object-fit: cover;" alt="Westminster Wingtip Derby Brogue">
                    <div>
                      <strong class="text-dark">Westminster Wingtip Derby Brogue</strong>
                      <div class="text-muted small">Formal Shoes</div>
                    </div>
                  </div>
                </td>
                <td><code>NF-BRO-09</code></td>
                <td class="fw-bold">16 pairs</td>
                <td class="text-muted">2 pairs</td>
                <td>5 pairs</td>
                <td>
                  <span class="badge bg-success">
                    In Stock
                  </span>
                </td>
                <td>
                  <button class="btn btn-sm btn-outline-secondary py-1 px-2" data-bs-toggle="modal" data-bs-target="#stockAdjustModal" title="Adjust stock"><i class="bi bi-pencil-square"></i> Adjust</button>
                </td>
              </tr>
            
              <tr>
                <td>
                  <div class="d-flex align-items-center gap-3">
                    <img src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800&auto=format&fit=crop" class="rounded-1" style="width: 40px; height: 40px; object-fit: cover;" alt="Amalfi Velour Suede Loafer">
                    <div>
                      <strong class="text-dark">Amalfi Velour Suede Loafer</strong>
                      <div class="text-muted small">Loafers</div>
                    </div>
                  </div>
                </td>
                <td><code>NF-SUE-10</code></td>
                <td class="fw-bold">15 pairs</td>
                <td class="text-muted">2 pairs</td>
                <td>4 pairs</td>
                <td>
                  <span class="badge bg-success">
                    In Stock
                  </span>
                </td>
                <td>
                  <button class="btn btn-sm btn-outline-secondary py-1 px-2" data-bs-toggle="modal" data-bs-target="#stockAdjustModal" title="Adjust stock"><i class="bi bi-pencil-square"></i> Adjust</button>
                </td>
              </tr>
            
              <tr>
                <td>
                  <div class="d-flex align-items-center gap-3">
                    <img src="https://images.unsplash.com/photo-1520639888713-7851133b1ed0?q=80&w=800&auto=format&fit=crop" class="rounded-1" style="width: 40px; height: 40px; object-fit: cover;" alt="Sahara Sand Suede Chukka Boot">
                    <div>
                      <strong class="text-dark">Sahara Sand Suede Chukka Boot</strong>
                      <div class="text-muted small">Boots</div>
                    </div>
                  </div>
                </td>
                <td><code>NF-CHK-11</code></td>
                <td class="fw-bold">9 pairs</td>
                <td class="text-muted">2 pairs</td>
                <td>4 pairs</td>
                <td>
                  <span class="badge bg-success">
                    In Stock
                  </span>
                </td>
                <td>
                  <button class="btn btn-sm btn-outline-secondary py-1 px-2" data-bs-toggle="modal" data-bs-target="#stockAdjustModal" title="Adjust stock"><i class="bi bi-pencil-square"></i> Adjust</button>
                </td>
              </tr>
            
              <tr>
                <td>
                  <div class="d-flex align-items-center gap-3">
                    <img src="https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?q=80&w=800&auto=format&fit=crop" class="rounded-1" style="width: 40px; height: 40px; object-fit: cover;" alt="Monaco Pebble-Grain Driving Shoe">
                    <div>
                      <strong class="text-dark">Monaco Pebble-Grain Driving Shoe</strong>
                      <div class="text-muted small">Casual Shoes</div>
                    </div>
                  </div>
                </td>
                <td><code>NF-DRV-12</code></td>
                <td class="fw-bold">24 pairs</td>
                <td class="text-muted">2 pairs</td>
                <td>6 pairs</td>
                <td>
                  <span class="badge bg-success">
                    In Stock
                  </span>
                </td>
                <td>
                  <button class="btn btn-sm btn-outline-secondary py-1 px-2" data-bs-toggle="modal" data-bs-target="#stockAdjustModal" title="Adjust stock"><i class="bi bi-pencil-square"></i> Adjust</button>
                </td>
              </tr>
            
              <tr>
                <td>
                  <div class="d-flex align-items-center gap-3">
                    <img src="https://images.unsplash.com/photo-1608256246200-53e635b5b65f?q=80&w=800&auto=format&fit=crop" class="rounded-1" style="width: 40px; height: 40px; object-fit: cover;" alt="Waziristan Kaptaan Chappal">
                    <div>
                      <strong class="text-dark">Waziristan Kaptaan Chappal</strong>
                      <div class="text-muted small">Traditional Footwear</div>
                    </div>
                  </div>
                </td>
                <td><code>NF-KAP-13</code></td>
                <td class="fw-bold">38 pairs</td>
                <td class="text-muted">2 pairs</td>
                <td>10 pairs</td>
                <td>
                  <span class="badge bg-success">
                    In Stock
                  </span>
                </td>
                <td>
                  <button class="btn btn-sm btn-outline-secondary py-1 px-2" data-bs-toggle="modal" data-bs-target="#stockAdjustModal" title="Adjust stock"><i class="bi bi-pencil-square"></i> Adjust</button>
                </td>
              </tr>
            
              <tr>
                <td>
                  <div class="d-flex align-items-center gap-3">
                    <img src="https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=800&auto=format&fit=crop" class="rounded-1" style="width: 40px; height: 40px; object-fit: cover;" alt="Edinburgh Plain Toe Derby">
                    <div>
                      <strong class="text-dark">Edinburgh Plain Toe Derby</strong>
                      <div class="text-muted small">Formal Shoes</div>
                    </div>
                  </div>
                </td>
                <td><code>NF-DER-14</code></td>
                <td class="fw-bold">20 pairs</td>
                <td class="text-muted">2 pairs</td>
                <td>5 pairs</td>
                <td>
                  <span class="badge bg-success">
                    In Stock
                  </span>
                </td>
                <td>
                  <button class="btn btn-sm btn-outline-secondary py-1 px-2" data-bs-toggle="modal" data-bs-target="#stockAdjustModal" title="Adjust stock"><i class="bi bi-pencil-square"></i> Adjust</button>
                </td>
              </tr>
            
              <tr>
                <td>
                  <div class="d-flex align-items-center gap-3">
                    <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop" class="rounded-1" style="width: 40px; height: 40px; object-fit: cover;" alt="Aerolight Knit Lifestyle Trainer">
                    <div>
                      <strong class="text-dark">Aerolight Knit Lifestyle Trainer</strong>
                      <div class="text-muted small">Sneakers / Sports Shoes</div>
                    </div>
                  </div>
                </td>
                <td><code>NF-RUN-15</code></td>
                <td class="fw-bold">31 pairs</td>
                <td class="text-muted">2 pairs</td>
                <td>8 pairs</td>
                <td>
                  <span class="badge bg-success">
                    In Stock
                  </span>
                </td>
                <td>
                  <button class="btn btn-sm btn-outline-secondary py-1 px-2" data-bs-toggle="modal" data-bs-target="#stockAdjustModal" title="Adjust stock"><i class="bi bi-pencil-square"></i> Adjust</button>
                </td>
              </tr>
            
              <tr>
                <td>
                  <div class="d-flex align-items-center gap-3">
                    <img src="https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?q=80&w=800&auto=format&fit=crop" class="rounded-1" style="width: 40px; height: 40px; object-fit: cover;" alt="Savoy Quilted Velvet Mule Slipper">
                    <div>
                      <strong class="text-dark">Savoy Quilted Velvet Mule Slipper</strong>
                      <div class="text-muted small">Slippers</div>
                    </div>
                  </div>
                </td>
                <td><code>NF-SLP-16</code></td>
                <td class="fw-bold">17 pairs</td>
                <td class="text-muted">2 pairs</td>
                <td>4 pairs</td>
                <td>
                  <span class="badge bg-success">
                    In Stock
                  </span>
                </td>
                <td>
                  <button class="btn btn-sm btn-outline-secondary py-1 px-2" data-bs-toggle="modal" data-bs-target="#stockAdjustModal" title="Adjust stock"><i class="bi bi-pencil-square"></i> Adjust</button>
                </td>
              </tr>
            
              <tr>
                <td>
                  <div class="d-flex align-items-center gap-3">
                    <img src="https://images.unsplash.com/photo-1603808033192-082d6919d3e1?q=80&w=800&auto=format&fit=crop" class="rounded-1" style="width: 40px; height: 40px; object-fit: cover;" alt="Balochi Traditional Embroidered Sandal">
                    <div>
                      <strong class="text-dark">Balochi Traditional Embroidered Sandal</strong>
                      <div class="text-muted small">Traditional Footwear</div>
                    </div>
                  </div>
                </td>
                <td><code>NF-BAL-17</code></td>
                <td class="fw-bold">25 pairs</td>
                <td class="text-muted">2 pairs</td>
                <td>6 pairs</td>
                <td>
                  <span class="badge bg-success">
                    In Stock
                  </span>
                </td>
                <td>
                  <button class="btn btn-sm btn-outline-secondary py-1 px-2" data-bs-toggle="modal" data-bs-target="#stockAdjustModal" title="Adjust stock"><i class="bi bi-pencil-square"></i> Adjust</button>
                </td>
              </tr>
            
              <tr>
                <td>
                  <div class="d-flex align-items-center gap-3">
                    <img src="https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800&auto=format&fit=crop" class="rounded-1" style="width: 40px; height: 40px; object-fit: cover;" alt="Himalayan Rugged Combat Boot">
                    <div>
                      <strong class="text-dark">Himalayan Rugged Combat Boot</strong>
                      <div class="text-muted small">Boots</div>
                    </div>
                  </div>
                </td>
                <td><code>NF-BOT-18</code></td>
                <td class="fw-bold">11 pairs</td>
                <td class="text-muted">2 pairs</td>
                <td>3 pairs</td>
                <td>
                  <span class="badge bg-success">
                    In Stock
                  </span>
                </td>
                <td>
                  <button class="btn btn-sm btn-outline-secondary py-1 px-2" data-bs-toggle="modal" data-bs-target="#stockAdjustModal" title="Adjust stock"><i class="bi bi-pencil-square"></i> Adjust</button>
                </td>
              </tr>
            
              <tr>
                <td>
                  <div class="d-flex align-items-center gap-3">
                    <img src="https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=800&auto=format&fit=crop" class="rounded-1" style="width: 40px; height: 40px; object-fit: cover;" alt="Verona Perforated Derby Sneaker">
                    <div>
                      <strong class="text-dark">Verona Perforated Derby Sneaker</strong>
                      <div class="text-muted small">Casual Shoes</div>
                    </div>
                  </div>
                </td>
                <td><code>NF-CAS-19</code></td>
                <td class="fw-bold">27 pairs</td>
                <td class="text-muted">2 pairs</td>
                <td>7 pairs</td>
                <td>
                  <span class="badge bg-success">
                    In Stock
                  </span>
                </td>
                <td>
                  <button class="btn btn-sm btn-outline-secondary py-1 px-2" data-bs-toggle="modal" data-bs-target="#stockAdjustModal" title="Adjust stock"><i class="bi bi-pencil-square"></i> Adjust</button>
                </td>
              </tr>
            
              <tr>
                <td>
                  <div class="d-flex align-items-center gap-3">
                    <img src="https://images.unsplash.com/photo-1603808033192-082d6919d3e1?q=80&w=800&auto=format&fit=crop" class="rounded-1" style="width: 40px; height: 40px; object-fit: cover;" alt="Atlas Ergonomic Comfort Slide">
                    <div>
                      <strong class="text-dark">Atlas Ergonomic Comfort Slide</strong>
                      <div class="text-muted small">Sandals</div>
                    </div>
                  </div>
                </td>
                <td><code>NF-SND-20</code></td>
                <td class="fw-bold">33 pairs</td>
                <td class="text-muted">2 pairs</td>
                <td>8 pairs</td>
                <td>
                  <span class="badge bg-success">
                    In Stock
                  </span>
                </td>
                <td>
                  <button class="btn btn-sm btn-outline-secondary py-1 px-2" data-bs-toggle="modal" data-bs-target="#stockAdjustModal" title="Adjust stock"><i class="bi bi-pencil-square"></i> Adjust</button>
                </td>
              </tr>
            
              <tr>
                <td>
                  <div class="d-flex align-items-center gap-3">
                    <img src="https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?q=80&w=800&auto=format&fit=crop" class="rounded-1" style="width: 40px; height: 40px; object-fit: cover;" alt="Carlton Suede Outdoor Slipper">
                    <div>
                      <strong class="text-dark">Carlton Suede Outdoor Slipper</strong>
                      <div class="text-muted small">Slippers</div>
                    </div>
                  </div>
                </td>
                <td><code>NF-SLP-21</code></td>
                <td class="fw-bold">21 pairs</td>
                <td class="text-muted">2 pairs</td>
                <td>5 pairs</td>
                <td>
                  <span class="badge bg-success">
                    In Stock
                  </span>
                </td>
                <td>
                  <button class="btn btn-sm btn-outline-secondary py-1 px-2" data-bs-toggle="modal" data-bs-target="#stockAdjustModal" title="Adjust stock"><i class="bi bi-pencil-square"></i> Adjust</button>
                </td>
              </tr>
            
              <tr>
                <td>
                  <div class="d-flex align-items-center gap-3">
                    <img src="https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800&auto=format&fit=crop" class="rounded-1" style="width: 40px; height: 40px; object-fit: cover;" alt="Milano Retro High-Top Sneaker">
                    <div>
                      <strong class="text-dark">Milano Retro High-Top Sneaker</strong>
                      <div class="text-muted small">Sneakers / Sports Shoes</div>
                    </div>
                  </div>
                </td>
                <td><code>NF-SNK-22</code></td>
                <td class="fw-bold">14 pairs</td>
                <td class="text-muted">2 pairs</td>
                <td>5 pairs</td>
                <td>
                  <span class="badge bg-success">
                    In Stock
                  </span>
                </td>
                <td>
                  <button class="btn btn-sm btn-outline-secondary py-1 px-2" data-bs-toggle="modal" data-bs-target="#stockAdjustModal" title="Adjust stock"><i class="bi bi-pencil-square"></i> Adjust</button>
                </td>
              </tr>
            
              <tr>
                <td>
                  <div class="d-flex align-items-center gap-3">
                    <img src="https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=800&auto=format&fit=crop" class="rounded-1" style="width: 40px; height: 40px; object-fit: cover;" alt="Portofino Woven Leather Penny Loafer">
                    <div>
                      <strong class="text-dark">Portofino Woven Leather Penny Loafer</strong>
                      <div class="text-muted small">Loafers</div>
                    </div>
                  </div>
                </td>
                <td><code>NF-PEN-23</code></td>
                <td class="fw-bold">8 pairs</td>
                <td class="text-muted">2 pairs</td>
                <td>3 pairs</td>
                <td>
                  <span class="badge bg-success">
                    In Stock
                  </span>
                </td>
                <td>
                  <button class="btn btn-sm btn-outline-secondary py-1 px-2" data-bs-toggle="modal" data-bs-target="#stockAdjustModal" title="Adjust stock"><i class="bi bi-pencil-square"></i> Adjust</button>
                </td>
              </tr>
            
              <tr>
                <td>
                  <div class="d-flex align-items-center gap-3">
                    <img src="https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=800&auto=format&fit=crop" class="rounded-1" style="width: 40px; height: 40px; object-fit: cover;" alt="Cambridge Cap-Toe Semi-Brogue">
                    <div>
                      <strong class="text-dark">Cambridge Cap-Toe Semi-Brogue</strong>
                      <div class="text-muted small">Formal Shoes</div>
                    </div>
                  </div>
                </td>
                <td><code>NF-OXF-24</code></td>
                <td class="fw-bold">22 pairs</td>
                <td class="text-muted">2 pairs</td>
                <td>6 pairs</td>
                <td>
                  <span class="badge bg-success">
                    In Stock
                  </span>
                </td>
                <td>
                  <button class="btn btn-sm btn-outline-secondary py-1 px-2" data-bs-toggle="modal" data-bs-target="#stockAdjustModal" title="Adjust stock"><i class="bi bi-pencil-square"></i> Adjust</button>
                </td>
              </tr>
            
          </tbody>
        </table>
      </div>
    </div>

    <!-- Stock Adjust Modal -->
    <div class="modal fade" id="stockAdjustModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title fs-6 fw-bold">Stock Adjustment Form</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label class="form-label small fw-bold">Select Footwear Model</label>
              <select class="form-select">
                <option>Regal Wholecut Oxford (NF-OXF-01)</option><option>Sienna Burnished Penny Loafer (NF-PEN-02)</option><option>Kensington Braided Tassel Loafer (NF-TAS-03)</option><option>Mayfair Double Monk Strap (NF-MNK-04)</option><option>Khyber Heritage Peshawari Chappal (NF-PES-05)</option><option>Highland Burnished Chelsea Boot (NF-CHE-06)</option><option>Veloce Minimalist Court Sneaker (NF-SNK-07)</option><option>Riviera Cross-Strap Leather Sandal (NF-SND-08)</option><option>Westminster Wingtip Derby Brogue (NF-BRO-09)</option><option>Amalfi Velour Suede Loafer (NF-SUE-10)</option><option>Sahara Sand Suede Chukka Boot (NF-CHK-11)</option><option>Monaco Pebble-Grain Driving Shoe (NF-DRV-12)</option><option>Waziristan Kaptaan Chappal (NF-KAP-13)</option><option>Edinburgh Plain Toe Derby (NF-DER-14)</option><option>Aerolight Knit Lifestyle Trainer (NF-RUN-15)</option><option>Savoy Quilted Velvet Mule Slipper (NF-SLP-16)</option><option>Balochi Traditional Embroidered Sandal (NF-BAL-17)</option><option>Himalayan Rugged Combat Boot (NF-BOT-18)</option><option>Verona Perforated Derby Sneaker (NF-CAS-19)</option><option>Atlas Ergonomic Comfort Slide (NF-SND-20)</option><option>Carlton Suede Outdoor Slipper (NF-SLP-21)</option><option>Milano Retro High-Top Sneaker (NF-SNK-22)</option><option>Portofino Woven Leather Penny Loafer (NF-PEN-23)</option><option>Cambridge Cap-Toe Semi-Brogue (NF-OXF-24)</option>
              </select>
            </div>
            <div class="row g-2 mb-3">
              <div class="col-6">
                <label class="form-label small fw-bold">Adjustment Type</label>
                <select class="form-select">
                  <option>Add Inventory (+ Received)</option>
                  <option>Subtract (- Damaged / Returned)</option>
                </select>
              </div>
              <div class="col-6">
                <label class="form-label small fw-bold">Quantity</label>
                <input type="number" class="form-control" value="10">
              </div>
            </div>
            <div class="mb-3">
              <label class="form-label small fw-bold">Reason Note</label>
              <input type="text" class="form-control" placeholder="e.g. Sialkot workshop shipment batch #4">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-sm btn-outline-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-sm btn-dark" id="btnConfirmStockAdjust">Record Adjustment</button>
          </div>
        </div>
      </div>
    </div>
  
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