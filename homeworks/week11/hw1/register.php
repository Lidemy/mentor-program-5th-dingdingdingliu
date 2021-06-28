<?php
require_once('conn.php');
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <title>留言板</title>
  <link rel="stylesheet" href="style.css">
</head>

<body>
  <header class="warning">
    注意! 本站為練習用網站，因教學用途刻意忽略資安的操作，註冊時請勿使用任何真實帳號及密碼。
  </header>
  <main class="board">
    <div class="board__top">
      <h1 class="board__title">會員註冊</h1>
      <div class="board__top-btn">
        <a class="board__btn" href="index.php">留言板</a>
        <a class="board__btn" href="login.php">登入</a>
      </div>
    </div>
    <?php
    if (!empty($_GET['errCode'])) {
      $msg = 'Error';
      if ($_GET['errCode'] === '1') {
        $msg = '資料不齊全請重新輸入';
        echo '<h5>' . $msg . '</h5>';
      } else if ($_GET['errCode'] === '2') {
        $msg = '此帳號/暱稱已被註冊，請再次輸入';
        echo '<h5>' . $msg . '</h5>';
      }
    }
    ?>
    <form method="POST" action="handle_register.php" class="board__form">
      <div class="board__form-input">
        <span>帳號: </span>
        <input type="text" name="username">
      </div>
      <div class="board__form-input">
        <span>密碼: </span>
        <input type="password" name="password">
      </div>
      <div class="board__form-input">
        <span>暱稱: </span>
        <input type="text" name="nickname">
      </div>
      <input type="submit" class="submit__btn">
    </form>
  </main>
</body>

</html>