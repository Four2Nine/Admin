/**
 * Created by liuyang on 2017/4/6.
 */

$.ajax({
    url: "/admin/controller/check.login.php",
    success: function (data) {
        var result = JSON.parse(data);
        if (result.status === CORRECT) {
            //验证登录成功
            getStaffList();
        } else {
            showNotification("alert-danger", errorCode2errorInfo(result.status), "top", "center", "", "");

            setTimeout(function () {
                location.href = "../index.html";
            }, 1000);
        }
    }
});

function getStaffList(){
    $.ajax({
        url: "/admin/controller/staff.list.con.php",
        success: function(data){
            var result = JSON.parse(data);

            var staffNum = result.staffNum;

            //设置分页
            // ----

            //显示合伙人表格的内容
            if (staffNum === 0) {
                $("#cu-staff-table").find("tbody>tr>td").html("暂时没有合伙人");
            } else {
                var html = "";
                for (var item in result.staff) {
                    html += "<tr>" +
                        "<td>" + item + "</td>" +
                        "<td>" + result.staff[item + ""]['name'] + "</td>" +
                        "<td>" + result.staff[item + ""]['duties'] + "</td>" +
                        "<td>" + result.staff[item + ""]['email'] + "</td>" +
                        "<td>" + result.staff[item + ""]['phone'] + "</td>" +
                        "<td>" +
                        "<div class='btn-group' role='group'>" +
                        "<button type='button' class='btn btn-default btn-xs waves-effect material-icons'" +
                        "onclick='detailStaff(" + item + ")' data-toggle='modal' data-target='#detailUserModal'>details</button>" +
                        "<button type='button' class='btn btn-default btn-xs waves-effect material-icons'" +
                        "onclick='deleteStaff(" + item + ")'>delete</button>" +
                        "</div>" +
                        "</td>" +
                        "</tr>";
                }

                $("#cu-staff-table").find("tbody").html(html).fadeIn(300);
            }
        }
    })
}

function deleteStaff(id) {
    swal({
        title: "删除合伙人",
        text: "删除后，该合伙人的所有信息将清空。此操作不能撤销!",
        type: "info",
        showCancelButton: true,
        closeOnConfirm: false,
        showLoaderOnConfirm: true
    }, function () {
        $.ajax({
            url: "/admin/controller/staff.delete.con.php",
            data: {id: id},
            type: "post",

            success: function (data) {
                if (data === 1) {
                    setTimeout(function () {
                        swal("操作完成");
                        getUserList();
                    }, 500);
                }
            }//success
        });//ajax
    });
}

function detailStaff(id) {
    $.ajax({
        url: "/admin/controller/staff.detail.con.php",
        data: {id: id},
        type: "post",
        success: function (data) {
            var result = JSON.parse(data);
            var html = '<input type="hidden" id="staff_id" name="staff_id" value="' + id + '" title=""/>';
            for (var item in result.detail) {

            }
            $("#update_staff_form").find(".modal-body").html(html);
        }
    })
}

$("#update_staff_form").submit(function (event) {
    var $form = $(this);
    event.preventDefault();

    var id = $("#staff_id").val();
    var serializedData = $form.serialize();

    if (id === "") {
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
            if (result.affected_rows === 1) {

                var text = "合伙人信息已修改";
                if (result.is_reset_password) {
                    text += "&nbsp;&nbsp;密码已重置为 000000"
                }

                showNotification("alert-success", text, "top", "right", "animated fadeInRight", "animated fadeOutRight");
                getUserList();
            } else {
                showNotification("alert-danger", "合伙人信息修改失败", "top", "right", "animated fadeInRight", "animated fadeOutRight");
            }
        }
    });
});

$("#add_staff_form").submit(function(event){
    event.preventDefault();

    var $form = $(this);
    var $inputs = $form.find("input, select, button, textarea");

    $inputs.prop("disabled", true);
    var form_data = new FormData();


    var image = $("#image");
    var name = $("#name");
    var desc = $("#desc");
    var duties = $("#duties");
    var email = $("#email");
    var phone = $("#phone");

    var image__file = image.prop("files")[0];
    if (image__file === undefined) {
        form_data.append('image-flag', 0);
    } else if (image__file.size > 5242880) {
        $("#image-error").html("图片不能大于5MB");

        $inputs.prop("disabled", false);
        image.parents('.form-line').addClass('error');
        return false;
    } else {
        form_data.append('image-flag', 1);
        form_data.append('image', image__file);
    }

    $.ajax({
        url: "/admin/controller/staff.add.con.php",
        data: form_data,
        type: "post",
        success: function (data) {
            var result = JSON.parse(data);
            if (result.affected_rows === 1) {
                showNotification("alert-success", "成功添加合伙人", "top", "right", "animated fadeInRight", "animated fadeOutRight");
                getStaffList();
            } else {
                showNotification("alert-danger", "添加失败", "top", "right", "animated fadeInRight", "animated fadeOutRight");
            }
        }
    })
});