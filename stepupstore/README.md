# NOVA FORM - Luxury Men's Footwear & Admin Dashboard

A comprehensive, responsive men's footwear e-commerce website with a dedicated administration dashboard tailored for the Pakistani market. Inspired by modern editorial footwear brands with an original aesthetic identity.

---

## 1. Technologies Used
- **Core Markup:** Semantic HTML5
- **Styling:** Custom CSS3 (`front-site/assets/css/style.css`, `dashboard/assets/css/dashboard.css`) & CSS Variables
- **Grid & Framework:** Bootstrap 5.3.3 (loaded via CDN)
- **Icons:** Bootstrap Icons 1.11.3
- **Typography:** Google Fonts (`Plus Jakarta Sans` & `Playfair Display`)
- **Interactions:** Minimal vanilla JavaScript for essential UI actions (image gallery switcher, cart counter & line calculations, size/color selectors, offcanvas menus, modals)
- **No Heavy Frameworks:** Pure static files without React, Vue, Angular, Tailwind, Webpack, Node runtime dependencies, databases, or payment gateways.

---

## 2. Project Architecture & Structure

```text
stepupstore/
├── front-site/
│   ├── index.html               # Luxury homepage (Hero, Categories, Best Sellers, Promo, New Arrivals, Reviews)
│   ├── shop.html                # Product catalog with search, filters (size, price, category), sorting & pagination
│   ├── category.html            # Category showcase (Formal Shoes & Loafers)
│   ├── product-details.html     # Product detail with thumbnail gallery, EU 39-46 sizes, specs tabs, related items
│   ├── cart.html                # Shopping bag with quantity adjustments, free shipping calculation, and item removal
│   ├── checkout.html            # 2-column checkout with Pakistani address fields, COD & bank transfer, confirmation modal
│   ├── login.html               # Customer sign in
│   ├── register.html            # Customer registration
│   ├── forgot-password.html     # Password recovery demo
│   ├── account.html             # Customer profile & recent order overview
│   ├── orders.html              # Customer order history table
│   ├── order-details.html       # Order status timeline, items, and delivery address
│   ├── wishlist.html            # Saved footwear items with quick add to bag
│   ├── about.html               # Brand story, Goodyear-welted craftsmanship, Pakistani leather heritage
│   ├── contact.html             # Contact form & store ateliers in Lahore, Karachi, and Islamabad
│   ├── size-guide.html          # EU 39–46 size chart with centimeters and foot measuring guide
│   ├── assets/
│   │   ├── css/
│   │   │   ├── style.css        # Frontend master styles & design tokens
│   │   │   └── responsive.css   # Mobile and tablet breakpoints
│   │   └── js/
│   │       └── main.js          # Cart count, gallery switcher, variant selector, calculations
│   └── README.md
│
├── dashboard/
│   ├── index.html               # Executive overview with KPI cards, CSS velocity chart, recent orders, low stock
│   ├── login.html               # Admin portal login
│   ├── register.html            # Staff registration
│   ├── forgot-password.html     # Password recovery
│   ├── products.html            # 24-product catalog with search, category filters, and delete modal
│   ├── product-add.html         # Add footwear model with EU 39-46 variant matrix, image preview, pricing
│   ├── product-edit.html        # Prepopulated product editing form
│   ├── categories.html          # Category hierarchy table & Add Category modal
│   ├── brands.html              # Atelier labels (Black Label, Artisan, Heritage, Urban)
│   ├── inventory.html           # Real-time stock levels with Low Stock badges & stock adjustment modal
│   ├── orders.html              # Nationwide order list with status and payment filters
│   ├── order-details.html       # Order management, tracking updates, and staff notes
│   ├── customers.html           # Client directory with lifetime spend in PKR
│   ├── customer-details.html    # Customer profile and purchase history
│   ├── reviews.html             # Customer review moderation (Approve, Hide, Delete)
│   ├── banners.html             # Store campaign banner manager
│   ├── website-content.html     # Homepage hero, promo, and footer CMS text editor
│   ├── settings.html            # Delivery fees (PKR 250), free delivery threshold (PKR 10,000), policies
│   ├── profile.html             # Admin profile and credentials form
│   ├── assets/
│   │   ├── css/
│   │   │   ├── dashboard.css    # Admin master styles & dark slate sidebar
│   │   │   └── responsive.css   # Responsive collapse and mobile offcanvas
│   │   └── js/
│   │       └── dashboard.js     # Sidebar toggle, image upload preview, delete/stock modals
│   └── README.md
│
└── README.md
```

---

## 3. How to Run Locally

### Option A: VS Code Live Server (Recommended)
1. Open the project folder in **Visual Studio Code**.
2. Right-click on `front-site/index.html` and choose **"Open with Live Server"**.
3. To view the admin console, open `dashboard/index.html` with Live Server.

### Option B: Local Web Server (Laragon / XAMPP / Python)
- Access via your browser at `http://localhost/stepupstore/front-site/` or `http://localhost/stepupstore/dashboard/`.
- Alternatively, run Python's built-in server from the root directory:
  ```bash
  python -m http.server 8000
  ```
  Then visit `http://localhost:8000/front-site/`.

---

## 4. Pakistani Footwear Details & Currency
- **Currency:** All prices are formatted in **PKR** (Pakistani Rupee), e.g., PKR 4,499 to PKR 16,999.
- **Delivery:** Nationwide complimentary delivery on orders above PKR 10,000 (otherwise PKR 250).
- **Payment:** Cash on Delivery (COD), Direct Bank Transfer (Meezan / HBL / Alfalah), and demo card payment.
- **Shoe Sizes:** Standard European sizing **EU 39 through 46** with centimeter length conversions in `size-guide.html`.
- **Traditional Footwear:** Authentic Pakistani styles included (Khyber Peshawari Chappal, Kaptaan Chappal, and Balochi sandals).
