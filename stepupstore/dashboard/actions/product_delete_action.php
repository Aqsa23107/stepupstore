<?php
require_once __DIR__ . "/../settings/session_start.php";
require_once __DIR__ . "/../settings/auth_check.php";
require_once __DIR__ . "/../settings/db.php";

$id = intval($_GET['id'] ?? ($_POST['id'] ?? 0));

if ($id <= 0) {
    $_SESSION['errors'] = ["Invalid product ID."];
    header("Location: ../products.php");
    exit;
}

// Fetch product details
$res = mysqli_query($conn, "SELECT id, name, image_url FROM products WHERE id = {$id} LIMIT 1");

if ($res && mysqli_num_rows($res) > 0) {
    $product = mysqli_fetch_assoc($res);
    $product_name = $product['name'];

    // Delete product from database (cascade deletes variants & logs automatically via foreign keys)
    $delete_query = "DELETE FROM products WHERE id = {$id}";
    if (mysqli_query($conn, $delete_query)) {
        // Delete uploaded image if it exists in local uploads directory
        if (!empty($product['image_url']) && strpos($product['image_url'], 'uploads/') === 0) {
            $img_path = __DIR__ . "/../" . $product['image_url'];
            if (file_exists($img_path)) {
                @unlink($img_path);
            }
        }

        $_SESSION['success'] = "Product '{$product_name}' deleted successfully.";
    } else {
        $_SESSION['errors'] = ["Failed to delete product: " . mysqli_error($conn)];
    }
} else {
    $_SESSION['errors'] = ["Product not found or already deleted."];
}

header("Location: ../products.php");
exit;

