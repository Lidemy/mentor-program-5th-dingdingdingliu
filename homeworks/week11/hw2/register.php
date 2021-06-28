<?php
require_once('conn.php');
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
        <a href="index.php">回首頁</a>
      </div>
    </div>
  </nav>
  <section class="section__title">
    <div class="title">
      <h2>存放樂事之地</h2>
      <p>Welcome to my blog</p>
    </div>
  </section>
  <form method="POST" action="handle_register.php" class="contents">
    <div class="content__login">
      <h1>Register</h1>
      <?php
      if (!empty($_GET)) {
        $msg = 'ERROR';
        if ($_GET['errCode'] == '1') {
          $msg = '帳號密碼不齊全，請重新輸入';
          echo '<h5>' . $msg . '</h5>';
        } else if ($_GET['errCode'] == '2') {
          $msg = '此帳號密碼重複，請重新輸入';
          echo '<h5>' . $msg . '</h5>';
        }
      }
      ?>
      <div class="card__submit">
        <span>USERNAME</span>
        <input type="text" name="username">
      </div>
      <div class="card__submit">
        <span>PASSWORD</span>
        <input type="password" name="password">
      </div>
      <div class="card__btn">
        <input type="submit" value="註冊帳號">
      </div>
    </div>
  </form>
  <footer class="footer">
    Copyright © 2020 Who's Blog All Rights Reserved.
  </footer>
</body>

</html>