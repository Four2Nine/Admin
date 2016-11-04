<?php
/**
 * Created by PhpStorm.
 * User: Lishuai
 * Date: 2016/10/31
 * Time: 15:43
 */

require substr(dirname(__FILE__), 0, -10) . 'common\connection.db.php';
require substr(dirname(__FILE__), 0, -10) . 'common\Constant.php';

$result = array();

$result['slider_id'] = $_POST['slider_id'];
$result['title'] = $_POST['title'];
$result['subtitle'] = $_POST['subtitle'];


$dest_floder = substr(dirname(__FILE__), 0, -10) .'images\slider\\';
$tmp_name = $_FILES["picture"]["tmp_name"];
$name = $_FILES["picture"]["name"];
$uploadfile = $dest_floder.$name;
move_uploaded_file($tmp_name,$uploadfile);


//echo json_encode($result); //返回的是数组对象
//exit;

//数据库操作
$is_uploaded = move_uploaded_file($tmp_name,$uploadfile);

$result['img_path'] = $name;
$data = updateSliderInfo($result['img_path'], $result['title'], $result['subtitle'], $result['slider_id']);

echo $data;
exit;


