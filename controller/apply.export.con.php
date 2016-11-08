<?php
/**
 * 导出报名表信息到 EXCEL 表格
 *
 * Created by PhpStorm.
 * User: sealiu
 * Date: 2016/10/31
 * Time: 15:43
 */

require 'connection.db.php';
require 'Constant.php';
require 'PHPExcel.php';

$start = $_POST['start'];
$end = $_POST['end'];
$status = $_POST['status'];


//使用PDO连接数据库
$pdo = new PDO('mysql:host=' . DB_HOST . ';dbname=' . DB_NAME, DB_USER, DB_PWD);
$pdo->query("SET NAMES UTF8;");

// 利用该标志位，确定该绑定哪些参数
// status|end|start
// ---依次对应--->(2进制)
// 4|2|1
$bind_flag = 0;
$sql = "SELECT * FROM `tb_apply` WHERE 1 ";
if ($start != "") {
    $bind_flag += 1;
    $sql .= "AND `apply_time` > ? ";
}

if ($end != "") {
    $bind_flag += 2;
    $sql .= "AND `apply_time` < ? ";
}

if ($status != "-1") {
    $bind_flag += 4;
    $sql .= "AND `status` = ? ";
}
$stmt = $pdo->prepare($sql);
switch ($bind_flag) {
    case 1:
        $stmt->bindParam(1, $start, PDO::PARAM_STR);
        break;
    case 2:
        $stmt->bindParam(1, $end, PDO::PARAM_STR);
        break;
    case 3:
        $stmt->bindParam(1, $start, PDO::PARAM_STR);
        $stmt->bindParam(2, $end, PDO::PARAM_STR);
        break;
    case 4:
        $stmt->bindParam(1, $status, PDO::PARAM_STR);
        break;
    case 5:
        $stmt->bindParam(1, $start, PDO::PARAM_STR);
        $stmt->bindParam(2, $status, PDO::PARAM_STR);
        break;
    case 6:
        $stmt->bindParam(1, $end, PDO::PARAM_STR);
        $stmt->bindParam(2, $status, PDO::PARAM_STR);
        break;
    case 7:
        $stmt->bindParam(1, $start, PDO::PARAM_STR);
        $stmt->bindParam(2, $end, PDO::PARAM_STR);
        $stmt->bindParam(3, $status, PDO::PARAM_STR);
        break;
}

$stmt->execute();
$result = $stmt->fetchAll();

$stmt->closeCursor();
$pdo = null;

//创建EXCEL对象
$excel = new PHPExcel();

//Excel表格，共29列
$letter = array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'AA', 'AB', 'AC');
//设置Excel的表头
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

//设置当前的sheet为0
$excel->setActiveSheetIndex(0);

//填充EXCEL表头信息
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
header('Content-Disposition:attachment;filename="theACP-apply-' . $start . '-' . $end . '.xls"');
header("Content-Transfer-Encoding:binary");
$write->save('php://output');
