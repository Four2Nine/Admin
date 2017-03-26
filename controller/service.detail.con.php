<?php
/**
 * 获取企业服务详情
 *
 * Created by PhpStorm.
 * User: liuyang
 * Date: 2017/03/26
 * Time: 12:11
 */

require 'connection.db.php';
require 'Constant.php';

$applyId = $_POST['id'];

$pdo = new PDO('mysql:host=' . DB_HOST . ';dbname=' . DB_NAME, DB_USER, DB_PWD);
$pdo->query("SET NAMES UTF8;");
$sql = "SELECT * FROM `tb_service` WHERE `id` = ?";
$stmt = $pdo->prepare($sql);
$stmt->bindParam(1, $applyId, PDO::PARAM_INT);
$stmt->execute();

$result = $stmt->fetchObject();

$stmt->closeCursor();
$pdo = null;

echo json_encode($result);
exit;