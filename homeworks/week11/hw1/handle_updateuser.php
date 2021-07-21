<?php
session_start();
require_once('conn.php');

if (
  empty($_POST['nickname'])
) {
  header("Location:index.php?errCode=3");
  die();
}

$username = $_SESSION['username'];
$nickname = $_POST['nickname'];

$sql = "UPDATE ding_w11_hw1_users SET nickname = ? WHERE username = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param('ss', $nickname, $username);
$result = $stmt->execute();
if (!$result) {
  die($conn->error);
};


header("Location:index.php");
die();
