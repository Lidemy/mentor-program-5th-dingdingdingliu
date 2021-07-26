<?php
require_once('conn.php');
header('Content-type: application/json;charset=rtf-8');
header('Access-Control-Allow-Origin: *');

if (
  empty($_GET['title']) ||
  empty($_GET['id'])
) {
  $response = array(
    'result' => false,
    'message' => 'Have No Title or ID'
  );
  $resMsg = json_encode($response);
  echo $resMsg;
  die();
};
$title = $_GET['title'];
$id = $_GET['id'];

$sql = 'SELECT * FROM ding_w12_hw2_todolist WHERE title = ? AND id = ?';
$stmt = $conn->prepare($sql);
$stmt->bind_param('si', $title, $id);
$result = $stmt->execute();

if (!$result) {
  $response = array(
    'result' => false,
    'message' => $conn->error
  );
  $resMsg = json_encode($response);
  echo ($resMsg);
  die();
};

$result = $stmt->get_result();
$row = $result->fetch_assoc();
$response = array(
  'result' => true,
  'message' => 'Success',
  'data' => array(
    'title' => $row['title'],
    'content' => $row['content'],
    'listId' => $id
  )
);

$resData = json_encode($response);
echo $resData;
