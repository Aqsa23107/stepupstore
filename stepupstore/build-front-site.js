/**
 * Frontend Pages Builder for NOVA FORM
 */

const fs = require('fs');
const path = require('path');
const { products, categories, brands, sampleOrders, sampleReviews } = require('./sample-data');
const { getFrontendNav, getFrontendFooter, renderProductCard } = require('./page-helpers');

const outDir = path.join(__dirname, 'front-site');

function savePage(fileName, content) {
  fs.writeFileSync(path.join(outDir, fileName), content.trim(), 'utf8');
  console.log(`Created front-site/${fileName}`);
}

/* ==========================================================================
   1. front-site/index.html (Homepage)
   ========================================================================== */
function generateHome() {
  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 8);
  const newArrivals = products.filter(p => p.isNew).slice(0, 4);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>NOVA FORM | Luxury Men's Footwear & Handcrafted Leather Shoes Pakistan</title>
  <meta name="description" content="Discover NOVA FORM luxury men's footwear. Goodyear-welted Oxfords, burnished Penny Loafers, handcrafted Peshawari Chappals, and sleek leather sneakers. Cash on Delivery across Pakistan.">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
  <link rel="stylesheet" href="assets/css/style.css">
  <link rel="stylesheet" href="assets/css/responsive.css">
</head>
<body>

  ${getFrontendNav('home')}

  <main>
    <!-- Section 1: Hero Banner -->
    <section class="hero-section">
      <img src="https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=1600&auto=format&fit=crop" class="hero-bg-img" alt="Luxury Handcrafted Men's Footwear">
      <div class="container position-relative z-2">
        <div class="row align-items-center">
          <div class="col-lg-7">
            <div class="hero-content text-start">
              <span class="hero-subtitle">Autumn / Winter 2026 Collection</span>
              <h1 class="hero-title font-editorial">Step Into Uncompromising Refinement.</h1>
              <p class="lead text-white-50 mb-4" style="max-width: 540px;">
                Handcrafted from full-grain Italian calfskin and Goodyear-welted for generations of distinction. Engineered for the modern Pakistani gentleman.
              </p>
              <div class="d-flex flex-wrap gap-3 hero-buttons">
                <a href="shop.html" class="btn btn-nova-dark" style="background: #ffffff; color: #111; border-color: #fff;">
                  Shop Collection <i class="bi bi-arrow-right"></i>
                </a>
                <a href="shop.html" class="btn btn-nova-outline" style="color: #fff; border-color: rgba(255,255,255,0.4);">
                  Explore Best Sellers
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 2: Shop by Category -->
    <section class="section-padding bg-white">
      <div class="container">
        <div class="section-header text-center mx-auto" style="max-width: 600px;">
          <span class="section-subtitle">Curated Silhouettes</span>
          <h2 class="section-title">Shop by Category</h2>
          <p class="section-desc mx-auto">Explore distinctive footwear styles crafted for formal boardrooms, festive galas, and relaxed urban living.</p>
        </div>

        <div class="row g-4">
          ${categories.slice(0, 6).map(cat => `
            <div class="col-lg-4 col-md-6">
              <a href="category.html" class="category-card">
                <div class="category-img-wrap">
                  <img src="${cat.img}" alt="${cat.name}">
                  <div class="category-overlay">
                    <span class="category-count">${cat.count} Masterpieces</span>
                    <h3 class="category-name font-editorial">${cat.name}</h3>
                    <span class="category-link-text">Explore Category <i class="bi bi-arrow-right"></i></span>
                  </div>
                </div>
              </a>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- Section 3: Best Sellers -->
    <section class="section-padding" style="background-color: var(--bg-secondary);">
      <div class="container">
        <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-4">
          <div>
            <span class="section-subtitle">Acclaimed Footwear</span>
            <h2 class="section-title mb-0">Our Best Sellers</h2>
          </div>
          <div class="mt-3 mt-md-0">
            <a href="shop.html" class="btn btn-sm btn-nova-outline">View All Models <i class="bi bi-arrow-right ms-1"></i></a>
          </div>
        </div>

        <div class="row g-3 g-md-4">
          ${bestSellers.map(p => `
            <div class="col-lg-3 col-md-6 col-6 col-product-grid">
              ${renderProductCard(p)}
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- Section 4: Promotional Banner -->
    <section class="container my-5">
      <div class="promo-banner">
        <div class="row g-0 align-items-center">
          <div class="col-lg-6">
            <div class="promo-content">
              <span class="badge bg-warning text-dark text-uppercase fw-bold px-3 py-1 mb-3">Seasonal Privilege</span>
              <h2 class="display-6 fw-bold mb-3 font-editorial text-white">The Goodyear Welted Oxford Experience</h2>
              <p class="text-white-50 mb-4" style="line-height: 1.8;">
                Constructed with 200+ meticulous hand steps using durable closed-channel soles. Enjoy complimentary cedar shoe trees with every Black Label pair this season.
              </p>
              <div class="d-flex flex-wrap gap-3">
                <a href="product-details.html" class="btn btn-warning fw-bold text-dark text-uppercase px-4 py-2">
                  Discover The Oxford
                </a>
                <a href="shop.html" class="btn btn-outline-light text-uppercase px-4 py-2">
                  Browse Sale
                </a>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <img src="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1000&auto=format&fit=crop" class="promo-banner-img" alt="Goodyear Welted Shoes">
          </div>
        </div>
      </div>
    </section>

    <!-- Section 5: New Arrivals -->
    <section class="section-padding bg-white">
      <div class="container">
        <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-4">
          <div>
            <span class="section-subtitle">Fresh From The Workshop</span>
            <h2 class="section-title mb-0">New Arrivals</h2>
          </div>
          <div class="mt-3 mt-md-0">
            <a href="shop.html" class="btn btn-sm btn-nova-outline">Explore Catalog <i class="bi bi-arrow-right ms-1"></i></a>
          </div>
        </div>

        <div class="row g-3 g-md-4">
          ${newArrivals.map(p => `
            <div class="col-lg-3 col-md-6 col-6 col-product-grid">
              ${renderProductCard(p)}
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- Section 6: Brand Benefits -->
    <section class="border-top border-bottom py-4 bg-white">
      <div class="container">
        <div class="row g-0">
          <div class="col-lg-2 col-md-4 col-6 benefit-item">
            <i class="bi bi-gem benefit-icon"></i>
            <h4 class="benefit-title">Artisanal Craft</h4>
            <p class="benefit-desc">Hand-burnished full grain leather</p>
          </div>
          <div class="col-lg-2 col-md-4 col-6 benefit-item">
            <i class="bi bi-feather benefit-icon"></i>
            <h4 class="benefit-title">Orthotic Comfort</h4>
            <p class="benefit-desc">Memory foam ergonomic footbeds</p>
          </div>
          <div class="col-lg-2 col-md-4 col-6 benefit-item">
            <i class="bi bi-truck benefit-icon"></i>
            <h4 class="benefit-title">Fast Delivery</h4>
            <p class="benefit-desc">Tracked shipping across Pakistan</p>
          </div>
          <div class="col-lg-2 col-md-4 col-6 benefit-item">
            <i class="bi bi-cash-coin benefit-icon"></i>
            <h4 class="benefit-title">Cash on Delivery</h4>
            <p class="benefit-desc">Pay at your doorstep with confidence</p>
          </div>
          <div class="col-lg-2 col-md-4 col-6 benefit-item">
            <i class="bi bi-arrow-left-right benefit-icon"></i>
            <h4 class="benefit-title">Easy Exchange</h4>
            <p class="benefit-desc">15 days hassle-free size changes</p>
          </div>
          <div class="col-lg-2 col-md-4 col-6 benefit-item">
            <i class="bi bi-shield-check benefit-icon"></i>
            <h4 class="benefit-title">Authentic Heritage</h4>
            <p class="benefit-desc">Original designs made for gentlemen</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 7: Featured Editorial Collection -->
    <section class="section-padding" style="background-color: var(--bg-surface);">
      <div class="container">
        <div class="row align-items-center g-5">
          <div class="col-lg-6">
            <div class="position-relative">
              <img src="https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=900&auto=format&fit=crop" class="img-fluid rounded-1 shadow-sm" alt="Artisan Shoemaking Process">
              <div class="position-absolute bottom-0 start-0 bg-white p-3 m-3 border rounded-1 shadow-sm d-none d-sm-block">
                <div class="small fw-bold text-uppercase text-muted">Heritage Workshop</div>
                <div class="fw-semibold">Over 40 Hours of Hand Detailing</div>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <span class="section-subtitle">Editorial Feature</span>
            <h2 class="display-6 fw-bold mb-3 font-editorial">The Art of Hand-Antiqued Patina</h2>
            <p class="text-muted mb-4" style="line-height: 1.8;">
              Each pair in the NOVA FORM collection begins with crust calf leather hand-selected from premier tanneries. Our master craftsmen hand-apply natural vegetable dyes, creams, and waxes with sea sponges and horsehair brushes to create a deep, layered patina that matures uniquely with every step you take.
            </p>
            <div class="d-flex flex-column gap-3 mb-4">
              <div class="d-flex align-items-start gap-3">
                <i class="bi bi-check2-circle text-warning fs-5"></i>
                <div>
                  <h6 class="mb-1 fw-bold">Slow-Cured Leather Lining</h6>
                  <p class="text-muted small mb-0">Breathable calfskin linings naturally regulate moisture and odor.</p>
                </div>
              </div>
              <div class="d-flex align-items-start gap-3">
                <i class="bi bi-check2-circle text-warning fs-5"></i>
                <div>
                  <h6 class="mb-1 fw-bold">Custom Brass Hardware</h6>
                  <p class="text-muted small mb-0">Heavy solid brass buckles that never rust or lose their distinguished lustre.</p>
                </div>
              </div>
            </div>
            <a href="about.html" class="btn btn-nova-dark">Read Our Philosophy <i class="bi bi-arrow-right ms-2"></i></a>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 8: Customer Reviews -->
    <section class="section-padding bg-white">
      <div class="container">
        <div class="section-header text-center mx-auto" style="max-width: 620px;">
          <span class="section-subtitle">Client Testimonials</span>
          <h2 class="section-title">Endorsed by Gentlemen</h2>
          <p class="section-desc mx-auto">Read authentic feedback from discerning patrons across Karachi, Lahore, and Islamabad.</p>
        </div>

        <div class="row g-4">
          ${sampleReviews.slice(0, 3).map(rev => `
            <div class="col-lg-4 col-md-6">
              <div class="review-card">
                <div class="review-stars">
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                </div>
                <p class="review-text">"${rev.comment}"</p>
                <div class="review-author mt-auto">
                  <div class="bg-dark text-white rounded-circle d-flex align-items-center justify-content-center fw-bold" style="width: 44px; height: 44px;">
                    ${rev.customer.charAt(0)}
                  </div>
                  <div>
                    <h5 class="review-name">${rev.customer}</h5>
                    <div class="review-city"><i class="bi bi-geo-alt me-1"></i> ${rev.city}, Pakistan &bull; <span class="text-muted">${rev.product}</span></div>
                  </div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- Section 9: Newsletter -->
    <section class="newsletter-section text-center">
      <div class="container">
        <div class="mx-auto" style="max-width: 580px;">
          <span class="section-subtitle">Exclusive Society</span>
          <h2 class="section-title mb-2">Join The NOVA FORM Club</h2>
          <p class="text-muted mb-4 small">
            Receive private trunk show invitations, seasonal shoe care manuals, and PKR 1,500 off your premier purchase.
          </p>
          <form class="demo-newsletter-form d-flex gap-2 justify-content-center">
            <input type="email" class="form-control newsletter-input" placeholder="Your executive email address" required style="max-width: 380px;">
            <button class="btn btn-nova-dark" type="submit">Subscribe</button>
          </form>
          <div class="text-muted small mt-2" style="font-size: 0.72rem;">We respect your discretion. Unsubscribe with one click anytime.</div>
        </div>
      </div>
    </section>
  </main>

  ${getFrontendFooter()}

</body>
</html>`;
}

/* ==========================================================================
   2. front-site/shop.html (Full Product Catalog)
   ========================================================================== */
function generateShop() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Shop All Men's Footwear | NOVA FORM Pakistan</title>
  <meta name="description" content="Explore NOVA FORM's complete footwear catalogue. Oxfords, Penny Loafers, Chelsea Boots, Sneakers, and Traditional Sandals.">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
  <link rel="stylesheet" href="assets/css/style.css">
  <link rel="stylesheet" href="assets/css/responsive.css">
</head>
<body>

  ${getFrontendNav('shop')}

  <main class="py-4">
    <div class="container">
      
      <!-- Breadcrumb -->
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb breadcrumb-nova">
          <li class="breadcrumb-item"><a href="index.html">Home</a></li>
          <li class="breadcrumb-item active" aria-current="page">Shop All Footwear</li>
        </ol>
      </nav>

      <!-- Page Header -->
      <div class="border-bottom pb-4 mb-4">
        <div class="row align-items-end">
          <div class="col-lg-8">
            <h1 class="h2 fw-bold font-editorial mb-2">Men's Handcrafted Footwear Collection</h1>
            <p class="text-muted mb-0 small">
              Engineered with full-grain leather, welted soles, and timeless silhouettes. Hand-finished for contemporary life.
            </p>
          </div>
          <div class="col-lg-4 text-lg-end mt-3 mt-lg-0">
            <span class="badge bg-light text-dark border p-2">Showing <strong id="visibleProductsCount">${products.length}</strong> Products</span>
          </div>
        </div>
      </div>

      <div class="row g-4">
        
        <!-- Sidebar Filters -->
        <div class="col-lg-3">
          <div class="p-3 bg-white border rounded-1 shadow-sm shop-sidebar">
            <div class="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
              <h5 class="fs-6 fw-bold text-uppercase mb-0"><i class="bi bi-funnel me-1"></i> Refine Catalog</h5>
              <a href="shop.html" class="text-muted small text-decoration-underline">Reset</a>
            </div>

            <!-- Category Filter -->
            <div class="mb-4">
              <label class="form-label-nova">Category</label>
              <div class="d-flex flex-column gap-1">
                ${categories.map(c => `
                  <div class="form-check">
                    <input class="form-check-input filter-category-chk" type="checkbox" value="${c.name}" id="cat_${c.name.replace(/\s+/g, '')}">
                    <label class="form-check-label small text-muted d-flex justify-content-between" for="cat_${c.name.replace(/\s+/g, '')}">
                      <span>${c.name}</span>
                      <span class="badge bg-light text-dark">${c.count}</span>
                    </label>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Brand Filter -->
            <div class="mb-4">
              <label class="form-label-nova">Atelier Brand</label>
              <div class="d-flex flex-column gap-1">
                ${brands.map(b => `
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="brand_${b.name.replace(/\s+/g, '')}">
                    <label class="form-check-label small text-muted" for="brand_${b.name.replace(/\s+/g, '')}">
                      ${b.name}
                    </label>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Shoe Size Filter -->
            <div class="mb-4">
              <div class="d-flex justify-content-between align-items-center mb-2">
                <label class="form-label-nova mb-0">Shoe Size (EU)</label>
                <a href="size-guide.html" class="small text-warning text-decoration-none">Guide</a>
              </div>
              <div class="d-flex flex-wrap gap-1">
                ${[39, 40, 41, 42, 43, 44, 45, 46].map(s => `
                  <span class="size-pill py-1 px-2 small">${s}</span>
                `).join('')}
              </div>
            </div>

            <!-- Color Swatches -->
            <div class="mb-4">
              <label class="form-label-nova">Color Family</label>
              <div class="d-flex flex-wrap gap-2">
                <span class="color-option" style="background: #141414;" title="Nero Black"></span>
                <span class="color-option" style="background: #543015;" title="Dark Mocha"></span>
                <span class="color-option" style="background: #8c5324;" title="Chestnut Tan"></span>
                <span class="color-option" style="background: #213247;" title="Midnight Navy"></span>
                <span class="color-option" style="background: #f5f5f5;" title="Chalk White"></span>
                <span class="color-option" style="background: #3d141b;" title="Bordeaux Oxblood"></span>
              </div>
            </div>

            <!-- Price Range -->
            <div class="mb-4">
              <label class="form-label-nova">Price Range (PKR)</label>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="priceRange" id="pr1" checked>
                <label class="form-check-label small text-muted" for="pr1">All Prices</label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="priceRange" id="pr2">
                <label class="form-check-label small text-muted" for="pr2">Under PKR 7,000</label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="priceRange" id="pr3">
                <label class="form-check-label small text-muted" for="pr3">PKR 7,000 - PKR 12,000</label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="priceRange" id="pr4">
                <label class="form-check-label small text-muted" for="pr4">Above PKR 12,000</label>
              </div>
            </div>

            <!-- Occasion -->
            <div class="mb-3">
              <label class="form-label-nova">Occasion</label>
              <div class="d-flex flex-column gap-1">
                <div class="form-check"><input class="form-check-input" type="checkbox" id="oc1"><label class="form-check-label small text-muted" for="oc1">Black Tie & Formal</label></div>
                <div class="form-check"><input class="form-check-input" type="checkbox" id="oc2"><label class="form-check-label small text-muted" for="oc2">Smart Casual & Business</label></div>
                <div class="form-check"><input class="form-check-input" type="checkbox" id="oc3"><label class="form-check-label small text-muted" for="oc3">Traditional & Festivities</label></div>
                <div class="form-check"><input class="form-check-input" type="checkbox" id="oc4"><label class="form-check-label small text-muted" for="oc4">Casual & Weekend</label></div>
              </div>
            </div>

          </div>
        </div>

        <!-- Product Grid & Toolbar -->
        <div class="col-lg-9">
          
          <!-- Toolbar -->
          <div class="bg-white p-3 border rounded-1 mb-4 d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
            <div class="input-group" style="max-width: 320px;">
              <span class="input-group-text bg-white border-end-0"><i class="bi bi-search text-muted"></i></span>
              <input type="text" id="shopSearchInput" class="form-control border-start-0" placeholder="Filter by shoe title...">
            </div>

            <div class="d-flex align-items-center gap-3 w-100 w-md-auto justify-content-end">
              <label for="shopSortSelect" class="small text-muted text-nowrap mb-0 fw-semibold">Sort By:</label>
              <select id="shopSortSelect" class="form-select form-select-sm" style="min-width: 180px;">
                <option value="featured">Featured Collection</option>
                <option value="newest">Newest Additions</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="bestseller">Best Selling</option>
              </select>
            </div>
          </div>

          <!-- Product Grid: 24 Full items -->
          <div class="row g-3 g-md-4" id="shopProductGrid">
            ${products.map(p => `
              <div class="col-lg-4 col-md-6 col-6 col-product-grid shop-product-item" data-name="${p.name}" data-category="${p.category}" data-price="${p.price}">
                ${renderProductCard(p)}
              </div>
            `).join('')}
          </div>

          <!-- Pagination -->
          <nav class="mt-5 d-flex justify-content-center" aria-label="Page navigation">
            <ul class="pagination pagination-sm">
              <li class="page-item disabled"><a class="page-link" href="#"><i class="bi bi-chevron-left"></i></a></li>
              <li class="page-item active"><a class="page-link" href="#">1</a></li>
              <li class="page-item"><a class="page-link" href="#">2</a></li>
              <li class="page-item"><a class="page-link" href="#">3</a></li>
              <li class="page-item"><a class="page-link" href="#"><i class="bi bi-chevron-right"></i></a></li>
            </ul>
          </nav>

        </div>

      </div>

    </div>
  </main>

  ${getFrontendFooter()}

</body>
</html>`;
}

/* ==========================================================================
   3. front-site/category.html (Category Listing Template)
   ========================================================================== */
function generateCategory() {
  const formalProducts = products.filter(p => p.category === "Formal Shoes" || p.category === "Loafers");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Formal Shoes & Luxury Loafers | NOVA FORM</title>
  <meta name="description" content="Shop handcrafted men's formal shoes, cap-toe Oxfords, wingtip Brogues, and luxury Penny Loafers.">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
  <link rel="stylesheet" href="assets/css/style.css">
  <link rel="stylesheet" href="assets/css/responsive.css">
</head>
<body>

  ${getFrontendNav('category')}

  <main>
    <!-- Category Hero Banner -->
    <div class="position-relative bg-dark text-white py-5" style="background: linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url('https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=1600&auto=format&fit=crop') center/cover;">
      <div class="container py-4">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb breadcrumb-nova text-white-50">
            <li class="breadcrumb-item"><a href="index.html" class="text-white-50">Home</a></li>
            <li class="breadcrumb-item"><a href="shop.html" class="text-white-50">Categories</a></li>
            <li class="breadcrumb-item active text-white" aria-current="page">Formal Shoes & Loafers</li>
          </ol>
        </nav>
        <div class="max-w-700">
          <span class="badge bg-warning text-dark text-uppercase fw-bold px-3 py-1 mb-2">Category Showcase</span>
          <h1 class="display-5 fw-bold font-editorial text-white mb-2">Formal Shoes & Luxury Loafers</h1>
          <p class="lead text-white-50 mb-0" style="max-width: 650px;">
            From black-tie Oxfords to supple Italian-cut Penny Loafers, our dress shoe atelier combines bespoke lasts with glove-soft calfskin.
          </p>
        </div>
      </div>
    </div>



    <div class="container py-5">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <div class="text-muted small">Showing <strong>${formalProducts.length}</strong> handcrafted models</div>
        <div class="d-flex align-items-center gap-2">
          <label class="small text-muted mb-0">Sort:</label>
          <select class="form-select form-select-sm" style="width: 170px;">
            <option>Featured First</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>
      </div>

      <div class="row g-3 g-md-4">
        ${formalProducts.map(p => `
          <div class="col-lg-3 col-md-6 col-6 col-product-grid">
            ${renderProductCard(p)}
          </div>
        `).join('')}
      </div>

      <!-- Pagination -->
      <nav class="mt-5 d-flex justify-content-center" aria-label="Page navigation">
        <ul class="pagination pagination-sm">
          <li class="page-item active"><a class="page-link" href="#">1</a></li>
          <li class="page-item"><a class="page-link" href="#">2</a></li>
          <li class="page-item"><a class="page-link" href="#"><i class="bi bi-chevron-right"></i></a></li>
        </ul>
      </nav>
    </div>
  </main>

  ${getFrontendFooter()}

</body>
</html>`;
}

/* ==========================================================================
   4. front-site/product-details.html (Single Product Page)
   ========================================================================== */
function generateProductDetails() {
  const p = products[0]; // Regal Wholecut Oxford
  const related = products.slice(1, 5);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${p.name} | NOVA FORM Luxury Footwear</title>
  <meta name="description" content="${p.shortDesc} Hand-burnished Italian calfskin dress shoe with Goodyear welted sole.">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
  <link rel="stylesheet" href="assets/css/style.css">
  <link rel="stylesheet" href="assets/css/responsive.css">
</head>
<body>

  ${getFrontendNav('shop')}

  <main class="py-4">
    <div class="container">
      
      <!-- Breadcrumb -->
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb breadcrumb-nova">
          <li class="breadcrumb-item"><a href="index.html">Home</a></li>
          <li class="breadcrumb-item"><a href="shop.html">Shop</a></li>
          <li class="breadcrumb-item"><a href="category.html">${p.category}</a></li>
          <li class="breadcrumb-item active" aria-current="page">${p.name}</li>
        </ol>
      </nav>

      <div class="row g-4 g-lg-5">
        
        <!-- Gallery Col -->
        <div class="col-lg-7 product-gallery-container">
          <div class="product-gallery-main position-relative">
            <span class="badge bg-dark position-absolute top-0 start-0 m-3 text-uppercase px-2 py-1">${p.brand}</span>
            <img id="mainProductImage" src="${p.gallery[0]}" alt="${p.name}">
          </div>

          <!-- Thumbnails -->
          <div class="row g-2">
            ${p.gallery.map((img, idx) => `
              <div class="col-3">
                <div class="product-thumb-item ${idx === 0 ? 'active' : ''}" data-img-src="${img}">
                  <img src="${img}" alt="Thumbnail ${idx + 1}">
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Product Purchasing Information Col -->
        <div class="col-lg-5">
          <div class="product-purchase-box">
            
            <div class="d-flex align-items-center justify-content-between mb-2">
              <span class="text-uppercase text-muted small fw-bold tracking-wider">${p.category} &bull; SKU: ${p.sku}</span>
              <span class="badge bg-success bg-opacity-10 text-success fw-semibold"><i class="bi bi-check-circle-fill me-1"></i> In Stock</span>
            </div>

            <h1 class="h2 fw-bold font-editorial mb-2">${p.name}</h1>

            <div class="d-flex align-items-center gap-2 mb-3">
              <div class="product-rating mb-0">
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <span class="count ms-1">(${p.reviewsCount} Verified Gentlemen Reviews)</span>
              </div>
            </div>

            <div class="d-flex align-items-baseline gap-3 mb-4 pb-3 border-bottom">
              <span class="fs-2 fw-bold text-dark">PKR ${p.price.toLocaleString()}</span>
              <span class="fs-5 text-muted text-decoration-line-through">PKR ${p.originalPrice.toLocaleString()}</span>
              <span class="badge bg-danger">Save 15%</span>
            </div>

            <p class="text-muted small mb-4" style="line-height: 1.7;">
              ${p.shortDesc} Each shoe is shaped over our signature almond-toe last, providing supreme arch posture and sleek black-tie styling.
            </p>

            <!-- Color Options -->
            <div class="mb-4">
              <label class="form-label-nova d-flex justify-content-between">
                <span>Selected Color: <strong id="selectedColorLabel" class="text-dark">${p.colorNames[0]}</strong></span>
              </label>
              <div class="d-flex gap-2">
                ${p.colors.map((c, i) => `
                  <span class="color-option ${i === 0 ? 'active' : ''}" style="background-color: ${c};" data-color="${p.colorNames[i]}" title="${p.colorNames[i]}"></span>
                `).join('')}
              </div>
            </div>

            <!-- Size Selector -->
            <div class="mb-4 size-selector-wrap">
              <div class="d-flex justify-content-between align-items-center mb-2">
                <label class="form-label-nova mb-0">Select EU Size: <strong id="selectedSizeLabel" class="text-dark">EU 42</strong></label>
                <a href="size-guide.html" class="small text-warning text-decoration-underline"><i class="bi bi-rulers me-1"></i> Size Guide (cm)</a>
              </div>
              <div class="d-flex flex-wrap gap-2">
                ${p.sizes.map((s, idx) => `
                  <button type="button" class="size-pill ${s === 42 ? 'active' : ''}" data-size="EU ${s}">${s}</button>
                `).join('')}
              </div>
              <small class="text-muted d-block mt-2">True to size. If between sizes, choose your closest larger size.</small>
            </div>

            <!-- Quantity & Actions -->
            <div class="mb-4 d-flex align-items-center gap-3">
              <div class="quantity-control">
                <button type="button" class="quantity-btn quantity-btn-dec"><i class="bi bi-dash"></i></button>
                <input type="text" class="quantity-input" value="1" readonly>
                <button type="button" class="quantity-btn quantity-btn-inc"><i class="bi bi-plus"></i></button>
              </div>

              <button type="button" class="btn btn-nova-dark flex-grow-1" id="btnAddToCart">
                <i class="bi bi-bag-plus me-1"></i> Add To Bag
              </button>

              <button type="button" class="btn btn-outline-secondary px-3 py-2 btn-wishlist-action" title="Save to wishlist">
                <i class="bi bi-heart"></i>
              </button>
            </div>

            <!-- Instant Buy Now -->
            <div class="mb-4">
              <a href="checkout.html" class="btn btn-nova-tan w-100 py-3 text-center d-block">
                <i class="bi bi-lightning-charge me-1"></i> Buy Now &bull; Express Checkout
              </a>
            </div>

            <!-- Assurance Box -->
            <div class="bg-light p-3 rounded-1 border small">
              <div class="d-flex align-items-center gap-2 mb-2 text-dark">
                <i class="bi bi-shield-check text-success fs-5"></i>
                <span><strong>Complimentary Delivery</strong> on this order anywhere in Pakistan.</span>
              </div>
              <div class="d-flex align-items-center gap-2 mb-2 text-dark">
                <i class="bi bi-arrow-repeat text-primary fs-5"></i>
                <span><strong>15-Day Exchange Policy</strong> with doorstep exchange support.</span>
              </div>
              <div class="d-flex align-items-center gap-2 text-dark">
                <i class="bi bi-cash-stack text-warning fs-5"></i>
                <span><strong>Cash on Delivery (COD)</strong> accepted nationwide.</span>
              </div>
            </div>

          </div>
        </div>

      </div>

      <!-- Product Specifications Tabs -->
      <div class="mt-5 pt-4 border-top">
        <ul class="nav nav-tabs nav-tabs-nova mb-4" id="productDetailTabs" role="tablist">
          <li class="nav-item" role="presentation">
            <button class="nav-link active" id="desc-tab" data-bs-toggle="tab" data-bs-target="#desc-pane" type="button" role="tab">Description & Fit</button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link" id="specs-tab" data-bs-toggle="tab" data-bs-target="#specs-pane" type="button" role="tab">Specifications</button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link" id="shipping-tab" data-bs-toggle="tab" data-bs-target="#shipping-pane" type="button" role="tab">Shipping & Returns</button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link" id="reviews-tab" data-bs-toggle="tab" data-bs-target="#reviews-pane" type="button" role="tab">Reviews (${p.reviewsCount})</button>
          </li>
        </ul>

        <div class="tab-content bg-white p-4 border rounded-1 shadow-sm" id="productDetailTabContent">
          <!-- Tab 1 -->
          <div class="tab-pane fade show active" id="desc-pane" role="tabpanel">
            <div class="row">
              <div class="col-lg-8">
                <h4 class="font-editorial mb-3">The Pure Wholecut Oxford</h4>
                <p class="text-muted" style="line-height: 1.8;">
                  Mastering the Wholecut is considered the zenith of footwear craftsmanship. Requiring a completely unblemished, continuous hide of full-grain calfskin, it offers no room for error. The shoe wraps around the foot like a bespoke glove, adapting to your foot’s unique contours over time.
                </p>
                <h5 class="fs-6 fw-bold text-uppercase mt-4 mb-2">Key Features:</h5>
                <ul class="text-muted small">
                  <li>Single piece unbroken upper construction without quarters or seams.</li>
                  <li>Goodyear welted closed-channel sole allowing indefinite resoling.</li>
                  <li>Hand-beveled waist and stacked leather heel with non-slip dovetail rubber insert.</li>
                  <li>Treated with natural beeswax and organic oils for supreme water repellency.</li>
                </ul>
              </div>
              <div class="col-lg-4 border-start ps-lg-4">
                <h6 class="text-uppercase fw-bold text-muted small mb-3">Fitting Advice</h6>
                <p class="small text-muted mb-2">Standard 'F' fitting (Regular width). Excellent instep curvature suited for South Asian feet.</p>
                <p class="small text-muted">Recommend wearing with fine dress socks.</p>
              </div>
            </div>
          </div>

          <!-- Tab 2 -->
          <div class="tab-pane fade" id="specs-pane" role="tabpanel">
            <table class="table table-bordered small">
              <tbody>
                <tr><th class="w-25 bg-light">Upper Material</th><td>${p.material}</td></tr>
                <tr><th class="bg-light">Lining</th><td>Full Grain Odor-Resistant Calfskin Lining</td></tr>
                <tr><th class="bg-light">Sole Construction</th><td>${p.sole}</td></tr>
                <tr><th class="bg-light">Last</th><td>Chiseled Almond Last #802</td></tr>
                <tr><th class="bg-light">Occasion</th><td>${p.occasion}</td></tr>
                <tr><th class="bg-light">Shoe Care</th><td>Apply cream polish monthly with horsehair brush. Store with cedar shoe trees.</td></tr>
              </tbody>
            </table>
          </div>

          <!-- Tab 3 -->
          <div class="tab-pane fade" id="shipping-pane" role="tabpanel">
            <div class="row g-4">
              <div class="col-md-6">
                <h5 class="fs-6 fw-bold text-uppercase">Nationwide Pakistani Shipping</h5>
                <p class="text-muted small">
                  Orders are dispatched within 24 business hours from our Lahore and Karachi distribution centres. Delivered via TCS, Leopard, and CallCourier.
                </p>
                <ul class="text-muted small">
                  <li>Major Cities (Lahore, Karachi, Islamabad, Rawalpindi): 2-3 business days.</li>
                  <li>Rest of Pakistan: 3-5 business days.</li>
                  <li>Cash on Delivery available on orders up to PKR 50,000.</li>
                </ul>
              </div>
              <div class="col-md-6 border-start ps-md-4">
                <h5 class="fs-6 fw-bold text-uppercase">15-Day Exchange Guarantee</h5>
                <p class="text-muted small">
                  If your pair doesn't fit flawlessly, our courier will pick it up and deliver your revised size in one smooth handover. Shoes must be unworn and in original condition.
                </p>
              </div>
            </div>
          </div>

          <!-- Tab 4 -->
          <div class="tab-pane fade" id="reviews-pane" role="tabpanel">
            <div class="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h5 class="mb-1 fw-bold">Customer Reviews</h5>
                <div class="text-warning small"><i class="bi bi-star-fill"></i> 4.9 Average Rating out of 38 reviews</div>
              </div>
              <button class="btn btn-sm btn-nova-dark" onclick="alert('Review submission demo opened!');">Write a Review</button>
            </div>
            
            <div class="d-flex flex-column gap-3">
              ${sampleReviews.slice(0, 3).map(r => `
                <div class="border-bottom pb-3">
                  <div class="d-flex justify-content-between align-items-center mb-1">
                    <strong class="small">${r.customer}</strong>
                    <span class="text-muted small">${r.date}</span>
                  </div>
                  <div class="text-warning small mb-1">
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                  </div>
                  <p class="text-muted small mb-0">"${r.comment}"</p>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>

      <!-- Related Products -->
      <section class="mt-5 pt-4">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h2 class="h4 font-editorial mb-0">You May Also Admire</h2>
          <a href="shop.html" class="small text-dark fw-bold text-decoration-none">View Complete Archive &rarr;</a>
        </div>
        <div class="row g-3 g-md-4">
          ${related.map(rel => `
            <div class="col-lg-3 col-md-6 col-6 col-product-grid">
              ${renderProductCard(rel)}
            </div>
          `).join('')}
        </div>
      </section>

    </div>
  </main>

  ${getFrontendFooter()}

</body>
</html>`;
}

/* ==========================================================================
   5. front-site/cart.html (Shopping Cart)
   ========================================================================== */
function generateCart() {
  const item1 = products[0]; // 14999
  const item2 = products[1]; // 12499

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Shopping Bag | NOVA FORM</title>
  <meta name="description" content="View your NOVA FORM shopping bag, apply promotional vouchers, and proceed to checkout.">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
  <link rel="stylesheet" href="assets/css/style.css">
  <link rel="stylesheet" href="assets/css/responsive.css">
</head>
<body>

  ${getFrontendNav()}

  <main class="py-5">
    <div class="container">
      
      <!-- Page Title -->
      <div class="border-bottom pb-3 mb-4">
        <h1 class="h3 fw-bold font-editorial mb-1">Your Shopping Bag</h1>
        <p class="text-muted small mb-0">Review your chosen footwear models and specify delivery details.</p>
      </div>

      <div id="cartTableWrapper">
        <div class="row g-4">
          
          <!-- Items List Col -->
          <div class="col-lg-8">
            <div class="bg-white border rounded-1 shadow-sm overflow-hidden mb-4">
              <table class="table cart-table mb-0">
                <thead>
                  <tr>
                    <th>Footwear Item</th>
                    <th>Size & Color</th>
                    <th>Unit Price</th>
                    <th>Quantity</th>
                    <th>Line Total</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <!-- Item 1 -->
                  <tr class="cart-item-row" data-price="${item1.price}">
                    <td data-label="Item">
                      <div class="d-flex align-items-center gap-3">
                        <img src="${item1.image}" alt="${item1.name}" class="rounded-1" style="width: 72px; height: 72px; object-fit: cover;">
                        <div>
                          <h6 class="mb-1 fw-bold"><a href="product-details.html" class="text-dark">${item1.name}</a></h6>
                          <div class="text-muted small">${item1.sku}</div>
                        </div>
                      </div>
                    </td>
                    <td data-label="Variant">
                      <span class="badge bg-light text-dark border">EU 42</span><br>
                      <small class="text-muted">Nero Black</small>
                    </td>
                    <td data-label="Price" class="fw-semibold">PKR ${item1.price.toLocaleString()}</td>
                    <td data-label="Quantity">
                      <div class="quantity-control">
                        <button type="button" class="quantity-btn quantity-btn-dec"><i class="bi bi-dash"></i></button>
                        <input type="text" class="quantity-input" value="1" readonly>
                        <button type="button" class="quantity-btn quantity-btn-inc"><i class="bi bi-plus"></i></button>
                      </div>
                    </td>
                    <td data-label="Total" class="fw-bold line-total-val">PKR ${item1.price.toLocaleString()}</td>
                    <td data-label="Action">
                      <button class="btn btn-sm btn-link text-danger btn-remove-cart" title="Remove Item"><i class="bi bi-trash3"></i></button>
                    </td>
                  </tr>

                  <!-- Item 2 -->
                  <tr class="cart-item-row" data-price="${item2.price}">
                    <td data-label="Item">
                      <div class="d-flex align-items-center gap-3">
                        <img src="${item2.image}" alt="${item2.name}" class="rounded-1" style="width: 72px; height: 72px; object-fit: cover;">
                        <div>
                          <h6 class="mb-1 fw-bold"><a href="product-details.html" class="text-dark">${item2.name}</a></h6>
                          <div class="text-muted small">${item2.sku}</div>
                        </div>
                      </div>
                    </td>
                    <td data-label="Variant">
                      <span class="badge bg-light text-dark border">EU 43</span><br>
                      <small class="text-muted">Sienna Tan</small>
                    </td>
                    <td data-label="Price" class="fw-semibold">PKR ${item2.price.toLocaleString()}</td>
                    <td data-label="Quantity">
                      <div class="quantity-control">
                        <button type="button" class="quantity-btn quantity-btn-dec"><i class="bi bi-dash"></i></button>
                        <input type="text" class="quantity-input" value="1" readonly>
                        <button type="button" class="quantity-btn quantity-btn-inc"><i class="bi bi-plus"></i></button>
                      </div>
                    </td>
                    <td data-label="Total" class="fw-bold line-total-val">PKR ${item2.price.toLocaleString()}</td>
                    <td data-label="Action">
                      <button class="btn btn-sm btn-link text-danger btn-remove-cart" title="Remove Item"><i class="bi bi-trash3"></i></button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="d-flex justify-content-between align-items-center">
              <a href="shop.html" class="btn btn-nova-outline"><i class="bi bi-arrow-left me-2"></i> Continue Shopping</a>
              <span class="text-muted small">Standard Express Delivery takes 2-3 business days.</span>
            </div>
          </div>

          <!-- Order Summary Col -->
          <div class="col-lg-4">
            <div class="order-summary-box">
              <h5 class="fw-bold text-uppercase fs-6 mb-3">Order Summary</h5>
              
              <div class="d-flex justify-content-between mb-2">
                <span class="text-muted">Bag Subtotal</span>
                <span class="fw-semibold" id="cartSubtotal">PKR 27,498</span>
              </div>

              <div class="d-flex justify-content-between mb-3">
                <span class="text-muted">Nationwide Delivery</span>
                <span class="fw-semibold text-success" id="cartShippingVal">FREE</span>
              </div>

              <hr class="my-3">

              <div class="d-flex justify-content-between align-items-baseline mb-4">
                <span class="fw-bold text-dark fs-5">Estimated Total</span>
                <span class="fs-4 fw-bold text-dark" id="cartGrandTotal">PKR 27,498</span>
              </div>

              <a href="checkout.html" class="btn btn-nova-dark w-100 py-3 text-center mb-3">
                Proceed To Checkout <i class="bi bi-arrow-right ms-2"></i>
              </a>

              <div class="text-center">
                <span class="text-muted small"><i class="bi bi-shield-lock me-1"></i> Cash on Delivery & SSL Protected</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- Empty State -->
      <div id="emptyCartState" class="d-none text-center py-5">
        <i class="bi bi-bag-x display-1 text-muted"></i>
        <h3 class="fw-bold font-editorial mt-3">Your Shopping Bag is Currently Empty</h3>
        <p class="text-muted mb-4">Discover our handcrafted men's formal dress shoes, loafers, and traditional styles.</p>
        <a href="shop.html" class="btn btn-nova-dark">Explore The Collection</a>
      </div>

    </div>
  </main>

  ${getFrontendFooter()}

</body>
</html>`;
}

/* ==========================================================================
   6. front-site/checkout.html (Realistic Checkout Page)
   ========================================================================== */
function generateCheckout() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Checkout | NOVA FORM Pakistan</title>
  <meta name="description" content="Secure checkout with Cash on Delivery, Bank Transfer, or Online Payment across Pakistan.">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
  <link rel="stylesheet" href="assets/css/style.css">
  <link rel="stylesheet" href="assets/css/responsive.css">
</head>
<body>

  ${getFrontendNav()}

  <main class="py-5">
    <div class="container">
      
      <div class="border-bottom pb-3 mb-4">
        <h1 class="h3 fw-bold font-editorial mb-1">Secure Checkout</h1>
        <p class="text-muted small mb-0">Complete your dispatch address and select your payment preference.</p>
      </div>

      <form id="demoCheckoutForm">
        <div class="row g-4 g-lg-5">
          
          <!-- Left: Customer & Address Information -->
          <div class="col-lg-7">
            
            <!-- Contact Info -->
            <div class="bg-white p-4 border rounded-1 shadow-sm mb-4">
              <h5 class="fw-bold text-uppercase fs-6 mb-3"><i class="bi bi-person me-2"></i> 1. Contact Information</h5>
              <div class="row g-3">
                <div class="col-md-6">
                  <label class="form-label-nova">Full Name *</label>
                  <input type="text" class="form-control form-control-nova" value="Hamza Tariq" required>
                </div>
                <div class="col-md-6">
                  <label class="form-label-nova">Mobile Phone (for delivery SMS) *</label>
                  <input type="tel" class="form-control form-control-nova" value="+92 300 8472911" required>
                </div>
                <div class="col-12">
                  <label class="form-label-nova">Email Address (for order tracking) *</label>
                  <input type="email" class="form-control form-control-nova" value="hamza.tariq@gmail.com" required>
                </div>
              </div>
            </div>

            <!-- Shipping Address -->
            <div class="bg-white p-4 border rounded-1 shadow-sm mb-4">
              <h5 class="fw-bold text-uppercase fs-6 mb-3"><i class="bi bi-geo-alt me-2"></i> 2. Delivery Address in Pakistan</h5>
              <div class="row g-3">
                <div class="col-12">
                  <label class="form-label-nova">House / Apartment / Office Number *</label>
                  <input type="text" class="form-control form-control-nova" value="House 42, Street 8" required>
                </div>
                <div class="col-12">
                  <label class="form-label-nova">Street Address / Sector / Phase *</label>
                  <input type="text" class="form-control form-control-nova" value="Sector J, Phase 5, DHA" required>
                </div>
                <div class="col-md-6">
                  <label class="form-label-nova">City *</label>
                  <select class="form-select form-select-nova" required>
                    <option selected>Lahore</option>
                    <option>Karachi</option>
                    <option>Islamabad</option>
                    <option>Rawalpindi</option>
                    <option>Faisalabad</option>
                    <option>Multan</option>
                    <option>Peshawar</option>
                    <option>Sialkot</option>
                    <option>Gujranwala</option>
                    <option>Quetta</option>
                    <option>Hyderabad</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label class="form-label-nova">Province *</label>
                  <select class="form-select form-select-nova" required>
                    <option selected>Punjab</option>
                    <option>Sindh</option>
                    <option>Khyber Pakhtunkhwa</option>
                    <option>Balochistan</option>
                    <option>Islamabad Capital Territory</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label class="form-label-nova">Postal Code</label>
                  <input type="text" class="form-control form-control-nova" value="54000">
                </div>
                <div class="col-md-6">
                  <label class="form-label-nova">Country</label>
                  <input type="text" class="form-control form-control-nova bg-light" value="Pakistan" readonly>
                </div>
                <div class="col-12">
                  <label class="form-label-nova">Delivery Instructions (Optional)</label>
                  <textarea class="form-control form-control-nova" rows="2" placeholder="e.g. Ring bell or call before arriving"></textarea>
                </div>
              </div>
            </div>

            <!-- Payment Method -->
            <div class="bg-white p-4 border rounded-1 shadow-sm mb-4">
              <h5 class="fw-bold text-uppercase fs-6 mb-3"><i class="bi bi-wallet2 me-2"></i> 3. Payment Method</h5>
              
              <div class="d-flex flex-column gap-3">
                <div class="form-check p-3 border rounded-1 bg-light">
                  <input class="form-check-input" type="radio" name="paymentMethod" id="payCod" checked>
                  <label class="form-check-label w-100 fw-bold" for="payCod">
                    <div class="d-flex justify-content-between align-items-center">
                      <span>Cash on Delivery (COD)</span>
                      <span class="badge bg-dark">Recommended</span>
                    </div>
                    <div class="small text-muted fw-normal mt-1">Pay with cash upon inspecting parcel from courier at your doorstep.</div>
                  </label>
                </div>

                <div class="form-check p-3 border rounded-1">
                  <input class="form-check-input" type="radio" name="paymentMethod" id="payBank">
                  <label class="form-check-label w-100 fw-bold" for="payBank">
                    <div class="d-flex justify-content-between align-items-center">
                      <span>Direct Bank Transfer (Meezan / HBL / Alfalah)</span>
                      <i class="bi bi-bank fs-5 text-muted"></i>
                    </div>
                    <div class="small text-muted fw-normal mt-1">Transfer directly to our corporate bank account. Share screenshot on WhatsApp.</div>
                  </label>
                </div>

                <div class="form-check p-3 border rounded-1">
                  <input class="form-check-input" type="radio" name="paymentMethod" id="payCard">
                  <label class="form-check-label w-100 fw-bold" for="payCard">
                    <div class="d-flex justify-content-between align-items-center">
                      <span>Credit / Debit Card (Visa / Mastercard) &bull; Demo UI</span>
                      <div class="d-flex gap-1 text-muted">
                        <i class="bi bi-credit-card-2-front fs-5"></i>
                      </div>
                    </div>
                    <div class="small text-muted fw-normal mt-1">Simulated card payment for demonstration. No actual charge will occur.</div>
                  </label>
                </div>
              </div>
            </div>

          </div>

          <!-- Right: Order Breakdown -->
          <div class="col-lg-5">
            <div class="order-summary-box sticky-top" style="top: 100px;">
              <h5 class="fw-bold text-uppercase fs-6 mb-3">Order Summary (2 Pairs)</h5>

              <!-- Item 1 -->
              <div class="d-flex align-items-center gap-3 mb-3 pb-3 border-bottom">
                <img src="${products[0].image}" alt="${products[0].name}" class="rounded-1" style="width: 60px; height: 60px; object-fit: cover;">
                <div class="flex-grow-1">
                  <h6 class="mb-0 fw-bold small">${products[0].name}</h6>
                  <div class="text-muted" style="font-size: 0.76rem;">Size: EU 42 &bull; Nero Black &bull; Qty: 1</div>
                </div>
                <div class="fw-bold small">PKR ${products[0].price.toLocaleString()}</div>
              </div>

              <!-- Item 2 -->
              <div class="d-flex align-items-center gap-3 mb-3 pb-3 border-bottom">
                <img src="${products[1].image}" alt="${products[1].name}" class="rounded-1" style="width: 60px; height: 60px; object-fit: cover;">
                <div class="flex-grow-1">
                  <h6 class="mb-0 fw-bold small">${products[1].name}</h6>
                  <div class="text-muted" style="font-size: 0.76rem;">Size: EU 43 &bull; Sienna Tan &bull; Qty: 1</div>
                </div>
                <div class="fw-bold small">PKR ${products[1].price.toLocaleString()}</div>
              </div>

              <!-- Calculation lines -->
              <div class="d-flex justify-content-between mb-2 small">
                <span class="text-muted">Subtotal</span>
                <span>PKR 27,498</span>
              </div>
              <div class="d-flex justify-content-between mb-2 small">
                <span class="text-muted">Nationwide Express Delivery</span>
                <span class="text-success fw-bold">FREE</span>
              </div>

              <hr class="my-3">

              <div class="d-flex justify-content-between align-items-baseline mb-4">
                <span class="fw-bold text-dark">Total Amount Due</span>
                <span class="fs-4 fw-bold text-dark">PKR 27,498</span>
              </div>

              <button type="submit" class="btn btn-nova-dark w-100 py-3 text-center mb-3">
                <i class="bi bi-shield-check me-2"></i> Complete Order
              </button>

              <div class="text-center small text-muted">
                By placing this order, you agree to NOVA FORM's 15-day exchange policy and authentic footwear guarantee.
              </div>
            </div>
          </div>

        </div>
      </form>

    </div>
  </main>

  <!-- Simulated Order Confirmed Modal -->
  <div class="modal fade" id="orderConfirmedModal" tabindex="-1" aria-hidden="true" data-bs-backdrop="static">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content border-0 shadow-lg text-center p-4">
        <div class="modal-body">
          <div class="rounded-circle bg-success bg-opacity-10 text-success d-inline-flex align-items-center justify-content-center mb-3" style="width: 72px; height: 72px;">
            <i class="bi bi-check-lg display-5"></i>
          </div>
          <h3 class="fw-bold font-editorial mb-2">Order Confirmed!</h3>
          <p class="text-muted small mb-3">
            Thank you, <strong>Hamza Tariq</strong>. Your demo order has been received and queued for dispatch.
          </p>
          <div class="p-3 bg-light rounded-1 border mb-4 text-start small">
            <div class="d-flex justify-content-between mb-1">
              <span class="text-muted">Order Reference:</span>
              <strong class="text-dark">#NF-88291</strong>
            </div>
            <div class="d-flex justify-content-between mb-1">
              <span class="text-muted">Payment Type:</span>
              <span>Cash on Delivery</span>
            </div>
            <div class="d-flex justify-content-between mb-1">
              <span class="text-muted">Delivery City:</span>
              <span>Lahore, DHA Phase 5</span>
            </div>
            <div class="d-flex justify-content-between">
              <span class="text-muted">Payable Amount:</span>
              <strong class="text-dark">PKR 27,498</strong>
            </div>
          </div>
          <div class="d-flex gap-2 justify-content-center">
            <a href="order-details.html" class="btn btn-nova-dark btn-sm">View Order Status</a>
            <a href="shop.html" class="btn btn-nova-outline btn-sm">Return to Shop</a>
          </div>
        </div>
      </div>
    </div>
  </div>

  ${getFrontendFooter()}

</body>
</html>`;
}

/* ==========================================================================
   7. Authentication Pages: login.html, register.html, forgot-password.html
   ========================================================================== */
function generateLogin() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sign In | NOVA FORM Customer Portal</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
  <link rel="stylesheet" href="assets/css/style.css">
  <link rel="stylesheet" href="assets/css/responsive.css">
</head>
<body class="bg-light">

  ${getFrontendNav()}

  <main class="py-5">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6 col-lg-5">
          <div class="bg-white p-4 p-md-5 border rounded-1 shadow-sm">
            <div class="text-center mb-4">
              <span class="badge bg-light text-dark border px-3 py-1 mb-2 text-uppercase small">Client Portal</span>
              <h2 class="h3 fw-bold font-editorial">Sign In To NOVA FORM</h2>
              <p class="text-muted small">Access your saved footwear sizes, orders, and wishlist.</p>
            </div>

            <form class="demo-notify-form">
              <div class="demo-alert alert alert-success d-none small">Demo sign in verified! Welcome back, Hamza.</div>

              <div class="mb-3">
                <label class="form-label-nova">Email Address</label>
                <input type="email" class="form-control form-control-nova" value="hamza.tariq@gmail.com" required>
              </div>

              <div class="mb-3">
                <div class="d-flex justify-content-between">
                  <label class="form-label-nova">Password</label>
                  <a href="forgot-password.html" class="small text-muted text-decoration-underline">Forgot?</a>
                </div>
                <input type="password" class="form-control form-control-nova" value="secret123" required>
              </div>

              <div class="form-check mb-4">
                <input class="form-check-input" type="checkbox" id="rememberMe" checked>
                <label class="form-check-label small text-muted" for="rememberMe">Remember my device</label>
              </div>

              <button type="submit" class="btn btn-nova-dark w-100 py-2 mb-3">Sign In</button>
              
              <div class="text-center small text-muted mb-3">
                Don't have an account yet? <a href="register.html" class="text-dark fw-bold">Create Account</a>
              </div>

              <div class="border-top pt-3 text-center">
                <a href="account.html" class="btn btn-sm btn-outline-secondary w-100">
                  <i class="bi bi-person-circle me-1"></i> Quick Demo: Open My Account Page
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </main>

  ${getFrontendFooter()}

</body>
</html>`;
}

function generateRegister() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Create An Account | NOVA FORM</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
  <link rel="stylesheet" href="assets/css/style.css">
  <link rel="stylesheet" href="assets/css/responsive.css">
</head>
<body class="bg-light">

  ${getFrontendNav()}

  <main class="py-5">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-7 col-lg-6">
          <div class="bg-white p-4 p-md-5 border rounded-1 shadow-sm">
            <div class="text-center mb-4">
              <span class="badge bg-light text-dark border px-3 py-1 mb-2 text-uppercase small">New Client</span>
              <h2 class="h3 fw-bold font-editorial">Register For An Account</h2>
              <p class="text-muted small">Enjoy personalized shoe fitting consultations, order tracking, and private sale access.</p>
            </div>

            <form class="demo-notify-form">
              <div class="demo-alert alert alert-success d-none small">Account registered! You can now browse your dashboard.</div>

              <div class="row g-3 mb-3">
                <div class="col-md-6">
                  <label class="form-label-nova">First Name *</label>
                  <input type="text" class="form-control form-control-nova" placeholder="e.g. Daniyal" required>
                </div>
                <div class="col-md-6">
                  <label class="form-label-nova">Last Name *</label>
                  <input type="text" class="form-control form-control-nova" placeholder="e.g. Sheikh" required>
                </div>
              </div>

              <div class="mb-3">
                <label class="form-label-nova">Email Address *</label>
                <input type="email" class="form-control form-control-nova" placeholder="daniyal.sheikh@example.com" required>
              </div>

              <div class="mb-3">
                <label class="form-label-nova">Mobile Phone *</label>
                <input type="tel" class="form-control form-control-nova" placeholder="+92 300 0000000" required>
              </div>

              <div class="mb-3">
                <label class="form-label-nova">Create Password *</label>
                <input type="password" class="form-control form-control-nova" required>
              </div>

              <div class="form-check mb-4">
                <input class="form-check-input" type="checkbox" id="termsCheck" required checked>
                <label class="form-check-label small text-muted" for="termsCheck">
                  I agree to the <a href="about.html" class="text-dark">Terms of Service</a> & <a href="about.html" class="text-dark">Privacy Policy</a>
                </label>
              </div>

              <button type="submit" class="btn btn-nova-dark w-100 py-2 mb-3">Register Account</button>

              <div class="text-center small text-muted">
                Already registered? <a href="login.html" class="text-dark fw-bold">Sign In here</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </main>

  ${getFrontendFooter()}

</body>
</html>`;
}

function generateForgotPassword() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Password | NOVA FORM</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
  <link rel="stylesheet" href="assets/css/style.css">
  <link rel="stylesheet" href="assets/css/responsive.css">
</head>
<body class="bg-light">

  ${getFrontendNav()}

  <main class="py-5">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6 col-lg-5">
          <div class="bg-white p-4 p-md-5 border rounded-1 shadow-sm text-center">
            <i class="bi bi-key display-5 text-muted mb-3 d-inline-block"></i>
            <h2 class="h3 fw-bold font-editorial mb-2">Password Recovery</h2>
            <p class="text-muted small mb-4">Enter your registered email address to receive password reset instructions.</p>

            <form class="demo-notify-form text-start">
              <div class="demo-alert alert alert-success d-none small">
                Demo recovery link sent! Check your inbox for the simulation reset email.
              </div>

              <div class="mb-3">
                <label class="form-label-nova">Email Address</label>
                <input type="email" class="form-control form-control-nova" placeholder="name@domain.com" required>
              </div>

              <button type="submit" class="btn btn-nova-dark w-100 py-2 mb-3">Send Reset Link</button>

              <div class="text-center small text-muted">
                Remembered your password? <a href="login.html" class="text-dark fw-bold">Back to Sign In</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </main>

  ${getFrontendFooter()}

</body>
</html>`;
}

/* ==========================================================================
   8. Customer Account Pages: account.html, orders.html, order-details.html, wishlist.html
   ========================================================================== */
function generateAccount() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Account | NOVA FORM</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
  <link rel="stylesheet" href="assets/css/style.css">
  <link rel="stylesheet" href="assets/css/responsive.css">
</head>
<body>

  ${getFrontendNav()}

  <main class="py-5">
    <div class="container">
      
      <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center border-bottom pb-4 mb-4">
        <div>
          <span class="text-muted text-uppercase small fw-bold">Patron Portal</span>
          <h1 class="h2 fw-bold font-editorial mb-0">Welcome, Hamza Tariq</h1>
        </div>
        <div class="mt-3 mt-md-0">
          <a href="login.html" class="btn btn-sm btn-outline-danger"><i class="bi bi-box-arrow-right me-1"></i> Sign Out</a>
        </div>
      </div>

      <div class="row g-4">
        <!-- Sidebar Navigation -->
        <div class="col-lg-3">
          <div class="list-group list-group-flush border rounded-1 shadow-sm">
            <a href="account.html" class="list-group-item list-group-item-action active bg-dark text-white border-0 fw-semibold"><i class="bi bi-person me-2"></i> Account Overview</a>
            <a href="orders.html" class="list-group-item list-group-item-action"><i class="bi bi-bag-check me-2"></i> My Orders (4)</a>
            <a href="wishlist.html" class="list-group-item list-group-item-action"><i class="bi bi-heart me-2"></i> Saved Wishlist (3)</a>
            <a href="size-guide.html" class="list-group-item list-group-item-action"><i class="bi bi-rulers me-2"></i> Shoe Size Profile (EU 42)</a>
            <a href="contact.html" class="list-group-item list-group-item-action"><i class="bi bi-chat-dots me-2"></i> Customer Concierge</a>
          </div>
        </div>

        <!-- Account Main Details -->
        <div class="col-lg-9">
          
          <div class="row g-4 mb-4">
            <div class="col-md-4">
              <div class="bg-light p-3 border rounded-1">
                <div class="text-muted small text-uppercase">Total Footwear Orders</div>
                <div class="h3 fw-bold mb-0">4 Orders</div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="bg-light p-3 border rounded-1">
                <div class="text-muted small text-uppercase">Lifetime Spend</div>
                <div class="h3 fw-bold mb-0">PKR 58,996</div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="bg-light p-3 border rounded-1">
                <div class="text-muted small text-uppercase">Membership Tier</div>
                <div class="h3 fw-bold mb-0 text-warning">Gold Patron</div>
              </div>
            </div>
          </div>

          <!-- Personal Information Card -->
          <div class="bg-white p-4 border rounded-1 shadow-sm mb-4">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h5 class="fs-6 fw-bold text-uppercase mb-0">Personal Profile</h5>
              <button class="btn btn-sm btn-link text-dark" onclick="alert('Demo profile edit dialog');">Edit Profile</button>
            </div>
            <div class="row g-3 small">
              <div class="col-md-6">
                <span class="text-muted d-block">Full Name:</span>
                <strong>Hamza Tariq</strong>
              </div>
              <div class="col-md-6">
                <span class="text-muted d-block">Email Address:</span>
                <strong>hamza.tariq@gmail.com</strong>
              </div>
              <div class="col-md-6">
                <span class="text-muted d-block">Phone:</span>
                <strong>+92 300 8472911</strong>
              </div>
              <div class="col-md-6">
                <span class="text-muted d-block">Preferred Footwear Size:</span>
                <strong>EU 42 (Standard F Width)</strong>
              </div>
            </div>
          </div>

          <!-- Saved Address Card -->
          <div class="bg-white p-4 border rounded-1 shadow-sm mb-4">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h5 class="fs-6 fw-bold text-uppercase mb-0">Default Delivery Address</h5>
              <span class="badge bg-dark">Default</span>
            </div>
            <p class="small text-muted mb-0">
              House 42, Street 8, Sector J, Phase 5, DHA<br>
              Lahore, Punjab, 54000, Pakistan<br>
              Mobile: +92 300 8472911
            </p>
          </div>

          <!-- Recent Order Snippet -->
          <div class="bg-white p-4 border rounded-1 shadow-sm">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h5 class="fs-6 fw-bold text-uppercase mb-0">Most Recent Order</h5>
              <a href="orders.html" class="small text-dark fw-bold">View All &rarr;</a>
            </div>
            <div class="table-responsive">
              <table class="table table-sm align-middle mb-0 small">
                <thead>
                  <tr class="text-muted text-uppercase">
                    <th>Order #</th>
                    <th>Date</th>
                    <th>Product</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>#NF-88291</strong></td>
                    <td>28 Oct 2026</td>
                    <td>Regal Wholecut Oxford (EU 42)</td>
                    <td>PKR 14,999</td>
                    <td><span class="badge bg-warning text-dark">Processing</span></td>
                    <td><a href="order-details.html" class="btn btn-sm btn-outline-dark py-0">Details</a></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>

    </div>
  </main>

  ${getFrontendFooter()}

</body>
</html>`;
}

function generateOrders() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Orders | NOVA FORM</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
  <link rel="stylesheet" href="assets/css/style.css">
  <link rel="stylesheet" href="assets/css/responsive.css">
</head>
<body>

  ${getFrontendNav()}

  <main class="py-5">
    <div class="container">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb breadcrumb-nova">
          <li class="breadcrumb-item"><a href="index.html">Home</a></li>
          <li class="breadcrumb-item"><a href="account.html">Account</a></li>
          <li class="breadcrumb-item active" aria-current="page">My Orders</li>
        </ol>
      </nav>

      <div class="border-bottom pb-3 mb-4">
        <h1 class="h3 fw-bold font-editorial mb-1">Order History</h1>
        <p class="text-muted small mb-0">Review past and ongoing footwear dispatches with delivery statuses.</p>
      </div>

      <div class="bg-white border rounded-1 shadow-sm overflow-hidden">
        <div class="table-responsive">
          <table class="table cart-table mb-0">
            <thead>
              <tr>
                <th>Order Number</th>
                <th>Placement Date</th>
                <th>Items Ordered</th>
                <th>Payment Method</th>
                <th>Total Paid</th>
                <th>Dispatch Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td data-label="Order"><strong class="text-dark">#NF-88291</strong></td>
                <td data-label="Date" class="text-muted small">28 Oct 2026</td>
                <td data-label="Items">Regal Wholecut Oxford &bull; Nero Black (EU 42)</td>
                <td data-label="Payment"><span class="badge bg-light text-dark border">Cash on Delivery</span></td>
                <td data-label="Total" class="fw-bold">PKR 14,999</td>
                <td data-label="Status"><span class="badge bg-warning text-dark"><i class="bi bi-hourglass-split me-1"></i> Processing</span></td>
                <td data-label="Action"><a href="order-details.html" class="btn btn-sm btn-nova-dark">View Details</a></td>
              </tr>
              <tr>
                <td data-label="Order"><strong class="text-dark">#NF-88102</strong></td>
                <td data-label="Date" class="text-muted small">14 Jul 2026</td>
                <td data-label="Items">Sienna Burnished Penny Loafer (EU 42)</td>
                <td data-label="Payment"><span class="badge bg-light text-dark border">Bank Transfer</span></td>
                <td data-label="Total" class="fw-bold">PKR 12,499</td>
                <td data-label="Status"><span class="badge bg-success"><i class="bi bi-check-circle me-1"></i> Delivered</span></td>
                <td data-label="Action"><a href="order-details.html" class="btn btn-sm btn-nova-dark">View Details</a></td>
              </tr>
              <tr>
                <td data-label="Order"><strong class="text-dark">#NF-87944</strong></td>
                <td data-label="Date" class="text-muted small">02 Apr 2026</td>
                <td data-label="Items">Khyber Heritage Peshawari Chappal (EU 42)</td>
                <td data-label="Payment"><span class="badge bg-light text-dark border">Cash on Delivery</span></td>
                <td data-label="Total" class="fw-bold">PKR 6,899</td>
                <td data-label="Status"><span class="badge bg-success"><i class="bi bi-check-circle me-1"></i> Delivered</span></td>
                <td data-label="Action"><a href="order-details.html" class="btn btn-sm btn-nova-dark">View Details</a></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </main>

  ${getFrontendFooter()}

</body>
</html>`;
}

function generateOrderDetails() {
  const o = sampleOrders[0];

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Details #${o.id} | NOVA FORM</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
  <link rel="stylesheet" href="assets/css/style.css">
  <link rel="stylesheet" href="assets/css/responsive.css">
</head>
<body>

  ${getFrontendNav()}

  <main class="py-5">
    <div class="container">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb breadcrumb-nova">
          <li class="breadcrumb-item"><a href="index.html">Home</a></li>
          <li class="breadcrumb-item"><a href="account.html">Account</a></li>
          <li class="breadcrumb-item"><a href="orders.html">Orders</a></li>
          <li class="breadcrumb-item active" aria-current="page">${o.id}</li>
        </ol>
      </nav>

      <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center border-bottom pb-3 mb-4">
        <div>
          <span class="badge bg-warning text-dark mb-1 text-uppercase">${o.status}</span>
          <h1 class="h3 fw-bold font-editorial mb-0">Order Reference #${o.id}</h1>
          <div class="text-muted small">Placed on ${o.date} &bull; Payment: ${o.payment}</div>
        </div>
        <div class="mt-3 mt-md-0">
          <button class="btn btn-sm btn-outline-dark" onclick="window.print();"><i class="bi bi-printer me-1"></i> Print Invoice</button>
        </div>
      </div>

      <!-- Status Timeline -->
      <div class="bg-white p-4 border rounded-1 shadow-sm mb-4">
        <h5 class="fs-6 fw-bold text-uppercase mb-4">Dispatch Progress Timeline</h5>
        <div class="row text-center g-3">
          <div class="col-md-3">
            <div class="text-success fs-3"><i class="bi bi-check-circle-fill"></i></div>
            <h6 class="fw-bold mb-0 small">Order Placed</h6>
            <span class="text-muted small" style="font-size: 0.75rem;">28 Oct, 10:15 AM</span>
          </div>
          <div class="col-md-3">
            <div class="text-success fs-3"><i class="bi bi-check-circle-fill"></i></div>
            <h6 class="fw-bold mb-0 small">Confirmed at Workshop</h6>
            <span class="text-muted small" style="font-size: 0.75rem;">28 Oct, 11:30 AM</span>
          </div>
          <div class="col-md-3">
            <div class="text-warning fs-3"><i class="bi bi-box-seam"></i></div>
            <h6 class="fw-bold mb-0 small">Handcrafted Packaging</h6>
            <span class="text-muted small" style="font-size: 0.75rem;">In Progress</span>
          </div>
          <div class="col-md-3">
            <div class="text-muted fs-3"><i class="bi bi-truck"></i></div>
            <h6 class="text-muted fw-bold mb-0 small">Dispatched via TCS</h6>
            <span class="text-muted small" style="font-size: 0.75rem;">Expected Tomorrow</span>
          </div>
        </div>
      </div>

      <div class="row g-4">
        <!-- Order Items -->
        <div class="col-lg-8">
          <div class="bg-white p-4 border rounded-1 shadow-sm mb-4">
            <h5 class="fs-6 fw-bold text-uppercase mb-3">Purchased Footwear</h5>
            <div class="d-flex align-items-center gap-3 py-2 border-bottom">
              <img src="${o.product.image}" alt="${o.product.name}" class="rounded-1" style="width: 72px; height: 72px; object-fit: cover;">
              <div class="flex-grow-1">
                <h6 class="fw-bold mb-1"><a href="product-details.html" class="text-dark">${o.product.name}</a></h6>
                <div class="text-muted small">Size: EU ${o.size} &bull; Color: ${o.color} &bull; SKU: ${o.product.sku}</div>
              </div>
              <div class="text-end">
                <div class="fw-bold">PKR ${o.product.price.toLocaleString()}</div>
                <div class="text-muted small">Qty: 1</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Address and Breakdown -->
        <div class="col-lg-4">
          <div class="bg-white p-4 border rounded-1 shadow-sm mb-4">
            <h5 class="fs-6 fw-bold text-uppercase mb-3">Delivery Information</h5>
            <p class="small text-muted mb-0">
              <strong>${o.customer}</strong><br>
              ${o.city}<br>
              Phone: ${o.phone}<br>
              Email: ${o.email}
            </p>
          </div>

          <div class="order-summary-box">
            <h5 class="fs-6 fw-bold text-uppercase mb-3">Cost Breakdown</h5>
            <div class="d-flex justify-content-between mb-2 small">
              <span class="text-muted">Item Subtotal</span>
              <span>PKR ${o.total.toLocaleString()}</span>
            </div>
            <div class="d-flex justify-content-between mb-2 small">
              <span class="text-muted">Courier Shipping</span>
              <span class="text-success fw-bold">FREE</span>
            </div>
            <hr class="my-2">
            <div class="d-flex justify-content-between fw-bold">
              <span>Total Payable</span>
              <span>PKR ${o.total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  </main>

  ${getFrontendFooter()}

</body>
</html>`;
}

function generateWishlist() {
  const wishItems = products.slice(1, 4);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Saved Wishlist | NOVA FORM</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
  <link rel="stylesheet" href="assets/css/style.css">
  <link rel="stylesheet" href="assets/css/responsive.css">
</head>
<body>

  ${getFrontendNav()}

  <main class="py-5">
    <div class="container">
      <div class="border-bottom pb-3 mb-4">
        <h1 class="h3 fw-bold font-editorial mb-1">Your Saved Footwear Wishlist</h1>
        <p class="text-muted small mb-0">Shoes and loafers curated for your personal shoe collection.</p>
      </div>

      <div class="row g-3 g-md-4">
        ${wishItems.map(p => `
          <div class="col-lg-4 col-md-6">
            <div class="product-card">
              <div class="product-img-wrap">
                <a href="product-details.html">
                  <img src="${p.image}" alt="${p.name}">
                </a>
              </div>
              <div class="product-info">
                <div class="product-category">${p.category}</div>
                <h3 class="product-name"><a href="product-details.html">${p.name}</a></h3>
                <div class="product-price-box mb-3">
                  <span class="current-price">PKR ${p.price.toLocaleString()}</span>
                </div>
                <div class="d-flex gap-2">
                  <button class="btn btn-nova-dark btn-sm flex-grow-1 btn-quick-add" data-product-title="${p.name}">
                    <i class="bi bi-bag-plus me-1"></i> Add To Bag
                  </button>
                  <button class="btn btn-outline-danger btn-sm" onclick="this.closest('.col-lg-4').remove(); alert('Removed from wishlist');">
                    <i class="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  </main>

  ${getFrontendFooter()}

</body>
</html>`;
}

/* ==========================================================================
   9. Informational Pages: about.html, contact.html, size-guide.html
   ========================================================================== */
function generateAbout() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>About NOVA FORM | Heritage Men's Shoemaking</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
  <link rel="stylesheet" href="assets/css/style.css">
  <link rel="stylesheet" href="assets/css/responsive.css">
</head>
<body>

  ${getFrontendNav('about')}

  <main>
    <!-- About Hero -->
    <div class="py-5 bg-dark text-white text-center position-relative" style="background: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=1600&auto=format&fit=crop') center/cover;">
      <div class="container py-5">
        <span class="badge bg-warning text-dark text-uppercase fw-bold px-3 py-1 mb-2">Artisan Philosophy</span>
        <h1 class="display-4 fw-bold font-editorial text-white mb-3">The Anatomy of Distinction</h1>
        <p class="lead text-white-50 mx-auto" style="max-width: 680px;">
          NOVA FORM was established to redefine luxury men's footwear in Pakistan. We merge traditional European shoemaking methods with our nation's historic leather tanning mastery.
        </p>
      </div>
    </div>

    <!-- The Workshop Story -->
    <section class="section-padding bg-white">
      <div class="container">
        <div class="row align-items-center g-5">
          <div class="col-lg-6">
            <span class="section-subtitle">Heritage & Origin</span>
            <h2 class="display-6 fw-bold font-editorial mb-3">Rooted in Craft, Built For Tomorrow</h2>
            <p class="text-muted" style="line-height: 1.8;">
              Every gentleman's journey begins from the ground up. In a world saturated with ephemeral fast-fashion footwear and glued synthetic soles, NOVA FORM stands as a sanctuary of slow, deliberate craftsmanship.
            </p>
            <p class="text-muted" style="line-height: 1.8;">
              Our shoes are crafted using only top 2% grade full-grain crust calfskin from tanneries in Sialkot, Kasur, and northern Italy. Each pair undergoes over 180 discrete artisanal hand processes: from rigorous hand-clicking and closing to hand-insetting cork fillers that mold to the arch of your foot over time.
            </p>
          </div>
          <div class="col-lg-6">
            <img src="https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=900&auto=format&fit=crop" class="img-fluid rounded-1 shadow-sm" alt="Shoemaking Workshop">
          </div>
        </div>
      </div>
    </section>

    <!-- 3 Pillars of NOVA FORM -->
    <section class="section-padding" style="background-color: var(--bg-surface);">
      <div class="container">
        <div class="section-header text-center mx-auto" style="max-width: 600px;">
          <span class="section-subtitle">Our Commitments</span>
          <h2 class="section-title">The Three Pillars</h2>
        </div>

        <div class="row g-4">
          <div class="col-lg-4">
            <div class="bg-white p-4 border rounded-1 h-100">
              <i class="bi bi-gem text-warning fs-1 mb-3 d-inline-block"></i>
              <h4 class="font-editorial mb-2">Goodyear Welt Integrity</h4>
              <p class="text-muted small mb-0">
                Unlike glued footwear that ends up in landfills after a single season, our welted shoes can be resoled indefinitely, ensuring a pair that lasts decades.
              </p>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="bg-white p-4 border rounded-1 h-100">
              <i class="bi bi-fingerprint text-warning fs-1 mb-3 d-inline-block"></i>
              <h4 class="font-editorial mb-2">Pakistani Cultural Heritage</h4>
              <p class="text-muted small mb-0">
                Through our Heritage line, we preserve centuries of Frontier artisanship in Peshawari and Balochi footwear with modern orthotic comfort layers.
              </p>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="bg-white p-4 border rounded-1 h-100">
              <i class="bi bi-shield-check text-warning fs-1 mb-3 d-inline-block"></i>
              <h4 class="font-editorial mb-2">Unfiltered Transparency</h4>
              <p class="text-muted small mb-0">
                Transparent Pakistani pricing in PKR without intermediary markups. What you invest in is pure leather, master labor, and enduring quality.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>

  ${getFrontendFooter()}

</body>
</html>`;
}

function generateContact() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contact & Ateliers | NOVA FORM Pakistan</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
  <link rel="stylesheet" href="assets/css/style.css">
  <link rel="stylesheet" href="assets/css/responsive.css">
</head>
<body>

  ${getFrontendNav()}

  <main class="py-5">
    <div class="container">
      
      <div class="border-bottom pb-3 mb-4">
        <h1 class="h2 fw-bold font-editorial mb-1">Client Concierge & Ateliers</h1>
        <p class="text-muted small mb-0">Reach our bespoke shoe fitting advisors or visit an atelier in Lahore, Karachi, or Islamabad.</p>
      </div>

      <div class="row g-5">
        <!-- Contact Form -->
        <div class="col-lg-6">
          <div class="bg-white p-4 p-md-5 border rounded-1 shadow-sm">
            <h3 class="fs-5 fw-bold font-editorial mb-3">Send a Message</h3>
            <p class="text-muted small mb-4">Have an inquiry regarding custom sizing, wedding orders, or bulk corporate gifting?</p>

            <form id="demoContactForm">
              <div class="mb-3">
                <label class="form-label-nova">Your Full Name *</label>
                <input type="text" class="form-control form-control-nova" placeholder="e.g. Asad Mehmood" required>
              </div>

              <div class="row g-3 mb-3">
                <div class="col-md-6">
                  <label class="form-label-nova">Email Address *</label>
                  <input type="email" class="form-control form-control-nova" placeholder="name@domain.com" required>
                </div>
                <div class="col-md-6">
                  <label class="form-label-nova">Phone Number</label>
                  <input type="tel" class="form-control form-control-nova" placeholder="+92 300 0000000">
                </div>
              </div>

              <div class="mb-3">
                <label class="form-label-nova">Subject</label>
                <select class="form-select form-select-nova">
                  <option selected>Shoe Size & Fitting Consultation</option>
                  <option>Exchange / Return Request</option>
                  <option>Groomsmen Wedding Collection Inquiry</option>
                  <option>Corporate Orders & Gifting</option>
                  <option>Other Question</option>
                </select>
              </div>

              <div class="mb-4">
                <label class="form-label-nova">Message *</label>
                <textarea class="form-control form-control-nova" rows="4" placeholder="How can our shoemakers assist you?" required></textarea>
              </div>

              <button type="submit" class="btn btn-nova-dark w-100 py-3">Transmit Message</button>
            </form>
          </div>
        </div>

        <!-- Ateliers Details -->
        <div class="col-lg-6">
          <div class="d-flex flex-column gap-4">
            
            <div class="p-4 bg-white border rounded-1 shadow-sm">
              <div class="d-flex align-items-center gap-2 mb-2 text-warning fs-5">
                <i class="bi bi-geo-alt"></i>
                <h5 class="text-dark fw-bold mb-0 fs-6">Lahore Flagship Atelier</h5>
              </div>
              <p class="text-muted small mb-2">92-B/II, MM Alam Road, Gulberg III, Lahore, Pakistan</p>
              <p class="text-muted small mb-0"><i class="bi bi-telephone me-1"></i> +92 (042) 3578-9921 &bull; Hours: 11:00 AM - 10:00 PM</p>
            </div>

            <div class="p-4 bg-white border rounded-1 shadow-sm">
              <div class="d-flex align-items-center gap-2 mb-2 text-warning fs-5">
                <i class="bi bi-geo-alt"></i>
                <h5 class="text-dark fw-bold mb-0 fs-6">Karachi Bukhari Atelier</h5>
              </div>
              <p class="text-muted small mb-2">Lane 4, Bukhari Commercial, DHA Phase VI, Karachi, Pakistan</p>
              <p class="text-muted small mb-0"><i class="bi bi-telephone me-1"></i> +92 (021) 3584-1102 &bull; Hours: 12:00 PM - 11:00 PM</p>
            </div>

            <div class="p-4 bg-white border rounded-1 shadow-sm">
              <div class="d-flex align-items-center gap-2 mb-2 text-warning fs-5">
                <i class="bi bi-geo-alt"></i>
                <h5 class="text-dark fw-bold mb-0 fs-6">Islamabad Blue Area Atelier</h5>
              </div>
              <p class="text-muted small mb-2">Shop 14, Beverly Centre, Jinnah Avenue, Blue Area, Islamabad</p>
              <p class="text-muted small mb-0"><i class="bi bi-telephone me-1"></i> +92 (051) 2871-449 &bull; Hours: 11:00 AM - 09:30 PM</p>
            </div>

            <div class="p-4 bg-light border rounded-1">
              <h6 class="fw-bold text-uppercase small mb-2"><i class="bi bi-headset me-2 text-warning"></i> National Customer Concierge</h6>
              <p class="text-muted small mb-1">WhatsApp Helpline: <strong>+92 300 8472911</strong></p>
              <p class="text-muted small mb-0">Email: <strong>concierge@novaformshoes.pk</strong></p>
            </div>

          </div>
        </div>

      </div>

    </div>
  </main>

  ${getFrontendFooter()}

</body>
</html>`;
}

function generateSizeGuide() {
  const chart = [
    { eu: 39, uk: 6, us: 6.5, cm: 24.5, inch: 9.6 },
    { eu: 40, uk: 6.5, us: 7.5, cm: 25.0, inch: 9.8 },
    { eu: 41, uk: 7.5, us: 8.5, cm: 26.0, inch: 10.2 },
    { eu: 42, uk: 8.5, us: 9.5, cm: 27.0, inch: 10.6 },
    { eu: 43, uk: 9.5, us: 10.5, cm: 28.0, inch: 11.0 },
    { eu: 44, uk: 10.5, us: 11.5, cm: 28.5, inch: 11.2 },
    { eu: 45, uk: 11.5, us: 12.5, cm: 29.5, inch: 11.6 },
    { eu: 46, uk: 12.5, us: 13.5, cm: 30.5, inch: 12.0 }
  ];

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Shoe Size Guide (EU 39 - 46) | NOVA FORM</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
  <link rel="stylesheet" href="assets/css/style.css">
  <link rel="stylesheet" href="assets/css/responsive.css">
</head>
<body>

  ${getFrontendNav()}

  <main class="py-5">
    <div class="container">
      
      <div class="border-bottom pb-3 mb-4">
        <h1 class="h2 fw-bold font-editorial mb-1">Men's Footwear Size & Fitting Guide</h1>
        <p class="text-muted small mb-0">Follow our precise measuring instructions to find your ideal fit in EU sizes 39 through 46.</p>
      </div>

      <div class="row g-5">
        
        <!-- Table Column -->
        <div class="col-lg-7">
          <div class="bg-white p-4 border rounded-1 shadow-sm mb-4">
            <h5 class="fs-6 fw-bold text-uppercase mb-3">EU 39–46 Standard Conversion Chart</h5>
            <div class="table-responsive">
              <table class="table table-bordered text-center align-middle small mb-0">
                <thead class="table-dark">
                  <tr>
                    <th>EU Size</th>
                    <th>UK Equivalent</th>
                    <th>US Equivalent</th>
                    <th>Foot Length (CM)</th>
                    <th>Foot Length (Inches)</th>
                  </tr>
                </thead>
                <tbody>
                  ${chart.map(r => `
                    <tr class="${r.eu === 42 ? 'table-warning fw-bold' : ''}">
                      <td><strong>EU ${r.eu}</strong></td>
                      <td>UK ${r.uk}</td>
                      <td>US ${r.us}</td>
                      <td>${r.cm} cm</td>
                      <td>${r.inch}"</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
            <small class="text-muted d-block mt-3 fst-italic">
              * Note: Foot measurements are indicative. Because handcrafted lasts vary slightly by shoe silhouette (e.g. chisel-toe Oxfords vs wide-strap Peshawari Chappals), we offer a complimentary 15-day exchange if your chosen size requires adjustment.
            </small>
          </div>
        </div>

        <!-- How to Measure Instructions -->
        <div class="col-lg-5">
          <div class="bg-light p-4 border rounded-1 shadow-sm h-100">
            <h5 class="fs-6 fw-bold text-uppercase mb-3"><i class="bi bi-rulers me-2 text-warning"></i> How To Measure Your Foot</h5>
            
            <ol class="small text-muted ps-3 mb-4 d-flex flex-column gap-3" style="line-height: 1.7;">
              <li>
                <strong>Step onto Paper:</strong> Place a blank sheet of A4 paper on a hard, flat floor against a flat wall.
              </li>
              <li>
                <strong>Stand with Socks:</strong> Wear the typical socks you plan to wear with your dress shoes or loafers. Place your heel firmly touching the wall.
              </li>
              <li>
                <strong>Mark the Longest Point:</strong> Use a pen held vertically to mark the tip of your longest toe (usually the big toe or second toe).
              </li>
              <li>
                <strong>Measure with Ruler:</strong> Measure the distance from the edge of the paper to your mark in centimeters (cm).
              </li>
              <li>
                <strong>Match to Chart:</strong> Compare your measurement to our chart above. If you are between two sizes, choose the larger size for maximum comfort.
              </li>
            </ol>

            <div class="p-3 bg-white border rounded-1">
              <h6 class="fw-bold small mb-1">Wide Feet Advice</h6>
              <p class="text-muted small mb-0">
                Gentlemen with wider feet or higher insteps frequently prefer our <em>Plain Toe Derbies</em> or <em>Monk Straps</em> which allow variable buckle and lacing expansion.
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  </main>

  ${getFrontendFooter()}

</body>
</html>`;
}

/* ==========================================================================
   Execute Front-Site Generation
   ========================================================================== */
savePage('index.html', generateHome());
savePage('shop.html', generateShop());
savePage('category.html', generateCategory());
savePage('product-details.html', generateProductDetails());
savePage('cart.html', generateCart());
savePage('checkout.html', generateCheckout());
savePage('login.html', generateLogin());
savePage('register.html', generateRegister());
savePage('forgot-password.html', generateForgotPassword());
savePage('account.html', generateAccount());
savePage('orders.html', generateOrders());
savePage('order-details.html', generateOrderDetails());
savePage('wishlist.html', generateWishlist());
savePage('about.html', generateAbout());
savePage('contact.html', generateContact());
savePage('size-guide.html', generateSizeGuide());

// Front-site README
const frontReadme = `# NOVA FORM - Front-Site E-Commerce Website

## Overview
A luxury men's footwear storefront prototype tailored for the Pakistani market, showcasing 24 authentic handcrafted footwear models (Oxfords, Penny Loafers, Chelsea Boots, Peshawari Chappals, Sneakers, and Sandals).

## Technology Stack
- **HTML5:** Semantic, accessible markup.
- **CSS3:** Custom styles (\`assets/css/style.css\`, \`assets/css/responsive.css\`).
- **Bootstrap 5.3.3:** Responsive grid, navbar, offcanvas, dropdowns, and modals.
- **Bootstrap Icons 1.11.3:** Vector icons.
- **Google Fonts:** Plus Jakarta Sans & Playfair Display.
- **Minimal Vanilla JavaScript:** (\`assets/js/main.js\`) for cart counter, thumbnail switcher, quantity toggles, live cart calculations, coupon codes (\`NOVA10\`), and demo modals.

## Pages
1. \`index.html\` - Homepage with hero, categories, best sellers, promo banner, new arrivals, brand benefits, reviews, and newsletter.
2. \`shop.html\` - Complete product catalog with search, category filtering, price filter, sorting, and pagination.
3. \`category.html\` - Curated category listing for Formal Shoes & Loafers.
4. \`product-details.html\` - Product details with interactive image gallery, size pills (EU 39-46), colors, tabs, and related items.
5. \`cart.html\` - Shopping bag with dynamic subtotal, coupon discount, and free shipping calculation.
6. \`checkout.html\` - Checkout with Pakistani addresses, Cash on Delivery, Bank Transfer, and demo order confirmation modal.
7. \`login.html\` - Client login.
8. \`register.html\` - Client registration.
9. \`forgot-password.html\` - Password reset demo.
10. \`account.html\` - Customer account dashboard.
11. \`orders.html\` - Order history table.
12. \`order-details.html\` - Detailed order status timeline and items.
13. \`wishlist.html\` - Saved footwear models.
14. \`about.html\` - Brand heritage and Goodyear-welted philosophy.
15. \`contact.html\` - Contact form and store ateliers in Lahore, Karachi, and Islamabad.
16. \`size-guide.html\` - EU 39-46 size conversion table with centimeters and measurement instructions.
`;

fs.writeFileSync(path.join(outDir, 'README.md'), frontReadme.trim(), 'utf8');
console.log('Created front-site/README.md');
