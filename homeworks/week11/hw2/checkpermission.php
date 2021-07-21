<?php
session_start();
require_once("utils.php");


if (empty($_SESSION['username'])) {
  header("Location:index.php");
  die();
}

$username = NULL;
$role = NULL;
if (!empty($_SESSION['username'])) {
  $username = $_SESSION['username'];
  $userdata = getUserData($username);
  $role = $userdata['role'];
};

if ($role !== 'ADMIN') {
  header("Location:index.php");
  die();
};
