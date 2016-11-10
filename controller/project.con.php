<?php
/*
 * 获取所有的项目列表（并非全部，根据当前的页数，和每页显示的数量来查询）
 *
  DZ
 */

require 'connection.db.php';
require 'Constant.php';

//当前页数
$currentPage = $_GET['currentPage'];

//每页显示的报名表数量
$itemsNumberPerPage = 30;

//返回报名表的起始id（是前一个）
$start = ($currentPage - 1) * $itemsNumberPerPage;

$result = array();

$con = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
$con->query("SET NAMES UTF8;");


//获取项目数量
$sql = "SELECT * FROM `tb_project`";
$stmt = $con->prepare($sql);
$stmt->execute();
$stmt->store_result();
$result['number'] = $stmt->num_rows;

//获取指定项目的信息
$sql = "SELECT `id`, `acpname`, `acpcity`, `acpdate`, `acpday`, `acppushdate` 
FROM `tb_project` LIMIT ?, ?";
$stmt = $con->prepare($sql);
$stmt->bind_param("ii", $start, $itemsNumberPerPage);
$stmt->execute();

$stmt->store_result();
$stmt->bind_result($id, $name, $city, $date, $day, $pushDate);
$result['info'] = array();
while ($stmt->fetch()) {

    $item = array();
    $item['id'] = $id;
    $item['name'] = $name;
    $item['city'] = $city;
    $item['date'] = $date;
    $item['day'] = $day;
    $item['pushDate'] = $pushDate;

    $result['info'][$id] = $item;
}

//关闭数据库连接
$stmt->close();
$con->close();

echo json_encode($result);
exit;