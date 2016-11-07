<?php
/*
  DZ
 */

require substr(dirname(__FILE__), 0, -10) . 'common\connection.db.php';
require substr(dirname(__FILE__), 0, -10) . 'common\Constant.php';

$currentPage = (int)$_GET['currentPage'];
$itemsNumberPerPage = 5;

$result = array();

$result['applyNum'] = getProjectCount();
$result['applyInfo'] = getProjectInfo(($currentPage - 1) * $itemsNumberPerPage, $itemsNumberPerPage);

echo json_encode($result);
exit;