<?php
session_start();
require_once("conn.php");
require_once("utils.php");

$username = NULL;
$role = NULL;
if (!empty($_SESSION['username'])) {
  $username = $_SESSION['username'];
  $userdata = getUserData($username);
  $role = $userdata['role'];
}

$id = $_GET['id'];

$sql = 'SELECT * FROM ding_w11_hw2_articles WHERE id = ?';
$stmt = $conn->prepare($sql);
$stmt->bind_param('i', $id);
$result = $stmt->execute();
if (!$result) {
  die('ERROR:' . $conn->error);
}
$result = $stmt->get_result();
$row = $result->fetch_assoc();
?>



<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <title>BLOG</title>
  <link rel="stylesheet" href="style.css">
</head>

<body>
  <?php include_once('header.php'); ?>
  <section class="section__title">
    <div class="title">
      <h2>存放樂事之地</h2>
      <p>Welcome to my blog</p>
    </div>
  </section>
  <div class="contents">
    <div class="content__card">
      <div class="card__header">
        <div class="card__title"><?php echo escape($row['title']) ?>
        </div>
        <?php if ($role == 'ADMIN') { ?>
          <a href="updatearticle.php">編輯</a>
        <?php } ?>
      </div>
      <div class="card__time"><?php echo escape($row['created_at']) ?></div>
      <div class="card__article"><?php echo escape($row['content']) ?></div>
    </div>
  </div>
  <footer class="footer">
    Copyright © 2020 Who's Blog All Rights Reserved.
  </footer>
</body>

</html>