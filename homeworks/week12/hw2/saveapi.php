<?php
require_once('conn.php');
header('Content-type: application/json;charset=rtf-8');
header('Access-Control-Allow-Origin: *');

if (
  empty($_POST['todo']) ||
  empty($_POST['title'])
) {
  $response = array(
    'result' => false,
    'message' => 'please input missing field.'
  );
  $resMsg = json_encode($response);
  echo ($resMsg);
  die();
}

$todo = $_POST['todo'];
$title = $_POST['title'];

$sql = 'INSERT INTO ding_w12_hw2_todolist (title, content) VALUES (?, ?)';
$stmt = $conn->prepare($sql);
$stmt->bind_param('ss', $title, $todo);
$result = $stmt->execute();
$insert_id = $conn->insert_id;

if (!$result) {
  $response = array(
    'result' => false,
    'message' => $conn->error
  );
  $resMsg = json_encode($response);
  echo ($resMsg);
  die();
}

$response = array(
  'result' => true,
  'id' => $insert_id,
  'message' => 'Success'
);
$resData = json_encode($response);
echo ($resData);
die();
