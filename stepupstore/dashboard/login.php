<?php
require_once  __DIR__ . "/settings/session_start.php";
$errors = $_SESSION['errors'] ?? [];
unset($_SESSION['errors']);
?>



<?php require_once __DIR__ . "/partials/header.php"; ?>



<body style="background: #0f172a;">

  <div class="container">
    <div class="admin-auth-box">
      <div class="text-center mb-4">
        <h2 class="fw-bold tracking-wider mb-1" style="letter-spacing: 0.15em;">NOVA FORM</h2>
        <span class="badge bg-dark border text-white px-3 py-1">ADMINISTRATIVE CONSOLE</span>
      </div>

 <?php if (!empty($errors)) { ?>
        <div class="alert alert-danger">
          <ul>
            <?php foreach ($errors as $error) { ?>
              <li><?= $error ?></li>
            <?php } ?>
          </ul>

        </div>

      <?php } ?>
      <form action="./actions/login_action.php" method="POST">
        <div class="mb-3">
          <label class="form-label small fw-bold text-uppercase">Admin Email</label>
          <input type="email" name="email" class="form-control" value="admin@novaformshoes.pk" required>
        </div>

        <div class="mb-3">
          <div class="d-flex justify-content-between">
            <label class="form-label small fw-bold text-uppercase">Password</label>
            <a href="forgot-password.html" class="small text-muted">Forgot?</a>
          </div>
          <input type="password" name="password" class="form-control" value="admin123" required>
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
</html>