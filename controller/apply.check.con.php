<?php
/**
 * 对报名表进行审核
 *
 * Created by PhpStorm.
 * User: liuyang
 * Date: 2016/11/1
 * Time: 23:32
 */

require 'connection.db.php';
require 'Constant.php';

$check = (int)$_POST['check'];
$id = (int)$_POST['id'];

//连接数据库，并设置字符编码
$con = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
$con->query("SET NAMES UTF8;");

$sql = "UPDATE `tb_apply` SET `status` = ? WHERE `id`=?";
$stmt = $con->prepare($sql);
$stmt->bind_param('ii', $check, $id);

$stmt->execute();
$stmt->store_result();

$affected_rows = $stmt->affected_rows;

//关闭数据库连接
$stmt->close();
$con->close();

echo $affected_rows;
exit;