<?php
/**
 * Created by PhpStorm.
 * User: bingo
 * Date: 2016/11/7
 * Time: 9:35
 */

header('Content-Type:text/html;charset=utf-8;');
require substr(dirname(__FILE__), 0, -10) . 'common\connection.db.php';
require substr(dirname(__FILE__), 0, -10) . 'common\Constant.php';

$id=$_POST["id"];
$is_boss=$_POST["is_boss"];
if($is_boss==1){
    return 0;
}

else {

    $con = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
    $con->query("SET NAMES UTF8;");
    $sql = "DELETE FROM `tb_admin`  WHERE `id`=?";
    $stmt = $con->prepare($sql);
    $stmt->bind_param('i', $id);
    $stmt->execute();
    $stmt->store_result();
    $affected_rows = $stmt->affected_rows;
    $stmt->close();
    $con->close();
    echo 1;

}
exit;