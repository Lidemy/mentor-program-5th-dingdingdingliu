<?php
require_once('conn.php');
header('Content-Type: application/json;charset=rtf-8');
header('Access-Control-Allow-Origin: *');
if (
  empty($_POST['content']) ||
  empty($_POST['nickname']) ||
  empty($_POST['site_key'])
) {
  $response = array(
    'result' => false,
    'message' => 'Please input missing field.'
  );
  $resMsg = json_encode($response);
  echo $resMsg;
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
  $response = array(
    'result' => false,
    'message' => $conn->error
  );
  $resMsg = json_encode($response);
  echo $resMsg;
  die();
}

$response = array(
  'result' => true,
  'message' => 'Success!'
);
$resMsg = json_encode($response);
echo $resMsg;
die();
