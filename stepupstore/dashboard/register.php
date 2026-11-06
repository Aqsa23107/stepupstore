
<?php require_once __DIR__ . "/partials/header.php"; ?>
<body style="background: #0f172a;">
  <div class="container">
    <div class="admin-auth-box">
      <div class="text-center mb-4">
        <h2 class="fw-bold mb-1">NOVA FORM</h2>
        <span class="badge bg-dark border text-white px-3 py-1">STAFF REGISTRATION</span>
      </div>
      <form action="./actions/register_action.php" method="POST">
        <div class="mb-3">
          <label class="form-label small fw-bold">Full Name</label>
          <input type="text" name ="name" class="form-control" placeholder="Your name" required>
        </div>
        <div class="mb-3">
          <label class="form-label small fw-bold">Official Email</label>
          <input type="email" name="email" class="form-control" placeholder="Your email" required>
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
          <input type="password" name ="password" class="form-control" required>
        </div>
        <button type="submit" class="btn btn-dark w-100 py-2 mb-3">Create Staff Account</button>
        <div class="text-center small"><a href="login.html" class="text-muted">Already have access? Log in</a></div>
      </form>
    </div>
  </div>
</body>
</html>