<?php
/**
 * Created by PhpStorm.
 * User: bingo
 * Date: 2016/10/24
 * Time: 16:38
 */
/**
 * @param $value //用户名
 * @return bool     //表中是否存在相同用户名
 */
function isExist($value)
{
    $con = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
    $con->query("SET NAMES UTF8;");
    $sql = "SELECT `id` FROM `tb_admin` WHERE `username` = ? LIMIT 1";
    $stmt = $con->prepare($sql);
    $stmt->bind_param("s", $value);
    $stmt->execute();

    $stmt->store_result();
    $stmt->bind_result($ids);

    $isExist = false;
    while ($stmt->fetch()) {
        $isExist = true;
    }

    $stmt->close();
    $con->close();
    return $isExist;
}

/**
 * @param $value1 //用户名
 * @param $value2 //密码
 * @return bool     //是否存在该用户
 */
function attemptLogin($value1, $value2)
{
    $con = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
    $con->query("SET NAMES UTF8;");
    $sql = "SELECT `id` FROM `tb_admin` WHERE `username` = ? AND `password` = ? LIMIT 1";
    $stmt = $con->prepare($sql);
    $stmt->bind_param("ss", $value1, $value2);
    $stmt->execute();

    $stmt->store_result();
    $stmt->bind_result($ids);

    $isExist = false;
    while ($stmt->fetch()) {
        $isExist = true;
    }

    $stmt->close();
    $con->close();
    return $isExist;
}

/**
 * @param $token //__token
 * @param $name //用户名
 * @param $password //密码
 * @return bool //是否添加成功
 */
function addUser($token, $name, $password)
{
    $con = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
    $con->query("SET NAMES UTF8;");

    $sql = "INSERT INTO `tb_admin` (
                    `token`,
                    `username`,
                    `password`
              ) VALUE (?, ?, ?)";

    $stmt = $con->prepare($sql);
    $stmt->bind_param("sss", $token, $name, $password);
    $stmt->execute();

    $affected_rows = $stmt->affected_rows;
    $stmt->close();
    $con->close();
    return $affected_rows == 1 ? true : false;
}

/**
 * @param $token //__token
 * @return bool //token 是否存在
 */
function checkToken($token)
{
    $con = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
    $con->query("SET NAMES UTF8;");
    $sql = "SELECT `id` FROM `tb_admin` WHERE `token` = ? LIMIT 1";
    $stmt = $con->prepare($sql);
    $stmt->bind_param("s", $token);
    $stmt->execute();

    $stmt->store_result();
    $stmt->bind_result($ids);

    $result = false;
    while ($stmt->fetch()) {
        $result = true;
    }

    $stmt->close();
    $con->close();
    return $result;
}


/**
 * @param $token //__token
 * @param $username //用户名
 * @return array    //用户信息--数组，否则为空
 *  */
function getUserInfo($token, $username)
{
    $con = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
    $con->query("SET NAMES UTF8;");
    $sql = "SELECT `username` FROM `tb_admin` WHERE `token` = ? AND `username` = ? LIMIT 1";
    $stmt = $con->prepare($sql);
    $stmt->bind_param("ss", $token, $username);
    $stmt->execute();

    $stmt->store_result();
    $stmt->bind_result($username);

    $result = array();
    while ($stmt->fetch()) {
        $result['username'] = $username;
    }
    $stmt->close();
    $con->close();
    return $result;
}

function getApplyInfo($start, $num)
{
    $con = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
    $con->query("SET NAMES UTF8;");
    $sql = "SELECT `id`, `project_id`, `name`, `phone_number`, `email`, `wechat`, `status` 
FROM `tb_apply` LIMIT ?, ?";
    $stmt = $con->prepare($sql);
    $stmt->bind_param("ii", $start, $num);
    $stmt->execute();

    $stmt->store_result();
    $stmt->bind_result($id, $project_id, $name, $phone_number, $email, $wechat, $status);

    $result = array();
    while ($stmt->fetch()) {
        $item = array();
        $item['id'] = $id;
        $item['project_id'] = $project_id;
        $item['name'] = $name;
        $item['phone_number'] = $phone_number;
        $item['email'] = $email;
        $item['wechat'] = $wechat;
        switch ($status) {
            case 0:
                $item['status'] = "待审核";
                break;
            case 1:
                $item['status'] = "审核通过";
                break;
            case 2:
                $item['status'] = "审核拒绝";
        }
        $result[$id] = $item;
    }
    $stmt->close();
    $con->close();
    return $result;
}

function getUsersInfo($start, $num)
{

    $con = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
    $con->query("SET NAMES UTF8;");
    $sql = "SELECT `id`, `username`, `password`, `balance` 
FROM `tb_user` LIMIT ?, ?";
    $stmt = $con->prepare($sql);
    $stmt->bind_param("ii", $start, $num);
    $stmt->execute();

    $stmt->store_result();
    $stmt->bind_result($id, $username, $password, $balance);

    $result = array();
    while ($stmt->fetch()) {
        $item = array();
        $item['id'] = $id;
        $item['username'] = $username;
        $item['password'] = $password;
        $item['balance'] = $balance;


        $result[$id] = $item;
    }
    $stmt->close();
    $con->close();
    return $result;
}



function getProjectInfo($start, $num)
{

    $con = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
    $con->query("SET NAMES UTF8;");
    $sql = "SELECT `id`, `acpname`, `acpcity`, `acpdate`, `acpday`, `acppushdate` 
FROM `tb_project` LIMIT ?, ?";
    $stmt = $con->prepare($sql);
    $stmt->bind_param("ii", $start, $num);
    $stmt->execute();

    $stmt->store_result();
    $stmt->bind_result($id, $acpname, $acpcity, $acpdate, $acpday, $acppushdate);

    $result = array();
    while ($stmt->fetch()) {
        $item = array();
        $item['id'] = $id;
        $item['acpname'] = $acpname;
        $item['acpcity'] = $acpcity;
        $item['acpdate'] = $acpdate;
        $item['acpday'] = $acpday;
        $item['acppushdate'] = $acppushdate;

        $result[$id] = $item;
    }
    $stmt->close();
    $con->close();
    return $result;
}


function getUsersCount()
{
    $con = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
    $con->query("SET NAMES UTF8;");
    $sql = "SELECT * FROM `tb_user`";
    $stmt = $con->prepare($sql);
    $stmt->execute();
    $stmt->store_result();
    $count = $stmt->num_rows;
    $stmt->close();
    $con->close();
    return $count;
}


function getApplyCount()
{
    $con = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
    $con->query("SET NAMES UTF8;");
    $sql = "SELECT * FROM `tb_apply`";
    $stmt = $con->prepare($sql);
    $stmt->execute();
    $stmt->store_result();
    $count = $stmt->num_rows;
    $stmt->close();
    $con->close();
    return $count;
}

function getProjectCount()
{
    $con = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
    $con->query("SET NAMES UTF8;");
    $sql = "SELECT * FROM `tb_project`";
    $stmt = $con->prepare($sql);
    $stmt->execute();
    $stmt->store_result();
    $count = $stmt->num_rows;
    $stmt->close();
    $con->close();
    return $count;
}

function getApplyDetail($id)
{
    $con = new PDO('mysql:host=' . DB_HOST . ';dbname=' . DB_NAME, DB_USER, DB_PWD);
    $con->query("SET NAMES UTF8;");
    $sql = "SELECT * FROM `tb_apply` WHERE `id` = ?";
    $stmt = $con->prepare($sql);
    $stmt->bindParam(1, $id, PDO::PARAM_INT);
    $stmt->execute();

    $result = $stmt->fetchObject();
    return $result;
}

function getProjectDetail($id)
{
    $con = new PDO('mysql:host=' . DB_HOST . ';dbname=' . DB_NAME, DB_USER, DB_PWD);
    $con->query("SET NAMES UTF8;");
    $sql = "SELECT * FROM `tb_project` WHERE `id` = ?";
    $stmt = $con->prepare($sql);
    $stmt->bindParam(1, $id, PDO::PARAM_INT);
    $stmt->execute();

    $result = $stmt->fetchObject();
    return $result;
}

function getupvipDetail($id)
{
    $con = new PDO('mysql:host=' . DB_HOST . ';dbname=' . DB_NAME, DB_USER, DB_PWD);
    $con->query("SET NAMES UTF8;");
    $sql = "SELECT * FROM `tb_user` WHERE `id` = ?";
    $stmt = $con->prepare($sql);
    $stmt->bindParam(1, $id, PDO::PARAM_INT);
    $stmt->execute();

    $result = $stmt->fetchObject();
    return $result;
}




function getExportedData($status, $start, $end)
{
    $con = new PDO('mysql:host=' . DB_HOST . ';dbname=' . DB_NAME, DB_USER, DB_PWD);
    $con->query("SET NAMES UTF8;");

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
    $stmt = $con->prepare($sql);
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
    return $result;
}

function checkApply($id, $check) {
    $con = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
    $con->query("SET NAMES UTF8;");
    $sql = "UPDATE `tb_apply` SET `status` = ? WHERE `id`=?";
    $stmt = $con->prepare($sql);
    $stmt->bind_param('ii', $check, $id);

    $stmt->execute();
    $stmt->store_result();

    $affected_rows = $stmt->affected_rows;

    $stmt->close();
    $con->close();
    return $affected_rows;
}

function updateproject($id, $acpname, $acpcity, $acpdate, $acpday, $acptheme, $acpbright) {
    $con = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
    $con->query("SET NAMES UTF8;");
    $sql = "UPDATE `tb_project` SET `acpname` = ?, `acpcity` = ?, `acpdate` = ?, `acpday` = ?, `acptheme` = ?, `acpbright` = ? WHERE `id`=?";
    $stmt = $con->prepare($sql);
    $stmt->bind_param("sssissi", $acpname, $acpcity, $acpdate, $acpday, $acptheme, $acpbright, $id);

    $stmt->execute();
    $stmt->store_result();

    $affected_rows = $stmt->affected_rows;

    $stmt->close();
    $con->close();
    return $affected_rows;
}

function updatevip($id, $token, $username, $password, $balance) {
    $con = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
    $con->query("SET NAMES UTF8;");
    $sql = "UPDATE `tb_user` SET `token` = ?, `username` = ?, `password` = ?, `balance` = ? WHERE `id`=?";
    $stmt = $con->prepare($sql);
    $stmt->bind_param("ssssi", $token, $username, $password, $balance, $id);

    $stmt->execute();
    $stmt->store_result();

    $affected_rows = $stmt->affected_rows;

    $stmt->close();
    $con->close();
    return $affected_rows;
}

function deleProjectDetail($id)
{
    $con = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
    $con->query("SET NAMES UTF8;");
    $sql = "DELETE FROM `tb_project` WHERE `id` = ?";

    $stmt = $con->prepare($sql);
    $stmt->bind_param('i', $id);

    $stmt->execute();
    $stmt->store_result();

    $affected_rows = $stmt->affected_rows;

    $stmt->close();
    $con->close();
    return $affected_rows;

}

function deleupvipDetail($id)
{
    $con = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
    $con->query("SET NAMES UTF8;");
    $sql = "DELETE FROM `tb_user` WHERE `id` = ?";

    $stmt = $con->prepare($sql);
    $stmt->bind_param('i', $id);

    $stmt->execute();
    $stmt->store_result();

    $affected_rows = $stmt->affected_rows;

    $stmt->close();
    $con->close();
    return $affected_rows;

}

function getSliderInfo(){
    $con = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
    $con->query("SET NAMES UTF8;");
    $sql = "SELECT * FROM `tb_slider`";              //???可能有问题
    $stmt = $con->prepare($sql);   //预处理
    $stmt->execute();
    $stmt->store_result();

    $stmt->bind_result($id, $img_path, $title, $subtitle);

    $result = array();
    while ($stmt->fetch()) {          //fetch指针
        $item = array();
        $item['id'] = $id;
        $item['img_path'] = $img_path;
        $item['title'] = $title;
        $item['subtitle'] = $subtitle;

        $result[$id] = $item;  //将每条item放入result数组中
    }
    $stmt->close();
    $con->close();
    return $result;

}

function updateSliderInfo($img_path,$title,$subtitle,$id){
    $con = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
    $con->query("SET NAMES UTF8;");

    $sql = "UPDATE `tb_slider` SET `img_path`=?, `title`=?, `subtitle`=? WHERE `id`=?";

    $stmt = $con->prepare($sql);
    $stmt->bind_param("sssi", $img_path,$title,$subtitle, $id);
    $stmt->execute();

    $stmt->execute();
    $stmt->store_result();
    $affected_rows = $stmt->affected_rows;

    $stmt->close();
    $con->close();
    return $affected_rows;
}


/***
 *显示管理员信息
 *
 */

function getAdminInfo()
{
    $con = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
    $con->query("SET NAMES UTF8;");
    $sql = "SELECT `id`, `username`, `is_active`,`is_boss` FROM `tb_admin` ";

    $stmt = $con->prepare($sql);
    // $stmt->bind_param("ii", $start, $num);
    $stmt->execute();

    $stmt->store_result();
    $stmt->bind_result($id, $username, $is_active,$is_boss);

    $result = array();
    while ($stmt->fetch()) {
        $item = array();
        $item['id'] = $id;
        $item['username'] = $username;
        $item['is_active'] = $is_active;
        $item['is_boss'] = $is_boss;
        $result[$id] = $item;
    }
    $stmt->close();
    $con->close();
    return $result;
}