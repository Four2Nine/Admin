//验证登录状态
$.ajax({
    url: "/admin/controller/check.login.php",
    success: function (data) {
        var result = JSON.parse(data);
        if (result.status == CORRECT) {
            //验证登录成功
            getAdminList();
        } else {
            showNotification("alert-danger", errorCode2errorInfo(result.status), "top", "center", "", "");

            setTimeout(function () {
                location.href = "../index.html";
            }, 1000);
        }
    }
});

function getAdminList() {
    $.ajax({
        url: "/admin/controller/admin.list.con.php",
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
                        "<th scope='row'>" + id + "</th>" +
                        "<td>" + result[item + ""]['username'] + "</td>" +
                        "<td>" + activeStr + "</td>" +
                        "<td>SuperAdmin</td>" +
                        "</tr>";
                } else {
                    html += "<tr>" +
                        "<td>" + id + "</td>" +
                        "<td>" + result[item + ""]['username'] + "</td>" +
                        "<td>" + activeStr + "</td>" +
                        "<td>" +
                        "<div class='btn-group' role='group'>" +
                        "<button type='button' class='btn btn-default btn-xs waves-effect material-icons'" +
                        "onclick='disableAdmin(" + id + "," + is_active + ")'>remove_circle</button>" +
                        "<button type='button' class='btn btn-default btn-xs waves-effect material-icons'" +
                        "onclick='removeAdmin(" + id + ")'>delete</button>" +
                        "</div>" +
                        "</td>" +
                        "</tr>";
                }
            }

            $("#cu-admin-table").find("tbody").html(html).fadeIn(300);
        }

    });
}

function disableAdmin(id, is_active) {

    swal({
        title: is_active == 1 ? "禁用管理员" : "启用管理员",
        text: is_active == 1 ? "禁用后，该管理员将无法登录" : "启用后，该管理员恢复使用",
        type: "info",
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        showCancelButton: true,
        closeOnConfirm: false,
        showLoaderOnConfirm: true
    }, function () {
        $.ajax({
            url: "/admin/controller/admin.disable.con.php",
            data: {id: id, is_active: is_active},
            type: "post",

            success: function (data) {
                if (data == 1) {
                    setTimeout(function () {
                        swal("操作完成");
                        getAdminList();
                    }, 500);
                }
            }//success
        });//ajax
    });
}

function removeAdmin(id) {

    swal({
        title: "删除管理员",
        text: "删除后，该管理员的所有信息将清空。此操作不能撤销!",
        type: "info",
        confirmButtonText: "确认删除",
        cancelButtonText: "取消",
        showCancelButton: true,
        closeOnConfirm: false,
        showLoaderOnConfirm: true
    }, function () {
        $.ajax({
            url: "/admin/controller/admin.remove.con.php",
            data: {id: id},
            type: "post",

            success: function (data) {
                if (data == 1) {
                    setTimeout(function () {
                        swal("操作完成");
                        getAdminList();
                    }, 500);
                }
            }//success
        });//ajax
    });
}

//------------------------------------------------------------------------------------------
//
//------------------------------------------------------------------------------------------

$("#add_admin_form").submit(function (event) {
    event.preventDefault();

    var $form = $(this);

    var $inputs = $form.find("input, select, button, textarea");

    var serializedData = $form.serialize();

    $inputs.prop("disabled", true);

    $password = $("#password");

    //验证管理员名
    if (!checkUsername($("#username"))) {
        $inputs.prop("disabled", false);
        return false;
    }

    //验证密码
    if (!checkPassword($password)) {
        $inputs.prop("disabled", false);
        return false;
    }

    //验证确认密码
    if (!checkPasswordConfirm($('#confirm_password'), $password.val())) {
        $inputs.prop("disabled", false);
        return false;
    }

    $.ajax({
        url: "/admin/controller/admin.add.con.php",
        type: "post",
        data: serializedData,
        success: function (data) {
            $('#addAdminModal').modal('hide');
            var result = JSON.parse(data);

            if (result.status != CORRECT) {
                showNotification("alert-danger", errorCode2errorInfo(result.status), "top", "right", "animated fadeInRight", "animated fadeOutRight");
            } else {
                showNotification("alert-success", "添加成功", "top", "right", "animated fadeInRight", "animated fadeOutRight");
                getAdminList();
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
$("#confirm_password").blur(function () {
    checkPasswordConfirm($(this), $("#password").val());
});