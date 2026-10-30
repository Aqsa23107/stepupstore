/**
 * NOVA FORM - Luxury Footwear Admin Dashboard
 * Minimal Vanilla JavaScript for Interactive Demo Dashboard
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileSidebar();
  initImagePreviews();
  initBulkCheckboxes();
  initDemoModalsAndAlerts();
  initSearchFilters();
});

/* 1. Mobile Sidebar Toggle */
function initMobileSidebar() {
  const toggleBtn = document.getElementById('sidebarToggleBtn');
  const sidebar = document.querySelector('.admin-sidebar');
  let backdrop = document.querySelector('.sidebar-backdrop');

  if (!backdrop) {
    backdrop = document.createElement('div');
    backdrop.className = 'sidebar-backdrop';
    document.body.appendChild(backdrop);
  }

  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      sidebar.classList.toggle('show');
      backdrop.classList.toggle('show');
    });

    backdrop.addEventListener('click', () => {
      sidebar.classList.remove('show');
      backdrop.classList.remove('show');
    });
  }
}

/* 2. Image Previews for Product Forms */
function initImagePreviews() {
  const fileInputs = document.querySelectorAll('.product-image-input');
  fileInputs.forEach(input => {
    input.addEventListener('change', function() {
      const previewContainer = document.getElementById(this.getAttribute('data-preview-target') || 'imagePreviewContainer');
      if (previewContainer && this.files && this.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
          previewContainer.innerHTML = `
            <div class="position-relative d-inline-block">
              <img src="${e.target.result}" class="img-thumbnail" style="width: 120px; height: 120px; object-fit: cover;" alt="Preview">
              <span class="badge bg-success position-absolute top-0 end-0 m-1">New</span>
            </div>
          `;
        };
        reader.readAsDataURL(this.files[0]);
      }
    });
  });
}

/* 3. Bulk Selection Checkboxes */
function initBulkCheckboxes() {
  const masterCheck = document.getElementById('selectAllRows');
  if (masterCheck) {
    masterCheck.addEventListener('change', function() {
      const rowChecks = document.querySelectorAll('.row-select-check');
      rowChecks.forEach(chk => {
        chk.checked = masterCheck.checked;
      });
    });
  }
}

/* 4. Demo Modals and Form Feedback */
function initDemoModalsAndAlerts() {
  // Delete action modal trigger
  document.querySelectorAll('.btn-trigger-delete').forEach(btn => {
    btn.addEventListener('click', function() {
      const itemName = this.getAttribute('data-name') || 'this item';
      const deleteTarget = document.getElementById('deleteTargetName');
      if (deleteTarget) deleteTarget.textContent = itemName;
    });
  });

  // Demo delete confirm
  const confirmDeleteBtn = document.getElementById('btnConfirmDelete');
  if (confirmDeleteBtn) {
    confirmDeleteBtn.addEventListener('click', () => {
      alert('Demo item deleted successfully!');
      const modalEl = document.getElementById('deleteConfirmModal');
      if (modalEl && typeof bootstrap !== 'undefined') {
        const modal = bootstrap.Modal.getInstance(modalEl);
        if (modal) modal.hide();
      }
    });
  }

  // Stock adjust confirm
  const confirmStockBtn = document.getElementById('btnConfirmStockAdjust');
  if (confirmStockBtn) {
    confirmStockBtn.addEventListener('click', () => {
      alert('Stock adjustment recorded successfully in demo audit log!');
      const modalEl = document.getElementById('stockAdjustModal');
      if (modalEl && typeof bootstrap !== 'undefined') {
        const modal = bootstrap.Modal.getInstance(modalEl);
        if (modal) modal.hide();
      }
    });
  }

  // Generic forms
  document.querySelectorAll('.admin-demo-form').forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const successNotice = this.getAttribute('data-success-msg') || 'Changes saved successfully!';
      alert(successNotice);
    });
  });
}

/* 5. Simple Search Filter for Tables */
function initSearchFilters() {
  const searchInput = document.getElementById('tableSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      const query = this.value.toLowerCase().trim();
      const rows = document.querySelectorAll('.filterable-table-body tr');
      rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(query) ? '' : 'none';
      });
    });
  }
}
