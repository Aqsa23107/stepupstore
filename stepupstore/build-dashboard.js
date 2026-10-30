/**
 * Dashboard Pages Builder for NOVA FORM
 */

const fs = require('fs');
const path = require('path');
const { products, categories, brands, sampleOrders, sampleCustomers, sampleDiscounts, sampleReviews, sampleBanners } = require('./sample-data');
const { getDashboardLayout } = require('./page-helpers');

const outDir = path.join(__dirname, 'dashboard');

function savePage(fileName, content) {
  fs.writeFileSync(path.join(outDir, fileName), content.trim(), 'utf8');
  console.log(`Created dashboard/${fileName}`);
}

function wrapDashboardPage(title, activePage, bodyContent) {
  const { sidebar, topbar } = getDashboardLayout(activePage);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} | NOVA FORM Admin Dashboard</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
  <link rel="stylesheet" href="assets/css/dashboard.css">
  <link rel="stylesheet" href="assets/css/responsive.css">
</head>
<body>

  <div class="admin-wrapper">
    ${sidebar}

    <div class="admin-main">
      ${topbar}

      <main class="admin-content">
        ${bodyContent}
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
</html>`;
}

/* ==========================================================================
   1. dashboard/index.html (Overview)
   ========================================================================== */
function generateOverview() {
  const content = `
    <!-- Page Header -->
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
      <div>
        <h1 class="page-title">Executive Commerce Overview</h1>
        <p class="page-subtitle">Welcome back, M. Asif. Here is your daily store performance and logistics summary.</p>
      </div>
      <div class="d-flex gap-2">
        <button class="btn btn-sm btn-outline-secondary" onclick="alert('Exporting executive PDF summary (Demo)');">
          <i class="bi bi-download me-1"></i> Export PDF
        </button>
        <a href="product-add.html" class="btn btn-sm btn-dark">
          <i class="bi bi-plus-circle me-1"></i> Add Product
        </a>
      </div>
    </div>

    <!-- KPI Summary Cards -->
    <div class="row g-3 mb-4">
      <div class="col-xl-2 col-md-4 col-6">
        <div class="admin-card kpi-card">
          <div>
            <div class="kpi-title">Total Sales</div>
            <div class="kpi-value">PKR 1.48M</div>
            <div class="kpi-trend positive"><i class="bi bi-arrow-up-short"></i> +14.2% vs last mo</div>
          </div>
          <div class="kpi-icon-box bg-primary bg-opacity-10 text-primary"><i class="bi bi-currency-dollar"></i></div>
        </div>
      </div>

      <div class="col-xl-2 col-md-4 col-6">
        <div class="admin-card kpi-card">
          <div>
            <div class="kpi-title">Total Orders</div>
            <div class="kpi-value">128 Orders</div>
            <div class="kpi-trend positive"><i class="bi bi-arrow-up-short"></i> +8.6% this week</div>
          </div>
          <div class="kpi-icon-box bg-success bg-opacity-10 text-success"><i class="bi bi-bag-check"></i></div>
        </div>
      </div>

      <div class="col-xl-2 col-md-4 col-6">
        <div class="admin-card kpi-card">
          <div>
            <div class="kpi-title">Active Products</div>
            <div class="kpi-value">24 Styles</div>
            <div class="kpi-trend text-muted"><i class="bi bi-layers"></i> 8 Categories</div>
          </div>
          <div class="kpi-icon-box bg-info bg-opacity-10 text-info"><i class="bi bi-box-seam"></i></div>
        </div>
      </div>

      <div class="col-xl-2 col-md-4 col-6">
        <div class="admin-card kpi-card">
          <div>
            <div class="kpi-title">Total Patrons</div>
            <div class="kpi-value">842 Clients</div>
            <div class="kpi-trend positive"><i class="bi bi-arrow-up-short"></i> +32 new this week</div>
          </div>
          <div class="kpi-icon-box bg-warning bg-opacity-10 text-warning"><i class="bi bi-people"></i></div>
        </div>
      </div>

      <div class="col-xl-2 col-md-4 col-6">
        <div class="admin-card kpi-card">
          <div>
            <div class="kpi-title">Pending Orders</div>
            <div class="kpi-value">5 Dispatches</div>
            <div class="kpi-trend text-warning"><i class="bi bi-clock"></i> Requires dispatch</div>
          </div>
          <div class="kpi-icon-box bg-danger bg-opacity-10 text-danger"><i class="bi bi-hourglass-split"></i></div>
        </div>
      </div>

      <div class="col-xl-2 col-md-4 col-6">
        <div class="admin-card kpi-card">
          <div>
            <div class="kpi-title">Low Stock Alert</div>
            <div class="kpi-value">3 Models</div>
            <div class="kpi-trend text-danger"><i class="bi bi-exclamation-triangle"></i> Reorder soon</div>
          </div>
          <div class="kpi-icon-box bg-danger bg-opacity-10 text-danger"><i class="bi bi-boxes"></i></div>
        </div>
      </div>
    </div>

    <!-- Sales Chart & Top Products Row -->
    <div class="row g-4 mb-4">
      
      <!-- Visual Sales Chart -->
      <div class="col-lg-8">
        <div class="admin-card h-100">
          <div class="admin-card-header">
            <div>
              <h5 class="admin-card-title">Sales Revenue Velocity (Last 7 Days in PKR)</h5>
              <span class="text-muted small">Daily revenue totals across online orders and WhatsApp concierge</span>
            </div>
            <div class="btn-group btn-group-sm">
              <button class="btn btn-outline-secondary active">7 Days</button>
              <button class="btn btn-outline-secondary">30 Days</button>
            </div>
          </div>
          <div class="admin-card-body">
            <!-- Lightweight CSS Bar Chart -->
            <div class="css-chart-bar-group">
              <div class="css-chart-col">
                <div class="css-chart-bar" style="height: 55%;" data-val="PKR 142K"></div>
                <span class="css-chart-label">Thu 22</span>
              </div>
              <div class="css-chart-col">
                <div class="css-chart-bar" style="height: 72%;" data-val="PKR 189K"></div>
                <span class="css-chart-label">Fri 23</span>
              </div>
              <div class="css-chart-col">
                <div class="css-chart-bar" style="height: 88%;" data-val="PKR 245K"></div>
                <span class="css-chart-label">Sat 24</span>
              </div>
              <div class="css-chart-col">
                <div class="css-chart-bar" style="height: 94%;" data-val="PKR 278K"></div>
                <span class="css-chart-label">Sun 25</span>
              </div>
              <div class="css-chart-col">
                <div class="css-chart-bar" style="height: 62%;" data-val="PKR 160K"></div>
                <span class="css-chart-label">Mon 26</span>
              </div>
              <div class="css-chart-col">
                <div class="css-chart-bar" style="height: 78%;" data-val="PKR 210K"></div>
                <span class="css-chart-label">Tue 27</span>
              </div>
              <div class="css-chart-col">
                <div class="css-chart-bar" style="height: 85%;" data-val="PKR 234K"></div>
                <span class="css-chart-label">Today</span>
              </div>
            </div>
            <div class="d-flex justify-content-between mt-3 text-muted small">
              <span>Weekly Gross Volume: <strong>PKR 1,458,000</strong></span>
              <span>Average Order Value: <strong>PKR 11,390</strong></span>
            </div>
          </div>
        </div>
      </div>

      <!-- Top Selling Footwear -->
      <div class="col-lg-4">
        <div class="admin-card h-100">
          <div class="admin-card-header">
            <h5 class="admin-card-title">Top-Selling Footwear</h5>
            <a href="products.html" class="small text-muted">View Catalog</a>
          </div>
          <div class="admin-card-body p-0">
            <ul class="list-group list-group-flush">
              ${products.slice(0, 4).map(p => `
                <li class="list-group-item d-flex align-items-center justify-content-between py-3 px-3">
                  <div class="d-flex align-items-center gap-3">
                    <img src="${p.image}" class="rounded-1" style="width: 44px; height: 44px; object-fit: cover;" alt="${p.name}">
                    <div>
                      <h6 class="mb-0 fs-6 fw-semibold"><a href="product-edit.html" class="text-dark">${p.name}</a></h6>
                      <small class="text-muted">${p.category} &bull; ${p.stock} in stock</small>
                    </div>
                  </div>
                  <div class="text-end">
                    <div class="fw-bold small">PKR ${p.price.toLocaleString()}</div>
                    <span class="badge bg-success bg-opacity-10 text-success small">${p.reviewsCount} Sold</span>
                  </div>
                </li>
              `).join('')}
            </ul>
          </div>
        </div>
      </div>

    </div>

    <!-- Recent Orders & Alerts Table -->
    <div class="row g-4">
      
      <!-- Recent Orders Table -->
      <div class="col-lg-8">
        <div class="admin-card">
          <div class="admin-card-header">
            <h5 class="admin-card-title">Recent Dispatch Orders</h5>
            <a href="orders.html" class="btn btn-sm btn-outline-dark">View All 12 Orders</a>
          </div>
          <div class="admin-table-wrap">
            <table class="admin-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Total (PKR)</th>
                  <th>Payment</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody class="filterable-table-body">
                ${sampleOrders.slice(0, 5).map(o => `
                  <tr>
                    <td><strong><a href="order-details.html" class="text-dark">#${o.id}</a></strong></td>
                    <td>
                      <div>${o.customer}</div>
                      <small class="text-muted">${o.city.split(',')[0]}</small>
                    </td>
                    <td>${o.date}</td>
                    <td class="fw-bold">PKR ${o.total.toLocaleString()}</td>
                    <td><span class="badge bg-light text-dark border">${o.payment}</span></td>
                    <td>
                      <span class="badge-status ${o.status === 'Delivered' ? 'badge-status-success' : o.status === 'Processing' ? 'badge-status-warning' : 'badge-status-info'}">
                        ${o.status}
                      </span>
                    </td>
                    <td>
                      <a href="order-details.html" class="btn btn-sm btn-outline-secondary py-1 px-2" title="View details"><i class="bi bi-eye"></i></a>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Low Stock & Recent Activity Column -->
      <div class="col-lg-4">
        <!-- Low Stock Alert Box -->
        <div class="admin-card mb-4 border-start border-4 border-danger">
          <div class="admin-card-header">
            <h5 class="admin-card-title text-danger"><i class="bi bi-exclamation-triangle me-1"></i> Low Stock Thresholds</h5>
            <a href="inventory.html" class="small text-danger fw-bold">Manage</a>
          </div>
          <div class="admin-card-body p-3">
            <div class="d-flex flex-column gap-2">
              <div class="d-flex justify-content-between align-items-center p-2 bg-light rounded-1">
                <div>
                  <div class="fw-semibold small">Sahara Sand Suede Chukka</div>
                  <small class="text-muted">SKU: NF-CHK-11</small>
                </div>
                <span class="badge bg-danger">9 Pairs Left</span>
              </div>
              <div class="d-flex justify-content-between align-items-center p-2 bg-light rounded-1">
                <div>
                  <div class="fw-semibold small">Portofino Woven Loafer</div>
                  <small class="text-muted">SKU: NF-PEN-23</small>
                </div>
                <span class="badge bg-danger">8 Pairs Left</span>
              </div>
              <div class="d-flex justify-content-between align-items-center p-2 bg-light rounded-1">
                <div>
                  <div class="fw-semibold small">Himalayan Rugged Boot</div>
                  <small class="text-muted">SKU: NF-BOT-18</small>
                </div>
                <span class="badge bg-danger">11 Pairs Left</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Activity Stream -->
        <div class="admin-card">
          <div class="admin-card-header">
            <h5 class="admin-card-title">Live Operational Activity</h5>
          </div>
          <div class="admin-card-body p-3">
            <div class="d-flex flex-column gap-3 small">
              <div class="d-flex gap-2">
                <i class="bi bi-bag-plus text-success fs-6"></i>
                <div>
                  <div>New order <strong>#NF-88291</strong> received from <strong>Hamza Tariq</strong> (Lahore)</div>
                  <small class="text-muted">12 minutes ago</small>
                </div>
              </div>
              <div class="d-flex gap-2">
                <i class="bi bi-truck text-primary fs-6"></i>
                <div>
                  <div>Courier tracking generated for <strong>#NF-88288</strong> (TCS: 77281920)</div>
                  <small class="text-muted">45 minutes ago</small>
                </div>
              </div>
              <div class="d-flex gap-2">
                <i class="bi bi-star text-warning fs-6"></i>
                <div>
                  <div>New 5-star review submitted for <strong>Regal Wholecut Oxford</strong></div>
                  <small class="text-muted">2 hours ago</small>
                </div>
              </div>
              <div class="d-flex gap-2">
                <i class="bi bi-box-arrow-in-down text-info fs-6"></i>
                <div>
                  <div>Stock adjustment (+20 pairs) recorded for <strong>Khyber Peshawari Chappal</strong></div>
                  <small class="text-muted">4 hours ago</small>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  `;

  return wrapDashboardPage('Overview', 'overview', content);
}

/* ==========================================================================
   2. Admin Auth: login.html, register.html, forgot-password.html
   ========================================================================== */
function generateAdminLogin() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin Portal Login | NOVA FORM</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
  <link rel="stylesheet" href="assets/css/dashboard.css">
</head>
<body style="background: #0f172a;">

  <div class="container">
    <div class="admin-auth-box">
      <div class="text-center mb-4">
        <h2 class="fw-bold tracking-wider mb-1" style="letter-spacing: 0.15em;">NOVA FORM</h2>
        <span class="badge bg-dark border text-white px-3 py-1">ADMINISTRATIVE CONSOLE</span>
      </div>

      <form action="index.html" method="GET">
        <div class="mb-3">
          <label class="form-label small fw-bold text-uppercase">Admin Email</label>
          <input type="email" class="form-control" value="admin@novaformshoes.pk" required>
        </div>

        <div class="mb-3">
          <div class="d-flex justify-content-between">
            <label class="form-label small fw-bold text-uppercase">Password</label>
            <a href="forgot-password.html" class="small text-muted">Forgot?</a>
          </div>
          <input type="password" class="form-control" value="admin123" required>
        </div>

        <div class="form-check mb-4">
          <input class="form-check-input" type="checkbox" id="authRemember" checked>
          <label class="form-check-label small text-muted" for="authRemember">Remember this console session</label>
        </div>

        <button type="submit" class="btn btn-dark w-100 py-2 mb-3 fw-bold">Sign In To Dashboard</button>

        <div class="d-flex justify-content-between small text-muted">
          <a href="register.html" class="text-muted">Register New Staff</a>
          <a href="../front-site/index.html" class="text-muted">Back To Storefront &rarr;</a>
        </div>
      </form>
    </div>
  </div>

</body>
</html>`;
}

function generateAdminRegister() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin Registration | NOVA FORM</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
  <link rel="stylesheet" href="assets/css/dashboard.css">
</head>
<body style="background: #0f172a;">
  <div class="container">
    <div class="admin-auth-box">
      <div class="text-center mb-4">
        <h2 class="fw-bold mb-1">NOVA FORM</h2>
        <span class="badge bg-dark border text-white px-3 py-1">STAFF REGISTRATION</span>
      </div>
      <form action="index.html" method="GET">
        <div class="mb-3">
          <label class="form-label small fw-bold">Full Name</label>
          <input type="text" class="form-control" placeholder="M. Asif" required>
        </div>
        <div class="mb-3">
          <label class="form-label small fw-bold">Official Email</label>
          <input type="email" class="form-control" placeholder="staff@novaformshoes.pk" required>
        </div>
        <div class="mb-3">
          <label class="form-label small fw-bold">Role</label>
          <select class="form-select">
            <option>Store Manager</option>
            <option>Inventory Specialist</option>
            <option>Customer Concierge</option>
          </select>
        </div>
        <div class="mb-3">
          <label class="form-label small fw-bold">Password</label>
          <input type="password" class="form-control" required>
        </div>
        <button type="submit" class="btn btn-dark w-100 py-2 mb-3">Create Staff Account</button>
        <div class="text-center small"><a href="login.html" class="text-muted">Already have access? Log in</a></div>
      </form>
    </div>
  </div>
</body>
</html>`;
}

function generateAdminForgotPassword() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Admin Password | NOVA FORM</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
  <link rel="stylesheet" href="assets/css/dashboard.css">
</head>
<body style="background: #0f172a;">
  <div class="container">
    <div class="admin-auth-box text-center">
      <h2 class="fw-bold mb-2">Password Recovery</h2>
      <p class="text-muted small mb-4">Enter your administrative email to receive security credentials.</p>
      <form action="login.html" method="GET" class="text-start">
        <div class="mb-3">
          <label class="form-label small fw-bold">Admin Email</label>
          <input type="email" class="form-control" placeholder="admin@novaformshoes.pk" required>
        </div>
        <button type="submit" class="btn btn-dark w-100 py-2 mb-3">Send Recovery Link</button>
        <div class="text-center small"><a href="login.html" class="text-muted">Back to Login</a></div>
      </form>
    </div>
  </div>
</body>
</html>`;
}

/* ==========================================================================
   3. Product Management: products.html, product-add.html, product-edit.html
   ========================================================================== */
function generateProducts() {
  const content = `
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
      <div>
        <h1 class="page-title">Footwear Inventory Catalog</h1>
        <p class="page-subtitle">Manage 24 active footwear models, pricing in PKR, sizes, and stock availability.</p>
      </div>
      <div class="d-flex gap-2">
        <a href="product-add.html" class="btn btn-sm btn-dark">
          <i class="bi bi-plus-lg me-1"></i> Add New Product
        </a>
      </div>
    </div>

    <!-- Filters & Search Toolbar -->
    <div class="admin-card mb-4">
      <div class="admin-card-body p-3">
        <div class="row g-3 align-items-center">
          <div class="col-md-4">
            <div class="input-group">
              <span class="input-group-text bg-white"><i class="bi bi-search text-muted"></i></span>
              <input type="text" id="productFilterInput" class="form-control" placeholder="Search by name, SKU or model...">
            </div>
          </div>
          <div class="col-md-3">
            <select class="form-select">
              <option selected>All Categories (8)</option>
              <option>Formal Shoes</option>
              <option>Loafers</option>
              <option>Casual Shoes</option>
              <option>Traditional Footwear</option>
              <option>Boots</option>
              <option>Sneakers</option>
            </select>
          </div>
          <div class="col-md-3">
            <select class="form-select">
              <option selected>All Brands (4)</option>
              <option>NOVA FORM Black Label</option>
              <option>NOVA FORM Artisan</option>
              <option>NOVA FORM Heritage</option>
              <option>NOVA FORM Urban</option>
            </select>
          </div>
          <div class="col-md-2 text-md-end">
            <span class="text-muted small"><strong>24</strong> Active Items</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Products Table -->
    <div class="admin-card">
      <div class="admin-table-wrap">
        <table class="admin-table">
          <thead>
            <tr>
              <th width="40"><input type="checkbox" id="selectAllRows" class="form-check-input"></th>
              <th>Product</th>
              <th>SKU</th>
              <th>Category</th>
              <th>Brand</th>
              <th>Selling Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody class="filterable-table-body">
            ${products.map(p => `
              <tr>
                <td><input type="checkbox" class="form-check-input row-select-check"></td>
                <td>
                  <div class="d-flex align-items-center gap-3">
                    <img src="${p.image}" class="rounded-1" style="width: 44px; height: 44px; object-fit: cover;" alt="${p.name}">
                    <div>
                      <div class="fw-semibold"><a href="product-edit.html" class="text-dark">${p.name}</a></div>
                      <small class="text-muted">${p.brand}</small>
                    </div>
                  </div>
                </td>
                <td><code>${p.sku}</code></td>
                <td>${p.category}</td>
                <td><span class="badge bg-light text-dark border">${p.brand.replace('NOVA FORM ', '')}</span></td>
                <td class="fw-bold">PKR ${p.price.toLocaleString()}</td>
                <td>
                  <span class="badge ${p.stock <= p.lowStockThreshold ? 'bg-danger' : 'bg-light text-dark border'}">
                    ${p.stock} pairs
                  </span>
                </td>
                <td>
                  <span class="badge-status badge-status-success">${p.status}</span>
                </td>
                <td>
                  <div class="d-flex gap-1">
                    <a href="../front-site/product-details.html" target="_blank" class="btn btn-sm btn-outline-secondary py-1 px-2" title="View in store"><i class="bi bi-eye"></i></a>
                    <a href="product-edit.html" class="btn btn-sm btn-outline-dark py-1 px-2" title="Edit product"><i class="bi bi-pencil"></i></a>
                    <button class="btn btn-sm btn-outline-danger py-1 px-2 btn-trigger-delete" data-name="${p.name}" data-bs-toggle="modal" data-bs-target="#deleteConfirmModal" title="Delete product"><i class="bi bi-trash"></i></button>
                  </div>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="p-3 border-top d-flex justify-content-between align-items-center">
        <span class="small text-muted">Showing 1 to 24 of 24 products</span>
        <ul class="pagination pagination-sm mb-0">
          <li class="page-item disabled"><a class="page-link" href="#">Previous</a></li>
          <li class="page-item active"><a class="page-link" href="#">1</a></li>
          <li class="page-item"><a class="page-link" href="#">2</a></li>
          <li class="page-item"><a class="page-link" href="#">Next</a></li>
        </ul>
      </div>
    </div>
  `;

  return wrapDashboardPage('Products', 'products', content);
}

function generateProductAdd() {
  const content = `
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h1 class="page-title">Add New Footwear Model</h1>
        <p class="page-subtitle">Configure specifications, pricing, imagery, and size EU 39-46 variant matrix.</p>
      </div>
      <a href="products.html" class="btn btn-sm btn-outline-secondary">
        <i class="bi bi-arrow-left me-1"></i> Back to Products
      </a>
    </div>

    <form class="admin-demo-form" data-success-msg="New footwear model recorded successfully in demo catalog!">
      <div class="row g-4">
        
        <!-- Left Column: Primary Details -->
        <div class="col-lg-8">
          
          <!-- Basic Info -->
          <div class="admin-card mb-4">
            <div class="admin-card-header"><h5 class="admin-card-title">1. Basic Information</h5></div>
            <div class="admin-card-body">
              <div class="row g-3">
                <div class="col-md-8">
                  <label class="form-label small fw-bold">Product Name *</label>
                  <input type="text" class="form-control" placeholder="e.g. Royal Cap-Toe Oxford in Mahogany" required>
                </div>
                <div class="col-md-4">
                  <label class="form-label small fw-bold">SKU Code *</label>
                  <input type="text" class="form-control" placeholder="NF-OXF-25" required>
                </div>
                <div class="col-md-6">
                  <label class="form-label small fw-bold">Category *</label>
                  <select class="form-select" required>
                    <option selected>Formal Shoes</option>
                    <option>Loafers</option>
                    <option>Casual Shoes</option>
                    <option>Sneakers / Sports Shoes</option>
                    <option>Sandals</option>
                    <option>Traditional Footwear</option>
                    <option>Slippers</option>
                    <option>Boots</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label class="form-label small fw-bold">Atelier Brand *</label>
                  <select class="form-select" required>
                    <option selected>NOVA FORM Black Label</option>
                    <option>NOVA FORM Artisan</option>
                    <option>NOVA FORM Heritage</option>
                    <option>NOVA FORM Urban</option>
                  </select>
                </div>
                <div class="col-12">
                  <label class="form-label small fw-bold">Short Silhouette Description</label>
                  <textarea class="form-control" rows="2" placeholder="Brief editorial note displayed on product card..."></textarea>
                </div>
                <div class="col-12">
                  <label class="form-label small fw-bold">Full Craftsmanship Description</label>
                  <textarea class="form-control" rows="4" placeholder="Detail the leather tanning, last shape, and resoling properties..."></textarea>
                </div>
              </div>
            </div>
          </div>

          <!-- Pricing & Inventory -->
          <div class="admin-card mb-4">
            <div class="admin-card-header"><h5 class="admin-card-title">2. Pricing in Pakistani Rupee (PKR)</h5></div>
            <div class="admin-card-body">
              <div class="row g-3">
                <div class="col-md-4">
                  <label class="form-label small fw-bold">Selling Price (PKR) *</label>
                  <input type="number" class="form-control" placeholder="14999" required>
                </div>
                <div class="col-md-4">
                  <label class="form-label small fw-bold">Original / Retail Price (PKR)</label>
                  <input type="number" class="form-control" placeholder="17500">
                </div>
                <div class="col-md-4">
                  <label class="form-label small fw-bold">Cost of Goods (Internal PKR)</label>
                  <input type="number" class="form-control" placeholder="6500">
                </div>
              </div>
            </div>
          </div>

          <!-- Variants Matrix -->
          <div class="admin-card mb-4">
            <div class="admin-card-header d-flex justify-content-between align-items-center">
              <h5 class="admin-card-title">3. Size EU 39–46 Variant Inventory</h5>
              <button type="button" class="btn btn-sm btn-outline-dark" onclick="alert('Added sample variant row');">+ Add Variant</button>
            </div>
            <div class="admin-card-body p-0">
              <table class="table variant-table table-bordered mb-0 small">
                <thead class="table-light">
                  <tr>
                    <th>Shoe Size</th>
                    <th>Colorway</th>
                    <th>Variant SKU</th>
                    <th>Stock Qty</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  ${[39, 40, 41, 42, 43, 44, 45, 46].map(s => `
                    <tr>
                      <td><strong>EU ${s}</strong></td>
                      <td><input type="text" class="form-control form-control-sm" value="Nero Black"></td>
                      <td><code>NF-OXF-25-${s}</code></td>
                      <td><input type="number" class="form-control form-control-sm" value="${s === 42 || s === 43 ? 8 : 4}" style="width: 80px;"></td>
                      <td><button type="button" class="btn btn-sm btn-link text-danger p-0"><i class="bi bi-trash"></i></button></td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        <!-- Right Column: Images & Meta -->
        <div class="col-lg-4">
          
          <!-- Image Upload Box -->
          <div class="admin-card mb-4">
            <div class="admin-card-header"><h5 class="admin-card-title">Product Imagery</h5></div>
            <div class="admin-card-body text-center">
              <div class="img-upload-box mb-3" onclick="document.getElementById('fileInputProd').click();">
                <i class="bi bi-cloud-arrow-up display-5 text-muted mb-2 d-inline-block"></i>
                <div class="fw-semibold small">Click or drag images to upload</div>
                <div class="text-muted" style="font-size: 0.72rem;">PNG, JPG up to 5MB (Square 1:1 recommended)</div>
                <input type="file" id="fileInputProd" class="d-none product-image-input" data-preview-target="imagePreviewContainer" accept="image/*">
              </div>

              <div id="imagePreviewContainer" class="d-flex flex-wrap gap-2 justify-content-center">
                <img src="https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=200&auto=format&fit=crop" class="img-thumbnail" style="width: 90px; height: 90px; object-fit: cover;" alt="Preview">
              </div>
            </div>
          </div>

          <!-- Product Specifications -->
          <div class="admin-card mb-4">
            <div class="admin-card-header"><h5 class="admin-card-title">Footwear Attributes</h5></div>
            <div class="admin-card-body">
              <div class="mb-3">
                <label class="form-label small fw-bold">Upper Material</label>
                <input type="text" class="form-control form-control-sm" value="Full Grain Italian Calfskin">
              </div>
              <div class="mb-3">
                <label class="form-label small fw-bold">Sole Construction</label>
                <input type="text" class="form-control form-control-sm" value="Goodyear Welted Closed-Channel Leather">
              </div>
              <div class="mb-3">
                <label class="form-label small fw-bold">Occasion</label>
                <input type="text" class="form-control form-control-sm" value="Formal Boardrooms, Black Tie">
              </div>
            </div>
          </div>

          <!-- Status & Badges -->
          <div class="admin-card mb-4">
            <div class="admin-card-header"><h5 class="admin-card-title">Publishing Flags</h5></div>
            <div class="admin-card-body">
              <div class="mb-3">
                <label class="form-label small fw-bold">Status</label>
                <select class="form-select form-select-sm">
                  <option selected>Active (Visible in Store)</option>
                  <option>Draft</option>
                  <option>Archived</option>
                </select>
              </div>

              <div class="form-check mb-2">
                <input class="form-check-input" type="checkbox" id="flagFeatured" checked>
                <label class="form-check-label small" for="flagFeatured">Feature on Homepage</label>
              </div>
              <div class="form-check mb-2">
                <input class="form-check-input" type="checkbox" id="flagBestSeller" checked>
                <label class="form-check-label small" for="flagBestSeller">Best Seller Badge</label>
              </div>
              <div class="form-check mb-2">
                <input class="form-check-input" type="checkbox" id="flagNewArrival">
                <label class="form-check-label small" for="flagNewArrival">New Arrival Tag</label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="flagOnSale">
                <label class="form-check-label small" for="flagOnSale">Show On Sale</label>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="d-flex flex-column gap-2">
            <button type="submit" class="btn btn-dark w-100 py-2"><i class="bi bi-check-lg me-1"></i> Save Footwear Model</button>
            <button type="button" class="btn btn-outline-secondary w-100" onclick="alert('Saved as draft');">Save As Draft</button>
          </div>

        </div>

      </div>
    </form>
  `;

  return wrapDashboardPage('Add Product', 'product-add', content);
}

function generateProductEdit() {
  const p = products[0]; // Regal Wholecut Oxford

  const content = `
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h1 class="page-title">Edit Footwear: ${p.name}</h1>
        <p class="page-subtitle">Product ID: ${p.id} &bull; SKU: ${p.sku} &bull; Created 12 Aug 2026</p>
      </div>
      <div class="d-flex gap-2">
        <a href="../front-site/product-details.html" target="_blank" class="btn btn-sm btn-outline-secondary">
          <i class="bi bi-eye me-1"></i> View Live
        </a>
        <a href="products.html" class="btn btn-sm btn-dark">
          Back to List
        </a>
      </div>
    </div>

    <form class="admin-demo-form" data-success-msg="Changes to '${p.name}' updated successfully!">
      <div class="row g-4">
        
        <div class="col-lg-8">
          <div class="admin-card mb-4">
            <div class="admin-card-header"><h5 class="admin-card-title">Footwear Details</h5></div>
            <div class="admin-card-body">
              <div class="row g-3">
                <div class="col-md-8">
                  <label class="form-label small fw-bold">Product Name</label>
                  <input type="text" class="form-control" value="${p.name}" required>
                </div>
                <div class="col-md-4">
                  <label class="form-label small fw-bold">SKU Code</label>
                  <input type="text" class="form-control" value="${p.sku}" required>
                </div>
                <div class="col-md-6">
                  <label class="form-label small fw-bold">Category</label>
                  <select class="form-select">
                    <option selected>${p.category}</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label class="form-label small fw-bold">Brand</label>
                  <input type="text" class="form-control" value="${p.brand}">
                </div>
                <div class="col-12">
                  <label class="form-label small fw-bold">Short Description</label>
                  <textarea class="form-control" rows="2">${p.shortDesc}</textarea>
                </div>
              </div>
            </div>
          </div>

          <div class="admin-card mb-4">
            <div class="admin-card-header"><h5 class="admin-card-title">Pricing (PKR)</h5></div>
            <div class="admin-card-body">
              <div class="row g-3">
                <div class="col-md-6">
                  <label class="form-label small fw-bold">Selling Price (PKR)</label>
                  <input type="number" class="form-control" value="${p.price}" required>
                </div>
                <div class="col-md-6">
                  <label class="form-label small fw-bold">Original Price (PKR)</label>
                  <input type="number" class="form-control" value="${p.originalPrice}">
                </div>
              </div>
            </div>
          </div>

          <!-- Variants -->
          <div class="admin-card mb-4">
            <div class="admin-card-header"><h5 class="admin-card-title">Size Variants & Stock</h5></div>
            <div class="admin-card-body p-0">
              <table class="table variant-table table-bordered mb-0 small">
                <thead class="table-light">
                  <tr>
                    <th>Size</th>
                    <th>Color</th>
                    <th>Stock</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  ${p.sizes.map(s => `
                    <tr>
                      <td><strong>EU ${s}</strong></td>
                      <td>Nero Black</td>
                      <td><input type="number" class="form-control form-control-sm" value="4" style="width: 80px;"></td>
                      <td><span class="badge bg-success">In Stock</span></td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="col-lg-4">
          <div class="admin-card mb-4">
            <div class="admin-card-header"><h5 class="admin-card-title">Images</h5></div>
            <div class="admin-card-body text-center">
              <img src="${p.image}" class="img-thumbnail mb-3" style="width: 140px; height: 140px; object-fit: cover;" alt="${p.name}">
              <div><button type="button" class="btn btn-sm btn-outline-secondary">Replace Image</button></div>
            </div>
          </div>

          <div class="admin-card mb-4">
            <div class="admin-card-header"><h5 class="admin-card-title">Status</h5></div>
            <div class="admin-card-body">
              <select class="form-select form-select-sm mb-3">
                <option selected>Active</option>
                <option>Draft</option>
                <option>Archived</option>
              </select>
              <div class="form-check mb-2">
                <input class="form-check-input" type="checkbox" id="editFeat" checked>
                <label class="form-check-label small" for="editFeat">Featured in Storefront</label>
              </div>
            </div>
          </div>

          <button type="submit" class="btn btn-dark w-100 py-2 mb-2">Update Product</button>
          <a href="products.html" class="btn btn-outline-secondary w-100">Cancel</a>
        </div>

      </div>
    </form>
  `;

  return wrapDashboardPage('Edit Product', 'products', content);
}

/* ==========================================================================
   4. Categories & Brands: categories.html, brands.html
   ========================================================================== */
function generateCategories() {
  const content = `
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h1 class="page-title">Footwear Categories</h1>
        <p class="page-subtitle">Organize shoe silhouettes, product counts, and homepage showcase slots.</p>
      </div>
      <button class="btn btn-sm btn-dark" data-bs-toggle="modal" data-bs-target="#addCatModal">
        <i class="bi bi-plus-lg me-1"></i> Add Category
      </button>
    </div>

    <div class="admin-card">
      <div class="admin-table-wrap">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Description</th>
              <th>Icon</th>
              <th>Products</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${categories.map(c => `
              <tr>
                <td>
                  <div class="d-flex align-items-center gap-3">
                    <img src="${c.img}" class="rounded-1" style="width: 44px; height: 44px; object-fit: cover;" alt="${c.name}">
                    <div>
                      <strong class="text-dark">${c.name}</strong>
                      <div class="text-muted small">Slug: /category/${c.name.toLowerCase().replace(/[\s\/]+/g, '-')}</div>
                    </div>
                  </div>
                </td>
                <td class="text-muted small">${c.desc}</td>
                <td><i class="bi ${c.icon} fs-5 text-muted"></i></td>
                <td><span class="badge bg-light text-dark border">${c.count} Models</span></td>
                <td><span class="badge-status badge-status-success">Active</span></td>
                <td>
                  <button class="btn btn-sm btn-outline-secondary py-1 px-2" onclick="alert('Edit category demo');"><i class="bi bi-pencil"></i></button>
                  <button class="btn btn-sm btn-outline-danger py-1 px-2" onclick="alert('Cannot delete core footwear category');"><i class="bi bi-trash"></i></button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Add Category Modal -->
    <div class="modal fade" id="addCatModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title fs-6 fw-bold">Add Category</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label class="form-label small fw-bold">Category Title</label>
              <input type="text" class="form-control" placeholder="e.g. Wedding Formals">
            </div>
            <div class="mb-3">
              <label class="form-label small fw-bold">Description</label>
              <textarea class="form-control" rows="2" placeholder="Brief note..."></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-sm btn-outline-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-sm btn-dark" onclick="alert('Category created demo');" data-bs-dismiss="modal">Save Category</button>
          </div>
        </div>
      </div>
    </div>
  `;

  return wrapDashboardPage('Categories', 'categories', content);
}

function generateBrands() {
  const content = `
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h1 class="page-title">Footwear Brands & Labels</h1>
        <p class="page-subtitle">Manage proprietary atelier labels within NOVA FORM.</p>
      </div>
      <button class="btn btn-sm btn-dark" onclick="alert('Add brand dialog demo');">
        <i class="bi bi-plus-lg me-1"></i> Add Brand Label
      </button>
    </div>

    <div class="row g-4">
      ${brands.map(b => `
        <div class="col-md-6 col-lg-3">
          <div class="admin-card h-100 p-4 text-center">
            <div class="rounded-circle bg-dark text-white d-inline-flex align-items-center justify-content-center fw-bold fs-5 mb-3" style="width: 64px; height: 64px;">
              ${b.logo}
            </div>
            <h5 class="fw-bold fs-6 mb-1">${b.name}</h5>
            <span class="badge bg-light text-dark border mb-3">${b.count} Shoe Models</span>
            <p class="text-muted small mb-4">${b.desc}</p>
            <div class="d-flex justify-content-center gap-2 mt-auto">
              <button class="btn btn-sm btn-outline-dark" onclick="alert('Brand settings');">Manage</button>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  return wrapDashboardPage('Brands', 'brands', content);
}

/* ==========================================================================
   5. Inventory: inventory.html
   ========================================================================== */
function generateInventory() {
  const content = `
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
            ${products.map(p => `
              <tr>
                <td>
                  <div class="d-flex align-items-center gap-3">
                    <img src="${p.image}" class="rounded-1" style="width: 40px; height: 40px; object-fit: cover;" alt="${p.name}">
                    <div>
                      <strong class="text-dark">${p.name}</strong>
                      <div class="text-muted small">${p.category}</div>
                    </div>
                  </div>
                </td>
                <td><code>${p.sku}</code></td>
                <td class="fw-bold">${p.stock} pairs</td>
                <td class="text-muted">2 pairs</td>
                <td>${p.lowStockThreshold} pairs</td>
                <td>
                  <span class="badge ${p.stock <= p.lowStockThreshold ? 'bg-danger' : 'bg-success'}">
                    ${p.stock <= p.lowStockThreshold ? 'Low Stock' : 'In Stock'}
                  </span>
                </td>
                <td>
                  <button class="btn btn-sm btn-outline-secondary py-1 px-2" data-bs-toggle="modal" data-bs-target="#stockAdjustModal" title="Adjust stock"><i class="bi bi-pencil-square"></i> Adjust</button>
                </td>
              </tr>
            `).join('')}
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
                ${products.map(p => `<option>${p.name} (${p.sku})</option>`).join('')}
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
  `;

  return wrapDashboardPage('Inventory', 'inventory', content);
}

/* ==========================================================================
   6. Orders Management: orders.html, order-details.html
   ========================================================================== */
function generateOrdersDashboard() {
  const content = `
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
      <div>
        <h1 class="page-title">Orders Management</h1>
        <p class="page-subtitle">Track, confirm, and dispatch nationwide customer orders.</p>
      </div>
      <div class="d-flex gap-2">
        <button class="btn btn-sm btn-outline-secondary" onclick="alert('Exporting orders CSV');">
          <i class="bi bi-file-earmark-excel me-1"></i> Export Orders
        </button>
      </div>
    </div>

    <!-- Filters -->
    <div class="admin-card mb-4">
      <div class="admin-card-body p-3">
        <div class="row g-3">
          <div class="col-md-3">
            <select class="form-select form-select-sm">
              <option selected>All Order Statuses</option>
              <option>Pending</option>
              <option>Confirmed</option>
              <option>Processing</option>
              <option>Shipped</option>
              <option>Delivered</option>
              <option>Cancelled</option>
              <option>Returned</option>
            </select>
          </div>
          <div class="col-md-3">
            <select class="form-select form-select-sm">
              <option selected>All Payment Methods</option>
              <option>Cash on Delivery</option>
              <option>Bank Transfer</option>
              <option>Online Card Demo</option>
            </select>
          </div>
          <div class="col-md-3">
            <input type="date" class="form-control form-control-sm">
          </div>
          <div class="col-md-3">
            <input type="text" class="form-control form-control-sm" placeholder="Search customer or order ID...">
          </div>
        </div>
      </div>
    </div>

    <!-- Orders Table -->
    <div class="admin-card">
      <div class="admin-table-wrap">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Items</th>
              <th>Total Amount</th>
              <th>Payment Method</th>
              <th>Payment Status</th>
              <th>Order Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody class="filterable-table-body">
            ${sampleOrders.map(o => `
              <tr>
                <td><strong><a href="order-details.html" class="text-dark">#${o.id}</a></strong></td>
                <td>
                  <div>${o.customer}</div>
                  <small class="text-muted">${o.city}</small>
                </td>
                <td>${o.date}</td>
                <td>${o.items} Pair (${o.size ? 'EU ' + o.size : ''})</td>
                <td class="fw-bold">PKR ${o.total.toLocaleString()}</td>
                <td><span class="badge bg-light text-dark border">${o.payment}</span></td>
                <td>
                  <span class="badge ${o.paymentStatus === 'Paid' ? 'bg-success bg-opacity-10 text-success' : 'bg-warning bg-opacity-10 text-warning'}">
                    ${o.paymentStatus}
                  </span>
                </td>
                <td>
                  <span class="badge-status ${o.status === 'Delivered' ? 'badge-status-success' : o.status === 'Processing' ? 'badge-status-warning' : o.status === 'Cancelled' ? 'badge-status-danger' : 'badge-status-info'}">
                    ${o.status}
                  </span>
                </td>
                <td>
                  <a href="order-details.html" class="btn btn-sm btn-outline-dark py-1 px-2" title="Manage order"><i class="bi bi-eye"></i> Details</a>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;

  return wrapDashboardPage('Orders', 'orders', content);
}

function generateOrderDetailsDashboard() {
  const o = sampleOrders[0];

  const content = `
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h1 class="page-title">Order #${o.id} Management</h1>
        <p class="page-subtitle">Placed by ${o.customer} on ${o.date} via ${o.payment}</p>
      </div>
      <div class="d-flex gap-2">
        <button class="btn btn-sm btn-outline-secondary" onclick="window.print();"><i class="bi bi-printer me-1"></i> Print Slip</button>
        <a href="orders.html" class="btn btn-sm btn-dark">Back to Orders</a>
      </div>
    </div>

    <div class="row g-4">
      <!-- Order Items & Status Control -->
      <div class="col-lg-8">
        
        <!-- Status Update Control -->
        <div class="admin-card mb-4 border-start border-4 border-warning">
          <div class="admin-card-header"><h5 class="admin-card-title">Order Status Dispatch Control</h5></div>
          <div class="admin-card-body">
            <div class="row g-3 align-items-end">
              <div class="col-md-5">
                <label class="form-label small fw-bold">Update Order Status</label>
                <select class="form-select form-select-sm">
                  <option>Pending Confirmation</option>
                  <option selected>Processing in Workshop</option>
                  <option>Dispatched via TCS</option>
                  <option>Delivered to Patron</option>
                  <option>Cancelled</option>
                  <option>Return Initiated</option>
                </select>
              </div>
              <div class="col-md-4">
                <label class="form-label small fw-bold">Courier Tracking # (TCS / Leopard)</label>
                <input type="text" class="form-control form-control-sm" value="TCS-771928421">
              </div>
              <div class="col-md-3">
                <button type="button" class="btn btn-sm btn-dark w-100" onclick="alert('Status updated & tracking SMS triggered to customer (Demo)');">Update Status</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Ordered Items Table -->
        <div class="admin-card mb-4">
          <div class="admin-card-header"><h5 class="admin-card-title">Footwear Items in Order</h5></div>
          <div class="admin-table-wrap">
            <table class="admin-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Variant</th>
                  <th>Unit Price</th>
                  <th>Qty</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div class="d-flex align-items-center gap-3">
                      <img src="${o.product.image}" class="rounded-1" style="width: 48px; height: 48px; object-fit: cover;" alt="${o.product.name}">
                      <div>
                        <strong>${o.product.name}</strong>
                        <div class="text-muted small">SKU: ${o.product.sku}</div>
                      </div>
                    </div>
                  </td>
                  <td>Size: EU ${o.size}<br><small class="text-muted">${o.color}</small></td>
                  <td>PKR ${o.product.price.toLocaleString()}</td>
                  <td>1</td>
                  <td class="fw-bold">PKR ${o.product.price.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Order Internal Notes -->
        <div class="admin-card">
          <div class="admin-card-header"><h5 class="admin-card-title">Staff Audit Notes</h5></div>
          <div class="admin-card-body">
            <textarea class="form-control mb-2" rows="3" placeholder="Add confidential notes regarding customer preferences or exchange history..."></textarea>
            <button class="btn btn-sm btn-outline-dark" onclick="alert('Note appended (Demo)');">Save Note</button>
          </div>
        </div>

      </div>

      <!-- Right Column: Customer Info & Costing -->
      <div class="col-lg-4">
        
        <div class="admin-card mb-4">
          <div class="admin-card-header"><h5 class="admin-card-title">Client Information</h5></div>
          <div class="admin-card-body small">
            <div class="mb-2"><strong>Name:</strong> ${o.customer}</div>
            <div class="mb-2"><strong>Phone:</strong> ${o.phone}</div>
            <div class="mb-2"><strong>Email:</strong> ${o.email}</div>
            <hr>
            <h6 class="fw-bold text-uppercase small text-muted">Delivery Address</h6>
            <p class="text-muted mb-0">
              ${o.city}<br>
              Postal Code: 54000<br>
              Country: Pakistan
            </p>
          </div>
        </div>

        <div class="admin-card">
          <div class="admin-card-header"><h5 class="admin-card-title">Financial Summary</h5></div>
          <div class="admin-card-body small">
            <div class="d-flex justify-content-between mb-2">
              <span class="text-muted">Items Subtotal</span>
              <span>PKR ${o.total.toLocaleString()}</span>
            </div>
            <div class="d-flex justify-content-between mb-2">
              <span class="text-muted">Delivery Fee</span>
              <span class="text-success fw-bold">FREE</span>
            </div>
            <hr>
            <div class="d-flex justify-content-between fs-6 fw-bold">
              <span>Total Payable</span>
              <span>PKR ${o.total.toLocaleString()}</span>
            </div>
            <div class="text-muted small mt-2">Payment via: <strong>${o.payment}</strong></div>
          </div>
        </div>

      </div>

    </div>
  `;

  return wrapDashboardPage('Order Details', 'orders', content);
}

/* ==========================================================================
   7. Customers: customers.html, customer-details.html
   ========================================================================== */
function generateCustomers() {
  const content = `
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h1 class="page-title">Patron Directory</h1>
        <p class="page-subtitle">Registered customers across major Pakistani metropolitan centres.</p>
      </div>
      <button class="btn btn-sm btn-outline-secondary" onclick="alert('Export customer list');">Export CSV</button>
    </div>

    <div class="admin-card">
      <div class="admin-table-wrap">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Client ID</th>
              <th>Customer Name</th>
              <th>Contact Info</th>
              <th>City</th>
              <th>Orders</th>
              <th>Lifetime Spend</th>
              <th>Registered</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody class="filterable-table-body">
            ${sampleCustomers.map(c => `
              <tr>
                <td><code>${c.id}</code></td>
                <td><strong class="text-dark"><a href="customer-details.html" class="text-dark">${c.name}</a></strong></td>
                <td>
                  <div>${c.email}</div>
                  <small class="text-muted">${c.phone}</small>
                </td>
                <td>${c.city}</td>
                <td><span class="badge bg-light text-dark border">${c.orders} Orders</span></td>
                <td class="fw-bold">PKR ${c.spent.toLocaleString()}</td>
                <td class="small text-muted">${c.registered}</td>
                <td><span class="badge-status badge-status-success">${c.status}</span></td>
                <td>
                  <a href="customer-details.html" class="btn btn-sm btn-outline-dark py-1 px-2"><i class="bi bi-eye"></i> View Profile</a>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;

  return wrapDashboardPage('Customers', 'customers', content);
}

function generateCustomerDetails() {
  const c = sampleCustomers[0]; // Hamza Tariq

  const content = `
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h1 class="page-title">Client Profile: ${c.name}</h1>
        <p class="page-subtitle">Patron ID: ${c.id} &bull; Registered ${c.registered}</p>
      </div>
      <a href="customers.html" class="btn btn-sm btn-dark">Back to Patrons</a>
    </div>

    <div class="row g-4">
      <!-- Profile Card -->
      <div class="col-lg-4">
        <div class="admin-card text-center p-4">
          <div class="rounded-circle bg-dark text-white d-inline-flex align-items-center justify-content-center fw-bold fs-3 mb-3" style="width: 72px; height: 72px;">
            ${c.name.charAt(0)}
          </div>
          <h4 class="fw-bold fs-5 mb-1">${c.name}</h4>
          <span class="badge bg-warning text-dark mb-3">Gold Tier Patron</span>
          <p class="text-muted small mb-3">${c.city}, Pakistan</p>

          <hr>

          <div class="text-start small">
            <div class="mb-2"><strong>Email:</strong> ${c.email}</div>
            <div class="mb-2"><strong>Phone:</strong> ${c.phone}</div>
            <div class="mb-2"><strong>Shoe Size:</strong> EU 42</div>
            <div><strong>Default Address:</strong> House 42, St 8, Phase 5 DHA, Lahore</div>
          </div>
        </div>
      </div>

      <!-- Purchase History -->
      <div class="col-lg-8">
        <div class="row g-3 mb-4">
          <div class="col-md-6">
            <div class="admin-card p-3">
              <div class="text-muted small">Total Orders</div>
              <div class="fs-4 fw-bold">${c.orders} Completed</div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="admin-card p-3">
              <div class="text-muted small">Total Spend</div>
              <div class="fs-4 fw-bold">PKR ${c.spent.toLocaleString()}</div>
            </div>
          </div>
        </div>

        <div class="admin-card">
          <div class="admin-card-header"><h5 class="admin-card-title">Footwear Purchase History</h5></div>
          <div class="admin-table-wrap">
            <table class="admin-table">
              <thead>
                <tr>
                  <th>Order #</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Payment</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>#NF-88291</strong></td>
                  <td>28 Oct 2026</td>
                  <td class="fw-bold">PKR 14,999</td>
                  <td>Cash on Delivery</td>
                  <td><span class="badge bg-warning text-dark">Processing</span></td>
                </tr>
                <tr>
                  <td><strong>#NF-88102</strong></td>
                  <td>14 Jul 2026</td>
                  <td class="fw-bold">PKR 12,499</td>
                  <td>Bank Transfer</td>
                  <td><span class="badge bg-success">Delivered</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `;

  return wrapDashboardPage('Customer Details', 'customers', content);
}

/* ==========================================================================
   8. Reviews, Banners: reviews.html, banners.html
   ========================================================================== */

function generateReviews() {
  const content = `
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h1 class="page-title">Client Reviews & Testimonials</h1>
        <p class="page-subtitle">Moderate customer endorsements before display on product pages.</p>
      </div>
    </div>

    <div class="admin-card">
      <div class="admin-table-wrap">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Customer</th>
              <th>Rating</th>
              <th>Comment</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${sampleReviews.map(r => `
              <tr>
                <td><strong>${r.product}</strong></td>
                <td>
                  <div>${r.customer}</div>
                  <small class="text-muted">${r.city}</small>
                </td>
                <td>
                  <div class="text-warning small">
                    ${'<i class="bi bi-star-fill"></i>'.repeat(r.rating)}
                  </div>
                </td>
                <td class="small text-muted" style="max-width: 320px;">"${r.comment}"</td>
                <td class="small text-muted">${r.date}</td>
                <td><span class="badge bg-success bg-opacity-10 text-success">${r.status}</span></td>
                <td>
                  <div class="d-flex gap-1">
                    <button class="btn btn-sm btn-outline-success py-1 px-2" title="Approve" onclick="alert('Review approved');"><i class="bi bi-check-lg"></i></button>
                    <button class="btn btn-sm btn-outline-secondary py-1 px-2" title="Hide" onclick="alert('Review hidden');"><i class="bi bi-eye-slash"></i></button>
                    <button class="btn btn-sm btn-outline-danger py-1 px-2" title="Delete" onclick="alert('Review deleted');"><i class="bi bi-trash"></i></button>
                  </div>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;

  return wrapDashboardPage('Reviews', 'reviews', content);
}

function generateBanners() {
  const content = `
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h1 class="page-title">Store Banners & Campaigns</h1>
        <p class="page-subtitle">Manage homepage hero slides and promotional banners.</p>
      </div>
      <button class="btn btn-sm btn-dark" onclick="alert('Add banner dialog demo');">
        <i class="bi bi-plus-lg me-1"></i> Add New Banner
      </button>
    </div>

    <div class="row g-4">
      ${sampleBanners.map(b => `
        <div class="col-lg-4 col-md-6">
          <div class="admin-card h-100 overflow-hidden">
            <img src="${b.img}" class="w-100" style="height: 180px; object-fit: cover;" alt="${b.title}">
            <div class="p-4">
              <span class="badge bg-light text-dark border mb-2">${b.position}</span>
              <h5 class="fw-bold fs-6 mb-2">${b.title}</h5>
              <p class="text-muted small mb-3">${b.subtitle}</p>
              <div class="d-flex justify-content-between align-items-center border-top pt-3 small">
                <span class="text-success"><i class="bi bi-check-circle me-1"></i> ${b.status}</span>
                <button class="btn btn-sm btn-outline-dark" onclick="alert('Edit banner');">Edit Banner</button>
              </div>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  return wrapDashboardPage('Banners', 'banners', content);
}

/* ==========================================================================
   9. Website Content CMS & Reports: website-content.html, reports.html
   ========================================================================== */
function generateWebsiteContent() {
  const content = `
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h1 class="page-title">Website Content Editor (CMS)</h1>
        <p class="page-subtitle">Configure editorial headlines, hero imagery, and brand benefits text.</p>
      </div>
    </div>

    <form class="admin-demo-form" data-success-msg="Storefront homepage content updated!">
      <div class="row g-4">
        
        <div class="col-lg-8">
          
          <!-- Hero Section CMS -->
          <div class="admin-card mb-4">
            <div class="admin-card-header"><h5 class="admin-card-title">Homepage Hero Banner</h5></div>
            <div class="admin-card-body">
              <div class="mb-3">
                <label class="form-label small fw-bold">Main Headline</label>
                <input type="text" class="form-control" value="Step Into Uncompromising Refinement.">
              </div>
              <div class="mb-3">
                <label class="form-label small fw-bold">Subtitle</label>
                <input type="text" class="form-control" value="Autumn / Winter 2026 Collection">
              </div>
              <div class="mb-3">
                <label class="form-label small fw-bold">Lead Paragraph</label>
                <textarea class="form-control" rows="2">Handcrafted from full-grain Italian calfskin and Goodyear-welted for generations of distinction. Engineered for the modern Pakistani gentleman.</textarea>
              </div>
            </div>
          </div>

          <!-- Promo Section CMS -->
          <div class="admin-card mb-4">
            <div class="admin-card-header"><h5 class="admin-card-title">Mid-Season Promotional Banner</h5></div>
            <div class="admin-card-body">
              <div class="mb-3">
                <label class="form-label small fw-bold">Banner Headline</label>
                <input type="text" class="form-control" value="The Goodyear Welted Oxford Experience">
              </div>
              <div class="mb-3">
                <label class="form-label small fw-bold">Call to Action Button</label>
                <input type="text" class="form-control" value="Discover The Oxford">
              </div>
            </div>
          </div>

          <button type="submit" class="btn btn-dark px-4 py-2">Save Content Revisions</button>

        </div>

        <div class="col-lg-4">
          <div class="admin-card">
            <div class="admin-card-header"><h5 class="admin-card-title">Notice</h5></div>
            <div class="admin-card-body small text-muted">
              Content edits update static presentation prototypes immediately upon saving.
            </div>
          </div>
        </div>

      </div>
    </form>
  `;

  return wrapDashboardPage('Website Content', 'website-content', content);
}



/* ==========================================================================
   10. Settings & Profile: settings.html, profile.html
   ========================================================================== */
function generateSettings() {
  const content = `
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h1 class="page-title">Storefront Configuration & Logistics Settings</h1>
        <p class="page-subtitle">Configure Pakistani delivery thresholds, store contact details, and policies.</p>
      </div>
    </div>

    <form class="admin-demo-form" data-success-msg="Store configuration settings successfully updated!">
      <div class="row g-4">
        
        <div class="col-lg-8">
          
          <!-- Store Info -->
          <div class="admin-card mb-4">
            <div class="admin-card-header"><h5 class="admin-card-title">Store Identity</h5></div>
            <div class="admin-card-body">
              <div class="row g-3">
                <div class="col-md-6">
                  <label class="form-label small fw-bold">Brand Name</label>
                  <input type="text" class="form-control" value="NOVA FORM">
                </div>
                <div class="col-md-6">
                  <label class="form-label small fw-bold">Helpline Phone</label>
                  <input type="text" class="form-control" value="+92 300 8472911">
                </div>
                <div class="col-md-6">
                  <label class="form-label small fw-bold">Support Email</label>
                  <input type="email" class="form-control" value="concierge@novaformshoes.pk">
                </div>
                <div class="col-md-6">
                  <label class="form-label small fw-bold">Currency & Timezone</label>
                  <input type="text" class="form-control bg-light" value="PKR (Pakistan Standard Time - PKT)" readonly>
                </div>
              </div>
            </div>
          </div>

          <!-- Logistics Settings -->
          <div class="admin-card mb-4">
            <div class="admin-card-header"><h5 class="admin-card-title">Delivery Fees & Nationwide Logistics</h5></div>
            <div class="admin-card-body">
              <div class="row g-3">
                <div class="col-md-6">
                  <label class="form-label small fw-bold">Standard Delivery Fee (PKR)</label>
                  <input type="number" class="form-control" value="250">
                </div>
                <div class="col-md-6">
                  <label class="form-label small fw-bold">Free Delivery Threshold (PKR)</label>
                  <input type="number" class="form-control" value="10000">
                </div>
                <div class="col-12">
                  <label class="form-label small fw-bold">Delivery Estimate Notice</label>
                  <input type="text" class="form-control" value="2-3 business days for major cities (Lahore, Karachi, Islamabad); 3-5 days nationwide.">
                </div>
              </div>
            </div>
          </div>

          <!-- Policies -->
          <div class="admin-card mb-4">
            <div class="admin-card-header"><h5 class="admin-card-title">Exchange & Warranty Policies</h5></div>
            <div class="admin-card-body">
              <div class="mb-3">
                <label class="form-label small fw-bold">Exchange Period</label>
                <input type="text" class="form-control" value="15-Day Complimentary Doorstep Exchange for sizing adjustment.">
              </div>
            </div>
          </div>

          <button type="submit" class="btn btn-dark px-4 py-2">Save Settings</button>

        </div>

        <div class="col-lg-4">
          <div class="admin-card">
            <div class="admin-card-header"><h5 class="admin-card-title">Quick Status</h5></div>
            <div class="admin-card-body small">
              <div class="d-flex justify-content-between mb-2">
                <span class="text-muted">Primary Gateway:</span>
                <strong>Cash on Delivery (Active)</strong>
              </div>
              <div class="d-flex justify-content-between mb-2">
                <span class="text-muted">SSL Encryption:</span>
                <strong class="text-success">Enabled</strong>
              </div>
            </div>
          </div>
        </div>

      </div>
    </form>
  `;

  return wrapDashboardPage('Settings', 'settings', content);
}

function generateProfile() {
  const content = `
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
  `;

  return wrapDashboardPage('Profile', 'profile', content);
}

/* ==========================================================================
   Execute Dashboard Generation
   ========================================================================== */
savePage('index.html', generateOverview());
savePage('login.html', generateAdminLogin());
savePage('register.html', generateAdminRegister());
savePage('forgot-password.html', generateAdminForgotPassword());
savePage('products.html', generateProducts());
savePage('product-add.html', generateProductAdd());
savePage('product-edit.html', generateProductEdit());
savePage('categories.html', generateCategories());
savePage('brands.html', generateBrands());
savePage('inventory.html', generateInventory());
savePage('orders.html', generateOrdersDashboard());
savePage('order-details.html', generateOrderDetailsDashboard());
savePage('customers.html', generateCustomers());
savePage('customer-details.html', generateCustomerDetails());
savePage('reviews.html', generateReviews());
savePage('banners.html', generateBanners());
savePage('website-content.html', generateWebsiteContent());
savePage('settings.html', generateSettings());
savePage('profile.html', generateProfile());

// Dashboard README
const dashReadme = `# NOVA FORM - Admin Dashboard

## Overview
A dedicated commerce management interface for the NOVA FORM luxury men's footwear atelier. Built with Bootstrap 5.3, custom dark-slate sidebar navigation, compact data tables, CSS bar velocity charts, and modals.

## Pages
1. \`index.html\` - Executive overview with KPI cards, CSS sales velocity chart, recent orders, top products, low stock alerts, and live activity stream.
2. \`login.html\` - Admin console login.
3. \`register.html\` - Staff access registration.
4. \`forgot-password.html\` - Admin password recovery.
5. \`products.html\` - Inventory catalog with search, category/brand filters, delete modal, and pagination.
6. \`product-add.html\` - Comprehensive product creation form with EU 39-46 variant matrix, image upload preview, pricing, and inventory thresholds.
7. \`product-edit.html\` - Prepopulated product editing form.
8. \`categories.html\` - Category hierarchy table with Add Category modal.
9. \`brands.html\` - Atelier label management (Black Label, Artisan, Heritage, Urban).
10. \`inventory.html\` - Stock ledger with Low Stock badges and Stock Adjustment modal.
11. \`orders.html\` - Nationwide order management table with status & payment filters.
12. \`order-details.html\` - Detailed order fulfillment, courier tracking update, item list, and staff notes.
13. \`customers.html\` - Customer directory with order counts and spend in PKR.
14. \`customer-details.html\` - Customer profile, addresses, and purchase history.
15. \`reviews.html\` - Customer review moderation (Approve, Hide, Delete).
16. \`banners.html\` - Store banner campaign management.
17. \`website-content.html\` - CMS text editor for homepage hero, promo banners, and benefits.
18. \`settings.html\` - Pakistani delivery fees (PKR 250), free delivery threshold (PKR 10,000), and exchange policies.
19. \`profile.html\` - Admin profile and password security form.
`;

fs.writeFileSync(path.join(outDir, 'README.md'), dashReadme.trim(), 'utf8');
console.log('Created dashboard/README.md');
