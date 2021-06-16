<?php
require_once('conn.php');

function getNicknameFromData($username)
{
  global $conn;
  $sql = sprintf(
    "Select nickname from ding_w9_userdatas where username = '%s'",
    $username
  );
  $result = $conn->query($sql);
  $row = $result->fetch_assoc();
  return $row;
}
