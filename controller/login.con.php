<?php
/**
 * 管理员登录
 *
 * Created by PhpStorm.
 * User: liuyang
 * Date: 2016/10/24
 * Time: 10:32
 */
require 'connection.db.php';
require 'global.func.php';
require 'Constant.php';

$data = array();    //接收登录表单传值
$result = array();  //存储返回值，登录是否成功

$data['username'] = $_POST["username"];
$data['password'] = md5($_POST["password"] . Constant::$_SALT);
//连接数据库，并设置字符编码
$con = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
$con->query("SET NAMES UTF8;");

//表中是否存在相同用户名
$sql = "SELECT * FROM `tb_admin` WHERE `username` COLLATE utf8_bin = ? LIMIT 1";
$stmt = $con->prepare($sql);
$stmt->bind_param("s", $data['username']);
$stmt->execute();
$stmt->store_result();

$isExist = $stmt->fetch();

if ($isExist) {
    $result['status'] = Constant::$_CORRECT;
} else {
    $result['status'] = Constant::$_USERNAME_NOT_FOUND_ERROR;
    echo json_encode($result);
    exit;
}


//验证用户名和密码是否正确
$sql = "SELECT `is_active` FROM `tb_admin` WHERE `username` = ? AND `password` = ? LIMIT 1";
$stmt = $con->prepare($sql);
$stmt->bind_param("ss", $data['username'], $data['password']);
$stmt->execute();
$stmt->store_result();
$stmt->bind_result($is_active);

$loginSuccess = $stmt->fetch();

if ($loginSuccess) {
    if ($is_active == 0) {
        $result['status'] = Constant::$_USER_DISABLED;
        echo json_encode($result);
        exit;
    }
    $result['status'] = Constant::$_CORRECT;
} else {
    $result['status'] = Constant::$_PASSWORD_INCORRECT_ERROR;
    echo json_encode($result);
    exit;
}

$stmt->close();
$con->close();

//登录成功，生成token值
$token = generateToken($data['username'], $data['password'], Constant::$_SALT);

setcookie('__username', $data['username']);
setcookie('__password', $data['password']);
setcookie('__token', $token);

echo json_encode($result);