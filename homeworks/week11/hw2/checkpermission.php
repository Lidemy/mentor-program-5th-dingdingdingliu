<?php
session_start();

if (empty($_SESSION['username'])) {
  header("Location:index.php");
  die();
}
