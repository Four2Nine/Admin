/**
 * Created by liuyang on 2016/11/13.
 */

//验证登录状态
$.ajax({
    url: "/admin/controller/check.login.php",
    success: function (data) {
        var result = JSON.parse(data);
        if (result.status == CORRECT) {
            //验证登录成功
            getProjectList();
        } else {
            showNotification("alert-danger", errorCode2errorInfo(result.status), "top", "center", "", "");

            setTimeout(function () {
                location.href = "../index.html";
            }, 1000);
        }
    }
});

function getProjectList() {
    $.ajax({
        url: "/admin/controller/project.list.con.php",
        success: function (data) {
            var result = JSON.parse(data);
            var projectNum = result.number;

            //显示项目表格的内容
            if (projectNum == 0) {
                $("#cu-project-table").find("tbody>tr>td").html("暂时没有项目");
            } else {
                var html = "";
                for (var item in result.info) {
                    html += "<tr>" +
                        "<td>" + item + "</td>" +
                        "<td>" + result.info[item + ""]['name'] + "</td>" +
                        "<td>" + result.info[item + ""]['city'] + "</td>" +
                        "<td>" + result.info[item + ""]['date'] + "</td>" +
                        "<td>" + result.info[item + ""]['day'] + "</td>" +
                        "<td>" + result.info[item + ""]['pushDate'] + "</td>" +
                        "<td>" +
                        "<div class='btn-group' role='group'>" +
                        "<button type='button' class='btn btn-default btn-xs waves-effect material-icons'" +
                        "onclick='detailProject(" + item + ")' data-toggle='modal' data-target='#detailProjectModal'>details</button>" +
                        "<button type='button' class='btn btn-default btn-xs waves-effect material-icons'" +
                        "onclick='deleteProject(" + item + ")'>delete</button>" +
                        "</div>" +
                        "</td>" +
                        "</tr>";
                }

                $("#cu-project-table").find("tbody").html(html).fadeIn(300);
            }

        }
    });
}

function detailProject(id) {
    $.ajax({
        url: "/admin/controller/project.detail.con.php",
        data: {id: id},
        type: "post",
        success: function (data) {
            var result = JSON.parse(data);
            var html = "<input type='hidden' name='id' value='" + id + "'>";
            for (var item in result.detail) {
                if (item == "acpname") {
                    html += "<tr>" +
                        "<td>项目名称</td>" +
                        "<td>" + result.detail['acpname'] + "</td>" +
                        "</tr>";
                } else if (item == "acpcity") {
                    html += "<tr>" +
                        "<td>城市</td>" +
                        "<td>" +
                        "<input class='input' name='acpcity' type='text' value='" + result.detail['acpcity'] + "'>" +
                        "</td>" +
                        "</tr>";
                } else if (item == "acpdate") {
                    html += "<tr>" +
                        "<td>出发时间</td>" +
                        "<td>" +
                        "<input class='input' name='acpdate' type='date' value='" + result.detail['acpdate'] + "'>" +
                        "</td>" +
                        "</tr>";
                } else if (item == "acpday") {
                    html += "<tr>" +
                        "<td>行程天数</td>" +
                        "<td>" +
                        "<input class='input' name='acpday' type='number' value='" + result.detail['acpday'] + "'>" +
                        "</td>" +
                        "</tr>";
                } else if (item == "acptheme") {
                    html += "<tr>" +
                        "<td>行程主题</td>" +
                        "<td><textarea class='input' name='acptheme'>" + result.detail['acptheme'] + "</textarea>" +
                        "</td>" +
                        "</tr>";
                } else if (item == "acpbright") {
                    html += "<tr>" +
                        "<td>行程亮点</td>" +
                        "<td>" +
                        "<textarea class='input' name='acpbright'>" + result.detail['acpbright'] + "</textarea>" +
                        "</td>" +
                        "</tr>";
                }
            }//end-for

            $("#cu-project-detail-table").find("tbody").html(html);
        }//end-success
    })
}

function deleteProject(id) {
    swal({
        title: "删除项目",
        text: "删除操作不能撤销!",
        type: "info",
        confirmButtonText: "确认删除",
        cancelButtonText: "取消",
        showCancelButton: true,
        closeOnConfirm: false,
        showLoaderOnConfirm: true
    }, function () {
        $.ajax({
            url: "/admin/controller/project.delete.con.php",
            data: {id: id},
            type: "post",
            success: function (data) {
                if (data == 1) {
                    setTimeout(function () {
                        swal("操作完成");
                        getProjectList();
                    }, 500);
                }
            }
        });
    });
}

$("#project-form").submit(function (event) {
    event.preventDefault();
    var $form = $(this);
    var serializedData = $form.serialize();
    $.ajax({
        url: "/admin/controller/project.update.con.php",
        data: serializedData,
        type: "post",
        success: function (data) {
            $("#detailProjectModal").modal('hide');
            if (data == 1) {
                showNotification("alert-success", "项目信息已修改", "top", "right", "animated fadeInRight", "animated fadeOutRight");
                getProjectList();
            } else {
                showNotification("alert-danger", "项目信息修改失败", "top", "right", "animated fadeInRight", "animated fadeOutRight");
            }
        }
    });
});

$("#add_project_form").submit(function (event) {

    event.preventDefault();

    var form_data = new FormData();
    var files = $('#ff').prop('files');
    var file_num = files.length;

    for (var i = 0; i < file_num; i++) {
        form_data.append('pictures' + i, files[i]);
    }
    form_data.append('file_num', file_num);
    form_data.append('name', $('#name').val());
    form_data.append('city', $('#city').val());
    form_data.append('date', $('#date').val());
    form_data.append('day', $('#day').val());
    form_data.append('theme', $('#theme').val());
    form_data.append('bright', $('#bright').val());
    form_data.append('mean', $('#mean').val());
    form_data.append('detail', $('#detail').val());
    form_data.append('tip', $('#tip').val());

    swal({
        title: "确认添加项目",
        type: "info",
        confirmButtonText: "确认添加",
        cancelButtonText: "取消",
        showCancelButton: true,
        closeOnConfirm: false,
        showLoaderOnConfirm: true
    }, function () {

        $.ajax({
            url: "/admin/controller/project.addItem.con.php",
            type: "post",
            dataType: 'text',  // what to expect back from the PHP script, if anything
            cache: false,
            contentType: false,
            processData: false,
            data: form_data,
            success: function (data) {
                if (data == 1) {
                    swal("添加成功");
                } else {
                    swal("添加失败");
                }

            }
        });
    });
});