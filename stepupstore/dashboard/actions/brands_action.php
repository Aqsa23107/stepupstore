<?php
require_once __DIR__ . "/../settings/session_start.php";
require_once __DIR__ . "/../settings/auth_check.php";
require_once __DIR__ . "/../settings/db.php";

$errors = [];

if ($_SERVER['REQUEST_METHOD'] == "POST") {

    $name = trim($_POST['name'] ?? '');

    // check if brand name is empty
    if (empty($name)) {
        $errors[] = "Brand name is required";
    }

    // if errors return back to brands page
    if (!empty($errors)) {
        $_SESSION['errors'] = $errors;
        header("Location: ../brands.php");
        exit;
    }

    // sanitize brand name
    $escaped_name = mysqli_real_escape_string($conn, $name);

    // check brand is already added or not (verify duplication)
    $check_query = "SELECT * FROM brands WHERE name = '{$escaped_name}'";
    $result = mysqli_query($conn, $check_query);

    if (mysqli_num_rows($result) > 0) {
        $errors[] = "Brand '{$name}' already exists";
        $_SESSION['errors'] = $errors;
        header("Location: ../brands.php");
        exit;
    }

    // insert brand into database
    $insert_query = "INSERT INTO brands (name) VALUES ('{$escaped_name}')";
    if (mysqli_query($conn, $insert_query)) {
        $_SESSION['success'] = "Brand '{$name}' added successfully";
    } else {
        $errors[] = "Failed to add brand: " . mysqli_error($conn);
        $_SESSION['errors'] = $errors;
    }

    header("Location: ../brands.php");
    exit;
} else {
    header("Location: ../brands.php");
    exit;
}