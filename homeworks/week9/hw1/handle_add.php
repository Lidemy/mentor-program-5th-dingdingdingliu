<?php
session_start();
require_once('conn.php');
require_once('utils.php');

if (empty($_POST['content'])) {
  header("Location:index.php?errCode=1");
  die();
}

$username = $_SESSION['username'];
$userdata = getNicknameFromData($username);
$nickname = $userdata['nickname'];
$content = $_POST['content'];

$sql = sprintf(
  "INSERT INTO ding_w9_comments (nickname, content) VALUE ('%s','%s')",
  $nickname,
  $content
);

$result = $conn->query($sql);
if (!$result) {
  die("Error:" . $conn->error);
}

header("Location:index.php");
