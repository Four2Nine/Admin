/**
 * Created by liuyang on 2017/3/26.
 */

$("#cu-detail-preloader").hide();
$("#service-detail").hide();

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
            var passCount = 0;

            var servicePassedTable = $("#cu-service-passed-table");
            //显示企业服务表格的内容

            var html = "";
            var status;
            for (var item in result.serviceInfo) {
                status = result.serviceInfo[item + ""]['status'];

                if (status == "审核通过") {
                    passCount++;
                    html += "<tr onclick='showDetail(" + item + ")'>" +
                        "<td>" + item + "</td>" +
                        "<td>" + result.serviceInfo[item + ""]['company_name'] + "</td>" +
                        "<td>" + result.serviceInfo[item + ""]['contact_name'] + "</td>" +
                        "<td>" + result.serviceInfo[item + ""]['phone_number'] + "</td>" +
                        "<td>" + result.serviceInfo[item + ""]['email'] + "</td>" +
                        "</tr>";
                }
            }

            servicePassedTable.find("tbody").html(html).fadeIn(300);

            if (passCount == 0) {
                servicePassedTable.find("tbody>tr>td").html("暂无已过审申请");
            }

            $("#service-passed-footer").find("span").html("共计 " + passCount + " 份已过审申请");
        }
    })
}

function showDetail(id) {

    $("#cu-detail-tips").fadeOut(300);
    $("#cu-detail-preloader").fadeIn(300);

    $.ajax({
        url: "/admin/controller/service.detail.con.php",
        data: {id: id},
        type: "post",
        success: function (data) {
            var result = JSON.parse(data);

            $("#company-name").html(result["company_name"]);
            $("#service-desc").html(result["service_description"]);

            $("#cu-detail-preloader").fadeOut(300);
            $("#service-detail").fadeIn(500);
        }
    })
}