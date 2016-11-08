<?php
/**
 * 获取所有的管理员
 *
 * Created by PhpStorm.
 * User: bingo
 * Date: 2016/11/5
 * Time: 14:01
 */

require 'connection.db.php';
require 'Constant.php';

//连接数据库，并设置字符编码
$con = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
$con->query("SET NAMES UTF8;");
$sql = "SELECT `id`, `username`, `is_active`,`is_boss` FROM `tb_admin` ";

$stmt = $con->prepare($sql);
$stmt->execute();

$stmt->store_result();
$stmt->bind_result($id, $username, $is_active, $is_boss);

$result = array();
while ($stmt->fetch()) {
    $item = array();
    $item['id'] = $id;
    $item['username'] = $username;
    $item['is_active'] = $is_active;
    $item['is_boss'] = $is_boss;
    $result[$id] = $item;
}

//关闭数据库连接
$stmt->close();
$con->close();

echo json_encode($result);