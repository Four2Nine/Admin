<?php
/*
  DZ
 */

require substr(dirname(__FILE__), 0, -10) . 'common\connection.db.php';
require substr(dirname(__FILE__), 0, -10) . 'common\Constant.php';

$projectId = $_POST['id'];
$result = array();
$result['projectDetail'] = getProjectDetail($projectId);

echo json_encode($result);
exit;