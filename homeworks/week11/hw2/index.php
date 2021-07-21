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

$page = 1;
if (!empty($_GET['page'])) {
  $page = intval($_GET['page']);
}
$litems_per_page = 5;
$offset = ($page - 1) * $litems_per_page;

$sql =
  'SELECT * FROM ding_w11_hw2_articles WHERE is_deleted is NULL ' .
  'ORDER BY id DESC ' .
  'limit ? offset ?';
$stmt = $conn->prepare($sql);
$stmt->bind_param('ii', $litems_per_page, $offset);
$result = $stmt->execute();
if (!$result) {
  die('ERROR:' . $conn->error);
}
$result = $stmt->get_result();
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
    <?php while ($row = $result->fetch_assoc()) { ?>
      <div class="content__card">
        <div class="card__header">
          <div class="card__title"><?php echo escape($row['title']) ?>
          </div>
          <?php if ($role == 'ADMIN') { ?>
            <a href="updatearticle.php?id=<?php echo escape($row['id']) ?>">編輯</a>
          <?php } ?>
        </div>
        <div class="card__time"><?php echo escape($row['created_at']) ?></div>
        <div class="card__article"><?php echo mb_substr(escape($row['content']), 0, 150, "utf-8") . " ..." ?></div>
        <div class="card__readmore">
          <a href="readarticle.php?id=<?php echo escape($row['id']) ?>">READ MORE</a>
        </div>
      </div>
    <?php } ?>
  </div>
  <?php
  $sql = "SELECT count(id) AS count FROM ding_w11_hw2_articles WHERE is_deleted IS NULL";
  $stmt = $conn->prepare($sql);
  $result = $stmt->execute();
  if (!$result) {
    die('Error:' . $conn->error);
  }
  $result = $stmt->get_result();
  $row = $result->fetch_assoc();
  $count = $row['count'];
  $total_page = ceil($count / $litems_per_page);
  ?>
  <div class="paginator">
    <?php if ($page !== 1) { ?>
      <a href="index.php?page=1">首頁</a>
      <a href="index.php?page=<?php echo $page - 1 ?>">上一頁</a>
    <?php } ?>
    <?php if ($page !== intval($total_page)) { ?>
      <a href="index.php?page=<?php echo $page + 1 ?>">下一頁</a>
      <a href="index.php?page=<?php echo $total_page ?>">最末頁</a>
    <?php } ?>
  </div>
  <footer class="footer">
    Copyright © 2020 Who's Blog All Rights Reserved.
  </footer>
</body>

</html>