<?php
/*
  DZ
  会员
 */

require substr(dirname(__FILE__), 0, -10) . 'common\connection.db.php';
require substr(dirname(__FILE__), 0, -10) . 'common\Constant.php';

$result = array();
$result['username'] = $_POST["username"];
$result['password'] = $_POST["password"];
$result['balance'] = $_POST["balance"];
$result['upvipid'] = $_POST["upvipid"];
$result['password'] = md5($result['password'] . Constant::$_SALT);
$token = generateToken($result['username'], $result['password'], Constant::$_SALT);
$result['token'] = $token;
$resl = updatevip($result['upvipid'],$result['token'],$result['username'], $result['password'], $result['balance']);

echo $resl;
exit;