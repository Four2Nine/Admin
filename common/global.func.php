<?php
/**
 * Created by PhpStorm.
 * User: liuyang
 * Date: 2016/10/23
 * Time: 16:23
 */

function generateToken($username, $password, $salt)
{
    $cookies = array();
    $cookies['username'] = $username;
    $cookies['password'] = $password;
    $cookies['salt'] = $salt;
    return md5(serialize($cookies));
}


function toUTF8($str)
{
    $encode = mb_detect_encoding($str, array('ASCII', 'UTF-8', 'GB2312', 'GBK'));
    if (!$encode == 'UTF-8') {
        $str = iconv('UTF-8', $encode, $str);
    }
    return $str;
}