<?php
require_once __DIR__ . "/../settings/session_start.php";
require_once __DIR__ . "/../settings/auth_check.php";
require_once __DIR__ . "/../settings/db.php";

$errors = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $product_id = intval($_POST['product_id'] ?? 0);
    $variants   = $_POST['variants'] ?? [];

    if ($product_id <= 0) {
        $errors[] = "Please select a valid product to adjust stock.";
    }

    // Verify product exists
    $prod_res = mysqli_query($conn, "SELECT id, name, sku, stock_quantity, low_stock_threshold FROM products WHERE id = {$product_id} LIMIT 1");
    if (!$prod_res || mysqli_num_rows($prod_res) === 0) {
        $errors[] = "Product not found.";
    } else {
        $product = mysqli_fetch_assoc($prod_res);
    }

    if (!empty($errors)) {
        $_SESSION['errors'] = $errors;
        header("Location: ../inventory.php");
        exit;
    }

    $threshold = intval($product['low_stock_threshold'] ?? 5);
    $allowed_change_types = ['Restock', 'Order Placed', 'Order Cancelled', 'Damaged / Wastage', 'Manual Adjustment', 'Return Restock'];

    // If variants were provided
    if (!empty($variants) && is_array($variants)) {
        $total_new_stock = 0;

        foreach ($variants as $vid => $item) {
            $variant_id     = intval($vid);
            $new_qty        = max(0, intval($item['stock'] ?? 0));
            $change_type    = trim($item['change_type'] ?? 'Manual Adjustment');
            $reference_note = trim($item['reference_note'] ?? '');

            if (!in_array($change_type, $allowed_change_types)) {
                $change_type = 'Manual Adjustment';
            }

            $total_new_stock += $new_qty;

            // Fetch current variant stock for logging
            $var_res = mysqli_query($conn, "SELECT id, stock_quantity FROM product_variants WHERE id = {$variant_id} AND product_id = {$product_id} LIMIT 1");
            if ($var_res && mysqli_num_rows($var_res) > 0) {
                $var_row    = mysqli_fetch_assoc($var_res);
                $prev_stock = intval($var_row['stock_quantity']);
                $diff       = $new_qty - $prev_stock;

                // Determine variant status based on stock
                $var_status = 'In Stock';
                if ($new_qty <= 0) {
                    $var_status = 'Out of Stock';
                } elseif ($new_qty <= $threshold) {
                    $var_status = 'Low Stock';
                }

                // Update variant
                mysqli_query($conn, "UPDATE product_variants 
                                     SET stock_quantity = {$new_qty}, status = '{$var_status}' 
                                     WHERE id = {$variant_id} AND product_id = {$product_id}");

                // Insert into inventory_logs if stock changed
                if ($diff !== 0) {
                    $escaped_note = mysqli_real_escape_string($conn, $reference_note);
                    $escaped_type = mysqli_real_escape_string($conn, $change_type);
                    $note_val     = !empty($reference_note) ? "'{$escaped_note}'" : "NULL";

                    mysqli_query($conn, "INSERT INTO inventory_logs 
                                         (product_id, variant_id, change_type, quantity_change, previous_stock, new_stock, reference_note) 
                                         VALUES ({$product_id}, {$variant_id}, '{$escaped_type}', {$diff}, {$prev_stock}, {$new_qty}, {$note_val})");
                }
            }
        }

        // Update product total stock & status
        $prod_status = ($total_new_stock <= 0) ? 'Out of Stock' : 'Active';
        mysqli_query($conn, "UPDATE products 
                             SET stock_quantity = {$total_new_stock}, status = '{$prod_status}' 
                             WHERE id = {$product_id}");
    } else {
        // Direct product stock update if no variants exist
        $new_stock      = max(0, intval($_POST['product_stock'] ?? 0));
        $change_type    = trim($_POST['change_type'] ?? 'Manual Adjustment');
        $reference_note = trim($_POST['reference_note'] ?? '');

        if (!in_array($change_type, $allowed_change_types)) {
            $change_type = 'Manual Adjustment';
        }

        $prev_stock  = intval($product['stock_quantity']);
        $diff        = $new_stock - $prev_stock;
        $prod_status = ($new_stock <= 0) ? 'Out of Stock' : 'Active';

        mysqli_query($conn, "UPDATE products 
                             SET stock_quantity = {$new_stock}, status = '{$prod_status}' 
                             WHERE id = {$product_id}");

        if ($diff !== 0) {
            $escaped_note = mysqli_real_escape_string($conn, $reference_note);
            $escaped_type = mysqli_real_escape_string($conn, $change_type);
            $note_val     = !empty($reference_note) ? "'{$escaped_note}'" : "NULL";

            mysqli_query($conn, "INSERT INTO inventory_logs 
                                 (product_id, variant_id, change_type, quantity_change, previous_stock, new_stock, reference_note) 
                                 VALUES ({$product_id}, NULL, '{$escaped_type}', {$diff}, {$prev_stock}, {$new_stock}, {$note_val})");
        }
    }

    $_SESSION['success'] = "Stock for '" . $product['name'] . "' updated successfully!";
    header("Location: ../inventory.php");
    exit;
} else {
    header("Location: ../inventory.php");
    exit;
}