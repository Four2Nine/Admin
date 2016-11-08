<?php
/**
 *
 * 修改轮播图信息
 *
 * Created by PhpStorm.
 * User: Lishuai
 * Date: 2016/10/31
 * Time: 15:43
 */

require 'connection.db.php';
require 'Constant.php';

$result = array();

$result['slider_id'] = $_POST['slider_id'];
$result['title'] = $_POST['title'];
$result['subtitle'] = $_POST['subtitle'];

//指定上传图片的路径
$upload_folder = substr(dirname(__FILE__), 0, -16) . 'theACP\images\slider\\';
//如果指定的路径不存在则创建
if (!file_exists($upload_folder)) {
    if (mkdir($upload_folder)) {

    } else {
        echo "创建文件夹失败<br/>";
    }
}

//上传(覆盖)图片
$tmp_name = $_FILES["picture"]["tmp_name"];
$name = "bg".$result['slider_id'].".jpg"; //覆盖已存在的bgX.jpg
$uploadFile = $upload_folder . $name;
move_uploaded_file($tmp_name, $uploadFile);

//连接数据库，并设置字符编码
$con = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
$con->query("SET NAMES UTF8;");

$sql = "UPDATE `tb_slider` SET `title`=?, `subtitle`=? WHERE `id`=?";

$stmt = $con->prepare($sql);
$stmt->bind_param("ssi", $result['title'], $result['subtitle'], $result['slider_id']);
$stmt->execute();

$stmt->execute();
$stmt->store_result();
$affected_rows = $stmt->affected_rows;

//关闭数据库连接
$stmt->close();
$con->close();

echo $affected_rows;
exit;


