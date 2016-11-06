<?php
/**
 * Created by PhpStorm.
 * User: bingo
 * Date: 2016/11/5
 * Time: 14:01
 */
require substr(dirname(__FILE__), 0, -10) . 'common\connection.db.php';
require substr(dirname(__FILE__), 0, -10) . 'common\Constant.php';


$result = array();

$result['adminInfo'] = getAdminInfo();


echo json_encode($result);
exit;