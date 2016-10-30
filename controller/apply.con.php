<?php
/**
 * Created by PhpStorm.
 * User: liuyang
 * Date: 2016/10/27
 * Time: 23:56
 */

require substr(dirname(__FILE__), 0, -10) . 'common\connection.db.php';
require substr(dirname(__FILE__), 0, -10) . 'common\Constant.php';

$currentPage = (int)$_GET['currentPage'];
$itemsNumberPerPage = 30;

$result = array();

$result['applyNum'] = getApplyCount();
$result['applyInfo'] = getApplyInfo(($currentPage - 1) * $itemsNumberPerPage, $itemsNumberPerPage);

echo json_encode($result);
exit;