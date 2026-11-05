<?php
 require_once __DIR__ . "/settings/session_start.php";
require_once __DIR__ . "/settings/db.php";
require_once __DIR__ . "/settings/auth_check.php";


$errors = $_SESSION['errors'] ?? [];
unset($_SESSION['errors']);

$success = $_SESSION['success'] ?? '';
unset($_SESSION['success']);

$query = "SELECT * FROM brands ORDER BY id DESC";
$result = mysqli_query($conn, $query);
$brands = mysqli_fetch_all($result, MYSQLI_ASSOC);





?>
<?php require_once __DIR__ . "/partials/header.php"; ?>

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
            <h1 class="page-title">Footwear Brands & Labels</h1>
            <p class="page-subtitle">Manage proprietary atelier labels within NOVA FORM.</p>
          </div>
          <button class="btn btn-sm btn-dark" data-bs-toggle="modal" data-bs-target="#addBrandModal">
            <i class="bi bi-plus-lg me-1"></i> Add Brand Label
          </button>
        </div>

        <div class="row g-4">
          <?php if (!empty($brands)) : ?>
            <?php foreach ($brands as $brand) : ?>
              <?php
                // Generate initials from brand name
                $words = explode(' ', trim($brand['name']));
                $initials = '';
                foreach ($words as $w) {
                    $initials .= strtoupper(substr($w, 0, 1));
                }
                $initials = substr($initials, 0, 2);
                if (empty($initials)) {
                    $initials = 'NF';
                }
              ?>
              <div class="col-md-6 col-lg-3">
                <div class="admin-card h-100 p-4 text-center">
                  <div class="rounded-circle bg-dark text-white d-inline-flex align-items-center justify-content-center fw-bold fs-5 mb-3" style="width: 64px; height: 64px;">
                    <?= $initials ?>
                  </div>
                  <h5 class="fw-bold fs-6 mb-1"><?= htmlspecialchars($brand['name']) ?></h5>
                  <p class="text-muted small mb-3">Added: <?= date('d M, Y', strtotime($brand['created_at'])) ?></p>
                  <div class="d-flex justify-content-center gap-2 mt-auto">
                    <button class="btn btn-sm btn-outline-secondary py-1 px-2" title="Edit"><i class="bi bi-pencil me-1"></i> Edit</button>
                    <button class="btn btn-sm btn-outline-danger py-1 px-2" title="Delete"><i class="bi bi-trash me-1"></i> Delete</button>
                  </div>
                </div>
              </div>
            <?php endforeach; ?>
          <?php else : ?>
            <div class="col-12">
              <div class="admin-card p-5 text-center text-muted">
                <i class="bi bi-tags fs-1 d-block mb-2"></i>
                <h5 class="fw-bold">No brands found</h5>
                <p class="small mb-3">Click below to add your first brand label.</p>
                <button class="btn btn-sm btn-dark" data-bs-toggle="modal" data-bs-target="#addBrandModal">
                  <i class="bi bi-plus-lg me-1"></i> Add Brand Label
                </button>
              </div>
            </div>
          <?php endif; ?>
        </div>

        <!-- Add Brand Modal -->
        <div class="modal fade" id="addBrandModal" tabindex="-1" aria-labelledby="addBrandModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <form action="actions/brands_action.php" method="POST">
                <div class="modal-header">
                  <h5 class="modal-title fs-6 fw-bold" id="addBrandModalLabel">Add Brand Label</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <div class="mb-3">
                    <label for="brandName" class="form-label small fw-bold">Brand Name <span class="text-danger">*</span></label>
                    <input type="text" class="form-control" id="brandName" name="name" placeholder="e.g. NOVA FORM Black Label, Artisan" required autofocus>
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-sm btn-outline-secondary" data-bs-dismiss="modal">Cancel</button>
                  <button type="submit" class="btn btn-sm btn-dark">
                    <i class="bi bi-plus-lg me-1"></i> Save Brand
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

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  <script src="assets/js/dashboard.js"></script>
</body>

</html>