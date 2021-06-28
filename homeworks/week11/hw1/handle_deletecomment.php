<?php
session_start();
require_once('conn.php');
require_once('utils.php');

if (
  empty($_GET['id'])
) {
  header("Location:index.php");
  die();
}


$id = $_GET['id'];
$username = $_SESSION['username'];
$userdata = getData($username);
$role = $userdata['role'];

if ($role === 'ADMIN') {
  $sql = "UPDATE ding_w11_hw1_comments SET is_deleted = 1 WHERE id =?";
} else {
  $sql = "UPDATE ding_w11_hw1_comments SET is_deleted = 1 WHERE id =? AND username =?";
}

$stmt = $conn->prepare($sql);

if ($role === 'ADMIN') {
  $stmt->bind_param('i', $id);
} else {
  $stmt->bind_param('is', $id, $username);
}

$result = $stmt->execute();
if (!$result) {
  die($conn->error);
};


header("Location:index.php");
die();
