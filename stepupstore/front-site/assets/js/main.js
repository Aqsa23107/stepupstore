/**
 * NOVA FORM - Luxury Men's Footwear
 * Minimal Vanilla JavaScript for Interactive UI Prototype
 */

document.addEventListener('DOMContentLoaded', () => {
  initCartCount();
  initProductGallery();
  initVariantSelection();
  initQuantityControls();
  initWishlistToggle();
  initCartCalculations();
  initDemoForms();
  initShopFilters();
});

/* ==========================================
   1. Shopping Cart & Wishlist Demo Counter
   ========================================== */
let cartCount = 2; // initial demo items
let wishlistCount = 3;

function initCartCount() {
  updateCartBadges();
}

function updateCartBadges() {
  const cartBadges = document.querySelectorAll('.cart-count-badge');
  cartBadges.forEach(badge => {
    badge.textContent = cartCount;
  });
  
  const wishBadges = document.querySelectorAll('.wishlist-count-badge');
  wishBadges.forEach(badge => {
    badge.textContent = wishlistCount;
  });
}

function showToast(message, icon = 'bi-check2-circle') {
  let toastContainer = document.querySelector('.nova-toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'nova-toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = 'nova-toast';
  toast.innerHTML = `<i class="bi ${icon} text-warning fs-5"></i> <span>${message}</span>`;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

/* ==========================================
   2. Product Gallery Thumbnail Switcher
   ========================================== */
function initProductGallery() {
  const mainImage = document.getElementById('mainProductImage');
  const thumbs = document.querySelectorAll('.product-thumb-item');

  if (mainImage && thumbs.length > 0) {
    thumbs.forEach(thumb => {
      thumb.addEventListener('click', function() {
        thumbs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        const targetSrc = this.getAttribute('data-img-src') || this.querySelector('img').src;
        mainImage.style.opacity = '0.5';
        setTimeout(() => {
          mainImage.src = targetSrc;
          mainImage.style.opacity = '1';
        }, 120);
      });
    });
  }
}

/* ==========================================
   3. Shoe Size & Color Variant Selection
   ========================================== */
function initVariantSelection() {
  // Shoe size pills
  const sizePills = document.querySelectorAll('.size-pill:not(.disabled)');
  sizePills.forEach(pill => {
    pill.addEventListener('click', function() {
      const container = this.closest('.size-selector-wrap') || this.parentElement;
      container.querySelectorAll('.size-pill').forEach(p => p.classList.remove('active'));
      this.classList.add('active');
      const label = document.getElementById('selectedSizeLabel');
      if (label) label.textContent = this.getAttribute('data-size') || this.textContent.trim();
    });
  });

  // Color options
  const colorOptions = document.querySelectorAll('.color-option');
  colorOptions.forEach(opt => {
    opt.addEventListener('click', function() {
      const container = this.parentElement;
      container.querySelectorAll('.color-option').forEach(c => c.classList.remove('active'));
      this.classList.add('active');
      const label = document.getElementById('selectedColorLabel');
      if (label) label.textContent = this.getAttribute('data-color') || 'Selected';
    });
  });

  // Add to cart button on Product Details
  const addToCartBtn = document.getElementById('btnAddToCart');
  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', function() {
      const selectedSize = document.querySelector('.size-pill.active');
      const sizeText = selectedSize ? selectedSize.textContent.trim() : 'EU 42';
      cartCount += 1;
      updateCartBadges();
      showToast(`Added to Bag (Size: ${sizeText})!`);
    });
  }

  // Quick add buttons on product cards
  document.querySelectorAll('.btn-quick-add').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      cartCount += 1;
      updateCartBadges();
      const title = btn.getAttribute('data-product-title') || 'Footwear item';
      showToast(`Added "${title}" to your cart`);
    });
  });
}

/* ==========================================
   4. Quantity Controls (+ / -)
   ========================================== */
function initQuantityControls() {
  document.querySelectorAll('.quantity-control').forEach(ctrl => {
    const decBtn = ctrl.querySelector('.quantity-btn-dec');
    const incBtn = ctrl.querySelector('.quantity-btn-inc');
    const input = ctrl.querySelector('.quantity-input');

    if (decBtn && incBtn && input) {
      decBtn.addEventListener('click', () => {
        let val = parseInt(input.value) || 1;
        if (val > 1) {
          input.value = val - 1;
          input.dispatchEvent(new Event('change'));
        }
      });

      incBtn.addEventListener('click', () => {
        let val = parseInt(input.value) || 1;
        input.value = val + 1;
        input.dispatchEvent(new Event('change'));
      });
    }
  });
}

/* ==========================================
   5. Wishlist Toggle State
   ========================================== */
function initWishlistToggle() {
  document.querySelectorAll('.product-wishlist-btn, .btn-wishlist-action').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const icon = this.querySelector('i');
      if (this.classList.contains('active')) {
        this.classList.remove('active');
        if (icon) {
          icon.classList.remove('bi-heart-fill');
          icon.classList.add('bi-heart');
        }
        wishlistCount = Math.max(0, wishlistCount - 1);
        updateCartBadges();
        showToast('Removed from your Wishlist', 'bi-heartbreak');
      } else {
        this.classList.add('active');
        if (icon) {
          icon.classList.remove('bi-heart');
          icon.classList.add('bi-heart-fill');
        }
        wishlistCount += 1;
        updateCartBadges();
        showToast('Added to your Wishlist!', 'bi-heart-fill');
      }
    });
  });
}

/* ==========================================
   6. Cart Page Calculations
   ========================================== */
function initCartCalculations() {
  const cartRows = document.querySelectorAll('.cart-item-row');
  const subtotalEl = document.getElementById('cartSubtotal');
  const totalEl = document.getElementById('cartGrandTotal');

  function calculateCart() {
    let subtotal = 0;
    document.querySelectorAll('.cart-item-row').forEach(row => {
      const price = parseFloat(row.getAttribute('data-price')) || 0;
      const qtyInput = row.querySelector('.quantity-input');
      const qty = parseInt(qtyInput ? qtyInput.value : 1) || 1;
      const lineTotal = price * qty;
      const lineTotalEl = row.querySelector('.line-total-val');
      if (lineTotalEl) {
        lineTotalEl.textContent = `PKR ${lineTotal.toLocaleString()}`;
      }
      subtotal += lineTotal;
    });

    if (subtotalEl) {
      subtotalEl.textContent = `PKR ${subtotal.toLocaleString()}`;
    }

    // Shipping rule: Free above PKR 10,000 else 250
    const shippingEl = document.getElementById('cartShippingVal');
    let shipping = subtotal > 10000 || subtotal === 0 ? 0 : 250;
    if (shippingEl) {
      shippingEl.textContent = shipping === 0 ? 'FREE' : `PKR ${shipping}`;
    }

    if (totalEl) {
      const grandTotal = Math.max(0, subtotal + shipping);
      totalEl.textContent = `PKR ${grandTotal.toLocaleString()}`;
    }
  }

  // Row removal
  cartRows.forEach(row => {
    const removeBtn = row.querySelector('.btn-remove-cart');
    if (removeBtn) {
      removeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        row.remove();
        cartCount = Math.max(0, cartCount - 1);
        updateCartBadges();
        calculateCart();
        showToast('Item removed from cart');
        checkEmptyCart();
      });
    }

    const qtyInput = row.querySelector('.quantity-input');
    if (qtyInput) {
      qtyInput.addEventListener('change', calculateCart);
    }
  });

  function checkEmptyCart() {
    const rows = document.querySelectorAll('.cart-item-row');
    const emptyState = document.getElementById('emptyCartState');
    const cartTableWrap = document.getElementById('cartTableWrapper');
    if (rows.length === 0 && emptyState && cartTableWrap) {
      cartTableWrap.classList.add('d-none');
      emptyState.classList.remove('d-none');
    }
  }

  calculateCart();
}

/* ==========================================
   7. Demo Form Submissions
   ========================================== */
function initDemoForms() {
  // Newsletter
  const newsletterForms = document.querySelectorAll('.demo-newsletter-form');
  newsletterForms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const input = this.querySelector('input[type="email"]');
      if (input && input.value) {
        showToast('Thank you! You are subscribed to NOVA FORM updates.');
        input.value = '';
      }
    });
  });

  // Contact form
  const contactForm = document.getElementById('demoContactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      showToast('Message sent! Our customer concierge will contact you within 24 hours.');
      this.reset();
    });
  }

  // Checkout form
  const checkoutForm = document.getElementById('demoCheckoutForm');
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const modalEl = document.getElementById('orderConfirmedModal');
      if (modalEl && typeof bootstrap !== 'undefined') {
        const modal = new bootstrap.Modal(modalEl);
        modal.show();
      } else {
        alert('Order Placed Successfully! (Demo Order #NF-88291)');
      }
    });
  }

  // Generic demo forms
  document.querySelectorAll('.demo-notify-form').forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const alertBox = this.querySelector('.demo-alert');
      if (alertBox) {
        alertBox.classList.remove('d-none');
      } else {
        showToast('Demo action completed successfully.');
      }
    });
  });
}

/* ==========================================
   8. Shop Page Client Filters & Sorting
   ========================================== */
function initShopFilters() {
  const sortSelect = document.getElementById('shopSortSelect');
  const searchInput = document.getElementById('shopSearchInput');
  const categoryCheckboxes = document.querySelectorAll('.filter-category-chk');
  const productCards = document.querySelectorAll('.shop-product-item');

  function applyFilters() {
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const selectedCats = Array.from(categoryCheckboxes)
      .filter(chk => chk.checked)
      .map(chk => chk.value.toLowerCase());

    let visibleCount = 0;

    productCards.forEach(item => {
      const name = (item.getAttribute('data-name') || '').toLowerCase();
      const cat = (item.getAttribute('data-category') || '').toLowerCase();

      const matchesSearch = !query || name.includes(query) || cat.includes(query);
      const matchesCat = selectedCats.length === 0 || selectedCats.includes(cat);

      if (matchesSearch && matchesCat) {
        item.style.display = '';
        visibleCount++;
      } else {
        item.style.display = 'none';
      }
    });

    const countDisplay = document.getElementById('visibleProductsCount');
    if (countDisplay) {
      countDisplay.textContent = visibleCount;
    }
  }

  if (searchInput) {
    searchInput.addEventListener('input', applyFilters);
  }

  categoryCheckboxes.forEach(chk => {
    chk.addEventListener('change', applyFilters);
  });

  // Sorting demo
  if (sortSelect) {
    sortSelect.addEventListener('change', function() {
      const grid = document.getElementById('shopProductGrid');
      if (!grid) return;
      const items = Array.from(grid.querySelectorAll('.shop-product-item'));
      const val = this.value;

      items.sort((a, b) => {
        const priceA = parseFloat(a.getAttribute('data-price')) || 0;
        const priceB = parseFloat(b.getAttribute('data-price')) || 0;
        if (val === 'price-asc') return priceA - priceB;
        if (val === 'price-desc') return priceB - priceA;
        return 0; // default order
      });

      items.forEach(el => grid.appendChild(el));
      showToast(`Sorted by: ${this.options[this.selectedIndex].text}`);
    });
  }
}
