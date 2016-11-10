<?php
/**
 * Created by PhpStorm.
 * User: liuyang
 * Date: 2016/10/26
 * Time: 0:37
 */

require 'connection.db.php';
require 'global.func.php';
require 'Constant.php';

$result = array();

//验证Cookie是否存在
$result['status'] = is_cookie_exist();
if ($result['status'] != Constant::$_CORRECT) {
    echo json_encode($result);
    exit;
}

//验证token是否正确
$result['status'] = is_token_correct();

echo json_encode($result);
exit;


//-----------------------------------------------------------------------
//-----------------------------------------------------------------------

/**
 * 检测cookie是否存在
 * __token
 * __username
 * __password
 * @return int
 */
function is_cookie_exist()
{
    if (!(isset($_COOKIE['__token']) && isset($_COOKIE['__username'])
        && isset($_COOKIE['__password']))
    ) {
        return Constant::$_NOT_LOGIN;
    } else {
        return Constant::$_CORRECT;
    }
}

/**
 * 检测token是否正确
 * @return int
 */
function is_token_correct()
{
    if ($_COOKIE['__token'] ==
        generateToken($_COOKIE['__username'], $_COOKIE['__password'], Constant::$_SALT)
    ) {
        return Constant::$_CORRECT;
    } else {
        return Constant::$_TOKEN_INCORRECT;
    }
}