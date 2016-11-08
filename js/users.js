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
    dateFormat: "yy-mm-dd",
    autoSize: true
});
endDate.datepicker({
    showButtonPanel: true,
    changeMonth: true,
    changeYear: true,
    dateFormat: "yy-mm-dd",
    autoSize: true
});

/*
 更新会员信息js
 */

$("#upvip").click(function () {
    $("#upvip-form").submit(function (event) {
        var $form = $(this);
        var $inputs = $form.find("input, select, button, textarea");
        var id = $("#upvip-id").attr("value");
        var serializedData = $form.serialize();
        if (id == "") return false;
        //alert(serializedData);
        $.ajax({
            url: "/Admin/controller/users.update.con.php",
            data: serializedData,
            type: "post",
            success: function (data) {
                alert(data);
                if (data == 1) {
                    alert("修改成功");
                    location.href = "/Admin/dashboard.html";
                }
            }
        });
    })
});


$(document).ready(function () {
    $.ajax({
        url: "/Admin/controller/users.list.con.php",
        type: "get",
        data: {currentPage: currentPage},
        success: function (data) {
            var result = JSON.parse(data);
            var applyNum = result.applyNum;
            $("#cu-apply-num").html("&nbsp;" + applyNum + "&nbsp;名会员");

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


            //显示会员表格的内容
            if (applyNum == 0) {
                $("#cu-apply-table").find("tbody>tr>td").html("暂时没有会员");
            } else {
                var html = "";
                for (var item in result.applyInfo) {
                    html += "<tr>" +
                        "<td>" + item + "</td>" +
                        "<td>" + result.applyInfo[item + ""]['username'] + "</td>" +
                        "<td>" + result.applyInfo[item + ""]['password'] + "</td>" +
                        "<td>" + result.applyInfo[item + ""]['balance'] + "</td>" +
                        "<td><button class='glyphicon glyphicon-list-alt' onclick='delevipDetail(" + item + ")'  " +
                        "></button></td>" +
                        "<td><button class='glyphicon glyphicon-list-alt' onclick='showvipDetail(" + item + ")'  " +
                        "data-toggle='modal' data-target='#myModal'></button></td>" +
                        "</tr>";
                }

                $("#cu-apply-table").find("tbody").html(html).fadeIn(300);
            }

        }
    });
});

function goPage(page) {
    location.href = "/Admin/users.html?p=" + page;
}

function prevPage() {
    var page = Math.max(currentPage - 1, 1);
    location.href = "/Admin/users.html?p=" + page;
}

function nextPage() {
    var page = Math.min(pageNum, currentPage + 1);
    location.href = "/Admin/users.html?p=" + page;
}


function delevipDetail(id) {
    $("#check_pass").hide();
    $("#check_refuse").hide();

    $("#upvip-id").attr("value", id);
    $.ajax({
        url: "/Admin/controller/users.delete.con.php",
        data: {id: id},
        type: "post",
        success: function (data) {
            if (data == 1) {
                alert("删除成功");
                location.href = "/Admin/users.html";
            }


        }
    })
}

// 根据会员表id，获取报名表的详细信息
function showvipDetail(id) {
    $("#check_pass").hide();
    $("#check_refuse").hide();

    $("#upvip-id").attr("value", id);
    $.ajax({
        url: "/Admin/controller/users.detail.con.php",
        data: {id: id},
        type: "post",
        success: function (data) {
            var result = JSON.parse(data);
            var html = "";
            for (var item in result.upvipDetail) {
                if (item == "id") {
                    html += "<tr>" +
                        "<td>会员ID</td>" +
                        "<td>" + result.upvipDetail[item] + "</td>" +
                        "</tr>";
                }
                /*else if (item == "acpname"){
                 html += "<tr>" +
                 "<td>项目名称</td>" +
                 "<td><input class='input w50' name='acpname' type='text' value=" + result.projectDetail[item] +
                 "></td>"+
                 //"<td>" + result.applyDetail[item] + "</td>" +
                 "</tr>";
                 }*/
                else if (item == "username") {
                    html += "<tr>" +
                        "<td>会员名</td>" +
                        "<td><textarea class='input' name='username' type='text'>" + result.upvipDetail[item] +
                        "</textarea></td>" +
                        //"<td>" + result.applyDetail[item] + "</td>" +
                        "</tr>";
                }
                /* else if (item == "email"){
                 html += "<tr>" +
                 "<td>报名表时间</td>" +
                 "<td><input name='email' type='text' value=" + result.applyDetail[item] +
                 "></td>"+
                 //"<td>" + result.applyDetail[item] + "</td>" +
                 "</tr>";
                 }*/
                else if (item == "password") {
                    html += "<tr>" +
                        "<td>密码</td>" +
                        "<td><textarea class='input' name='password' type='text'>" + result.upvipDetail[item] +
                        "</textarea></td>" +
                        "</tr>";
                }
                else if (item == "balance") {
                    html += "<tr>" +
                        "<td>余额</td>" +
                        "<td><textarea class='input' name='balance' type='text'>" + result.upvipDetail[item] +
                        "</textarea></td>" +
                        "</tr>";
                }


            }
            $("#cu-apply-detail-table").find("tbody").html(html);
        }
    })
}

