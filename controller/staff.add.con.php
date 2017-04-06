<?php

require 'connection.db.php';
require 'Constant.php';

$name = $_POST["name"];
$desc= $_POST["desc"];
$duties = $_POST["duties"];
$email = $_POST["email"];
$phone = $_POST["phone"];
$image_flag = $_POST["image-flag"];

//指定上传图片的路径
$upload_folder = substr(dirname(__FILE__), 0, -10) . 'images\\';
$upload_folder = $upload_folder . $subFile . '\\';

//如果指定的路径不存在则创建
if (!file_exists($upload_folder)) {
    if (mkdir($upload_folder)) {

    } else {
        echo 0;
        exit;
    }
}

$fileUpload = "";

if ($image_flag == 1 && $_FILES['image']['error'] == UPLOAD_ERR_OK) {
    $tmp_name = $_FILES['image']['tmp_name'];
    $name = $_FILES['image']['name'];
    $uploadFile = $upload_folder . $name;
    move_uploaded_file($tmp_name, $uploadFile);
    $fileUpload = $name;
} else {
    $fileUpload = "";
}

$con = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
$con->query("SET NAMES UTF8;");

$sql = "INSERT INTO tb_staff (image, name, description, duties, email, phone) VALUE (?, ?, ?, ?, ?, ?)";
$stmt = $con->prepare($sql);
$stmt->bind_param("ssssss", $fileUpload, $name, $desc, $duties, $email, $phone);
$stmt->execute();

$affected_rows = $stmt->affected_rows;

//关闭数据库连接
$stmt->close();
$con->close();

echo $affected_rows;
exit;