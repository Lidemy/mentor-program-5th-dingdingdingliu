<?php
session_start();
require_once('conn.php');
require_once('utils.php');

if (empty($_GET)) {
  header("Location:index.php");
  die();
}

if (!empty($_SESSION['username'])) {
  $username = $_SESSION['username'];
  $userdata = getData($username);
  $role = $userdata['role'];
};

if ($role !== 'ADMIN') {
  header("Location:index.php");
  die();
};

$username = $_GET['username'];
$role = $_GET['role'];

$sql = "UPDATE ding_w11_hw1_users SET role = ? WHERE username =?";
$stmt = $conn->prepare($sql);
$stmt->bind_param('ss', $role, $username);
$result = $stmt->execute();
if (!$result) {
  die($conn->error);
};


header("Location:admin.php");
die();
