<?php

//固定长度字符串
function fixstr($ostr, $length)
{

    $num_str = $ostr;
    $num_strlength = count($num_str);
    if ($length > $num_strlength) {
        $num_str = str_pad($num_str, $length, ".", STR_PAD_RIGHT);
    }
    return $num_str;
}

class SqlTool
{

    //属性
    private $conn;
    private $host = "localhost";
    private $user = "root";
    private $password = "QFynXANCxVdXm2q7";
    private $db = "db_acp";

    function SqlTool()
    {

        $this->conn = mysql_connect($this->host, $this->user, $this->password);
        if (!$this->conn) {
            die("连接数据库失败" . mysql_error());
        }
        mysql_select_db($this->db, $this->conn);
        mysql_query("set names utf8");
    }

    //方法..

    // 完成select dql
    public function execute_dql($sql)
    {

        $res = mysql_query($sql, $this->conn) or die(mysql_error());

        return $res;

    }

    //完成 update,delete ,insert dml
    public function execute_dml($sql)
    {

        $b = mysql_query($sql, $this->conn);
        //echo "添加的id=".mysql_insert_id($this->conn);
        if (!$b) {
            return 0;//失败
        } else {
            if (mysql_affected_rows($this->conn) > 0) {
                return 1;//表示成功
            } else {
                return 2;//表示没有行数影响.
            }
        }
    }
}

?>
