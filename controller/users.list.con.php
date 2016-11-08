<?php
/*
 * 获取用户数目和列表
 * DZ
 */

require 'connection.db.php';
require 'Constant.php';

//当前页数
$currentPage = $_GET['currentPage'];

//每页显示的会员数量
$itemsNumberPerPage = 30;

//返回会员的起始id（是前一个）
$start = ($currentPage - 1) * $itemsNumberPerPage;

$result = array();

$con = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
$con->query("SET NAMES UTF8;");

//获取会员的数量
$sql = "SELECT * FROM `tb_user`";
$stmt = $con->prepare($sql);
$stmt->execute();
$stmt->store_result();
$result['applyNum'] = $stmt->num_rows;

//获取会员信息列表
$sql = "SELECT `id`, `username`, `password`, `balance` 
FROM `tb_user` LIMIT ?, ?";
$stmt = $con->prepare($sql);
$stmt->bind_param("ii", $start, $itemsNumberPerPage);
$stmt->execute();

$stmt->store_result();
$stmt->bind_result($id, $username, $password, $balance);

$result['applyInfo'] = array();
while ($stmt->fetch()) {
    $item = array();
    $item['id'] = $id;
    $item['username'] = $username;
    $item['password'] = $password;
    $item['balance'] = $balance;


    $result['applyInfo'][$id] = $item;
}

//关闭数据库连接
$stmt->close();
$con->close();

echo json_encode($result);
exit;