<?php
/**
 * Created by PhpStorm.
 * User: liuyang
 * Date: 2017/4/2
 * Time: 17:57
 */
require 'connection.db.php';
require 'Constant.php';

$result = array();
$id = $_POST["id"];
$name = $_POST["company-name"];
$url = $_POST["company-website"];
$contact = $_POST["contact-name"];
$phone = $_POST["contact-phone-number"];
$email = $_POST["contact-email"];
$desc = $_POST['contact-desc'];

$con = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
$con->query("SET NAMES UTF8;");
$sql = "UPDATE `tb_service` SET 
            `company_name` = ?, 
            `company_website` = ?, 
            `contact_name` = ?, 
            `contact_phone_number` = ?, 
            `contact_email` = ?,
            `contact_desc`=?
        WHERE `id`=?";

$stmt = $con->prepare($sql);
$stmt->bind_param("ssssssi", $name, $url, $contact, $phone, $email, $desc, $id);

$stmt->execute();
$stmt->store_result();

$affected_rows = $stmt->affected_rows;

$stmt->close();
$con->close();

echo $affected_rows;
exit;
