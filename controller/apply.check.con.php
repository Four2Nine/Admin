<?php
/**
 * Created by PhpStorm.
 * User: liuyang
 * Date: 2016/11/1
 * Time: 23:32
 */

require substr(dirname(__FILE__), 0, -10) . 'common\connection.db.php';
require substr(dirname(__FILE__), 0, -10) . 'common\Constant.php';

$check = $_POST['check'];

echo checkApply($check);
exit;