<?php
/**
 * Created by PhpStorm.
 * User: liuyang
 * Date: 2016/11/14
 * Time: 10:49
 */

require 'connection.db.php';
require 'Constant.php';

$id = $_POST['id'];
$result = array();

$pdo = new PDO('mysql:host=' . DB_HOST . ';dbname=' . DB_NAME, DB_USER, DB_PWD);
$pdo->query("SET NAMES UTF8;");
$sql = "SELECT * FROM `tb_slider` WHERE `id` = ?";
$stmt = $pdo->prepare($sql);
$stmt->bindParam(1, $id, PDO::PARAM_INT);
$stmt->execute();

$result['detail'] = $stmt->fetchObject();

$stmt->closeCursor();
$pdo = null;

echo json_encode($result);
exit;