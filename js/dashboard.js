/**
 * Created by liuyang on 2016/11/8.
 */

$(document).ready(function () {
    $.ajax({
        url: "/Admin/controller/dashboard.overview.con.php",
        success: function (data) {
            var result = JSON.parse(data);
            $("#cu-new-user-num").html("+" + result.today_user_count);
            $("#cu-all-user-num").html("共 " + result.user_count + " 名会员");
            $("#cu-new-apply-num").html("+" + result.today_apply_count);
            $("#cu-all-apply-num").html("共 " + result.apply_count + " 张报名表");
        }
    });
});