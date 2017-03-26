/**
 * Created by liuyang on 2016/11/13.
 */

// var itemsNumberPerPage = 30;
// var pageNum = 1;
// var currentPage = getQueryString("p");

// if (currentPage == null || currentPage.toString().length < 1) {
//     currentPage = 1;
// }

//验证登录状态
$.ajax({
    url: "/admin/controller/check.login.php",
    success: function (data) {
        var result = JSON.parse(data);
        if (result.status == CORRECT) {
            //验证登录成功
            getUserList();
        } else {
            showNotification("alert-danger", errorCode2errorInfo(result.status), "top", "center", "", "");

            setTimeout(function () {
                location.href = "../index.html";
            }, 1000);
        }
    }
});

function getUserList() {
    $.ajax({
        url: "/admin/controller/users.list.con.php",
        // type: "get",
        // data: {currentPage: currentPage},
        success: function (data) {
            var result = JSON.parse(data);

            var applyNum = result.applyNum;

            //设置分页
            // ----

            //显示会员表格的内容
            if (applyNum == 0) {
                $("#cu-apply-table").find("tbody>tr>td").html("暂时没有会员");
            } else {
                var html = "";
                for (var item in result.applyInfo) {
                    html += "<tr>" +
                        "<td>" + item + "</td>" +
                        "<td>" + result.applyInfo[item + ""]['username'] + "</td>" +
                        "<td>" + result.applyInfo[item + ""]['balance'] + "</td>" +
                        "<td>" +
                        "<div class='btn-group' role='group'>" +
                        "<button type='button' class='btn btn-default btn-xs waves-effect material-icons'" +
                        "onclick='detailUser(" + item + ")' data-toggle='modal' data-target='#detailUserModal'>details</button>" +
                        "<button type='button' class='btn btn-default btn-xs waves-effect material-icons'" +
                        "onclick='deleteUser(" + item + ")'>delete</button>" +
                        "</div>" +
                        "</td>" +
                        "</tr>";
                }

                $("#cu-user-table").find("tbody").html(html).fadeIn(300);
            }

        }

    });
}

function deleteUser(id) {
    swal({
        title: "删除会员",
        text: "删除后，该会员的所有信息将清空。此操作不能撤销!",
        type: "info",
        showCancelButton: true,
        closeOnConfirm: false,
        showLoaderOnConfirm: true
    }, function () {
        $.ajax({
            url: "/admin/controller/users.delete.con.php",
            data: {id: id},
            type: "post",

            success: function (data) {
                if (data == 1) {
                    setTimeout(function () {
                        swal("操作完成");
                        getUserList();
                    }, 500);
                }
            }//success
        });//ajax
    });
}

function detailUser(id) {
    $.ajax({
        url: "/admin/controller/users.detail.con.php",
        data: {id: id},
        type: "post",
        success: function (data) {
            var result = JSON.parse(data);
            var html = '<input type="hidden" id="user_id" name="user_id" value="' + id + '" title=""/>';
            for (var item in result.detail) {
                if (item == "username") {
                    html += '<label for="email_address">会员名</label>' +
                        '<div class="form-group">' +
                        '<div class="form-line">' +
                        '<input type="text" readonly name="username" class="form-control" value="' + result.detail['username'] + '">' +
                        '</div>' +
                        '</div>';
                } else if (item == "password") {
                    html += '<input type="hidden" name="password" value="' + result.detail['password'] + '">' +
                        '<label for="email_address">是否重置密码?</label>' +
                        '<div class="form-group">' +
                        '<div class="form-line">' +
                        '<input type="checkbox" id="reset_password" name="reset_password" class="filled-in">' +
                        '<label for="reset_password">选择后该用户的登录密码将被重置为\'000000\'</label>' +
                        '</div>' +
                        '</div>';
                } else if (item == "balance") {
                    html += '<label for="email_address">余额</label>' +
                        '<div class="form-group">' +
                        '<div class="form-line">' +
                        '<input class="form-control" type="number" name="balance"  value="' + result.detail['balance'] + '">' +
                        '</div>' +
                        '</div>';
                }
            }
            $("#update_user_form").find(".modal-body").html(html);
        }
    })
}

$("#update_user_form").submit(function (event) {
    var $form = $(this);
    event.preventDefault();

    var id = $("#user_id").val();
    var serializedData = $form.serialize();

    if (id == "") {
        showNotification("alert-danger", "未知错误", "top", "right", "animated fadeInRight", "animated fadeOutRight");
        return false;
    }
    //TODO: other validates...

    $.ajax({
        url: "/admin/controller/users.update.con.php",
        data: serializedData,
        type: "post",
        success: function (data) {
            $("#detailUserModal").modal('hide');
            var result = JSON.parse(data);
            if (result.affected_rows == 1) {

                var text = "用户信息已修改";
                if (result.is_reset_password) {
                    text += "&nbsp;&nbsp;密码已重置为 000000"
                }

                showNotification("alert-success", text, "top", "right", "animated fadeInRight", "animated fadeOutRight");
                getUserList();
            } else {
                showNotification("alert-danger", "用户信息修改失败", "top", "right", "animated fadeInRight", "animated fadeOutRight");
            }
        }
    });
});