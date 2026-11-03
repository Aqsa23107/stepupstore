<?php

$host = "localhost";
$user = "root";
$pwd  = "";
$db   = "stepupstore_db";

$conn = mysqli_connect($host, $user, $pwd, $db);
if (!$conn) {
    die("Database connection failed: " . mysqli_connect_error());
}