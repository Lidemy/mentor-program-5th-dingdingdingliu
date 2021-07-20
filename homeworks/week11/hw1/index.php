<?php
session_start();
require_once('conn.php');
require_once('utils.php');

$username = NULL;
$user = NULL;
$role = NULL;
if (!empty($_SESSION['username'])) {
  $username = $_SESSION['username'];
  $userdata = getData($username);
  $nickname = $userdata['nickname'];
  $role = $userdata['role'];
}

$page = 1;
if (!empty($_GET['page'])) {
  $page = intval($_GET['page']);
}
$litems_per_page = 5;
$offset = ($page - 1) * $litems_per_page;

$sql =  'SELECT ' .
  'C.id AS id, C.content AS content, C.username AS username, ' .
  'C.created_at AS created_at, U.nickname AS nickname ' .
  'FROM ding_w11_hw1_comments AS C left join ding_w11_hw1_users AS U ' .
  'ON C.username = U.username ' .
  'WHERE C.is_deleted is NULL ' .
  'ORDER BY C.id DESC ' .
  'limit ? offset ?';
$stmt = $conn->prepare($sql);
$stmt->bind_param('ii', $litems_per_page, $offset);
$result = $stmt->execute();
if (!$result) {
  die('Error:' . $conn->error);
}
$result = $stmt->get_result();

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
          <?php if ($role == 'ADMIN') { ?>
            <a class="board__btn" href="admin.php">管理後台</a>
          <?php } ?>
          <a class="board__btn change">修改暱稱</a>
          <a class="board__btn" href="handle_logout.php">登出</a>
        <?php } ?>
      </div>
    </div>
    <?php
    if (!empty($_GET['errCode'])) {
      if ($_GET['errCode'] === '1') {
        $msg = "留言不可空白，請重新輸入留言";
        echo "<h5>" . $msg . "</h5>";
      } else if ($_GET['errCode'] === '3') {
        $msg = "暱稱不可空白，請重新修改暱稱";
        echo "<h5>" . $msg . "</h5>";
      } else if ($_GET['errCode'] === '4') {
        $msg = "停權會員無法留言";
        echo "<h5>" . $msg . "</h5>";
      }
    }
    ?>
    <?php if ($username) { ?>
      <?php if ($role !== 'SUSPENSION') { ?>
        <form method="POST" action="handle_updateuser.php" class="board__form form_newname hidden">
          <div class="board__form-input">
            <span>新的暱稱: </span>
            <input type="text" name="nickname">
          </div>
          <input type="submit" class="submit__btn">
        </form>
        <div class="board__greeting">Hi <?php echo escape($nickname) ?> ! 請留下你的留言: </div>
        <form method="POST" action="handle_add.php" class="board__form">
          <textarea name="content" id="" cols="30" rows="8"></textarea>
          <input type="submit" class="submit__btn">
        </form>
        <div class="board__hr"></div>
      <?php } else { ?>
        <div class="board__hr"></div>
      <?php } ?>
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
              <span class="card__author"><?php echo escape($row['nickname']) ?>
                (@<?php echo escape($row['username']) ?>)
              </span>
              <span class="card__time"><?php echo escape($row['created_at']) ?></span>
              <?php if ($row['username'] === $username) { ?>
                <a href="updatecomment.php?id=<?php echo escape($row['id']) ?>">編輯</a>
                <a href="handle_deletecomment.php?id=<?php echo escape($row['id']) ?>">刪除</a>
              <?php } else if ($role === "ADMIN") { ?>
                <a href="updatecomment.php?id=<?php echo escape($row['id']) ?>">編輯</a>
                <a href="handle_deletecomment.php?id=<?php echo escape($row['id']) ?>">刪除</a>
              <?php } ?>
            </div>
            <p class="card__content"><?php echo escape($row['content']) ?></p>
          </div>
        </div>
      <?php } ?>
    </section>
    <div>
      <div class="board__hr"></div>
      <?php
      $sql = 'SELECT count(id) AS count FROM ding_w11_hw1_comments WHERE is_deleted IS NULL';
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
      <div class="page__info">
        <span>總共有 <?php echo $count ?> 筆留言，</span>
        <span>頁數 : <?php echo $page ?> / <?php echo $total_page ?> </span>
      </div>
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
    </div>
  </main>
  <script>
    document.querySelector('.board__top-btn').addEventListener('click', e => {
      if (e.target.classList.contains('change')) {
        document.querySelector('.form_newname').classList.toggle('hidden')
      }
    })
  </script>
</body>

</html>