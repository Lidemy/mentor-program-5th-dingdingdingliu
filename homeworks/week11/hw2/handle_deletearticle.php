<?php
session_start();
require_once('conn.php');
require_once('utils.php');
require_once("checkpermission.php");


$id = $_GET['id'];
$username = $_SESSION['username'];
$userdata = getUserData($username);
$role = $userdata['role'];
$articleData = getArticleData($id);
$is_deleted = $articleData['is_deleted'];

if ($is_deleted === NULL) {
  $sql = "UPDATE ding_w11_hw2_articles SET is_deleted = 1 WHERE id = ? AND username = ?";
} else if ($is_deleted === 1) {
  $sql = "UPDATE ding_w11_hw2_articles SET is_deleted = NULL WHERE id = ? AND username = ?";
}

$stmt = $conn->prepare($sql);

if ($is_deleted === NULL) {
  $stmt->bind_param('is', $id, $username);
} else if ($is_deleted === 1) {
  $stmt->bind_param('is', $id, $username);
}
$result = $stmt->execute();

if (!$result) {
  die($conn->error);
}
header("Location:admin.php");
die();
