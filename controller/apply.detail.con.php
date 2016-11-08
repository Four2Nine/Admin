<?php
/**
 * 获取报名表的详细信息
 *
 * Created by PhpStorm.
 * User: liuyang
 * Date: 2016/10/31
 * Time: 0:04
 */

require 'connection.db.php';
require 'Constant.php';

$applyId = $_POST['id'];

$pdo = new PDO('mysql:host=' . DB_HOST . ';dbname=' . DB_NAME, DB_USER, DB_PWD);
$pdo->query("SET NAMES UTF8;");
$sql = "SELECT * FROM `tb_apply` WHERE `id` = ?";
$stmt = $pdo->prepare($sql);
$stmt->bindParam(1, $applyId, PDO::PARAM_INT);
$stmt->execute();

$result = $stmt->fetchObject();

$stmt->closeCursor();
$pdo = null;

echo json_encode($result);
exit;