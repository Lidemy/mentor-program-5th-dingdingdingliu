<?php
require_once('conn.php');
header('Content-Type: application/json;charset=rtf-8');
header('Access-Control-Allow-Origin: *');

if (
  empty($_GET['site_key'])
) {
  $json = array(
    'result' => false,
    'message' => 'Please add site_key in url.'
  );
  $response = json_encode($json);
  echo $response;
  die();
};

if (!empty($_GET['cursor'])) {
  $cursor = $_GET['cursor'];
};

$site_key = $_GET['site_key'];
$per_page = 5;
$get_api = $per_page + 1;
$sql = 'SELECT * FROM ding_w12_hw1_messages WHERE site_key = ? AND id < ? ORDER BY id DESC limit ?';
if (!empty($_GET['cursor'])) {
  $sql = 'SELECT * FROM ding_w12_hw1_messages WHERE site_key = ? AND id < ? ORDER BY id DESC limit ?';
} else {
  $sql = 'SELECT * FROM ding_w12_hw1_messages WHERE site_key = ? ORDER BY id DESC limit ?';
}
$stmt = $conn->prepare($sql);

if (!empty($_GET['cursor'])) {
  $stmt->bind_param('sii', $site_key, $cursor, $get_api);
} else {
  $stmt->bind_param('si', $site_key, $get_api);
}


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

$result = $stmt->get_result();
$message = array();
while ($row = $result->fetch_assoc()) {
  array_push(
    $message,
    array(
      'nickname' => $row['nickname'],
      'content' => $row['content'],
      'created_at' => $row['created_at'],
      'id' => $row['id']
    )
  );
};

$json = array(
  'result' => true,
  'messages' => $message
);

$response = json_encode($json);
echo $response;
die();
