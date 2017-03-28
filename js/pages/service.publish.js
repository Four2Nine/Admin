/**
 * Created by liuyang on 2017/3/26.
 */

// $("#cu-detail-preloader").hide();

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
                    html += "<tr>" +
                        "<td>" + item + "</td>" +
                        "<td>" + result.serviceInfo[item + ""]['company_name'] + "</td>" +
                        "<td>" + result.serviceInfo[item + ""]['contact_name'] + "</td>" +
                        "<td>" + result.serviceInfo[item + ""]['phone_number'] + "</td>" +
                        "<td>" + result.serviceInfo[item + ""]['email'] + "</td>" +
                        "<td>" +
                        "<button onclick='locateComplete(" + item + ")' type='button' class='btn bg-teal waves-effect material-icons'>create</button>" +
                        "</td>" +
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

function locateComplete(id) {
    location.href = "service.complete.html?id=" + id;
}

// function showDetail(id) {

// $("#cu-detail-tips").fadeOut(300);
// $("#cu-detail-preloader").fadeIn(300);
//
// $.ajax({
//     url: "/admin/controller/service.detail.con.php",
//     data: {id: id},
//     type: "post",
//     success: function (data) {
//         var result = JSON.parse(data);
//         var html = "<tr class='hide'><td>item</td><td id='service_id'>" + id + "</td></tr>";
//
//         html += "<tr>" +
//             "<td colspan='2'>" + result["company_name"] + "</td>" +
//             "</tr>" +
//             "<tr>" +
//             "<td colspan='2'>" + result["company_website"] + "</td>" +
//             "</tr>" +
//             "<tr>" +
//             "<td><strong>联系人姓名</strong></td>" +
//             "<td>" + result["contact_name"] + "</td>" +
//             "</tr>" +
//             "<tr>" +
//             "<td><strong>联系电话</strong></td>" +
//             "<td>" + result["contact_phone_number"] + "</td>" +
//             "</tr>" +
//             "<tr>" +
//             "<td><strong>联系邮箱</strong></td>" +
//             "<td>" + result["contact_email"] + "</td>" +
//             "</tr>" +
//             "<tr><td colspan='2'><strong>服务描述</strong></td></tr>" +
//             "<tr><td colspan='2'>" + result["service_description"] + "</td></tr>" +
//             "<tr>" +
//             "<td><strong>申请时间</strong></td>" +
//             "<td>" + result["apply_time"] + "</td>" +
//             "</tr>";
//
//         $("#cu-detail-preloader").fadeOut(300);
//         $("#service-detail-table").find("tbody").html(html);
//     }
// })
// }

/*

 <tr>
 <td colspan="2">Company Name</td>
 </tr>
 <tr>
 <td>联系人</td>
 <td>LiuYang</td>
 </tr>
 <tr>
 <td>电话</td>
 <td>0123456789</td>
 </tr>
 <tr>
 <td>邮箱</td>
 <td>liuyang@f2n.com</td>
 </tr>
 <tr>
 <td colspan="2">服务详情</td>
 </tr>
 <tr>
 <td colspan="2">
 Company description: Make a group of buttons stretch
 at equal sizes to span the entire width of its parent...
 </td>
 </tr>

 */