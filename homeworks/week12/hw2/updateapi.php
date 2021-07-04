<?php
require_once('conn.php');
header('Content-type: application/json;charset=rtf-8');
header('Access-Control-Allow-Origin: *');

if (
  empty($_POST['todo']) ||
  empty($_POST['title'])
) {
  $json = array(
    'result' => false,
    'message' => 'please input missing field.'
  );
  $response = json_encode($json);
  echo ($response);
  die();
}

$todo = $_POST['todo'];
$title = $_POST['title'];

$sql = 'UPDATE ding_w12_hw2_todolist SET content = ? WHERE title = ?';
$stmt = $conn->prepare($sql);
$stmt->bind_param('ss', $todo, $title);
$result = $stmt->execute();

if (!$result) {
  $json = array(
    'result' => false,
    'message' => $conn->error
  );
  $response = json_encode($json);
  echo ($response);
  die();
}

$json = array(
  'result' => true,
  'message' => 'Success'
);
$response = json_encode($json);
echo ($response);
die();
