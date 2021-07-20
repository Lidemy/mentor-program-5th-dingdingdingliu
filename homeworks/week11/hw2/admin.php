<?php
require_once("conn.php");
require_once("checkpermission.php");
require_once("utils.php");

$username = NULL;
if (!empty($_SESSION['username'])) {
  $username = $_SESSION['username'];
}

$sql = 'SELECT * FROM ding_w11_hw2_articles ORDER BY id DESC';
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
  <nav class="navbar">
    <div class="navbar__sitename">
      <a href="index.php">Ding's Blog</a>
    </div>
    <div class="navbar__lists">
      <div class="navbar__list-left">
        <a href="articles.php">文章列表</a>
        <a href="">分類專區</a>
        <a href="">關於我</a>
      </div>
      <div class="navbar__list-right">
        <a href="createarticle.php">新增文章</a>
        <a href="handle_logout.php">登出</a>
      </div>
    </div>
  </nav>
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
          <?php if ($row['username'] == $username) { ?>
            <a href="updatearticle.php?id=<?php echo escape($row['id']) ?>">編輯</a>
          <?php } ?>
          <?php if ($row['is_deleted'] == NULL) { ?>
            <a href="handle_deletearticle.php?id=<?php echo escape($row['id']) ?>">刪除</a>
          <?php } else { ?>
            <a href="handle_deletearticle.php?id=<?php echo escape($row['id']) ?>">復原</a>
          <?php } ?>
        </div>
      </div>
    <?php } ?>
  </div>
  <footer class="footer">
    Copyright © 2020 Who's Blog All Rights Reserved.
  </footer>
</body>

</html>