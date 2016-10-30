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
                $item['status'] = "审核中";
                break;
            case 2:
                $item['status'] = "审核通过";
        }
        $result[$id] = $item;
    }
    $stmt->close();
    $con->close();
    return $result;

//    $con = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
//    $con->query("SET NAMES UTF8;");
//    $sql = "SELECT `id`, `project_id`, `name`, `phone_number`, `email`, `wechat`, `status`
//FROM `tb_apply` LIMIT ".$start.", ".$num;
//    echo $sql;
//
//    $data = mysqli_query($con, $sql);
//    $con->close();
//
//    $result = array();
//    while ($row=$data->fetch_object()) {
//        $item = array();
//        $item['id'] = $row->id;
//        $item['project_id'] = $row->project_id;
//        $item['name'] = $row->name;
//        $item['phone_number'] = $row->phone_number;
//        $item['email'] = $row->email;
//        $item['wechat'] = $row->wechat;
//        switch ($row->status) {
//            case 0:
//                $item['status'] = "待审核";
//                break;
//            case 1:
//                $item['status'] = "审核中";
//                break;
//            case 2:
//                $item['status'] = "审核通过";
//        }
//        $result[$row->id] = $item;
//    }
//    return $result;
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

