<?php
require_once __DIR__ ."/../settings/session_start.php";
require_once __DIR__ ."/../settings/db.php";

$errors = [];
if ($_SERVER['REQUEST_METHOD']  == "POST") {

    $name               = trim($_POST['name'])  ?? '';
    $email              = trim($_POST['email']) ?? '';
    $password           = $_POST['password'];

    if (empty($email) || empty($password)) {
        $errors[] = "Email and Password are required";
    }


    if (filter_var($email, FILTER_VALIDATE_EMAIL) == false) {
        $errors[] = "Email address is incorrect";
    }

    if (!empty($errors)) {
        $_SESSION['errors'] = $errors;
        header("Location: /../register.php");
        exit;
    }



    $stmt = mysqli_prepare($conn, "SELECT * FROM admins WHERE email = ?");
    mysqli_stmt_bind_param($stmt, 's', $email);
    mysqli_stmt_execute($stmt);

    $result = mysqli_stmt_get_result($stmt);

    if (mysqli_num_rows($result) > 0) {
        $errors[] = "This email is already registered";
        $_SESSION['errors'] = $errors;
        header("Location:/../register.php");
        exit;
    }

    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    $stmt2 = mysqli_prepare($conn, "INSERT INTO admins (name, email, password_hash) VALUES(?, ?, ?) ");
    mysqli_stmt_bind_param($stmt2, 'sss', $name, $email, $hashed_password);
    mysqli_stmt_execute($stmt2);


    $_SESSION['success'] = "Account is successfully created";
    header("Location: /../login.php");
    exit;
}

?>