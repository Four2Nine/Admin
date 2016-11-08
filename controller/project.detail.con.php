<?php
/*
 * 获取指定项目的详情
 *
 * DZ
 */

require 'connection.db.php';
require 'Constant.php';

$id = $_POST['id'];
$result = array();

$pdo = new PDO('mysql:host=' . DB_HOST . ';dbname=' . DB_NAME, DB_USER, DB_PWD);
$pdo->query("SET NAMES UTF8;");
$sql = "SELECT * FROM `tb_project` WHERE `id` = ?";
$stmt = $pdo->prepare($sql);
$stmt->bindParam(1, $id, PDO::PARAM_INT);
$stmt->execute();

$result['projectDetail'] = $stmt->fetchObject();

$stmt->closeCursor();
$pdo = null;

echo json_encode($result);
exit;