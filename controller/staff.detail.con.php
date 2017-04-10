<?php
/*
 * 获取指定会员的信息
 * DZ
 */

require 'connection.db.php';
require 'Constant.php';

$id = $_POST['id'];

$con = new PDO('mysql:host=' . DB_HOST . ';dbname=' . DB_NAME, DB_USER, DB_PWD);
$con->query("SET NAMES UTF8;");

$sql = "SELECT * FROM `tb_staff` WHERE `id` = ?";
$stmt = $con->prepare($sql);

$stmt->bindParam(1, $id, PDO::PARAM_INT);
$stmt->execute();

$result = array();
$result['detail'] = $stmt->fetchObject();

echo json_encode($result);
exit;