/**
 * Created by bingo on 2016/11/05.
 */
$(".cu-error").hide();
$(".cu-correct").hide();
$(".cu-notification").hide();

$(document).ready(function () {

    //验证登录状态
    $.ajax({
        url: "/Admin/controller/check.login.php",
        success: function (data) {
            var result = JSON.parse(data);
            if (result.status == CORRECT) {
                //验证登录成功
                $("#cu-admin-notification").fadeOut(500);

                getAdminList();

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
});

// Bind to the submit event of our form
$("#register-form").submit(function (event) {

    $(".cu-error").hide();
    // Prevent default posting of form - put here to work in case of errors
    event.preventDefault();

    // setup some local variables
    var $form = $(this);

    // Let's select and cache all the fields
    var $inputs = $form.find("input, select, button, textarea");

    // Serialize the data in the form
    var serializedData = $form.serialize();

    // Let's disable the inputs for the duration of the Ajax request.
    // Note: we disable elements AFTER the form data has been serialized.
    // Disabled form elements will not be serialized.
    $inputs.prop("disabled", true);

    //验证会员名
    if (!checkUsername($("#username").val())) {
        $inputs.prop("disabled", false);
        return false;
    }

    //验证密码
    if (!checkPassword($("#password").val())) {
        $inputs.prop("disabled", false);
        return false;
    }

    //验证密码确认
    if (!checkPasswordConfirm($("#password_confirm").val(), $("#password").val())) {
        $inputs.prop("disabled", false);
        return false;
    }


    // 添加管理员
    $.ajax({
        url: "/Admin/controller/admin.add.con.php",
        type: "post",
        data: serializedData,
        success: function (data) {

            var result = JSON.parse(data);

            if (result.status != CORRECT) {
                $(".alert-danger").html(
                    "error code: " + result.status + '<br>' + errorCode2errorInfo(result.status)
                ).fadeIn(800);
            } else {
                $(".alert-success").html(
                    "注册成功..."
                ).show();
                setTimeout(function () {
                    location.href = "/Admin/admin.html";
                }, 1800);
            }

            setTimeout(function () {
                $(".cu-notification").fadeOut(800);
            }, 2000);
        },
        error: function (request) {

        },
        complete: function () {
            // Reenable the inputs
            $inputs.prop("disabled", false);
        }
    });

});

//失去焦点时判断 input 的合法性
$("#username").blur(function () {
    checkUsername($(this).val());
});
$("#password").blur(function () {
    checkPassword($(this).val())
});
$("#password_confirm").blur(function () {
    checkPasswordConfirm($(this).val(), $("#password").val());
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

function getAdminList() {
    $.ajax({
        url: "/Admin/controller/admin.list.con.php",
        success: function (data) {
            var result = JSON.parse(data);

            var html = "";
            for (var item in result) {
                var activeStr = result[item + ""]['is_active'] == 1 ? "是" : "否";

                var id = result[item + ""]['id'];
                var is_active = result[item + ""]['is_active'];
                var is_boss = result[item + ""]['is_boss'];


                if (is_boss == 1) {
                    html += "<tr>" +
                        "<td>" + id + "</td>" +
                        "<td>" + result[item + ""]['username'] + "</td>" +
                        "<td>" + activeStr + "</td>" +
                        "<td>超级管理员不能操作</td>" +
                        "</tr>";
                } else {
                    html += "<tr>" +
                        "<td>" + id + "</td>" +
                        "<td>" + result[item + ""]['username'] + "</td>" +
                        "<td>" + activeStr + "</td>" +
                        "<td>" +
                        "<button class='glyphicon glyphicon-minus-sign' " +
                        "onclick='disableAdmin(" + id + "," + is_active + ")' ></button>" +
                        "<button class='glyphicon glyphicon-remove' " +
                        "onclick='removeAdmin(" + id + ")' ></button>" +
                        "</td>" +
                        "</tr>";
                }
            }

            $("#cu-admin-table").find("tbody").html(html).fadeIn(300);

        }

    });
}

function disableAdmin(id, is_active) {
    $.ajax({
        url: "/Admin/controller/admin.disable.con.php",
        data: {id: id, is_active: is_active},
        type: "post",


        success: function (data) {
            if (data == 1) {
                location.href = "/Admin/admin.html";
            }
        }//success

    });//ajax
}

function removeAdmin(id) {
    $.ajax({
        url: "/Admin/controller/admin.remove.con.php",
        data: {id: id},
        type: "post",
        success: function (data) {
            if (data == 1) {
                location.href = "/Admin/admin.html";
            }
        }//success
    });//ajax
}

