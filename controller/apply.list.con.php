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

$result = array();

$con = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
$con->query("SET NAMES UTF8;");


//获取指定报名表的信息
$sql = "SELECT a.id, a.project_id, p.acpname, a.name, a.apply_time, a.status 
FROM `tb_apply` a, `tb_project` p WHERE p.id = a.project_id ORDER BY `apply_time` DESC";
$stmt = $con->prepare($sql);
$stmt->execute();

$stmt->store_result();
$stmt->bind_result($id, $project_id, $project_name, $name, $time, $status);

$result['applyInfo'] = array();

while ($stmt->fetch()) {
    $item = array();
    $item['id'] = $id;
    $item['project_id'] = $project_id;
    $item['project_name'] = $project_name;
    $item['name'] = $name;
    $item['time'] = $time;
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

$result['applyNum'] = $stmt->num_rows;

//关闭数据库连接
$stmt->close();
$con->close();

echo json_encode($result);
exit;