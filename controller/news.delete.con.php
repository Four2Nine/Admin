<?php
/*
 * 删除指定的会员
 * DZ
 */

require 'connection.db.php';
require 'Constant.php';

$id = $_POST['id'];

$con = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
$con->query("SET NAMES UTF8;");
$sql = "DELETE FROM `tb_news` WHERE `id` = ?";

$stmt = $con->prepare($sql);
$stmt->bind_param('i', $id);

$stmt->execute();
$stmt->store_result();

$affected_rows = $stmt->affected_rows;

$stmt->close();
$con->close();

echo $affected_rows;
exit;