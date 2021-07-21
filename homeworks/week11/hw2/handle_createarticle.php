<?php
session_start();
require_once('conn.php');
require_once('utils.php');


$title = $_POST['title'];
$content = $_POST['content'];
$username = $_SESSION['username'];

if (
  empty($_POST['title']) ||
  empty($_POST['content'])
) {
  header("Location:createarticle.php?errCode=1");
  die();
}

$sql = 'INSERT INTO ding_w11_hw2_articles(title, content, username) VALUES( ?, ?, ?)';
$stmt = $conn->prepare($sql);
$stmt->bind_param('sss', $title, $content, $username);
$result = $stmt->execute();

if (!$result) {
  die($conn->error);
}

header("Location:admin.php");
die();
