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
            getApplyList();
        } else {
            showNotification("alert-danger", errorCode2errorInfo(result.status), "top", "center", "", "");

            setTimeout(function () {
                location.href = "../index.html";
            }, 1000);
        }
    }
});

function getApplyList() {
    $.ajax({
        url: "/admin/controller/apply.list.con.php",
        success: function (data) {
            var result = JSON.parse(data);
            var applyNum = result.applyNum;

            //显示报名表格的内容
            if (applyNum == 0) {
                $("#cu-apply-table").find("tbody>tr>td").html("暂时没有报名表");
            } else {
                var html = "";
                for (var item in result.applyInfo) {

                    var status = result.applyInfo[item + ""]['status'];

                    html += "<tr>" +
                        "<td>" + item + "</td>" +
                        "<td>" + result.applyInfo[item + ""]['project_name'] + "</td>" +
                        "<td>" + result.applyInfo[item + ""]['name'] + "</td>" +
                        "<td>" + result.applyInfo[item + ""]['time'] + "</td>" +
                        "<td>" + status + "</td>" +
                        "<td>" +
                        "<button type='button' class='btn btn-default btn-xs waves-effect material-icons'" +
                        "onclick='showDetail(" + item + ")' data-toggle='modal' data-target='#detailApplyModal'>details</button>" +
                        "</td>" +
                        "</tr>";
                }

                $("#cu-apply-table").find("tbody").html(html).fadeIn(300);
            }
        }
    })
}

function showDetail(id) {
    $.ajax({
        url: "/admin/controller/apply.detail.con.php",
        data: {id: id},
        type: "post",
        success: function (data) {
            var result = JSON.parse(data);
            var html = "<tr class='hide'><td>item</td><td id='apply_id'>" + id + "</td></tr>";
            for (var item in result) {
                if (item == "project_id") {
                    html += "<tr>" +
                        "<td>项目ID</td>" +
                        "<td>" + result[item] + "</td>" +
                        "</tr>";
                } else if (item == "name") {
                    html += "<tr>" +
                        "<td>姓名</td>" +
                        "<td>" + result[item] + "</td>" +
                        "</tr>";
                } else if (item == "gender") {
                    html += "<tr>" +
                        "<td>性别</td>" +
                        "<td>" + result[item] + "</td>" +
                        "</tr>";
                } else if (item == "nationality") {
                    html += "<tr>" +
                        "<td>国籍</td>" +
                        "<td>" + result[item] + "</td>" +
                        "</tr>";
                } else if (item == "phone_number") {
                    html += "<tr>" +
                        "<td>手机号</td>" +
                        "<td>" + result[item] + "</td>" +
                        "</tr>";
                } else if (item == "email") {
                    html += "<tr>" +
                        "<td>邮箱</td>" +
                        "<td>" + result[item] + "</td>" +
                        "</tr>";
                } else if (item == "wechat") {
                    html += "<tr>" +
                        "<td>微信号</td>" +
                        "<td>" + result[item] + "</td>" +
                        "</tr>";
                } else if (item == "id_card_number") {
                    html += "<tr>" +
                        "<td>身份证号</td>" +
                        "<td>" + result[item] + "</td>" +
                        "</tr>";
                } else if (item == "passport_number") {
                    html += "<tr>" +
                        "<td>护照号</td>" +
                        "<td>" + result[item] + "</td>" +
                        "</tr>";
                } else if (item == "province") {
                    html += "<tr>" +
                        "<td>现居省份</td>" +
                        "<td>" + result[item] + "</td>" +
                        "</tr>";
                } else if (item == "post_address") {
                    html += "<tr>" +
                        "<td>邮寄地址</td>" +
                        "<td>" + result[item] + "</td>" +
                        "</tr>";
                } else if (item == "city_of_departure") {
                    html += "<tr>" +
                        "<td>出发城市</td>" +
                        "<td>" + result[item] + "</td>" +
                        "</tr>";
                } else if (item == "emergency_contact_name") {
                    html += "<tr>" +
                        "<td>紧急联系人</td>" +
                        "<td>" + result[item] + "</td>" +
                        "</tr>";
                } else if (item == "emergency_contact_phone_number") {
                    html += "<tr>" +
                        "<td>紧急联系人电话</td>" +
                        "<td>" + result[item] + "</td>" +
                        "</tr>";
                } else if (item == "occupation") {
                    var occupation = "";
                    switch (result[item]) {
                        case "0":
                            occupation = "高中生";
                            break;
                        case "1":
                            occupation = "大学及以上";
                            break;
                        case "2":
                            occupation = "工作";
                            break;
                    }

                    html += "<tr>" +
                        "<td>身份</td>" +
                        "<td>" + occupation + "</td>" +
                        "</tr>";
                } else if (item == "duration") {
                    html += "<tr>" +
                        "<td>项目时长</td>" +
                        "<td>" + result[item] + "</td>" +
                        "</tr>";
                } else if (item == "start_date") {
                    html += "<tr>" +
                        "<td>预计开始时间</td>" +
                        "<td>" + result[item] + "</td>" +
                        "</tr>";
                } else if (item == "diet_requirement") {
                    html += "<tr>" +
                        "<td>特殊饮食要求</td>" +
                        "<td>" + result[item] + "</td>" +
                        "</tr>";
                } else if (item == "medical_history") {
                    var medical_history = result[item] == "";
                    if (medical_history) {
                        html += "<tr>" +
                            "<td>历史重大疾病</td>" +
                            "<td>" + "无" + "</td>" +
                            "</tr>";
                    } else {
                        html += "<tr>" +
                            "<td>历史重大疾病</td>" +
                            "<td>" + result[item] + "</td>" +
                            "</tr>";
                    }
                } else if (item == "is_first_go_abroad") {
                    html += "<tr>" +
                    "<td>是否第一次出国</td>" +
                    "<td>" + result[item] == 1 ? "是" : "否" + "</td>" +
                    "</tr>";
                } else if (item == "english_level") {
                    var english_level = "";
                    switch (result[item]) {
                        case "0":
                            english_level = "高中";
                            break;
                        case "1":
                            english_level = "大学英语四级";
                            break;
                        case "2":
                            english_level = "大学英语六级";
                            break;
                    }

                    html += "<tr>" +
                        "<td>英语水平</td>" +
                        "<td>" + english_level + "</td>" +
                        "</tr>";
                } else if (item == "is_need_insurance") {
                    var need = "需要";
                    if (result[item] == 0) {
                        need = "不需要";
                    }

                    html += "<tr>" +
                        "<td>是否需要签证保险业协助办理</td>" +
                        "<td>" + need + "</td>" +
                        "</tr>";
                } else if (item == "interview_date") {
                    var interview_date = result[item];
                    if (interview_date == "") {
                        interview_date = "未申请面试";
                    }
                    html += "<tr>" +
                        "<td>面试时间</td>" +
                        "<td>" + interview_date + "</td>" +
                        "</tr>";
                } else if (item == "status") {

                    var status = "";
                    switch (result[item]) {
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
                        "<td>审核状态</td>" +
                        "<td>" + status + "</td>" +
                        "</tr>";
                } else if (item == "apply_time") {
                    html += "<tr>" +
                        "<td>报名表时间</td>" +
                        "<td>" + result[item] + "</td>" +
                        "</tr>";
                }

            }
            $("#cu-apply-detail-table").find("tbody").html(html);
        }
    })
}

function passApply() {

    var id = $("#apply_id").html();

    swal({
        title: "审核报名表",
        text: "审核通过",
        type: "info",
        showCancelButton: true,
        closeOnConfirm: false,
        showLoaderOnConfirm: true
    }, function () {
        $.ajax({
            url: "/admin/controller/apply.check.con.php",
            data: {check: 1, id: id},
            type: "post",
            success: function (data) {
                $("#detailApplyModal").modal('hide');
                if (data == 1) {
                    setTimeout(function () {
                        swal("操作完成");
                        getApplyList();
                    }, 500);
                } else {
                    swal("审核状态未修改");
                }
            }
        })
    });
}

function denyApply() {

    var id = $("#apply_id").html();

    swal({
        title: "审核报名表",
        text: "审核拒绝",
        type: "info",
        showCancelButton: true,
        closeOnConfirm: false,
        showLoaderOnConfirm: true
    }, function () {
        $.ajax({
            url: "/admin/controller/apply.check.con.php",
            data: {check: 2, id: id},
            type: "post",
            success: function (data) {
                $("#detailApplyModal").modal('hide');
                if (data == 1) {
                    setTimeout(function () {
                        swal("操作完成");
                        getApplyList();
                    }, 500);
                } else {
                    swal("审核状态未修改");
                }
            }
        })
    });
}