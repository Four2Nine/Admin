<?php
/**
 * Created by PhpStorm.
 * User: liuyang
 * Date: 2016/11/8
 * Time: 23:43
 */

require "connection.db.php";
require "Constant.php";

$result = array();

$con = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
$con->query("SET NAMES UTF8;");

//获取今日提交的报名表数目
$sql = "SELECT * FROM `tb_apply` WHERE TO_DAYS(`apply_time`) = TO_DAYS(NOW())";
$stmt = $con->prepare($sql);
$stmt->execute();
$stmt->store_result();
$result['today_apply_count'] = $stmt->num_rows;

//获取所有的报名表数目
$sql = "SELECT * FROM `tb_apply`";
$stmt = $con->prepare($sql);
$stmt->execute();
$stmt->store_result();
$result['apply_count'] = $stmt->num_rows;

//获取所有的用户数
$sql = "SELECT * FROM `tb_user`";
$stmt = $con->prepare($sql);
$stmt->execute();
$stmt->store_result();
$result['user_count'] = $stmt->num_rows;

//获取今日注册的用户数
$sql = "SELECT * FROM `tb_user` WHERE TO_DAYS(`register_time`) = TO_DAYS(NOW())";
$stmt = $con->prepare($sql);
$stmt->execute();
$stmt->store_result();
$result['today_user_count'] = $stmt->num_rows;

//关闭数据库连接
$stmt->close();
$con->close();

echo json_encode($result);
exit;

