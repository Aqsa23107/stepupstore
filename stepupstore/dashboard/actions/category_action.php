<?php
require_once __DIR__ . "/../settings/session_start.php";
require_once __DIR__ . "/../settings/auth_check.php";
require_once __DIR__ . "/../settings/db.php";

$errors = [];

// Handle DELETE
if (isset($_GET['action']) && $_GET['action'] === 'delete') {
    $id = intval($_GET['id'] ?? 0);

    if ($id <= 0) {
        $_SESSION['errors'] = ["Invalid category ID."];
        header("Location: ../categories.php");
        exit;
    }

    $res = mysqli_query($conn, "SELECT name FROM categories WHERE id = {$id} LIMIT 1");
    if ($res && mysqli_num_rows($res) > 0) {
        $cat = mysqli_fetch_assoc($res);
        $cat_name = $cat['name'];

        $delete_query = "DELETE FROM categories WHERE id = {$id}";
        if (mysqli_query($conn, $delete_query)) {
            $_SESSION['success'] = "Category '{$cat_name}' deleted successfully.";
        } else {
            $_SESSION['errors'] = ["Failed to delete category: " . mysqli_error($conn)];
        }
    } else {
        $_SESSION['errors'] = ["Category not found."];
    }

    header("Location: ../categories.php");
    exit;
}

// Handle POST (Add or Update)
if ($_SERVER['REQUEST_METHOD'] == "POST") {

    $action = $_POST['action'] ?? 'add';
    $name   = trim($_POST['name'] ?? '');

    // check if category name is empty
    if (empty($name)) {
        $errors[] = "Category name is required";
    }

    // sanitize category name
    $escaped_name = mysqli_real_escape_string($conn, $name);

    // 1. UPDATE EXISTING CATEGORY
    if ($action === 'update') {
        $id = intval($_POST['id'] ?? 0);

        if ($id <= 0) {
            $errors[] = "Invalid category ID for update";
        }

        if (!empty($errors)) {
            $_SESSION['errors'] = $errors;
            header("Location: ../categories.php");
            exit;
        }

        // check duplicate excluding current category id
        $check_query = "SELECT id FROM categories WHERE name = '{$escaped_name}' AND id != {$id} LIMIT 1";
        $result = mysqli_query($conn, $check_query);

        if (mysqli_num_rows($result) > 0) {
            $errors[] = "Category '{$name}' already exists";
            $_SESSION['errors'] = $errors;
            header("Location: ../categories.php");
            exit;
        }

        // update category
        $update_query = "UPDATE categories SET name = '{$escaped_name}' WHERE id = {$id}";
        if (mysqli_query($conn, $update_query)) {
            $_SESSION['success'] = "Category updated successfully";
        } else {
            $errors[] = "Failed to update category: " . mysqli_error($conn);
            $_SESSION['errors'] = $errors;
        }

        header("Location: ../categories.php");
        exit;
    }

    // 2. ADD NEW CATEGORY
    if (!empty($errors)) {
        $_SESSION['errors'] = $errors;
        header("Location: ../categories.php");
        exit;
    }

    // check category is already added or not (verify duplication)
    $check_query = "SELECT id FROM categories WHERE name = '{$escaped_name}' LIMIT 1";
    $result = mysqli_query($conn, $check_query);

    if (mysqli_num_rows($result) > 0) {
        $errors[] = "Category '{$name}' already exists";
        $_SESSION['errors'] = $errors;
        header("Location: ../categories.php");
        exit;
    }

    // insert category into database
    $insert_query = "INSERT INTO categories (name) VALUES ('{$escaped_name}')";
    if (mysqli_query($conn, $insert_query)) {
        $_SESSION['success'] = "Category '{$name}' added successfully";
    } else {
        $errors[] = "Failed to add category: " . mysqli_error($conn);
        $_SESSION['errors'] = $errors;
    }

    header("Location: ../categories.php");
    exit;

} else {
    header("Location: ../categories.php");
    exit;
}
