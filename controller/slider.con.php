<?php
/**
 * Created by PhpStorm.
 * User: Lishuai
 * Date: 2016/10/30
 * Time: 20:38
 */

//给前端传值
require substr(dirname(__FILE__), 0, -10) . 'common\connection.db.php';
require substr(dirname(__FILE__), 0, -10) . 'common\Constant.php';      //拼接路径

$result = array();

$result['sliderInfo'] = getSliderInfo();

echo json_encode($result);    //js可以直接操作json数据
exit;