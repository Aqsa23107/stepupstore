-- ==============================================================================
-- NOVA FORM - Luxury Footwear & Admin Dashboard
-- Comprehensive MySQL / MariaDB Database Schema
-- Compatible with: MySQL 8.0+ / MariaDB 10.4+ (Laragon / XAMPP / Production)
-- Character Set: utf8mb4 | Collation: utf8mb4_unicode_ci
-- ==============================================================================

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ------------------------------------------------------------------------------
-- 1. Administrative Users & Staff
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `admins`;
CREATE TABLE `admins` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(120) NOT NULL,
  `email` VARCHAR(191) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `role` ENUM('Admin', 'Manager') NOT NULL DEFAULT 'Manager',
  `phone` VARCHAR(30) NULL,
  `avatar_url` VARCHAR(255) NULL,
  `status` ENUM('Active', 'Inactive', 'Suspended') NOT NULL DEFAULT 'Active',
  `last_login_at` DATETIME NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 2. Customer Directory & Authentication
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `customers`;
CREATE TABLE `customers` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(150) NOT NULL,
  `email` VARCHAR(191) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NULL, -- Nullable for guest checkout accounts
  `phone` VARCHAR(30) NOT NULL,
  `city` VARCHAR(80) NOT NULL,
  `status` ENUM('Active', 'Inactive', 'Blocked') NOT NULL DEFAULT 'Active',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 3. Customer Delivery Addresses (Multiple saved addresses per customer)
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `customer_addresses`;
CREATE TABLE `customer_addresses` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `customer_id` BIGINT UNSIGNED NOT NULL,
  `recipient_name` VARCHAR(150) NOT NULL,
  `recipient_phone` VARCHAR(30) NOT NULL,
  `address` TEXT NOT NULL,
  `city` VARCHAR(80) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 4. Brands & Atelier Collections
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `brands`;
CREATE TABLE `brands` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(120) NOT NULL UNIQUE,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 5. Footwear Categories & Hierarchy
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 6. Master Product Catalog
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `sku` VARCHAR(60) NOT NULL UNIQUE,          -- e.g. NF-OXF-01
  `name` VARCHAR(200) NOT NULL,
  `slug` VARCHAR(220) NOT NULL UNIQUE,
  `brand_id` BIGINT UNSIGNED NULL,
  `category_id` BIGINT UNSIGNED NULL,
  `price_pkr` DECIMAL(10,2) NOT NULL,
  `original_price_pkr` DECIMAL(10,2) NULL,
  `cost_price_pkr` DECIMAL(10,2) NULL,
  `stock_quantity` INT NOT NULL DEFAULT 0,
  `low_stock_threshold` INT NOT NULL DEFAULT 5,
  `material` VARCHAR(255) NULL,
  `sole_type` VARCHAR(255) NULL,
  `occasion` VARCHAR(255) NULL,
  `short_description` VARCHAR(500) NULL,
  `description` TEXT NULL,
  `image_url` VARCHAR(255) NOT NULL,
  `is_sale` TINYINT(1) NOT NULL DEFAULT 0,
  `is_new` TINYINT(1) NOT NULL DEFAULT 0,
  `status` ENUM('Active', 'Draft', 'Archived', 'Out of Stock') NOT NULL DEFAULT 'Active',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`brand_id`) REFERENCES `brands` (`id`) ON DELETE SET NULL,
  FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 7. Product Color & Size Matrix Variants (EU 39 - 46)
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `product_variants`;
CREATE TABLE `product_variants` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `product_id` BIGINT UNSIGNED NOT NULL,
  `sku_variant` VARCHAR(80) NOT NULL UNIQUE,
  `size_eu` TINYINT UNSIGNED NOT NULL, -- 39, 40, 41, 42, 43, 44, 45, 46
  `color_name` VARCHAR(60) NOT NULL,  -- e.g. Nero Black, Sienna Tan
  `stock_quantity` INT NOT NULL DEFAULT 0,
  `status` ENUM('In Stock', 'Low Stock', 'Out of Stock') NOT NULL DEFAULT 'In Stock',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ------------------------------------------------------------------------------
-- 9. Inventory Stock Adjustments & Audit Logs
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `inventory_logs`;
CREATE TABLE `inventory_logs` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `product_id` BIGINT UNSIGNED NOT NULL,
  `variant_id` BIGINT UNSIGNED NULL,
  `change_type` ENUM('Restock', 'Order Placed', 'Order Cancelled', 'Damaged / Wastage', 'Manual Adjustment', 'Return Restock') NOT NULL,
  `quantity_change` INT NOT NULL, -- Positive for restock, negative for deduction
  `previous_stock` INT NOT NULL,
  `new_stock` INT NOT NULL,
  `reference_note` VARCHAR(255) NULL,
  `recorded_by_admin_id` BIGINT UNSIGNED NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  FOREIGN KEY (`variant_id`) REFERENCES `product_variants` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 11. Customer Orders
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `order_number` VARCHAR(50) NOT NULL UNIQUE, -- e.g. NF-88291
  `customer_id` BIGINT UNSIGNED NULL,
  `customer_name` VARCHAR(150) NOT NULL,
  `customer_email` VARCHAR(191) NOT NULL,
  `customer_phone` VARCHAR(30) NOT NULL,
  `shipping_city` VARCHAR(80) NOT NULL,
  `subtotal_pkr` DECIMAL(10,2) NOT NULL,
  `shipping_fee_pkr` DECIMAL(10,2) NOT NULL DEFAULT 450.00,
  `total_amount_pkr` DECIMAL(10,2) NOT NULL,
  `payment_method` ENUM('Cash on Delivery', 'Bank Transfer', 'Online Card Demo') NOT NULL DEFAULT 'Cash on Delivery',
  `payment_status` ENUM('Unpaid', 'Paid', 'Refunded', 'Failed') NOT NULL DEFAULT 'Unpaid',
  `order_status` ENUM('Pending Confirmation', 'Processing', 'Confirmed', 'Dispatched', 'Delivered', 'Cancelled', 'Returned') NOT NULL DEFAULT 'Pending Confirmation',
  `placed_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dispatched_at` DATETIME NULL,
  `delivered_at` DATETIME NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 12. Ordered Items Snapshot
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `order_items`;
CREATE TABLE `order_items` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `order_id` BIGINT UNSIGNED NOT NULL,
  `product_id` BIGINT UNSIGNED NULL,
  `variant_id` BIGINT UNSIGNED NULL,
  `product_name` VARCHAR(200) NOT NULL,
  `product_sku` VARCHAR(80) NOT NULL,
  `size_eu` TINYINT UNSIGNED NOT NULL,
  `color_name` VARCHAR(60) NOT NULL,
  `unit_price_pkr` DECIMAL(10,2) NOT NULL,
  `quantity` INT UNSIGNED NOT NULL DEFAULT 1,
  `subtotal_pkr` DECIMAL(10,2) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE SET NULL,
  FOREIGN KEY (`variant_id`) REFERENCES `product_variants` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ------------------------------------------------------------------------------
-- 16. Customer Reviews & Testimonials
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `reviews`;
CREATE TABLE `reviews` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `product_id` BIGINT UNSIGNED NOT NULL,
  `customer_id` BIGINT UNSIGNED NULL,
  `customer_name` VARCHAR(150) NOT NULL,
  `rating` TINYINT UNSIGNED NOT NULL CHECK (`rating` BETWEEN 1 AND 5),
  `review_text` TEXT NOT NULL,
  `status` ENUM('Pending', 'Approved', 'Hidden', 'Rejected') NOT NULL DEFAULT 'Approved',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ------------------------------------------------------------------------------
-- 18. Store Configuration & Logistics Settings
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `store_settings`;
CREATE TABLE `store_settings` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `setting_group` VARCHAR(50) NOT NULL DEFAULT 'general', -- general, logistics, policies, contact
  `setting_key` VARCHAR(100) NOT NULL UNIQUE,
  `setting_value` TEXT NULL,
  `description` VARCHAR(255) NULL,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ==============================================================================
-- INITIAL SEED DATA (Synchronized with NOVA FORM Prototype)
-- ==============================================================================

-- 1. Default Administrator
INSERT INTO `admins` (`id`, `name`, `email`, `password_hash`, `role`, `phone`, `avatar_url`, `status`) VALUES
(1, 'M. Asif', 'admin@novashoes.pk', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Store Director', '+92 300 8472911', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop', 'Active');

