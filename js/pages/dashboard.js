//验证登录状态
$.ajax({
    url: "/admin/controller/check.login.php",
    success: function (data) {
        var result = JSON.parse(data);
        if (result.status == CORRECT) {
            //验证登录成功
            $.ajax({
                url: "/admin/controller/dashboard.overview.con.php",
                success: function (data) {
                    var result = JSON.parse(data);
                    $("#cu-users-num").html("+" + result.today_user_count + "/" + result.user_count);

                    $("#cu-applies-num").html("+" + result.today_apply_count + "/" + result.apply_count);
                }
            });
        } else {
            showNotification("alert-danger", errorCode2errorInfo(result.status), "top", "center", "", "");

            setTimeout(function () {
                location.href = "index.html";
            }, 1000);
        }
    }
});
