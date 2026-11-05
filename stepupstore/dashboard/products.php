<?php
require_once __DIR__ . "/settings/session_start.php";
require_once __DIR__ . "/settings/auth_check.php";
require_once __DIR__ . "/settings/db.php";

$errors = $_SESSION['errors'] ?? [];
unset($_SESSION['errors']);

$success = $_SESSION['success'] ?? '';
unset($_SESSION['success']);

// Read search & filter parameters from $_GET
$search          = trim($_GET['search'] ?? '');
$filter_category = trim($_GET['category_id'] ?? '');
$filter_brand    = trim($_GET['brand_id'] ?? '');

// Base query joining categories and brands
$query = "SELECT p.*, c.name AS category_name, b.name AS brand_name 
          FROM products p 
          LEFT JOIN categories c ON p.category_id = c.id 
          LEFT JOIN brands b ON p.brand_id = b.id";

// Dynamic WHERE clauses
$where = [];

if (!empty($search)) {
  $escaped_search = mysqli_real_escape_string($conn, $search);
  $where[] = "(p.name LIKE '%{$escaped_search}%' OR p.sku LIKE '%{$escaped_search}%' OR c.name LIKE '%{$escaped_search}%' OR b.name LIKE '%{$escaped_search}%')";
}

if (!empty($filter_category)) {
  $escaped_cat = intval($filter_category);
  $where[] = "p.category_id = {$escaped_cat}";
}

if (!empty($filter_brand)) {
  $escaped_brand = intval($filter_brand);
  $where[] = "p.brand_id = {$escaped_brand}";
}

if (!empty($where)) {
  $query .= " WHERE " . implode(" AND ", $where);
}

$query .= " ORDER BY p.id DESC";

$result = mysqli_query($conn, $query);
$products = mysqli_fetch_all($result, MYSQLI_ASSOC);

// Fetch categories and brands for filter dropdowns
$cat_result = mysqli_query($conn, "SELECT * FROM categories ORDER BY name ASC");
$categories = mysqli_fetch_all($cat_result, MYSQLI_ASSOC);

$brand_result = mysqli_query($conn, "SELECT * FROM brands ORDER BY name ASC");
$brands = mysqli_fetch_all($brand_result, MYSQLI_ASSOC);
?>

<?php require_once __DIR__ . "/partials/header.php" ?>

<body>

  <div class="admin-wrapper">

    <!-- Admin Sidebar -->
    <?php require_once __DIR__ . "/partials/sidebar.php" ?>


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
              <li>
                <h6 class="dropdown-header text-uppercase small fw-bold">Recent Alerts</h6>
              </li>
              <li><a class="dropdown-item small py-2" href="orders.html"><i class="bi bi-bag-check text-success me-2"></i> New Order #NF-88291 received (PKR 14,999)</a></li>
              <li><a class="dropdown-item small py-2" href="inventory.html"><i class="bi bi-exclamation-triangle text-warning me-2"></i> Low stock: Sahara Suede Chukka (9 left)</a></li>
              <li><a class="dropdown-item small py-2" href="reviews.html"><i class="bi bi-star text-primary me-2"></i> New 5-star review pending approval</a></li>
              <li>
                <hr class="dropdown-divider">
              </li>
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
              <li><a class="dropdown-item" href="profile.php"><i class="bi bi-person me-2 text-muted"></i> My Profile</a></li>
              <li><a class="dropdown-item" href="settings.html"><i class="bi bi-gear me-2 text-muted"></i> Store Settings</a></li>
              <li>
                <hr class="dropdown-divider">
              </li>
              <li><a class="dropdown-item text-danger" href="actions/logout_action.php"><i class="bi bi-box-arrow-right me-2"></i> Logout</a></li>
            </ul>
          </div>
        </div>
      </header>


      <main class="admin-content">

        <?php if (!empty($errors)) : ?>
          <div class="alert alert-danger alert-dismissible fade show" role="alert">
            <ul class="mb-0">
              <?php foreach ($errors as $error) : ?>
                <li><?= htmlspecialchars($error) ?></li>
              <?php endforeach; ?>
            </ul>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>
        <?php endif; ?>

        <?php if (!empty($success)) : ?>
          <div class="alert alert-success alert-dismissible fade show" role="alert">
            <i class="bi bi-check-circle me-2"></i><?= htmlspecialchars($success) ?>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>
        <?php endif; ?>

        <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
          <div>
            <h1 class="page-title">Footwear Inventory Catalog</h1>
            <p class="page-subtitle">Manage <?= count($products) ?> footwear models, pricing in PKR, sizes, and stock availability.</p>
          </div>
          <div class="d-flex gap-2">
            <a href="product-add.php" class="btn btn-sm btn-dark">
              <i class="bi bi-plus-lg me-1"></i> Add New Product
            </a>
          </div>
        </div>

        <!-- Filters & Search Toolbar -->
        <div class="admin-card mb-4">
          <div class="admin-card-body p-3">
            <form method="GET" action="products.php" class="row g-3 align-items-center">
              <div class="col-md-4">
                <div class="input-group">
                  <span class="input-group-text bg-white"><i class="bi bi-search text-muted"></i></span>
                  <input type="text" name="search" class="form-control" placeholder="Search by name, SKU or model..." value="<?= htmlspecialchars($search) ?>">
                  <?php if (!empty($search)) : ?>
                    <a href="products.php<?= (!empty($filter_category) || !empty($filter_brand)) ? '?category_id=' . urlencode($filter_category) . '&brand_id=' . urlencode($filter_brand) : '' ?>" class="btn btn-outline-secondary" title="Clear search"><i class="bi bi-x-lg"></i></a>
                  <?php endif; ?>
                </div>
              </div>
              <div class="col-md-3">
                <select name="category_id" class="form-select" onchange="this.form.submit()">
                  <option value="">All Categories (<?= count($categories) ?>)</option>
                  <?php foreach ($categories as $cat) : ?>
                    <option value="<?= $cat['id'] ?>" <?= ($filter_category == $cat['id']) ? 'selected' : '' ?>>
                      <?= htmlspecialchars($cat['name']) ?>
                    </option>
                  <?php endforeach; ?>
                </select>
              </div>
              <div class="col-md-3">
                <select name="brand_id" class="form-select" onchange="this.form.submit()">
                  <option value="">All Brands (<?= count($brands) ?>)</option>
                  <?php foreach ($brands as $brand) : ?>
                    <option value="<?= $brand['id'] ?>" <?= ($filter_brand == $brand['id']) ? 'selected' : '' ?>>
                      <?= htmlspecialchars($brand['name']) ?>
                    </option>
                  <?php endforeach; ?>
                </select>
              </div>
              <div class="col-md-2 d-flex justify-content-between justify-content-md-end align-items-center gap-2">
                <button type="submit" class="btn btn-dark btn-sm px-3">Filter</button>
                <?php if (!empty($search) || !empty($filter_category) || !empty($filter_brand)) : ?>
                  <a href="products.php" class="btn btn-outline-secondary btn-sm" title="Reset all filters">Reset</a>
                <?php endif; ?>
                <span class="text-muted small"><strong><?= count($products) ?></strong> Items</span>
              </div>
            </form>
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
                <?php if (!empty($products)) { ?>
                  <?php foreach ($products as $product) { ?>
                    <tr>
                      <td><input type="checkbox" class="form-check-input row-select-check" value="<?= $product['id'] ?>"></td>
                      <td>
                        <div class="d-flex align-items-center gap-3">
                          <?php
                          $img_src = !empty($product['image_url']) ? htmlspecialchars($product['image_url']) : 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=200&auto=format&fit=crop';
                          ?>
                          <img src="<?= $img_src ?>" class="rounded-1" style="width: 44px; height: 44px; object-fit: cover;" alt="<?= htmlspecialchars($product['name']) ?>" onerror="this.src='https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=200&auto=format&fit=crop';">
                          <div>
                            <div class="fw-semibold"><a href="product-edit.html?id=<?= $product['id'] ?>" class="text-dark"><?= htmlspecialchars($product['name']) ?></a></div>
                            <small class="text-muted"><?= htmlspecialchars($product['brand_name'] ?? 'NOVA FORM') ?></small>
                          </div>
                        </div>
                      </td>
                      <td><code><?= htmlspecialchars($product['sku']) ?></code></td>
                      <td><?= htmlspecialchars($product['category_name'] ?? 'Uncategorized') ?></td>
                      <td><span class="badge bg-light text-dark border"><?= htmlspecialchars($product['brand_name'] ?? 'General') ?></span></td>
                      <td class="fw-bold">PKR <?= number_format($product['price_pkr']) ?></td>
                      <td>
                        <span class="badge bg-light text-dark border">
                          <?= intval($product['stock_quantity']) ?> pairs
                        </span>
                      </td>
                      <td>
                        <?php if ($product['status'] === 'Active') : ?>
                          <span class="badge-status badge-status-success">Active</span>
                        <?php elseif ($product['status'] === 'Draft') : ?>
                          <span class="badge-status badge-status-secondary">Draft</span>
                        <?php elseif ($product['status'] === 'Out of Stock') : ?>
                          <span class="badge-status badge-status-danger">Out of Stock</span>
                        <?php else : ?>
                          <span class="badge-status badge-status-warning"><?= htmlspecialchars($product['status']) ?></span>
                        <?php endif; ?>
                      </td>
                      <td>
                        <div class="d-flex gap-1">
                          <a href="../front-site/product-details.html?id=<?= $product['id'] ?>" target="_blank" class="btn btn-sm btn-outline-secondary py-1 px-2" title="View in store"><i class="bi bi-eye"></i></a>
                          <a href="product-edit.html?id=<?= $product['id'] ?>" class="btn btn-sm btn-outline-dark py-1 px-2" title="Edit product"><i class="bi bi-pencil"></i></a>
                          <button class="btn btn-sm btn-outline-danger py-1 px-2 btn-trigger-delete" data-name="<?= htmlspecialchars($product['name']) ?>" data-bs-toggle="modal" data-bs-target="#deleteConfirmModal" title="Delete product"><i class="bi bi-trash"></i></button>
                        </div>
                      </td>
                    </tr>
                  <?php } ?>
                <?php } else { ?>
                  <tr>
                    <td colspan="9" class="text-center py-5 text-muted">
                      <i class="bi bi-box-seam fs-2 d-block mb-2"></i>
                      <h6>No products found</h6>
                      <?php if (!empty($search) || !empty($filter_category) || !empty($filter_brand)) : ?>
                        <p class="small mb-3">No products match your search or filter criteria.</p>
                        <a href="products.php" class="btn btn-sm btn-outline-secondary"><i class="bi bi-arrow-counterclockwise me-1"></i> Clear Filters</a>
                      <?php else : ?>
                        <p class="small mb-3">You haven't added any products to the database yet.</p>
                        <a href="product-add.php" class="btn btn-sm btn-dark"><i class="bi bi-plus-lg me-1"></i> Add Your First Product</a>
                      <?php endif; ?>
                    </td>
                  </tr>
                <?php } ?>
              </tbody>
            </table>
          </div>

          <!-- Pagination -->
          <div class="p-3 border-top d-flex justify-content-between align-items-center">
            <span class="small text-muted">Showing <?= count($products) ?> product(s)</span>
            <ul class="pagination pagination-sm mb-0">
              <li class="page-item disabled"><a class="page-link" href="#">Previous</a></li>
              <li class="page-item active"><a class="page-link" href="#">1</a></li>
              <li class="page-item disabled"><a class="page-link" href="#">Next</a></li>
            </ul>
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