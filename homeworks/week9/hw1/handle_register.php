<?php
require_once('conn.php');

if (
  empty($_POST['username']) ||
  empty($_POST['password']) ||
  empty($_POST['nickname'])
) {
  header("Location:register.php?errCode=1");
  die();
}


$username = $_POST['username'];
$password = $_POST['password'];
$nickname = $_POST['nickname'];

$sql = sprintf(
  "insert into ding_w9_userdatas (username, password, nickname) value('%s', '%s','%s')",
  $username,
  $password,
  $nickname
);

$result = $conn->query($sql);

if (!$result) {
  $code = $conn->errno;
  if ($code === 1062) {
    header("Location:register.php?errCode=2");
    die();
  } else {
    echo 'Code:' . $code;
  }
}

header("Location:index.php");
