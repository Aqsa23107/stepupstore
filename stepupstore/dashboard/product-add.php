
<?php
require_once __DIR__ . "/settings/session_start.php";
require_once __DIR__ . "/settings/auth_check.php";
require_once __DIR__ . "/settings/db.php";

$errors = $_SESSION['errors'] ?? [];
unset($_SESSION['errors']);

$success = $_SESSION['success'] ?? '';
unset($_SESSION['success']);

// Fetch categories from categories table
$cat_query = "SELECT * FROM categories ORDER BY name ASC";
$cat_result = mysqli_query($conn, $cat_query);
$categories = mysqli_fetch_all($cat_result, MYSQLI_ASSOC);

// Fetch brands from brands table
$brand_query = "SELECT * FROM brands ORDER BY name ASC";
$brand_result = mysqli_query($conn, $brand_query);
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
            <h1 class="page-title">Add New Footwear Model</h1>
            <p class="page-subtitle">Configure specifications, pricing, imagery, and size EU 39-46 variant matrix.</p>
          </div>
          <a href="products.php" class="btn btn-sm btn-outline-secondary">
            <i class="bi bi-arrow-left me-1"></i> Back to Products
          </a>
        </div>

        <form action="actions/product_action.php" method="POST" enctype="multipart/form-data">
          <div class="row g-4">

            <!-- Left Column: Primary Details -->
            <div class="col-lg-8">

              <!-- Basic Info -->
              <div class="admin-card mb-4">
                <div class="admin-card-header">
                  <h5 class="admin-card-title">1. Basic Information</h5>
                </div>
                <div class="admin-card-body">
                  <div class="row g-3">
                    <div class="col-md-8">
                      <label class="form-label small fw-bold">Product Name *</label>
                      <input type="text" name="name" class="form-control" placeholder="e.g. Royal Cap-Toe Oxford in Mahogany" required>
                    </div>
                    <div class="col-md-4">
                      <label class="form-label small fw-bold">SKU Code *</label>
                      <input type="text" name="sku" class="form-control" placeholder="NF-OXF-25" required>
                    </div>
                    <div class="col-md-6">
                      <label class="form-label small fw-bold">Category *</label>
                      <select class="form-select" name="category_id" required>
                        <option value="" disabled selected>-- Select Category --</option>
                        <?php foreach ($categories as $cat) : ?>
                          <option value="<?= $cat['id'] ?>"><?= htmlspecialchars($cat['name']) ?></option>
                        <?php endforeach; ?>
                      </select>
                    </div>
                    <div class="col-md-6">
                      <label class="form-label small fw-bold">Atelier Brand *</label>
                      <select class="form-select" name="brand_id" required>
                        <option value="" disabled selected>-- Select Brand --</option>
                        <?php foreach ($brands as $brand) : ?>
                          <option value="<?= $brand['id'] ?>"><?= htmlspecialchars($brand['name']) ?></option>
                        <?php endforeach; ?>
                      </select>
                    </div>
                    <div class="col-12">
                      <label class="form-label small fw-bold">Short Silhouette Description</label>
                      <textarea class="form-control" name="short_description" rows="2" placeholder="Brief editorial note displayed on product card..."></textarea>
                    </div>
                    <div class="col-12">
                      <label class="form-label small fw-bold">Full Craftsmanship Description</label>
                      <textarea class="form-control" name="description" rows="4" placeholder="Detail the leather tanning, last shape, and resoling properties..."></textarea>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Pricing & Inventory -->
              <div class="admin-card mb-4">
                <div class="admin-card-header">
                  <h5 class="admin-card-title">2. Pricing in Pakistani Rupee (PKR)</h5>
                </div>
                <div class="admin-card-body">
                  <div class="row g-3">
                    <div class="col-md-4">
                      <label class="form-label small fw-bold">Selling Price (PKR) *</label>
                      <input type="number" step="0.01" name="price_pkr" class="form-control" placeholder="14999" required>
                    </div>
                    <div class="col-md-4">
                      <label class="form-label small fw-bold">Original / Retail Price (PKR)</label>
                      <input type="number" step="0.01" name="original_price_pkr" class="form-control" placeholder="17500">
                    </div>
                    <div class="col-md-4">
                      <label class="form-label small fw-bold">Cost of Goods (Internal PKR)</label>
                      <input type="number" step="0.01" name="cost_price_pkr" class="form-control" placeholder="6500">
                    </div>
                  </div>
                </div>
              </div>

              <!-- Variants Matrix -->
              <div class="admin-card mb-4">
                <div class="admin-card-header d-flex justify-content-between align-items-center">
                  <h5 class="admin-card-title">3. Size EU 39–46 Variant Inventory</h5>
                  <span class="badge bg-light text-dark border">Standard EU Footwear Run</span>
                </div>
                <div class="admin-card-body p-0">
                  <table class="table variant-table table-bordered mb-0 small">
                    <thead class="table-light">
                      <tr>
                        <th>Shoe Size</th>
                        <th>Colorway</th>
                        <th>Variant SKU (Optional)</th>
                        <th>Stock Qty</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <?php
                      $sizes = [39, 40, 41, 42, 43, 44, 45, 46];
                      foreach ($sizes as $idx => $size) :
                      ?>
                        <tr>
                          <td>
                            <strong>EU <?= $size ?></strong>
                            <input type="hidden" name="variants[<?= $idx ?>][size]" value="<?= $size ?>">
                          </td>
                          <td>
                            <input type="text" name="variants[<?= $idx ?>][color]" class="form-control form-control-sm" value="Nero Black" placeholder="Colorway">
                          </td>
                          <td>
                            <input type="text" name="variants[<?= $idx ?>][sku_variant]" class="form-control form-control-sm" placeholder="Auto (SKU-<?= $size ?>)">
                          </td>
                          <td>
                            <input type="number" name="variants[<?= $idx ?>][stock]" class="form-control form-control-sm" value="4" min="0" style="width: 80px;">
                          </td>
                          <td>
                            <button type="button" class="btn btn-sm btn-link text-danger p-0" onclick="this.closest('tr').remove();" title="Remove size"><i class="bi bi-trash"></i></button>
                          </td>
                        </tr>
                      <?php endforeach; ?>
                    </tbody>
                  </table>
                </div>
              </div>

            </div>

            <!-- Right Column: Images & Meta -->
            <div class="col-lg-4">

              <!-- Image Upload Box -->
              <div class="admin-card mb-4">
                <div class="admin-card-header">
                  <h5 class="admin-card-title">Product Imagery *</h5>
                </div>
                <div class="admin-card-body text-center">
                  <div class="img-upload-box mb-3" onclick="document.getElementById('fileInputProd').click();">
                    <i class="bi bi-cloud-arrow-up display-5 text-muted mb-2 d-inline-block"></i>
                    <div class="fw-semibold small">Click or drag image to upload</div>
                    <div class="text-muted" style="font-size: 0.72rem;">PNG, JPG, WEBP up to 5MB</div>
                    <input type="file" name="image" id="fileInputProd" class="d-none product-image-input" data-preview-target="imagePreviewContainer" accept="image/*" required>
                  </div>

                  <div id="imagePreviewContainer" class="d-flex flex-wrap gap-2 justify-content-center">
                    <!-- Image preview appears here dynamically -->
                  </div>
                </div>
              </div>

              <!-- Product Specifications -->
              <div class="admin-card mb-4">
                <div class="admin-card-header">
                  <h5 class="admin-card-title">Footwear Attributes</h5>
                </div>
                <div class="admin-card-body">
                  <div class="mb-3">
                    <label class="form-label small fw-bold">Upper Material</label>
                    <input type="text" name="material" class="form-control form-control-sm" placeholder="e.g. Full Grain Italian Calfskin">
                  </div>
                  <div class="mb-3">
                    <label class="form-label small fw-bold">Sole Construction</label>
                    <input type="text" name="sole_type" class="form-control form-control-sm" placeholder="e.g. Goodyear Welted Closed-Channel Leather">
                  </div>
                  <div class="mb-3">
                    <label class="form-label small fw-bold">Occasion</label>
                    <input type="text" name="occasion" class="form-control form-control-sm" placeholder="e.g. Formal Boardrooms, Black Tie">
                  </div>
                </div>
              </div>

              <!-- Status & Badges -->
              <div class="admin-card mb-4">
                <div class="admin-card-header">
                  <h5 class="admin-card-title">Publishing Flags</h5>
                </div>
                <div class="admin-card-body">
                  <div class="mb-3">
                    <label class="form-label small fw-bold">Status</label>
                    <select class="form-select form-select-sm" name="status">
                      <option value="Active" selected>Active (Visible in Store)</option>
                      <option value="Draft">Draft</option>
                      <option value="Archived">Archived</option>
                      <option value="Out of Stock">Out of Stock</option>
                    </select>
                  </div>

                  <div class="form-check mb-2">
                    <input class="form-check-input" type="checkbox" name="is_new" value="1" id="flagNewArrival">
                    <label class="form-check-label small" for="flagNewArrival">New Arrival Tag</label>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" name="is_sale" value="1" id="flagOnSale">
                    <label class="form-check-label small" for="flagOnSale">Show On Sale</label>
                  </div>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="d-flex flex-column gap-2">
                <button type="submit" class="btn btn-dark w-100 py-2"><i class="bi bi-check-lg me-1"></i> Save Footwear Model</button>
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