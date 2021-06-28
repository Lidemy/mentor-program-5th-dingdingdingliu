<?php
require_once('conn.php');

function getUserData($username)
{
  global $conn;
  $sql = 'SELECT * FROM ding_w11_hw2_users WHERE username = ?';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('s', $username);
  $result = $stmt->execute();
  $result = $stmt->get_result();
  $row = $result->fetch_assoc();
  return $row;
}

function getArticleData($id)
{
  global $conn;
  $sql = 'SELECT * FROM ding_w11_hw2_articles WHERE id = ?';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('i', $id);
  $result = $stmt->execute();
  $result = $stmt->get_result();
  $row = $result->fetch_assoc();
  return $row;
}


function escape($str)
{
  return htmlspecialchars($str, ENT_QUOTES);
}
