<?php
session_start();
require_once('conn.php');
require_once('utils.php');
require_once("checkpermission.php");

$id = $_GET['id'];
if (!$id) {
  header("Location:index.php");
  die();
}
$username = $_SESSION['username'];
$userdata = getUserData($username);
$role = $userdata['role'];
$articleData = getArticleData($id);
$is_deleted = $articleData['is_deleted'];

if ($is_deleted == NULL) {
  $sql = "UPDATE articles SET is_deleted = 1 WHERE id = ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('i', $id);
} else if ($is_deleted == 1) {
  $sql = "UPDATE articles SET is_deleted = NULL WHERE id = ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('i', $id);
}

$result = $stmt->execute();

if (!$result) {
  die($conn->error);
}
header("Location:admin.php");
die();
