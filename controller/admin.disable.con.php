<?php
/**
 * Created by PhpStorm.
 * User: bingo
 * Date: 2016/11/6
 * Time: 11:23
 */
header('Content-Type:text/html;charset=utf-8;');
require substr(dirname(__FILE__), 0, -10) . 'common\connection.db.php';
require substr(dirname(__FILE__), 0, -10) . 'common\Constant.php';

$id=$_POST["id"];
$is_active=$_POST["is_active"]==1?0:1;

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
