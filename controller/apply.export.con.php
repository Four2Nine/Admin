<?php
/**
 * Created by PhpStorm.
 * User: sealiu
 * Date: 2016/10/31
 * Time: 15:43
 */

require substr(dirname(__FILE__), 0, -10) . 'common\connection.db.php';
require substr(dirname(__FILE__), 0, -10) . 'common\Constant.php';
require substr(dirname(__FILE__), 0, -10) . 'common\PHPExcel.php';

$startDate = $_POST['start'];
$endDate = $_POST['end'];
$status = $_POST['status'];

$result = getExportedData($status, $startDate, $endDate);

// 创建对象
$excel = new PHPExcel();

//Excel表格，共29列
$letter = array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'AA', 'AB', 'AC');
$tableHeader = array(
    'ID',
    '用户TOKEN',
    '项目ID',
    '姓名',
    '性别',
    '国籍',
    '手机号',
    '邮箱',
    '微信号',
    '身份证号',
    '护照号',
    '省份',
    '邮寄地址',
    '出发城市',
    '紧急联系人',
    '紧急联系人电话',
    '身份',
    '项目时长',
    '开始时间',
    '饮食要求',
    '有无历史重大疾病',
    '重大疾病',
    '是否是第一次出国',
    '英语水平',
    '是否需要签证保险业协助办理',
    '是否申请面试',
    '面试时间',
    '审核状态',
    '报名时间'
);

$excel->setActiveSheetIndex(0);

//填充表头信息
for ($i = 0; $i < count($tableHeader); $i++) {
    $excel->getActiveSheet()->setCellValue("$letter[$i]" . "1", "$tableHeader[$i]");
}

//填充表格信息
for ($j = 2; $j < count($result)+2; $j++) {
    for ($m = 0; $m < 29; $m++) {
        $excel->getActiveSheet()->setCellValue("$letter[$m]"."$j", $result[$j-2][$m]);
    }

}

//创建Excel输入对象
$write = new PHPExcel_Writer_Excel5($excel);
header("Pragma: public");
header("Expires: 0");
header("Cache-Control:must-revalidate, post-check=0, pre-check=0");
header("Content-Type:application/force-download");
header("Content-Type:application/vnd.ms-excel");
header("Content-Type:application/octet-stream");
header("Content-Type:application/download");;
header('Content-Disposition:attachment;filename="theACP-apply-'.$startDate.'-'.$endDate.'.xls"');
header("Content-Transfer-Encoding:binary");
$write->save('php://output');
