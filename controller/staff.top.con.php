<?php

require 'connection.db.php';
require 'Constant.php';

$id = $_POST["id"];
$top = $_POST["top"];

$con = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
$con->query("SET NAMES UTF8;");

$sql = "UPDATE tb_staff SET 
                  `is_top` = ?,
                  `create_time` = now()
            WHERE `id` = ?";
$stmt = $con->prepare($sql);
$stmt->bind_param("ii", $top, $id);

$stmt->execute();
$affected_rows = $stmt->affected_rows;

//关闭数据库连接
$stmt->close();
$con->close();

echo $affected_rows;
exit;