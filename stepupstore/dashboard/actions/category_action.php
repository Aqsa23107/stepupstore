<?php
require_once __DIR__ . "/../settings/session_start.php";
require_once __DIR__ . "/../settings/auth_check.php";
require_once __DIR__ . "/../settings/db.php";

$errors = [];

if ($_SERVER['REQUEST_METHOD'] == "POST") {

    $name = trim($_POST['name'] ?? '');

    // check if category name is empty
    if (empty($name)) {
        $errors[] = "Category name is required";
    }

    // if errors return back to categories page
    if (!empty($errors)) {
        $_SESSION['errors'] = $errors;
        header("Location: ../categories.php");
        exit;
    }

    // sanitize category name
    $escaped_name = mysqli_real_escape_string($conn, $name);

    // check category is already added or not (verify duplication)
    $check_query = "SELECT * FROM categories WHERE name = '{$escaped_name}'";
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