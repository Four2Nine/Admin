/**
 * Created by liuyang on 2017/3/26.
 */

//验证登录状态
$.ajax({
    url: "/admin/controller/check.login.php",
    success: function (data) {
        var result = JSON.parse(data);
        if (result.status == CORRECT) {
            //验证登录成功
            getServiceList();
        } else {
            showNotification("alert-danger", errorCode2errorInfo(result.status), "top", "center", "", "");

            setTimeout(function () {
                location.href = "../index.html";
            }, 1000);
        }
    }
});

function getServiceList() {
    $.ajax({
        url: "/admin/controller/service.list.con.php",
        success: function (data) {
            var result = JSON.parse(data);
            var serviceNum = result.serviceNum;

            //显示企业服务表格的内容
            if (serviceNum == 0) {
                $("#cu-service-table").find("tbody>tr>td").html("暂无服务商入驻申请");
            } else {
                var html = "";
                for (var item in result.serviceInfo) {

                    html += "<tr>" +
                        "<td>" + item + "</td>" +
                        "<td>" + result.serviceInfo[item + ""]['company_name'] + "</td>" +
                        "<td>" + result.serviceInfo[item + ""]['contact_name'] + "</td>" +
                        "<td>" + result.serviceInfo[item + ""]['phone_number'] + "</td>" +
                        "<td>" + result.serviceInfo[item + ""]['email'] + "</td>" +
                        "<td>" + result.serviceInfo[item + ""]['status'] + "</td>" +
                        "<td>" + result.serviceInfo[item + ""]['apply_time'] + "</td>" +
                        "<td>" +
                        "<button type='button' class='btn btn-default waves-effect material-icons'" +
                        "onclick='showDetail(" + item + ")' data-toggle='modal' data-target='#detailServiceModal'>more_vert</button>" +
                        "</td>" +
                        "</tr>";
                }

                $("#cu-service-table").find("tbody").html(html).fadeIn(300);
            }

            $("#service-footer").find("span").html("共计 " + serviceNum + " 份入驻申请");
        }
    })
}

function showDetail(id) {
    $.ajax({
        url: "/admin/controller/service.detail.con.php",
        data: {id: id},
        type: "post",
        success: function (data) {
            var result = JSON.parse(data);

            var html = "<tr class='hide'><td>item</td><td id='service_id'>" + id + "</td></tr>";

            var status = "";
            switch (result["is_pass"]) {
                case "0":
                    status = "待审核";
                    break;
                case "1":
                    status = "审核通过";
                    $("#check_refuse").show();
                    break;
                case "2":
                    status = "审核拒绝";
                    $("#check_pass").show();
                    break;
            }

            html += "<tr>" +
                "<td>公司名称</td>" +
                "<td>" + result["company_name"] + "</td>" +
                "</tr>" +
                "<tr>" +
                "<td>公司网站</td>" +
                "<td>" + result["company_website"] + "</td>" +
                "</tr>" +
                "<tr>" +
                "<td>联系人姓名</td>" +
                "<td>" + result["contact_name"] + "</td>" +
                "</tr>" +
                "<tr>" +
                "<td>联系电话</td>" +
                "<td>" + result["contact_phone_number"] + "</td>" +
                "</tr>" +
                "<tr>" +
                "<td>联系邮箱</td>" +
                "<td>" + result["contact_email"] + "</td>" +
                "</tr>" +
                "<tr><td colspan='2'>服务描述</td></tr>" +
                "<tr><td colspan='2'>" + result["service_description"] + "</td></tr>" +
                "<tr>" +
                "<td>申请时间</td>" +
                "<td>" + result["apply_time"] + "</td>" +
                "</tr>" +
                "<tr>" +
                "<td>审核状态</td>" +
                "<td>" + status + "</td>" +
                "</tr>";


            $("#cu-service-detail-table").find("tbody").html(html);
        }
    })
}

function passApply() {
    var id = $("#service_id").html();

    swal({
        title: "审核服务商入驻申请",
        text: "确定将其审核通过吗？",
        type: "warning",
        confirmButtonText: "审核通过",
        cancelButtonText: "取消",
        showCancelButton: true,
        closeOnConfirm: false,
        showLoaderOnConfirm: true
    }, function () {
        $.ajax({
            url: "/admin/controller/service.check.con.php",
            data: {check: 1, id: id},
            type: "post",
            success: function (data) {
                $("#detailServiceModal").modal('hide');
                if (data == 1) {
                    setTimeout(function () {
                        swal("操作完成");
                        getServiceList();
                    }, 500);
                } else {
                    swal("审核状态未修改");
                }
            }
        })
    })
}

function denyApply() {
    var id = $("#service_id").html();

    swal({
        title: "审核服务商入驻申请",
        text: "确定将其审核拒绝吗？",
        type: "warning",
        confirmButtonText: "审核拒绝",
        cancelButtonText: "取消",
        showCancelButton: true,
        closeOnConfirm: false,
        showLoaderOnConfirm: true
    }, function () {
        $.ajax({
            url: "/admin/controller/service.check.con.php",
            data: {check: 2, id: id},
            type: "post",
            success: function (data) {
                $("#detailServiceModal").modal('hide');
                if (data == 1) {
                    setTimeout(function () {
                        swal("操作完成");
                        getServiceList();
                    }, 500);
                } else {
                    swal("审核状态未修改");
                }
            }
        })
    })
}
/*
 button group

 "<div class='btn-group' role='group'>" +
 "<button type='button' class='btn btn-default waves-effect dropdown-toggle' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>" +
 "Dropdown<span class='caret'></span>" +
 "</button>" +
 "<ul class='dropdown-menu'>" +
 "<li><a>link 1</a></li>" +
 "<li><a>link 2</a></li>" +
 "</ul>" +
 "</div>" +

 */