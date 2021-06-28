<?php
require_once('conn.php');
session_start();

if (
  empty($_POST['username']) ||
  empty($_POST['password']) ||
  empty($_POST['nickname'])
) {
  header("Location:register.php?errCode=1");
  die();
}


$username = $_POST['username'];
$password = password_hash($_POST['password'], PASSWORD_DEFAULT);
$nickname = $_POST['nickname'];

$sql = "INSERT INTO ding_w11_hw1_users (username, password, nickname) VALUE (? ,? ,? )";
$stmt = $conn->prepare($sql);
$stmt->bind_param('sss', $username, $password, $nickname);

$result = $stmt->execute();

if (!$result) {
  $code = $conn->errno;
  if ($code === 1062) {
    header("Location:register.php?errCode=2");
    die();
  } else {
    echo 'Code:' . $code;
  }
}

$_SESSION['username'] = $username;
header("Location:index.php");
die();
