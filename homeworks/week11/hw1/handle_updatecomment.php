<?php
session_start();
require_once('conn.php');
require_once('utils.php');

if (
  empty($_POST['content'])
) {
  header("Location:updatecomment.php?errCode=1&id=" . $_POST['id']);
  die();
}

$username = $_SESSION['username'];
$id = $_POST['id'];
$content = $_POST['content'];
$userdata = getData($username);
$role = $userdata['role'];

if ($role === 'ADMIN') {
  $sql = "UPDATE ding_w11_hw1_comments SET content = ? WHERE id =?";
} else {
  $sql = "UPDATE ding_w11_hw1_comments SET content = ? WHERE id =? AND username =?";
}

$stmt = $conn->prepare($sql);
if ($role === 'ADMIN') {
  $stmt->bind_param('si', $content, $id);
} else {
  $stmt->bind_param('sis', $content, $id, $username);
}

$result = $stmt->execute();
if (!$result) {
  die($conn->error);
};


header("Location:index.php");
die();
