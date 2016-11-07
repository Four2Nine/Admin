<?php
header("Content-type: text/html;charset=utf-8");

require substr(dirname(__FILE__), 0, -10) . 'common\connection.db.php';
require substr(dirname(__FILE__), 0, -10) . 'common\Constant.php';
require substr(dirname(__FILE__), 0, -10) . 'common\connectadd.db.php';

$conn = new SqlTool();
$acpname = $_POST['aname'];
$acpcity = $_POST['acity'];
$acpdate = $_POST['adate'];
$acpday = $_POST['aday'];
$acptheme = $_POST['atheme'];
$acpbright = $_POST['abright'];
$acpmean = $_POST['amean'];
$acpdetail = $_POST['adetail'];
$acptip = $_POST['atip'];
$acppushdate = date("Y-m-d H:i:m");
$upcount = $_POST['file_num'];
$dest_folder = "picture/";


if (!file_exists($dest_folder)) {
    if (mkdir($dest_folder)) {

    }//end of if(mkdir($dest_folder))
    else {
        echo "创建文件夹失败<br/>";
    }
}

$echo = "";
for ($i = 0; $i < $upcount; $i++) {
    if ($_FILES['pictures'.$i]['error'] == UPLOAD_ERR_OK) {
        $tmp_name = $_FILES['pictures'.$i]['tmp_name'];
        $name = $_FILES['pictures'.$i]['name'];
        $uploadfile = $dest_folder . $name;
        $filepath = "../acpadmin/pic/";
        $filepath = $filepath . $uploadfile;
        move_uploaded_file($tmp_name, $uploadfile);
        $arrupload[] = $uploadfile;
    }
}

//
//foreach ($_FILES["pictures"]["error"] as $key => $error) {
//    if ($error == UPLOAD_ERR_OK) {
//        $tmp_name = $_FILES["pictures"]["tmp_name"][$key];
//        $name = $_FILES["pictures"]["name"][$key];
//        $uploadfile = $dest_folder . $name;
//        $filepath = "../acpadmin/pic/";
//        $filepath = $filepath . $uploadfile;
//        move_uploaded_file($tmp_name, $uploadfile);
//        $arrupload[] = $uploadfile;
//    } else {
//        echo 'Error: ' . $_FILES['file']['error'] . '<br>';
//        exit;
//    }
//}


$acppicture = implode("@", $arrupload);
$sql = "INSERT INTO `db_acp`.`tb_project` (`acpname`, `acpcity`,`acpdate`,`acpday`,`acptheme`, `acpbright`,`acpmean`,`acpdetail`, `acptip`,`acppicture`,`acppushdate` ) VALUES ( '$acpname','$acpcity','$acpdate','$acpday','$acptheme','$acpbright','$acpmean','$acpdetail','$acptip','$acppicture','$acppushdate')";
$b = $conn->execute_dml($sql);

if ($b) {
    echo Constant::$_CORRECT;
    exit;
} else {
    echo Constant::$_DB_INSERT_ERROR;
    exit;
}



  