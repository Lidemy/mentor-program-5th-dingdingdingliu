<?php
session_start();
require_once('conn.php');
require_once('utils.php');

if (!empty($_SESSION['username'])) {
  $username = $_SESSION['username'];
  $userdata = getData($username);
  $role = $userdata['role'];
}

if (empty($_POST['content'])) {
  header("Location:index.php?errCode=1");
  die();
} else if ($role === "SUSPENSION") {
  header("Location:index.php");
  die();
}

$username = $_SESSION['username'];
$userdata = getData($username);
$nickname = $userdata['nickname'];
$content = $_POST['content'];

$sql = "INSERT INTO ding_w11_hw1_comments (username, content) VALUE (?,?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param('ss', $username, $content);

$result = $stmt->execute();
if (!$result) {
  die("Error:" . $conn->error);
}

header("Location:index.php");
die();
