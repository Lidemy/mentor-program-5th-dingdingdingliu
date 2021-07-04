<?php
require_once('conn.php');
header('Content-type: application/json;charset=rtf-8');
header('Access-Control-Allow-Origin: *');

if (empty($_GET['title'])) {
  $json = array(
    'result' => false,
    'message' => 'Have No Title'
  );
  $response = json_encode($json);
  echo $response;
  die();
};
$title = $_GET['title'];

$sql = 'SELECT * FROM ding_w12_hw2_todolist WHERE title = ?';
$stmt = $conn->prepare($sql);
$stmt->bind_param('s', $title);
$result = $stmt->execute();

if (!$result) {
  $json = array(
    'result' => false,
    'message' => $conn->error
  );
  $response = json_encode($json);
  echo ($response);
  die();
};

$result = $stmt->get_result();
$row = $result->fetch_assoc();
$json = array(
  'result' => true,
  'message' => 'Success',
  'data' => array(
    'title' => $row['title'],
    'content' => $row['content']
  )
);

$response = json_encode($json);
echo $response;
