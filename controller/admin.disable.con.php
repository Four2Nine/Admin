<?php
/**
 * 禁用/启用一个管理员
 * Created by PhpStorm.
 * User: bingo
 * Date: 2016/11/6
 * Time: 11:23
 */
require 'connection.db.php';
require 'Constant.php';

$id = $_POST["id"];
//如果当前状态为启用，则操作为禁用；
//反过来，如果当前状态是禁用，则操作为启用
$is_active = $_POST["is_active"] == 1 ? 0 : 1;

$con = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
$con->query("SET NAMES UTF8;");
$sql = "UPDATE `tb_admin` SET `is_active` = ? WHERE `id`=?";
$stmt = $con->prepare($sql);
$stmt->bind_param('ii', $is_active, $id);

$stmt->execute();
$stmt->store_result();

$affected_rows = $stmt->affected_rows;

$stmt->close();
$con->close();
echo $affected_rows;