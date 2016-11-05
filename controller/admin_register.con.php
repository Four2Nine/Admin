<?php
/**
 * Created by PhpStorm.
 * User: bingo
 * Date: 2016/11/05
 * Time: 23:36
 */
require substr(dirname(__FILE__), 0, -10) . 'common\connection.db.php';
require substr(dirname(__FILE__), 0, -10) . 'common\Constant.php';

$result = array();

$result['username'] = $_POST["username"];
$result['password'] = $_POST["password"];
$result['password_confirm'] = $_POST["password_confirm"];

$result['status'] = check_username($result['username'], 20);
$result['status'] = check_password($result['password'], $result['password_confirm'], 6);
if ($result['status'] != Constant::$_CORRECT) {
    echo json_encode($result);
    exit;
}

//确定数据格式正确后，再查找数据库，看有没有重名
$result['status'] = is_username_repeat($result['username']);
if ($result['status'] != Constant::$_CORRECT) {
    echo json_encode($result);
    exit;
}

$result['password'] = md5($result['password'] . Constant::$_SALT);
$token = generateToken($result['username'], $result['password'], Constant::$_SALT);
$result['token'] = $token;

//增加一个会员用户
$result['status'] = add_user($result);
if ($result['status'] != Constant::$_CORRECT) {
    echo json_encode($result);
    exit;
}

setcookie('__username', $result['username']);
setcookie('__token', $token);

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

//检查数据库
function is_username_repeat($username)
{
    if (isExist(toUTF8($username)))
        return Constant::$_USERNAME_REPEAT_ERROR;
    else
        return Constant::$_CORRECT;
}

//新增用户
function add_user($result)
{
    /**
     * $invitationCode = generateInvitationCode($result['username'], $result['password']);
    管理员不需要邀请码
    */
    if (addUser($result['token'], $result['username'], $result['password']))
        return Constant::$_CORRECT;
    else
        return Constant::$_DB_INSERT_ERROR;
}