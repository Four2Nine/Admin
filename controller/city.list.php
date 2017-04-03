<?php
/**
 * Created by PhpStorm.
 * User: liuyang
 * Date: 2017/4/3
 * Time: 0:17
 */

require 'connection.db.php';
require 'Constant.php';

$result = array();

$con = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
$con->query("SET NAMES UTF8;");

$sql = "SELECT id, name, parent_id FROM `tb_city`
        ORDER BY parent_id ASC, id ASC";

$stmt = $con->prepare($sql);
$stmt->execute();

$stmt->store_result();
$stmt->bind_result($id, $name, $parent_id);

$result['city'] = array();

while ($stmt->fetch()) {
    $item = array();
    $item['id'] = $id;
    $item['name'] = $name;
    $item['parentId'] = $parent_id;
//    $item['parentName'] = $parent_name;

    array_push($result['city'], $item);
//    echo $id."/".$name."/".$parent_id."/".$parent_name."\n";
}

$result['number'] = $stmt->num_rows;

//关闭数据库连接
$stmt->close();
$con->close();

echo json_encode($result);
exit;