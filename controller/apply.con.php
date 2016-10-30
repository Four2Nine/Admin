<?php
/**
 * Created by PhpStorm.
 * User: liuyang
 * Date: 2016/10/27
 * Time: 23:56
 */

require substr(dirname(__FILE__), 0, -10) . 'common\connection.db.php';
require substr(dirname(__FILE__), 0, -10) . 'common\Constant.php';

$result = array();

$result['currentPage'] = (int)$_GET['currentPage'];

$result['pageNum'] = getApplyCount();
$applyInfo = getApplyInfo(($result['currentPage'] - 1) * 10, 10);

if ($applyInfo == null) {
    $result['apply_info_status'] = Constant::$_DB_SELECT_ERROR;
} else {
    $result["apply_info_status"] = Constant::$_CORRECT;
    $result["apply_info"] = $applyInfo;
}

echo json_encode($result);
exit;

