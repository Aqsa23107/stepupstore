<?php

if (!isset($_SESSION['user_id'])) {
    $errors[] = "You are not logged in";
    $_SESSION['errors'] = $errors;
    header("Location: login.php");
    exit();
}