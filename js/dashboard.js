/**
 * Created by liuyang on 2016/11/8.
 */

$(document).ready(function () {

    //验证登录状态
    $.ajax({
        url: "/Admin/controller/check.login.php",
        success: function (data) {
            var result = JSON.parse(data);
            if (result.status == CORRECT) {
                //验证登录成功
                $("#cu-admin-notification").fadeOut(500);

                $.ajax({
                    url: "/Admin/controller/dashboard.overview.con.php",
                    success: function (data) {
                        var result = JSON.parse(data);
                        //noinspection JSUnresolvedVariable
                        $("#cu-new-user-num").html("+" + result.today_user_count);
                        //noinspection JSUnresolvedVariable
                        $("#cu-all-user-num").html("共 " + result.user_count + " 名会员");
                        //noinspection JSUnresolvedVariable
                        $("#cu-new-apply-num").html("+" + result.today_apply_count);
                        //noinspection JSUnresolvedVariable
                        $("#cu-all-apply-num").html("共 " + result.apply_count + " 张报名表");
                    }
                });
            } else {
                $("#cu-admin-notification").html(
                    "error code: " + result.status + '<br>' + errorCode2errorInfo(result.status) + "正在跳转至登录页面..."
                );
                setTimeout(function () {
                    location.href = "/Admin/index.html";
                }, 1200);
            }
        }
    });

    //退出登录
    $("#cu-logout").click(function () {
        $.ajax({
            url: "/Admin/controller/logout.con.php",
            success: function (data) {

                if (data == CORRECT) {
                    location.href = "/Admin/index.html";
                }
            }
        })
    });
});