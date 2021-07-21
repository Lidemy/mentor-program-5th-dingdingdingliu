<?php
session_start();
require_once("conn.php");
require_once("utils.php");

$sql = 'SELECT * FROM ding_w11_hw2_articles WHERE is_deleted IS NULL ORDER BY id DESC';
$stmt = $conn->prepare($sql);
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
  <div class="article__contents">
    <?php while ($row = $result->fetch_assoc()) { ?>
      <div class="article__content">
        <div class="article__title"><?php echo escape($row['title']) ?></div>
        <div class="article__info">
          <div class="article__time"><?php echo escape($row['created_at']) ?></div>
          <a href="readarticle.php?id=<?php echo escape($row['id']) ?>">READ</a>
        </div>
      </div>
    <?php } ?>
  </div>
  <footer class="footer">
    Copyright © 2020 Who's Blog All Rights Reserved.
  </footer>
</body>

</html>