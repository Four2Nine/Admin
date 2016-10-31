<?php
/**
 * Created by PhpStorm.
 * User: liuyang
 * Date: 2016/10/31
 * Time: 0:04
 */

require substr(dirname(__FILE__), 0, -10) . 'common\connection.db.php';
require substr(dirname(__FILE__), 0, -10) . 'common\Constant.php';

$applyId = $_POST['id'];
$result = array();
$result['applyDetail'] = getApplyDetail($applyId);

echo json_encode($result);
exit;