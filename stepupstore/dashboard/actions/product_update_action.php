<?php
require_once __DIR__ . "/../settings/session_start.php";
require_once __DIR__ . "/../settings/auth_check.php";
require_once __DIR__ . "/../settings/db.php";

$errors = [];

if ($_SERVER['REQUEST_METHOD'] === "POST") {

    $id = intval($_POST['id'] ?? 0);
    if ($id <= 0) {
        $_SESSION['errors'] = ["Invalid product ID."];
        header("Location: ../products.php");
        exit;
    }

    // Verify product exists
    $check_exist = mysqli_query($conn, "SELECT * FROM products WHERE id = {$id} LIMIT 1");
    if (!$check_exist || mysqli_num_rows($check_exist) === 0) {
        $_SESSION['errors'] = ["Product does not exist."];
        header("Location: ../products.php");
        exit;
    }
    $current_product = mysqli_fetch_assoc($check_exist);

    $name               = trim($_POST['name'] ?? '');
    $sku                = trim($_POST['sku'] ?? '');
    $category_id        = !empty($_POST['category_id']) ? intval($_POST['category_id']) : "NULL";
    $brand_id           = !empty($_POST['brand_id']) ? intval($_POST['brand_id']) : "NULL";
    $price_pkr          = floatval($_POST['price_pkr'] ?? 0);
    $original_price_pkr = !empty($_POST['original_price_pkr']) ? floatval($_POST['original_price_pkr']) : "NULL";
    $cost_price_pkr     = !empty($_POST['cost_price_pkr']) ? floatval($_POST['cost_price_pkr']) : "NULL";

    $material           = mysqli_real_escape_string($conn, trim($_POST['material'] ?? ''));
    $sole_type          = mysqli_real_escape_string($conn, trim($_POST['sole_type'] ?? ''));
    $occasion           = mysqli_real_escape_string($conn, trim($_POST['occasion'] ?? ''));
    $short_description  = mysqli_real_escape_string($conn, trim($_POST['short_description'] ?? ''));
    $description        = mysqli_real_escape_string($conn, trim($_POST['description'] ?? ''));

    $status             = in_array($_POST['status'] ?? '', ['Active', 'Draft', 'Archived', 'Out of Stock']) ? $_POST['status'] : 'Active';
    $is_sale            = isset($_POST['is_sale']) ? 1 : 0;
    $is_new             = isset($_POST['is_new']) ? 1 : 0;

    // Validate required fields
    if (empty($name)) {
        $errors[] = "Product name is required.";
    }

    if (empty($sku)) {
        $errors[] = "Product SKU code is required.";
    }

    if ($price_pkr <= 0) {
        $errors[] = "Selling price (PKR) must be greater than 0.";
    }

    // Verify SKU code duplication (excluding current product)
    $escaped_sku = mysqli_real_escape_string($conn, $sku);
    $check_sku = mysqli_query($conn, "SELECT id FROM products WHERE sku = '{$escaped_sku}' AND id != {$id} LIMIT 1");
    if (mysqli_num_rows($check_sku) > 0) {
        $errors[] = "Product SKU '{$sku}' already exists for another product.";
    }

    // Handle optional replacement image upload
    $image_url = $current_product['image_url'];
    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        $file_tmp  = $_FILES['image']['tmp_name'];
        $file_name = $_FILES['image']['name'];
        $file_size = $_FILES['image']['size'];
        $ext       = strtolower(pathinfo($file_name, PATHINFO_EXTENSION));
        $allowed   = ['jpg', 'jpeg', 'png', 'webp'];

        if (!in_array($ext, $allowed)) {
            $errors[] = "Invalid image format. Allowed: JPG, JPEG, PNG, WEBP";
        } elseif ($file_size > 5 * 1024 * 1024) {
            $errors[] = "Image size must not exceed 5MB";
        } else {
            $upload_dir = __DIR__ . "/../uploads/";
            if (!is_dir($upload_dir)) {
                mkdir($upload_dir, 0755, true);
            }
            $new_filename = time() . '_' . uniqid() . '.' . $ext;
            $destination  = $upload_dir . $new_filename;

            if (move_uploaded_file($file_tmp, $destination)) {
                // Delete old image if it was in uploads/
                if (!empty($current_product['image_url']) && strpos($current_product['image_url'], 'uploads/') === 0) {
                    $old_path = __DIR__ . "/../" . $current_product['image_url'];
                    if (file_exists($old_path)) {
                        @unlink($old_path);
                    }
                }
                $image_url = "uploads/" . $new_filename;
            } else {
                $errors[] = "Failed to upload image to server";
            }
        }
    }

    if (!empty($errors)) {
        $_SESSION['errors'] = $errors;
        header("Location: ../product-edit.php?id={$id}");
        exit;
    }

    // Calculate total stock from variants
    $variants = $_POST['variants'] ?? [];
    $total_stock = 0;
    if (!empty($variants) && is_array($variants)) {
        foreach ($variants as $v) {
            $total_stock += max(0, intval($v['stock'] ?? 0));
        }
    }

    // Prepare values for SQL
    $escaped_name = mysqli_real_escape_string($conn, $name);
    $escaped_img  = mysqli_real_escape_string($conn, $image_url);

    $orig_price_val = ($original_price_pkr === "NULL") ? "NULL" : "'{$original_price_pkr}'";
    $cost_price_val = ($cost_price_pkr === "NULL") ? "NULL" : "'{$cost_price_pkr}'";
    $brand_id_val   = ($brand_id === "NULL") ? "NULL" : "'{$brand_id}'";
    $cat_id_val     = ($category_id === "NULL") ? "NULL" : "'{$category_id}'";

    // Update product
    $update_product = "UPDATE products SET
        sku = '{$escaped_sku}',
        name = '{$escaped_name}',
        brand_id = {$brand_id_val},
        category_id = {$cat_id_val},
        price_pkr = '{$price_pkr}',
        original_price_pkr = {$orig_price_val},
        cost_price_pkr = {$cost_price_val},
        stock_quantity = '{$total_stock}',
        material = '{$material}',
        sole_type = '{$sole_type}',
        occasion = '{$occasion}',
        short_description = '{$short_description}',
        description = '{$description}',
        image_url = '{$escaped_img}',
        is_sale = '{$is_sale}',
        is_new = '{$is_new}',
        status = '{$status}'
        WHERE id = {$id}";

    if (mysqli_query($conn, $update_product)) {

        // Update or insert variants
        if (!empty($variants) && is_array($variants)) {
            foreach ($variants as $v) {
                $var_id        = intval($v['id'] ?? 0);
                $size_eu       = intval($v['size'] ?? 0);
                $color_name    = !empty($v['color']) ? trim($v['color']) : 'Default';
                $variant_stock = max(0, intval($v['stock'] ?? 0));
                $var_sku       = !empty($v['sku_variant']) ? trim($v['sku_variant']) : ($sku . '-' . $size_eu);

                $escaped_var_sku = mysqli_real_escape_string($conn, $var_sku);
                $escaped_color   = mysqli_real_escape_string($conn, $color_name);

                $var_status = 'In Stock';
                if ($variant_stock <= 0) {
                    $var_status = 'Out of Stock';
                } elseif ($variant_stock <= 5) {
                    $var_status = 'Low Stock';
                }

                if ($var_id > 0) {
                    // Update existing variant record
                    $update_var = "UPDATE product_variants SET
                        sku_variant = '{$escaped_var_sku}',
                        color_name = '{$escaped_color}',
                        stock_quantity = '{$variant_stock}',
                        status = '{$var_status}'
                        WHERE id = {$var_id} AND product_id = {$id}";
                    mysqli_query($conn, $update_var);
                } elseif ($size_eu > 0) {
                    // Insert variant if not present
                    $insert_var = "INSERT INTO product_variants (
                        product_id, sku_variant, size_eu, color_name, stock_quantity, status
                    ) VALUES (
                        '{$id}', '{$escaped_var_sku}', '{$size_eu}', '{$escaped_color}', '{$variant_stock}', '{$var_status}'
                    )";
                    mysqli_query($conn, $insert_var);
                }
            }
        }

        $_SESSION['success'] = "Footwear model '{$name}' updated successfully!";
        header("Location: ../product-edit.php?id={$id}");
        exit;
    } else {
        $errors[] = "Failed to update product: " . mysqli_error($conn);
        $_SESSION['errors'] = $errors;
        header("Location: ../product-edit.php?id={$id}");
        exit;
    }
} else {
    header("Location: ../products.php");
    exit;
}

