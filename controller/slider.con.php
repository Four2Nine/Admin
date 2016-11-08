<?php
/**
 * 获取轮播图信息
 *
 * Created by PhpStorm.
 * User: Lishuai
 * Date: 2016/10/30
 * Time: 20:38
 */

require 'connection.db.php';
require 'Constant.php';

$con = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
$con->query("SET NAMES UTF8;");

$sql = "SELECT * FROM `tb_slider`";
$stmt = $con->prepare($sql);
$stmt->execute();
$stmt->store_result();

$stmt->bind_result($id, $img_path, $title, $subtitle);

$result = array();
while ($stmt->fetch()) {
    $item = array();
    $item['id'] = $id;
    $item['img_path'] = $img_path;
    $item['title'] = $title;
    $item['subtitle'] = $subtitle;

    $result['sliderInfo'][$id] = $item;
}

$stmt->close();
$con->close();

echo json_encode($result);
exit;