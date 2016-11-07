<?php
/*
  DZ
 
 */

require substr(dirname(__FILE__), 0, -10) . 'common\connection.db.php';
require substr(dirname(__FILE__), 0, -10) . 'common\Constant.php';

$result = array();
$result['acpname'] = $_POST["acpname"];
$result['acpcity'] = $_POST["acpcity"];
$result['acpdate'] = $_POST["acpdate"];
$result['acpday'] = $_POST["acpday"];
$result['acptheme'] = $_POST["acptheme"];
$result['acpbright'] = $_POST["acpbright"];
$result['projectid'] = $_POST["projectid"];

$resl = updateproject($result['projectid'],$result['acpname'], $result['acpcity'], $result['acpdate'], $result['acpday'], $result['acptheme'], $result['acpbright']);

echo $resl;
exit;