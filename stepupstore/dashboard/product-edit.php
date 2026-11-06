<?php
require_once __DIR__ . "/settings/session_start.php";
require_once __DIR__ . "/settings/auth_check.php";
require_once __DIR__ . "/settings/db.php";

$errors = $_SESSION['errors'] ?? [];
unset($_SESSION['errors']);

$success = $_SESSION['success'] ?? '';
unset($_SESSION['success']);

$id = intval($_GET['id'] ?? 0);
if ($id <= 0) {
    header("Location: products.php");
    exit;
}

// Fetch product details
$query = "SELECT * FROM products WHERE id = {$id} LIMIT 1";
$result = mysqli_query($conn, $query);
if (!$result || mysqli_num_rows($result) === 0) {
    $_SESSION['errors'] = ["Footwear model not found."];
    header("Location: products.php");
    exit;
}
$product = mysqli_fetch_assoc($result);

// Fetch categories for dropdown
$cat_query = "SELECT * FROM categories ORDER BY name ASC";
$cat_result = mysqli_query($conn, $cat_query);
$categories = mysqli_fetch_all($cat_result, MYSQLI_ASSOC);

// Fetch brands for dropdown
$brand_query = "SELECT * FROM brands ORDER BY name ASC";
$brand_result = mysqli_query($conn, $brand_query);
$brands = mysqli_fetch_all($brand_result, MYSQLI_ASSOC);

// Fetch variants for this product
$var_query = "SELECT * FROM product_variants WHERE product_id = {$id} ORDER BY size_eu ASC";
$var_result = mysqli_query($conn, $var_query);
$variants = mysqli_fetch_all($var_result, MYSQLI_ASSOC);

// If product has no variants in DB yet, prepare default EU 39-46 sizes
if (empty($variants)) {
    $default_sizes = [39, 40, 41, 42, 43, 44, 45, 46];
    foreach ($default_sizes as $s) {
        $variants[] = [
            'id'             => 0,
            'size_eu'        => $s,
            'color_name'     => 'Nero Black',
            'sku_variant'    => $product['sku'] . '-' . $s,
            'stock_quantity' => 0,
            'status'         => 'Out of Stock'
        ];
    }
}
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
          <a href="../front-site/product-details.html?id=<?= $product['id'] ?>" target="_blank" class="btn btn-sm btn-outline-secondary d-none d-md-inline-flex align-items-center gap-1">
            <i class="bi bi-eye"></i> View Live
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
              <li><a class="dropdown-item" href="profile.html"><i class="bi bi-person me-2 text-muted"></i> My Profile</a></li>
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

        <div class="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1 class="page-title">Edit Footwear: <?= htmlspecialchars($product['name']) ?></h1>
            <p class="page-subtitle">Product ID: #<?= $product['id'] ?> &bull; SKU: <?= htmlspecialchars($product['sku']) ?> &bull; Created <?= date('d M, Y', strtotime($product['created_at'])) ?></p>
          </div>
          <div class="d-flex gap-2">
            <a href="../front-site/product-details.html?id=<?= $product['id'] ?>" target="_blank" class="btn btn-sm btn-outline-secondary">
              <i class="bi bi-eye me-1"></i> View Live
            </a>
            <a href="products.php" class="btn btn-sm btn-dark">
              Back to List
            </a>
          </div>
        </div>

        <form action="actions/product_update_action.php" method="POST" enctype="multipart/form-data">
          <input type="hidden" name="id" value="<?= $product['id'] ?>">

          <div class="row g-4">

            <!-- Left Column: Details -->
            <div class="col-lg-8">

              <!-- Basic Information -->
              <div class="admin-card mb-4">
                <div class="admin-card-header">
                  <h5 class="admin-card-title">Footwear Details</h5>
                </div>
                <div class="admin-card-body">
                  <div class="row g-3">
                    <div class="col-md-8">
                      <label class="form-label small fw-bold">Product Name *</label>
                      <input type="text" name="name" class="form-control" value="<?= htmlspecialchars($product['name']) ?>" required>
                    </div>
                    <div class="col-md-4">
                      <label class="form-label small fw-bold">SKU Code *</label>
                      <input type="text" name="sku" class="form-control" value="<?= htmlspecialchars($product['sku']) ?>" required>
                    </div>
                    <div class="col-md-6">
                      <label class="form-label small fw-bold">Category</label>
                      <select class="form-select" name="category_id">
                        <option value="">-- Select Category --</option>
                        <?php foreach ($categories as $cat) : ?>
                          <option value="<?= $cat['id'] ?>" <?= ($product['category_id'] == $cat['id']) ? 'selected' : '' ?>>
                            <?= htmlspecialchars($cat['name']) ?>
                          </option>
                        <?php endforeach; ?>
                      </select>
                    </div>
                    <div class="col-md-6">
                      <label class="form-label small fw-bold">Brand</label>
                      <select class="form-select" name="brand_id">
                        <option value="">-- Select Brand --</option>
                        <?php foreach ($brands as $brand) : ?>
                          <option value="<?= $brand['id'] ?>" <?= ($product['brand_id'] == $brand['id']) ? 'selected' : '' ?>>
                            <?= htmlspecialchars($brand['name']) ?>
                          </option>
                        <?php endforeach; ?>
                      </select>
                    </div>
                    <div class="col-12">
                      <label class="form-label small fw-bold">Short Silhouette Description</label>
                      <textarea class="form-control" name="short_description" rows="2"><?= htmlspecialchars($product['short_description'] ?? '') ?></textarea>
                    </div>
                    <div class="col-12">
                      <label class="form-label small fw-bold">Full Craftsmanship Description</label>
                      <textarea class="form-control" name="description" rows="4"><?= htmlspecialchars($product['description'] ?? '') ?></textarea>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Pricing (PKR) -->
              <div class="admin-card mb-4">
                <div class="admin-card-header">
                  <h5 class="admin-card-title">Pricing in Pakistani Rupee (PKR)</h5>
                </div>
                <div class="admin-card-body">
                  <div class="row g-3">
                    <div class="col-md-4">
                      <label class="form-label small fw-bold">Selling Price (PKR) *</label>
                      <input type="number" step="0.01" name="price_pkr" class="form-control" value="<?= htmlspecialchars($product['price_pkr']) ?>" required>
                    </div>
                    <div class="col-md-4">
                      <label class="form-label small fw-bold">Original / Retail Price (PKR)</label>
                      <input type="number" step="0.01" name="original_price_pkr" class="form-control" value="<?= htmlspecialchars($product['original_price_pkr'] ?? '') ?>">
                    </div>
                    <div class="col-md-4">
                      <label class="form-label small fw-bold">Cost of Goods (Internal PKR)</label>
                      <input type="number" step="0.01" name="cost_price_pkr" class="form-control" value="<?= htmlspecialchars($product['cost_price_pkr'] ?? '') ?>">
                    </div>
                  </div>
                </div>
              </div>

              <!-- Variants & Stock Matrix -->
              <div class="admin-card mb-4">
                <div class="admin-card-header d-flex justify-content-between align-items-center">
                  <h5 class="admin-card-title">Size EU 39–46 Variant Inventory</h5>
                  <span class="badge bg-light text-dark border">Total Stock: <?= intval($product['stock_quantity']) ?> pairs</span>
                </div>
                <div class="admin-card-body p-0">
                  <table class="table variant-table table-bordered mb-0 small">
                    <thead class="table-light">
                      <tr>
                        <th>Size</th>
                        <th>Colorway</th>
                        <th>Variant SKU</th>
                        <th>Stock Qty</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <?php foreach ($variants as $idx => $v) : ?>
                        <tr>
                          <td>
                            <strong>EU <?= intval($v['size_eu']) ?></strong>
                            <input type="hidden" name="variants[<?= $idx ?>][id]" value="<?= $v['id'] ?>">
                            <input type="hidden" name="variants[<?= $idx ?>][size]" value="<?= $v['size_eu'] ?>">
                          </td>
                          <td>
                            <input type="text" name="variants[<?= $idx ?>][color]" class="form-control form-control-sm" value="<?= htmlspecialchars($v['color_name']) ?>" placeholder="Colorway">
                          </td>
                          <td>
                            <input type="text" name="variants[<?= $idx ?>][sku_variant]" class="form-control form-control-sm" value="<?= htmlspecialchars($v['sku_variant']) ?>" placeholder="Auto (SKU-Size)">
                          </td>
                          <td>
                            <input type="number" name="variants[<?= $idx ?>][stock]" class="form-control form-control-sm" value="<?= intval($v['stock_quantity']) ?>" min="0" style="width: 80px;">
                          </td>
                          <td>
                            <?php if ($v['stock_quantity'] > 5) : ?>
                              <span class="badge bg-success">In Stock</span>
                            <?php elseif ($v['stock_quantity'] > 0) : ?>
                              <span class="badge bg-warning text-dark">Low Stock</span>
                            <?php else : ?>
                              <span class="badge bg-danger">Out of Stock</span>
                            <?php endif; ?>
                          </td>
                        </tr>
                      <?php endforeach; ?>
                    </tbody>
                  </table>
                </div>
              </div>

            </div>

            <!-- Right Column: Images, Meta & Actions -->
            <div class="col-lg-4">

              <!-- Image Card -->
              <div class="admin-card mb-4">
                <div class="admin-card-header">
                  <h5 class="admin-card-title">Product Image</h5>
                </div>
                <div class="admin-card-body text-center">
                  <?php
                  $current_img = !empty($product['image_url']) ? htmlspecialchars($product['image_url']) : 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=800&auto=format&fit=crop';
                  ?>
                  <img src="<?= $current_img ?>" id="currentImagePreview" class="img-thumbnail mb-3" style="width: 140px; height: 140px; object-fit: cover;" alt="<?= htmlspecialchars($product['name']) ?>" onerror="this.src='https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=800&auto=format&fit=crop';">

                  <div>
                    <label for="fileInputEdit" class="btn btn-sm btn-outline-secondary w-100">
                      <i class="bi bi-upload me-1"></i> Replace Image
                    </label>
                    <input type="file" name="image" id="fileInputEdit" class="d-none" accept="image/*">
                    <small class="text-muted d-block mt-1" style="font-size: 0.72rem;">Leave empty to keep current image</small>
                  </div>
                </div>
              </div>

              <!-- Footwear Attributes -->
              <div class="admin-card mb-4">
                <div class="admin-card-header">
                  <h5 class="admin-card-title">Footwear Attributes</h5>
                </div>
                <div class="admin-card-body">
                  <div class="mb-3">
                    <label class="form-label small fw-bold">Upper Material</label>
                    <input type="text" name="material" class="form-control form-control-sm" value="<?= htmlspecialchars($product['material'] ?? '') ?>" placeholder="e.g. Full Grain Italian Calfskin">
                  </div>
                  <div class="mb-3">
                    <label class="form-label small fw-bold">Sole Construction</label>
                    <input type="text" name="sole_type" class="form-control form-control-sm" value="<?= htmlspecialchars($product['sole_type'] ?? '') ?>" placeholder="e.g. Goodyear Welted Closed-Channel Leather">
                  </div>
                  <div class="mb-3">
                    <label class="form-label small fw-bold">Occasion</label>
                    <input type="text" name="occasion" class="form-control form-control-sm" value="<?= htmlspecialchars($product['occasion'] ?? '') ?>" placeholder="e.g. Formal Boardrooms, Black Tie">
                  </div>
                </div>
              </div>

              <!-- Status & Flags -->
              <div class="admin-card mb-4">
                <div class="admin-card-header">
                  <h5 class="admin-card-title">Publishing Flags</h5>
                </div>
                <div class="admin-card-body">
                  <div class="mb-3">
                    <label class="form-label small fw-bold">Status</label>
                    <select class="form-select form-select-sm" name="status">
                      <option value="Active" <?= ($product['status'] === 'Active') ? 'selected' : '' ?>>Active (Visible in Store)</option>
                      <option value="Draft" <?= ($product['status'] === 'Draft') ? 'selected' : '' ?>>Draft</option>
                      <option value="Archived" <?= ($product['status'] === 'Archived') ? 'selected' : '' ?>>Archived</option>
                      <option value="Out of Stock" <?= ($product['status'] === 'Out of Stock') ? 'selected' : '' ?>>Out of Stock</option>
                    </select>
                  </div>

                  <div class="form-check mb-2">
                    <input class="form-check-input" type="checkbox" name="is_new" value="1" id="editNewArrival" <?= ($product['is_new'] == 1) ? 'checked' : '' ?>>
                    <label class="form-check-label small" for="editNewArrival">New Arrival Tag</label>
                  </div>

                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" name="is_sale" value="1" id="editOnSale" <?= ($product['is_sale'] == 1) ? 'checked' : '' ?>>
                    <label class="form-check-label small" for="editOnSale">Show On Sale</label>
                  </div>
                </div>
              </div>

              <!-- Action Buttons -->
              <button type="submit" class="btn btn-dark w-100 py-2 mb-2">
                <i class="bi bi-check-lg me-1"></i> Update Product
              </button>
              <a href="products.php" class="btn btn-outline-secondary w-100 mb-3">Cancel</a>

              <!-- Delete Product Button -->
              <button type="button" class="btn btn-outline-danger w-100" data-bs-toggle="modal" data-bs-target="#deleteProductModal">
                <i class="bi bi-trash me-1"></i> Delete Product
              </button>

            </div>

          </div>
        </form>

      </main>
    </div>
  </div>

  <!-- Delete Confirmation Modal for Edit Page -->
  <div class="modal fade" id="deleteProductModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-sm">
      <div class="modal-content border-0 shadow">
        <div class="modal-body text-center p-4">
          <div class="text-danger fs-1 mb-2"><i class="bi bi-exclamation-circle"></i></div>
          <h5 class="fw-bold mb-2">Confirm Delete?</h5>
          <p class="text-muted small mb-4">Are you sure you want to delete <strong><?= htmlspecialchars($product['name']) ?></strong> from the database? This action cannot be undone.</p>
          <div class="d-flex justify-content-center gap-2">
            <button type="button" class="btn btn-sm btn-outline-secondary" data-bs-dismiss="modal">Cancel</button>
            <a href="actions/product_delete_action.php?id=<?= $product['id'] ?>" class="btn btn-sm btn-danger px-3">Delete</a>
          </div>
        </div>
      </div>
    </div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  <script src="assets/js/dashboard.js"></script>
  <script>
    // Live image preview when a new file is chosen
    document.getElementById('fileInputEdit')?.addEventListener('change', function() {
      if (this.files && this.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
          document.getElementById('currentImagePreview').src = e.target.result;
        };
        reader.readAsDataURL(this.files[0]);
      }
    });
  </script>
</body>

</html>

