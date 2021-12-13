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
$id = $_GET['id'];

if (!$id) {
  $response = array(
    'result' => false,
    'message' => 'ID missing'
  );
  $resMsg = json_encode($response);
  echo $resMsg;
  die();
}

$sql = 'UPDATE ding_w12_hw2_todolist SET content = ? WHERE title = ? AND id = ?';
$stmt = $conn->prepare($sql);
$stmt->bind_param('ssi', $todo, $title, $id);
$result = $stmt->execute();

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
  'message' => 'Success'
);
$resMsg = json_encode($response);
echo ($resMsg);
die();
