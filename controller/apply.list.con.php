<?php
/**
 * 获取所有的报名表列表（并非全部，根据当前的页数，和每页显示的数量来查询）
 *
 * Created by PhpStorm.
 * User: liuyang
 * Date: 2016/10/27
 * Time: 23:56
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


//获取所报名表的数量
$sqlCount = "SELECT * FROM `tb_apply`";
$stmt = $con->prepare($sqlCount);
$stmt->execute();
$stmt->store_result();
$result['applyNum'] = $stmt->num_rows;

//获取指定报名表的信息
$sql = "SELECT `id`, `project_id`, `name`, `phone_number`, `email`, `wechat`, `status` FROM `tb_apply` LIMIT ?, ?";
$stmt = $con->prepare($sql);
$stmt->bind_param("ii", $start, $itemsNumberPerPage);
$stmt->execute();

$stmt->store_result();
$stmt->bind_result($id, $project_id, $name, $phone_number, $email, $wechat, $status);

$result['applyInfo'] = array();

while ($stmt->fetch()) {
    $item = array();
    $item['id'] = $id;
    $item['project_id'] = $project_id;
    $item['name'] = $name;
    $item['phone_number'] = $phone_number;
    $item['email'] = $email;
    $item['wechat'] = $wechat;
    switch ($status) {
        case 0:
            $item['status'] = "待审核";
            break;
        case 1:
            $item['status'] = "审核通过";
            break;
        case 2:
            $item['status'] = "审核拒绝";
    }
    $result['applyInfo'][$id] = $item;
}

//关闭数据库连接
$stmt->close();
$con->close();

echo json_encode($result);
exit;