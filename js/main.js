/**
 * Created by liuyang on 2016/10/24.
 */
var CORRECT = 100; //正确

var USERNAME_ERROR = 201; //用户名错误
//-------------------------------------------------------
var USERNAME_BLANK_ERROR = 2010; //用户名为空
var USERNAME_LENGTH_ERROR = 2011; //用户名长度不符合要求
var USERNAME_FORMAT_ERROR = 2012; //用户名格式错误
var USERNAME_REPEAT_ERROR = 2013; //用户名重复
var USERNAME_NOT_FOUND_ERROR = 2014; //没有找到该用户

var PASSWORD_ERROR = 202; //密码错误
//-------------------------------------------------------
var PASSWORD_BLANK_ERROR = 2020; //密码为空
var PASSWORD_LENGTH_ERROR = 2021; //密码长度不符合要求
var PASSWORD_INCONSISTENT_ERROR = 2022; //密码输入不一致
var PASSWORD_INCORRECT_ERROR = 2023; //密码错误

var INVITATION_CODE_ERROR = 203; //无效的邀请码

var DB_INSERT_ERROR = 301; //未知的INSERT错误
var DB_SELECT_ERROR = 302;     //数据库查询错误

var NOT_LOGIN = 400;   //没有登录
var TOKEN_INCORRECT = 402; //__token 不符合

var NO_PERMISSION = 500;

function errorCode2errorInfo(errorcode) {
    switch (errorcode) {
        case USERNAME_ERROR:
            return "用户名错误";
        case USERNAME_BLANK_ERROR:
            return "用户名为空";
        case USERNAME_LENGTH_ERROR:
            return "用户名长度不符合要求";
        case USERNAME_FORMAT_ERROR:
            return "用户名格式错误";
        case USERNAME_REPEAT_ERROR:
            return "用户名已存在";
        case USERNAME_NOT_FOUND_ERROR:
            return "该用户不存在";
        case PASSWORD_ERROR:
            return "密码错误";
        case PASSWORD_BLANK_ERROR:
            return "密码为空";
        case PASSWORD_LENGTH_ERROR:
            return "密码长度不符合要求";
        case PASSWORD_INCONSISTENT_ERROR:
            return "确认密码输入不一致";
        case PASSWORD_INCORRECT_ERROR:
            return "密码错误";
        case INVITATION_CODE_ERROR:
            return "无效的邀请码";
        case DB_INSERT_ERROR:
            return "未知的INSERT错误";
        case DB_SELECT_ERROR:
            return "未知的SELECT错误";
        case NOT_LOGIN:
            return "未登录";
        case NO_PERMISSION:
            return "没有权限执行此操作";
        case TOKEN_INCORRECT:
            return "TOKEN不正确";
    }
}


/**
 * Created by liuyang on 2016/10/22.
 */
function checkUsername(username) {
    var pattern = /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/;

    if (username == "") {
        $("#username-error")
            .html("<span class='glyphicon glyphicon-exclamation-sign'></span>管理员账号不能为空")
            .fadeIn(800);
        $("#username-correct").hide();
        return false;
    } else if (username.length > 20) {
        $("#username-error")
            .html("<span class='glyphicon glyphicon-exclamation-sign'></span>管理员账号长度不能超过20个字符")
            .fadeIn(800);
        $("#username-correct").hide();
        return false;
    } else if (!pattern.test(username)) {
        $("#username-error")
            .html("<span class='glyphicon glyphicon-exclamation-sign'></span>管理员账号不能包括除下划线以外的特殊字符")
            .fadeIn(800);
        $("#username-correct").hide();
        return false;
    } else {
        $("#username-error").hide();
        $("#username-correct").fadeIn(800);
        return true;
    }
}

function checkPassword(password) {
    if (password == "") {
        $("#password-error")
            .html("<span class='glyphicon glyphicon-exclamation-sign'></span>密码不能为空")
            .fadeIn(800);
        $("#password-correct").hide();
        return false;
    } else if (password.length < 6) {
        $("#password-error")
            .html("<span class='glyphicon glyphicon-exclamation-sign'></span>密码不能少于6位")
            .fadeIn(800);
        $("#password-correct").hide();
        return false;
    } else {
        $("#password-error").hide();
        $("#password-correct").fadeIn(800);
        return true;
    }
}

function checkPasswordConfirm(password_confirm, password) {
    if (password_confirm == "") {
        $("#password-confirm-error")
            .html("<span class='glyphicon glyphicon-exclamation-sign'></span>密码确认不能为空")
            .fadeIn(800);
        $("#password-confirm-correct").hide();
        return false;
    } else if (password_confirm != password) {
        $("#password-confirm-error")
            .html("<span class='glyphicon glyphicon-exclamation-sign'></span>两次密码输入不一致")
            .fadeIn(800);
        $("#password-confirm-correct").hide();
        return false;
    } else {
        $("#password-confirm-error").hide();
        $("#password-confirm-correct").fadeIn(800);
        return true;
    }
}