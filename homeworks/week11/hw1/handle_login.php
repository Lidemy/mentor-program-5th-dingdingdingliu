<?php
session_start();
require_once('conn.php');

if (
  empty($_POST['username']) ||
  empty($_POST['password'])
) {
  header("Location:login.php?errCode=1");
  die();
}

$username = $_POST['username'];
$password = $_POST['password'];

$sql = "SELECT * FROM ding_w11_hw1_users WHERE username = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param('s', $username);

$result = $stmt->execute();

if (!$result) {
  die($conn->error);
};

$result = $stmt->get_result();

// 沒有查到使用者
if ($result->num_rows === 0) {
  header("Location:login.php?errCode=2");
  die();
}

// 有查到使用者
$row = $result->fetch_assoc();
if (password_verify($password, $row['password'])) {
  // 登入成功
  $_SESSION['username'] = $username;
  header("Location:index.php");
  die();
} else {
  // 登入失敗
  header("Location:login.php?errCode=2");
  die();
}
