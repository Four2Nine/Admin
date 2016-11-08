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