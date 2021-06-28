<?php
require_once('conn.php');

function getData($username)
{
  global $conn;
  $sql = "SELECT * FROM ding_w11_hw1_users WHERE username = ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('s', $username);
  $result = $stmt->execute();
  $result = $stmt->get_result();
  $row = $result->fetch_assoc();
  return $row;
}

function escape($str)
{
  return htmlspecialchars($str, ENT_QUOTES);
}

function isADMIN($userdata)
{
  return $userdata['role'] === "ADMIN";
}
