/**
 * Created by liuyang on 2016/10/28.
 */

var itemsNumberPerPage = 30;
var pageNum = 1;
var currentPage = getQueryString("p");

if (currentPage == null || currentPage.toString().length < 1) {
    currentPage = 1;
}

var startDate = $("#start-date");
var endDate = $("#end-date");

startDate.datepicker({
    showButtonPanel: true,
    changeMonth: true,
    changeYear: true,
    dateFormat:"yy-mm-dd",
    autoSize: true
});
endDate.datepicker({
    showButtonPanel: true,
    changeMonth: true,
    changeYear: true,
    dateFormat:"yy-mm-dd",
    autoSize: true
});

$("#check_pass").click(function () {
    //审核通过
    $.ajax({
        url: "/Admin/controller/apply.check.con.php",
        data: {check:1},
        type: "post",
        success: function (data) {
            if (data == 1) {
                $("#myModal").modal("hide");
                location.href = "/Admin/apply.html";
            }
        }
    })
});

$("#check_refuse").click(function () {
   //审核拒绝
    $.ajax({
        url: "/Admin/controller/apply.check.con.php",
        data: {check:2},
        type: "post",
        success: function (data) {
            if (data == 1) {
                $("#myModal").modal("hide");
                location.href = "/Admin/apply.html";
            }
        }
    })
});

$(document).ready(function () {
    $.ajax({
        url: "/Admin/controller/apply.con.php",
        type: "get",
        data: {currentPage: currentPage},
        success: function (data) {
            var result = JSON.parse(data);
            var applyNum = result.applyNum;
            $("#cu-apply-num").html("&nbsp;"+applyNum+"&nbsp;张报名表");

            //设置分页
            if (applyNum > 0) {
                pageNum = Math.ceil(applyNum / itemsNumberPerPage);
            }
            if (currentPage == 1) {
                $("ul.pagination li:eq(1)").attr("class", "disabled");
            }

            if (currentPage == pageNum) {
                $("ul.pagination li:last").attr("class", "disabled");
            }

            for (var i = 1; i <= pageNum; i++) {

                if (i == currentPage) {
                    $("ul.pagination li:eq(-2)").after(
                        "<li class='active' onclick='goPage(" + i + ")'><a>" + i + "</a></li>"
                    );
                } else {
                    $("ul.pagination li:eq(-2)").after(
                        "<li onclick='goPage(" + i + ")'><a>" + i + "</a></li>"
                    );
                }

            } //end-for


            //显示报名表格的内容
            if (applyNum == 0) {
                $("#cu-apply-table").find("tbody>tr>td").html("暂时没有报名表");
            } else {
                var html = "";
                for (var item in result.applyInfo) {
                    html += "<tr>" +
                        "<td>" + item + "</td>" +
                        "<td>" + result.applyInfo[item + ""]['project_id'] + "</td>" +
                        "<td>" + result.applyInfo[item + ""]['name'] + "</td>" +
                        "<td>" + result.applyInfo[item + ""]['phone_number'] + "</td>" +
                        "<td>" + result.applyInfo[item + ""]['email'] + "</td>" +
                        "<td>" + result.applyInfo[item + ""]['wechat'] + "</td>" +
                        "<td>" + result.applyInfo[item + ""]['status'] + "</td>" +
                        "<td><button class='glyphicon glyphicon-list-alt' onclick='showDetail(" + item + ")'  " +
                        "data-toggle='modal' data-target='#myModal'></button></td>" +
                        "</tr>";
                }

                $("#cu-apply-table").find("tbody").html(html).fadeIn(300);
            }

        }
    });
});

function goPage(page) {
    location.href = "/Admin/apply.html?p=" + page;
}

function prevPage() {
    var page = Math.max(currentPage - 1, 1);
    location.href = "/Admin/apply.html?p=" + page;
}

function nextPage() {
    var page = Math.min(pageNum, currentPage + 1);
    location.href = "/Admin/apply.html?p=" + page;
}

// 根据报名表id，获取报名表的详细信息
function showDetail(id) {
    $.ajax({
        url: "/Admin/controller/apply.detail.con.php",
        data: {id: id},
        type: "post",
        success: function (data) {
            var result = JSON.parse(data);
            var html = "";
            for (var item in result.applyDetail) {
                if (item == "project_id") {
                    html += "<tr>" +
                        "<td>项目ID</td>" +
                        "<td>" + result.applyDetail[item] + "</td>" +
                        "</tr>";
                } else if (item == "name"){
                    html += "<tr>" +
                        "<td>姓名</td>" +
                        "<td>" + result.applyDetail[item] + "</td>" +
                        "</tr>";
                }else if (item == "gender"){
                    html += "<tr>" +
                        "<td>性别</td>" +
                        "<td>" + result.applyDetail[item] + "</td>" +
                        "</tr>";
                }else if (item == "nationality"){
                    html += "<tr>" +
                        "<td>国籍</td>" +
                        "<td>" + result.applyDetail[item] + "</td>" +
                        "</tr>";
                }else if (item == "phone_number"){
                    html += "<tr>" +
                        "<td>手机号</td>" +
                        "<td>" + result.applyDetail[item] + "</td>" +
                        "</tr>";
                }else if (item == "email"){
                    html += "<tr>" +
                        "<td>邮箱</td>" +
                        "<td>" + result.applyDetail[item] + "</td>" +
                        "</tr>";
                }else if (item == "wechat"){
                    html += "<tr>" +
                        "<td>微信号</td>" +
                        "<td>" + result.applyDetail[item] + "</td>" +
                        "</tr>";
                }else if (item == "id_card_number"){
                    html += "<tr>" +
                        "<td>身份证号</td>" +
                        "<td>" + result.applyDetail[item] + "</td>" +
                        "</tr>";
                }else if (item == "passport_number"){
                    html += "<tr>" +
                        "<td>护照号</td>" +
                        "<td>" + result.applyDetail[item] + "</td>" +
                        "</tr>";
                }else if (item == "province"){
                    html += "<tr>" +
                        "<td>现居省份</td>" +
                        "<td>" + result.applyDetail[item] + "</td>" +
                        "</tr>";
                }else if (item == "post_address"){
                    html += "<tr>" +
                        "<td>邮寄地址</td>" +
                        "<td>" + result.applyDetail[item] + "</td>" +
                        "</tr>";
                }else if (item == "city_of_departure"){
                    html += "<tr>" +
                        "<td>出发城市</td>" +
                        "<td>" + result.applyDetail[item] + "</td>" +
                        "</tr>";
                }else if (item == "emergency_contact_name"){
                    html += "<tr>" +
                        "<td>紧急联系人</td>" +
                        "<td>" + result.applyDetail[item] + "</td>" +
                        "</tr>";
                }else if (item == "emergency_contact_phone_number"){
                    html += "<tr>" +
                        "<td>紧急联系人电话</td>" +
                        "<td>" + result.applyDetail[item] + "</td>" +
                        "</tr>";
                }else if (item == "occupation"){
                    html += "<tr>" +
                        "<td>身份</td>" +
                        "<td>" + result.applyDetail[item] + "</td>" +
                        "</tr>";
                }else if (item == "duration"){
                    html += "<tr>" +
                        "<td>项目时长</td>" +
                        "<td>" + result.applyDetail[item] + "</td>" +
                        "</tr>";
                }else if (item == "start_date"){
                    html += "<tr>" +
                        "<td>预计开始时间</td>" +
                        "<td>" + result.applyDetail[item] + "</td>" +
                        "</tr>";
                }else if (item == "diet_requirement"){
                    html += "<tr>" +
                        "<td>特殊饮食要求</td>" +
                        "<td>" + result.applyDetail[item] + "</td>" +
                        "</tr>";
                }else if (item == "medical_history"){
                    var medical_history = result.applyDetail[item]=="";
                    if (medical_history) {
                        html += "<tr>" +
                        "<td>历史重大疾病</td>" +
                        "<td>" + "无" + "</td>" +
                        "</tr>";
                    } else {
                        html += "<tr>" +
                            "<td>历史重大疾病</td>" +
                            "<td>" + result.applyDetail[item] + "</td>" +
                            "</tr>";
                    }
                }else if (item == "is_first_go_abroad"){
                    html += "<tr>" +
                        "<td>是否第一次出国</td>" +
                        "<td>" + result.applyDetail[item]==1?"是":"否" + "</td>" +
                        "</tr>";
                }else if (item == "english_level"){
                    var english_level = "";
                    switch (result.applyDetail[item]) {
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
                }else if (item == "is_need_insurance"){
                    var need = "需要";
                    if (result.applyDetail[item] == 0) {
                        need = "不需要";
                    }

                    html += "<tr>" +
                        "<td>是否需要签证保险业协助办理</td>" +
                        "<td>" + need + "</td>" +
                        "</tr>";
                }else if (item == "interview_date"){
                    var interview_date = result.applyDetail[item];
                    if (interview_date == "") {
                        interview_date = "未申请面试";
                    }
                    html += "<tr>" +
                        "<td>面试时间</td>" +
                        "<td>" + interview_date + "</td>" +
                        "</tr>";
                }else if (item == "status"){

                    var status = "";
                    switch (result.applyDetail[item]) {
                        case "0":
                            status = "待审核";
                            break;
                        case "1":
                            status = "审核通过";
                            break;
                        case "2":
                            status = "审核拒绝";
                            break;
                    }

                    html += "<tr>" +
                        "<td>审核状态</td>" +
                        "<td>" + status + "</td>" +
                        "</tr>";
                } else if (item == "apply_time"){
                    html += "<tr>" +
                        "<td>报名表时间</td>" +
                        "<td>" + result.applyDetail[item] + "</td>" +
                        "</tr>";
                }

            }
            $("#cu-apply-detail-table").find("tbody").html(html);
        }
    })
}