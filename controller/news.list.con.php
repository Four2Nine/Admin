<?php
/*
 * 获取所有的项目列表（并非全部，根据当前的页数，和每页显示的数量来查询）
 *
  DZ
 */

require 'connection.db.php';
require 'Constant.php';

$result = array();

$con = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
$con->query("SET NAMES UTF8;");

//获取指定项目的信息
$sql = "SELECT `id`, `title`, `content`, `url`, `publish_time` FROM `tb_news` ORDER BY `publish_time` DESC";
$stmt = $con->prepare($sql);
$stmt->execute();

$stmt->store_result();
$stmt->bind_result($id, $title, $content, $url, $pushTime);
$result['info'] = array();
while ($stmt->fetch()) {

    $item = array();
    $item['id'] = $id;
    $item['title'] = $title;
    $item['content'] = $content;
    $item['url'] = $url;
    $item['pushTime'] = $pushTime;
    $result['info'][$id] = $item;
}

$result['number'] = $stmt->num_rows;

//关闭数据库连接
$stmt->close();
$con->close();

echo json_encode($result);
exit;