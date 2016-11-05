/**
 * Created by sealiu on 2016/10/30.
 */

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

/**
 以下是bingo复制过来的
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
            .html("<span class='glyphicon glyphicon-exclamation-sign'></span>不能为空")
            .fadeIn(800);
        $("#password-confirm-correct").hide();
        return false;
    } else if (password_confirm != password) {
        $("#password-confirm-error")
            .html("<span class='glyphicon glyphicon-exclamation-sign'></span>两次输入不一致")
            .fadeIn(800);
        $("#password-confirm-correct").hide();
        return false;
    } else {
        $("#password-confirm-error").hide();
        $("#password-confirm-correct").fadeIn(800);
        return true;
    }
}