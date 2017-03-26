<?php
/**
 * 获取企业服务列表
 *
 * Created by PhpStorm.
 * User: liuyang
 * Date: 2017/03/26
 * Time: 12:11
 */

require 'connection.db.php';
require 'Constant.php';

$result = array();

$con = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
$con->query("SET NAMES UTF8;");

$sql = "SELECT `id`, `company_name`, `contact_name`, `contact_phone_number`, `contact_email`, `apply_time`, `is_pass` 
FROM `tb_service` ORDER BY `apply_time` DESC";

$stmt = $con->prepare($sql);
$stmt->execute();

$stmt->store_result();
$stmt->bind_result($id, $company_name, $contact_name, $phone_number, $email, $apply_time, $status);

$result['serviceInfo'] = array();

while ($stmt->fetch()) {
    $item = array();
    $item['id'] = $id;
    $item['company_name'] = $company_name;
    $item['contact_name'] = $contact_name;
    $item['phone_number'] = $phone_number;
    $item['email'] = $email;
    $item['apply_time'] = $apply_time;
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
    $result['serviceInfo'][$id] = $item;
}

$result['serviceNum'] = $stmt->num_rows;

//关闭数据库连接
$stmt->close();
$con->close();

echo json_encode($result);
exit;