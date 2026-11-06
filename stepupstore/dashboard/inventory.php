<?php
require_once __DIR__ . "/settings/session_start.php";
require_once __DIR__ . "/settings/auth_check.php";
require_once __DIR__ . "/settings/db.php";

$errors = $_SESSION['errors'] ?? [];
unset($_SESSION['errors']);

$success = $_SESSION['success'] ?? '';
unset($_SESSION['success']);

// Fetch all products with category and brand names
$products_query = "SELECT p.*, c.name AS category_name, b.name AS brand_name 
                   FROM products p 
                   LEFT JOIN categories c ON p.category_id = c.id 
                   LEFT JOIN brands b ON p.brand_id = b.id 
                   ORDER BY p.id DESC";
$products_result = mysqli_query($conn, $products_query);
$products = mysqli_fetch_all($products_result, MYSQLI_ASSOC);

// Fetch all product variants
$variants_query = "SELECT * FROM product_variants ORDER BY product_id ASC, size_eu ASC";
$variants_result = mysqli_query($conn, $variants_query);
$variants = mysqli_fetch_all($variants_result, MYSQLI_ASSOC);

// Group variants by product_id
$variants_by_product = [];
if (!empty($variants)) {
    foreach ($variants as $v) {
        $variants_by_product[$v['product_id']][] = $v;
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
              <li><a class="dropdown-item small py-2" href="inventory.php"><i class="bi bi-exclamation-triangle text-warning me-2"></i> Low stock alerts</a></li>
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
                <div class="fw-semibold small leading-none">Aqsa</div>
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
            <ul class="mb-0 ps-3">
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
            <h1 class="page-title">Warehouse Inventory Tracking</h1>
            <p class="page-subtitle">Real-time stock ledger across footwear models and size variants (<?= count($products) ?> products).</p>
          </div>
          <div class="d-flex gap-2">
            <a href="product-add.php" class="btn btn-sm btn-outline-dark">
              <i class="bi bi-plus-lg me-1"></i> Add Product
            </a>
            <button class="btn btn-sm btn-dark" id="btnTopQuickAdjust" data-bs-toggle="modal" data-bs-target="#stockAdjustModal">
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
                  <th>Variants &amp; Sizes</th>
                  <th>Reorder Level</th>
                  <th>Stock Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody class="filterable-table-body">

                <?php if (!empty($products)) : ?>
                  <?php foreach ($products as $p) : ?>
                    <?php
                      $stock = intval($p['stock_quantity']);
                      $threshold = intval($p['low_stock_threshold'] ?? 5);
                      $prod_variants = $variants_by_product[$p['id']] ?? [];
                      $img_src = !empty($p['image_url']) ? htmlspecialchars($p['image_url']) : 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=200&auto=format&fit=crop';
                    ?>
                    <tr>
                      <td>
                        <div class="d-flex align-items-center gap-3">
                          <img src="<?= $img_src ?>" class="rounded-1" style="width: 44px; height: 44px; object-fit: cover;" alt="<?= htmlspecialchars($p['name']) ?>" onerror="this.src='https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=200&auto=format&fit=crop';">
                          <div>
                            <strong class="text-dark d-block"><?= htmlspecialchars($p['name']) ?></strong>
                            <div class="text-muted small"><?= htmlspecialchars($p['category_name'] ?? 'Footwear') ?><?= !empty($p['brand_name']) ? ' &bull; ' . htmlspecialchars($p['brand_name']) : '' ?></div>
                          </div>
                        </div>
                      </td>
                      <td><code><?= htmlspecialchars($p['sku']) ?></code></td>
                      <td>
                        <span class="fw-bold fs-6"><?= $stock ?></span> <span class="text-muted small">pairs</span>
                      </td>
                      <td>
                        <div class="d-flex flex-wrap gap-1" style="max-width: 340px;">
                          <?php if (!empty($prod_variants)) : ?>
                            <?php foreach ($prod_variants as $v) : ?>
                              <?php
                                $var_qty = intval($v['stock_quantity']);
                                if ($var_qty <= 0) {
                                  $badge_cls = 'bg-danger-subtle text-danger border-danger-subtle';
                                } elseif ($var_qty <= $threshold) {
                                  $badge_cls = 'bg-warning-subtle text-warning-emphasis border-warning-subtle';
                                } else {
                                  $badge_cls = 'bg-light text-dark border';
                                }
                              ?>
                              <span class="badge <?= $badge_cls ?> border" title="SKU: <?= htmlspecialchars($v['sku_variant']) ?> | Color: <?= htmlspecialchars($v['color_name']) ?> | Status: <?= htmlspecialchars($v['status']) ?>">
                                EU <?= htmlspecialchars($v['size_eu']) ?>: <strong><?= $var_qty ?></strong>
                              </span>
                            <?php endforeach; ?>
                          <?php else : ?>
                            <span class="text-muted small fst-italic">No variants recorded</span>
                          <?php endif; ?>
                        </div>
                      </td>
                      <td><?= $threshold ?> pairs</td>
                      <td>
                        <?php if ($stock <= 0) : ?>
                          <span class="badge bg-danger">Out of Stock</span>
                        <?php elseif ($stock <= $threshold) : ?>
                          <span class="badge bg-warning text-dark">Low Stock</span>
                        <?php else : ?>
                          <span class="badge bg-success">In Stock</span>
                        <?php endif; ?>
                      </td>
                      <td>
                        <button type="button" 
                                class="btn btn-sm btn-outline-secondary py-1 px-2 btn-stock-adjust" 
                                data-bs-toggle="modal" 
                                data-bs-target="#stockAdjustModal" 
                                data-product-id="<?= $p['id'] ?>" 
                                title="Adjust stock">
                          <i class="bi bi-pencil-square"></i> Adjust
                        </button>
                      </td>
                    </tr>
                  <?php endforeach; ?>
                <?php else : ?>
                  <tr>
                    <td colspan="7" class="text-center py-5 text-muted">
                      <i class="bi bi-box-seam fs-2 d-block mb-2"></i>
                      <h6>No products found in inventory</h6>
                      <p class="small mb-0">Products created from <a href="product-add.php">Add Product</a> will appear here with their size breakdown.</p>
                    </td>
                  </tr>
                <?php endif; ?>

              </tbody>
            </table>
          </div>
        </div>

        <!-- Stock Adjust Modal -->
        <div class="modal fade" id="stockAdjustModal" tabindex="-1" aria-labelledby="stockAdjustModalTitle" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered modal-xl">
            <div class="modal-content border-0 shadow">
              <form method="POST" action="actions/update_stock_action.php">
                <input type="hidden" name="product_id" id="modalProductId" value="">

                <div class="modal-header">
                  <div>
                    <h5 class="modal-title fs-6 fw-bold" id="stockAdjustModalTitle">Stock Adjustment</h5>
                    <div class="text-muted small">Update available quantity, change type, and reference note for each size variant.</div>
                  </div>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <div class="modal-body p-4">

                  <!-- Product Selector (shown only if opened via top Quick Adjustment button) -->
                  <div class="mb-3" id="modalProductSelectContainer" style="display: none;">
                    <label class="form-label small fw-bold">Select Footwear Model</label>
                    <select class="form-select form-select-sm" id="stockAdjustProductSelect">
                      <?php if (!empty($products)) : ?>
                        <?php foreach ($products as $p) : ?>
                          <option value="<?= $p['id'] ?>">
                            <?= htmlspecialchars($p['name']) ?> (<?= htmlspecialchars($p['sku']) ?>) - Available: <?= intval($p['stock_quantity']) ?> pairs
                          </option>
                        <?php endforeach; ?>
                      <?php else : ?>
                        <option value="">No products available</option>
                      <?php endif; ?>
                    </select>
                  </div>

                  <!-- Selected Product Details Banner -->
                  <div class="d-flex align-items-center gap-3 p-3 bg-light rounded-3 mb-3 border">
                    <img id="modalProductImg" src="" class="rounded-2" style="width: 54px; height: 54px; object-fit: cover;" alt="">
                    <div class="flex-grow-1">
                      <div class="d-flex align-items-center gap-2">
                        <h6 class="mb-0 fw-bold text-dark" id="modalProductName">Product Name</h6>
                        <span class="badge bg-dark small" id="modalProductSku">SKU</span>
                      </div>
                      <div class="text-muted small mt-1" id="modalProductCategory">Category</div>
                    </div>
                    <div class="text-end">
                      <div class="text-muted small">Current Total Stock</div>
                      <div class="fw-bold fs-5 text-dark"><span id="modalProductTotalStock">0</span> <span class="small fw-normal text-muted">pairs</span></div>
                    </div>
                  </div>

                  <!-- Quick Batch Fill Toolbar -->
                  <div class="card bg-light border p-2 mb-3 rounded-2" id="modalQuickFillWrap">
                    <div class="d-flex flex-wrap align-items-center justify-content-between gap-2">
                      <div class="small fw-bold text-muted d-flex align-items-center gap-1">
                        <i class="bi bi-lightning-charge-fill text-warning"></i> Quick Fill All Variants:
                      </div>
                      <div class="d-flex flex-wrap align-items-center gap-2">
                        <select id="quickFillChangeType" class="form-select form-select-sm" style="width: auto;">
                          <option value="Manual Adjustment">Manual Adjustment</option>
                          <option value="Restock" selected>Restock</option>
                          <option value="Damaged / Wastage">Damaged / Wastage</option>
                          <option value="Return Restock">Return Restock</option>
                          <option value="Order Placed">Order Placed</option>
                          <option value="Order Cancelled">Order Cancelled</option>
                        </select>
                        <input type="text" id="quickFillNote" class="form-control form-control-sm" placeholder="Reference note for all variants..." style="min-width: 250px;">
                        <button type="button" class="btn btn-sm btn-dark" id="btnApplyQuickFill">
                          <i class="bi bi-arrow-down-square me-1"></i> Apply to All
                        </button>
                      </div>
                    </div>
                  </div>

                  <!-- Variants Section Header -->
                  <div class="d-flex justify-content-between align-items-center mb-2">
                    <h6 class="fw-bold small text-uppercase text-muted mb-0">Size Variants Stock &amp; Audit Log</h6>
                    <div class="small text-muted">
                      New Total Stock: <strong class="text-primary fs-6" id="modalCalculatedTotalStock">0</strong> pairs
                    </div>
                  </div>

                  <!-- Variants Table -->
                  <div id="modalVariantsTableWrap" class="table-responsive border rounded-2 mb-3">
                    <table class="table table-sm align-middle mb-0">
                      <thead class="table-light small">
                        <tr>
                          <th style="width: 130px;">Size (EU) &amp; SKU</th>
                          <th style="width: 120px;">Colorway</th>
                          <th style="width: 110px;">Current Stock</th>
                          <th style="width: 150px;">New Stock Qty *</th>
                          <th style="width: 180px;">Change Type *</th>
                          <th>Reference Note</th>
                        </tr>
                      </thead>
                      <tbody id="modalVariantsTableBody" class="small">
                        <!-- Populated dynamically by JavaScript -->
                      </tbody>
                    </table>
                  </div>

                  <!-- Fallback if product has no variants in DB -->
                  <div id="modalNoVariantsNotice" class="alert alert-warning py-3 small mb-3" style="display: none;">
                    <div class="fw-semibold mb-2"><i class="bi bi-exclamation-triangle me-1"></i> No size variants found for this product. Adjust product stock directly:</div>
                    <div class="row g-2">
                      <div class="col-md-4">
                        <label class="form-label small fw-bold">New Total Stock:</label>
                        <div class="input-group input-group-sm">
                          <input type="number" name="product_stock" id="modalDirectProductStock" value="0" min="0" class="form-control">
                          <span class="input-group-text">pairs</span>
                        </div>
                      </div>
                      <div class="col-md-4">
                        <label class="form-label small fw-bold">Change Type:</label>
                        <select name="change_type" class="form-select form-select-sm">
                          <option value="Manual Adjustment" selected>Manual Adjustment</option>
                          <option value="Restock">Restock</option>
                          <option value="Damaged / Wastage">Damaged / Wastage</option>
                          <option value="Return Restock">Return Restock</option>
                          <option value="Order Placed">Order Placed</option>
                          <option value="Order Cancelled">Order Cancelled</option>
                        </select>
                      </div>
                      <div class="col-md-4">
                        <label class="form-label small fw-bold">Reference Note:</label>
                        <input type="text" name="reference_note" class="form-control form-control-sm" placeholder="e.g. Warehouse recount">
                      </div>
                    </div>
                  </div>

                </div>

                <div class="modal-footer bg-light px-4 py-2">
                  <button type="button" class="btn btn-sm btn-outline-secondary" data-bs-dismiss="modal">Cancel</button>
                  <button type="submit" class="btn btn-sm btn-dark px-3" id="btnSaveStockAdjust">
                    <i class="bi bi-check2-circle me-1"></i> Update Stock &amp; Record Logs
                  </button>
                </div>
              </form>
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

  <!-- Inventory Data for Modal -->
  <script id="inventoryDataJson" type="application/json">
    <?= json_encode([
        'products' => array_column($products, null, 'id'),
        'variants' => $variants_by_product
    ], JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT) ?>
  </script>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  <script src="assets/js/dashboard.js"></script>
  <script>
    document.addEventListener('DOMContentLoaded', function () {
      const inventoryRaw = document.getElementById('inventoryDataJson');
      const inventoryData = inventoryRaw ? JSON.parse(inventoryRaw.textContent) : { products: {}, variants: {} };

      const changeTypeOptions = [
        { value: 'Manual Adjustment', label: 'Manual Adjustment' },
        { value: 'Restock', label: 'Restock' },
        { value: 'Damaged / Wastage', label: 'Damaged / Wastage' },
        { value: 'Return Restock', label: 'Return Restock' },
        { value: 'Order Placed', label: 'Order Placed' },
        { value: 'Order Cancelled', label: 'Order Cancelled' }
      ];

      function buildChangeTypeOptions(selectedVal) {
        return changeTypeOptions.map(function (opt) {
          const isSelected = opt.value === selectedVal ? 'selected' : '';
          return `<option value="${opt.value}" ${isSelected}>${opt.label}</option>`;
        }).join('');
      }

      function populateStockModal(productId, hideSelector) {
        const product = inventoryData.products[productId];
        if (!product) return;

        const selectorContainer = document.getElementById('modalProductSelectContainer');
        if (selectorContainer) {
          selectorContainer.style.display = hideSelector ? 'none' : 'block';
        }

        const selectEl = document.getElementById('stockAdjustProductSelect');
        if (selectEl) {
          selectEl.value = productId;
        }

        // Set hidden product_id
        document.getElementById('modalProductId').value = product.id;

        // Modal title & Product banner
        document.getElementById('stockAdjustModalTitle').textContent = 'Stock Adjustment — ' + product.name;
        document.getElementById('modalProductName').textContent = product.name;
        document.getElementById('modalProductSku').textContent = product.sku;
        document.getElementById('modalProductCategory').textContent = (product.category_name || 'Footwear') + (product.brand_name ? ' • ' + product.brand_name : '');
        document.getElementById('modalProductTotalStock').textContent = product.stock_quantity;

        const imgEl = document.getElementById('modalProductImg');
        if (imgEl) {
          imgEl.src = product.image_url ? product.image_url : 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=200&auto=format&fit=crop';
          imgEl.alt = product.name;
        }

        // Populate variants table
        const tbody = document.getElementById('modalVariantsTableBody');
        const emptyNotice = document.getElementById('modalNoVariantsNotice');
        const tableWrap = document.getElementById('modalVariantsTableWrap');
        const quickFillWrap = document.getElementById('modalQuickFillWrap');
        tbody.innerHTML = '';

        const variants = inventoryData.variants[productId] || [];

        if (variants.length > 0) {
          if (tableWrap) tableWrap.style.display = 'block';
          if (quickFillWrap) quickFillWrap.style.display = 'block';
          if (emptyNotice) emptyNotice.style.display = 'none';

          variants.forEach(function (v) {
            const tr = document.createElement('tr');
            const qty = parseInt(v.stock_quantity, 10) || 0;
            const threshold = parseInt(product.low_stock_threshold, 10) || 5;

            let badgeClass = 'bg-light text-dark border';
            if (qty <= 0) {
              badgeClass = 'bg-danger-subtle text-danger border-danger-subtle';
            } else if (qty <= threshold) {
              badgeClass = 'bg-warning-subtle text-warning-emphasis border-warning-subtle';
            }

            tr.innerHTML = `
              <td>
                <span class="badge bg-dark">EU ${escapeHtml(v.size_eu)}</span>
                <div class="text-muted small mt-1"><code>${escapeHtml(v.sku_variant || '-')}</code></div>
              </td>
              <td>
                <span class="text-dark fw-semibold">${escapeHtml(v.color_name || 'Default')}</span>
              </td>
              <td>
                <span class="badge ${badgeClass} border">${qty} pairs</span>
              </td>
              <td>
                <div class="input-group input-group-sm">
                  <input type="number" 
                         name="variants[${v.id}][stock]" 
                         value="${qty}" 
                         min="0" 
                         data-prev="${qty}"
                         class="form-control form-control-sm variant-stock-input text-center fw-bold" 
                         required>
                  <span class="input-group-text">pairs</span>
                </div>
              </td>
              <td>
                <select name="variants[${v.id}][change_type]" class="form-select form-select-sm variant-change-type">
                  ${buildChangeTypeOptions('Manual Adjustment')}
                </select>
              </td>
              <td>
                <input type="text" 
                       name="variants[${v.id}][reference_note]" 
                       class="form-control form-control-sm variant-ref-note" 
                       placeholder="e.g. Batch #4, restock, recount...">
              </td>
            `;
            tbody.appendChild(tr);
          });

          // Add listeners for stock inputs
          const inputs = tbody.querySelectorAll('.variant-stock-input');
          inputs.forEach(function (inp) {
            inp.addEventListener('input', function () {
              updateStockSummary();
              const prev = parseInt(this.getAttribute('data-prev'), 10) || 0;
              const current = parseInt(this.value, 10) || 0;
              const row = this.closest('tr');
              const select = row ? row.querySelector('.variant-change-type') : null;
              if (select) {
                if (current > prev) {
                  select.value = 'Restock';
                } else if (current < prev && select.value === 'Restock') {
                  select.value = 'Manual Adjustment';
                }
              }
            });
          });
          updateStockSummary();

        } else {
          if (tableWrap) tableWrap.style.display = 'none';
          if (quickFillWrap) quickFillWrap.style.display = 'none';
          if (emptyNotice) emptyNotice.style.display = 'block';

          const directInp = document.getElementById('modalDirectProductStock');
          if (directInp) {
            directInp.value = product.stock_quantity;
            directInp.addEventListener('input', function () {
              const summaryEl = document.getElementById('modalCalculatedTotalStock');
              if (summaryEl) summaryEl.textContent = this.value || 0;
            });
          }
          const summaryEl = document.getElementById('modalCalculatedTotalStock');
          if (summaryEl) summaryEl.textContent = product.stock_quantity;
        }
      }

      function updateStockSummary() {
        const inputs = document.querySelectorAll('#modalVariantsTableBody .variant-stock-input');
        let sum = 0;
        inputs.forEach(function (inp) {
          sum += Math.max(0, parseInt(inp.value, 10) || 0);
        });
        const summaryEl = document.getElementById('modalCalculatedTotalStock');
        if (summaryEl) {
          summaryEl.textContent = sum;
        }
      }

      function escapeHtml(str) {
        if (!str) return '';
        return String(str)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#039;');
      }

      // Quick Fill All button handler
      const btnApplyQuickFill = document.getElementById('btnApplyQuickFill');
      if (btnApplyQuickFill) {
        btnApplyQuickFill.addEventListener('click', function () {
          const typeVal = document.getElementById('quickFillChangeType').value;
          const noteVal = document.getElementById('quickFillNote').value;

          document.querySelectorAll('#modalVariantsTableBody .variant-change-type').forEach(function (sel) {
            sel.value = typeVal;
          });

          if (noteVal.trim() !== '') {
            document.querySelectorAll('#modalVariantsTableBody .variant-ref-note').forEach(function (inp) {
              inp.value = noteVal;
            });
          }
        });
      }

      // Row Adjust button: Shows ONLY the selected product and its variants
      const adjustBtns = document.querySelectorAll('.btn-stock-adjust');
      adjustBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
          const prodId = this.getAttribute('data-product-id');
          populateStockModal(prodId, true); // true = hide product selector
        });
      });

      // Top Quick Adjustment button: Opens with product selector
      const topBtn = document.getElementById('btnTopQuickAdjust');
      if (topBtn) {
        topBtn.addEventListener('click', function () {
          const selectEl = document.getElementById('stockAdjustProductSelect');
          const activeId = selectEl && selectEl.value ? selectEl.value : Object.keys(inventoryData.products)[0];
          if (activeId) {
            populateStockModal(activeId, false); // false = show product selector
          }
        });
      }

      // Dropdown change handler if opened from top
      const selectEl = document.getElementById('stockAdjustProductSelect');
      if (selectEl) {
        selectEl.addEventListener('change', function () {
          if (this.value) {
            populateStockModal(this.value, false);
          }
        });
      }
    });
  </script>
</body>

