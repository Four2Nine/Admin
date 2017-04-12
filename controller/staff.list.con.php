<?php

require 'connection.db.php';
require 'Constant.php';

$result = array();

$con = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
$con->query("SET NAMES UTF8;");

$sql = "SELECT `id`, `name`, `description`, `duties`, `email`, `phone`, `is_top` FROM `tb_staff` ORDER BY `create_time` DESC ";
$stmt = $con->prepare($sql);
$stmt->execute();

$stmt->store_result();
$stmt->bind_result($id, $name, $desc, $duties, $email, $phone, $top);

$result['staff'] = array();
while ($stmt->fetch()) {
    $item = array();
    $item['id'] = $id;
    $item['name'] = $name;
    $item['desc'] = $desc;
    $item['duties'] = $duties;
    $item['email'] = $email;
    $item['phone'] = $phone;
    $item['top'] = $top;

    $result['staff'][$id] = $item;
}
$result['staffNum'] = $stmt->num_rows;

//关闭数据库连接
$stmt->close();
$con->close();

echo json_encode($result);
exit;