<?php
require_once('conn.php');
header('Content-Type: application/json;charset=rtf-8');
header('Access-Control-Allow-Origin: *');
if (
  empty($_POST['content']) ||
  empty($_POST['nickname']) ||
  empty($_POST['site_key'])
) {
  $json = array(
    'result' => false,
    'message' => 'Please input missing field.'
  );
  $response = json_encode($json);
  echo $response;
  die();
};

$nickname = $_POST['nickname'];
$site_key = $_POST['site_key'];
$content = $_POST['content'];

$sql = 'INSERT INTO ding_w12_hw1_messages (site_key,nickname,content) VALUES (?, ?, ?)';
$stmt = $conn->prepare($sql);
$stmt->bind_param('sss', $site_key, $nickname, $content);
$result = $stmt->execute();

if (!$result) {
  $json = array(
    'result' => false,
    'message' => $conn->error
  );
  $response = json_encode($json);
  echo $result;
  die();
}

$json = array(
  'result' => true,
  'message' => 'Success!'
);
$response = json_encode($json);
echo $response;
die();
