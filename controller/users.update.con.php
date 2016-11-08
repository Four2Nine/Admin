<?php
/*
 * 修改会员信息
 * DZ
 */

require 'connection.db.php';
require 'global.func.php';
require 'Constant.php';

$id = $_POST["upvipid"];
$name = $_POST["username"];
$password = $_POST["password"];
$balance = $_POST["balance"];

$password = md5($password . Constant::$_SALT);

$token = generateToken($name, $password, Constant::$_SALT);
$result['token'] = $token;

//修改该会员的信息
$con = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
$con->query("SET NAMES UTF8;");

$sql = "UPDATE `tb_user` SET `token` = ?, `username` = ?, `password` = ?, `balance` = ? WHERE `id`=?";
$stmt = $con->prepare($sql);
$stmt->bind_param("ssssi", $token, $name, $password, $balance, $id);

$stmt->execute();
$stmt->store_result();

$affected_rows = $stmt->affected_rows;

$stmt->close();
$con->close();

echo $affected_rows;
exit;