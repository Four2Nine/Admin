<?php
/**
 * Created by PhpStorm.
 * User: liuyang
 * Date: 2017/4/2
 * Time: 17:57
 */
require 'connection.db.php';
require 'Constant.php';

$id = $_POST['id'];
$contact2_name = $_POST['contact2-name'] == null ? "" : $_POST['contact2-name'];
$contact2_desc = $_POST['contact2-desc'] == null ? "" : $_POST['contact2-desc'];

$city = $_POST['service-city']==null?"":$_POST['service-city'];
$type = $_POST['service-type']==null?"":$_POST['service-type'];
$industry = $_POST['industry']==null?"":$_POST['industry'];
$price = $_POST['price']==null?-1:$_POST['price'];
$banner_text = $_POST['banner_text']==null?"":$_POST['banner_text'];
$additional = $_POST['additional']==null?"":$_POST['additional'];

$logo_flag = $_POST['logo-flag'];
$banner_flag = $_POST['banner-flag'];
$detail_flag = $_POST['detail-flag'];

//指定上传图片的路径
$upload_folder = substr(dirname(__FILE__), 0, -10) . 'images/service/';

//如果指定的路径不存在则创建
if (!file_exists($upload_folder)) {
    echo $upload_folder;
    exit;
}

$filesUploadArray = array();

if ($logo_flag == 1 && $_FILES['logo']['error'] == UPLOAD_ERR_OK) {
    $tmp_name = $_FILES['logo']['tmp_name'];
    $name = time().$_FILES['logo']['name'];
    $uploadFile = $upload_folder . $name;
    move_uploaded_file($tmp_name, $uploadFile);
    $filesUploadArray['logo'] = $name;
}

if ($banner_flag == 1 && $_FILES['banner-image']['error'] == UPLOAD_ERR_OK) {
    $tmp_name = $_FILES['banner-image']['tmp_name'];
    $name = time().$_FILES['banner-image']['name'];
    $uploadFile = $upload_folder . $name;
    move_uploaded_file($tmp_name, $uploadFile);
    $filesUploadArray['banner-image'] = $name;
}

if ($detail_flag == 1 && $_FILES['detail-img']['error'] == UPLOAD_ERR_OK) {
    $tmp_name = $_FILES['detail-img']['tmp_name'];
    $name = time().$_FILES['detail-img']['name'];
    $uploadFile = $upload_folder . $name;
    move_uploaded_file($tmp_name, $uploadFile);
    $filesUploadArray['detail-img'] = $name;
}

$con = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
$con->query("SET NAMES UTF8;");

if ($logo_flag == 0 && $banner_flag == 0 && $detail_flag == 0) {
    $sql = "UPDATE `tb_service` SET 
              `service_type` = ?,
              `service_city` = ?,
              `industry` = ?,
              `service_price` = ?,
              `banner_text` = ?,
              `additional` = ?,
              `contact2_name` = ?,
              `contact2_desc` = ?
            WHERE `id` = ?";
    $stmt = $con->prepare($sql);
    $stmt->bind_param("sssissssi",
        $type,
        $city,
        $industry,
        $price,
        $banner_text,
        $additional,
        $contact2_name,
        $contact2_desc,
        $id
    );
} else if ($logo_flag == 0 && $banner_flag == 0 && $detail_flag == 1) {
    $sql = "UPDATE `tb_service` SET 
              `service_type` = ?,
              `service_city` = ?,
              `industry` = ?,
              `service_price` = ?,
              `banner_text` = ?,
              `additional` = ?,
              `service_detail_image` = ?,
              `contact2_name` = ?,
              `contact2_desc` = ?
            WHERE `id` = ?";
    $stmt = $con->prepare($sql);
    $stmt->bind_param("sssisssssi",
        $type,
        $city,
        $industry,
        $price,
        $banner_text,
        $additional,
        $filesUploadArray['detail-img'],
        $contact2_name,
        $contact2_desc,
        $id
    );
} else if ($logo_flag == 0 && $banner_flag == 1 && $detail_flag == 0) {
    $sql = "UPDATE `tb_service` SET 
              `service_type` = ?,
              `service_city` = ?,
              `industry` = ?,
              `service_price` = ?,
              `banner_text` = ?,
              `additional` = ?,
              `banner_image` = ?,
              `contact2_name` = ?,
              `contact2_desc` = ?
            WHERE `id` = ?";
    $stmt = $con->prepare($sql);
    $stmt->bind_param("sssisssssi",
        $type,
        $city,
        $industry,
        $price,
        $banner_text,
        $additional,
        $filesUploadArray['banner-image'],
        $contact2_name,
        $contact2_desc,
        $id
    );
} else if ($logo_flag == 1 && $banner_flag == 0 && $detail_flag == 0) {
    $sql = "UPDATE `tb_service` SET 
              `service_type` = ?,
              `service_city` = ?,
              `industry` = ?,
              `service_price` = ?,
              `banner_text` = ?,
              `additional` = ?,
              `company_logo` = ?,
              `contact2_name` = ?,
              `contact2_desc` = ?
            WHERE `id` = ?";
    $stmt = $con->prepare($sql);
    $stmt->bind_param("sssisssssi",
        $type,
        $city,
        $industry,
        $price,
        $banner_text,
        $additional,
        $filesUploadArray['logo'],
        $contact2_name,
        $contact2_desc,
        $id
    );
} else if ($logo_flag == 0 && $banner_flag == 1 && $detail_flag == 1) {
    $sql = "UPDATE `tb_service` SET 
              `service_type` = ?,
              `service_city` = ?,
              `industry` = ?,
              `service_price` = ?,
              `banner_text` = ?,
              `additional` = ?,
              `banner_image` = ?,
              `service_detail_image` = ?,
              `contact2_name` = ?,
              `contact2_desc` = ?
            WHERE `id` = ?";
    $stmt = $con->prepare($sql);
    $stmt->bind_param("sssissssssi",
        $type,
        $city,
        $industry,
        $price,
        $banner_text,
        $additional,
        $filesUploadArray['banner-image'],
        $filesUploadArray['detail-img'],
        $contact2_name,
        $contact2_desc,
        $id
    );
} else if ($logo_flag == 1 && $banner_flag == 0 && $detail_flag == 1) {
    $sql = "UPDATE `tb_service` SET 
              `service_type` = ?,
              `service_city` = ?,
              `industry` = ?,
              `service_price` = ?,
              `banner_text` = ?,
              `additional` = ?,
              `company_logo` = ?,
              `service_detail_image` = ?,
              `contact2_name` = ?,
              `contact2_desc` = ?
            WHERE `id` = ?";
    $stmt = $con->prepare($sql);
    $stmt->bind_param("sssissssssi",
        $type,
        $city,
        $industry,
        $price,
        $banner_text,
        $additional,
        $filesUploadArray['logo'],
        $filesUploadArray['detail-img'],
        $contact2_name,
        $contact2_desc,
        $id
    );
} else if ($logo_flag == 1 && $banner_flag == 1 && $detail_flag == 0) {
    $sql = "UPDATE `tb_service` SET 
              `service_type` = ?,
              `service_city` = ?,
              `industry` = ?,
              `service_price` = ?,
              `banner_text` = ?,
              `additional` = ?,
              `company_logo` = ?,
              `banner_image` = ?,
              `contact2_name` = ?,
              `contact2_desc` = ?
            WHERE `id` = ?";
    $stmt = $con->prepare($sql);
    $stmt->bind_param("sssisssssssi",
        $type,
        $city,
        $industry,
        $price,
        $banner_text,
        $additional,
        $filesUploadArray['logo'],
        $filesUploadArray['banner-image'],
        $contact2_name,
        $contact2_desc,
        $id
    );
} else {
    $sql = "UPDATE `tb_service` SET 
              `service_type` = ?,
              `service_city` = ?,
              `industry` = ?,
              `service_price` = ?,
              `banner_text` = ?,
              `additional` = ?,
              `company_logo` = ?,
              `banner_image`= ?,
              `service_detail_image` = ?,
              `contact2_name` = ?,
              `contact2_desc` = ?
            WHERE `id` = ?";
    $stmt = $con->prepare($sql);
    $stmt->bind_param("sssisssssssi",
        $type,
        $city,
        $industry,
        $price,
        $banner_text,
        $additional,
        $filesUploadArray['logo'],
        $filesUploadArray['banner-image'],
        $filesUploadArray['detail-img'],
        $contact2_name,
        $contact2_desc,
        $id
    );
}

$stmt->execute();
$stmt->store_result();
$affected_rows = $stmt->affected_rows;
//关闭数据库连接
$stmt->close();
$con->close();
echo $affected_rows;
exit;
