/**
 * Created by bingo on 2016/11/05.
 */
$(".cu-error").hide();
$(".cu-correct").hide();
$(".cu-notification").hide();

$(document).ready(function () {
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


        // Fire off the request to /form.php
        $.ajax({
            url: "/Admin/controller/admin.con.php",
            type: "post",
            data: serializedData,
            success: function (data) {

                var result = JSON.parse(data);

                if (result.status != CORRECT) {
                    $(".alert-danger").html(
                        "error code: " + result.status + '<br>' + errorcode2errorinfo(result.status)
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

    $.ajax({
        url: "/Admin/controller/adminInfo.con.php",


        success: function (data) {
            var result = JSON.parse(data);

            var html = "";
            for (var item in result.adminInfo) {
                var active = result.adminInfo[item + ""]['is_active'] == 1 ? "是" : "否";
               // var is_boss=result.adminInfo[item + ""]['is_boss'];
                html += "<tr>" +

                    "<td>" + result.adminInfo[item + ""]['id'] + "</td>" +
                    "<td>" + result.adminInfo[item + ""]['username'] + "</td>" +
                    "<td>" + active + "</td>" +
                    "<td><button class='glyphicon glyphicon-minus-sign' onclick='disableAdmin(" + result.adminInfo[item + ""]['id'] + "," + result.adminInfo[item + ""]['is_active'] + "," + result.adminInfo[item + ""]['is_boss'] + ")' ></button>" +
                    "<button class='glyphicon glyphicon-remove' onclick='removeAdmin(" + result.adminInfo[item + ""]['id'] + "," + result.adminInfo[item + ""]['is_boss'] + ")' ></button></td>" +

                    "</tr>";
            }

            $("#cu-admin-table").find("tbody").html(html).fadeIn(300);

        }


    });
});

function disableAdmin(id, is_active,is_boss) {
    $.ajax({
        url: "/Admin/controller/admin.disable.con.php",
        data: {id: id, is_active: is_active,is_boss:is_boss},
        type: "post",


        success: function (data) {
            if (data == 1) {
                location.href = "/Admin/admin.html";
            }
            else {
                $(".alert-fail").html(
                    "您无权操作此管理员..."
                ).show();
                setTimeout(function () {
                    $(".cu-notification").fadeOut();
                }, 1000);


        }


            }

    })
}



function removeAdmin(id,is_boss) {
    $.ajax({
        url: "/Admin/controller/admin.remove.con.php",
        data: {id: id,is_boss:is_boss},
        type: "post",
        success: function (data) {


            if (data == 1) {
                location.href = "/Admin/admin.html";
            }
            else {
                $(".alert-fail").html(
                    "您无权操作此管理员..."
                ).show();
                setTimeout(function () {
                    $(".cu-notification").fadeOut();
                }, 1000);


            }

        }
    })
}

