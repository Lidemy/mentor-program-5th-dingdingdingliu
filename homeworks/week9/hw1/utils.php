<?php
require_once('conn.php');

function getNicknameFromData($username)
{
  global $conn;
  $sql = sprintf(
    "SELECT nickname FROM ding_w9_userdatas WHERE username = '%s'",
    $username
  );
  $result = $conn->query($sql);
  $row = $result->fetch_assoc();
  return $row;
}
