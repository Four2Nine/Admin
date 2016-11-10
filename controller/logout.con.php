<?php
/**
 * Created by PhpStorm.
 * User: liuyang
 * Date: 2016/10/24
 * Time: 15:35
 */

require 'Constant.php';

setcookie("__username", FALSE, time() - 1);
setcookie("__password", FALSE, time() - 1);
setcookie("__token", FALSE, time() - 1);

echo Constant::$_CORRECT;