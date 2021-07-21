<?php
session_start();
require_once("conn.php");
require_once("utils.php");
require_once("checkpermission.php");
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
  <form method="POST" action="handle_createarticle.php" class="contents">
    <div class="content__article">
      <div class="article__submit">
        <span>發表文章</span>
        <?php if (!empty($_GET['errCode'])) {
          $msg = 'ERROR';
          if ($_GET['errCode'] == '1') {
            $msg = '欄位輸入不完整，請重新輸入';
            echo '<h5>' . $msg . '</h5>';
          }
        } ?>
        <input type="text" name='title'>
      </div>
      <textarea name="content" id="" cols="20" rows="30"></textarea>
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