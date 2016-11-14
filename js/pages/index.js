$("#sign_in_form").submit(function (event) {
    event.preventDefault();

    var $form = $(this);

    var $inputs = $form.find("input, select, button, textarea");

    var serializedData = $form.serialize();

    $inputs.prop("disabled", true);

    //验证管理员名
    if (!checkUsername($("#username"))) {
        $inputs.prop("disabled", false);
        return false;
    }

    //验证密码
    if (!checkPassword($("#password"))) {
        $inputs.prop("disabled", false);
        return false;
    }

    $.ajax({
        url: "/Admin/controller/login.con.php",
        type: "post",
        data: serializedData,
        success: function (data) {

            var result = JSON.parse(data);

            if (result.status != CORRECT) {
                showNotification("alert-danger", errorCode2errorInfo(result.status), "top", "center", "", "");
            } else {
                showNotification("alert-success", "登录成功，正在跳转...", "top", "center", "", "");

                setTimeout(function () {
                    location.href = "/Admin/pages/dashboard.html";
                }, 1000);
            }
        },
        complete: function () {
            // Reenable the inputs
            $inputs.prop("disabled", false);
        }
    });
});

//失去焦点时判断 input 的合法性
$("#username").blur(function () {
    checkUsername($(this));
});
$("#password").blur(function () {
    checkPassword($(this))
});