/**
 * Created by liuyang on 2017/4/6.
 */

$.ajax({
    url: "/admin/controller/check.login.php",
    success: function (data) {
        var result = JSON.parse(data);
        if (result.status == CORRECT) {
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
            if (staffNum == 0) {
                $("#cu-staff-table").find("tbody>tr>td").html("暂时没有合伙人");
            } else {
                var html = "";
                for (var item in result.staff) {
                    if (result.staff[item + ""]['top'] == 1) {
                        html += "<tr class='success'>";
                    } else {
                        html += "<tr>";
                    }
                    html += "<td>" + item + "</td>" +
                        "<td>" + result.staff[item + ""]['name'] + "</td>" +
                        "<td>" + result.staff[item + ""]['duties'] + "</td>" +
                        "<td>" + result.staff[item + ""]['email'] + "</td>" +
                        "<td>" + result.staff[item + ""]['phone'] + "</td>" +
                        "<td>" +
                        "<div class='btn-group' role='group'>" +
                        "<button type='button' class='btn btn-default btn-xs waves-effect material-icons'" +
                        "onclick='detailStaff(" + item + ")' data-toggle='modal' data-target='#detailStaffModal'>details</button>" +
                        "<button type='button' class='btn btn-default btn-xs waves-effect material-icons'" +
                        "onclick='deleteStaff(" + item + ")'>delete</button>" +
                        "<button type='button' class='btn btn-default btn-xs waves-effect material-icons'" +
                        "onclick='topStaff(" + item + ")'>keyboard_capslock</button>" +
                        "<button type='button' class='btn btn-default btn-xs waves-effect material-icons'" +
                        "onclick='cancelTopStaff(" + item + ")'>keyboard_arrow_down</button>" +
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
        confirmButtonText: "确定删除",
        cancelButtonText: "取消",
        showCancelButton: true,
        closeOnConfirm: false,
        showLoaderOnConfirm: true
    }, function () {
        $.ajax({
            url: "/admin/controller/staff.delete.con.php",
            data: {id: id},
            type: "post",

            success: function (data) {
                if (data==1) {
                    setTimeout(function () {
                        swal("操作完成");
                        getStaffList();
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
            $("#staff_id").prop("value", result['detail']['id']);
            $("#head-img").prop("src", "../images/staff/"+result['detail']['image']);
            $("#up_name").prop("value", result['detail']['name']);
            $("#up_desc").html(result['detail']['description']);
            $("#up_duties").prop("value", result['detail']['duties']);
            $("#up_email").prop("value", result['detail']['email']);
            $("#up_phone").prop("value", result['detail']['phone']);
        }
    })
}

function topStaff(id) {
    swal({
        title: "将合伙人置顶",
        text: "置顶后，该合伙人将会位于置顶合伙人的首位",
        type: "info",
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        showCancelButton: true,
        closeOnConfirm: false,
        showLoaderOnConfirm: true
    }, function () {
        $.ajax({
            url: "/admin/controller/staff.top.con.php",
            data: {id: id, top: 1},
            type: "post",

            success: function (data) {
                if (data == 1) {
                    setTimeout(function () {
                        swal("操作完成");
                        getStaffList();
                    }, 500);
                }
            }//success
        });//ajax
    });
}

function cancelTopStaff(id) {
    swal({
        title: "将合伙人取消置顶",
        text: "该合伙人将不再置顶",
        type: "info",
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        showCancelButton: true,
        closeOnConfirm: false,
        showLoaderOnConfirm: true
    }, function () {
        $.ajax({
            url: "/admin/controller/staff.top.con.php",
            data: {id: id, top: 0},
            type: "post",

            success: function (data) {
                if (data == 1) {
                    setTimeout(function () {
                        swal("操作完成");
                        getStaffList();
                    }, 500);
                }
            }//success
        });//ajax
    });
}

$("#update_staff_form").submit(function (event) {
    event.preventDefault();
    var $form = $(this);
    var $inputs = $form.find("input, select, button, textarea");

    var id = $("#staff_id");

    if (id.val() == "") {
        showNotification("alert-danger", "发生错误", "top", "right", "animated fadeInRight", "animated fadeOutRight");
        return false;
    }
    $inputs.prop("disabled", true);

    var image = $("#up_image");
    var name = $("#up_name");
    var desc = $("#up_desc");
    var duties = $("#up_duties");
    var email = $("#up_email");
    var phone = $("#up_phone");

    var form_data = new FormData();

    var image__file = image.prop("files")[0];

    if (image__file == undefined) {
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

    form_data.append("staff_id", id.val());
    form_data.append("name", name.val());
    form_data.append("desc", desc.val());
    form_data.append("duties", duties.val());
    form_data.append("email", email.val());
    form_data.append("phone", phone.val());

    $.ajax({
        url: "/admin/controller/staff.update.con.php",
        type: "post",
        dataType: 'text',
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        success: function (data) {
            $inputs.prop("disabled", false);
            $("#detailStaffModal").modal('hide');
            var result = JSON.parse(data);
            if (result == 1) {
                showNotification("alert-success", "合伙人信息已修改", "top", "right", "animated fadeInRight", "animated fadeOutRight");
                getStaffList();
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

    var image = $("#image");
    var name = $("#name");
    var desc = $("#desc");
    var duties = $("#duties");
    var email = $("#email");
    var phone = $("#phone");

    var form_data = new FormData();

    var image__file = image.prop("files")[0];

    if (image__file == undefined) {
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

    form_data.append("name", name.val());
    form_data.append("desc", desc.val());
    form_data.append("duties", duties.val());
    form_data.append("email", email.val());
    form_data.append("phone", phone.val());

    $.ajax({
        url: "/admin/controller/staff.add.con.php",
        type: "post",
        dataType: 'text',
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        success: function (data) {
            $inputs.prop("disabled", false);
            $('#addStaffModal').modal('hide');
            if (data==1) {
                showNotification("alert-success", "成功添加合伙人", "top", "right", "animated fadeInRight", "animated fadeOutRight");
                getStaffList();
            } else {
                showNotification("alert-danger", "添加失败", "top", "right", "animated fadeInRight", "animated fadeOutRight");
            }
        }
    })
});