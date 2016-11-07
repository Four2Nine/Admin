<?php
/*
  DZ
 
 */

require substr(dirname(__FILE__), 0, -10) . 'common\connection.db.php';
require substr(dirname(__FILE__), 0, -10) . 'common\Constant.php';

$upvipId = $_POST['id'];
//$result = array();
$rel= deleupvipDetail($upvipId);

echo $rel;
exit;