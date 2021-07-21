<?php
session_start();
require_once("conn.php");
require_once("utils.php");
require_once("checkpermission.php");

$id = $_GET['id'];
if (!$id) {
  header("Location:index.php");
  die();
}

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
        <a href="admin.php">管理後台</a>
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
  <form method="POST" action="handle_updatearticle.php" class="contents">
    <div class="content__article">
      <div class="article__submit">
        <span>編輯文章</span>
        <?php if (isset($_GET['errCode'])) {
          $msg = 'ERROR';
          if ($_GET['errCode'] == '1') {
            $msg = '欄位輸入不完整，請重新輸入';
            echo '<h5>' . $msg . '</h5>';
          }
        } ?>
        <input type="text" name="title" value="<?php echo escape($row['title']) ?>">
      </div>
      <textarea name="content" id="" cols="20" rows="30"><?php echo escape($row['content']) ?></textarea>
      <input type="hidden" name="id" value="<?php echo escape($row['id']) ?>">
      <div class="article__btn">
        <input type="submit" value="送出">
      </div>
    </div>
  </form>
  <footer class="footer">
    Copyright © 2020 Who's Blog All Rights Reserved.
  </footer>
</body>

</html>