<?php
require_once __DIR__ . "/../settings/session_start.php";
require_once __DIR__ . "/../settings/auth_check.php";
require_once __DIR__ . "/../settings/db.php";

$errors = [];

if ($_SERVER['REQUEST_METHOD'] == "POST") {

    $hero_headline  = trim($_POST['hero_headline'] ?? '');
    $hero_subtitle  = trim($_POST['hero_subtitle'] ?? '');
    $hero_lead      = trim($_POST['hero_lead'] ?? '');
    $promo_headline = trim($_POST['promo_headline'] ?? '');
    $promo_btn_text = trim($_POST['promo_btn_text'] ?? '');

    // Validation
    if (empty($hero_headline)) {
        $errors[] = "Homepage Main Headline is required";
    }

    if (strlen($hero_headline) > 255) {
        $errors[] = "Main Headline cannot exceed 255 characters";
    }

    if (strlen($hero_subtitle) > 255) {
        $errors[] = "Subtitle cannot exceed 255 characters";
    }

    if (strlen($promo_headline) > 255) {
        $errors[] = "Promotional Banner Headline cannot exceed 255 characters";
    }

    if (strlen($promo_btn_text) > 100) {
        $errors[] = "Call to Action Button text cannot exceed 100 characters";
    }

    // If validation fails, redirect back with errors
    if (!empty($errors)) {
        $_SESSION['errors'] = $errors;
        header("Location: ../website-content.php");
        exit;
    }

    // Sanitize values for MySQL
    $escaped_hero_headline  = mysqli_real_escape_string($conn, $hero_headline);
    $escaped_hero_subtitle  = mysqli_real_escape_string($conn, $hero_subtitle);
    $escaped_hero_lead      = mysqli_real_escape_string($conn, $hero_lead);
    $escaped_promo_headline = mysqli_real_escape_string($conn, $promo_headline);
    $escaped_promo_btn_text = mysqli_real_escape_string($conn, $promo_btn_text);

    // Check if the content record (id = 1) exists in website_content
    $check_query = "SELECT id FROM cms_settings WHERE id = 1 LIMIT 1";
    $result = mysqli_query($conn, $check_query);

    if ($result && mysqli_num_rows($result) > 0) {
        // Update existing record
        $update_query = "UPDATE cms_settings SET 
            hero_headline  = '{$escaped_hero_headline}',
            hero_subtitle  = '{$escaped_hero_subtitle}',
            hero_lead      = '{$escaped_hero_lead}',
            promo_headline = '{$escaped_promo_headline}',
            promo_btn_text = '{$escaped_promo_btn_text}'
            WHERE id = 1";

        if (mysqli_query($conn, $update_query)) {
            $_SESSION['success'] = "Website content updated successfully";
        } else {
            $_SESSION['errors'] = ["Failed to update content: " . mysqli_error($conn)];
        }
    } else {
        // Insert new record if it doesn't exist
        $insert_query = "INSERT INTO cms_settings (
            id, hero_headline, hero_subtitle, hero_lead, promo_headline, promo_btn_text
        ) VALUES (
            1, '{$escaped_hero_headline}', '{$escaped_hero_subtitle}', '{$escaped_hero_lead}', '{$escaped_promo_headline}', '{$escaped_promo_btn_text}'
        )";

        if (mysqli_query($conn, $insert_query)) {
            $_SESSION['success'] = "Website content saved successfully";
        } else {
            $_SESSION['errors'] = ["Failed to save content: " . mysqli_error($conn)];
        }
    }

    header("Location: ../website-content.php");
    exit;
} else {
    header("Location: ../website-content.php");
    exit;
}