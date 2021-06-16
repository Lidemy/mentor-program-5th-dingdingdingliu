<?php
session_start();
require_once('conn.php');
require_once('utils.php');
$sql = 'select * from ding_w9_comments order by id desc';
$result = $conn->query($sql);

$username = NULL;
if (!empty($_SESSION['username'])) {
  $username = $_SESSION['username'];
}

if ($username) {
  $userdata = getNicknameFromData($username);
  $nickname = $userdata['nickname'];
}
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
      <h1 class="board__title">留言板</h1>
      <div class="board__top-btn">
        <?php if (!$username) { ?>
          <a class="board__btn" href="register.php">註冊</a>
          <a class="board__btn" href="login.php">登入</a>
        <?php } else { ?>
          <a class="board__btn" href="handle_logout.php">登出</a>
        <?php } ?>
      </div>
    </div>
    <?php
    if (!empty($_GET['errCode'])) {
      if ($_GET['errCode'] === '1') {
        $msg = "留言不可空白，請重新輸入留言";
        echo "<h5>" . $msg . "</h5>";
      }
    }
    ?>
    <?php if ($username) { ?>
      <div class="board__greeting">Hi <?php echo $nickname ?> ! 請留下你的留言: </div>
      <form method="POST" action="handle_add.php" class="board__form">
        <textarea name="content" id="" cols="30" rows="8"></textarea>
        <input type="submit" class="submit__btn">
      </form>
      <div class="board__hr"></div>
    <?php } else { ?>
      <h3>Hi! 請註冊會員並登入後留言</h3>
    <?php } ?>
    <section>
      <?php
      while ($row = $result->fetch_assoc()) {
      ?>
        <div class="card">
          <div class="card__avatar"></div>
          <div class="card__body">
            <div class="card__info">
              <span class="card__author"><?php echo $row['nickname'] ?></span>
              <span class="card__time"><?php echo $row['created_at'] ?></span>
            </div>
            <p class="card__content"><?php echo $row['content'] ?></p>
          </div>
        </div>
      <?php } ?>
    </section>
  </main>
</body>

</html>