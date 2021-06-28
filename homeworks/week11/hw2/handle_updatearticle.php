<?php
session_start();
require_once('conn.php');
require_once('utils.php');

$username = $_SESSION['username'];
$id = $_POST['id'];
$title = $_POST['title'];
$content = $_POST['content'];

if (
  empty($_POST['title']) ||
  empty($_POST['content'])
) {
  header("Location:updatearticle.php?errCode=1&id=" . $id);
  die();
}

$sql = 'UPDATE ding_w11_hw2_articles SET title = ? , content = ? WHERE id = ? AND username = ?';
$stmt = $conn->prepare($sql);
$stmt->bind_param('ssis', $title, $content, $id, $username);
$result = $stmt->execute();

if (!$result) {
  die($conn->error);
}
?>
<script>
  history.go(-2);
</script>