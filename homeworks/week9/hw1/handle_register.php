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
$password = $_POST['password'];
$nickname = $_POST['nickname'];

$sql = sprintf(
  "INSERT INTO ding_w9_userdatas (username, password, nickname) VALUE ('%s', '%s','%s')",
  $username,
  $password,
  $nickname
);

$result = $conn->query($sql);

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
