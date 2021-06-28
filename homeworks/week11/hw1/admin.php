<?php
session_start();
require_once('conn.php');
require_once('utils.php');

$username = NULL;
$userdata = NULL;
if (!empty($_SESSION['username'])) {
  $username = $_SESSION['username'];
  $userdata = getData($username);
  $role = $userdata['role'];
}

if ($role !== 'ADMIN') {
  header("Location:index.php");
  die();
}

$sql =  'SELECT * FROM ding_w11_hw1_users ORDER BY role';
$stmt = $conn->prepare($sql);
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
      <h1 class="board__title">管理後台</h1>
      <div class="board__top-btn">
        <a class="board__btn" href="index.php">留言板首頁</a>
      </div>
    </div>
    <div class="board__hr"></div>
    <?php if ($username) { ?>

    <?php } ?>
    <section>
      <?php
      while ($row = $result->fetch_assoc()) {
      ?>
        <?php if ($row['role'] == 'ADMIN') { ?>
          <div class="card__admin">
            <div class="card__body">
              <span class="card__role">管理員</span>
              <span class="card__author"><?php echo escape($row['nickname']) ?>
                (@<?php echo escape($row['username']) ?>)
              </span>
              <span class="card__time"><?php echo escape($row['created_at']) ?></span>
            </div>
            <div class="card__btn">
              <a href="handle_admin.php?username=<?php echo escape($row['username']) ?>&role=NORMAL">普通會員</a>
              <a href="handle_admin.php?username=<?php echo escape($row['username']) ?>&role=SUSPENSION">停權會員</a>
            </div>
          </div>
        <?php } else if ($row['role'] === 'NORMAL') { ?>
          <div class="card__admin">
            <div class="card__body">
              <span class="card__role">普通會員</span>
              <span class="card__author"><?php echo escape($row['nickname']) ?>
                (@<?php echo escape($row['username']) ?>)
              </span>
              <span class="card__time"><?php echo escape($row['created_at']) ?></span>
            </div>
            <div class="card__btn">
              <a href="handle_admin.php?username=<?php echo escape($row['username']) ?>&role=ADMIN">管理員</a>
              <a href="handle_admin.php?username=<?php echo escape($row['username']) ?>&role=SUSPENSION">停權會員</a>
            </div>
          </div>
        <?php } else { ?>
          <div class="card__admin">
            <div class="card__body">
              <span class="card__role">停權會員</span>
              <span class="card__author"><?php echo escape($row['nickname']) ?>
                (@<?php echo escape($row['username']) ?>)
              </span>
              <span class="card__time"><?php echo escape($row['created_at']) ?></span>
            </div>
            <div class="card__btn">
              <a href="handle_admin.php?username=<?php echo escape($row['username']) ?>&role=NORMAL">普通會員</a>
            </div>
          </div>
        <?php } ?>
      <?php } ?>
    </section>
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