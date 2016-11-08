<?php
/*
 * 修改项目信息
 *
 * DZ
 */

require 'connection.db.php';
require 'Constant.php';

$result = array();
$id = $_POST["projectid"];
$name = $_POST["acpname"];
$city = $_POST["acpcity"];
$date = $_POST["acpdate"];
$day = $_POST["acpday"];
$theme = $_POST["acptheme"];
$bright = $_POST["acpbright"];

$con = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
$con->query("SET NAMES UTF8;");
$sql = "UPDATE `tb_project` SET 
            `acpname` = ?, 
            `acpcity` = ?, 
            `acpdate` = ?, 
            `acpday` = ?, 
            `acptheme` = ?, 
            `acpbright` = ? 
        WHERE `id`=?";

$stmt = $con->prepare($sql);
$stmt->bind_param("sssissi", $name, $city, $date, $day, $theme, $bright, $id);

$stmt->execute();
$stmt->store_result();

$affected_rows = $stmt->affected_rows;

$stmt->close();
$con->close();

echo $affected_rows;
exit;