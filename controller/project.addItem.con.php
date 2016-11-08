<?php
/**
 *  新增一个项目
 */
require 'connection.db.php';
require 'Constant.php';

$name = $_POST['aname'];
$city = $_POST['acity'];
$date = $_POST['adate'];
$day = $_POST['aday'];
$theme = $_POST['atheme'];
$bright = $_POST['abright'];
$mean = $_POST['amean'];
$detail = $_POST['adetail'];
$tip = $_POST['atip'];
$fileCount = $_POST['file_num'];

//指定上传图片的路径
$upload_folder = substr(dirname(__FILE__), 0, -16) . 'theACP\images\project\\';
//如果指定的路径不存在则创建
if (!file_exists($upload_folder)) {
    if (mkdir($upload_folder)) {

    } else {
        echo "创建文件夹失败<br/>";
    }
}

//创建一个数组接收上传的图片信息
$filesUploadArray = array();
//遍历上传的图片，依次上传后保存图片名称到数组 $filesUploadArray 中
for ($i = 0; $i < $fileCount; $i++) {
    if ($_FILES['pictures' . $i]['error'] == UPLOAD_ERR_OK) {
        $tmp_name = $_FILES['pictures' . $i]['tmp_name'];
        $name = $_FILES['pictures' . $i]['name'];
        $uploadFile = $upload_folder . $name;
        move_uploaded_file($tmp_name, $uploadFile);
        $filesUploadArray[$i] = $uploadFile;
    }
}

//将数组以@为间隔连接成为字符串，准备存储在数据库中
$pictures = implode("@", $filesUploadArray);

//连接数据库，并设置字符编码
$con = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
$con->query("SET NAMES UTF8;");

//定义SQL语句
$sql = "INSERT INTO `tb_project` (
    `acpname`, 
    `acpcity`,
    `acpdate`,
    `acpday`,
    `acptheme`, 
    `acpbright`,
    `acpmean`,
    `acpdetail`, 
    `acptip`,
    `acppicture` ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

//绑定变量
$stmt = $con->prepare($sql);
$stmt->bind_param('sssissssss',
    $name,
    $city,
    $date,
    $day,
    $theme,
    $bright,
    $mean,
    $detail,
    $tip,
    $pictures
);

$stmt->execute();
$stmt->store_result();

$affected_rows = $stmt->affected_rows;

//关闭数据库连接
$stmt->close();
$con->close();

//插入成功返回 $_CORRECT，否则返回插入错误 $_DB_INSERT_ERROR
if ($affected_rows == 1) {
    echo Constant::$_CORRECT;
    exit;
} else {
    echo Constant::$_DB_INSERT_ERROR;
    exit;
}



  