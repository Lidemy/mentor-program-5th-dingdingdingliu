<?php
session_start();
require_once('conn.php');
require_once('utils.php');

$username = NULL;
$user = NULL;
if (!empty($_SESSION['username'])) {
  $username = $_SESSION['username'];
  $userdata = getData($username);
  $nickname = $userdata['nickname'];
  $role = $userdata['role'];
}

$id = $_GET['id'];

if ($role === 'ADMIN') {
  $sql =  'SELECT * FROM ding_w11_hw1_comments WHERE id =?';
} else {
  $sql =  'SELECT * FROM ding_w11_hw1_comments WHERE id =? AND username = ?';
}

$stmt = $conn->prepare($sql);

if ($role === 'ADMIN') {
  $stmt->bind_param('i', $id);
} else {
  $stmt->bind_param('is', $id, $username);
}

$result = $stmt->execute();
if (!$result) {
  die('Error:' . $conn->error);
}
$result = $stmt->get_result();
$row = $result->fetch_assoc();

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
      <h1 class="board__title">編輯留言</h1>
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
      <div class="board__greeting">Hi <?php echo escape($nickname) ?> ! 請編輯你的留言: </div>
      <form method="POST" action="handle_updatecomment.php" class="board__form">
        <textarea name="content" id="" cols="30" rows="8"><?php echo escape($row['content']) ?></textarea>
        <input type="hidden" name="id" value="<?php echo escape($row['id']) ?>">
        <input type="submit" class="submit__btn">
        <input type="button" class="submit__btn" onclick="javascript:location.href='index.php'" value="取消">
      </form>
      <div class="board__hr"></div>
    <?php } ?>
  </main>
</body>

</html>