<?php
/*
 * 修改会员信息
 * DZ
 */

require 'connection.db.php';
require 'global.func.php';
require 'Constant.php';

$result = array();

$id = $_POST["user_id"];
$username = $_POST['username'];
$is_reset_password = empty($_POST["reset_password"]) ? false : true;
$pwd = $is_reset_password ? md5("000000" . Constant::$_SALT) : $_POST['password'];
$balance = $_POST["balance"];

$token = generateToken($username, $pwd, Constant::$_SALT);
$result['is_reset_password'] = $is_reset_password;

//修改该会员的信息
$con = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
$con->query("SET NAMES UTF8;");

$sql = "UPDATE `tb_user` SET `token` = ?, `balance` = ?, `password` = ? WHERE `id`=?";
$stmt = $con->prepare($sql);
$stmt->bind_param("sssi", $token, $balance, $pwd, $id);

$stmt->execute();
$stmt->store_result();

$result['affected_rows'] = $stmt->affected_rows;

$stmt->close();
$con->close();

echo json_encode($result);
exit;