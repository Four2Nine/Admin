<?php
/**
 * 添加一个管理员
 *
 * Created by PhpStorm.
 * User: bingo
 * Date: 2016/11/05
 * Time: 23:36
 */

require 'connection.db.php';
require 'global.func.php';
require 'Constant.php';

$data = array();
$result = array();

$data['username'] = $_POST["username"];
$data['password'] = $_POST["password"];
$data['password_confirm'] = $_POST["password_confirm"];

$result['status'] = check_username($data['username'], 20);
$result['status'] = check_password($data['password'], $data['password_confirm'], 6);
if ($result['status'] != Constant::$_CORRECT) {
    echo json_encode($result);
    exit;
}

//连接数据库，并设置字符编码
$con = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
$con->query("SET NAMES UTF8;");

//确定数据格式正确后，再查找数据库，看有没有重名
$sqlRepeat = "SELECT `id` FROM `tb_admin` WHERE `username` = ? LIMIT 1";
$stmt = $con->prepare($sqlRepeat);
$stmt->bind_param("s", $data['username']);
$stmt->execute();
$stmt->store_result();
$stmt->bind_result($ids);

$isRepeat = $stmt->fetch();
if ($isRepeat) {
    //有重名
    $result['status'] = Constant::$_USERNAME_REPEAT_ERROR;
    echo json_encode($result);
    exit;
} else {
    $result['status'] = Constant::$_CORRECT;
}


//没有重名，可以注册
//加密密码，生成token
$data['password'] = md5($data['password'] . Constant::$_SALT);
$token = generateToken($data['username'], $data['password'], Constant::$_SALT);

//增加一个管理员
$sqlAdd = "INSERT INTO `tb_admin` (
                    `token`,
                    `username`,
                    `password`
              ) VALUE (?, ?, ?)";

$stmt = $con->prepare($sqlAdd);
$stmt->bind_param("sss", $token, $data['username'], $data['password']);
$stmt->execute();

$affected_rows = $stmt->affected_rows;

if ($affected_rows == 1) {
    $result['status'] = Constant::$_CORRECT;
} else {
    $result['status'] = Constant::$_DB_INSERT_ERROR;
    echo json_encode($result);
    exit;
}

//添加成功，设置COOKIE
setcookie('__username', $data['username']);
setcookie('__password', $data['password']);
setcookie('__token', $token);

//关闭数据库连接
$stmt->close();
$con->close();

echo json_encode($result);
exit;


//-----------------------------------------------------------------
//  检测函数
//-----------------------------------------------------------------

//检查用户名
function check_username($string, $max_len)
{
    $string = trim($string);
    if (mb_strlen($string, 'utf-8') < 1) {
        return Constant::$_USERNAME_BLANK_ERROR;
    }
    if (mb_strlen($string, 'utf-8') > $max_len) {
        return Constant::$_USERNAME_LENGTH_ERROR;
    }

    if (!(preg_match('/^[a-zA-Z0-9_\x{4e00}-\x{9fa5}]+$/u', $string))) {
        return Constant::$_USERNAME_FORMAT_ERROR;
    }

    return Constant::$_CORRECT;
}

//检查密码
function check_password($first_pass, $end_pass, $min_len)
{
    if ($first_pass != $end_pass) {
        return Constant::$_PASSWORD_INCONSISTENT_ERROR;
    }
    if (mb_strlen($first_pass) < $min_len) {
        return Constant::$_PASSWORD_LENGTH_ERROR;
    }
    return Constant::$_CORRECT;
}