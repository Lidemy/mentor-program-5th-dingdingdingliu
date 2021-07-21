<?php
session_start();
require_once('conn.php');

if (
  empty($_POST['username']) ||
  empty($_POST['password'])
) {
  header('Location:register.php?errCode=1');
  die();
}

$username = $_POST['username'];
$password = password_hash($_POST['password'], PASSWORD_DEFAULT);

$sql = 'INSERT INTO ding_w11_hw2_users (username, password) value (?, ?)';
$stmt = $conn->prepare($sql);
$stmt->bind_param('ss', $username, $password);
$result = $stmt->execute();

if (!$result) {
  $code = $conn->errno;
  if ($code == 1062) {
    header('Location:register.php?errCode=2');
    die();
  } else {
    echo 'ERROR:' . $code;
  }
}

$_SESSION['username'] = $username;
header('Location:index.php');
die();
