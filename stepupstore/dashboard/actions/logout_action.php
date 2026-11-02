<?php
require_once __DIR__ . "/../settings/session_start.php";
require_once __DIR__ . "/../settings/auth_check.php";


unset($_SESSION['user_id']);

session_destroy();

header("Location: /../login.php");
exit;