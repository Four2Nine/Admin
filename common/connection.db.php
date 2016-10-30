<?php
if (PHP_VERSION < '5.3.29') {
    exit('当前PHP版本低于5.3.29，请升级版本！');
}
define('ROOT_PATH', substr(dirname(__FILE__), 0, -6));
require ROOT_PATH . 'common\global.func.php';
require ROOT_PATH . 'common\mysql.func.php';
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PWD', 'QFynXANCxVdXm2q7');
define('DB_NAME', 'db_acp');